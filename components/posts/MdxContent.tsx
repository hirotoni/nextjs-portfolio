import { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { A, Blockquote, Code, H1, H2, H3, Hr, Img, Main, Ol, P, Pre, Table, Ul } from "./MdxPostComponents";

const components: MDXComponents = {
  main: Main,
  h1: H1,
  h2: H2,
  h3: H3,
  ol: Ol,
  ul: Ul,
  a: A,
  p: P,
  pre: Pre,
  code: Code,
  table: Table,
  blockquote: Blockquote,
  img: Img,
  hr: Hr,
};

function MdxContent({ source }) {
  return (
    <MDXRemote
      source={source}
      options={{
        scope: {},
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
        parseFrontmatter: false,
      }}
      components={components}
    />
  );
}

export default MdxContent;
