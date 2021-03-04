const express = require('express');
// import environment variables store in the .env file
require('dotenv').config();

const app = express();


// handle the middleware stuffs
app.use('/', express.static('public'));


app.listen(process.env.PORT, () =>
{
    console.log(`Server is listening on port ${process.env.PORT}...`);
});