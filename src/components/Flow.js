import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  MiniMap,
  Controls,
  ControlButton,
  useReactFlow,
} from "reactflow";

// Components
import SideBar from "./SideBar/SideBar";
import Node from "./CustomNode/MessageNode";

// Utils
import { isAllNodeisConnected } from "../utils";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "../initial-elements";

// Styles
import "reactflow/dist/style.css";
import "./dnd.css";
import "./updatenode.css";
import CreateTask from "./SideBar/NodeCreator";
import SaveFile from "./SideBar/FileSaver";
import { toPng } from "html-to-image";

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = { node: Node };

const ActionBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #b8a6b4;
  padding: 4px;

  button {
    cursor: pointer;
    background-color: #83727f;
    border: 1px solid #83727f;
    margin: 4px;
    padding: 8px;
    border-radius: 8px;
    color: white;
  }

  .download-cta {
    background-color: #4f384a;
  }
`;

const TipsWrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 5%;
  left: 40%;
  right: 50%;
  bottom: 50%;
  width: 400px;
  height: fit-content;

  align-items: center;
  justify-content: center;
  z-index: 1000;

  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #83727f;
  padding: 20px;

  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;
const imageWidth = 1024;
const imageHeight = 768;

const OverviewFlow = () => {
  const reactFlowWrapper = useRef(null);
  const textRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [showTaskCreator, setShowTaskCreator] = useState(false);
  const [showFileSaver, setShowFileSaver] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const elementRef = useRef(null);

  const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);

  const minimapStyle = {
    height: 200,
    border: "2px solid #b8a6b4",
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const type = event.dataTransfer.getData("application/reactflow");
    const label = event.dataTransfer.getData("content");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type: "node",
      data: {
        heading: "Drag event item",
        name: "item",
        label: "",
        parameterArray: [
          {
            type: "textarea",
            label: "Dragged event",
            value: null,
          },
          {
            type: "checkbox",
            label: "Dragged event",
            value: false,
          },
          {
            type: "select",
            label: "Dragged event",
            value: null,
          },
        ],
      },
      position: position,
    };

    setNodes((es) => {
      const updatedNodes = es.concat(newNode);
      localStorage.setItem("nodesData", JSON.stringify(updatedNodes));
      return updatedNodes;
    });

    setSelectedNode(newNode.id);
  };
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)
      ),
    [setEdges]
  );

  const [nodeName, setNodeName] = useState("Node 1");
  useEffect(() => {
    const node = nodes.filter((node) => {
      if (node.selected) return true;
      return false;
    });
    if (node[0]) {
      setSelectedNode(node[0]);
      setIsSelected(true);
    } else {
      setSelectedNode("");
      setIsSelected(false);
    }
  }, [nodes]);
  useEffect(() => {
    setNodeName(selectedNode?.data?.content || selectedNode);
  }, [selectedNode]);
  useEffect(() => {
    textRef?.current?.focus();
  }, [selectedNode]);
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data = {
            ...node.data,
          };
        }
        return node;
      })
    );
  }, [nodeName, setNodes]);

  const createNode = () => {
    setShowHelp(false);
    setShowTaskCreator(true);
  };

  const saveFile = () => {
    setShowHelp(false);
    setShowFileSaver(true);
  };

  const htmlToImageConvert = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <ActionBarWrapper>
        <button className="download-cta" onClick={() => saveFile()}>
          Save the workflow
        </button>
        <button className="download" onClick={() => createNode()}>
          Create a Node
        </button>
        <button
          className="download"
          onClick={() => {
            localStorage.clear();
            setNodes([]);
          }}
        >
          Clear Canvas
        </button>

        <button className="download" onClick={() => htmlToImageConvert()}>
          Download as PNG
        </button>
        <button className="download" onClick={() => setShowHelp(!showHelp)}>
          {showHelp ? "Hide" : "Show"} Help
        </button>
      </ActionBarWrapper>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              ref={elementRef}
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              onDrop={onDrop}
              onDragOver={onDragOver}
              attributionPosition="top-right"
            >
              {showHelp && (
                <TipsWrapper className="tips">
                  <strong
                    onClick={() => setShowHelp(false)}
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      cursor: "pointer",
                    }}
                  >
                    X
                  </strong>
                  <strong>Action Buttons</strong>
                  <li>Click on "Create a Node" to add a task</li>
                  <li>
                    Click on "Clear Canvas" to clear all tasks, you will lose
                    progress if unsaved
                  </li>
                  <li>
                    Click on "Download as PNG" to download in image format. Make
                    sure content is in centre of pan and not cut out
                  </li>
                  <li>
                    Click on "Save the workflow" to Save all progress into a
                    file
                  </li>
                  <li>Click on "Hide Help" to hide the tips</li>
                  <strong>Control Buttons</strong>
                  <li>Click on "+" to Zoom In</li>
                  <li>Click on "-" to Zoom Out</li>
                  <li>Click on "Lock icon" to Lock the view</li>
                  <strong>Minimap</strong>
                  <li>You can use the minimap to navigate across the canvas</li>
                  <strong>File explorer</strong>
                  <li>
                    Its a WIP, intention was to drag the file item and create a
                    node seamlessly, drag and drop is working but task edit
                    functionality is not suported at the moment. :):
                  </li>
                  <li>
                    However you can have the feel of native file explorer where
                    you can create nested folders and files :)
                  </li>
                </TipsWrapper>
              )}
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>

          <MiniMap zoomable nodeStrokeWidth={3} style={minimapStyle} pannable />

          <Controls showFitView showInteractive>
            {/* <ControlButton
              onClick={() => alert("Something magical just happened. ✨")}
            >
              💾
            </ControlButton>
            <ControlButton
              onClick={() => alert("Something magical just happened. ✨")}
            >
              {"</>"}
            </ControlButton> */}
          </Controls>

          <SideBar
            isSelected={false}
            textRef={textRef}
            nodeName={nodeName}
            setNodeName={setNodeName}
          />

          {showTaskCreator && (
            <CreateTask
              setNodes={setNodes}
              setEdges={setEdges}
              setShowTaskCreator={setShowTaskCreator}
            />
          )}

          {showFileSaver && (
            <SaveFile nodes={nodes} setShowFileSaver={setShowFileSaver} />
          )}
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default OverviewFlow;
