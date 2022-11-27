const express=require("express")
const bodyParser=require("body-parser");
const sessions = require("express-session");
const cookieParser=require("cookie-parser");
const mongo = require("./src/config/database.config.js");
const path = require('path')
const MongoStore = require('connect-mongo');

const app=express();

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  sessions({
    secret: "let's check it out !!!",
    saveUninitialized: true,
    cookie: {
      maxAge: oneDay,
    },
    resave: false,
  })
);

let origins = ["http://localhost:3000"];
if (process.env.NODE_ENV === "development") origins.push("http://localhost:3000")
app.use(function (req, res, next) {
    if (origins.includes(req.headers.origin)) {
        res.header("Access-Control-Allow-Origin", req.headers.origin) // restrict it to the required domain
    }
    // res.header("Access-Control-Allow-Origin", origins) // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})


app.use(
    bodyParser.urlencoded({
        extended:true,
    })
);

app.use(express.json());
app.use(cookieParser());

const port=process.env.PORT || 8000;

mongo.connect((err,db)=>{
    if(err) throw err;
    console.log("DB connected ",db);
    require("./src/routes/routes")(app,db)
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
