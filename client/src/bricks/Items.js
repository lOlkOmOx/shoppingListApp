import React, { useState } from "react";
import { Button, Modal, Form, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

function Items(props) {
  const [showModal, setModalShow] = useState(false); 
  const [newItemName, setNewItemName] = useState("");

  const closeModal = () => setModalShow(false);
  const openModal = () => setModalShow(true);

  const itemFilter = () => {
    setShowOnlyRequired(!showOnlyRequired);
  };
  const [showOnlyRequired, setShowOnlyRequired] = useState(false);      
    
  const setItemAsPurchased = (itemId) => {
    const updatedItems = filteredItems.map(item => {
      if (item.id === itemId) {
        return { ...item, required: false };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const [items, setItems] = useState(props.items)
          
  const filteredItems = showOnlyRequired ? items.filter(item => item.required) : items;

  const deleteItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
  };

  const addItem = () => {
    if (newItemName.trim() === '') {return}
      const newItem = { id: Math.random().toString(), name: newItemName, required: true,};
      const updatedItems = [...items, newItem]; 
      setItems(updatedItems); 
      closeModal(); 
      setNewItemName(""); 
  };
        
  return (
    <div style={{padding: "10px"}} class="csscontainer">
      <Table hover>
        <thead>
          <tr>
            <th><h2>Položky</h2></th>
            <th style={{ textAlign: 'right' }}>
              <Button onClick={itemFilter}>{showOnlyRequired ? "Zobrazit všechny položky" : "Zobrazit pouze potřebné položky"}</Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td style={{ textDecoration: item.required ? ("none") : ("line-through") }}>{item.name}</td>
              <td style={{ textAlign: 'right' }}>
                {item.required ? (
                  <Button variant="outline-primary" onClick={() => setItemAsPurchased(item.id)}>Zakoupené</Button>
                ):(
                  <Button variant="outline-success" disabled>Zakoupeno</Button> //Značka zakoupení
                )} 
                <Button variant="outline-danger" onClick={() => deleteItem(item.id)}>Smazat</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Přidat novou položku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control type="text" placeholder="Název položky" value={newItemName} onChange={(input) => setNewItemName(input.target.value)} autoFocus/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Zavřít</Button>
          <Button variant="primary" onClick={addItem}>Přidat</Button>
        </Modal.Footer>
      </Modal>
      <Button variant="success" onClick={openModal} style={{margin: "5px 0 10px"}}>
        <Icon path={mdiPlus} size={1} /> Přidat novou položku
      </Button>
    </div>
  );
}

export default Items;