const jsonDb = require("./serverData/db.json");
const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Express Server listening on port ${port}`));

//#region Utilities

function saveJsonDb() {
  // yeah...not ideal for a real world app
  fs.writeFile("./serverData/db.json", JSON.stringify(jsonDb), function(err) {
    err ? console.log(err) : console.log("db.json updated");
  });
}

//#endregion Utilities

//#region Shapes

app.get("/shape-types", (req, res) => {
  res.json(jsonDb.shapeTypes);
});

//#endregion Shapes

//#region Fabrics

app.get("/fabrics", (req, res) => {
  res.json(jsonDb.fabrics);
});

//#endregion Fabrics

//#region Projects

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
  // client-side validation is actually best.  However, name is the only one that would actually break anything.
  // other fields simply cause the quilt from displaying anything
  if (!project.name) return "name is required";
  return "";
}

app.post("/projects", function(req, res) {
  const project = req.body;
  const error = validateProject(project);

  if (error) {
    res.status(400).send(error);
  } else {
    // generate next sequential id if id = 0.  In a real app we'd let the DB do this or generate a guid
    if (project.id === 0) {
      const maxId = Math.max(...jsonDb.projects.map(p => p.id));
      project.id = Number.isInteger(maxId) ? maxId + 1 : 1;
      jsonDb.projects.push(project);
    } else {
      const projectIndex = jsonDb.projects.findIndex(p => p.id === project.id);
      jsonDb.projects[projectIndex] = project;
    }

    saveJsonDb();

    return res.send({ message: "Project saved successfully" });
  }
});

app.delete("/projects", function(req, res) {
  const projectIndex = jsonDb.projects.findIndex(p => p.id === req.body.id);

  if (projectIndex >= 0) {
    jsonDb.projects.splice(projectIndex, 1);
    saveJsonDb();
    return res.send({ message: "Project deleted successfully" });
  } else {
    return res.send({ message: "Project id not found" });
  }
});

//#endregion Projects
