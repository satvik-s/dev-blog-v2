import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { BookshelfInfo } from 'lib/types';
import Book from './Book';

export default function Bookshelf({ _data }) {
  const { data } = useSWR<BookshelfInfo>('/api/bookshelf-info', fetcher);

  if (!data && !_data) {
    return null;
  }

  return (
    <>
      <h3 className="font-bold text-xl tracking-tight mb-2 mt-4 text-black dark:text-white">
        Currently Reading
      </h3>
      {(data ?? _data).readingNow.map((book, index) => (
        <Book ranking={index + 1} key={book.id} {...book} />
      ))}
      <h3 className="font-bold text-xl tracking-tight mb-2 mt-4 text-black dark:text-white">
        Recently Finished
      </h3>
      {(data ?? _data).haveRead.map((book, index) => (
        <Book ranking={index + 1} key={book.id} {...book} />
      ))}
    </>
  );
}
