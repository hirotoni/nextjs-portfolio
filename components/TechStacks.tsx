import React from "react";
import Heading2 from "./Heading2";
import { THEME } from "./theme";

const STACKS = {
  Languages: ["Python", "Go", "Java", "Javascript(Typescript)"],
  Databases: ["MySQL", "Postgres", "MongoDB"],
  Frontend: ["React / Nextjs"],
  MobileApplication: ["React Native"],
  DataProcessing: ["Pandas"],
  GIS: ["QGIS", "Geopandas"],
};

type Props = {};

const TechStacks = (props: Props) => {
  return (
    <div>
      <Heading2 id="techstacks" headingTitle="Tech Stacks" />
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(STACKS).map((item, i) => (
          <div key={`techstacks-${i}`} className="p-2">
            <text className={`${THEME.bg.dark} p-1 rounded-sm`}>{item[0]}</text>
            <ul className="list-disc list-inside break-all">
              {item[1].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStacks;
