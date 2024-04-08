import styled from "styled-components";
import { useState } from "react";
import { OptionWrapper } from "../../CustomNode/MessageNode";
import { nodes } from "../../../initial-elements";
import { checkValuesNotNull } from "../../../utils";
export const EditMessageWrapper = styled.div`
  background-color: #51424e;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  position: absolute;
  top: 60px;
  left: 46%;
  width: fit-content;
  textarea {
    width: 120%;
  }

  label,
  span {
    color: white;
    margin: 4px 0 4px 0;
  }

  button {
    padding: 4px;
    margin-top: 8px;
  }
`;
export default function CreateTask({
  textRef,
  nodeName,
  setNodeName,
  setNodes,
  setEdges,
  setShowTaskCreator,
}) {
  const initialData = [
    {
      id: "0",
      type: "node",
      data: {
        heading: "",
        name: "",
        label: "",
        parameterArray: [
          {
            type: "textarea",
            label: "",
            value: null,
          },
          {
            type: "checkbox",
            label: "",
            value: false,
          },
          {
            type: "select",
            label: "",
            value: null,
          },
        ],
      },
      position: { x: 50, y: 200 },
    },
  ];

  let loadedData = JSON.parse(localStorage.getItem("nodesData"));
  loadedData?.push(initialData[0]);
  const activeIndex = loadedData ? loadedData?.length - 1 : 0;

  const [nodesData, setNodesData] = useState(
    JSON.parse(localStorage.getItem("nodesData")) ? loadedData : initialData
  );

  const handleOnNodeDataChange = (e, type) => {
    let updatedData = [...nodesData];

    updatedData[activeIndex].id = activeIndex + "";
    updatedData[activeIndex].position.x =
      activeIndex > 0 ? updatedData[activeIndex - 1].position?.x + 400 : 50;
    updatedData[activeIndex].position.y =
      activeIndex > 0 ? updatedData[activeIndex - 1].position?.y + 0 : 200;

    if (type === "name" || type === "heading") {
      updatedData[activeIndex].data[type] = e.target.value;
    } else {
      const dataItemIndex = updatedData[
        activeIndex
      ]?.data?.parameterArray?.findIndex((param) => param.type === type);

      if (dataItemIndex !== -1) {
        const updatedDataItem = {
          ...updatedData[activeIndex]?.data?.parameterArray[dataItemIndex],
        };

        if (type === "checkbox") {
          updatedDataItem.value = e.target.checked;
        } else {
          updatedDataItem.value = e.target.value;
        }

        updatedData[activeIndex].data.parameterArray[dataItemIndex] =
          updatedDataItem;
      }
    }

    setNodesData(updatedData);
  };

  const createTask = () => {
    setEdges([]);
    setShowTaskCreator(false);
    setNodes(nodesData);
    localStorage.setItem("nodesData", JSON.stringify(nodesData));
    window.location.reload();
  };

  return (
    <EditMessageWrapper className="updatenode__controls">
      <label>
        <strong>Task Editor</strong>
      </label>
      <label>
        Heading :
        <input
          style={{ marginLeft: "18px" }}
          onChange={(evt) => handleOnNodeDataChange(evt, "heading")}
          value={nodesData[activeIndex]?.heading}
        ></input>
      </label>
      <br />
      <div style={{ display: "flex", marginBottom: "4px" }}>
        <span style={{ marginRight: "6px" }}>Task name:</span>
        <input
          ref={textRef}
          value={nodesData[activeIndex]?.name}
          onChange={(evt) => handleOnNodeDataChange(evt, "name")}
        />
      </div>

      {nodesData[activeIndex]?.data?.parameterArray?.map((item, index) => {
        return (
          <OptionWrapper>
            {item.type === "textarea" && (
              <div>
                <div style={{ color: "white" }}>Task Description : </div>
                <textarea
                  className="textarea"
                  value={item?.value}
                  onChange={(evt) => handleOnNodeDataChange(evt, item.type)}
                />
              </div>
            )}
            {item.type === "checkbox" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
                className="checkbox"
              >
                <label for="task-checkbox">The task is completed ? </label>
                <input
                  type="checkbox"
                  id="task-checkbox"
                  name="task-checkbox"
                  value={true}
                  checked={item?.value}
                  onChange={(evt) => handleOnNodeDataChange(evt, item.type)}
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
                    width: "100%",
                  }}
                  for="task-checkbox"
                >
                  Task status :
                </div>
                <select
                  className="select"
                  name="cars"
                  id="cars"
                  value={!item.value}
                  onChange={(evt) => handleOnNodeDataChange(evt, item.type)}
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
      <button
        style={{ background: "#b8a6b4", border: "0px" }}
        onClick={() => createTask()}
      >
        Add node
      </button>
      <button
        style={{ background: "#b8a6b4", border: "0px" }}
        onClick={() => setShowTaskCreator(false)}
      >
        Close
      </button>
    </EditMessageWrapper>
  );
}
