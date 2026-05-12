/**
 * HUB de Adquirencia - Configuration Module
 * Manages environment settings, base URLs, and credentials
 */
const AppConfig = (() => {
    const STORAGE_KEY = 'hub_adquirencia_config';

    const ENVIRONMENTS = {
        integration: {
            label: 'Integración',
            baseUrls: {
                comercios: 'https://apis-i.redsys.es:20443/acquirement/banking-channel/v1/commerce',
                perfiles: 'https://apis-i.redsys.es:20443/acquirement/banking-channel/v1/profile',
                terminales: 'https://apis-i.redsys.es:20443/acquirement/banking-channel/no-presencial/v1/merchant'
            }
        },
        production: {
            label: 'Producción',
            baseUrls: {
                comercios: 'https://apis.redsys.es/acquirement/banking-channel/v1/commerce',
                perfiles: 'https://apis.redsys.es/acquirement/banking-channel/v1/profile',
                terminales: 'https://apis.redsys.es/acquirement/banking-channel/no-presencial/v1/merchant'
            }
        }
    };

    const ENDPOINTS = {
        // Comercios
        'comercios-alta': { path: '/add-commerce', method: 'POST', category: 'comercios' },
        'comercios-modificacion': { path: '/modify-commerce', method: 'POST', category: 'comercios' },
        'comercios-consulta': { path: '/get-commerce', method: 'POST', category: 'comercios' },
        'comercios-listado': { path: '/get-commerces', method: 'POST', category: 'comercios' },

        // Perfiles
        'perfiles-alta': { path: '/add-commerce-profile', method: 'POST', category: 'perfiles' },
        'perfiles-modificacion': { path: '/modify-commerce-profile', method: 'POST', category: 'perfiles' },
        'perfiles-baja': { path: '/delete-commerce-profile', method: 'POST', category: 'perfiles' },
        'perfiles-consulta': { path: '/get-commerce-profile', method: 'POST', category: 'perfiles' },

        // Terminales
        'terminales-consulta': { path: '/detail', method: 'POST', category: 'terminales' },
        'terminales-consulta-clave': { path: '/key', method: 'POST', category: 'terminales' },
        'terminales-consulta-multiple': { path: '/list', method: 'POST', category: 'terminales' },
        'terminales-alta': { path: '/add', method: 'POST', category: 'terminales' },
        'terminales-modificacion': { path: '/modify', method: 'POST', category: 'terminales' },
        'terminales-baja': { path: '/delete', method: 'POST', category: 'terminales' },
        'terminales-reactivacion': { path: '/reactivate', method: 'POST', category: 'terminales' },
        'terminales-alta-metodo': { path: '/paymethod/add', method: 'POST', category: 'terminales' },
        'terminales-mod-metodo': { path: '/paymethod/modify', method: 'POST', category: 'terminales' },
        'terminales-baja-metodo': { path: '/paymethod/delete', method: 'POST', category: 'terminales' },
        'terminales-consulta-grupos': { path: '/groups/get', method: 'POST', category: 'terminales' },
        'terminales-alta-grupos': { path: '/groups/add', method: 'POST', category: 'terminales' },
        'terminales-email-bienvenida': { path: '/email/welcome', method: 'POST', category: 'terminales' },
        'terminales-email-claves': { path: '/email/keys', method: 'POST', category: 'terminales' },
        'terminales-consulta-operacion': { path: '/operation/detail', method: 'POST', category: 'terminales' },
        'terminales-consulta-operaciones': { path: '/operation/list', method: 'POST', category: 'terminales' }
    };

    let config = loadConfig();

    function loadConfig() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) return JSON.parse(stored);
        } catch (e) { /* ignore */ }
        return getDefaultConfig();
    }

    function getDefaultConfig() {
        return {
            environment: 'integration',
            customUrl: '',
            clientId: 'c2a8c13f-24ce-4aaa-90f4-945ee65f3492',
            clientSecret: 'hH8eF8iH0cD4pS2fP4uL7yN0bI7iG2aS2qM3fN8aH0rP5xW4lJ',
            signingKey: '',
            signatureType: 'HMAC-SHA256'
        };
    }

    function saveConfig(newConfig) {
        config = { ...config, ...newConfig };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }

    function getConfig() {
        return { ...config };
    }

    function getBaseUrl(category) {
        if (config.environment === 'custom') {
            return config.customUrl;
        }
        return ENVIRONMENTS[config.environment]?.baseUrls[category] || '';
    }

    function getFullUrl(endpointKey) {
        const endpoint = ENDPOINTS[endpointKey];
        if (!endpoint) return '';
        const base = getBaseUrl(endpoint.category);
        return base + endpoint.path;
    }

    function getEndpoint(key) {
        return ENDPOINTS[key] || null;
    }

    function getHeaders() {
        return {
            'Content-Type': 'application/json',
            'RedsysClientId': config.clientId || '{RedsysClientId}',
            'RedsysClientSecret': config.clientSecret || '{RedsysClientSecret}'
        };
    }

    return {
        ENVIRONMENTS,
        ENDPOINTS,
        loadConfig,
        saveConfig,
        getConfig,
        getBaseUrl,
        getFullUrl,
        getEndpoint,
        getHeaders
    };
})();
