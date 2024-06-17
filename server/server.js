import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Gun from 'gun';
import http from 'http';

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8765;

// Serve static files from the 'public' folder
app.use(express.static(join(__dirname, '../public')));

// Create an HTTP server
const server = http.createServer(app);

// Attach Gun to the server
const gun = Gun({ web: server });

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
