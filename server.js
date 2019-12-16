const jsonDb = require("./serverData/db.json");

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// console.log that your server is up and running
app.listen(port, () => console.log(`Express Server listening on port ${port}`));

app.get("/shape-types", (req, res) => {
  res.json(jsonDb.shapeTypes);
});
