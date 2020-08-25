const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require('./app');

//mongodb://localhost:27017/testcollection
function connect() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.DATABASEURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      //then is for success
      .then((res, err) => {
        console.log('DB connected successfully');
        if (err) return reject(err);
        resolve();
      })
      .catch((err) => console.log(err));
  });
}

function close() {
  return mongoose.disconnect();
}
// mongoose
//   .connect(process.env.DATABASEURL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   //then is for success
//   .then(() => console.log('DB connected successfully'))
//   //catch is for errors
//   .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});

module.exports = { connect, close };
