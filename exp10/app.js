
const http = require('http');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const port = 6001;
const departments = new Set(['CSE', 'AIML', 'IT', 'ECE', 'EEE', 'Mechanical']);
const events = new Set([
    'Hackathon',
    'Technical Workshop',
    'Project Expo',
    'Web Development Contest'
]);

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, c =>
        ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])
    );
}

async function start() {
    await client.connect();

    const db = client.db('collegeDB');
    const collection = db.collection('registrations');

    const server = http.createServer(async (req, res) => {
        try {
            if (req.url === '/' && req.method === 'GET') {
                const home = await fs.promises.readFile(path.join(__dirname, 'home.html'));
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                res.end(home);
            }

            else if (req.url === '/server' && req.method === 'POST') {
                let data = '';

                req.on('data', chunk => data += chunk);

                req.on('end', async () => {
                    try {
                        const form = new URLSearchParams(data);

                        const student = {
                            name: (form.get('name') || '').trim(),
                            email: (form.get('email') || '').trim(),
                            mobile: (form.get('mobile') || '').trim(),
                            department: (form.get('department') || '').trim(),
                            event: (form.get('event') || '').trim()
                        };

                        if (!student.name || !student.email ||
                            !student.mobile || !student.department ||
                            !student.event ||
                            !/^[A-Za-z ]+$/.test(student.name) ||
                            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email) ||
                            !/^[0-9]{10}$/.test(student.mobile) ||
                            !departments.has(student.department) ||
                            !events.has(student.event)) {
                            res.writeHead(400, {'Content-Type':'text/plain'});
                            return res.end('Invalid form data. Go back and try again.');
                        }

                        await collection.insertOne(student);

                        const records = await collection.find().toArray();

                        let rows = records.map((s, i) => `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${escapeHTML(s.name)}</td>
                                <td>${escapeHTML(s.email)}</td>
                                <td>${escapeHTML(s.mobile)}</td>
                                <td>${escapeHTML(s.department)}</td>
                                <td>${escapeHTML(s.event)}</td>
                            </tr>
                        `).join('');

                        res.writeHead(200, {'Content-Type':'text/html'});

                        res.end(`
                            <html>
                            <head>
                                <title>Registration Details</title>
                                <style>
                                    body { font-family:Arial; padding:25px;
                                           background:#eef2f7; }
                                    table { width:100%; background:white;
                                            border-collapse:collapse; }
                                    th,td { padding:12px; border:1px solid #ddd;
                                            text-align:left; }
                                    th { background:#174477; color:white; }
                                    h2 { color:#174477; }
                                </style>
                            </head>
                            <body>
                                <h2>Registration Successful!</h2>
                                <h3>Registered Students</h3>
                                <table>
                                    <tr>
                                        <th>S.No</th><th>Name</th>
                                        <th>Email</th><th>Mobile</th>
                                        <th>Department</th><th>Event</th>
                                    </tr>
                                    ${rows}
                                </table>
                                <p><a href="/">Register Another Student</a></p>
                            </body>
                            </html>
                        `);
                    } catch (error) {
                        console.error(error);
                        res.writeHead(500);
                        res.end('Unable to process registration.');
                    }
                });
            }

            else {
                res.writeHead(404);
                res.end('Page Not Found');
            }
        } catch (error) {
            console.error(error);
            if (!res.headersSent) {
                res.writeHead(500);
                res.end('Server Error');
            }
        }
    });

    server.listen(port, '127.0.0.1', () =>
        console.log(`Server running at http://localhost:${port}`)
    );
}

start().catch(console.error);
