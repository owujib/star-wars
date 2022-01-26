const App = require('./app');

const PORT = process.env.PORT || 3000;
App.listen(PORT, () => {
  console.log(`App is running on ${process.env.APP_URL} ${PORT}`);
});
