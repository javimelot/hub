/**
 * HUB de Adquirencia - Terminales Views
 * APIs Canales - Apificacion del servicio v1.6
 * Gestion de terminales de canal no presencial
 */
const TerminalesViews = (() => {
    const CLIENT_ID = 'c2a8c13f-24ce-4aaa-90f4-945ee65f3492';
    const CLIENT_SECRET = 'hH8eF8iH0cD4pS2fP4uL7yN0bI7iG2aS2qM3fN8aH0rP5xW4lJ';

    const SERVICES = {
        'terminales-consulta': { title: 'Consulta de Terminal', path: '/detail', desc: 'Consulta todos los datos asociados a un terminal existente de canal no presencial por comercio y terminal.' },
        'terminales-consulta-clave': { title: 'Consulta de Clave de Terminal', path: '/key', desc: 'Consulta la clave de un terminal existente de canal no presencial.' },
        'terminales-consulta-multiple': { title: 'Consulta de Terminales', path: '/list', desc: 'Consulta datos asociados a varios terminales de canal no presencial por filtros.' },
        'terminales-alta': { title: 'Alta de Terminal', path: '/add', desc: 'Da de alta un terminal de canal no presencial con su configuracion y metodos de pago.' },
        'terminales-modificacion': { title: 'Modificacion de Terminal', path: '/modify', desc: 'Modifica un terminal existente de canal no presencial.' },
        'terminales-baja': { title: 'Baja de Terminal', path: '/delete', desc: 'Da de baja un terminal existente de canal no presencial.' },
        'terminales-reactivacion': { title: 'Reactivacion de Terminal', path: '/reactivate', desc: 'Reactiva un terminal de canal no presencial existente.' },
        'terminales-alta-metodo': { title: 'Alta de Metodo de Pago', path: '/paymethod/add', desc: 'Da de alta un metodo de pago a un comercio de canal no presencial.' },
        'terminales-mod-metodo': { title: 'Modificacion de Metodo de Pago', path: '/paymethod/modify', desc: 'Modifica el campo additionalData de un metodo de pago.' },
        'terminales-baja-metodo': { title: 'Baja de Metodo de Pago', path: '/paymethod/delete', desc: 'Da de baja un metodo de pago de un comercio de canal no presencial.' },
        'terminales-consulta-grupos': { title: 'Consulta de Grupos', path: '/groups/get', desc: 'Consulta la informacion de los grupos de comparticion de referencias.' },
        'terminales-alta-grupos': { title: 'Alta de Grupos', path: '/groups/add', desc: 'Da de alta un comercio en un grupo de comparticion de referencias.' },
        'terminales-email-bienvenida': { title: 'Envio Email Bienvenida', path: '/email/welcome', desc: 'Envia el correo de bienvenida a un comercio de canal no presencial.' },
        'terminales-email-claves': { title: 'Envio Email Claves Produccion', path: '/email/keys', desc: 'Envia el correo de claves de produccion a un comercio.' },
        'terminales-consulta-operacion': { title: 'Consulta Operacion', path: '/operation/detail', desc: 'Consulta los datos de una operacion especifica.' },
        'terminales-consulta-operaciones': { title: 'Consulta Masiva de Operaciones', path: '/operation/list', desc: 'Consulta masiva de operaciones por filtros.' }
    };

    const EXAMPLES = {
        consulta: {
            request: JSON.stringify({
                info: {
                    data: { fuc: "251533972", idTransaction: "462706983089", terminal: "1" }
                },
                signatureData: { signatureType: "T29V2", signature: "uwO2N0J9jVRJ8yiyRWFeYnqD7DY..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "zTlZQJWrWBUHJLv3dL3ycqIb47h..." },
                info: {
                    data: {
                        fuc: 251533972, terminal: 1, typeCsb: 0, csb: 198,
                        nameCommerce: "QUEST PHARMA LABORATORIOS", keyType: 13,
                        key: "qwertyasdf0123456789", currency: 978,
                        startDate: "31-03-2005 00:00:00.000", connectionType: "D",
                        typeNotification: "4", sendCardNotif: "2",
                        activatedDCC: 0, activatedTokenize: 0,
                        terminalModel: "S1", indicatorCVV2: 4
                    },
                    idTransaction: "462706983089",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        consultaClave: {
            request: JSON.stringify({
                info: {
                    data: { fuc: "251533972", idTransaction: "462706983090", terminal: "1" }
                },
                signatureData: { signatureType: "T29V2", signature: "abc123..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "def456..." },
                info: {
                    data: { fuc: 251533972, terminal: 1, key: "qwertyasdf0123456789", keyType: 13 },
                    idTransaction: "462706983090",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        consultaMultiple: {
            request: JSON.stringify({
                info: {
                    data: { fuc: "251533972", idTransaction: "462706983091", csb: "198" }
                },
                signatureData: { signatureType: "T29V2", signature: "sig..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "sig..." },
                info: {
                    data: {
                        terminals: [
                            { fuc: 251533972, terminal: 1, nameCommerce: "COMERCIO 1", terminalModel: "S1" },
                            { fuc: 251533972, terminal: 2, nameCommerce: "COMERCIO 1 - PAYGOLD", terminalModel: "S3" }
                        ]
                    },
                    idTransaction: "462706983091",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        alta: {
            request: JSON.stringify({
                info: {
                    data: {
                        fuc: "999008881", idTransaction: "000000000001", terminal: "1",
                        connectionType: "D", currency: 978, typeNotification: "4",
                        urlOK: "https://www.comercio.es/ok", urlKO: "https://www.comercio.es/ko",
                        urlNotificationOnline: "https://www.comercio.es/notif",
                        emailNotification: "admin@comercio.es", keyType: 31,
                        terminalModel: "S1", indicatorCVV2: 4,
                        paymethods: [{ paymethod: "C", status: "A" }, { paymethod: "R", status: "A" }]
                    }
                },
                signatureData: { signatureType: "T29V2", signature: "firma..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "firma_resp..." },
                info: {
                    data: { fuc: 999008881, terminal: 1 },
                    idTransaction: "000000000001",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        modificacion: {
            request: JSON.stringify({
                info: {
                    data: {
                        fuc: "999008881", idTransaction: "000000000002", terminal: "1",
                        emailNotification: "nuevo@comercio.es",
                        urlOK: "https://www.comercio.es/nuevo-ok"
                    }
                },
                signatureData: { signatureType: "T29V2", signature: "firma..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "firma_resp..." },
                info: {
                    data: { fuc: 999008881, terminal: 1 },
                    idTransaction: "000000000002",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        baja: {
            request: JSON.stringify({
                info: {
                    data: { fuc: "999008881", idTransaction: "000000000003", terminal: "1" }
                },
                signatureData: { signatureType: "T29V2", signature: "firma..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "firma_resp..." },
                info: {
                    data: { fuc: 999008881, terminal: 1 },
                    idTransaction: "000000000003",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        reactivacion: {
            request: JSON.stringify({
                info: {
                    data: { fuc: "999008881", idTransaction: "000000000004", terminal: "1" }
                },
                signatureData: { signatureType: "T29V2", signature: "firma..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "firma_resp..." },
                info: {
                    data: { fuc: 999008881, terminal: 1 },
                    idTransaction: "000000000004",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        altaMetodo: {
            request: JSON.stringify({
                info: {
                    data: {
                        fuc: "999008881", idTransaction: "000000000005", terminal: "1",
                        paymethods: [{ paymethod: "T", status: "A", additionalData: "" }]
                    }
                },
                signatureData: { signatureType: "T29V2", signature: "firma..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "firma_resp..." },
                info: {
                    data: { fuc: 999008881, terminal: 1, paymethods: [{ paymethod: "T", result: "OK" }] },
                    idTransaction: "000000000005",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        modMetodo: {
            request: JSON.stringify({
                info: {
                    data: {
                        fuc: "999008881", idTransaction: "000000000006", terminal: "1",
                        paymethods: [{ paymethod: "T", additionalData: "newdata" }]
                    }
                },
                signatureData: { signatureType: "T29V2", signature: "firma..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "firma_resp..." },
                info: {
                    data: { fuc: 999008881, terminal: 1, paymethods: [{ paymethod: "T", result: "OK" }] },
                    idTransaction: "000000000006",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        bajaMetodo: {
            request: JSON.stringify({
                info: {
                    data: {
                        fuc: "999008881", idTransaction: "000000000007", terminal: "1",
                        paymethods: [{ paymethod: "T" }]
                    }
                },
                signatureData: { signatureType: "T29V2", signature: "firma..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "firma_resp..." },
                info: {
                    data: { fuc: 999008881, terminal: 1, paymethods: [{ paymethod: "T", result: "OK" }] },
                    idTransaction: "000000000007",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        consultaGrupos: {
            request: JSON.stringify({
                info: { data: { fuc: "999008881", idTransaction: "000000000008", terminal: "1" } },
                signatureData: { signatureType: "T29V2", signature: "firma..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "firma_resp..." },
                info: {
                    data: { fuc: 999008881, terminal: 1, groups: [{ groupId: "GRP001", members: ["999008881-1", "999008882-1"] }] },
                    idTransaction: "000000000008",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        altaGrupos: {
            request: JSON.stringify({
                info: { data: { fuc: "999008881", idTransaction: "000000000009", terminal: "1", groupId: "GRP001" } },
                signatureData: { signatureType: "T29V2", signature: "firma..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "firma_resp..." },
                info: {
                    data: { fuc: 999008881, terminal: 1, groupId: "GRP001" },
                    idTransaction: "000000000009",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        emailBienvenida: {
            request: JSON.stringify({
                info: { data: { fuc: "999008881", idTransaction: "000000000010", terminal: "1" } },
                signatureData: { signatureType: "T29V2", signature: "firma..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "firma_resp..." },
                info: {
                    data: { emailsSent: 1 },
                    idTransaction: "000000000010",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        emailClaves: {
            request: JSON.stringify({
                info: { data: { fuc: "999008881", idTransaction: "000000000011", terminal: "1" } },
                signatureData: { signatureType: "T29V2", signature: "firma..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "firma_resp..." },
                info: {
                    data: { emailsSent: 1 },
                    idTransaction: "000000000011",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        consultaOperacion: {
            request: JSON.stringify({
                info: { data: { fuc: "999008881", idTransaction: "000000000012", terminal: "1", orderNumber: "2024001234" } },
                signatureData: { signatureType: "T29V2", signature: "firma..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "firma_resp..." },
                info: {
                    data: { fuc: 999008881, terminal: 1, operations: [{ orderNumber: "2024001234", amount: 1500, currency: 978, status: "AUTHORIZED" }] },
                    idTransaction: "000000000012",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        },
        consultaOperaciones: {
            request: JSON.stringify({
                info: { data: { fuc: "999008881", idTransaction: "000000000013", terminal: "1", dateFrom: "2024-01-01", dateTo: "2024-01-31" } },
                signatureData: { signatureType: "T29V2", signature: "firma..." }
            }, null, 4),
            response: JSON.stringify({
                signatureData: { signatureType: "T29V2", signature: "firma_resp..." },
                info: {
                    data: { fuc: 999008881, terminal: 1, totalOperations: 2, operations: [{ orderNumber: "2024001234", amount: 1500, currency: 978, status: "AUTHORIZED" }, { orderNumber: "2024001235", amount: 2500, currency: 978, status: "AUTHORIZED" }] },
                    idTransaction: "000000000013",
                    result: { code: 2000, description: "Operacion realizada Correctamente" }
                }
            }, null, 4)
        }
    };

    function getParameters(serviceKey) {
        const baseParams = [
            { name: 'info.data.fuc', type: '9/N', required: 'required', desc: 'Codigo FUC asignado al comercio.' },
            { name: 'info.data.idTransaction', type: '12/AN', required: 'required', desc: 'Numero/identificador de la peticion.' },
            { name: 'info.data.terminal', type: '3/N', required: 'required', desc: 'Numero de terminal del comercio.' },
            { name: 'signatureData.signatureType', type: 'String', required: 'required', desc: 'Tipo de firma: T29V2.' },
            { name: 'signatureData.signature', type: 'String', required: 'required', desc: 'Valor de firma HMAC de la peticion.' }
        ];

        const altaParams = [
            ...baseParams,
            { name: 'info.data.connectionType', type: '1/AN', required: 'required', desc: 'Modo conexion: D=Directo, P=Pasarela, U=PUCE.' },
            { name: 'info.data.currency', type: '3/N', required: 'required', desc: 'Moneda configurada (978=EUR).' },
            { name: 'info.data.typeNotification', type: '1/N', required: 'required', desc: 'Tipo notificacion: 0=Sin, 1-7=Varios modos.' },
            { name: 'info.data.urlOK', type: '250/AN', required: 'optional', desc: 'URL de redireccion OK.' },
            { name: 'info.data.urlKO', type: '250/AN', required: 'optional', desc: 'URL de redireccion KO.' },
            { name: 'info.data.urlNotificationOnline', type: '250/AN', required: 'optional', desc: 'URL de notificacion online.' },
            { name: 'info.data.emailNotification', type: '70/AN', required: 'optional', desc: 'Email del comercio para notificaciones.' },
            { name: 'info.data.keyType', type: '2/N', required: 'required', desc: 'Tipo de clave: 20=Directa, 23=SHA256, 24=X9.19, 31=HMAC SHA256.' },
            { name: 'info.data.terminalModel', type: 'String', required: 'required', desc: 'Modelo: S1=SIS Normal, S2=MOTO, S3=PayGold, S4=PUCE, A1=Android PayGold, A2=Android Bizum.' },
            { name: 'info.data.indicatorCVV2', type: '1/N', required: 'optional', desc: 'CVV2: 2=No solicita, 3=Opcional, 4=Obligatorio.' },
            { name: 'info.data.paymethods', type: 'Lista', required: 'required', desc: 'Lista de metodos de pago a configurar.' },
            { name: 'info.data.sendCardNotif', type: '1/AN', required: 'optional', desc: '0=No tarjeta, 1=Si tarjeta, 2=Con caducidad, 3=Asteriscos.' },
            { name: 'info.data.activatedDCC', type: '1/N', required: 'optional', desc: '0=Sin DCC, 1=Con DCC.' },
            { name: 'info.data.activatedTokenize', type: '1/N', required: 'optional', desc: '0=Sin pago referencia, 1=Con pago referencia.' },
            { name: 'info.data.activatedPreauthorization', type: '1/N', required: 'optional', desc: '0=Sin preautorizaciones, 1=Con preautorizaciones.' }
        ];

        const modParams = [
            ...baseParams,
            { name: 'info.data.[campo]', type: 'Varios', required: 'optional', desc: 'Cualquier campo del terminal que se desee modificar (mismos campos que en alta).' }
        ];

        const metodoParams = [
            ...baseParams,
            { name: 'info.data.paymethods', type: 'Lista', required: 'required', desc: 'Lista de metodos de pago. Cada uno con paymethod (codigo) y status (A=Activo).' },
            { name: 'info.data.paymethods[].paymethod', type: 'String', required: 'required', desc: 'Codigo del metodo: C=Tarjeta, R=Referencia, T=Transferencia, D=Domiciliacion, P=PayPal, etc.' },
            { name: 'info.data.paymethods[].additionalData', type: 'String', required: 'optional', desc: 'Datos adicionales del metodo de pago.' }
        ];

        const gruposParams = [
            ...baseParams,
            { name: 'info.data.groupId', type: 'String', required: 'conditional', desc: 'Identificador del grupo (obligatorio para alta).' }
        ];

        const operacionParams = [
            ...baseParams,
            { name: 'info.data.orderNumber', type: '12/AN', required: 'conditional', desc: 'Numero de pedido (para consulta individual).' },
            { name: 'info.data.dateFrom', type: 'String', required: 'conditional', desc: 'Fecha inicio (para consulta masiva). Formato YYYY-MM-DD.' },
            { name: 'info.data.dateTo', type: 'String', required: 'conditional', desc: 'Fecha fin (para consulta masiva). Formato YYYY-MM-DD.' }
        ];

        switch(serviceKey) {
            case 'terminales-alta': return altaParams;
            case 'terminales-modificacion': return modParams;
            case 'terminales-alta-metodo':
            case 'terminales-mod-metodo':
            case 'terminales-baja-metodo': return metodoParams;
            case 'terminales-consulta-grupos':
            case 'terminales-alta-grupos': return gruposParams;
            case 'terminales-consulta-operacion':
            case 'terminales-consulta-operaciones': return operacionParams;
            default: return baseParams;
        }
    }

    function getExampleKey(serviceKey) {
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
        return map[serviceKey] || 'consulta';
    }

    function getResponseCodes() {
        return [
            { code: '2000', type: 'success', desc: 'Operacion realizada Correctamente.' },
            { code: '4001', type: 'error', desc: 'Error Validacion campos de Entrada.' },
            { code: '5000', type: 'error', desc: 'Error Interno del Sistema.' }
        ];
    }

    function getNotes(serviceKey) {
        const notesMap = {
            'terminales-consulta': [
                'La consulta se realiza por comercio (FUC) y terminal.',
                'Devuelve configuracion completa: datos terminal, metodos de pago, perfil entidad.',
                'Requiere cabeceras RedsysClientId y RedsysClientSecret.',
                'La firma se calcula sobre el bloque info.data serializado como JSON.'
            ],
            'terminales-consulta-clave': [
                'Solo devuelve la clave del terminal, no el resto de datos.',
                'Tipos de clave: 20=Directa, 23=SHA256, 24=X9.19, 31=HMAC SHA256.'
            ],
            'terminales-consulta-multiple': [
                'Permite filtrar por FUC, CSB, terminal u otros criterios.',
                'Devuelve un listado de terminales con sus configuraciones.'
            ],
            'terminales-alta': [
                'Requiere FUC, terminal y parametros obligatorios de configuracion.',
                'Modelos de terminal: S1=SIS Normal, S2=MOTO, S3=PayGold, S4=PUCE.',
                'Debe incluir al menos un metodo de pago.',
                'connectionType: D=Directo, P=Pasarela, U=Conectado PUCE.'
            ],
            'terminales-modificacion': [
                'Solo se envian los campos que se desean modificar.',
                'FUC y terminal son obligatorios para identificar el terminal.'
            ],
            'terminales-baja': [
                'La baja es logica, el terminal puede ser reactivado posteriormente.'
            ],
            'terminales-reactivacion': [
                'Permite reactivar un terminal previamente dado de baja.'
            ],
            'terminales-alta-metodo': [
                'Se puede realizar por fuc+terminal o por fuc+csb.',
                'Metodos: C=Tarjeta, R=Referencia, T=Transferencia, D=Domiciliacion, P=PayPal, Z=Bizum.'
            ],
            'terminales-mod-metodo': [
                'Solo permite modificar el campo additionalData del metodo de pago.'
            ],
            'terminales-baja-metodo': [
                'Se puede realizar por fuc+terminal o por fuc+csb.'
            ],
            'terminales-consulta-grupos': [
                'Devuelve los grupos de comparticion de referencias del comercio.'
            ],
            'terminales-alta-grupos': [
                'Agrega el comercio a un grupo de comparticion de referencias existente.'
            ],
            'terminales-email-bienvenida': [
                'Envia email de bienvenida al comercio.',
                'La respuesta indica el numero de emails enviados (1).'
            ],
            'terminales-email-claves': [
                'Envia email con las claves de produccion al comercio.',
                'La respuesta indica el numero de emails enviados (1).'
            ],
            'terminales-consulta-operacion': [
                'Consulta una operacion especifica por numero de pedido.'
            ],
            'terminales-consulta-operaciones': [
                'Consulta masiva por rango de fechas u otros filtros.',
                'Devuelve listado paginado de operaciones.'
            ]
        };
        return notesMap[serviceKey] || [];
    }

    function getCodeExamples(serviceKey, url, requestBody) {
        const body = requestBody.replace(/`/g, '\\`');
        const curl = `curl -X POST "${url}" \\
  -H "Content-Type: application/json" \\
  -H "RedsysClientId: ${CLIENT_ID}" \\
  -H "RedsysClientSecret: ${CLIENT_SECRET}" \\
  -d '${requestBody}'`;

        const php = `<?php
$url = '${url}';
$body = '${requestBody}';

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $body,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'RedsysClientId: ${CLIENT_ID}',
        'RedsysClientSecret: ${CLIENT_SECRET}',
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$data = json_decode($response, true);
print_r($data);`;

        const python = `import requests
import json

url = '${url}'
headers = {
    'Content-Type': 'application/json',
    'RedsysClientId': '${CLIENT_ID}',
    'RedsysClientSecret': '${CLIENT_SECRET}'
}
body = ${requestBody}

response = requests.post(url, headers=headers, json=body)
print(f'Status: {response.status_code}')
print(json.dumps(response.json(), indent=2, ensure_ascii=False))`;

        const nodejs = `const https = require('https');

const url = new URL('${url}');
const body = JSON.stringify(${requestBody});

const options = {
  hostname: url.hostname,
  port: url.port || 443,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'RedsysClientId': '${CLIENT_ID}',
    'RedsysClientSecret': '${CLIENT_SECRET}',
    'Content-Length': Buffer.byteLength(body)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(JSON.parse(data)));
});

req.on('error', console.error);
req.write(body);
req.end();`;

        const java = `import java.net.http.*;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();

String body = """
${requestBody}
""";

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${url}"))
    .header("Content-Type", "application/json")
    .header("RedsysClientId", "${CLIENT_ID}")
    .header("RedsysClientSecret", "${CLIENT_SECRET}")
    .POST(HttpRequest.BodyPublishers.ofString(body))
    .build();

HttpResponse<String> response = client.send(
    request, HttpResponse.BodyHandlers.ofString()
);

System.out.println("Status: " + response.statusCode());
System.out.println(response.body());`;

        const csharp = `using System.Net.Http;
using System.Text;
using System.Text.Json;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("RedsysClientId", "${CLIENT_ID}");
client.DefaultRequestHeaders.Add("RedsysClientSecret", "${CLIENT_SECRET}");

var body = @'${requestBody}';
var content = new StringContent(body, Encoding.UTF8, "application/json");

var response = await client.PostAsync("${url}", content);
var result = await response.Content.ReadAsStringAsync();

Console.WriteLine($"Status: {(int)response.StatusCode}");
Console.WriteLine(JsonSerializer.Serialize(
    JsonSerializer.Deserialize<object>(result),
    new JsonSerializerOptions { WriteIndented = true }
));`;

        return `
        <div class="code-examples-container">
            <p style="color:var(--text-secondary);margin-bottom:16px;">
                Ejemplos de integracion con las credenciales de prueba ya incluidas.
                Recuerde calcular la firma HMAC-SHA256 sobre el bloque <code>info.data</code> antes de enviar.
            </p>

            <div class="code-lang-tabs tabs-container">
                <div class="tabs" style="margin-bottom:0">
                    <div class="tab active" onclick="switchTab(this, 'code-curl-${serviceKey}')">cURL</div>
                    <div class="tab" onclick="switchTab(this, 'code-php-${serviceKey}')">PHP</div>
                    <div class="tab" onclick="switchTab(this, 'code-python-${serviceKey}')">Python</div>
                    <div class="tab" onclick="switchTab(this, 'code-nodejs-${serviceKey}')">Node.js</div>
                    <div class="tab" onclick="switchTab(this, 'code-java-${serviceKey}')">Java</div>
                    <div class="tab" onclick="switchTab(this, 'code-csharp-${serviceKey}')">C#</div>
                </div>

            <div class="tab-content active" id="code-curl-${serviceKey}">
                <div class="code-block lang-bash"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${curl}</div>
            </div>
            <div class="tab-content" id="code-php-${serviceKey}">
                <div class="code-block lang-php"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${php}</div>
            </div>
            <div class="tab-content" id="code-python-${serviceKey}">
                <div class="code-block lang-python"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${python}</div>
            </div>
            <div class="tab-content" id="code-nodejs-${serviceKey}">
                <div class="code-block lang-js"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${nodejs}</div>
            </div>
            <div class="tab-content" id="code-java-${serviceKey}">
                <div class="code-block lang-java"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${java}</div>
            </div>
            <div class="tab-content" id="code-csharp-${serviceKey}">
                <div class="code-block lang-csharp"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${csharp}</div>
            </div>
            </div><!-- /code-lang-tabs tabs-container -->
        </div>`;
    }

    function renderServiceView(serviceKey) {
        const service = SERVICES[serviceKey];
        if (!service) return '<p>Servicio no encontrado.</p>';

        const baseUrl = AppConfig.getBaseUrl('terminales');
        const fullUrl = baseUrl + service.path;
        const parameters = getParameters(serviceKey);
        const exKey = getExampleKey(serviceKey);
        const example = EXAMPLES[exKey];
        const responseCodes = getResponseCodes();
        const notes = getNotes(serviceKey);
        const codeExamples = getCodeExamples(serviceKey, fullUrl, example.request);

        return `
        <div class="doc-section">
            <div class="doc-header">
                <h2>${service.title}</h2>
                <p>${service.desc}</p>
            </div>

            <div class="doc-endpoint">
                <span class="method post">POST</span>
                <span class="url">${fullUrl}</span>
            </div>

            ${notes.length > 0 ? `
            <div class="info-box info mb-4">
                <span class="info-box-icon">&#8505;&#65039;</span>
                <div>
                    <strong>Notas importantes:</strong>
                    <ul style="margin-top:4px;padding-left:16px;">
                        ${notes.map(n => '<li style="margin-bottom:4px;">' + n + '</li>').join('')}
                    </ul>
                </div>
            </div>` : ''}

            <div class="info-box warning mb-4">
                <span class="info-box-icon">&#9888;&#65039;</span>
                <div>
                    <strong>Cabeceras requeridas:</strong> Content-Type: application/json, RedsysClientId, RedsysClientSecret.<br>
                    <strong>Firma:</strong> HMAC-SHA256 o HMAC-SHA512 sobre el bloque info.data serializado. Tipo: T29V2.<br>
                    <strong>Credenciales de prueba:</strong> <code>RedsysClientId: ${CLIENT_ID}</code> &nbsp;|&nbsp; <code>RedsysClientSecret: ${CLIENT_SECRET}</code>
                </div>
            </div>

            <div class="tabs-container">
            <div class="tabs">
                <div class="tab active" onclick="switchTab(this, 'doc-tab-${serviceKey}')">Documentacion</div>
                <div class="tab" onclick="switchTab(this, 'code-tab-${serviceKey}')">Ejemplos de Codigo</div>
                <div class="tab" onclick="switchTab(this, 'console-tab-${serviceKey}')">Consola de Pruebas</div>
            </div>

            <div class="tab-content active" id="doc-tab-${serviceKey}">
                <div class="collapsible open">
                    <div class="collapsible-header" onclick="toggleCollapsible(this)">
                        <h4>Parametros de Entrada</h4>
                        <span class="arrow">&#9660;</span>
                    </div>
                    <div class="collapsible-body">
                        <table class="params-table">
                            <thead>
                                <tr><th>Campo</th><th>Tipo</th><th>Obligatorio</th><th>Descripcion</th></tr>
                            </thead>
                            <tbody>
                                ${parameters.map(p => '<tr><td class="param-name">' + p.name + '</td><td class="param-type">' + p.type + '</td><td><span class="badge badge-' + p.required + '">' + (p.required === 'required' ? 'Si' : p.required === 'conditional' ? 'Cond.' : 'No') + '</span></td><td class="param-desc">' + p.desc + '</td></tr>').join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="collapsible open">
                    <div class="collapsible-header" onclick="toggleCollapsible(this)">
                        <h4>Ejemplo de Peticion</h4>
                        <span class="arrow">&#9660;</span>
                    </div>
                    <div class="collapsible-body">
                        <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${example.request}</div>
                    </div>
                </div>

                <div class="collapsible open">
                    <div class="collapsible-header" onclick="toggleCollapsible(this)">
                        <h4>Ejemplo de Respuesta</h4>
                        <span class="arrow">&#9660;</span>
                    </div>
                    <div class="collapsible-body">
                        <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${example.response}</div>
                    </div>
                </div>

                <div class="collapsible">
                    <div class="collapsible-header" onclick="toggleCollapsible(this)">
                        <h4>Codigos de Respuesta</h4>
                        <span class="arrow">&#9660;</span>
                    </div>
                    <div class="collapsible-body">
                        <table class="response-codes">
                            <thead><tr><th>Codigo</th><th>Descripcion</th></tr></thead>
                            <tbody>
                                ${responseCodes.map(rc => '<tr><td><span class="code ' + rc.type + '">' + rc.code + '</span></td><td>' + rc.desc + '</td></tr>').join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="tab-content" id="code-tab-${serviceKey}">
                ${codeExamples}
            </div>

            <div class="tab-content" id="console-tab-${serviceKey}">
                <div class="url-bar">
                    <span class="method-badge">POST</span>
                    <input type="text" class="url-input" id="url-${serviceKey}" value="${fullUrl}">
                    <button class="btn-send" onclick="sendApiRequest('${serviceKey}')">Enviar</button>
                </div>

                <div class="api-console">
                    <div class="console-request">
                        <div class="console-header">
                            <h4>Request Body</h4>
                            <button class="btn btn-sm btn-outline" onclick="formatJson('req-${serviceKey}')">Formatear</button>
                        </div>
                        <div class="console-body">
                            <textarea id="req-${serviceKey}">${example.request}</textarea>
                        </div>
                        <div class="console-actions">
                            <button class="btn btn-sm btn-outline" onclick="loadExample('req-${serviceKey}', '${serviceKey}')">Cargar Ejemplo</button>
                            <button class="btn btn-sm btn-outline" onclick="clearConsole('req-${serviceKey}')">Limpiar</button>
                        </div>
                    </div>

                    <div class="console-response">
                        <div class="console-header">
                            <h4>Response</h4>
                            <span id="status-${serviceKey}"></span>
                        </div>
                        <div class="console-body">
                            <pre id="res-${serviceKey}">// La respuesta aparecera aqui...</pre>
                        </div>
                    </div>
                </div>
            </div>
            </div><!-- /tabs-container -->
        </div>`;
    }

    // Public render functions
    function renderConsulta() { return renderServiceView('terminales-consulta'); }
    function renderConsultaClave() { return renderServiceView('terminales-consulta-clave'); }
    function renderConsultaMultiple() { return renderServiceView('terminales-consulta-multiple'); }
    function renderAlta() { return renderServiceView('terminales-alta'); }
    function renderModificacion() { return renderServiceView('terminales-modificacion'); }
    function renderBaja() { return renderServiceView('terminales-baja'); }
    function renderReactivacion() { return renderServiceView('terminales-reactivacion'); }
    function renderAltaMetodo() { return renderServiceView('terminales-alta-metodo'); }
    function renderModMetodo() { return renderServiceView('terminales-mod-metodo'); }
    function renderBajaMetodo() { return renderServiceView('terminales-baja-metodo'); }
    function renderConsultaGrupos() { return renderServiceView('terminales-consulta-grupos'); }
    function renderAltaGrupos() { return renderServiceView('terminales-alta-grupos'); }
    function renderEmailBienvenida() { return renderServiceView('terminales-email-bienvenida'); }
    function renderEmailClaves() { return renderServiceView('terminales-email-claves'); }
    function renderConsultaOperacion() { return renderServiceView('terminales-consulta-operacion'); }
    function renderConsultaOperaciones() { return renderServiceView('terminales-consulta-operaciones'); }

    return {
        renderConsulta, renderConsultaClave, renderConsultaMultiple,
        renderAlta, renderModificacion, renderBaja, renderReactivacion,
        renderAltaMetodo, renderModMetodo, renderBajaMetodo,
        renderConsultaGrupos, renderAltaGrupos,
        renderEmailBienvenida, renderEmailClaves,
        renderConsultaOperacion, renderConsultaOperaciones,
        EXAMPLES, SERVICES
    };
})();
