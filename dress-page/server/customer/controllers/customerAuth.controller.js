import bcrypt from 'bcrypt';
import Customer from '../models/Customer.model.js';
import jwt from 'jsonwebtoken';

// Register new customer
export const createCustomer = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const customer = await Customer.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      mobile: req.body.mobile,
    });

    res.status(201).json({ success: true, customer });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Login customer
export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });

    if (!customer)
      return res.status(400).json({ success: false, error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch)
      return res.status(400).json({ success: false, error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: customer.id, email: customer.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    res.json({ success: true, token, customer });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
