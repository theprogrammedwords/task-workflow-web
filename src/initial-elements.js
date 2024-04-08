import { MarkerType } from "reactflow";

export const nodes = JSON.parse(localStorage.getItem("nodesData")) ?? [];

export const edges = [
  {
    id: "e1-2",
    source: "0",
    target: "1",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e2-3",
    source: "1",
    target: "2",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: "e1-2",
    source: "2",
    target: "3",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-2",
    source: "3",
    target: "4",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-2",
    source: "4",
    target: "5",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-2",
    source: "5",
    target: "6",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-2",
    source: "6",
    target: "7",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-2",
    source: "7",
    target: "8",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-2",
    source: "8",
    target: "9",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-2",
    source: "9",
    target: "10",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-2",
    source: "10",
    target: "11",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-2",
    source: "11",
    target: "12",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
