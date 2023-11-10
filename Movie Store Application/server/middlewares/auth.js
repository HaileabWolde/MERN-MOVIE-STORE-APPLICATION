import jwt from 'jsonwebtoken';

const Auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Please provide a token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      return res.status(401).json({ msg: 'Token is invalid' });
    }

    req.userId = payload?.UserId;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: 'Token is malformed' });
    }

    console.log(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

export default Auth;