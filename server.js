const express = require('express');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

//Bodyparser Middleware
app.use(BodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI; 

 //Connect to mongo 
mongoose
     .connect(db)
     .then(() => console.log('Mongo Connected...'))
     .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

//For huroku
// Serve static assests if in production
if(process.env.NODE_ENV === 'production') {
   // Set static folder
   app.use(express.static('client/build'));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
   });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));