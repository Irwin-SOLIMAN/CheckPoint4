const jwt = require("jsonwebtoken");

const argon2 = require("argon2");

const tables = require("../tables");

const login = async (req, res) => {
  try {
    const user = await tables.user.getByMail(req.body.email);

    if (user === null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password
    );

    if (verified) {
      delete user.hased_password;

      const token = await jwt.sign(
        {
          sub: user.id,
        },
        process.env.APP_SECRET,
        { expiresIn: "2h" }
      );

      res.status(200).send({ token, user });
    } else {
      res.status(422).send("incorrect email or password");
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

module.exports = {
  login,
};
