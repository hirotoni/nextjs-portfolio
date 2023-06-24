import fs from "fs";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import rehypePrism from "rehype-prism-plus";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { readdirRecursively as readDirRecursively } from "./filesystem";

const POSTS_FOLDER = "posts";
const MDX_POST_DIRECTORY = path.join(process.cwd(), POSTS_FOLDER);
const EXTENSION = ".md";

export type PostMeta = { title?: string; published?: boolean; tags?: string[] };
export type PostKey = { key: string; date: string } & PostMeta;
export type MdxPostContent = { mdxPostContent: MDXRemoteSerializeResult } & PostKey;

export function getAllTags(): string[] {
  // Get file names under /posts and get only md files
  let filenames = readDirRecursively(MDX_POST_DIRECTORY);
  filenames = filenames.filter((fileName: string) => fileName.endsWith(EXTENSION));

  const publishedPostFilenames: string[] = filenames.filter((fullPath) => {
    // Read markdown file as string
    // Use gray-matter to parse the post metadata section
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileContents);

    return data.published;
  });

  const allTags = publishedPostFilenames.map((fullPath) => {
    // Read markdown file as string
    // Use gray-matter to parse the post metadata section
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileContents);

    // Combine the data with the key
    return data.tags as string[];
  });

  return allTags.flat().map((x) => x.toLowerCase());
}

/**
 * Extract date and key from fullpath.
 * e.g.: ${postsDirectory}/2022-08-01/newpost.md
 * from above string, get {date:2022-08-02, key:newpost}
 */
function getDateAndKeyFromMdxFullPath(fullpath: string): PostKey | null {
  const pattern = new RegExp(`${EXTENSION}$`);
  const dateKey = fullpath.replace(MDX_POST_DIRECTORY + "/", "").replace(pattern, "");
  const match = dateKey.match(/(\d{4}-\d{2}-\d{2})\/(.+)/);

  if (!match) {
    return null;
  }

  const postKey: PostKey = {
    date: match[1],
    key: match[2],
  };
  return postKey;
}

// get all post keys from MDX_POST_DIRECTORY
export function getAllMdxPostKeys(): PostKey[] {
  let filenames = readDirRecursively(MDX_POST_DIRECTORY);
  filenames = filenames.filter((fileName: string) => fileName.endsWith(EXTENSION));

  const nullableArray = filenames.map((fullPath) => {
    return getDateAndKeyFromMdxFullPath(fullPath);
  });

  const filtered = nullableArray.filter((x): x is PostKey => x !== null);
  return filtered;
}

export function getSortedMdxPostsKeys(): PostKey[] {
  // Get file names under /posts and get only md files
  let filenames = readDirRecursively(MDX_POST_DIRECTORY);
  filenames = filenames.filter((fileName: string) => fileName.endsWith(EXTENSION));

  const publishedPostFilenames: string[] = filenames.filter((fullPath) => {
    // Read markdown file as string
    // Use gray-matter to parse the post metadata section
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileContents);

    return data.published;
  });

  const nullableArray = publishedPostFilenames.map((fullPath) => {
    const postKey = getDateAndKeyFromMdxFullPath(fullPath);
    if (postKey === null) {
      return null;
    }

    // Read markdown file as string
    // Use gray-matter to parse the post metadata section
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    // Combine the data with the key
    return {
      ...postKey,
      ...(data as PostMeta),
    } as PostKey;
  });

  // filter out null
  const filtered = nullableArray.filter((x): x is PostKey => x !== null);

  // Sort posts by date
  const sorted = filtered.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
  return sorted;
}

export async function getMdxPostContent(postKey: PostKey): Promise<MdxPostContent> {
  const fullPath = path.join(MDX_POST_DIRECTORY, `${postKey.date}`, `${postKey.key}${EXTENSION}`);
  const rawCode = fs.readFileSync(fullPath, "utf8");

  // =======================================================================
  // Implementation using next-mdx-remote
  // References:
  // https://github.com/hashicorp/next-mdx-remote
  // https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote
  // =======================================================================

  const { content, data: metadata } = matter(rawCode);

  const mdxPostContent = await serialize(content, {
    // made available to the arguments of any custom mdx component
    scope: {},
    // MDX's available options, see the MDX docs for more info.
    // https://mdxjs.com/packages/mdx/#compilefile-options
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypeSanitize,
          {
            ...defaultSchema,
            attributes: {
              ...defaultSchema.attributes,
              code: [
                ...(defaultSchema.attributes?.code || []),
                // List of all allowed languages:
                [
                  "className",
                  "language-javascript",
                  "language-python",
                  "language-csharp",
                  "language-html",
                  "language-css",
                  "language-xml",
                  "language-django",
                  "language-jsx",
                  "language-tsx",
                  "language-markdown",
                  "language-md",
                ],
              ],
            },
          },
        ],
        rehypePrism,
        rehypeSlug,
      ],
      format: "mdx",
    },
    // Indicates whether or not to parse the frontmatter from the mdx source
    parseFrontmatter: false,
  });

  return {
    mdxPostContent,
    ...postKey,
    ...metadata,
  };
}
