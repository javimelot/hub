/**
 * HUB de Adquirencia - Configuration Views
 */
const ConfigViews = (() => {

    function renderConfigGeneral() {
        return `
        <div class="doc-section">
            <div class="doc-header">
                <h2>Configuración General</h2>
                <p>Configure el entorno, credenciales y parámetros de conexión para las APIs de Redsys.</p>
            </div>

            <div class="card mb-6">
                <div class="card-header">
                    <h3>Entorno de Conexión</h3>
                </div>
                <div class="card-body">
                    <div class="info-box info">
                        <span class="info-box-icon">ℹ️</span>
                        <div>
                            <strong>URLs Base por Entorno:</strong><br>
                            Las APIs de Redsys disponen de dos entornos: Integración (pruebas) y Producción.
                            Seleccione el entorno adecuado según su fase de desarrollo.
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Entorno Activo</label>
                        <select id="cfg-environment" onchange="ConfigViews.onEnvironmentChange(this.value)">
                            <option value="integration">Integración (apis-i.redsys.es:20443)</option>
                            <option value="production">Producción (apis.redsys.es)</option>
                            <option value="custom">URL Personalizada</option>
                        </select>
                    </div>

                    <div id="cfg-custom-url-section" class="hidden">
                        <div class="form-group">
                            <label>URL Base Personalizada</label>
                            <input type="text" id="cfg-custom-url" placeholder="https://mi-proxy.ejemplo.com/api">
                        </div>
                    </div>

                    <h4 class="mt-4" style="font-size:14px; margin-bottom:12px;">URLs Configuradas</h4>
                    <div class="headers-list" id="cfg-urls-display">
                        ${renderUrlsDisplay('integration')}
                    </div>
                </div>
            </div>

            <div class="card mb-6">
                <div class="card-header">
                    <h3>Credenciales de Acceso</h3>
                </div>
                <div class="card-body">
                    <div class="info-box warning">
                        <span class="info-box-icon">⚠️</span>
                        <div>
                            Las credenciales se almacenan localmente en el navegador (localStorage).
                            No utilice credenciales de producción en entornos no seguros.
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>RedsysClientId</label>
                            <input type="text" id="cfg-client-id" placeholder="ID de suscripción proporcionado por Redsys">
                        </div>
                        <div class="form-group">
                            <label>RedsysClientSecret</label>
                            <input type="password" id="cfg-client-secret" placeholder="Secret de suscripción">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Clave de Firma (HMAC)</label>
                            <input type="password" id="cfg-signing-key" placeholder="Clave para cálculo de firma">
                        </div>
                        <div class="form-group">
                            <label>Tipo de Firma</label>
                            <select id="cfg-signature-type">
                                <option value="HMAC-SHA256">HMAC-SHA256</option>
                                <option value="HMAC-SHA512">HMAC-SHA512</option>
                            </select>
                        </div>
                    </div>

                    <button class="btn btn-primary" onclick="ConfigViews.saveConfiguration()">
                        Guardar Configuración
                    </button>
                    <span id="cfg-save-status" class="text-success" style="margin-left:12px;font-size:13px;"></span>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>Cabeceras HTTP Requeridas</h3>
                </div>
                <div class="card-body">
                    <p style="margin-bottom:12px;color:var(--text-secondary);font-size:13px;">
                        Todas las peticiones a las APIs requieren las siguientes cabeceras:
                    </p>
                    <table class="params-table">
                        <thead>
                            <tr><th>Cabecera</th><th>Valor</th><th>Descripción</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="param-name">Content-Type</td>
                                <td><code>application/json</code></td>
                                <td>Tipo de contenido de la petición</td>
                            </tr>
                            <tr>
                                <td class="param-name">RedsysClientId</td>
                                <td><code>{Id de suscripción}</code></td>
                                <td>Identificador de suscripción proporcionado por Redsys</td>
                            </tr>
                            <tr>
                                <td class="param-name">RedsysClientSecret</td>
                                <td><code>{Secret de suscripción}</code></td>
                                <td>Secret de suscripción proporcionado por Redsys</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;
    }

    function renderConfigFirma() {
        return `
        <div class="doc-section">
            <div class="doc-header">
                <h2>Módulo de Firma Digital</h2>
                <p>Documentación del proceso de firma HMAC utilizado en todas las APIs del HUB de Adquirencia.</p>
            </div>

            <div class="card mb-6">
                <div class="card-header">
                    <h3>Proceso de Firma - Petición</h3>
                </div>
                <div class="card-body">
                    <div class="info-box info">
                        <span class="info-box-icon">🔐</span>
                        <div>
                            La firma garantiza la integridad y autenticidad de los mensajes intercambiados con las APIs.
                            Se soportan dos algoritmos: HMAC-SHA256 y HMAC-SHA512.
                        </div>
                    </div>

                    <h4 style="font-size:14px;margin-bottom:12px;">HMAC-SHA256 (Firma Entidad)</h4>
                    <ol style="padding-left:20px;color:var(--text-secondary);font-size:13px;line-height:2;">
                        <li>Serializar el bloque <code>data</code> del mensaje como cadena JSON</li>
                        <li>Aplicar HMAC-SHA256 usando la clave de la entidad</li>
                        <li>Codificar el resultado en Base64 URL-safe (reemplazar +/- por -/_)</li>
                        <li>Incluir la firma en el campo <code>signatureData.signature</code></li>
                        <li>Indicar el tipo de firma en <code>signatureData.signatureType</code> = "T29V2"</li>
                    </ol>

                    <h4 style="font-size:14px;margin:20px 0 12px;">HMAC-SHA512 (Firma Entidad)</h4>
                    <ol style="padding-left:20px;color:var(--text-secondary);font-size:13px;line-height:2;">
                        <li>Serializar el bloque <code>data</code> del mensaje como cadena JSON</li>
                        <li>Aplicar HMAC-SHA512 usando la clave de la entidad</li>
                        <li>Codificar el resultado en Base64 URL-safe</li>
                        <li>Incluir la firma en el campo <code>signatureData.signature</code></li>
                        <li>Indicar el tipo de firma en <code>signatureData.signatureType</code> = "T29V2"</li>
                    </ol>
                </div>
            </div>

            <div class="card mb-6">
                <div class="card-header">
                    <h3>Proceso de Firma - Respuesta</h3>
                </div>
                <div class="card-body">
                    <p style="color:var(--text-secondary);font-size:13px;margin-bottom:12px;">
                        La respuesta también incluye una firma que debe verificarse para garantizar la integridad:
                    </p>
                    <ol style="padding-left:20px;color:var(--text-secondary);font-size:13px;line-height:2;">
                        <li>Extraer el bloque <code>data</code> de la respuesta</li>
                        <li>Serializar como cadena JSON</li>
                        <li>Calcular HMAC con la misma clave y algoritmo</li>
                        <li>Comparar con el valor en <code>signatureData.signature</code></li>
                    </ol>
                </div>
            </div>

            <div class="card mb-6">
                <div class="card-header">
                    <h3>Herramienta de Prueba de Firma</h3>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label>Datos a Firmar (JSON)</label>
                        <textarea id="sign-test-data" rows="5" placeholder='{"fuc":"999999999","terminal":"1","idTransaction":"123456789012"}'></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Clave</label>
                            <input type="text" id="sign-test-key" placeholder="Clave de firma">
                        </div>
                        <div class="form-group">
                            <label>Algoritmo</label>
                            <select id="sign-test-algo">
                                <option value="HMAC-SHA256">HMAC-SHA256</option>
                                <option value="HMAC-SHA512">HMAC-SHA512</option>
                            </select>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="ConfigViews.testSignature()">Calcular Firma</button>
                    
                    <div class="signature-panel mt-4" id="sign-test-result" style="display:none;">
                        <h5>Resultado de la Firma</h5>
                        <div class="signature-result" id="sign-test-output"></div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>Estructura del Mensaje Firmado</h3>
                </div>
                <div class="card-body">
                    <div class="code-example">
                        <h5>Ejemplo - API Terminales</h5>
                        <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>{
    "info": {
        "data": {
            "fuc": "251533972",
            "idTransaction": "462706983089",
            "terminal": "1"
        }
    },
    "signatureData": {
        "signatureType": "T29V2",
        "signature": "uwO2N0J9jVRJ8yiyRWFeYnqD7DY6FRLt41v0b6LYUs_8JqLxX0xdLA-i7UwplNfRD2E195XYCQuH5RR4Kr2OiA=="
    }
}</div>
                    </div>

                    <div class="code-example">
                        <h5>Ejemplo - API Comercios/Perfiles</h5>
                        <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>{
    "data": {
        "fuc": 999999999,
        "tipoPeticion": 1,
        "csbPeticion": 49,
        "tipo": 1,
        "csb": 49,
        "datosComercio": { ... }
    },
    "signature": {
        "signatureType": "HMAC-SHA256",
        "signature": "base64-encoded-hmac-value"
    }
}</div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    function renderUrlsDisplay(env) {
        const urls = AppConfig.ENVIRONMENTS[env]?.baseUrls || {};
        return `
            <div class="header-item"><span class="header-key">Comercios</span><span class="header-value">${urls.comercios || 'N/A'}</span></div>
            <div class="header-item"><span class="header-key">Perfiles</span><span class="header-value">${urls.perfiles || 'N/A'}</span></div>
            <div class="header-item"><span class="header-key">Terminales</span><span class="header-value">${urls.terminales || 'N/A'}</span></div>
        `;
    }

    function onEnvironmentChange(value) {
        const customSection = document.getElementById('cfg-custom-url-section');
        const urlsDisplay = document.getElementById('cfg-urls-display');
        
        if (value === 'custom') {
            customSection.classList.remove('hidden');
            urlsDisplay.innerHTML = '<div class="header-item"><span class="header-key">Custom</span><span class="header-value">Según URL configurada</span></div>';
        } else {
            customSection.classList.add('hidden');
            urlsDisplay.innerHTML = renderUrlsDisplay(value);
        }
    }

    function saveConfiguration() {
        const config = {
            environment: document.getElementById('cfg-environment').value,
            customUrl: document.getElementById('cfg-custom-url')?.value || '',
            clientId: document.getElementById('cfg-client-id').value,
            clientSecret: document.getElementById('cfg-client-secret').value,
            signingKey: document.getElementById('cfg-signing-key').value,
            signatureType: document.getElementById('cfg-signature-type').value
        };
        AppConfig.saveConfig(config);
        
        const status = document.getElementById('cfg-save-status');
        status.textContent = '✓ Configuración guardada';
        setTimeout(() => { status.textContent = ''; }, 3000);
    }

    async function testSignature() {
        const data = document.getElementById('sign-test-data').value;
        const key = document.getElementById('sign-test-key').value;
        const algo = document.getElementById('sign-test-algo').value;

        if (!data || !key) {
            alert('Introduzca los datos y la clave para calcular la firma.');
            return;
        }

        const result = await SignatureModule.computeSignature(data, key, algo);
        
        document.getElementById('sign-test-result').style.display = 'block';
        document.getElementById('sign-test-output').textContent = result;
    }

    function loadSavedConfig() {
        const config = AppConfig.getConfig();
        const envSelect = document.getElementById('cfg-environment');
        if (envSelect) envSelect.value = config.environment;
        
        const clientId = document.getElementById('cfg-client-id');
        if (clientId) clientId.value = config.clientId || '';
        
        const clientSecret = document.getElementById('cfg-client-secret');
        if (clientSecret) clientSecret.value = config.clientSecret || '';
        
        const signingKey = document.getElementById('cfg-signing-key');
        if (signingKey) signingKey.value = config.signingKey || '';
        
        const sigType = document.getElementById('cfg-signature-type');
        if (sigType) sigType.value = config.signatureType || 'HMAC-SHA256';
    }

    return {
        renderConfigGeneral,
        renderConfigFirma,
        onEnvironmentChange,
        saveConfiguration,
        testSignature,
        loadSavedConfig
    };
})();
