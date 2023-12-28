const Express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = Express();
const pokeRouter = require('./routes/pokeRoutes');
const pokePageRouter = require('./routes/pokePageRoutes');

// Middle Wares
app.use(Express.json());
app.use(Express.static(`${__dirname}/public`));
app.use(morgan('dev'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// base page
let data = '';
fs.readFile('./public/HTML/index.html', 'utf-8', (err, rdata) => {
  data = rdata;
});

// Routes
app.get('/', (req, res) => {
  res.status(200).send(data.replace('{%SECTION%}',''));
}); // Base Route

app.use('/api/v1/pokeDex', pokeRouter); // API Route
app.use('/page/v1/pokeDex', pokePageRouter); // Page Route

// Error Handling
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
