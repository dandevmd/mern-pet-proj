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


app.get('/', (req, res) => {
    return res.send('getting hello')
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))