import React from "react";
import { useDrop } from "react-dnd";

const Column = ({ children, className, title }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "Our first type",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    // Override monitor.canDrop() function
    canDrop: (item) => {
      console.log(title);
      const { currentColumnName } = item;
      return (
        currentColumnName === title ||
        (currentColumnName === "Received" && title === "Approved") ||
        (currentColumnName === "Received" && title === "Rejected") ||
        (currentColumnName === "Approved" && title === "Interview") ||
        (currentColumnName === "Interview" && title === "Rejected")
      );
    },
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return "#8c52ff";
      } else if (!canDrop) {
        return "rgb(255,188,188)";
      }
    } else {
      return "";
    }
  };

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <p>{title}</p>
      {children}
    </div>
  );
};

export default Column;
