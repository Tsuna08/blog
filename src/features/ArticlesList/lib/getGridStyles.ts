export const getGridStyles = (index: number) => {
  const position = index % 6;

  const commonStyles = {
    gridRow: "span 1",
    background: "#5D71DD",
    color: "white",
    "&:hover": { background: "white", span: { color: "black" } },
    span: { color: "white" },
    "div > p": { color: "lightGray" },
  };

  switch (position) {
    case 0:
      return { gridColumn: "1 / 4", gridRow: "span 1" };
    case 1:
      return { gridColumn: "1 / span 2", gridRow: "span 1" };
    case 2:
      return commonStyles;
    case 3:
      return { ...commonStyles, gridRow: "span 2" };
    default:
      return { gridColumn: "2 / span 2", gridRow: "span 1", maxHeight: "100px" };
  }
};
