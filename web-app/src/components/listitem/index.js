import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/esm/FormControl';
import { faEdit, faPhone, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


const formatPhoneNumber = (phoneNumberString) => {
  phoneNumberString= phoneNumberString.replace("+", "");

  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (!match) {
    return phoneNumberString;
  }
  return match[1] + '-' + match[2] + '-' + match[3];
}

export default function ListItem({contact, handleDelete, handleGetdata}) {
  let {_id, firstname, lastname, phonenumber } = contact;
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  phonenumber = formatPhoneNumber(phonenumber);

    
  const UpdateContactModal = ({contact}) => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [firstname, setFirstname] = useState(contact.firstname);
    const [lastname, setLastname] = useState(contact.lastname);
    const [phonenumber, setPhonenumber] = useState(contact.phonenumber);
    const [id, setId] = useState(contact._id);


    const updateContact = async () => {
      setError(null);

      if (firstname && lastname && phonenumber) {

        if(phonenumber.length != 10) {
          return setError("Phone number must be 10 digits long");
        }

        setLoading(true);

        let payload = {
          firstname,
          lastname,
          phonenumber
        };

        handleUpdate(id, payload);
        
      } else {
        setLoading(false);
        setError("Please fill in all the inputs");
      }
    }

    
  const handleUpdate = async (id, payload) => {
    setLoading(true);
    if(id && payload){
      await axios.put(`${process.env.React_App_API_BASEURL}/contacts/${id}`, payload)
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          handleClose();
          handleGetdata();
        } else {
          setError(res.data.message);
        }
      })
      .catch(error => {
        console.log("error", error);
        setError(error.message);
        setLoading(false);
      });
    }
  }


    return <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {!error ? <></> :
            <div className="pb-1">
              <p className="pb-1 text-danger" align="center">{error}</p>
            </div>
          }


          <div className="pb-1">
            <label className="pb-1">Firstname</label>
            <InputGroup className="mb-3">
              <FormControl value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            </InputGroup>
          </div>

          <div className="pb-1">
            <label className="pb-1">Lastname</label>
            <InputGroup className="mb-3">
              <FormControl value={lastname} onChange={(e) => setLastname(e.target.value)} />
            </InputGroup>
          </div>

          <div className="pb-1">
            <label className="pb-1">Phone number</label>
            <InputGroup className="mb-3">
              <FormControl type="phone" htmlSize={10} value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
            </InputGroup>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? updateContact : null}>
            {isLoading ? 'Loading…' : 'Update'}
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  }
  
  
  return (
    <div className="p-3 border-bottom" style={{ display: "flex", flex: 1 }}>
      <div style={{ justifyContents: "start", flex: 1 }}>
        <h5>{firstname} {lastname}</h5>
        <h6 className="text-muted">
          <FontAwesomeIcon icon={faPhone} style={{ marginRight: 5, width: 13 }} />
          {phonenumber}</h6>
      </div>

      <div style={{ justifyContents: "center" }}>
        <Button variant="primary" className="mx-2" onClick={handleShow}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button variant="danger" onClick={()=> handleDelete(_id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </div>

      <UpdateContactModal contact={contact} />
    </div>
  )
}
