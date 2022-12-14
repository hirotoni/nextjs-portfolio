import Link from "next/link";
import React from "react";
import { PostKey } from "../../lib/posts";
import Date from "../Date";

type Props = { postKey: PostKey };

const BlogEntryCard = ({ postKey }: Props) => {
  return (
    <div className="rounded-lg shadow-md mb-2 border border-slate-100">
      <div className="p-4">
        <Link href={`/posts/${postKey.date}/${postKey.key}`}>
          <a>{postKey.title}</a>
        </Link>
        <br />
        <div className="flex flex-wrap space-x-2 my-2">
          {postKey.tags?.map((tag) => (
            <text
              key={tag}
              className="bg-slate-200 py-0 px-1 mb-2 rounded-md shadow-xs border border-slate-300 text-sm"
            >
              {tag}
            </text>
          ))}
        </div>
        <div className="text-gray-500 text-sm">
          <Date dateString={postKey.date} />
        </div>
      </div>
    </div>
  );
};

export default BlogEntryCard;
