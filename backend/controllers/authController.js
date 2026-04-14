const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name: name || email.split('@')[0], email, password: hashedPassword });
    await user.save();

    const token = createToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fallback demo login for deployments where MongoDB is temporarily unavailable.
    const demoEmail = process.env.DEMO_EMAIL;
    const demoPassword = process.env.DEMO_PASSWORD;
    const demoName = process.env.DEMO_NAME || 'Demo User';
    if (demoEmail && demoPassword && email === demoEmail && password === demoPassword) {
      const token = createToken(`demo-${demoEmail}`);
      return res.json({
        token,
        user: { id: `demo-${demoEmail}`, name: demoName, email: demoEmail }
      });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = createToken(user._id);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = { register, login };