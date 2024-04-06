import styled from "styled-components";

const EditMessageWrapper = styled.div`
  background-color: #51424e;
  padding: 12px;
  border-radius: 8px;
  position: absolute;
  top: 60px;
  left: 46%;
  width: 200px;
  textarea {
    border-radius: 8px;
  }

  label {
    color: white;
    margin: 4px 0 4px 0;
  }
`;
export default function EditMessage({ textRef, nodeName, setNodeName }) {
  return (
    <EditMessageWrapper className="updatenode__controls">
      <label>Message Editor</label>
      <textarea
        ref={textRef}
        value={nodeName}
        onChange={(evt) => setNodeName(evt.target.value)}
      />
    </EditMessageWrapper>
  );
}
