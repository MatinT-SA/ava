import React from "react";
import ArchiveItem from "./ArchiveItem";

const ArchiveList = ({ archives }) => {
  return (
    <div>
      {archives.map((item) => (
        <ArchiveItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ArchiveList;
