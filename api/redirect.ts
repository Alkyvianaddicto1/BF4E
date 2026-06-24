import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { hash } = req.query;

  if (!hash || typeof hash !== 'string') {
    return res.status(400).send('Invalid link format');
  }

  try {
    // Fetch the massive base64 string back from Redis
    const encoded_data = await kv.get(`link:${hash}`);

    if (!encoded_data) {
      return res.status(404).send('Quiz link not found or expired!');
    }

    // Immediately redirect the browser to the React app with the data attached!
    res.redirect(`/?quiz=${encoded_data}`);
    
  } catch (error) {
    console.error("Redis Error:", error);
    return res.status(500).send('Failed to fetch quiz data');
  }
}