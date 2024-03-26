const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL
    )
    .then((con) => {
      console.log("MongoDB connected to host: " + con.connection.host);
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
    });
};

module.exports = connectDatabase;
