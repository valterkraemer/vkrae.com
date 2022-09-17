type Metadata = {
  title: string;
  author: string;
  date: string;
};

type MDFile = {
  metadata: Metadata;
};

export type Post = Metadata & {
  url: string;
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const allPostFiles: Record<string, MDFile> = import.meta.glob(
    "./*/*.{svx,md}",
    { eager: true }
  );

  const posts: Post[] = Object.entries(allPostFiles).map(
    ([path, { metadata }]) => {
      return {
        title: metadata.title,
        author: metadata.author,
        date: metadata.date,
        url: "/blog/" + path.match(/\.\/(.+)\//)![1],
      };
    }
  );

  return {
    posts,
  };
}
