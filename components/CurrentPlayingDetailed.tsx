import fetcher from 'lib/fetcher';
import { NowPlayingSong, NowPlayingSongDetailed } from 'lib/types';
import useSWR from 'swr';
import CurrentTrack from './CurrentTrack';

export default function Tracks() {
  const { data: lessDetailedData } = useSWR<NowPlayingSong>(
    '/api/now-playing',
    fetcher,
  );
  const { data: detailedData } = useSWR<NowPlayingSongDetailed>(
    '/api/now-playing-detailed',
    fetcher,
  );

  const data = detailedData ?? lessDetailedData;

  if (!data || data.isPlaying === false) {
    return null;
  }

  return (
    <>
      <h2 className="font-bold text-3xl tracking-tight mb-6 mt-12 text-black dark:text-white">
        Currently Playing
      </h2>
      <CurrentTrack {...data} />
    </>
  );
}
