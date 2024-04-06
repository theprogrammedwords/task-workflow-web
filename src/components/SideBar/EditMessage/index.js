import styled from "styled-components";

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
export default function EditMessage({ textRef, nodeName, setNodeName }) {
  return (
    <EditMessageWrapper className="updatenode__controls">
      <label>
        <strong>Task Editor : {nodeName?.data?.heading}</strong>
      </label>
      <br />
      <div style={{ display: "flex", marginBottom: "4px" }}>
        <span style={{ marginRight: "8px" }}>Task name</span>
        <input
          ref={textRef}
          value={nodeName.data?.name}
          onChange={(evt) => console.log()}
        />
      </div>
      <div style={{ marginBottom: "4px" }}>
        <div>
          <span>Task Description : </span>
        </div>
        <textarea
          style={{ margin: "4px 0 4px 0" }}
          className="textarea"
          value={nodeName?.data?.parameterArray[0]?.value}
        />
      </div>
      <div style={{ display: "flex", marginBottom: "4px" }}>
        <label for="task-checkbox">The task is completed ? </label>
        <input
          type="checkbox"
          id="task-checkbox"
          name="task-checkbox"
          checked={nodeName?.data?.parameterArray[1]?.value}
        />
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{ lineHeight: "1.5", marginRight: "4px" }}
          for="task-checkbox"
        >
          <span>Task status :</span>
        </div>
        <select
          className="select"
          name="cars"
          id="cars"
          value={nodeName?.data?.parameterArray[2]?.value}
        >
          <option value="start">Started</option>
          <option value="in-progress">In-progress</option>
          <option value="blocked">Blocked</option>
          <option value="done">Done</option>
        </select>
      </div>
    </EditMessageWrapper>
  );
}
