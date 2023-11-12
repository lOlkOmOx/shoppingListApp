import React, { useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import Icon from '@mdi/react';
import { mdiPlus, mdiArrowLeftBoldCircleOutline } from '@mdi/js';

function ChooseUser(props) {
  
//Pomocné pro modal    
    const [showModal, setShowModal] = useState(false); 
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

//Přidávání uživatele
    const [selectedUser, setSelectedUser] = useState(null);
    const selectingUser = (input) => setSelectedUser(input.target.value);
    const addUser = () => {
        props.onAddUser(selectedUser);
        closeModal();
        setSelectedUser(null);
    };

//Pomocné pro Alert
    const [show, setShow] = useState(false);  

    return (
        <div>
            {props.role === "Majitel" ? ( 
                <Button variant="success" onClick={openModal} style={{marginTop: "5px"}}>
                    <Icon path={mdiPlus} size={1} /> Přidat dalšího uživatele
                </Button>) : (
                <Button variant="danger" style={{marginTop: "5px"}} onClick={() => setShow(true)}><Icon path={mdiArrowLeftBoldCircleOutline} size={1} /> Opustit seznam</Button>
                ) }
            <Alert show={show} variant="danger" onClose={() => setShow(true)}>
                <Alert.Heading>Seznam byl opuštěn</Alert.Heading>
                <p>Uživatel bude přesměrován na routu Seznam nákupních seznamů, až bude hotová.</p>
            </Alert>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>Vyberte uživatele</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Volní uživatelé</Form.Label>
                            <Form.Control as="select" onChange={selectingUser} required>
                            <option>Vyberte uživatele</option>
                                {props.otherUsers.map(user => (
                                    <option key={user.id} value={user.id}>{user.name} {user.surname}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Zavřít</Button>
                    {/*Validace že bude nějaký uživatel vybrán, pokud nebude, bude tlačítko disabled.*/}
                    {selectedUser === null ? ( 
                    <Button variant="primary" onClick={addUser} disabled> Přidat uživatele</Button>) : (
                        <Button variant="primary" onClick={addUser} > Přidat uživatele</Button> 
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ChooseUser;
