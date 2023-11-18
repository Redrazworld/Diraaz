const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../db');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'You must have logged in 1' });
    }
    const token = authorization.replace('Bearer ', '');
  
    jwt.verify(token, process.env.AUTH_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({ message: 'You must have logged in 2' });
      }
  
      const { adminId } = payload;
      const query = 'SELECT * FROM clients WHERE _id = ?'; // Assuming 'id' is your primary key
      db.query(query, [adminId], (error, results) => {
        if (error) {
          console.error('Error:', error);
          return res.status(500).json({ message: 'Server error' });
        }
  
        if (results.length === 1) {
          req.user = results[0];
          next();
        } else {
          res.status(401).json({ message: 'You must have logged in 2' });
        }
      });
    });
  };