const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const fs = require("fs");
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(`public/images/${req.body.code}`)) {
      fs.mkdirSync(`public/images/${req.body.code}`);
    }

    cb(null, `public/images/${req.body.code}`);
  },
  filename: (req, file, cb) => {
    // console.log(file.originalname);

    // cb(null, `${file.originalname}`);
    cb(null, `1.jpg`);
  },
});

const upload = multer({ storage: storage });

router.use((req, res, next) => {
  console.log(Date());
  next();
});

router.get("/get", async (req, res) => {
  const result = await prisma.reciept.findMany();
  res.json(result);
});

router.post("/create", upload.single("image"), async (req, res) => {
  const { code } = req.body;
  const result = await prisma.reciept.create({
    data: {
      code: code,
      image_path: code,
    },
  });

  res.json(result);
});

router.delete("/delete/:id", async (req, res) => {
  const result = await prisma.reciept.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  res.json(result);
});

module.exports = router;
