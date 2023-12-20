const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

// User table
const User = db.users;

const generateToken = (user) => {
   console.log("Secret key", process.env.SECRET_KEY);
   let token = jwt.sign({id: user.id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
   });

   return token;
}

const signup = async (req, res) => {
   try {
      const { email, password, confirmPassword } = req.body;
      
      if (password !== confirmPassword) {
         return res.status(409).send("Passwords don't match");
      }

      console.log("Password before bcrypt: ", password);
      const salt = bcrypt.genSaltSync(10);
      console.log("Salt", salt);

      const data = {
         email,
         password: bcrypt.hashSync(password, salt), // Hashing the password with bcrypt
      };

      // Creating a user with the data from the request body
      const user = await User.create(data);

      if (user) {
         //let token = generateToken(user);

         // Setting the cookie to the token
         //res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
         //console.log("user", JSON.stringify(user, null, 2));
         //console.log("Token", token);

         //send users data to the client 
         return res.status(201).send(user);

      } else {
         return res.status(409).send("Details are not correct"); 
      }
   } catch (error) {
      console.log(error);
   }
}

// Login authentication logic
const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({
         where: { email: email },
      });

      console.log("User", user);

      if (!user) {
         console.log("User doesn't exist");
         return res.status(401).json({error: "Authentication failed - User doesn't exist"});
      }

      const isSame = bcrypt.compareSync(password, user.password);
      console.log(isSame);

      if (isSame === false) {
         console.log("Something wrong with the password - Passwords don't match");
         return res.status(401).json({error: "Something wrong with the password - Passwords don't match"});
      }

      console.log(user);

      let token = generateToken(user);
      //res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      return res.status(200).send(user);

   } catch (error) {
      console.log("Something wrong with the server");
      console.log(error);
      return res.status(500).json({error: "Unable to login - Something wrong with the server"});
   }
}

const logout = (_, res) => {
   res.clearCookie("jwt");
   return res.status(200).send("Logged out");
}

module.exports = {
   signup,
   login,
   logout,
}
