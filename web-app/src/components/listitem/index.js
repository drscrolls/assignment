import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function ListItem() {
  const [showModal, setShowModal] = useState(false);
  const handleDelete = () => {

  }

  return (
      <div className="p-2" style={{display: "flex", flex: 1}}>
        <div style={{justifyContents: "start", flex: 1}}>
            <h4>Contacts</h4>
            <h6 className="text-muted">+233 453 4839</h6>
        </div>

        <div style={{justifyContents: "end"}}>
          <Button variant="primary" onClick={handleDelete}>
                    
            <FontAwesomeIcon icon="fa-brands fa-twitter" />
            <FontAwesomeIcon icon="fa-brands fa-font-awesome" />

            <FontAwesomeIcon icon="fa-regular fa-mug-hot" />
            </Button>
        </div>
      </div>
  )
}
