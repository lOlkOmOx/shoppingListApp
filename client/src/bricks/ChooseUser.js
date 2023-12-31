import React, { useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import Icon from '@mdi/react';
import { mdiPlus, mdiArrowLeftBoldCircleOutline } from '@mdi/js';
import { useTranslation } from './Translation';

function ChooseUser(props) {

    const { t } = useTranslation()
  
//Pomocné pro modal    
    const [showModal, setShowModal] = useState(false)
    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

//Přidávání uživatele
    const [selectedUser, setSelectedUser] = useState(null)
    const selectingUser = (input) => setSelectedUser(input.target.value)
    const [addingUser, setAddingUser] = useState(false)

    const fakeServerRequest = () => {
        return new Promise((resolve) => {setTimeout(() => {resolve("OK")}, 1000)})}

      const addUser = async () => {
        try {
          setAddingUser(true)
          await fakeServerRequest()
          props.onAddUser(selectedUser)
          closeModal()
          setSelectedUser(null)
          setRemovingSelf(false)
        } catch (error) {
          console.error('error:', error)
        } 
      }

//Opuštění seznamu
      const [removingSelf, setRemovingSelf] = useState(false)
      const removeSelf = async () => {
        try {
          setRemovingSelf(true)
          await fakeServerRequest()
          props.onClose()
          setRemovingSelf(false)
        } catch (error) {
          console.error('error:', error)
        } 
      }

    return (
        <div>
            {props.owner ? ( 
                <Button variant="success" onClick={openModal} style={{marginTop: "5px"}}>
                    <Icon path={mdiPlus} size={1} /> {t.addUser}
                </Button>
            ) : (
                <Button variant="danger" style={{marginTop: "5px"}} onClick={() => removeSelf()}>{removingSelf ? (<Spinner animation="border" role="status" size="sm"></Spinner>) : (<><Icon path={mdiArrowLeftBoldCircleOutline} size={1} /> {t.leaveList}</>)} </Button>
            ) }
            <Modal show={showModal} onHide={closeModal} className={props.dark ? "darkk" : null}>
                <Modal.Header>
                    <Modal.Title>{t.chooseUser}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>{t.freeUsers}</Form.Label>
                            <Form.Control as="select" onChange={selectingUser} required>
                            <option>{t.chooseUser}</option>
                                {props.otherUsers.map(user => (
                                    <option key={user.id} value={user.id}>{user.name} {user.surname}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>{t.close}</Button>
                    {selectedUser === null ? ( 
                        <Button variant="primary" onClick={addUser} disabled> {t.add}</Button>
                    ) : (
                        <Button variant="primary" onClick={addUser}>{addingUser ? (<Spinner animation="border" role="status" size="sm"></Spinner>):(<>{t.add}</>)} </Button> 
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ChooseUser;
