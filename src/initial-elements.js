import { MarkerType } from "reactflow";

export const nodes = [
  {
    id: "1",
    type: "node",
    data: {
      heading: "Task One",
      name: "Name here",
      parameterArray: [
        {
          type: "textarea",
          value: "TextareaValue",
        },
        {
          type: "checkbox",
          value: "checkboxValue",
        },
        {
          type: "select",
          value: "selectValue",
        },
      ],
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
