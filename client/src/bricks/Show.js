import React from "react"
import Name from './Name'
import Items from './Items'
import Users from './Users'
import { Modal, Button } from "react-bootstrap"
import { useTranslation } from './Translation';

function Show(props) {
  const { t } = useTranslation()

    return (
      <div>
      <Modal show={true} onHide={props.onClose} centered className={props.dark ? "darkk custom-modal" : "custom-modal"}>
        <Modal.Body style={{display: "inline"}}>
            <Name name={props.shoppingList.name} owner={props.owner} onListNameChange={props.onListNameChange} renaming={props.renaming} dark={props.dark}/>
            <Items items={props.shoppingList.items} dark={props.dark} />
            <Users owner={props.owner} onClose={props.onClose} dark={props.dark}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>{t.close}</Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
  }


export default Show