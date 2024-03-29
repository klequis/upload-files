"use strict";

const express = require("express");
const formidable = require("formidable");
const path = require("path");
const fse = require("fs-extra");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send(`
    <h2>With <code>"express"</code> npm package</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

const chkUploadsDir = async (dirPath) => {
  try {
    await fse.ensureDir(dirPath);
    return true;
  } catch (err) {
    return false;
  }
};

app.post("/api/upload", async (req, res, next) => {
  const dirname = __dirname;
  const uploadsDir = path.join(__dirname, "../uploads");
  const dirChk = await chkUploadsDir(uploadsDir);

  console.log("req", req);

  if (!dirChk) {
    res.json({ error: "could not create upload directory" });
  }
  const form = formidable({ multiples: true, uploadDir: uploadsDir });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files, dirname, uploadsDir });
  });
});

app.get("/api/test", async (req, res, next) => {
  res.json({ result: "success" });
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000 ...");
});
