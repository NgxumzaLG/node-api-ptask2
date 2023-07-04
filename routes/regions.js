const express = require("express");
const router = express.Router();
const regionsController = require("../controllers/regions");

router.get("/", async (req, res) => {
  try {
    const { success, data, error } = await regionsController.getAllRegions();

    if (success) res.status(200).json(data.Items);
    else res.status(404).json({ status: "Not Found", error });
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const { data } = await regionsController.getById(id);
    if (!!data.Item) res.status(200).json(data.Item);
    else res.status(404).json({ id, status: "Not Found" });
  } catch (error) {
    throw error;
  }
});

router.post("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const info = req.body;

  try {
    if (!!info.region_name) {
      const { data } = await regionsController.getById(id);

      if (!!data.Item) {
        res.status(400).json({ id, status: "Already exists" });
      } else {
        await regionsController.createOrUpdate({ id, data: info });
        res.status(201).json({ id, status: "Region successfully added" });
      }
    } else res.status(404).json({ status: "region_name is Undefined" });
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const info = req.body;
  try {
    if (!!info.region_name) {
      const { data } = await regionsController.getById(id);

      if (!!data.Item) {
        await regionsController.createOrUpdate({ id, data: info });
        res.status(201).json({ id, status: "Region successfully updated" });
      } else res.status(404).json({ id, status: "Not Found" });
    } else res.status(404).json({ status: "region_name is Undefined" });
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const { data } = await regionsController.getById(id);

    if (!!data.Item) {
      await regionsController.deleteRegion(id);
      res.status(204).json();
    } else {
      res.status(404).json({ id, status: "Not Found" });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
