import path from "path";
import multer from "multer";
import express from "express";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const fileTypesPattern = /jpg|jpeg|png/;
  const extension = fileTypesPattern.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = fileTypesPattern.test(file.mimetype);

  if (extension && mimeType) {
    return cb(null, true);
  } else {
    cb("Images Only!");
  }
}

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  res.json({
    message: "Image Uploaded",
    image: `/${req.file.path}`,
  });
});

export default router;
