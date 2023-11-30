const express = require('express');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./models');
const userRoutes = require('./routes/userRoutes');

const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;

// parse application/x-www-form-urlencoded
// allows us to use req.body
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
    console.log("Success! - db has been re-synced")
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

