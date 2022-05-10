import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { TopTracks } from 'lib/types';
import Track from 'components/Track';
import { getTopTracks } from 'lib/spotify';

export default function Tracks({ _data = undefined }) {
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

export async function getStaticProps() {
  const res = await getTopTracks();
  const items = await res.json();

  const tracks = items.map((item) => ({
    artist: item.artists,
    songUrl: item.track_url,
    title: item.track_name,
  }));

  return {
    props: {
      tracks,
    },
  };
}
