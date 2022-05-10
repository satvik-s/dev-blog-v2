import Container from 'components/Container';
import CurrentPlayingDetailed from 'components/CurrentPlayingDetailed';
import TopTracks from 'components/TopTracks';
import { getTopTracks } from 'lib/spotify';

export default function Dashboard({ data }) {
  return (
    <Container
      title="Dashboard – Satvik Shukla"
      description="My personal dashboard, built with Next.js API routes deployed as serverless functions and some static rendering."
    >
      <div className="flex flex-col justify-center items-start max-w-2xl w-full mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Dashboard
        </h1>
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is my personal dashboard, built with Next.js API routes
            deployed as serverless functions and some static rendering.
          </p>
        </div>
        <CurrentPlayingDetailed />
        <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
          Top Tracks
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Curious what I'm currently listening to? Here's my top tracks on
          Spotify from the past month
        </p>
        <TopTracks _data={data} />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const response = await getTopTracks();

  const items = await response.json();

  const tracks = items.map((item) => ({
    artist: item.artists,
    songUrl: item.track_url,
    title: item.track_name,
  }));

  return {
    props: {
      data: {
        tracks,
      },
    },
  };
}
