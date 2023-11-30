const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

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
      const { email, password } = req.body;

      const data = {
         email,
         password: await bcrypt.hash(password, 10), // Hashing the password with bcrypt
      };

      // Creating a user with the data from the request body
      const user = await User.create(data);

      if (user) {
         let token = generateToken(user);

         // Setting the cookie to the token
         res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
         console.log("user", JSON.stringify(user, null, 2));
         console.log(token);

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
      console.log(email, password);

      const user = await User.findOne({
         where: { email: email },  
      });
      console.log(user);

      if (user) {
         // Comparing the password from the request body to the password in the db
         const isSame = await bcrypt.compare(password, user.password);

         // If the passwords match, generate a token and set the cookie to the token
         if (isSame) {
            let token = generateToken(user);

            // Setting the cookie to the token
            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);

            // Send the user data to the client
            return res.status(200).send(user);

         } else {
            return res.status(401).send("Authentication failed");
         }
      } else {
         return res.status(401).send("Authentication failed");
      }

   } catch (error) {
      console.log(error);
   }
}

const logout = (_, res) => {
   res.clearCookie("jwt");
   return res.status(200).send("Logged out");
}

// Export our functions
module.exports = {
   signup,
   login,
   logout,
}
