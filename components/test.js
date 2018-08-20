const express = require('express')
const mysql = require('../services/mysql')
const router = express.Router()

router.get('/user', (req, res, next) => {
  mysql.query('SELECT * FROM test', (err, rows) => {
    if (err) {
      throw err
    }

    res.json({
      status: true,
      message: 'Hello world from /test/user!',
      data: rows
    })
  })
})

module.exports = router
