require("dotenv").config();
const app = require("./app");
const connectDataBase = require("./config/db");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`)
  process.exit(1);
})

connectDataBase()

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on ${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) =>{
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server due to unhandled promise Rejection`)

  server.close(() => {
    process.exit(1);
  })
})