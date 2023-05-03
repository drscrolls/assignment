import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib, faPhone, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


export default function ListItem() {
  const [showModal, setShowModal] = useState(false);
  const handleDelete = () => {

  }

  return (
    <div className="p-3 border-bottom" style={{ display: "flex", flex: 1 }}>
      <div style={{ justifyContents: "start", flex: 1 }}>
        <h5>Contacts</h5>
        <h6 className="text-muted">
          <FontAwesomeIcon icon={faPhone} style={{ marginRight: 5, width: 13 }} />
          233 453 4839</h6>
      </div>

      <div style={{ justifyContents: "center" }}>
        <Button variant="danger" color="#e0373f" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </div>
    </div>
  )
}
