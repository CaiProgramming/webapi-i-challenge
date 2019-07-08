//REQUIRED LIBRARIES AND ASSETS
const express = require("express");
const router = express.Router();
const data = require("../data/db");
//EXPRESS JSON TO PARSE DATA
router.use(express.json());
//ROUTES
router.get("/", (req, res) => {
  data
    .find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json('error: "The users information could not be retrieved."');
    });
});
router.get("/:id", (req, res) => {
  data
    .findById(req.params.id)
    .then(data => {
      if (data) {
        return res.status(200).json(data);
      } else {
        return res
          .status(404)
          .json("Sorry we lost track of that dude to get him");
      }
    })
    .catch(error => {
      res
        .status(500)
        .json('error: "The users information could not be retrieved."');
    });
});
router.post("/", (req, res) => {
  if (!req.body.user.name) return res.status(400).json("bro you need a name");
  if (!req.body.user.bio)
    return res.status(400).json("bro you need a bio come on");
  data
    .insert(req.body.user)
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
});
router.put("/:id", (req, res) => {
  data
    .update(req.params.id, req.body.user)
    .then(data => {
      if (data) {
        return res.status(200).json(data);
      } else {
        return res
          .status(404)
          .json("Sorry we lost track of that dude to update him");
      }
    })
    .catch(error => {
      res
        .status(500)
        .json('error: "The users information could not be updated."');
    });
});
router.delete("/:id", (req, res) => {
  data
    .remove(req.params.id)
    .then(data => {
      if (data) {
        return res.status(200).json(data);
      } else {
        return res
          .status(404)
          .json("Sorry we lost track of that dude to delete him");
      }
    })
    .catch(error => {
      res
        .status(500)
        .json('error: "The users information could not be deleted."');
    });
});

module.exports = router;
