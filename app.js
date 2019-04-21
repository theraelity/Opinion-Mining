const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const chalk = require('chalk');
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false   }));
app.use(bodyParser.json());
app.use('/', require('./routes/route'));
app.use('/hotel',require('./routes/hotelRoute'));
app.use((req,res)=>{
    res.status(404).send('<h1>Sorry, The resource could not be found.</br> Please return to the main page</h1>');
})
app.listen(process.env.PORT || 1234, err=>{
    if(err){ 
        throw err;
    }
    else {
        console.log(chalk.green("*** SERVER IS UP ***"));
    }
});