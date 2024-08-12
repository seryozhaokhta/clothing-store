// backend/controllers/authController.js

const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.registerUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = new User({ email, password })
    await user.save()
    res.status(201).json({ message: 'User registered' })
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' })
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
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
