const explorer = {
  id: "1",
  name: "root",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "Task one",
      isFolder: false,
      data: {
        type: "node",
        data: {
          heading: "Task One",
          name: "Deployment",
          label: "",
          parameterArray: [
            {
              type: "textarea",
              label: "Deployment data",
              value: null,
            },
            {
              type: "checkbox",
              label: "",
              value: false,
            },
            {
              type: "select",
              label: "done",
              value: null,
            },
          ],
        },
        position: { x: 50, y: 200 },
      },
    },
    {
      id: "3",
      name: "Task two",
      isFolder: false,
    },
  ],
};

export default explorer;
