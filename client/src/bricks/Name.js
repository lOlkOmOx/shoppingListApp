import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Stack, Spinner } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiRename } from '@mdi/js';
import Customspinner from "./Spinner"

function Name(props) {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => {setTimeout(() => {resolve();}, 1000)})
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const fakeServerRequest = () => {return new Promise((resolve) => {setTimeout(() => {resolve("OK")}, 1000)})}

//Modal
  const [show, setShow] = useState(false)
  const closeModal = () => setShow(false)
  const openModal = () => setShow(true)

//Input
  const [name, setName] = useState(props.name) 
  const [inputValue, setInputValue] = useState('') 
  const newNameInput = (input) => {setInputValue(input.target.value)}

//Přejmenování seznamu
  const [renamingList, setRenamingList] = useState(false);
  const changeName = async () => {
    try {
      setRenamingList(true)
      await fakeServerRequest()
      {inputValue === '' ? setName("Seznam bez názvu") : setName(inputValue);}
      props.onListNameChange(inputValue);
      setRenamingList(false)
      closeModal();
    }
    catch (error) {
        console.error('Chyba při vytváření seznamu:', error);
    } 
}

  return (
    <div className="csscontainer">
      {error ? (<p>Chyba při načítání dat</p>):(<>
      {loading ? (<Customspinner variant="Bounce"/>):(
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
      </Stack>)}</>)}
        
      <Modal show={show} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Přejmenování nákupního seznamu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form><Form.Control size="lg" type="text" placeholder="Nový název" value={inputValue} onChange={newNameInput} autoFocus/></Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Zrušit</Button>
          <Button variant="primary" onClick={changeName} disabled={inputValue.trim() === ''}>{renamingList ? (<Spinner animation="border" role="status" size="sm"></Spinner>):("Uložit")}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Name;