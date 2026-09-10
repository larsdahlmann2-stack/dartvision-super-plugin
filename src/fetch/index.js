const http = require('http');

process.stdin.on('data', (data) => {
    try {
        const request = JSON.parse(data.toString());
        if (request.method === "tools/call" && request.params.name === "fetch_url") {
            http.get(request.params.arguments.url, (res) => {
                let body = '';
                res.on('data', (chunk) => body += chunk);
                res.on('end', () => {
                    process.stdout.write(JSON.stringify({ result: { status: res.statusCode, body } }) + "\n");
                });
            });
        }
    } catch (err) {
        process.stdout.write(JSON.stringify({ error: err.message }) + "\n");
    }
});
