/**
 * HUB de Adquirencia - Main Application
 * Handles navigation, view rendering, and global interactions
 */
(function() {
    'use strict';

    // View registry - maps view keys to render functions
    const VIEW_REGISTRY = {
        // Config
        'config-general': () => ConfigViews.renderConfigGeneral(),
        'config-firma': () => ConfigViews.renderConfigFirma(),

        // Comercios
        'comercios-alta': () => ComerciosViews.renderAlta(),
        'comercios-modificacion': () => ComerciosViews.renderModificacion(),
        'comercios-consulta': () => ComerciosViews.renderConsulta(),
        'comercios-listado': () => ComerciosViews.renderListado(),

        // Perfiles
        'perfiles-alta': () => PerfilesViews.renderAlta(),
        'perfiles-modificacion': () => PerfilesViews.renderModificacion(),
        'perfiles-baja': () => PerfilesViews.renderBaja(),
        'perfiles-consulta': () => PerfilesViews.renderConsulta(),

        // Terminales
        'terminales-consulta': () => TerminalesViews.renderConsulta(),
        'terminales-consulta-clave': () => TerminalesViews.renderConsultaClave(),
        'terminales-consulta-multiple': () => TerminalesViews.renderConsultaMultiple(),
        'terminales-alta': () => TerminalesViews.renderAlta(),
        'terminales-modificacion': () => TerminalesViews.renderModificacion(),
        'terminales-baja': () => TerminalesViews.renderBaja(),
        'terminales-reactivacion': () => TerminalesViews.renderReactivacion(),
        'terminales-alta-metodo': () => TerminalesViews.renderAltaMetodo(),
        'terminales-mod-metodo': () => TerminalesViews.renderModMetodo(),
        'terminales-baja-metodo': () => TerminalesViews.renderBajaMetodo(),
        'terminales-consulta-grupos': () => TerminalesViews.renderConsultaGrupos(),
        'terminales-alta-grupos': () => TerminalesViews.renderAltaGrupos(),
        'terminales-email-bienvenida': () => TerminalesViews.renderEmailBienvenida(),
        'terminales-email-claves': () => TerminalesViews.renderEmailClaves(),
        'terminales-consulta-operacion': () => TerminalesViews.renderConsultaOperacion(),
        'terminales-consulta-operaciones': () => TerminalesViews.renderConsultaOperaciones()
    };

    let currentView = null;

    // Initialize application
    function init() {
        setupNavigation();
        setupSettings();
        setupSidebarToggles();
        
        // Load default view or from hash
        const hash = window.location.hash.slice(1);
        if (hash && VIEW_REGISTRY[hash]) {
            navigateTo(hash);
        } else {
            showWelcome();
        }
    }

    // Navigation setup
    function setupNavigation() {
        document.querySelectorAll('[data-view]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = link.getAttribute('data-view');
                navigateTo(view);
            });
        });
    }

    // Navigate to a view
    function navigateTo(viewKey) {
        const renderFn = VIEW_REGISTRY[viewKey];
        if (!renderFn) return;

        currentView = viewKey;
        window.location.hash = viewKey;

        // Update active link
        document.querySelectorAll('[data-view]').forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-view') === viewKey);
        });

        // Render view
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = renderFn();

        // Post-render hooks
        if (viewKey === 'config-general') {
            ConfigViews.loadSavedConfig();
        }

        // Scroll to top
        mainContent.scrollTop = 0;
    }

    // Show welcome page
    function showWelcome() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
        <div class="welcome-page">
            <h2>HUB de Adquirencia</h2>
            <p>Consola unificada para las APIs de configuracion de Redsys. 
               Gestione comercios, perfiles y terminales desde una interfaz centralizada.</p>
            
            <div class="welcome-cards">
                <div class="welcome-card" onclick="navigateFromWelcome('comercios-alta')">
                    <div class="card-icon blue">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    </div>
                    <h3>Comercios</h3>
                    <p>Alta, modificacion, consulta y listado de comercios. API v1.12.</p>
                </div>
                <div class="welcome-card" onclick="navigateFromWelcome('perfiles-alta')">
                    <div class="card-icon green">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <h3>Perfiles</h3>
                    <p>Gestion de perfiles de comercio: indicadores, DCC, Bizum, TaxFree. API v2.3.</p>
                </div>
                <div class="welcome-card" onclick="navigateFromWelcome('terminales-consulta')">
                    <div class="card-icon purple">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    </div>
                    <h3>Terminales</h3>
                    <p>Terminales no presenciales: alta, baja, metodos de pago, operaciones. API v1.6.</p>
                </div>
            </div>

            <div style="margin-top:40px;text-align:left;max-width:800px;margin-left:auto;margin-right:auto;">
                <div class="card">
                    <div class="card-header"><h3>Inicio Rapido</h3></div>
                    <div class="card-body">
                        <ol style="padding-left:20px;color:var(--text-secondary);line-height:2;">
                            <li>Configure el entorno y credenciales en <a href="#" onclick="navigateFromWelcome('config-general');return false;">Configuracion General</a></li>
                            <li>Revise el <a href="#" onclick="navigateFromWelcome('config-firma');return false;">Modulo de Firma</a> para entender el proceso de autenticacion</li>
                            <li>Seleccione un servicio del menu lateral para ver su documentacion</li>
                            <li>Use la pestaña "Consola de Pruebas" para enviar peticiones reales</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>`;
    }

    // Settings modal
    function setupSettings() {
        const btnSettings = document.getElementById('btn-settings');
        const modal = document.getElementById('settings-modal');
        const closeBtn = document.getElementById('close-settings');
        const saveBtn = document.getElementById('save-settings');

        btnSettings.addEventListener('click', () => {
            loadSettingsModal();
            modal.classList.add('active');
        });

        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });

        saveBtn.addEventListener('click', () => {
            saveSettingsModal();
            modal.classList.remove('active');
        });

        // Environment change handler
        document.getElementById('setting-environment').addEventListener('change', (e) => {
            document.getElementById('custom-url-group').style.display = 
                e.target.value === 'custom' ? 'block' : 'none';
        });
    }

    function loadSettingsModal() {
        const config = AppConfig.getConfig();
        document.getElementById('setting-environment').value = config.environment;
        document.getElementById('setting-custom-url').value = config.customUrl || '';
        document.getElementById('setting-client-id').value = config.clientId || '';
        document.getElementById('setting-client-secret').value = config.clientSecret || '';
        document.getElementById('setting-signing-key').value = config.signingKey || '';
        document.getElementById('setting-signature-type').value = config.signatureType || 'HMAC-SHA256';
        document.getElementById('custom-url-group').style.display = 
            config.environment === 'custom' ? 'block' : 'none';
    }

    function saveSettingsModal() {
        AppConfig.saveConfig({
            environment: document.getElementById('setting-environment').value,
            customUrl: document.getElementById('setting-custom-url').value,
            clientId: document.getElementById('setting-client-id').value,
            clientSecret: document.getElementById('setting-client-secret').value,
            signingKey: document.getElementById('setting-signing-key').value,
            signatureType: document.getElementById('setting-signature-type').value
        });
        // Refresh current view to update URLs
        if (currentView) navigateTo(currentView);
    }

    // Sidebar toggles
    function setupSidebarToggles() {
        document.querySelectorAll('.sidebar-section-title').forEach(title => {
            title.addEventListener('click', () => {
                const targetId = title.getAttribute('data-toggle');
                const target = document.getElementById(targetId);
                if (target) {
                    target.style.display = target.style.display === 'none' ? 'block' : 
                        (target.style.display === 'block' ? 'none' : 'block');
                }
            });
        });
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', init);

    // Expose global functions needed by inline handlers
    window.navigateFromWelcome = function(viewKey) {
        navigateTo(viewKey);
    };
})();


// ===== Global Utility Functions =====

/**
 * Switch between tabs — scope-aware version.
 * Finds only the tab-content siblings that belong to the same logical group
 * by looking for a common ancestor that directly contains both the tab bar
 * and the tab-content panels.
 */
function switchTab(tabElement, contentId) {
    // 1. Deactivate all sibling tabs in the same tab bar
    const tabBar = tabElement.parentElement;
    tabBar.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tabElement.classList.add('active');

    // 2. Find the closest ancestor that owns the tab-content panels.
    //    We walk up until we find an element whose *direct* children include
    //    the target tab-content (or until we hit the document body).
    const target = document.getElementById(contentId);
    if (!target) return;

    // The container is the common parent of the tab bar and the tab panels.
    // We look for the nearest ancestor that contains both.
    let container = tabBar.parentElement;
    while (container && container !== document.body) {
        if (container.contains(target)) break;
        container = container.parentElement;
    }

    if (!container) return;

    // 3. Deactivate only the direct tab-content children of that container
    //    (not nested ones, to avoid clobbering inner tab groups).
    container.querySelectorAll(':scope > .tab-content').forEach(tc => {
        tc.classList.remove('active');
    });

    // 4. Activate the target panel
    target.classList.add('active');
}

/**
 * Toggle collapsible sections
 */
function toggleCollapsible(headerElement) {
    const collapsible = headerElement.parentElement;
    collapsible.classList.toggle('open');
}

/**
 * Copy code from code block
 */
function copyCode(btnElement) {
    const codeBlock = btnElement.parentElement;
    const text = codeBlock.textContent.replace('Copiar', '').trim();
    navigator.clipboard.writeText(text).then(() => {
        btnElement.textContent = 'Copiado!';
        setTimeout(() => { btnElement.textContent = 'Copiar'; }, 2000);
    });
}

/**
 * Format JSON in textarea
 */
function formatJson(textareaId) {
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;
    try {
        const parsed = JSON.parse(textarea.value);
        textarea.value = JSON.stringify(parsed, null, 4);
    } catch (e) {
        alert('JSON no valido: ' + e.message);
    }
}

/**
 * Clear console textarea
 */
function clearConsole(textareaId) {
    const textarea = document.getElementById(textareaId);
    if (textarea) textarea.value = '';
}

/**
 * Load example into textarea
 */
function loadExample(textareaId, endpointKey) {
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;

    // Try to find example from the appropriate module
    let example = null;
    if (endpointKey.startsWith('comercios-')) {
        const key = endpointKey.replace('comercios-', '');
        example = ComerciosViews.EXAMPLES[key];
    } else if (endpointKey.startsWith('perfiles-')) {
        const key = endpointKey.replace('perfiles-', '');
        example = PerfilesViews.EXAMPLES[key];
    } else if (endpointKey.startsWith('terminales-')) {
        const exKey = getTerminalesExampleKey(endpointKey);
        example = TerminalesViews.EXAMPLES[exKey];
    }

    if (example && example.request) {
        textarea.value = example.request;
    }
}

function getTerminalesExampleKey(endpointKey) {
    const map = {
        'terminales-consulta': 'consulta',
        'terminales-consulta-clave': 'consultaClave',
        'terminales-consulta-multiple': 'consultaMultiple',
        'terminales-alta': 'alta',
        'terminales-modificacion': 'modificacion',
        'terminales-baja': 'baja',
        'terminales-reactivacion': 'reactivacion',
        'terminales-alta-metodo': 'altaMetodo',
        'terminales-mod-metodo': 'modMetodo',
        'terminales-baja-metodo': 'bajaMetodo',
        'terminales-consulta-grupos': 'consultaGrupos',
        'terminales-alta-grupos': 'altaGrupos',
        'terminales-email-bienvenida': 'emailBienvenida',
        'terminales-email-claves': 'emailClaves',
        'terminales-consulta-operacion': 'consultaOperacion',
        'terminales-consulta-operaciones': 'consultaOperaciones'
    };
    return map[endpointKey] || 'consulta';
}

/**
 * Send API request from console
 */
async function sendApiRequest(endpointKey) {
    const urlInput   = document.getElementById('url-'    + endpointKey);
    const reqArea    = document.getElementById('req-'    + endpointKey);
    const resPre     = document.getElementById('res-'    + endpointKey);
    const statusSpan = document.getElementById('status-' + endpointKey);

    if (!urlInput || !reqArea || !resPre) {
        console.error('[HUB] sendApiRequest: elementos no encontrados para', endpointKey);
        return;
    }

    const url = urlInput.value.trim();
    if (!url) {
        resPre.textContent = '// Error: URL vacía. Configure el entorno en Ajustes.';
        return;
    }

    // Parse request body
    let body;
    try {
        body = JSON.parse(reqArea.value);
    } catch (e) {
        resPre.textContent = '// Error: JSON de petición no válido.\n// ' + e.message;
        return;
    }

    // Show loading state
    if (statusSpan) {
        statusSpan.innerHTML = '<span class="spinner"></span> Enviando...';
    }
    resPre.textContent = '// Enviando petición...\n// ' + url;

    // Optionally sign the request
    const config = AppConfig.getConfig();
    let signedBody = body;
    if (config.signingKey) {
        try {
            const category = endpointKey.startsWith('terminales') ? 'terminales'
                           : endpointKey.startsWith('perfiles')   ? 'perfiles'
                           : 'comercios';
            signedBody = await SignatureModule.signRequest(
                body, config.signingKey, category, config.signatureType
            );
        } catch (e) {
            console.warn('[HUB] Firma no aplicada:', e.message);
        }
    }

    // Send via ApiClient (uses proxy on Vercel, direct otherwise)
    try {
        const result = await ApiClient.sendRawRequest(url, 'POST', signedBody);

        // Status badge
        if (statusSpan) {
            const cls = result.ok ? 'success' : 'error';
            statusSpan.innerHTML =
                `<span class="response-status ${cls}">` +
                `${result.status} ${result.statusText}` +
                `<span class="response-time">${result.time}ms</span></span>`;
        }

        // Display response
        resPre.textContent = typeof result.data === 'object'
            ? JSON.stringify(result.data, null, 4)
            : (result.data || '(sin contenido)');

        // Verify response signature if present
        if (config.signingKey && result.data && typeof result.data === 'object' &&
            (result.data.signatureData || result.data.signature)) {
            try {
                const valid = await SignatureModule.verifyResponseSignature(
                    result.data, config.signingKey, config.signatureType
                );
                resPre.textContent +=
                    '\n\n// Firma de respuesta: ' + (valid ? '✓ VÁLIDA' : '✗ NO VERIFICADA');
            } catch (_) { /* ignore */ }
        }

    } catch (err) {
        if (statusSpan) {
            statusSpan.innerHTML = '<span class="response-status error">Error</span>';
        }
        resPre.textContent = JSON.stringify({
            error:  err.message,
            ayuda:  'Verifique la URL y la conectividad. Si el error es CORS, asegúrese de que la app está desplegada en Vercel o ejecutándose con un servidor local.'
        }, null, 4);
    }
}
