import { useState, Fragment } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const File = styled.div`
  display: flex;
  border-left: 2px solid lavender;
  padding-left: 20px;
`;

const FolderWrapper = styled.div`
  display: flex;
  background-color: lavender;
  margin: 4px;
  padding: 2px 8px 2px 8px;
  border-radius: 0cap;
  justify-content: space-between;

  .optionItems {
    display: flex;
  }
  .option {
    padding: 2px 4px 2px 4px;
    border: 1px solid gray;
    border-radius: 4px;
    margin-right: 4px;
  }
`;

const InputWrapper = styled.div`
  padding: "4px";
  .input-icon {
    margin: 8px;
  }
`;

function Folder({ explorer, handleInsertNode }) {
  const [expand, setExpand] = useState(true);
  const [showInput, setShowInput] = useState({ type: "file", show: false });

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(
        explorer.id,
        e.target.value,
        showInput.type === "folder"
      );
      setShowInput({ ...showInput, show: false });
    }
  };
  if (explorer.isFolder) {
    return (
      <Wrapper>
        <FolderWrapper className="folder" onClick={() => setExpand(!expand)}>
          <div>📁 {explorer.name}</div>
          <div className="optionItems">
            <div
              className="option"
              onClick={(e) => {
                e.stopPropagation();
                setShowInput({ type: "file", show: true });
              }}
            >
              File +
            </div>
            <div
              className="option"
              onClick={(e) => {
                e.stopPropagation();
                setShowInput({ type: "folder", show: true });
              }}
            >
              Folder +
            </div>
          </div>
        </FolderWrapper>
        {showInput.show && (
          <InputWrapper>
            {showInput.type === "file" ? (
              <span className="input-icon">📄</span>
            ) : (
              <span className="input-icon">📁</span>
            )}
            <input
              autofocus
              onKeyDown={(e) => onAddFolder(e)}
              onBlur={() => setShowInput({ ...showInput, show: false })}
              placeholder={
                showInput.type === "file" ? "File Name" : "Folder Name"
              }
            />
          </InputWrapper>
        )}
        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "20px" }}
        >
          {explorer?.items?.map((exp) => {
            return (
              <Folder handleInsertNode={handleInsertNode} explorer={exp} />
            );
          })}
        </div>
      </Wrapper>
    );
  } else {
    return <File className="file"> 📄 {explorer.name}</File>;
  }
}

export default Folder;
