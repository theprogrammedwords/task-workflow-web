import "./App.css";
import { useState } from "react";
import explorer from "./data/folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./Hooks/use-traverse-tree";
import OverviewFlow from "./components/Flow";

function App() {
  const { insertNode } = useTraverseTree();
  const [explorerData, setExplorerData] = useState(explorer);

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  };
  return (
    <div className="app">
      <div className="nav-bar">
        {" "}
        <span>Task Workflow Web</span>
      </div>
      <div className="text-container"></div>
      <div className="container">
        <div className="file-explorer">
          <Folder explorer={explorerData} handleInsertNode={handleInsertNode} />
        </div>
        <div className="flow-canvas">
          <OverviewFlow />
        </div>
      </div>
    </div>
  );
}

export default App;
