// MovableItem page with Modal for recruiter

import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";
import AddToCalendar from "../Pages/AddToCalendar";

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const API_URL = process.env.REACT_APP_SERVER_URL;

const MovableItemRec = ({ item, index, currentColumnName, setItems }) => {
  const [applicationUser, setApplicationUser] = useState();
  const [applicationJob, setApplicationJob] = useState();

  const getApplicationUser = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/api/profile/${item.user}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setApplicationUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getApplicationJob = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/api/jobs/${item.job}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setApplicationJob(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (item) {
      getApplicationUser();
      getApplicationJob();
    }
  }, [item]);

  console.log(applicationJob);
  console.log(applicationUser);
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
    item: { index, currentColumnName, item },
    type: "Our first type",
    end: async (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult;
        const { item: application } = item;

        const storedToken = localStorage.getItem("authToken");

        await axios.put(
          `${API_URL}/api/application/${application._id}`,
          {
            ...application,
            column: name,
          },
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        switch (name) {
          case "Rejected":
            changeItemColumn(item, "Rejected");
            break;
          case "Interview":
            changeItemColumn(item, "Interview");
            break;
          case "Received":
            changeItemColumn(item, "Received");
            break;
          case "Approved":
            changeItemColumn(item, "Approved");
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
  const [editedJobPosition, setEditedJobPosition] = useState(item.jobPosition);
  const [editedEmployeeName, setEditedEmployeeName] = useState(item.employeeName);
  const [editedJobURL, setEditedJobURL] = useState(item.jobURL);
  const [editedDescription, setEditedDescription] = useState(item.description);
  const [editedNote, setEditedNote] = useState(item.note);
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

  const updateItem = async () => {
    const storedToken = localStorage.getItem("authToken");

    await axios.put(
      `${API_URL}/api/recruiter/${item._id}`,
      {
        ...item,
        jobPosition: editedJobPosition,
        employeeName: editedEmployeeName,
        jobURL: editedJobURL,
        description: editedDescription,
        note: editedNote
      },
      {
        headers: { Authorization: `Bearer ${storedToken}` },
      }
    );

    setItems((prevItems) =>
      prevItems.map((application) =>
      application._id === item._id
          ? {
              ...application,
              jobPosition: editedJobPosition,
              employeeName: editedEmployeeName,
              jobURL: editedJobURL,
              description: editedDescription,
              note: editedNote
            }
          : application
      )
    );

    closeModal();
  };

  Modal.setAppElement("#root");

  const addToCalendar = () => {
    setIsAddingToCalendar(true);
  };

  // MUI
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    applicationUser &&
    applicationJob && (
      <div ref={ref} style={{
        textAlign: "left",
        borderRadius: '5px',
        background: '#fafdff',
        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
      }}>
        <p style={{ fontSize: "13px", marginLeft: "15px"}}>{applicationJob.title}</p>
        <p style={{ fontSize: "10px", marginLeft: "15px"}}>{applicationUser.firstName} {applicationUser.lastName}</p>
        <p style={{ fontSize: "10px", marginLeft: "15px", }}>
          <a href={`mailto:${applicationUser.email}`}>{applicationUser.email}</a>
        </p>
        <Button sx={{fontSize:'10px', }} onClick={() => openModal()}>More</Button>
        
        <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedJobPosition}
              onChange={(e) => setEditedJobPosition(e.target.value)}
            />
            <input
              type="text"
              value={editedEmployeeName}
              onChange={(e) => setEditedEmployeeName(e.target.value)}
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
            <Box>
  
                <Item>
                <p>Job Position: {applicationJob.title} </p>
              <p>Application Name: {applicationUser.firstName} {applicationUser.lastName}</p>
              <p>Application Email: {applicationJob.email}</p>
              <p>Job URL: {applicationJob.jobURL}</p>
              <p>Description: {applicationJob.description} </p>
              <p>Note: {applicationJob.note} </p>
                </Item>



        </Box>

            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={addToCalendar}>Add to Calendar</button>
          </>
        )}

        {isAddingToCalendar && (
          <AddToCalendar closeModal={closeModal} item={item} />
        )}

        <button onClick={closeModal}>Close</button>
        </Modal>
      </div>
    )
  );
};

export default MovableItemRec;
