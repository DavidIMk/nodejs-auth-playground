import bcrypt from 'bcrypt';
import User from '../models/User.js';

export async function basicAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const [scheme, creds] = auth.split(' ');
  if (scheme !== 'Basic' || !creds) {
    return res
      .status(401)
      .set('WWW-Authenticate', 'Basic')
      .json({ error: 'Missing credentials' });
  }

  const [username, password] = Buffer.from(creds, 'base64')
    .toString()
    .split(':');

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  req.userId = user.id;
  next();
}