import { MarkerType } from "reactflow";

export const nodes = JSON.parse(localStorage.getItem("nodesData")) ?? [];
// [
//   {
//     id: "1",
//     type: "node",
//     data: {
//       heading: "Task One",
//       name: "Name here",
//       parameterArray: [
//         {
//           type: "textarea",
//           value: "TextareaValue",
//         },
//         {
//           type: "checkbox",
//           value: false,
//         },
//         {
//           type: "select",
//           value: "done",
//         },
//       ],
//     },
//     position: { x: 50, y: 200 },
//   },
//   {
//     id: "2",
//     type: "node",
//     data: {
//       heading: "Task Two",
//       name: "Complete charts",
//       parameterArray: [
//         {
//           type: "textarea",
//           value: "Chart desc",
//         },
//         {
//           type: "checkbox",
//           value: true,
//         },
//         {
//           type: "select",
//           value: "in-progress",
//         },
//       ],
//     },
//     position: { x: 80, y: 800 },
//   },
//   {
//     id: "3",
//     type: "node",
//     data: {
//       heading: "Task Three",
//       name: "Complete deployment",
//       parameterArray: [
//         {
//           type: "textarea",
//           value: "Deploy desc",
//         },
//         {
//           type: "checkbox",
//           value: false,
//         },
//         {
//           type: "select",
//           value: "start",
//         },
//       ],
//     },
//     position: { x: 650, y: 400 },
//   },
//   {
//     id: "4",
//     type: "node",
//     data: {
//       heading: "Task Four",
//       name: "Notify of Golive",
//       parameterArray: [
//         {
//           type: "textarea",
//           value: "Golive",
//         },
//         {
//           type: "checkbox",
//           value: false,
//         },
//         {
//           type: "select",
//           value: "start",
//         },
//       ],
//     },
//     position: { x: 1250, y: 600 },
//   },
// ];

export const edges = [
  //   {
  //     id: "e1-2",
  //     source: "1",
  //     target: "2",
  //     // label: "this is an edge label",
  //     markerEnd: {
  //       type: MarkerType.ArrowClosed,
  //     },
  //   },
  //   {
  //     id: "e1-2",
  //     source: "2",
  //     target: "3",
  //     // label: "this is an edge label",
  //     markerEnd: {
  //       type: MarkerType.Arrow,
  //     },
  //   },
  //   {
  //     id: "e1-2",
  //     source: "1",
  //     target: "3",
  //     // label: "this is an edge label",
  //     markerEnd: {
  //       type: MarkerType.ArrowClosed,
  //     },
  //   },
  //   {
  //     id: "e1-2",
  //     source: "3",
  //     target: "4",
  //     // label: "this is an edge label",
  //     markerEnd: {
  //       type: MarkerType.ArrowClosed,
  //     },
  //   },
];
