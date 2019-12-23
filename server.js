const jsonDb = require("./serverData/db.json");
const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload({ createParentPath: true }));

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

const _publicImagesFolder = "/fabric-images/";

app.get("/fabrics", (req, res) => {
  res.json(jsonDb.fabrics);
});

app.post("/fabrics", function(req, res) {
  const fabricFormData = req.body;
  const newFabric = { id: 0, url: "" };

  if (fabricFormData.imageType === "url") {
    // set URL if it's a simple public url value
    newFabric.url = fabricFormData.imageUrl;
  } else if (fabricFormData.imageType === "upload") {
    // save the image to the web server and set that URL
    const imagePath = path.join(
      __dirname,
      "/client/public",
      _publicImagesFolder,
      req.files.imageFile.name
    );

    req.files.imageFile.mv(imagePath);
    newFabric.url = path
      .join(_publicImagesFolder, req.files.imageFile.name)
      .replace(/\\/g, "/");
  } else {
    return res.status(400).send("Error saving fabric");
  }

  // generate next sequential id if id = 0.  In a real app we'd let the DB do this or generate a guid
  const maxId = Math.max(...jsonDb.fabrics.map(f => f.id));
  newFabric.id = Number.isInteger(maxId) ? maxId + 1 : 1;

  jsonDb.fabrics.push(newFabric);
  saveJsonDb();

  return res.send({ message: "Fabric saved successfully" });
});

app.delete("/fabrics", function(req, res) {
  const fabricIndex = jsonDb.fabrics.findIndex(f => f.id === req.body.id);

  if (fabricIndex >= 0) {
    let deletedFabric = jsonDb.fabrics.splice(fabricIndex, 1);

    saveJsonDb();

    if (
      deletedFabric &&
      deletedFabric.length > 0 &&
      deletedFabric[0].url.startsWith(_publicImagesFolder)
    ) {
      console.log("deleting file from image store");
      fs.unlink(
        path.join(__dirname, "/client/public", deletedFabric[0].url),
        err => {
          return res
            .status(400)
            .send(
              `fabric deleted from db but there was an error deleting the file: ${err}`
            );
        }
      );
    }

    return res.send({ message: "Fabric deleted successfully" });
  } else {
    return res.send({ message: "Fabric id not found" });
  }
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
