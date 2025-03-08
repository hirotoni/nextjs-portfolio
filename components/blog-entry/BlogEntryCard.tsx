import Link from "next/link";
import React from "react";
import { PostKey } from "@/lib/posts";
import Date from "@/components/Date";
import { THEME } from "@/components/theme";

const Tags = ({ tags }) => {
  return (
    <div className="flex flex-wrap space-x-2 my-2">
      {tags.map((tag) => (
        <text
          key={tag}
          className={`${THEME.bg.dark} py-0 px-1 mb-2 rounded-md shadow-xs border border-slate-300 text-sm`}
        >
          {tag}
        </text>
      ))}
    </div>
  );
};

type Props = { postKey: PostKey };

const BlogEntryCard = ({ postKey }: Props) => {
  return (
    <div
      className={`rounded-lg shadow-md mb-2 border border-slate-100 ${THEME.bg.main} hover:${THEME.bg.hover} cursor-pointer`}
    >
      <Link href={`/posts/${postKey.date}/${postKey.key}`}>
        <div className="p-4">
          <text>{postKey.title}</text>
          <Tags tags={postKey.tags} />
          <div className="text-gray-500 text-sm">
            <Date dateString={postKey.date} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogEntryCard;
