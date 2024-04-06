import React, { memo } from "react";

import { Handle, Position } from "reactflow";
import { style } from "./MessageNodeStyles";
import styled from "styled-components";

const OptionWrapper = styled.div`
  display: flex;

  .textarea,
  .checkbox,
  .select {
    margin: 8px 0 8px 0;
  }
`;
const Node = ({ data, selected }) => {
  let customTitle = { ...style.title };
  customTitle.backgroundColor = "#b8a6b4";

  return (
    <>
      <div>
        <div style={{ ...style.body, ...(selected ? style.selected : []) }}>
          <div style={customTitle}> {data.heading}</div>
          <div style={{ padding: "8px 20px" }}>
            <div style={style.contentWrapper}>Task Name : {data.name}</div>
            {data?.parameterArray?.map((item, index) => {
              return (
                <OptionWrapper>
                  {item.type === "textarea" && (
                    <div>
                      <div>Task Description : </div>
                      <textarea
                        disabled
                        className="textarea"
                        value={item?.value}
                      />
                    </div>
                  )}
                  {item.type === "checkbox" && (
                    <div className="checkbox">
                      <label for="task-checkbox">
                        The task is completed ?{" "}
                      </label>
                      <input
                        disabled
                        type="checkbox"
                        id="task-checkbox"
                        name="task-checkbox"
                        value="TaskCompleted"
                        checked={item?.value}
                      />
                    </div>
                  )}
                  {item.type === "select" && (
                    <>
                      <div
                        style={{ lineHeight: "2.5", marginRight: "4px" }}
                        for="task-checkbox"
                      >
                        Task status :
                      </div>
                      <select
                        className="select"
                        name="cars"
                        id="cars"
                        disabled
                        value={item.value}
                      >
                        <option value="start">Started</option>
                        <option value="in-progress">In-progress</option>
                        <option value="blocked">Blocked</option>
                        <option value="done">Done</option>
                      </select>
                    </>
                  )}
                </OptionWrapper>
              );
            })}
          </div>
        </div>
        <Handle type="source" position={Position.Right} id="b" />
        <Handle type="target" position={Position.Left} id="a" />
      </div>
    </>
  );
};

export default memo(Node);
