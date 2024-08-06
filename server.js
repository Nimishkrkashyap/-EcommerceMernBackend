require("dotenv").config();
const app = require("./app");
const connectDataBase = require("./config/db");

connectDataBase().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is working on ${process.env.PORT}`);
  });
});
