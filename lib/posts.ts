import rehypePrism from "@mapbox/rehype-prism";
import { compile } from "@mdx-js/mdx";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { readdirRecursively } from "./filesystem";

const mdxpostsDirectory = path.join(process.cwd(), "mdxposts");

export type PostMeta = { title?: string };
export type PostKey = { key: string; date: string } & PostMeta;
export type MdxPostContent = { compiledCode: string } & PostKey;

/**
 * Extract date and key from fullpath.
 * e.g.: ${postsDirectory}/2022-08-01/newpost.md
 * from above string, get date:2022-08-02, key:newpost
 */
function getDateAndKeyFromMdxFullPath(fullpath: string) {
  const dateKey = fullpath.replace(mdxpostsDirectory + "/", "").replace(/\.md$/, "");
  const match = dateKey.match(/(\d{4}-\d{2}-\d{2})\/(.+)/);
  const date = match ? match[1] : null;
  const key = match ? match[2] : null;

  return { date, key };
}

export function getAllMdxPostKeys(): { params: PostKey }[] {
  let filenames = readdirRecursively(mdxpostsDirectory);
  filenames = filenames.filter((fileName: string) => fileName.endsWith(".md"));
  return filenames.map((fullPath) => {
    const { date, key } = getDateAndKeyFromMdxFullPath(fullPath);
    return {
      params: { date, key },
    };
  });
}

export function getSortedMdxPostsKeys(): PostKey[] {
  // Get file names under /posts and get only md files
  let filenames = readdirRecursively(mdxpostsDirectory);
  filenames = filenames.filter((fileName: string) => fileName.endsWith(".md"));

  const allPostsData: PostKey[] = filenames.map((fullPath) => {
    const { date, key } = getDateAndKeyFromMdxFullPath(fullPath);

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

export async function getMdxPostContent(postKey: PostKey): Promise<MdxPostContent> {
  const fullPath = path.join(mdxpostsDirectory, `${postKey.date}`, `${postKey.key}.md`);
  const rawCode = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(rawCode);

  const compiledCode = String(
    // DANGER: this mdx->jsx compiled code will possively be run on client side.
    // In case of injection attack, rehypeSanitize plugin is applied on server side.
    await compile(matterResult.content, {
      providerImportSource: "@mdx-js/react",
      outputFormat: "function-body",
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypeSanitize,
          {
            ...defaultSchema,
            attributes: {
              ...defaultSchema.attributes,
              code: [
                ...(defaultSchema.attributes.code || []),
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
                ],
              ],
            },
          },
        ],
        rehypePrism,
        rehypeSlug,
      ],
    })
  );

  return {
    compiledCode,
    ...postKey,
    ...(matterResult.data as PostMeta),
  };
}
