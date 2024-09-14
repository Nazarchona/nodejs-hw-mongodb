const initMongoConnection = require('./db/initMongoConnection');
const setupServer = require('./server');

const startApp = async () => {
  try {
    await initMongoConnection(); // Підключення до MongoDB
    const app = setupServer(); // Налаштування і запуск сервера
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the application:', error);
  }
};

startApp();



