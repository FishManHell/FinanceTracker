import app from './src/server'

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}