const Express = require('express');
const morgan = require('morgan');

const app = Express();
const pokeRouter = require('./routes/pokeRoutes');

// Middle Wares
app.use(Express.json());
app.use(Express.static(`${__dirname}/public`));
app.use(morgan('dev'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send(`Go to /api/pokeDex`);
});
app.use('/api/pokeDex', pokeRouter);

module.exports = app;
