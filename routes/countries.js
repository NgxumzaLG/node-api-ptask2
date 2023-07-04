const express = require("express");
const router = express.Router();
const countriesController = require("../controllers/countries");

router.get("/", async (req, res) => {
  try {
    const { success, data, error } = await countriesController.getAllCountries();

    if (success) res.status(200).json(data.Items);
    else res.status(404).json({ status: "Not Found", error });
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id.toUpperCase();
  try {
    const { data } = await countriesController.getById(id);
    if (!!data.Item) res.status(200).json(data.Item);
    else res.status(404).json({ id, status: "Not Found" });
  } catch (error) {
    throw error;
  }
});

router.post("/:id", async (req, res) => {
  const id = req.params.id.toUpperCase();
  const info = req.body;

  try {
    if (!!info.country_name) {
      const { data } = await countriesController.getById(id);

      if (!!data.Item) {
        res.status(400).json({ id, status: "Already exists" });
      } else {
        await countriesController.createOrUpdate({ id, data: info });
        res.status(201).json({ id, status: "Country successfully added" });
      }
    } else res.status(404).json({ status: "country_name is Undefined" });
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id.toUpperCase();
  const info = req.body;
  try {
    if (!!info.country_name) {
      const { data } = await countriesController.getById(id);

      if (!!data.Item) {
        await countriesController.createOrUpdate({ id, data: info });
        res.status(201).json({ id, status: "Country successfully updated" });
      } else res.status(404).json({ id, status: "Not Found" });
    } else res.status(404).json({ status: "country_name is Undefined" });
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id.toUpperCase();
  try {
    const { data } = await countriesController.getById(id);

    if (!!data.Item) {
      await countriesController.deleteCountry(id);
      res.status(204).json();
    } else {
      res.status(404).json({ id, status: "Not Found" });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
