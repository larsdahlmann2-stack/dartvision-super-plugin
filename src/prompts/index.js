// =========================================================================
// 📝 DEINE STARTBEFEHLE (PROMPTS) HIER EINTRAGEN:
// =========================================================================
// Du kannst den Text zwischen den schrägen Anführungszeichen ( ` ) frei eintragen.

const BEFEHL_1_NAME = "Code Aufgabe";
const BEFEHL_1_TEXT = `
HIER DEINEN ERSTEN TEXT FÜR 'Code Aufgabe' EINTRAGEN
`;


const BEFEHL_2_NAME = "Neues Projekt";
const BEFEHL_2_TEXT = `
HIER DEINEN ZWEITEN TEXT FÜR 'Neues Projekt' EINTRAGEN
`;


const BEFEHL_3_NAME = "Mein dritter Befehl";
const BEFEHL_3_TEXT = `
HIER DEINEN DRITTEN TEXT FÜR 'Mein dritter Befehl' EINTRAGEN
`;

// 💡 MÖCHTEST DU EINEN 4. BEFEHL HINZUFÜGEN? 
// Kopiere einfach die obigen Zeilen, nenne sie BEFEHL_4_NAME und BEFEHL_4_TEXT 
// und trage sie unten in der "ZENTRALE RECHENSEITE" ein.


// =========================================================================
// ⚙️ ZENTRALE RECHENSEITE (Dieser Code verarbeitet deine Befehle für ChatGPT)
// =========================================================================

process.stdin.on('data', (data) => {
    try {
        const request = JSON.parse(data.toString());
        
        // 1. Zeigt ChatGPT die Liste deiner Befehle, wenn du "/" im Chat tippst
        if (request.method === "prompts/list") {
            process.stdout.write(JSON.stringify({
                result: {
                    prompts: [
                        { name: BEFEHL_1_NAME, description: "Führt den ersten Befehl aus." },
                        { name: BEFEHL_2_NAME, description: "Führt den zweiten Befehl aus." },
                        { name: BEFEHL_3_NAME, description: "Führt den dritten Befehl aus." }
                        // Falls du einen 4. Befehl hast, füge hier eine Zeile hinzu:
                        // { name: BEFEHL_4_NAME, description: "Führt den vierten Befehl aus." }
                    ]
                }
            }) + "\n");
        } 
        
        // 2. Übergibt den richtigen Text an den Chat, wenn du den Befehl aufrufst
        else if (request.method === "prompts/get") {
            let selectedPromptText = "";
            
            if (request.params.name === BEFEHL_1_NAME) {
                selectedPromptText = BEFEHL_1_TEXT;
            } else if (request.params.name === BEFEHL_2_NAME) {
                selectedPromptText = BEFEHL_2_TEXT;
            } else if (request.params.name === BEFEHL_3_NAME) {
                selectedPromptText = BEFEHL_3_TEXT;
            }
            // Falls du einen 4. Befehl hast, füge hier zwei Zeilen hinzu:
            // else if (request.params.name === BEFEHL_4_NAME) {
            //     selectedPromptText = BEFEHL_4_TEXT;
            // }

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
