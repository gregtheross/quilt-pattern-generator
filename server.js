const jsonDb = require("./serverData/db.json");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

function validateProject(project) {
  // todo: implement validation
  // return "validation error";
  return undefined;
}

app.post("/projects", function(req, res) {
  const error = validateProject(req.body);

  if (error) {
    res.status(400).send(error);
  } else {
    // todo: generate next sequential id if id = 0.  In a real app we'd let the DB do this or generate a guid
    // todo: add/save project to jsonDb
    return res.send({ message: "Project saved successfully" });
  }
});
