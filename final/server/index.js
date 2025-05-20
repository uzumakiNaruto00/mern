    const express = require('express');
    const app = express();
    const cors = require('cors');
    const { default: mongoose } = require('mongoose');
    require('dotenv').config();
    const session = require('express-session');
const MongoStore = require('connect-mongo');
    const parentRoutes = require('./routes/ParentRoute');
    const tradeRoutes = require('./routes/TradeRoute');
    const traineeRoutes = require('./routes/TraineeRoute');
    const authRoutes = require('./routes/AuthRoute');

    // Middleware Connections
    app.use(cors())
    app.use(express.json())

app.use(session({
    secret: 'your_secret_key', // replace with strong secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URL,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true
    }
}));

    // Mongo DB Connections
    const PORT = process.env.PORT || 5000;
    mongoose.connect(process.env.MONGO_DB_URL)
    .then(response=>{
        console.log('MongoDB Connection Succeeded.')
        app.listen(PORT, ()=>{
        console.log('App running in port: '+PORT)
    })
    }).catch(error=>{
        console.log('Error in DB connection: ' + error)
    });


    // Routes
    app.use('/api/auth',authRoutes);
    app.use('/api/parent',parentRoutes);
    app.use('/api/trade',tradeRoutes);
    app.use('/api/trainee',traineeRoutes);

    // Connection

