// backend/controllers/authController.js

const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const sendVerificationEmail = async (userEmail, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // SMTP сервис
    auth: {
      user: '-email@gmail.com',
      pass: '-email-password'
    }
  })

  const mailOptions = {
    from: '-email@gmail.com',
    to: userEmail,
    subject: 'Email Verification',
    text: `Please verify your email by clicking the following link: 
    http://localhost:5173/verify-email?token=${verificationToken}`
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Verification email sent')
  } catch (error) {
    console.error('Error sending verification email', error)
  }
}

exports.registerUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const emailVerificationToken = crypto.randomBytes(32).toString('hex')
    const user = new User({ email, password, emailVerificationToken })
    await user.save()

    // Отправка письма с подтверждением
    sendVerificationEmail(user.email, emailVerificationToken)

    res.status(201).json({ message: 'User registered, please verify your email' }) // JSON-ответ
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' }) // JSON-ответ в случае ошибки
  }
}

exports.verifyEmail = async (req, res) => {
  const { token } = req.query

  try {
    const user = await User.findOne({ emailVerificationToken: token })

    if (!user) {
      return res.status(400).json({ message: 'Invalid token' })
    }

    user.isEmailVerified = true
    user.emailVerificationToken = undefined // Убираем токен после верификации
    await user.save()

    res.json({ message: 'Email verified successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error verifying email' })
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user || !user.isEmailVerified) {
      return res.status(400).json({ message: 'Invalid credentials or email not verified' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' })
  }
}
