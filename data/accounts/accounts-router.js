const express = require('express');

// database access using knex
const db = require('../dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
    .then(accounts => {
        console.log(accounts)
        res.json(accounts)
    })
    .catch(error => {
        res.status(500).json({
            message: 'Failed to get accounts'
        })
    })
})

router.post('/', (req, res) => {
    const accountsData = req.body;
    db('accounts').insert(accountsData)
    .then(ids => {
      db('accounts').where({ id: ids[0] })
      .then(newAccountEntry => {
        res.status(201).json(newAccountEntry);
      });
    })
    .catch (err => {
      console.log('POST error', err);
      res.status(500).json({ message: "Failed to store data" });
    });
  });
module.exports = router;