export enum Form {
  Initial,
  Loading,
  Success,
  Error,
}

export type BookInfo = {
  id: string;
  link: string;
  title: string;
  authors?: string[];
  publishedDate?: string;
  pageCount?: number;
  imageLinks?: {};
  categories?: string[];
  lastUpdatedAt?: string;
  description?: string;
};

export type BookshelfInfo = {
  readingNow: BookInfo[];
  haveRead: BookInfo[];
};

export type FormState = {
  state: Form;
  message?: string;
};

export type Subscribers = {
  count: number;
};

export type Views = {
  total: number;
};

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type NowPlayingSong = {
  album: string;
  albumUrl: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type NowPlayingSongDetailed = NowPlayingSong & {
  playlist?: string;
  playlistUrl?: string;
};

export type TopTracks = {
  tracks: Song[];
};

export type YouTube = {
  subscriberCount: number;
  viewCount: number;
};

export type GitHub = {
  stars: number;
};

export type Gumroad = {
  sales: number;
};

export type Unsplash = {
  downloads: number;
  views: number;
};
