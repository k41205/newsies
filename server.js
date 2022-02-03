const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

if (process.env.NODE_ENV === 'development') {
  console.log('Logging active');
}

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
