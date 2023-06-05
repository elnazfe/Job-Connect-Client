import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Modal from "react-modal";
import { useState } from "react";

const MovableItem = ({
  name,
  index,
  currentColumnName,
  //moveCardHandler,
  description,
  setItems,
}) => {
  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
      return prevState.map((item) => {
        console.log(item.title);
        console.log(currentItem.title);
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
    item: { index, name, currentColumnName },
    type: "Our first type",
    end: (item, monitor) => {
      console.log(item);
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult;
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
    //collect: (monitor) => ({
    //isDragging: monitor.isDragging(),
    //}),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState("");

  const openModal = (name) => {
    setSelectedItemName(name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteItem = () => {
    // Perform deletion logic
    console.log("Job deleted:", selectedItemName);
    closeModal();
  };

  // const [title, setTitle] = useState('');
  // const [companyName, setCompanyName] = useState('');
  // const [jobURL, setJobURL] = useState(undefined);

  // const handleTitle = (e) => {
  //   setTitle(e.target.value);
  // };
  // const handleCompanyName = (e) => {
  //   setCompanyName(e.target.value);
  // };
  // const handleJobURL = (e) => {
  //   setJobURL(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const requestBody = { title, companyName, jobURL };

  return (
    <div ref={ref} className="movable-item" style={{ opacity }}>
      <button onClick={() => openModal(name)}>More</button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <p>Title:{name} </p>
        <p>Company: </p>
        <p>Job URL: </p>
        <p>Description: {description} </p>
        <button onClick={closeModal}>Close</button>
        <button onClick={deleteItem}>Delete</button>
      </Modal>
    </div>
  );
};

export default MovableItem;