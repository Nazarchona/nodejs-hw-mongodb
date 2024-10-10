const errorHandler = (error, req, res, next) => {
  // Логування детальної інформації про помилку
  console.error('Error details:', {
    message: error.message,
    status: error.status || 500,
    stack: error.stack, // Додаємо стек викликів для детального діагностування
    method: req.method, // Метод запиту (GET, POST, тощо)
    url: req.url,       // URL запиту
    body: req.body,     // Тіло запиту
    query: req.query,   // Параметри запиту
  });

  const statusCode = error.status || 500;

  res.status(statusCode).json({
    status: statusCode,
    message: statusCode === 500 ? 'Something went wrong' : error.message,
  });
};

export default errorHandler;

