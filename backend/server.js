const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './backend/config.env' });
const app = require('./app');

console.log(process.env.DATABASE);

if (process.env.NODE_ENV === 'development') {
  console.log('Logging active');
}

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
