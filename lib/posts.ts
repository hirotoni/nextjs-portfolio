import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { readdirRecursively } from "./filesystem";

const postsDirectory = path.join(process.cwd(), "posts");

export type PostMeta = { title?: string };
export type PostKey = { key: string; date: string } & PostMeta;
export type PostContent = { contentHtml: string } & PostKey;

/**
 * Extract date and key from fullpath.
 * e.g.: ${postsDirectory}/2022-08-01/newpost.md
 * from above string, get date:2022-08-02, key:newpost
 */
function getDateAndKeyFromFullPath(fullpath: string) {
  const dateKey = fullpath.replace(postsDirectory + "/", "").replace(/\.md$/, "");
  const match = dateKey.match(/(\d{4}-\d{2}-\d{2})\/(.+)/);
  const date = match ? match[1] : null;
  const key = match ? match[2] : null;

  return { date, key };
}

export function getAllPostKeys(): { params: PostKey }[] {
  let filenames = readdirRecursively(postsDirectory);
  filenames = filenames.filter((fileName: string) => fileName.endsWith(".md"));
  return filenames.map((fullPath) => {
    const { date, key } = getDateAndKeyFromFullPath(fullPath);
    return {
      params: { date, key },
    };
  });
}

export function getSortedPostsKeys(): PostKey[] {
  // Get file names under /posts and get only md files
  let filenames = readdirRecursively(postsDirectory);
  filenames = filenames.filter((fileName: string) => fileName.endsWith(".md"));

  const allPostsData: PostKey[] = filenames.map((fullPath) => {
    const { date, key } = getDateAndKeyFromFullPath(fullPath);

    // Read markdown file as string
    // Use gray-matter to parse the post metadata section
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    // Combine the data with the key
    return {
      key,
      date,
      ...(matterResult.data as PostMeta),
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export async function getPostContent(postData: PostKey): Promise<PostContent> {
  const fullPath = path.join(postsDirectory, `${postData.date}`, `${postData.key}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        code: [
          ...(defaultSchema.attributes.code || []),
          // List of all allowed languages:
          ["className", "language-js", "language-python", "language-csharp", "language-html", "language-css"],
        ],
      },
    })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    contentHtml,
    ...postData,
    ...(matterResult.data as PostMeta),
  };
}
