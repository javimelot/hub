/**
 * HUB de Adquirencia - Perfiles Views
 * API Servicios Configuración Perfiles v2.3
 */
const PerfilesViews = (() => {

    const EXAMPLES = {
        alta: {
            request: `{
    "fuc": 999999999,
    "tipoPeticion": 1,
    "csbPeticion": 49,
    "tipo": 1,
    "csb": 49,
    "datosPerfil": {
        "indKeyEntryOnUs": "0",
        "indCtrlDevoluciones": "1",
        "totalAutorizaciones": "1",
        "indClienteVip": "N",
        "indEsquemaDomesticoEDU": "0",
        "indMultiadquirencia": "1",
        "indPreautorizaciones": "0",
        "indPropina": "0",
        "indRecarga": "0",
        "indPagoNoPresente": "0",
        "indNoSeguro": "0",
        "idioma": "1",
        "codHorario": 1,
        "indTicketBaiVerifactu": "0",
        "monedaLiquidacion": 978,
        "cierreaut": "3",
        "indCreTpv": "0",
        "indImprePubli": "1",
        "indTarjRegalo": "0",
        "indTicketSeguro": "0",
        "indFirmaDigitalizada": "0",
        "indLowPrice": "0",
        "indPagosQR": "0",
        "indAlertaOperaciones": "0",
        "indDiscover": "0",
        "indPagoTrib": "0",
        "indTicketElectronico": "0",
        "operAbono": "0",
        "pagosInmediatos": {
            "indBizum": "0"
        }
    }
}`,
            response: `{
    "code": "00",
    "description": "Operación realizada correctamente",
    "data": {
        "fuc": 999999999,
        "tipo": 1,
        "csb": 49
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
    "datosPerfil": {
        "indPreautorizaciones": "1",
        "indPropina": "1",
        "idioma": "5"
    }
}`,
            response: `{
    "code": "00",
    "description": "Operación realizada correctamente"
}`
        },
        baja: {
            request: `{
    "fuc": 999999999,
    "tipoPeticion": 1,
    "csbPeticion": 49,
    "tipo": 1,
    "csb": 49
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
        "tipo": 1,
        "csb": 49,
        "datosPerfil": {
            "indKeyEntryOnUs": "0",
            "indCtrlDevoluciones": "1",
            "totalAutorizaciones": "1",
            "indClienteVip": "N",
            "indMultiadquirencia": "1",
            "indPreautorizaciones": "1",
            "indPropina": "1",
            "indRecarga": "0",
            "indPagoNoPresente": "0",
            "indNoSeguro": "0",
            "idioma": "5",
            "codHorario": 1,
            "monedaLiquidacion": 978,
            "cierreaut": "3",
            "indCreTpv": "0",
            "indImprePubli": "1",
            "indDiscover": "0",
            "indPagoTrib": "0",
            "indTicketElectronico": "0",
            "operAbono": "0",
            "usuarioAlta": "APIUSER1",
            "fechaAlta": "2024-01-15"
        }
    }
}`
        }
    };

    function renderAlta() {
        return renderServiceView({
            title: 'Alta de Perfil de Comercio',
            description: 'Servicio para el alta del perfil del comercio. Solo disponible para entidades que no pertenecen al esquema 4B. El perfil define la configuración operativa del comercio (indicadores, DCC, pagos, etc.).',
            method: 'POST',
            endpoint: 'perfiles-alta',
            urlPath: '/add-commerce-profile',
            parameters: getAltaParameters(),
            example: EXAMPLES.alta,
            responseCodes: getResponseCodes(),
            notes: [
                'Solo disponible para entidades que NO pertenecen al esquema 4B.',
                'El bloque datosPerfil contiene múltiples indicadores con valores por defecto.',
                'Los bloques opcionales (DCC, TaxFree, CashBack, etc.) solo se informan si se requiere esa funcionalidad.',
                'Los indicadores no informados tomarán sus valores por defecto.',
                'El campo indTicketBaiVerifactu admite valores: 0=NO, 1=TICKETBAI, 2=VERIFACTU, 3=FACTURACIÓN SIN VERIFACTU.'
            ]
        });
    }

    function renderModificacion() {
        return renderServiceView({
            title: 'Modificación de Perfil de Comercio',
            description: 'Servicio para la modificación del perfil de un comercio existente. Solo se envían los campos del perfil que se desean modificar.',
            method: 'POST',
            endpoint: 'perfiles-modificacion',
            urlPath: '/modify-commerce-profile',
            parameters: getModificacionParameters(),
            example: EXAMPLES.modificacion,
            responseCodes: getResponseCodes(),
            notes: [
                'Solo se deben enviar los campos del perfil que se desean modificar.',
                'Los campos fuc, tipoPeticion, csbPeticion, tipo y csb son siempre obligatorios para identificar el perfil.'
            ]
        });
    }

    function renderBaja() {
        return renderServiceView({
            title: 'Baja de Perfil de Comercio',
            description: 'Servicio para dar de baja el perfil de un comercio.',
            method: 'POST',
            endpoint: 'perfiles-baja',
            urlPath: '/delete-commerce-profile',
            parameters: getBajaParameters(),
            example: EXAMPLES.baja,
            responseCodes: getResponseCodes(),
            notes: [
                'La baja del perfil no elimina el comercio, solo su configuración de perfil para la entidad indicada.'
            ]
        });
    }

    function renderConsulta() {
        return renderServiceView({
            title: 'Consulta de Perfil de Comercio',
            description: 'Servicio para consultar el perfil completo de un comercio, incluyendo todos sus indicadores y configuraciones.',
            method: 'POST',
            endpoint: 'perfiles-consulta',
            urlPath: '/get-commerce-profile',
            parameters: getConsultaParameters(),
            example: EXAMPLES.consulta,
            responseCodes: getResponseCodes(),
            notes: [
                'Devuelve todos los datos del perfil incluyendo indicadores, bloques DCC, TaxFree, pagos inmediatos, etc.',
                'Los campos usuarioAlta y fechaAlta son solo informativos y se devuelven en la consulta.'
            ]
        });
    }

    function getAltaParameters() {
        return [
            { name: 'fuc', type: 'Integer N9', required: 'required', desc: 'Código que identifica al comercio.' },
            { name: 'tipoPeticion', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad peticionaria/procesadora.' },
            { name: 'csbPeticion', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad peticionaria/procesadora.' },
            { name: 'tipo', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad adquirente asociada al perfil.' },
            { name: 'csb', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad adquirente asociada al perfil.' },
            { name: 'datosPerfil', type: 'Objeto', required: 'required', desc: 'Datos del perfil (ver campos detallados abajo).' },
            { name: 'datosPerfil.indKeyEntryOnUs', type: 'String AN1', required: 'optional', desc: 'Indicador ON-US. Valores: 0=No, 1=Sí. Defecto: 0.' },
            { name: 'datosPerfil.indCtrlDevoluciones', type: 'String AN1', required: 'optional', desc: 'Control devoluciones. 0=No controla, 1=Sí controla. Defecto: 1.' },
            { name: 'datosPerfil.totalAutorizaciones', type: 'String AN1', required: 'optional', desc: 'Totales en cierre automático. 0=No, 1=Sí. Defecto: 1.' },
            { name: 'datosPerfil.indClienteVip', type: 'String AN1', required: 'optional', desc: 'Cliente VIP. N=No, S=Sí. Defecto: N.' },
            { name: 'datosPerfil.indMultiadquirencia', type: 'String AN1', required: 'optional', desc: 'Multiadquirencia. 0=No, 1=Sí. Defecto: 1.' },
            { name: 'datosPerfil.indPreautorizaciones', type: 'String AN1', required: 'optional', desc: 'Preautorizaciones. 0=No, 1=Sí. Defecto: 0.' },
            { name: 'datosPerfil.indPropina', type: 'String AN1', required: 'optional', desc: 'Propinas. 0=No, 1=Sí. Defecto: 0.' },
            { name: 'datosPerfil.indRecarga', type: 'String AN1', required: 'optional', desc: 'Recarga telefónica. 0=No, 1=Sí. Defecto: 0.' },
            { name: 'datosPerfil.indPagoNoPresente', type: 'String AN1', required: 'optional', desc: 'Pagos no presenciales. 0=No, 1=Sí, 2=Avanzada Redsys, 3=Avanzada Redsys+Marcas, 4=Avanzada Marcas. Defecto: 0.' },
            { name: 'datosPerfil.indNoSeguro', type: 'String AN1', required: 'optional', desc: 'Comercio electrónico no seguro. 0=No, 1=Sí. Defecto: 0.' },
            { name: 'datosPerfil.idioma', type: 'String AN1', required: 'optional', desc: 'Idioma recibos: 1=Castellano, 2=Catalán, 3=Portugués, 4=Francés, 5=Inglés, 6=Euskera, 7=Italiano, 8=Alemán, 9=Gallego, A=Valenciano. Defecto: 1.' },
            { name: 'datosPerfil.monedaLiquidacion', type: 'Integer N3', required: 'optional', desc: 'Moneda ISO de liquidación. Defecto: 978 (EUR).' },
            { name: 'datosPerfil.indTicketBaiVerifactu', type: 'String AN1', required: 'optional', desc: 'TicketBAI/Verifactu. 0=No, 1=TICKETBAI, 2=VERIFACTU, 3=FACTURACIÓN SIN VERIFACTU.' },
            { name: 'datosPerfil.datosDCC', type: 'Objeto', required: 'optional', desc: 'Configuración DCC (Dynamic Currency Conversion).' },
            { name: 'datosPerfil.pagosInmediatos', type: 'Objeto', required: 'optional', desc: 'Configuración de pagos inmediatos/Bizum.' },
            { name: 'datosPerfil.cashBack', type: 'Objeto', required: 'optional', desc: 'Configuración operativa CashBack.' },
            { name: 'datosPerfil.datosTaxFree', type: 'Objeto', required: 'optional', desc: 'Configuración TaxFree.' },
            { name: 'datosPerfil.paymentFacilitator', type: 'Objeto', required: 'optional', desc: 'Configuración Payment Facilitator.' }
        ];
    }

    function getModificacionParameters() {
        return [
            { name: 'fuc', type: 'Integer N9', required: 'required', desc: 'Código que identifica al comercio.' },
            { name: 'tipoPeticion', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad peticionaria.' },
            { name: 'csbPeticion', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad peticionaria.' },
            { name: 'tipo', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad adquirente.' },
            { name: 'csb', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad adquirente.' },
            { name: 'datosPerfil', type: 'Objeto', required: 'required', desc: 'Campos del perfil a modificar (solo los que cambian).' }
        ];
    }

    function getBajaParameters() {
        return [
            { name: 'fuc', type: 'Integer N9', required: 'required', desc: 'Código que identifica al comercio.' },
            { name: 'tipoPeticion', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad peticionaria.' },
            { name: 'csbPeticion', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad peticionaria.' },
            { name: 'tipo', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad adquirente.' },
            { name: 'csb', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad adquirente.' }
        ];
    }

    function getConsultaParameters() {
        return [
            { name: 'fuc', type: 'Integer N9', required: 'required', desc: 'Código que identifica al comercio.' },
            { name: 'tipoPeticion', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad peticionaria.' },
            { name: 'csbPeticion', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad peticionaria.' },
            { name: 'tipo', type: 'Integer N2', required: 'required', desc: 'Tipo de la entidad adquirente.' },
            { name: 'csb', type: 'Integer N4', required: 'required', desc: 'CSB de la entidad adquirente.' }
        ];
    }

    function getResponseCodes() {
        return [
            { code: '00', type: 'success', desc: 'Operación realizada correctamente' },
            { code: '01', type: 'error', desc: 'Error en formato de datos de entrada' },
            { code: '02', type: 'error', desc: 'Error: FUC no encontrado' },
            { code: '03', type: 'error', desc: 'Error: Entidad no autorizada' },
            { code: '04', type: 'error', desc: 'Error: Perfil ya existente' },
            { code: '05', type: 'error', desc: 'Error: Datos obligatorios no informados' },
            { code: '06', type: 'error', desc: 'Error: Valor de indicador no válido' },
            { code: '07', type: 'error', desc: 'Error: Entidad no certificada para DCC' },
            { code: '08', type: 'error', desc: 'Error: Entidad no certificada para Discover' },
            { code: '09', type: 'error', desc: 'Error: Perfil no encontrado' },
            { code: '10', type: 'error', desc: 'Error: Operación no permitida para esquema 4B' },
            { code: '99', type: 'error', desc: 'Error interno del sistema' }
        ];
    }

    function renderServiceView({ title, description, method, endpoint, urlPath, parameters, example, responseCodes, notes }) {
        const baseUrl = AppConfig.getBaseUrl('perfiles');
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

            <div class="tabs-container">
            <div class="tabs">
                <div class="tab active" onclick="switchTab(this, 'doc-tab-${endpoint}')">Documentación</div>
                <div class="tab" onclick="switchTab(this, 'code-tab-${endpoint}')">Ejemplos de Código</div>
                <div class="tab" onclick="switchTab(this, 'console-tab-${endpoint}')">Consola de Pruebas</div>
            </div>

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

            <div class="tab-content" id="code-tab-${endpoint}">
                ${CodeExamples.render(endpoint, fullUrl, example.request, 'perfiles')}
            </div>

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
        renderBaja,
        renderConsulta,
        EXAMPLES
    };
})();
