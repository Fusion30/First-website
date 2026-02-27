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

1. When blog added deleted, no auto pg reload is happening.
2. When live, when I modify database, the app shows the changes but after a while returns back to its before modification state.
3. Blogs are rendering as one single big paragraph.
