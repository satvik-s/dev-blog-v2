const BOOKSHELF_INFO_ENDPOINT =
  'https://jb2h6gutiqmt75wn2ih6r2llme0uuvja.lambda-url.us-west-2.on.aws';

export const getBookshelfInfo = async () => {
  return await fetch(BOOKSHELF_INFO_ENDPOINT);
};
