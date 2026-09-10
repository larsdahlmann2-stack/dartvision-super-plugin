const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const manifestPath = path.join(__dirname, '../../mcp-manifest.json');

process.stdin.on('data', (data) => {
    try {
        const request = JSON.parse(data.toString());
        if (request.method === "tools/call" && request.params.name === "install_mcp_tool") {
            const { toolName, command, args, env, testCommand } = request.params.arguments;
            
            // SCHRANKE 1: Prüfen, ob ChatGPT überhaupt einen Test-Befehl mitgeliefert hat
            if (!testCommand) {
                throw new Error(`Installation abgelehnt: Du musst zwingend einen 'testCommand' mitliefern, um das Tool '${toolName}' vorab zu prüfen.`);
            }

            process.stderr.write(`[INFO] Starte automatische Sicherheitsprüfung für Tool: ${toolName}...\n`);

            // SCHRANKE 2: Den Test-Befehl auf deinem Windows-System ausführen
            try {
                // Führt z.B. "node src/neues-tool/test.js" aus und fängt Abstürze ab
                execSync(testCommand, { timeout: 5000 }); 
                process.stderr.write(`[SUCCESS] Testlauf für '${toolName}' war erfolgreich.\n`);
            } catch (testError) {
                // Wenn das neue Tool abstürzt, bricht der Installer sofort ab!
                throw new Error(`Sicherheitsprüfung FEHLGESCHLAGEN: Das neue Tool '${toolName}' ist beim Testlauf abgestürzt. Fehler: ${testError.message}`);
            }

            // Erst wenn der Test fehlerfrei war, wird das Manifest umgeschrieben:
            const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
            manifest.mcpServers[toolName] = { command, args, env };
            fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
            
            process.stdout.write(JSON.stringify({ 
                result: { 
                    status: "success", 
                    message: `Sicherheitsprüfung bestanden! Tool '${toolName}' wurde sicher installiert.` 
                } 
            }) + "\n");
        }
    } catch (err) {
        // Der Fehler wird an ChatGPT zurückgemeldet, damit die KI weiß, was sie reparieren muss
        process.stdout.write(JSON.stringify({ error: err.message }) + "\n");
    }
});
