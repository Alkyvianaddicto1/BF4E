import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Define the shape of the data stored in Redis
interface QuizData {
  data: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { hash } = req.query;

  if (!hash || typeof hash !== 'string') {
    return res.status(400).send('Invalid link format');
  }

  try {
    // Explicitly typed return value
    const quizEntry = await kv.get<QuizData>(`link:${hash}`);

    if (!quizEntry) {
      return res.status(404).send('Quiz link not found or expired!');
    }

    res.redirect(`/?quiz=${quizEntry.data}`);
    
  } catch (error) {
    console.error("Redis Error:", error);
    return res.status(500).send('Failed to fetch quiz data');
  }
}