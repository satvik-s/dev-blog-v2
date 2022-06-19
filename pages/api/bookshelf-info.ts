import { getBookshelfInfo } from 'lib/bookshelf';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await getBookshelfInfo();

  if (response.status > 400) {
    return res.status(200).json({ readingNow: [], haveRead: [] });
  }

  const data = await response.json();
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200',
  );

  return res.status(200).json(data);
}
