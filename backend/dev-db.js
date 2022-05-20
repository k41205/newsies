// README
// It's a simple script to populate the db with initial data or delete them, it's made just for dev purpose. To use it you have to just run one of the following commands:
// node dev-db.js --import
// node dev-db.js --delete

const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const Newspaper = require('./models/newspaperModel');

dotenv.config({ path: './backend/config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});

// READ JSON FILE
const newspapers = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/dataset-example.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Newspaper.create(newspapers);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA FROM DB
const deleteData = async () => {
  try {
    await Newspaper.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// ARGV ALLOWED TO RUN THE CHOSEN FUNCT
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
