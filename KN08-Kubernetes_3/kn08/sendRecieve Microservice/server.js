const express = require('express');
const dotenv = require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const db = require('./db');
var cors = require('cors')

const PORT = process.env.PORT || '3002';

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

app.get('/', cors(corsOptions), (request, response) => {
    response.sendStatus(200)
})

app.post("/send", cors(corsOptions), async (request, response) => {
    const userId = request.body.id
    const amount = Number(request.body.amount)
    const friendUserId = request.body.receiverId
    const userQuery = "SELECT * FROM users WHERE id=?"
    const updateQuery = "UPDATE users SET amount=? WHERE id=?"
    try {
        const user = await db.query(userQuery, userId)
        if (Number(user[0].amount) < amount) {
            response.sendStatus(403)
        }
        const friend = await db.query(userQuery, friendUserId)
        const userTotal = Number(user[0].amount) - amount
        const friendTotal = Number(friend[0].amount) + amount
        await db.query(updateQuery, [userTotal, userId])
        await db.query(updateQuery, [friendTotal, friendUserId])
        response.status(200).send("true")
    } catch (_error) {
        response.status(200).send("false")
    }
})

//const userRouter = require('./routes/user');
//app.use('/user',userRouter);

/**Start listening */
app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})