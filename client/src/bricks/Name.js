import React, { useState } from 'react';
import { Button, Modal, Form, Stack } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiRename } from '@mdi/js';

function Name(props) {

  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  const [name, setName] = useState(props.name); 
  const [inputValue, setInputValue] = useState(''); 

  const newNameInput = (input) => {
    setInputValue(input.target.value);
  };

  const changeName = () => {
    {inputValue === '' ? setName("Seznam bez názvu") : setName(inputValue);}
    props.onListNameChange(inputValue); 
    closeModal();
  };

  return (
    <div className="csscontainer">
      <Stack direction="horizontal">
        <div className="p-4">
          <h1 style={{textAlign: "center", fontWeight:"bold"}}>{name}</h1>
        </div>
        <div className="p-4 ms-auto"> 
          {props.owner === true ? (
            <Button variant="primary" onClick={openModal}>
              <Icon path={mdiRename} size={1} />  Přejmenovat seznam
            </Button>
          ) : (null) } 
        </div>
      </Stack>
        
      <Modal show={show} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Přejmenování nákupního seznamu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control size="lg" type="text" placeholder="Nový název" value={inputValue} onChange={newNameInput} autoFocus/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Zrušit</Button>
          <Button variant="primary" onClick={changeName} disabled={inputValue.trim() === ''}>Uložit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Name;