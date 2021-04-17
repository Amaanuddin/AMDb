const jwt = require("jsonwebtoken");

exports.getToken = (user) => {
  const token = jwt.sign(
    { name: user.name, email: user.email },
    "somesupersecretkey",
    {
      expiresIn: "1h",
    }
  );
  return token;
};
