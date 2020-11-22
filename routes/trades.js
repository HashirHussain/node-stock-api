const express = require("express");
const router = express.Router();

var DBDATA = [];

router.get("/", function (req, res, next) {
  let alldata = DBDATA;
  if (req.query) {
    if (req.query.type) {
      alldata = alldata.filter((item) => item.type == req.query.type);
    }
    if (req.query.user_id) {
      alldata = alldata.filter((item) => item.user_id == req.query.user_id);
    }
  }
  res.json(alldata);
});

router.use("/:id", function (req, res, next) {
  if (req.method === "GET") {
    const id = parseInt(req.params.id, 10);
    const data = DBDATA.find((item) => {
      return item.id === id;
    });
    res.json(data);
  } else {
    res.status(405);
    res.json({ error: "Method: " + req.method + " Not permitted" });
  }
});

router.post("/", function (req, res, next) {
  const data = req.body;
  if (data.shares < 1 || data.shares > 100) {
    res.status(400);
    res.json({ error: "invalid shares values" });
  } else if (data.type != "buy" && data.type != "sell") {
    res.status(400);
    res.json({ error: "invalid type values" });
  } else {
    const id = DBDATA.length + 1;
    const newRecord = {
      id: id,
      type: data.type,
      user_id: data.user_id,
      symbol: data.symbol,
      shares: data.shares,
      price: data.price,
      timestamp: data.timestamp,
    };
    DBDATA.push(newRecord);

    res.status(201);
    res.json(newRecord);
  }
});

module.exports = router;
