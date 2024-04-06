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

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = { node: Node };

const ActionBarWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  background-color: #b8a6b4;
  padding: 4px;

  button {
    background-color: #83727f;
    border: 1px solid #83727f;
    margin: 4px;
    color: white;
  }
`;
const OverviewFlow = () => {
  const reactFlowWrapper = useRef(null);
  const textRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [showTaskCreator, setShowTaskCreator] = useState(false);

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
    console.log(reactFlowInstance, "reactIns");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { heading: "Send Message", content: label },
    };
    setNodes((es) => es.concat(newNode));
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

  const saveHandler = () => {
    if (isAllNodeisConnected(nodes, edges)) alert("Congrats its correct");
    else alert("Please connect source nodes (Cannot Save Flow)");
  };

  const createNode = () => {
    setShowTaskCreator(true);
  };

  return (
    <>
      <ActionBarWrapper>
        <button className="download" onClick={saveHandler}>
          Download as JSON
        </button>

        <button className="download" onClick={saveHandler}>
          Download as PNG
        </button>

        <button className="download" onClick={() => createNode()}>
          Create a Node
        </button>
      </ActionBarWrapper>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
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
              fitView
            >
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>

          <MiniMap zoomable nodeStrokeWidth={3} style={minimapStyle} pannable />

          <Controls showFitView showInteractive>
            <ControlButton
              onClick={() => alert("Something magical just happened. ✨")}
            >
              💾
            </ControlButton>
            <ControlButton
              onClick={() => alert("Something magical just happened. ✨")}
            >
              {"</>"}
            </ControlButton>
          </Controls>

          <SideBar
            isSelected={isSelected}
            textRef={textRef}
            nodeName={nodeName}
            setNodeName={setNodeName}
          />

          {showTaskCreator && <CreateTask />}
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default OverviewFlow;
