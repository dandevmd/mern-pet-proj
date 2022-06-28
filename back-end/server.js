const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMidleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT

//Connect to the Database
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



//serve the front end server because the production dont have client side
if (process.env.NODE_ENV === 'production') {
    //set build folder as static
    app.use(express.static(path.join(__dirname, '../front-end/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'front-end', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to the support desk API' })
    })
}


app.use(errorHandler)

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))