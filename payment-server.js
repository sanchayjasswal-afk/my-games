const express = require('express');
const cors = require('cors');
const { randomUUID } = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const payments = new Map();

app.post('/create-payment', (req, res) => {
  const { plan, amount } = req.body;
  if (!plan || !amount) {
    return res.status(400).json({ error: 'Missing plan or amount' });
  }

  const paymentId = randomUUID();
  const trimmedAmount = String(amount).trim();
  const paymentUrl = `upi://pay?pa=tic.tac%40oksbi&pn=Tic%20Tac%20Toe%20Pro&am=${encodeURIComponent(trimmedAmount)}&cu=INR&tn=${encodeURIComponent(`${plan} plan payment`)}`;

  payments.set(paymentId, {
    plan,
    amount: trimmedAmount,
    status: 'pending',
    createdAt: Date.now(),
    paymentUrl,
  });

  res.json({ paymentId, plan, amount: trimmedAmount, paymentUrl });
});

app.post('/verify-payment', (req, res) => {
  const { paymentId } = req.body;
  if (!paymentId) {
    return res.status(400).json({ error: 'Missing paymentId' });
  }

  const payment = payments.get(paymentId);
  if (!payment) {
    return res.status(404).json({ error: 'Payment request not found' });
  }

  res.json({ paymentId, plan: payment.plan, amount: payment.amount, paid: payment.status === 'paid', status: payment.status });
});

app.post('/simulate-paid', (req, res) => {
  const { paymentId } = req.body;
  if (!paymentId) {
    return res.status(400).json({ error: 'Missing paymentId' });
  }

  const payment = payments.get(paymentId);
  if (!payment) {
    return res.status(404).json({ error: 'Payment request not found' });
  }

  payment.status = 'paid';
  res.json({ paymentId, status: payment.status, plan: payment.plan, amount: payment.amount });
});

app.get('/payment/:paymentId', (req, res) => {
  const payment = payments.get(req.params.paymentId);
  if (!payment) {
    return res.status(404).json({ error: 'Payment request not found' });
  }

  res.json({ paymentId: req.params.paymentId, ...payment });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Payment backend listening on http://localhost:${port}`);
});
