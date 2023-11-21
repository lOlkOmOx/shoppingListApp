import React from "react"
import { Modal, Button } from 'react-bootstrap'

function Preview(props) {
    return (
      <Modal show={true} onHide={props.onClose} centered>
        <Modal.Header>
          <Modal.Title>Náhled seznamu: {props.shoppingList.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{paddingBottom: "10px", borderBottom: "solid lightgray 1px"}}>Majitel: {props.ownerName} {props.owner ? ("(vy)") : (null)}</h6>
          <h6>Položky:</h6>
            <ul style={{paddingBottom: "10px", borderBottom: "solid lightgray 1px"}}>
              {props.shoppingList.items.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          {props.owner ? ( 
            <p style={{color: "Red"}}>Seznam můžete spravovat po odebrání z archivu.</p>
            ):(
            <p style={{color: "Red"}}>Seznam lze znovu spravovat pouze když jej majitel - {props.ownerName} odebere z archivu.</p>
          )}
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>Zavřít</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default Preview