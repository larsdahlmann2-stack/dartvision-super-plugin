const fs = require('fs');
const path = require('path');

process.stdin.on('data', (data) => {
    try {
        const request = JSON.parse(data.toString());
        if (request.method === "tools/call") {
            const { name, arguments: args } = request.params;
            
            if (name === "read_file") {
                const content = fs.readFileSync(args.path, 'utf8');
                process.stdout.write(JSON.stringify({ result: { content } }) + "\n");
            } else if (name === "write_file") {
                fs.writeFileSync(args.path, args.content, 'utf8');
                process.stdout.write(JSON.stringify({ result: { status: "success" } }) + "\n");
            }
        }
    } catch (err) {
        process.stdout.write(JSON.stringify({ error: err.message }) + "\n");
    }
});
