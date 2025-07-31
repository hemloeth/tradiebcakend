const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;
const indexRoutes = require('./routes/index');

app.use(cors());
app.use(express.json());
connectDb();
app.use('/api', indexRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
