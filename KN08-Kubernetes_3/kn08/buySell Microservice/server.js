const express = require('express');
const dotenv = require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
var cors = require('cors')
const db = require('./db');

//dotenv.config({path: `.env-${process.env.NODE_ENV}`});

const PORT = process.env.PORT || '3001';

const app = express();


/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({extended:false}));
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors())
/**
 * Routes
 */

app.get('/', cors(corsOptions), async (request, response) => {
    response.sendStatus(200)
})

app.post("/buy", cors(corsOptions), async (request, response) => {
    const userId = request.body.id
    const amount = Number(request.body.amount)
    const userQuery = "SELECT * FROM users WHERE id=?"
    const updateQuery = "UPDATE users SET amount=? WHERE id=?"
    console.log("successfully inside request")
    try {
        console.log("successfully inside try catch")
        const user = await db.query(userQuery, userId)
        console.log(user[0])
        const total = Number(user[0].amount) + amount
        await db.query(updateQuery, [total, userId])
        response.status(200).send("true")
    } catch (error) {
        console.error(error)
        response.status(200).send("false")
    }
})

app.post("/sell", cors(corsOptions), async (request, response) => {
    const userId = request.body.id
    const amount = Number(request.body.amount)
    const userQuery = "SELECT * FROM users WHERE id=?"
    const updateQuery = "UPDATE users SET amount=? WHERE id=?"
    try {
        const user = await db.query(userQuery, userId)
        let total = 0;
        if (Number(user[0].amount) > amount){
            total = Number(user[0].amount) - amount
        }
        await db.query(updateQuery, [total, userId])
        response.status(200).send("true")
    } catch (_error) {
        response.status(200).send("false")
    }
})

/**Start listening */
app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})