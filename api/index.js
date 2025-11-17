let paymentData = {
  upi: "demo@okaxis",
  amount: "500"
};

const ADMIN_PASS = "5566"; // Change this to your strong password

export default function handler(req, res) {
  // Allow requests from anywhere
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  if (req.method === 'POST') {
    const { upi, amount, pass, utr } = req.body || {};

    if (pass !== ADMIN_PASS) {
      return res.status(403).json({ error: "Wrong password" });
    }

    if (upi && amount) {
      paymentData = { upi, amount };
      return res.json({ success: true });
    }
  }

  // GET request
  const override = req.query.amount;
  const finalAmount = override || paymentData.amount;

  res.status(200).json({
    upi: paymentData.upi,
    amount: finalAmount
  });
}
