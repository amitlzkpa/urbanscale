require('dotenv').config();

const PORT = process.env.PORT || 8080;

module.exports = {
  devServer: {
    overlay: {
        warnings: false,
        errors: true
    },  
    progress: false,
    proxy: {
      "/api/": {
        target: `http://localhost:${PORT}/`,
        logLevel: "error",
      }
    }
  }
};