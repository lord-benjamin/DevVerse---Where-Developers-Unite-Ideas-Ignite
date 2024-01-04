require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')

const app = express();
app.use(express.static(__dirname + "/public"));

//Connect database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));
app.use(cors())

app.get('/', (req, res) => {
    res.send('Server running');
});

//Define routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
