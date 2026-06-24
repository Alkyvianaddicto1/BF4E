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

    const hash = crypto.createHash('sha256').update(encoded_data).digest('hex').substring(0, 8);
    const safe_creator = creator_name.replace(/[^a-zA-Z0-9]/g, '') || 'Quiz';

    await kv.set(`link:${hash}`, { data: encoded_data });

    return res.status(200).json({ short_path: `/${safe_creator}/${hash}` });
    
  } catch (err: unknown) {
    // Cast error to handle it properly and avoid "unused variable" linting
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error("Redis Error:", message);
    return res.status(500).json({ error: 'Failed to save quiz data' });
  }
}