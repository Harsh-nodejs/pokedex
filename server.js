const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// mongoose connection
mongoose.connect(DB).then(console.log('\nMaster POKEDEX Connected !!'));

// Listen to the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(
    `Server Running on PORT : ${port}\nConnect on : http://127.0.0.1:${port}/ \n`,
  );
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});