import React from "react";

type Heading2Props = {
  id?: string;
  headingTitle: string;
};

const Heading2 = (props: Heading2Props) => {
  return (
    <div id={props.id} className="mt-6 mb-1">
      <h2 className="text-2xl">{props.headingTitle}</h2>
      <hr />
    </div>
  );
};

export default Heading2;
