const express = require('express');
const app = express();
const fs = require('fs');
const ejs = require('ejs');
const dotenv = require('dotenv')


dotenv.config()
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', (req, res) => {
    res.send('hi');
});



app.listen(PORT, () => {
    console.log(`App started at http://localhost:${PORT}`);
});
