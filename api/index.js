let paymentData = {
  upi: "demo@okaxis",
  amount: "500"
};

const ADMIN_PASS = "5566"; // Change later to stronger password

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    if (body.pass !== ADMIN_PASS) {
      return res.status(403).json({ error: "Wrong password" });
    }
    if (body.upi && body.amount) {
      paymentData = { upi: body.upi, amount: body.amount };
      return res.json({ success: true });
    }
  }

  const overrideAmount = req.query.amount;
  const finalAmount = overrideAmount || paymentData.amount;

  res.status(200).json({
    upi: paymentData.upi,
    amount: finalAmount
  });
}
