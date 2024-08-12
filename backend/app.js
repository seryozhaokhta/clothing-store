// backend/app.js

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
require('dotenv').config() // Подключаем dotenv
const authRoutes = require('./routes/authRoutes')

const app = express()

// Подключение к базе данных
connectDB()

// Middlewares
app.use(cors()) // Добавляем поддержку CORS
app.use(express.json())

// Маршруты
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
