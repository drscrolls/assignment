import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faTrashCan } from '@fortawesome/free-solid-svg-icons'


const formatPhoneNumber = (phoneNumberString) => {
  phoneNumberString= phoneNumberString.replace("+", "");

  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (!match) {
    return phoneNumberString;
  }
  return match[1] + '-' + match[2] + '-' + match[3];
}

export default function ListItem({contact, handleDelete}) {
  let {_id, firstname, lastname, phonenumber } = contact;
  const [showModal, setShowModal] = useState(false);
  phonenumber = formatPhoneNumber(phonenumber);

    

  
  return (
    <div className="p-3 border-bottom" style={{ display: "flex", flex: 1 }}>
      <div style={{ justifyContents: "start", flex: 1 }}>
        <h5>{firstname} {lastname}</h5>
        <h6 className="text-muted">
          <FontAwesomeIcon icon={faPhone} style={{ marginRight: 5, width: 13 }} />
          {phonenumber}</h6>
      </div>

      <div style={{ justifyContents: "center" }}>
        <Button variant="danger" color="#e0373f" onClick={()=> handleDelete(_id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </div>
    </div>
  )
}
