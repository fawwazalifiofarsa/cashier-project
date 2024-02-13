require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = require("./models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to wedding guestbook application." });
  });

require("./routes/meja.routes.js")(app);
require("./routes/menu.routes.js")(app);
require("./routes/user.routes.js")(app);
require("./routes/transaksi.routes.js")(app);
require("./routes/detail_transaksi.routes.js")(app);

const PORT = process.env.APP_PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})