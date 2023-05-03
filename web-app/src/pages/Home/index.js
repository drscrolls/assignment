import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/esm/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import ListItem from '../../components/listitem';
import axios from 'axios';
import "./style.css";


export default function Home() {
  const [data, setData] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  useEffect(() => {
    getContacts();
  }, [])


  const deleteContact = async (id) => {
    setFetchingData(true);
    await axios.delete(`${process.env.React_App_API_BASEURL}/contacts/${id}`)
      .then(res => {
        setFetchingData(false);
        if (res.status === 200) {
          setData(res.data);
        } else {
          // setMessage(res.data.message);
          // setSubmittedForm(true);
        }
      })
      .catch(error => {
        console.log("error", error);
        // setMessage(error);
        setFetchingData(false);
      });
  }

  
  const updateContact = async (id, payload) => {
    setFetchingData(true);
    await axios.put(`${process.env.React_App_API_BASEURL}/contacts/${id}`, payload)
      .then(res => {
        setFetchingData(false);
        if (res.status === 200) {
          setData(res.data);
        } else {
          // setMessage(res.data.message);
          // setSubmittedForm(true);
        }
      })
      .catch(error => {
        console.log("error", error);
        // setMessage(error);
        setFetchingData(false);
      });
  }


  const getContacts = async () => {
    setFetchingData(true);
    let baseUrl = process.env.React_App_API_BASEURL;
    console.log({baseUrl});

    await axios.get(`${baseUrl}/contacts`)
      .then(res => {
        setFetchingData(false);
        if (res.status === 200) {
          setData(res.data.data);
        } else {
          // setMessage(res.data.message);
          // setSubmittedForm(true);
        }
      })
      .catch(error => {
        console.log("error", error);
        // setMessage(error);
        setFetchingData(false);
      });
  }



  const AddContactModal = () => {
    const [isLoading, setLoading] = useState(false);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [phonenumber, setPhonenumber] = useState(null);

    
  const addContact = async () => {
    setFetchingData(true);

    let payload = {
      firstname,
      lastname,
      phonenumber
    };

    await axios.post(`${process.env.React_App_API_BASEURL}/contacts`, payload)
      .then(res => {
        setFetchingData(false);
        if (res.status === 200) {
          setData(res.data);
        } else {
          // setMessage(res.data.message);
          // setSubmittedForm(true);
        }
      })
      .catch(error => {
        console.log("error", error);
        // setMessage(error);
        setFetchingData(false);
      });
  }


    return <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? addContact : null}>
            {isLoading ? 'Loading…' : 'Submit'}
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  }
  return (
    <div className="container mt-5 d-block">

      <h2 align="center"><FontAwesomeIcon icon={faAddressBook} />  Phone Book App</h2>
      <div className="p-2" style={{ display: "flex", flex: 1 }}>
        <h4 style={{ justifyContents: "start", flex: 1 }}>Contacts</h4>
        <div style={{ justifyContents: "end" }}>
          <Button variant="primary" onClick={handleShow}>
            <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
            Add Contact
          </Button>
        </div>
      </div>


      <div className="py-2">
        <InputGroup className="mb-3">
          <FormControl aria-label="Search..." placeholder="Search for contact by lastname..." />
        </InputGroup>
      </div>

      <AddContactModal />

      <Card style={{ width: "100%" }}>
        <Card.Body className="p-0">

          {fetchingData ? <p align="center" className="text-muted p-2 mb-0">Loading...</p> :
            data && data.length > 0 ?
            data.map((contact, index) => (
              <ListItem key={index} contact={contact} handleDelete={deleteContact} />
            )) :
            <p align="center" className="text-muted p-2 mb-0">No data found.</p>
          }
        </Card.Body>
      </Card>

    </div>
  )
}
