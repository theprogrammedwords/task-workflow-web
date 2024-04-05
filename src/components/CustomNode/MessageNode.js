import React, { memo } from "react";

import { Handle, Position } from "reactflow";
import { style } from "./MessageNodeStyles";

const Node = ({ data, selected }) => {
  let customTitle = { ...style.title };
  customTitle.backgroundColor = "#08c9bd";

  return (
    <>
      <div>
        <div style={{ ...style.body, ...(selected ? style.selected : []) }}>
          <div style={customTitle}>{data.heading}</div>
          <div style={{ padding: "8px 20px" }}>
            <div style={style.contentWrapper}>{data.name}</div>
            <div style={style.contentWrapper}>{data.parameter1}</div>
            <div style={style.contentWrapper}>{data.parameter2}</div>
            <div style={style.contentWrapper}>{data.parameter3}</div>
          </div>
        </div>
        <Handle type="source" position={Position.Right} id="b" />
        <Handle type="target" position={Position.Left} id="a" />
      </div>
    </>
  );
};

export default memo(Node);
