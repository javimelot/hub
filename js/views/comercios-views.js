/**
 * HUB de Adquirencia - Comercios Views
 * API Servicios Configuración Comercios v1.12
 */
const ComerciosViews = (() => {

    const EXAMPLES = {
        alta: {
            request: `{
    "fuc": 999999999,
    "tipoPeticion": 1,
    "csbPeticion": 49,
    "tipo": 1,
    "csb": 49,
    "datosComercio": {
        "nombre": "COMERCIO PRUEBA SL",
        "nombreReducido": "COM PRUEBA",
        "tipoDocumento": 1,
        "numeroDocumento": "B12345678",
        "pais": 724,
        "sectorActividad": 5411,
        "direccion": {
            "nacional": {
                "tipo": "CL",
                "domicilio": "Gran Via",
                "numeroDomicilio": 28,
                "codigoPostal": 28013,
                "localidad": "Madrid"
            }
        },
        "contactos": [
            {
                "nivel": "01",
                "telefono": 912345678,
                "nombre": "Juan García",
                "email": "juan@comercio.es",
                "telefonoE164": "+34912345678"
            }
        ],
        "url": "https://www.comercio-prueba.es"
    }
}`,
            response: `{
    "code": "00",
    "description": "Operación realizada correctamente",
    "data": {
        "fuc": 999999999
    }
}`
        },
        modificacion: {
            request: `{
    "fuc": 999999999,
    "tipoPeticion": 1,
    "csbPeticion": 49,
    "tipo": 1,
    "csb": 49,
    "datosComercio": {
        "nombre": "COMERCIO PRUEBA MODIFICADO SL",
        "contactos": [
            {
                "nivel": "01",
                "telefono": 912345679,
                "nombre": "María López",
                "email": "maria@comercio.es"
            }
        ]
    }
}`,
            response: `{
    "code": "00",
    "description": "Operación realizada correctamente"
}`
        },
        consulta: {
            request: `{
    "fuc": 999999999,
    "tipoPeticion": 1,
    "csbPeticion": 49,
    "tipo": 1,
    "csb": 49
}`,
            response: `{
    "code": "00",
    "description": "Operación realizada correctamente",
    "data": {
        "fuc": 999999999,
        "datosComercio": {
            "nombre": "COMERCIO PRUEBA SL",
            "nombreReducido": "COM PRUEBA",
            "tipoDocumento": 1,
            "numeroDocumento": "B12345678",
            "pais": 724,
            "sectorActividad": 5411,
            "direccion": {
                "nacional": {
                    "tipo": "CL",
                    "domicilio": "Gran Via",
                    "numeroDomicilio": 28,
                    "codigoPostal": 28013,
                    "localidad": "Madrid"
                }
            },
            "contactos": [
                {
                    "nivel": "01",
                    "telefono": 912345678,
                    "nombre": "Juan García",
                    "email": "juan@comercio.es"
                }
            ]
        }
    }
}`
        },
        listado: {
            request: `{
    "tipoPeticion": 1,
    "csbPeticion": 49,
    "tipo": 1,
    "csb": 49,
    "filtro": {
        "nombre": "COMERCIO"
    }
}`,
            response: `{
    "code": "00",
    "description": "Operación realizada correctamente",
    "data": {
        "comercios": [
            {
                "fuc": 999999999,
                "nombre": "COMERCIO PRUEBA SL",
                "sectorActividad": 5411,
                "pais": 724
            },
            {
                "fuc": 999999998,
                "nombre": "COMERCIO EJEMPLO SA",
                "sectorActividad": 5812,
                "pais": 724
            }
        ],
        "totalRegistros": 2
    }
}`
        }
    };

    function renderAlta() {
        return renderServiceView({
            title: 'Alta de Comercio',
            description: 'Servicio para el alta de comercio en Redsys. Realiza automáticamente el alta de datos por defecto necesarios (perfil, descuentos, tasas o contratos específicos) según el modelo de negocio de la entidad.',
            method: 'POST',
            endpoint: 'comercios-alta',
            urlPath: '/add-commerce',
            parameters: getAltaParameters(),
            example: EXAMPLES.alta,
            responseCodes: getResponseCodes(),
            notes: [
                'Si no se informa el FUC y la entidad tiene asignación automática activada, se generará automáticamente.',
                'El campo FUC es obligatorio para alta de comercio en ámbito internacional.',
                'Según el esquema de la entidad (4B u otro), serán necesarios datos adicionales como cuenta, descuentos y perfil por defecto.',
                'La URL es obligatoria para comercio electrónico y debe cumplir formato válido (incluir esquema http/https).',
                'El teléfono en formato E164 se genera automáticamente si no se informa.'
            ]
        });
    }

    function renderModificacion() {
        return renderServiceView({
            title: 'Modificación de Comercio',
            description: 'Servicio para la modificación de los datos de un comercio existente en Redsys. Solo se envían los campos que se desean modificar.',
            method: 'POST',
            endpoint: 'comercios-modificacion',
            urlPath: '/modify-commerce',
            parameters: getModificacionParameters(),
            example: EXAMPLES.modificacion,
            responseCodes: getResponseCodes(),
            notes: [
                'Solo se deben enviar los campos que se desean modificar.',
                'El FUC es obligatorio para identificar el comercio a modificar.',
                'Los campos tipoPeticion, csbPeticion, tipo y csb son siempre obligatorios.'
            ]
        });
    }

    function renderConsulta() {
        return renderServiceView({
            title: 'Consulta de Comercio Específico',
            description: 'Servicio para la recuperación de los datos de un comercio específico identificado por su FUC.',
            method: 'POST',
            endpoint: 'comercios-consulta',
            urlPath: '/get-commerce',
            parameters: getConsultaParameters(),
            example: EXAMPLES.consulta,
            responseCodes: getResponseCodes(),
            notes: [
                'Devuelve todos los datos del comercio incluyendo dirección, contactos, cuenta y perfil.',
                'El FUC es obligatorio para identificar el comercio.'
            ]
        });
    }

    function renderListado() {
        return renderServiceView({
            title: 'Consulta Listado de Comercios',
            description: 'Servicio para la recuperación de datos de comercios por ciertos parámetros de búsqueda (filtros).',
            method: 'POST',
            endpoint: 'comercios-listado',
            urlPath: '/get-commerces',
            parameters: getListadoParameters(),
            example: EXAMPLES.listado,
            responseCodes: getResponseCodes(),
            notes: [
                'Permite filtrar por nombre, sector de actividad, país y otros criterios.',
                'Devuelve un listado paginado de comercios que coinciden con los filtros.'
            ]
        });
    }

    function getAltaParameters() {
        return [
            { name: 'fuc', type: 'Integer N9', required: 'conditional', desc: 'Código que identifica al establecimiento. Si no se informa y la entidad tiene asignación automática, se genera automáticamente. Obligatorio para ámbito internacional.' },
            { name: 'mid', type: 'Integer N15', required: 'conditional', desc: 'Identificador del establecimiento en ámbito internacional. Se rellena con ceros por la izquierda. Reservado para uso futuro.' },
            { name: 'tipoPeticion', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad peticionaria.' },
            { name: 'csbPeticion', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad peticionaria.' },
            { name: 'tipo', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad adquirente del comercio.' },
            { name: 'csb', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad adquirente del comercio.' },
            { name: 'datosComercio.nombre', type: 'String AN40', required: 'required', desc: 'Nombre asignado al establecimiento.' },
            { name: 'datosComercio.nombreReducido', type: 'String AN15', required: 'optional', desc: 'Nombre corto. Si no se especifica, se usan las primeras 15 posiciones del nombre.' },
            { name: 'datosComercio.tipoDocumento', type: 'Integer', required: 'required', desc: 'Tipo de documento del propietario (1=NIF/CIF, 2=Pasaporte, 3=Doc.Extranjero, etc.).' },
            { name: 'datosComercio.numeroDocumento', type: 'String AN12', required: 'required', desc: 'Número del documento. Se valida el carácter verificador.' },
            { name: 'datosComercio.pais', type: 'Integer N3', required: 'required', desc: 'Código ISO del país.' },
            { name: 'datosComercio.sectorActividad', type: 'Integer N4', required: 'required', desc: 'Sector de actividad nacional (MCC).' },
            { name: 'datosComercio.sectorActividadInternacional', type: 'Integer N4', required: 'optional', desc: 'Sector actividad internacional. Si no se especifica, se asigna automáticamente.' },
            { name: 'datosComercio.direccion', type: 'Objeto', required: 'required', desc: 'Datos de dirección del comercio (nacional o internacional).' },
            { name: 'datosComercio.contactos', type: 'Lista', required: 'required', desc: 'Lista de contactos. Mínimo un elemento. No se permiten duplicados.' },
            { name: 'datosComercio.url', type: 'String AN100', required: 'conditional', desc: 'URL de la página web. Obligatoria para comercio electrónico. Formato válido con esquema (http/https).' },
            { name: 'datosComercio.cuenta', type: 'Objeto', required: 'conditional', desc: 'Datos de cuenta bancaria. Solo aplica para entidades 4B.' },
            { name: 'datosComercio.perfilDefecto', type: 'Objeto', required: 'conditional', desc: 'Datos mínimos del perfil por defecto. Solo aplica para entidades 4B.' }
        ];
    }

    function getModificacionParameters() {
        return [
            { name: 'fuc', type: 'Integer N9', required: 'required', desc: 'Código que identifica al establecimiento a modificar.' },
            { name: 'tipoPeticion', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad peticionaria.' },
            { name: 'csbPeticion', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad peticionaria.' },
            { name: 'tipo', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad adquirente.' },
            { name: 'csb', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad adquirente.' },
            { name: 'datosComercio', type: 'Objeto', required: 'required', desc: 'Objeto con los campos a modificar. Solo incluir los campos que cambian.' }
        ];
    }

    function getConsultaParameters() {
        return [
            { name: 'fuc', type: 'Integer N9', required: 'required', desc: 'Código que identifica al establecimiento a consultar.' },
            { name: 'tipoPeticion', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad peticionaria.' },
            { name: 'csbPeticion', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad peticionaria.' },
            { name: 'tipo', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad adquirente.' },
            { name: 'csb', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad adquirente.' }
        ];
    }

    function getListadoParameters() {
        return [
            { name: 'tipoPeticion', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad peticionaria.' },
            { name: 'csbPeticion', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad peticionaria.' },
            { name: 'tipo', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad adquirente.' },
            { name: 'csb', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad adquirente.' },
            { name: 'filtro.nombre', type: 'String', required: 'optional', desc: 'Filtro por nombre del comercio.' },
            { name: 'filtro.sectorActividad', type: 'Integer', required: 'optional', desc: 'Filtro por sector de actividad.' },
            { name: 'filtro.pais', type: 'Integer', required: 'optional', desc: 'Filtro por código de país ISO.' }
        ];
    }

    function getResponseCodes() {
        return [
            { code: '00', type: 'success', desc: 'Operación realizada correctamente' },
            { code: '01', type: 'error', desc: 'Error en formato de datos de entrada' },
            { code: '02', type: 'error', desc: 'Error: FUC no encontrado' },
            { code: '03', type: 'error', desc: 'Error: Entidad no autorizada' },
            { code: '04', type: 'error', desc: 'Error: Comercio ya existente' },
            { code: '05', type: 'error', desc: 'Error: Datos obligatorios no informados' },
            { code: '06', type: 'error', desc: 'Error: Sector de actividad no válido' },
            { code: '07', type: 'error', desc: 'Error: Código postal no válido' },
            { code: '08', type: 'error', desc: 'Error: Documento de identidad no válido' },
            { code: '09', type: 'error', desc: 'Error: Cuenta bancaria no válida' },
            { code: '10', type: 'error', desc: 'Error: URL no válida' },
            { code: '99', type: 'error', desc: 'Error interno del sistema' }
        ];
    }

    // Generic service view renderer
    function renderServiceView({ title, description, method, endpoint, urlPath, parameters, example, responseCodes, notes }) {
        const config = AppConfig.getConfig();
        const env = config.environment === 'custom' ? 'custom' : config.environment;
        const baseUrl = AppConfig.getBaseUrl('comercios');
        const fullUrl = baseUrl + urlPath;

        return `
        <div class="doc-section">
            <div class="doc-header">
                <h2>${title}</h2>
                <p>${description}</p>
            </div>

            <div class="doc-endpoint">
                <span class="method post">${method}</span>
                <span class="url">${fullUrl}</span>
            </div>

            ${notes ? `
            <div class="info-box info mb-4">
                <span class="info-box-icon">ℹ️</span>
                <div>
                    <strong>Notas importantes:</strong>
                    <ul style="margin-top:4px;padding-left:16px;">
                        ${notes.map(n => `<li style="margin-bottom:4px;">${n}</li>`).join('')}
                    </ul>
                </div>
            </div>` : ''}

            <!-- Tabs -->
            <div class="tabs-container">
            <div class="tabs">
                <div class="tab active" onclick="switchTab(this, 'doc-tab-${endpoint}')">Documentación</div>
                <div class="tab" onclick="switchTab(this, 'code-tab-${endpoint}')">Ejemplos de Código</div>
                <div class="tab" onclick="switchTab(this, 'console-tab-${endpoint}')">Consola de Pruebas</div>
            </div>

            <!-- Documentation Tab -->
            <div class="tab-content active" id="doc-tab-${endpoint}">
                <div class="collapsible open">
                    <div class="collapsible-header" onclick="toggleCollapsible(this)">
                        <h4>Parámetros de Entrada</h4>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="collapsible-body">
                        <table class="params-table">
                            <thead>
                                <tr><th>Campo</th><th>Tipo</th><th>Obligatorio</th><th>Descripción</th></tr>
                            </thead>
                            <tbody>
                                ${parameters.map(p => `
                                <tr>
                                    <td class="param-name">${p.name}</td>
                                    <td class="param-type">${p.type}</td>
                                    <td><span class="badge badge-${p.required}">${p.required === 'required' ? 'Sí' : p.required === 'conditional' ? 'Cond.' : 'No'}</span></td>
                                    <td class="param-desc">${p.desc}</td>
                                </tr>`).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="collapsible open">
                    <div class="collapsible-header" onclick="toggleCollapsible(this)">
                        <h4>Ejemplo de Petición</h4>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="collapsible-body">
                        <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${example.request}</div>
                    </div>
                </div>

                <div class="collapsible open">
                    <div class="collapsible-header" onclick="toggleCollapsible(this)">
                        <h4>Ejemplo de Respuesta</h4>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="collapsible-body">
                        <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${example.response}</div>
                    </div>
                </div>

                <div class="collapsible">
                    <div class="collapsible-header" onclick="toggleCollapsible(this)">
                        <h4>Códigos de Respuesta</h4>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="collapsible-body">
                        <table class="response-codes">
                            <thead><tr><th>Código</th><th>Descripción</th></tr></thead>
                            <tbody>
                                ${responseCodes.map(rc => `
                                <tr>
                                    <td><span class="code ${rc.type}">${rc.code}</span></td>
                                    <td>${rc.desc}</td>
                                </tr>`).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Code Examples Tab -->
            <div class="tab-content" id="code-tab-${endpoint}">
                ${CodeExamples.render(endpoint, fullUrl, example.request, 'comercios')}
            </div>

            <!-- Console Tab -->
            <div class="tab-content" id="console-tab-${endpoint}">
                <div class="url-bar">
                    <span class="method-badge">${method}</span>
                    <input type="text" class="url-input" id="url-${endpoint}" value="${fullUrl}">
                    <button class="btn-send" onclick="sendApiRequest('${endpoint}')">Enviar</button>
                </div>

                <div class="api-console">
                    <div class="console-request">
                        <div class="console-header">
                            <h4>Request Body</h4>
                            <button class="btn btn-sm btn-outline" onclick="formatJson('req-${endpoint}')">Formatear</button>
                        </div>
                        <div class="console-body">
                            <textarea id="req-${endpoint}">${example.request}</textarea>
                        </div>
                        <div class="console-actions">
                            <button class="btn btn-sm btn-outline" onclick="loadExample('req-${endpoint}', '${endpoint}')">Cargar Ejemplo</button>
                            <button class="btn btn-sm btn-outline" onclick="clearConsole('req-${endpoint}')">Limpiar</button>
                        </div>
                    </div>

                    <div class="console-response">
                        <div class="console-header">
                            <h4>Response</h4>
                            <span id="status-${endpoint}"></span>
                        </div>
                        <div class="console-body">
                            <pre id="res-${endpoint}">// La respuesta aparecerá aquí...</pre>
                        </div>
                    </div>
                </div>
            </div>
            </div><!-- /tabs-container -->
        </div>`;
    }

    return {
        renderAlta,
        renderModificacion,
        renderConsulta,
        renderListado,
        EXAMPLES
    };
})();
