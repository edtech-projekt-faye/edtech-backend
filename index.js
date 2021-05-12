const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3500


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log('Example app listening on port', port+'!');
});


// ERROR 404 HANDLER
app.use(function (req, res, next) {
    res.status(404).send('404 - Not Found!');
});