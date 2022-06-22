//Pulling in required dependines 
const express = require('express');
const path = require('path');
const fs = require('fs')
const PORT = process.env.PORT || 3001;
//Sets up express.js as an app
const app = express();
//Public static page assests
app.use(express.static('public'));




app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);