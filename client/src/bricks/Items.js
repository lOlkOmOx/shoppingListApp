import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import Customspinner from "./Spinner"

function Items(props) {

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


  const [showModal, setModalShow] = useState(false)
  const [newItemName, setNewItemName] = useState("")

  const closeModal = () => setModalShow(false)
  const openModal = () => setModalShow(true)

  const itemFilter = () => {setShowOnlyRequired(!showOnlyRequired)}
  const [showOnlyRequired, setShowOnlyRequired] = useState(false)
  const [items, setItems] = useState(props.items)
          
  const filteredItems = showOnlyRequired ? items.filter(item => item.required) : items;     

  const fakeServerRequest = () => {
    return new Promise((resolve) => {setTimeout(() => {resolve("OK")}, 1000)})}

//Označování položky jako zakoupenou
  const [purchasingItem, setPurchasingItem] = useState(false)
  const [purchasingItemId, setPurchasingItemId] = useState(null)
  const setItemAsPurchased = async (itemId) => {
    try {
      setPurchasingItem(true)
      await fakeServerRequest()
      const updatedItems = filteredItems.map(item => {if (item.id === itemId) {return { ...item, required: false }}return item})
      setItems(updatedItems)
      setPurchasingItem(false)
    } catch (error) {
      console.error('Chyba při označování položky za zakoupenou:', error)
    } 
  }

//Mazání položky
  const [deletingItem, setDeletingItem] = useState(false)
  const [deletingItemId, setDeletingItemId] = useState(null)
  const deleteItem = async (itemId) => {
    try {
        setDeletingItem(true)
        await fakeServerRequest()
        const updatedItems = items.filter(item => item.id !== itemId)
        setItems(updatedItems)
        setDeletingItem(true)
    } catch (error) {
        console.error('Chyba při mazání položky:', error)
    } 
}

//Přidávání položky
  const [addingItem, setAddingItem] = useState(false)
  const addItem = async () => {
    try {
        setAddingItem(true)
        await fakeServerRequest()
        if (newItemName.trim() === '') {return}
        const newItem = { id: Math.random().toString(), name: newItemName, required: true}
        const updatedItems = [...items, newItem]
        setItems(updatedItems)
        setAddingItem(false)
        closeModal() 
        setNewItemName("")
    } catch (error) {
        console.error('Chyba při přidávání položky:', error)
    } 
}
        
  return (
    <div style={{padding: "10px"}} class="csscontainer">
      {error ? (<p>Chyba při získávání dat</p>):(<>
      {loading ? (<Customspinner variant="Bounce"/>):(
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
                  <Button variant="outline-primary" onClick={() => {setItemAsPurchased(item.id); setPurchasingItemId(item.id)}}>{purchasingItem && purchasingItemId === item.id ? (<Spinner animation="border" role="status" size="sm"></Spinner>) : ("Zakoupené")}</Button>
                ):(
                  <Button variant="outline-success" disabled>Zakoupeno</Button>
                )} 
                <Button variant="outline-danger" onClick={() => {deleteItem(item.id); setDeletingItemId(item.id)}}>{deletingItem && deletingItemId === item.id ? (<Spinner animation="border" role="status" size="sm"></Spinner>) : ("Smazat")}</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>)}</>)}
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
          <Button variant="primary" onClick={addItem} disabled={newItemName.trim() === ''}> {addingItem ? (<Spinner animation="border" role="status" size="sm"></Spinner>):("Přidat")}</Button>
        </Modal.Footer>
      </Modal>
      {loading ? (null) : (
      <Button variant="success" onClick={openModal} style={{margin: "5px 0 10px"}}>
        <Icon path={mdiPlus} size={1} /> Přidat novou položku
      </Button>)}
    </div>
  );
}

export default Items;