import Link from "next/link";
import React from "react";
import { PostKey } from "../../lib/posts";
import Date from "../Date";

type Props = { postKey: PostKey };

const Card = ({ postKey }: Props) => {
  return (
    <div className="rounded-lg shadow-lg">
      <div className="p-4">
        <Link href={`/posts/${postKey.date}/${postKey.key}`}>
          <a>{postKey.title}</a>
        </Link>
        <br />
        <div className="text-gray-500 text-sm">
          <Date dateString={postKey.date} />
        </div>
      </div>
    </div>
  );
};

export default Card;
