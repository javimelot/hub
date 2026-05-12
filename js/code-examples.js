/**
 * HUB de Adquirencia - Shared Code Examples Module
 * Generates multi-language code snippets for Comercios and Perfiles APIs
 *
 * Terminales API uses its own inline generator (getCodeExamples in terminales-views.js)
 * because it has different credentials and signing structure.
 */
const CodeExamples = (() => {

    // Test credentials for Terminales (also shown in Comercios/Perfiles for reference)
    const CLIENT_ID     = 'c2a8c13f-24ce-4aaa-90f4-945ee65f3492';
    const CLIENT_SECRET = 'hH8eF8iH0cD4pS2fP4uL7yN0bI7iG2aS2qM3fN8aH0rP5xW4lJ';

    /**
     * Render code examples for a given endpoint.
     * @param {string} endpointKey  - e.g. 'comercios-alta'
     * @param {string} url          - Full endpoint URL
     * @param {string} requestBody  - JSON string of the example request
     * @param {string} apiType      - 'comercios' | 'perfiles'
     */
    function render(endpointKey, url, requestBody, apiType) {
        const curl    = buildCurl(url, requestBody);
        const php     = buildPhp(url, requestBody);
        const python  = buildPython(url, requestBody);
        const nodejs  = buildNodejs(url, requestBody);
        const java    = buildJava(url, requestBody);
        const csharp  = buildCsharp(url, requestBody);

        return `
        <div class="code-examples-container">
            <p style="color:var(--text-secondary);margin-bottom:16px;">
                Ejemplos de integración listos para usar. Las credenciales de prueba ya están incluidas.
                Recuerde que para las APIs de Comercios y Perfiles la autenticación se realiza
                mediante las cabeceras <code>RedsysClientId</code> y <code>RedsysClientSecret</code>.
            </p>

            <div class="code-lang-tabs tabs-container">
                <div class="tabs" style="margin-bottom:0">
                    <div class="tab active" onclick="switchTab(this, 'code-curl-${endpointKey}')">cURL</div>
                    <div class="tab" onclick="switchTab(this, 'code-php-${endpointKey}')">PHP</div>
                    <div class="tab" onclick="switchTab(this, 'code-python-${endpointKey}')">Python</div>
                    <div class="tab" onclick="switchTab(this, 'code-nodejs-${endpointKey}')">Node.js</div>
                    <div class="tab" onclick="switchTab(this, 'code-java-${endpointKey}')">Java</div>
                    <div class="tab" onclick="switchTab(this, 'code-csharp-${endpointKey}')">C#</div>
                </div>

            <div class="tab-content active" id="code-curl-${endpointKey}">
                <div class="code-block lang-bash"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${curl}</div>
            </div>
            <div class="tab-content" id="code-php-${endpointKey}">
                <div class="code-block lang-php"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${php}</div>
            </div>
            <div class="tab-content" id="code-python-${endpointKey}">
                <div class="code-block lang-python"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${python}</div>
            </div>
            <div class="tab-content" id="code-nodejs-${endpointKey}">
                <div class="code-block lang-js"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${nodejs}</div>
            </div>
            <div class="tab-content" id="code-java-${endpointKey}">
                <div class="code-block lang-java"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${java}</div>
            </div>
            <div class="tab-content" id="code-csharp-${endpointKey}">
                <div class="code-block lang-csharp"><button class="copy-btn" onclick="copyCode(this)">Copiar</button>${csharp}</div>
            </div>
            </div><!-- /code-lang-tabs tabs-container -->
        </div>`;
    }

    function buildCurl(url, body) {
        return `curl -X POST "${url}" \\
  -H "Content-Type: application/json" \\
  -H "RedsysClientId: ${CLIENT_ID}" \\
  -H "RedsysClientSecret: ${CLIENT_SECRET}" \\
  -d '${body}'`;
    }

    function buildPhp(url, body) {
        return `<?php
$url  = '${url}';
$body = '${body}';

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
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP $httpCode\\n";
$data = json_decode($response, true);
print_r($data);`;
    }

    function buildPython(url, body) {
        return `import requests
import json

url = '${url}'

headers = {
    'Content-Type': 'application/json',
    'RedsysClientId': '${CLIENT_ID}',
    'RedsysClientSecret': '${CLIENT_SECRET}'
}

body = ${body}

response = requests.post(url, headers=headers, json=body, verify=True)

print(f'Status: {response.status_code}')
print(json.dumps(response.json(), indent=2, ensure_ascii=False))`;
    }

    function buildNodejs(url, body) {
        return `// Node.js (built-in https module)
const https = require('https');

const endpoint = new URL('${url}');
const payload  = JSON.stringify(${body});

const options = {
    hostname: endpoint.hostname,
    port:     endpoint.port || 443,
    path:     endpoint.pathname,
    method:   'POST',
    headers: {
        'Content-Type':        'application/json',
        'RedsysClientId':      '${CLIENT_ID}',
        'RedsysClientSecret':  '${CLIENT_SECRET}',
        'Content-Length':      Buffer.byteLength(payload)
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log(JSON.stringify(JSON.parse(data), null, 2));
    });
});

req.on('error', (err) => console.error('Error:', err.message));
req.write(payload);
req.end();`;
    }

    function buildJava(url, body) {
        // Escape double quotes inside the body for Java text block
        const javaBody = body.replace(/"/g, '\\"');
        return `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class RedsysApiExample {
    public static void main(String[] args) throws Exception {

        String body = "${javaBody}";

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("${url}"))
            .header("Content-Type",       "application/json")
            .header("RedsysClientId",     "${CLIENT_ID}")
            .header("RedsysClientSecret", "${CLIENT_SECRET}")
            .POST(HttpRequest.BodyPublishers.ofString(body))
            .build();

        HttpResponse<String> response =
            client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println("Status: " + response.statusCode());
        System.out.println(response.body());
    }
}`;
    }

    function buildCsharp(url, body) {
        const csBody = body.replace(/"/g, '\\"');
        return `using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

class RedsysApiExample
{
    static async Task Main()
    {
        using var client = new HttpClient();
        client.DefaultRequestHeaders.Add("RedsysClientId",     "${CLIENT_ID}");
        client.DefaultRequestHeaders.Add("RedsysClientSecret", "${CLIENT_SECRET}");

        var body    = @"${csBody}";
        var content = new StringContent(body, Encoding.UTF8, "application/json");

        var response = await client.PostAsync("${url}", content);
        var result   = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Status: {(int)response.StatusCode}");

        var formatted = JsonSerializer.Serialize(
            JsonSerializer.Deserialize<object>(result),
            new JsonSerializerOptions { WriteIndented = true }
        );
        Console.WriteLine(formatted);
    }
}`;
    }

    return { render };
})();
