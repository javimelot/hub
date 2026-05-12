/**
 * HUB de Adquirencia - API Client Module
 * Handles HTTP requests to the Redsys APIs.
 */
const ApiClient = (() => {

    /**
     * Send a raw POST request to the given URL.
     *
     * @param {string} url    - Full target URL
     * @param {string} method - HTTP method (POST)
     * @param {object} body   - Request payload (already signed if needed)
     * @returns {Promise<{status, statusText, data, time, ok}>}
     */
    async function sendRawRequest(url, method = 'POST', body = {}) {
        const config = AppConfig.getConfig();

        const headers = {
            'Content-Type':        'application/json',
            'RedsysClientId':      config.clientId     || '',
            'RedsysClientSecret':  config.clientSecret || ''
        };

        const startTime = performance.now();

        try {
            const response = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(body)
            });

            const elapsed = Math.round(performance.now() - startTime);

            let data;
            const ct = response.headers.get('content-type') || '';
            if (ct.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            return {
                status:     response.status,
                statusText: response.statusText,
                data,
                time:       elapsed,
                ok:         response.ok
            };

        } catch (err) {
            const elapsed = Math.round(performance.now() - startTime);
            return {
                status:     0,
                statusText: 'Network Error',
                data: {
                    error: err.message,
                    ayuda: 'Verifique la URL y la conectividad. Si el error es CORS, sirva la app desde un servidor HTTP (npx serve .) en lugar de abrirla como file://.'
                },
                time:  elapsed,
                ok:    false
            };
        }
    }

    return { sendRawRequest };
})();
