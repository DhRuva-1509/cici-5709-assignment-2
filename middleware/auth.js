const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const bearer = req.headers['authorization'];
  if (!bearer) return res.status(401).json({ message: 'Unauthorized. Token missing.' });

  const token = bearer.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};
