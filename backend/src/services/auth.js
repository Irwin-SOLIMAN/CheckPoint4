const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Options de hachage
const hasingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    // Extraction du mot de passe de la requête
    const { password } = req.body;
    // Hachage du mot de passe avec les options spécifiées

    const hashedPassword = await argon2.hash(password, hasingOptions);
    // Remplacement du mot de passe non haché par le mot de passe haché dans la requête

    req.body.hashedPassword = hashedPassword;
    // Suppression du mot de passe non haché de la requête par mesure de sécurité
    delete req.body.password;

    next();
  } catch (error) {
    next(error);
  }
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET);
    next();
  } catch (error) {
    console.error(error);

    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyToken,
};
