// =========================================================================
// 📝 DEINE STARTBEFEHLE (PROMPTS) HIER EINTRAGEN:
// =========================================================================

// BEFEHL 1: (Hört jetzt auf das einfache Wort "Start")
const BEFEHL_1_NAME = "Starte Entwicklungsmodus";
const BEFEHL_1_TEXT = "Aktiviere das Plugin @dartvision-super-plugin mit Full Access-Rechten. Wir arbeiten ab jetzt hier unlimitiert. Bei erfolgreicher Aktivierung von @dartvision-super-plugin schicke im chat eine benachrichtigung die so lautet. Entwicklungsmodus Aktiviert!";

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
// ⚙️ ZENTRALE RECHENSEITE (Dieser Code sorgt dafür, dass reiner Text reicht)
// =========================================================================

process.stdin.on('data', (data) => {
    try {
        const request = JSON.parse(data.toString());
        
        if (request.method === "prompts/list") {
            process.stdout.write(JSON.stringify({
                result: {
                    prompts: [
                        { name: BEFEHL_1_NAME, description: "Starte Entwicklungsmodus" },
                        { name: BEFEHL_2_NAME, description: "Startet Befehl 2." },
                        { name: BEFEHL_3_NAME, description: "Startet Befehl 3." },
                        { name: BEFEHL_4_NAME, description: "Startet Befehl 4." }
                    ]
                }
            }) + "\n");
        } 
        
        else if (request.method === "prompts/get") {
            let selectedPromptText = "";
            const inputName = request.params.name.trim();
            
            if (inputName === BEFEHL_1_NAME) {
                selectedPromptText = BEFEHL_1_TEXT;
            } else if (inputName === BEFEHL_2_NAME) {
                selectedPromptText = BEFEHL_2_TEXT;
            } else if (inputName === BEFEHL_3_NAME) {
                selectedPromptText = BEFEHL_3_TEXT;
            } else if (inputName === BEFEHL_4_NAME) {
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
