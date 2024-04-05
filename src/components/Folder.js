import { useState, Fragment } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  span,
  div {
    color: white;
  }

  input {
    background-color: #b8a6b4;
  }
`;

const File = styled.div`
  display: flex;
  border-left: 2px solid #83727f;
  padding-left: 2px;
  margin: 2px;
  width: 200px;
  cursor: pointer;

  div:hover {
    background-color: #b8a6b4;
    width: 200px;
  }
`;

const FolderWrapper = styled.div`
  display: flex;
  margin: 0px 4px 4px 4px;
  padding: 2px 8px 2px 8px;
  background-color: #83727f;
  justify-content: space-between;

  .folder-item {
    cursor: pointer;
    width: 150px;
  }

  .optionItems {
    display: flex;
    .option {
      padding: 0px 4px 0px 4px;
      margin-right: 4px;
      cursor: pointer;
    }
    .option:hover {
      background-color: #b8a6b4;
    }
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
          <div draggable className="folder-item">
            📁 {explorer.name}
          </div>
          <div className="optionItems">
            <div
              className="option"
              onClick={(e) => {
                e.stopPropagation();
                setShowInput({ type: "file", show: true });
              }}
            >
              📄 +
            </div>
            <div
              className="option"
              onClick={(e) => {
                e.stopPropagation();
                setShowInput({ type: "folder", show: true });
              }}
            >
              📁 +
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
              autoFocus
              onKeyDown={(e) => onAddFolder(e)}
              onBlur={() => setShowInput({ type: "file", show: false })}
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
              <Folder
                draggable
                handleInsertNode={handleInsertNode}
                explorer={exp}
              />
            );
          })}
        </div>
      </Wrapper>
    );
  } else {
    return (
      <File draggable className="file">
        <div>📄 {explorer.name}</div>
      </File>
    );
  }
}

export default Folder;
