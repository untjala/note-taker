//Pulling in required dependencies 
const express = require('express');
const path = require('path');
const fs = require('fs');
const { uuid } = require('./utils/utils');
const { response } = require('express');
//Sets the port--env for heroku, 3001 for fallback
const PORT = process.env.PORT || 3001;

//Sets up express.js as an app to parse data
const app = express();
//Middleware
app.use(express.urlencoded({ extended: true }));
//Tells express to format into JSON
app.use(express.json());
//Public static page assests
app.use(express.static('public'));

//API routes
//Will return index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);
//Will return notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html')
  ));


//Gets notes, reads from the database and parses through JSON
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, './db/db.json'), 'utf-8', (error, data) => {
    if (error) throw error;
    res.json(JSON.parse(data));
  });
});
//Post request to write new notes and save them to the database 
app.post('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, './db/db.json'), 'utf-8', (error, data) => {
    let db = JSON.parse(data);
    db.push({
      id: uuid(),
      ...req.body,
    });
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(db, null, 2),
      (error, data) => {
        if (error) throw error;
        response.json(db);
      }
    );
});
});
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);