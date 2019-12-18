const jsonDb = require("./serverData/db.json");

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// console.log that your server is up and running
app.listen(port, () => console.log(`Express Server listening on port ${port}`));

app.get("/shape-types", (req, res) => {
  res.json(jsonDb.shapeTypes);
});

app.get("/fabrics", (req, res) => {
  res.json(jsonDb.fabrics);
});

app.get("/projects/:id", (req, res) => {
  let pr = jsonDb.projects.find(p => p.id === parseInt(req.params.id, 10));
  res.json(pr);
});

app.get("/projects", (req, res) => {
  res.json(
    jsonDb.projects.map(p => {
      return {
        id: p.id,
        name: p.name,
        dimensions: `${p.quiltRows} x ${p.quiltColumns}`,
        shapeType: jsonDb.shapeTypes.find(s => s.id === p.quiltShapeType).name
      };
    })
  );
});

// todo: POST save-project
