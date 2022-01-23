const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

/* middleware */
app.use(express.static('./public'));

/* api */
app.get("/", function (req, res) {
    res.redirect("./proj3.html");
});

/* server */
app.listen(port);

/* loggine */
console.log('Server started at http://localhost:' + port);