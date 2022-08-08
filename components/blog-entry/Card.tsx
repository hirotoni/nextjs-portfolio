import Link from "next/link";
import React from "react";
import { PostData } from "../../lib/posts";
import Date from "../Date";

type Props = { postData: PostData };

const Card = (props: Props) => {
  return (
    <div className="rounded-lg shadow-lg">
      <div className="p-4">
        <Link href={`/posts/${props.postData.id}`}>
          <a>{props.postData.title}</a>
        </Link>
        <br />
        <div className="text-gray-500 text-sm">
          <Date dateString={props.postData.date} />
        </div>
      </div>
    </div>
  );
};

export default Card;
