const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    let username = '';

    ws.on('message', (message) => {
        // Assuming message is a JSON string with username and text
        const data = JSON.parse(message);

        // Simple username validation
        if (data.username && data.text) {
            username = data.username;
            console.log(`${username} says: ${data.text}`);
            
            // Broadcast message to other users
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ username: username, text: data.text }));
                }
            });
        }
    });

    ws.on('close', () => {
        console.log(`${username} disconnected`);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
