// Vercel auto-runs this as /api/payment (GET/POST)
let paymentData = { upi: 'yourupi@okaxis', amount: '500' }; // Initial values
let utrs = []; // Simple array for UTR proofs (in real: use free DB)
const ADMIN_PASS = '5566'; // Match admin.html

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { upi, amount, pass, utr } = req.body;
    if (pass !== ADMIN_PASS) return res.status(403).json({ error: 'Unauthorized' });
    
    if (utr) {
      // Store UTR proof
      utrs.push({ utr, amount, timestamp: new Date().toISOString() });
      return res.json({ success: true, message: 'UTR saved' });
    }
    
    // Update payment details
    paymentData = { upi, amount };
    return res.json({ success: true });
  }
  
  // GET: Return current data (or all UTRs if ?utrs=true)
  if (req.url.includes('utrs=true')) {
    return res.json(utrs);
  }
  
  // Support ?amount=override for invoices
  const url = new URL(req.url, `http://${req.headers.host}`);
  const overrideAmount = url.searchParams.get('amount') || paymentData.amount;
  
  res.json({ ...paymentData, amount: overrideAmount });
}
