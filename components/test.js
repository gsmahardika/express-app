const express = require('express')
const mysql = require('../services/mysql')
const router = express.Router()

let getInitialData = (res) => {
  mysql.query('SELECT * FROM test', (err, results) => {
    if (err) {
      throw err
    }

    getExtendedData(res, results)
  })
}

let getExtendedData = (res, data) => {
  mysql.query('SELECT * FROM test', (err, results) => {
    if (err) {
      throw err
    }

    returnResponse(res, data, results)
  })
}

let returnResponse = (res, initialData, extendedData) => {
  res.json({
    status: true,
    message: 'Hello world from /test/user!',
    initialData: initialData,
    extendedData: extendedData
  })
}

router.get('/user', (req, res, next) => {
  getInitialData(res)
})

module.exports = router
