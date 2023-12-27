const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// mongoose connection
mongoose.connect(DB).then(console.log('\nMaster POKEDEX Connected !!'));

// Listen to the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Server Running on PORT : ${port}\nConnect on : http://127.0.0.1:${port}/ \n`,
  );
});