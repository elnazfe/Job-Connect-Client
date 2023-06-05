import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005/api";

const MovableItem = ({
  name,
  item,
  index,
  currentColumnName,
  setItems,
  jobs,
}) => {
  const changeItemColumn = async (currentItem, columnName) => {
    setItems((prevState) => {
      return prevState.map((item) => {
        return {
          ...item,
          column: item.title === currentItem.name ? columnName : item.column,
        };
      });
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "Our first type",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      //moveCardHandler(dragIndex, hoverIndex);
      // Mutating the monitor item here!
      //item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { index, name, currentColumnName, item },
    type: "Our first type",
    end: async (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult;
        const { item: job } = item;

        const storedToken = localStorage.getItem("authToken");

        await axios.put(
          `${API_URL}/jobs/${job._id}`,
          {
            ...job,
            column: name,
          },
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        switch (name) {
          case "Applied":
            changeItemColumn(item, "Applied");
            break;
          case "Pending":
            changeItemColumn(item, "Pending");
            break;
          case "Saved":
            changeItemColumn(item, "Saved");
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteItem = async () => {
    // Perform deletion logic
    const storedToken = localStorage.getItem("authToken");

    await axios.delete(`${API_URL}/jobs/${item._id}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });

    setItems(jobs.filter((job) => job._id !== item._id));

    closeModal();
  };

  Modal.setAppElement("#root");

  return (
    <div ref={ref} className="movable-item" style={{ opacity }}>
      <p>{item.title}</p>
      <button onClick={() => openModal()}>More</button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <p>Title: {item.title} </p>
        <p>Company: {item.companyName}</p>
        <p>Job URL: {item.jobURL}</p>
        <p>Description: {item.description} </p>
        <button onClick={closeModal}>Close</button>
        <button onClick={deleteItem}>Delete</button>
      </Modal>
    </div>
  );
};

export default MovableItem;
