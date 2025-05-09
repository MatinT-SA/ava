import React from "react";

const ArchiveItem = ({ item }) => {
  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
    </div>
  );
};

export default ArchiveItem;
