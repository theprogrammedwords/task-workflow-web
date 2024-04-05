import React from "react";
import EditMessage from "./EditMessage";
import styled from "styled-components";

const SideBarWrapper = styled.div`
  border: 1px solid gray;
  height: calc(100vh - 64px);
  width: 200px;
`;
export default ({ isSelected, textRef, nodeName, setNodeName }) => {
  const onDragStart = (event, nodeType, content) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("content", content);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <SideBarWrapper>
      {isSelected ? (
        <EditMessage
          textRef={textRef}
          nodeName={nodeName}
          setNodeName={setNodeName}
        />
      ) : (
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "node", "message")}
          draggable
        ></div>
      )}
    </SideBarWrapper>
  );
};
