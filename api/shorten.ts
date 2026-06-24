import { kv } from '@vercel/kv';
import crypto from 'crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { creator_name, encoded_data } = req.body;

    if (!encoded_data) {
      return res.status(400).json({ error: 'Missing encoded data' });
    }

    // Create a fast, deterministic 8-character hash from the base64 string
    const hash = crypto.createHash('sha256').update(encoded_data).digest('hex').substring(0, 8);
    
    // Clean up the creator's name for a pretty URL
    const safe_creator = creator_name.replace(/[^a-zA-Z0-9]/g, '') || 'Quiz';

    // Save to Vercel KV (Redis). We use the hash as the unique key.
    await kv.set(`link:${hash}`, encoded_data);

    // Return the clean, short path!
    return res.status(200).json({ short_path: `/${safe_creator}/${hash}` });
    
  } catch (error) {
    console.error("Redis Error:", error);
    return res.status(500).json({ error: 'Failed to create short link' });
  }
}