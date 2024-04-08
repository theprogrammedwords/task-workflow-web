import styled from "styled-components";
import { useState } from "react";
import { OptionWrapper } from "../../CustomNode/MessageNode";
import { EditMessageWrapper } from "../NodeCreator";
import { isAllNodeisConnected } from "../../../utils";
import { edges } from "../../../initial-elements";

export default function SaveFile({ setShowFileSaver, nodes }) {
  const initialData = {
    fileName: "",
    fileDescription: "",
  };
  const [fileData, setFileData] = useState(initialData);

  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  const saveFile = () => {
    var dictionary = JSON.stringify(fileData);
    localStorage.setItem("fileData", JSON.stringify(fileData));
    setShowFileSaver(false);
    download(fileData.fileName + ".json", localStorage.getItem("nodesData"));
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFileData((prevState) => ({
      ...prevState,
      [name]: value,
      fileData: JSON.parse(localStorage.getItem("nodesData")),
    }));
  };

  return (
    <EditMessageWrapper className="updatenode__controls">
      <label>
        <strong>File Saver</strong>
      </label>

      <br />
      <div style={{ display: "flex", marginBottom: "4px" }}>
        <span style={{ marginRight: "6px" }}>File name:</span>
        <input
          name="fileName"
          value={fileData.fileName}
          onChange={onChangeHandler}
        />
      </div>

      <OptionWrapper>
        <div>
          <div style={{ color: "white" }}>Task Description : </div>
          <textarea
            name="fileDescription"
            className="textarea"
            value={fileData.fileDescription}
            onChange={onChangeHandler}
          />
        </div>
      </OptionWrapper>

      <button
        style={{ background: "#b8a6b4", border: "0px" }}
        onClick={saveFile}
        disabled={fileData.fileName && fileData.fileDescription ? false : true}
      >
        Save file
      </button>
      <button
        style={{ background: "#b8a6b4", border: "0px" }}
        onClick={() => setShowFileSaver(false)}
      >
        Close
      </button>
    </EditMessageWrapper>
  );
}
