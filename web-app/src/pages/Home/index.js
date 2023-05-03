import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import FormControl from 'react-bootstrap/esm/FormControl';
import FormText from 'react-bootstrap/esm/FormText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from 'react-bootstrap/Card';
import ListItem from '../../components/listitem';
import "./style.css";


export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  const AddContactModal = () => {
    
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = () => {
      setLoading(true);
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
            onClick={!isLoading ? handleSubmit : null}
          >
            {isLoading ? 'Loading…' : 'Submit'}
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  }
  return (
    <div className="container mt-5 d-block">

      <div className="p-2" style={{display: "flex", flex: 1}}>
        <h4 style={{justifyContents: "start", flex: 1}}>Contacts</h4>
        <div style={{justifyContents: "end"}}>
          <Button variant="primary" onClick={handleShow}>
              <FontAwesomeIcon icon={["fab", "plus"]} />
              Add Contact
            </Button>
        </div>
      </div>

      
      <div className="py-2">
        <InputGroup className="mb-3">
          <FormControl aria-label="Search..." placeholder="Search for contact by lastname..."/>
        </InputGroup>
      </div>

      <AddContactModal />
      
      <Card style={{width: "100%"}}>
        <Card.Body>
          
        <ListItem />


        </Card.Body>
      </Card>

    </div>
  )
}
