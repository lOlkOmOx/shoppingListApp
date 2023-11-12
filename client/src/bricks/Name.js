import React, { useState } from 'react';
import { Button, Modal, Form, Stack } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiRename } from '@mdi/js';

function Name(props) {

//Pomocné pro modal na přejmenování seznamu
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  const [name, setName] = useState("Páteční nákup v Kauflandu"); //Defaultní název nákupního seznamu
  const [inputValue, setInputValue] = useState(''); //Input na přejmenování

//Přejmenování seznamu
  const newNameInput = (input) => {
    setInputValue(input.target.value);
  };

//Měnění názvu, pokud není žádný název zadán, zobrazí se defaultní název.
  const changeName = () => {
    {inputValue==='' ? setName("<Seznam bez názvu>") : setName(inputValue);}
    closeModal();
  };

  return (
    <div class="csscontainer">
      <Stack direction="horizontal">
        <div className="p-4">
          <h1 style={{textAlign: "center", fontWeight:"bold"}}>{name}</h1>
        </div>
      {/*Zobrazení tlačítka s podmínkou, že je majitelem*/}
        <div className="p-4 ms-auto"> {props.role === "Majitel" ? (
          <Button variant="primary" onClick={openModal}>
            <Icon path={mdiRename} size={1} />  Přejmenovat seznam
          </Button>) : (null) } 
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
            <Button variant="primary" onClick={changeName}>Uložit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Name;