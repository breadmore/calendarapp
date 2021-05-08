const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const router = require("./routes/router");
const path = require('path')
const morgan = require('morgan');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'public/')));

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

app.use(morgan('combined'));