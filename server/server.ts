import app from "./src/index"

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;


  const server = app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });

  const shutdown = () => {
    console.log('🛑 Shutting down server...');

    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}