const Wine = require("../models/Wine.model");
const router = require("express").Router();

// POST /api/new-wine
router.post("/new-wine", async (req, res, next) => {
  const { name, price, image, desc, vintage, winery, country } = req.body;

  try {
    const newWine = await Wine.create({
      name,
      price,
      image,
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
});

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
router.patch("/wines/:id", async (req, res, next) => {
  const { name, price, image, desc, vintage, winery, country } = req.body;
  console.log(req.body);
  console.log(req.params);
  try {
    const updatedWine = await Wine.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        image,
        desc,
        vintage,
        winery,
        country,
      },
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
});
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

// user

router.post("/new-user", (req, res, next) => {
  const { id } = req.body;
  console.log(req.body);
});
module.exports = router;
