const App = require('./start/App');

const PORT = process.env.PORT || 3000;
App.listen(PORT, () => {
  console.log(`App is running on ${process.env.APP_URL} ${PORT}`);
});
