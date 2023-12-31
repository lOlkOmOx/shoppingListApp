import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Stack, Spinner } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiRename } from '@mdi/js';
import Customspinner from "./Spinner"
import { useTranslation } from './Translation';


function Name(props) {

  const { t } = useTranslation()

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
      {inputValue === '' ? setName("<NoName>") : setName(inputValue)}
      props.onListNameChange(inputValue)
      setRenamingList(false)
      closeModal()
    }
    catch (error) {
        console.error('Error:', error)
    } 
}

  return (
    <div className="csscontainer">
      {error ? (<p>{t.dataFailed}</p>):(<>
      {loading ? (<Customspinner variant="Bounce"/>):(
      <Stack direction="horizontal">
        <div className="p-4">
          <h1 style={{textAlign: "center", fontWeight:"bold"}}>{name}</h1>
        </div>
        <div className="p-4 ms-auto"> 
          {props.owner === true ? (
            <Button variant="primary" onClick={openModal}>
              <Icon path={mdiRename} size={1}/>  <span className="respButton">{t.renameShoppingList}</span>
            </Button>
          ) : (null) } 
        </div>
      </Stack>)}</>)}
        
      <Modal show={show} onHide={closeModal} className={props.dark ? "darkk" : null}>
        <Modal.Header>
          <Modal.Title>{t.renameShoppingList}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form><Form.Control size="lg" type="text" placeholder={t.newName} value={inputValue} onChange={newNameInput} autoFocus/></Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}> <>{t.cancel}</></Button>
          <Button variant="primary" onClick={changeName} disabled={inputValue.trim() === ''}>{renamingList ? (<Spinner animation="border" role="status" size="sm"></Spinner>):(<>{t.save}</>)}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Name;