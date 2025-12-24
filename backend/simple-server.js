import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      userId: 1,
      email: email,
      token: 'sample-token-123'
    }
  });
});

app.get('/api/orders', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        user_id: 1,
        total_amount: 5999.99,
        status: 'pending'
      }
    ]
  });
});

app.post('/api/orders', (req, res) => {
  res.json({
    success: true,
    message: 'Order created',
    data: {
      orderId: 1,
      totalAmount: req.body.total_amount
    }
  });
});

app.listen(5000, () => {
  console.log('Simple server running on port 5000');
});
