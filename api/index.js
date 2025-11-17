let paymentData = {
  upi: "demo@okaxis",
  amount: "500"
};

const ADMIN_PASS = "5566"; // Change to strong password later

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { upi, amount, pass } = req.body || {};
    if (pass !== ADMIN_PASS) return res.status(403).json({ error: "Wrong" });
    if (upi && amount) {
      paymentData = { upi, amount };
      return res.json({ success: true });
    }
  }

  const finalAmount = req.query.amount || paymentData.amount;
  res.json({ upi: paymentData.upi, amount: finalAmount });
}
