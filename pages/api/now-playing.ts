import type { NextApiRequest, NextApiResponse } from 'next';
import { getNowPlaying } from 'lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await getNowPlaying();

  if (response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const song = await response.json();

  if (song.is_playing === false) {
    return res.status(200).json({ isPlaying: false });
  }

  const isPlaying = song.is_playing;
  const title = song.track_name;
  const artist = song.artists;
  const album = song.album;
  const albumUrl = song.album_url;
  const albumImageUrl = song.album_image_url;
  const songUrl = song.track_url;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30',
  );

  return res.status(200).json({
    album,
    albumUrl,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  });
}
