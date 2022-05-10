import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { TopTracks } from 'lib/types';
import Track from 'components/Track';

export default function Tracks({ _data }) {
  const { data } = useSWR<TopTracks>('/api/top-tracks', fetcher);

  if (!data && !_data) {
    return null;
  }

  return (
    <>
      {(data ?? _data).tracks.map((track, index) => (
        <Track ranking={index + 1} key={track.songUrl} {...track} />
      ))}
    </>
  );
}
