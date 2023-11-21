import React from "react"
import Name from './Name'
import Items from './Items'
import Users from './Users'
import { Modal, Button } from "react-bootstrap"

function Show(props) {

    return (
        <div>
      <Modal show={true} onHide={props.onClose} centered className="custom-modal">
        <Modal.Body style={{display: "inline"}}>
            <Name name={props.shoppingList.name} owner={props.owner} onListNameChange={props.onListNameChange}/>
            <Items items={props.shoppingList.items} />
            <Users owner={props.owner} onClose={props.onClose}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Zavřít
          </Button>
        </Modal.Footer>
      </Modal></div>
    );
  }


export default Show