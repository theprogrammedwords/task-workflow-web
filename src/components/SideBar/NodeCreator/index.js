import styled from "styled-components";
import { useState } from "react";
import { OptionWrapper } from "../../CustomNode/MessageNode";
import { nodes } from "../../../initial-elements";
const EditMessageWrapper = styled.div`
  background-color: #51424e;
  padding: 12px;
  border-radius: 8px;
  position: absolute;
  top: 60px;
  left: 46%;
  width: fit-content;
  textarea {
    border-radius: 8px;
  }

  label,
  span {
    color: white;
    margin: 4px 0 4px 0;
  }
`;
export default function CreateTask({ textRef, nodeName, setNodeName }) {
  const initialData = {
    id: "0",
    type: "node",
    data: {
      heading: "",
      name: "",
      parameterArray: [
        {
          type: "textarea",
          value: "",
        },
        {
          type: "checkbox",
          value: "",
        },
        {
          type: "select",
          value: "",
        },
      ],
    },
    position: { x: 50, y: 200 },
  };
  const [nodesData, setNodesData] = useState(initialData);

  const handleOnNodeDataChange = (e, type) => {
    if (type === "name") {
      let data = nodeName;
      data[type] = e.target.value;
      setNodeName(data);
    }
  };
  return (
    <EditMessageWrapper className="updatenode__controls">
      <label>
        <strong>Task Editor : {nodesData?.heading}</strong>
      </label>
      <br />
      <div style={{ display: "flex", marginBottom: "4px" }}>
        <span style={{ marginRight: "8px" }}>Task name</span>
        <input
          ref={textRef}
          value={nodesData?.name}
          onChange={(evt) => handleOnNodeDataChange(evt, "name")}
        />
      </div>

      {nodesData?.parameterArray?.map((item, index) => {
        return (
          <OptionWrapper>
            {item.type === "textarea" && (
              <div>
                <div style={{ color: "white" }}>Task Description : </div>
                <textarea className="textarea" value={item?.value} />
              </div>
            )}
            {item.type === "checkbox" && (
              <div style={{ display: "flex" }} className="checkbox">
                <label for="task-checkbox">The task is completed ? </label>
                <input
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
                  style={{
                    lineHeight: "2.5",
                    marginRight: "4px",
                    color: "white",
                  }}
                  for="task-checkbox"
                >
                  Task status :
                </div>
                <select
                  className="select"
                  name="cars"
                  id="cars"
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
    </EditMessageWrapper>
  );
}
