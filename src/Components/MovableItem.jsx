// MovableItem page with Modal

import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";
import AddToCalendar from "../Pages/AddToCalendar";

import Button from '@mui/material/Button';

const API_URL = process.env.REACT_APP_SERVER_URL;

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
          `${API_URL}/api/jobs/${job._id}`,
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
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedCompany, setEditedCompany] = useState(item.companyName);
  const [editedJobURL, setEditedJobURL] = useState(item.jobURL);
  const [editedDescription, setEditedDescription] = useState(item.description);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingToCalendar, setIsAddingToCalendar] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setIsAddingToCalendar(false);
  };

  const deleteItem = async () => {
    // Perform deletion logic
    const storedToken = localStorage.getItem("authToken");

    await axios.delete(`${API_URL}/api/jobs/${item._id}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });

    setItems(jobs.filter((job) => job._id !== item._id));

    closeModal();
  };

  const updateItem = async () => {
    const storedToken = localStorage.getItem("authToken");

    await axios.put(
      `${API_URL}/api/jobs/${item._id}`,
      {
        ...item,
        title: editedTitle,
        companyName: editedCompany,
        jobURL: editedJobURL,
        description: editedDescription,
      },
      {
        headers: { Authorization: `Bearer ${storedToken}` },
      }
    );

    setItems((prevItems) =>
      prevItems.map((job) =>
        job._id === item._id
          ? {
              ...job,
              title: editedTitle,
              companyName: editedCompany,
              jobURL: editedJobURL,
              description: editedDescription,
            }
          : job
      )
    );

    closeModal();
  };

  Modal.setAppElement("#root");

  const addToCalendar = () => {
    setIsAddingToCalendar(true);
  };

  return (
    <div ref={ref} style={{
      textAlign: "left",
      borderRadius: '5px',
      background: '#fafdff',
      boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
    }}>
      <p style={{ fontSize: "15px", marginLeft: "15px"}}>{item.title}</p>
      <p style={{ marginLeft: "15px"}}>{item.companyName}</p>
      <Button sx={{fontSize:'10px', }} onClick={() => openModal()}>More</Button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <input
              type="text"
              value={editedCompany}
              onChange={(e) => setEditedCompany(e.target.value)}
            />
            <input
              type="text"
              value={editedJobURL}
              onChange={(e) => setEditedJobURL(e.target.value)}
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            ></textarea>
            <button onClick={updateItem}>Save</button>
          </>
        ) : (
          <>
            <p>Title: {item.title} </p>
            <p>Company: {item.companyName}</p>
            <p>Job URL: {item.jobURL}</p>
            <p>Description: {item.description} </p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={addToCalendar}>Add to Calendar</button>
          </>
        )}

        {isAddingToCalendar && (
          <AddToCalendar closeModal={closeModal} item={item} />
        )}

        <button onClick={closeModal}>Close</button>
        <button onClick={deleteItem}>Delete</button>
      </Modal>
    </div>
  );
};

export default MovableItem;
