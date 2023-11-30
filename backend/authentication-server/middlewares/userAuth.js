const express = require('express');
const db = require('../models');

// Assigning the users to the user variable
const User = db.users;

// Function to check if username or email is already in use
const saveUser = async (req, res, next) => {
   try {

      // Check if email is in database
      const emailcheck = await User.findOne({
         where: {email: req.body.email},
      });

      // If the email is already in use, return a 409 status code
      if (emailcheck) {
         return res.json(409).send("email already in use")
      }

      // If the username and email are not in use, continue to the next middleware
      next();

   } catch (error) {
      console.log(error);
   }
};

module.exports = {
   saveUser,
};
