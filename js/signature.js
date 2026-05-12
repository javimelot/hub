/**
 * HUB de Adquirencia - Unified Signature Module
 * Implements HMAC-SHA256 and HMAC-SHA512 signing for all API services
 * 
 * Signing Process (Terminales API - documented in section 4):
 * 
 * REQUEST SIGNATURE:
 * 1. Take the JSON body content (the "data" object serialized)
 * 2. Compute HMAC using the entity's secret key
 * 3. Encode result in Base64 URL-safe format
 * 
 * RESPONSE SIGNATURE VERIFICATION:
 * 1. Take the response JSON body content
 * 2. Compute HMAC using the same key
 * 3. Compare with the signature in signatureData
 * 
 * For Comercios/Perfiles APIs:
 * - The signature is computed over the serialized "data" block
 * - Uses HMAC-SHA256 with the entity's key
 * - Result is Base64-encoded
 */
const SignatureModule = (() => {

    /**
     * Convert a string to ArrayBuffer
     */
    function str2ab(str) {
        const encoder = new TextEncoder();
        return encoder.encode(str);
    }

    /**
     * Convert ArrayBuffer to Base64 URL-safe string
     */
    function ab2b64url(buffer) {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    /**
     * Convert ArrayBuffer to standard Base64
     */
    function ab2b64(buffer) {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    /**
     * Import key for HMAC operations
     */
    async function importKey(keyString, algorithm) {
        const keyData = str2ab(keyString);
        return await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: algorithm },
            false,
            ['sign', 'verify']
        );
    }

    /**
     * Compute HMAC-SHA256 signature
     * @param {string} data - The data to sign (typically JSON string of the data block)
     * @param {string} key - The signing key
     * @param {boolean} urlSafe - Whether to use URL-safe Base64 encoding
     * @returns {Promise<string>} Base64-encoded signature
     */
    async function hmacSHA256(data, key, urlSafe = true) {
        try {
            const cryptoKey = await importKey(key, 'SHA-256');
            const signature = await crypto.subtle.sign('HMAC', cryptoKey, str2ab(data));
            return urlSafe ? ab2b64url(signature) : ab2b64(signature);
        } catch (error) {
            throw new Error(`Error computing HMAC-SHA256: ${error.message}`);
        }
    }

    /**
     * Compute HMAC-SHA512 signature
     * @param {string} data - The data to sign
     * @param {string} key - The signing key
     * @param {boolean} urlSafe - Whether to use URL-safe Base64 encoding
     * @returns {Promise<string>} Base64-encoded signature
     */
    async function hmacSHA512(data, key, urlSafe = true) {
        try {
            const cryptoKey = await importKey(key, 'SHA-512');
            const signature = await crypto.subtle.sign('HMAC', cryptoKey, str2ab(data));
            return urlSafe ? ab2b64url(signature) : ab2b64(signature);
        } catch (error) {
            throw new Error(`Error computing HMAC-SHA512: ${error.message}`);
        }
    }

    /**
     * Sign a request body for the Terminales API
     * The signature is computed over the serialized info.data object
     * 
     * @param {object} requestBody - The full request body
     * @param {string} key - The signing key
     * @param {string} signatureType - 'HMAC-SHA256' or 'HMAC-SHA512'
     * @returns {Promise<object>} The request body with signature added
     */
    async function signTerminalesRequest(requestBody, key, signatureType = 'HMAC-SHA256') {
        const dataToSign = JSON.stringify(requestBody.info?.data || requestBody.info || {});
        
        let signature;
        if (signatureType === 'HMAC-SHA512') {
            signature = await hmacSHA512(dataToSign, key);
        } else {
            signature = await hmacSHA256(dataToSign, key);
        }

        return {
            ...requestBody,
            signatureData: {
                signatureType: 'T29V2',
                signature: signature
            }
        };
    }

    /**
     * Sign a request body for the Comercios/Perfiles API
     * The signature is computed over the serialized data block
     * 
     * @param {object} requestBody - The full request body (the data block)
     * @param {string} key - The signing key
     * @param {string} signatureType - 'HMAC-SHA256' or 'HMAC-SHA512'
     * @returns {Promise<object>} Object with signature info
     */
    async function signComerciosRequest(requestBody, key, signatureType = 'HMAC-SHA256') {
        const dataToSign = JSON.stringify(requestBody);
        
        let signature;
        if (signatureType === 'HMAC-SHA512') {
            signature = await hmacSHA512(dataToSign, key);
        } else {
            signature = await hmacSHA256(dataToSign, key);
        }

        return {
            data: requestBody,
            signature: {
                signatureType: signatureType,
                signature: signature
            }
        };
    }

    /**
     * Verify a response signature
     * @param {object} responseBody - The response body
     * @param {string} key - The signing key
     * @param {string} signatureType - The signature type used
     * @returns {Promise<boolean>} Whether the signature is valid
     */
    async function verifyResponseSignature(responseBody, key, signatureType = 'HMAC-SHA256') {
        try {
            const receivedSignature = responseBody.signatureData?.signature || 
                                     responseBody.signature?.signature;
            if (!receivedSignature) return false;

            const dataBlock = responseBody.info?.data || responseBody.data;
            const dataToVerify = JSON.stringify(dataBlock);

            let computedSignature;
            if (signatureType === 'HMAC-SHA512') {
                computedSignature = await hmacSHA512(dataToVerify, key);
            } else {
                computedSignature = await hmacSHA256(dataToVerify, key);
            }

            return computedSignature === receivedSignature;
        } catch (error) {
            console.error('Signature verification error:', error);
            return false;
        }
    }

    /**
     * Generic sign function that auto-detects the API type
     * @param {object} body - Request body
     * @param {string} key - Signing key
     * @param {string} apiType - 'terminales', 'comercios', or 'perfiles'
     * @param {string} signatureType - 'HMAC-SHA256' or 'HMAC-SHA512'
     */
    async function signRequest(body, key, apiType, signatureType = 'HMAC-SHA256') {
        if (!key) {
            throw new Error('No se ha configurado la clave de firma. Configure la clave en Ajustes.');
        }

        if (apiType === 'terminales') {
            return await signTerminalesRequest(body, key, signatureType);
        } else {
            return await signComerciosRequest(body, key, signatureType);
        }
    }

    /**
     * Compute signature for display/testing purposes
     */
    async function computeSignature(data, key, algorithm = 'HMAC-SHA256', urlSafe = true) {
        if (!key) return '(configure la clave de firma)';
        if (!data) return '(sin datos para firmar)';

        try {
            if (algorithm === 'HMAC-SHA512') {
                return await hmacSHA512(data, key, urlSafe);
            }
            return await hmacSHA256(data, key, urlSafe);
        } catch (e) {
            return `(error: ${e.message})`;
        }
    }

    return {
        hmacSHA256,
        hmacSHA512,
        signTerminalesRequest,
        signComerciosRequest,
        verifyResponseSignature,
        signRequest,
        computeSignature
    };
})();
