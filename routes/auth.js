const express = require("express");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const config = require("config");

const { check, validationResult } = require("express-validator");

const User = require("../models/user");

const router = express.Router();

const auth = require("../middleware/auth");

// @route  GET api/auth
// @desc  GET loggedd in user
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route  POST api/auth
// @desc  auth user & grt token
// @access Public

router.post(
  "/",
  [
    check("emp_id", "Please include a valid emp_id").exists(),
    check("password", "password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { emp_id, password } = req.body;

    try {
      let user = await User.findOne({ emp_id });
      if (!user) {
        return res.status(400).json({ msg: "invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);
module.exports = router;
