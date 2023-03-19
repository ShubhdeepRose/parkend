const stripe = require("./routes/stripe");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const morgan = require("morgan");
const format = ":method :url :status :res[content-length] - :response-time ms";
const PORT = process.env.PORT || 5002;
app.use(morgan(format));
app.use(express.json());

app.use("/api/stripe", stripe);

app.listen(PORT, () => {
  console.log("listening on port 5002");
});
