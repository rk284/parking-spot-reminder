 require('dotenv').config();
 const express = require('express');
 const mongoose = require('mongoose');
 const session = require('express-session');
 const mongoStore = require('connect-mongo');

 const cors = require('cors');
 const app = express();


// Environment variables
const dbUrl = process.env.DB_URL;
const port = process.env.PORT;
const secretSessionKey = process.env.SECRET_SESSION_KEY;
const frontendUrl = process.env.FRONTEND_URL;


app.use(express.json());


//Session
app.use(session({
    secret: secretSessionKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,   
    },
    store: mongoStore.create({mongoUrl : dbUrl})
}));

//Cors
app.options(frontendUrl, cors());


app.use(cors({
    origin: frontendUrl,
    methods:['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization'],
    credentials:true,
}));




//Routes
const authRouter = require('./routes/auth.route');
const parkingRouter = require('./routes/parking.route');

app.use('/api/auth',authRouter.router);
app.use('/api/parking', parkingRouter);




//DB Connection

mongoose.connect(dbUrl).then(() => {
    console.log("Database connected successfully");
    app.listen(port,() =>{
    console.log(`Server is running on ${port}`);
    });
}).catch(error => {
    console.log('Database connection error:',error);
});
