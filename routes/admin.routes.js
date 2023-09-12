const Wine = require("../models/Wine.model");
const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");

// POST /api/new-wine
router.post(
  "/new-wine",
  fileUploader.single("image"),
  async (req, res, next) => {
    const { name, price, image, desc, vintage, winery, country } = req.body;
    try {
      const newWine = await Wine.create({
        name,
        price,
        image: req.file.path,
        desc,
        vintage,
        winery,
        country,
      });

      if (!newWine) {
        return res.status(500).json({ message: "Server error" });
      } else {
        console.log("New wine created: ", newWine);
        return res.status(201).json(newWine);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

// GET /api/wines
router.get("/wines", async (req, res, next) => {
  try {
    const wines = await Wine.find();
    if (!wines) {
      return res.status(404).json({ message: "Wines not found" });
    } else {
      return res.status(200).json(wines);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});
// GET /api/wines/:id
router.get("/wines/:id", async (req, res, next) => {
  try {
    const wine = await Wine.findById(req.params.id);
    if (!wine) {
      return res.status(404).json({ message: "Wine not found" });
    } else {
      return res.status(200).json(wine);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});
// PATCH /api/wines/:id
router.patch(
  "/wines/:id",
  fileUploader.single("image"),
  async (req, res, next) => {
    const { name, price, image, desc, vintage, winery, country } = req.body;

    const updateFields = {
      name,
      price,
      desc,
      vintage,
      winery,
      country,
    };

    if (req.file) {
      updateFields.image = req.file.path;
    }

    try {
      const updatedWine = await Wine.findByIdAndUpdate(
        req.params.id,
        updateFields,
        { new: true }
      );
      console.log("Updated Wine:", updatedWine);
      if (!updatedWine) {
        return res.status(404).json({ message: "Wine not found" });
      } else {
        return res.status(200).json({ message: "Wine updated" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);
// DELETE /api/wines/:id
router.delete("/wines/:id", async (req, res, next) => {
  try {
    const deletedWine = await Wine.findByIdAndDelete(req.params.id);
    if (!deletedWine) {
      return res.status(404).json({ message: "Wine not found" });
    } else {
      return res.status(200).json(deletedWine);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
