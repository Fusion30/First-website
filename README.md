This is a personal blogsite.
No authentication done yet.
App is hosted on render with a 15min cronjob.

Tech Stack
Node
Express
SQLite

Admin index.js is where add/del of blogs and dynamic SSR is done. No EJS used.

Endpoints
"/admin/upload"
"/blogs/:id"" for deleting

Database
Connection in dbConnection.js.
seedTable.js handles seeding
deleteBlog.js handles deleting

Bugs

1. cronjob.org failing due to too large output.

Future TODO:
Health Endpoint Security (Optional)
If needed later, protect `/healthz` with a secret token so only your uptime monitor can pass.

How it works:

- Set environment variable: `HEALTH_TOKEN=<long-random-string>`
- Monitor URL: `/healthz?token=<same-token>`
- Server returns success only when token matches (otherwise `403`)

Example monitor URL:
`https://your-app.onrender.com/healthz?token=your-secret-token`
