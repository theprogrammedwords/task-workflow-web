import { MarkerType } from "reactflow";

export const nodes = [
  {
    id: "1",
    type: "node",
    data: {
      heading: "Task One",
      name: "Name here",
      parameter1: "Textarea here",
      parameter2: "Checkbox here",
      parameter3: "Select here",
    },
    position: { x: 50, y: 200 },
  },
  {
    id: "2",
    type: "node",
    data: {
      heading: "Task Two",
      name: "Name here",
      parameter1: "Textarea here",
      parameter2: "Checkbox here",
      parameter3: "Select here",
    },
    position: { x: 250, y: 400 },
  },
  {
    id: "3",
    type: "node",
    data: {
      heading: "Task Three",
      name: "Name here",
      parameter1: "Textarea here",
      parameter2: "Checkbox here",
      parameter3: "Select here",
    },
    position: { x: 450, y: 450 },
  },
  {
    id: "4",
    type: "node",
    data: {
      heading: "Task Four",
      name: "Name here",
      parameter1: "Textarea here",
      parameter2: "Checkbox here",
      parameter3: "Select here",
    },
    position: { x: 50, y: 200 },
  },
];

export const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
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
    source: "3",
    target: "4",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
