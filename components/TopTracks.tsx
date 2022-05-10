import Track from 'components/Track';
import { getTopTracks } from 'lib/spotify';

export default function Tracks({ data }) {
  if (!data) {
    return null;
  }

  return (
    <>
      {data.tracks.map((track, index) => (
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
