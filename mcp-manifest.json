const fs = require('fs');
const path = require('path');

// Pfad zur Manifest-Datei
const manifestPath = path.join(__dirname, '../../mcp-manifest.json');

process.stdin.on('data', (data) => {
    try {
        const request = JSON.parse(data.toString());
        if (request.method === "tools/call" && request.params.name === "install_mcp_tool") {
            const { toolName, command, args, env } = request.params.arguments;
            
            // Bestehendes Manifest lesen
            const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
            
            // Neues Tool hinzufügen
            manifest.mcpServers[toolName] = { command, args, env };
            
            // Manifest aktualisiert speichern
            fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
            
            process.stdout.write(JSON.stringify({ result: { status: "success", message: `Tool ${toolName} erfolgreich installiert. Bitte starte den Plugin-Marktplatz in ChatGPT neu.` } }) + "\n");
        }
    } catch (err) {
        process.stdout.write(JSON.stringify({ error: err.message }) + "\n");
    }
});
