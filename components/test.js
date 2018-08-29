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

const getAdditionalData = async (res) => {
  let testQuery = new Promise((resolve, reject) => {
    mysql.query('SELECT * FROM test', (err, rows) => {
      if (err) {
        throw err
      }

      console.log(2)

      resolve(rows)
    })
  })

  let categoryQuery = new Promise((resolve, reject) => {
    mysql.query('SELECT * FROM category', (err, rows) => {
      if (err) {
        throw err
      }

      console.log(4)

      resolve(rows)
    })
  })

  console.log(1)
  let test = await testQuery
  console.log(3)
  let category = await categoryQuery

  res.json({
    status: true,
    message: 'Hello world from /test/data!',
    test: test,
    category: category
  })
}

router.get('/user', (req, res, next) => {
  getInitialData(res)
})

router.get('/data', (req, res, next) => {
  getAdditionalData(res)
})

module.exports = router
