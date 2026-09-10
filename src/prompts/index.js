// =========================================================================
// 📝 DEINE STARTBEFEHLE (PROMPTS) HIER EINTRAGEN:
// =========================================================================

// BEFEHL 1:
const BEFEHL_1_NAME = "Code Aufgabe";
const BEFEHL_1_TEXT = "Schreibe hier einfach deinen Text für den ersten Befehl rein. Du kannst diesen Text komplett löschen und deinen eigenen Text zwischen den beiden Anführungszeichen eintippen.";

// BEFEHL 2:
const BEFEHL_2_NAME = "Neues Projekt";
const BEFEHL_2_TEXT = "Schreibe hier deinen Text für den zweiten Befehl rein.";

// BEFEHL 3:
const BEFEHL_3_NAME = "Mein dritter Befehl";
const BEFEHL_3_TEXT = "Schreibe hier deinen Text für den dritten Befehl rein.";

// BEFEHL 4:
const BEFEHL_4_NAME = "Mein vierter Befehl";
const BEFEHL_4_TEXT = "Schreibe hier deinen Text für den vierten Befehl rein.";


// =========================================================================
// ⚙️ ZENTRALE RECHENSEITE (Dieser Code verarbeitet deine Befehle für ChatGPT)
// =========================================================================

process.stdin.on('data', (data) => {
    try {
        const request = JSON.parse(data.toString());
        
        if (request.method === "prompts/list") {
            process.stdout.write(JSON.stringify({
                result: {
                    prompts: [
                        { name: BEFEHL_1_NAME, description: "Führt den ersten Befehl aus." },
                        { name: BEFEHL_2_NAME, description: "Führt den zweiten Befehl aus." },
                        { name: BEFEHL_3_NAME, description: "Führt den dritten Befehl aus." },
                        { name: BEFEHL_4_NAME, description: "Führt den vierten Befehl aus." }
                    ]
                }
            }) + "\n");
        } 
        
        else if (request.method === "prompts/get") {
            let selectedPromptText = "";
            
            if (request.params.name === BEFEHL_1_NAME) {
                selectedPromptText = BEFEHL_1_TEXT;
            } else if (request.params.name === BEFEHL_2_NAME) {
                selectedPromptText = BEFEHL_2_TEXT;
            } else if (request.params.name === BEFEHL_3_NAME) {
                selectedPromptText = BEFEHL_3_TEXT;
            } else if (request.params.name === BEFEHL_4_NAME) {
                selectedPromptText = BEFEHL_4_TEXT;
            }

            process.stdout.write(JSON.stringify({
                result: {
                    messages: [
                        {
                            role: "user",
                            content: { type: "text", text: selectedPromptText.trim() }
                        }
                    ]
                }
            }) + "\n");
        }
    } catch (err) {
        process.stdout.write(JSON.stringify({ error: err.message }) + "\n");
    }
});
