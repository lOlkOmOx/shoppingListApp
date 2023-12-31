import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from '@mdi/react';
import { mdiPlus, mdiTrashCanOutline, mdiCheck, mdiCartArrowDown, mdiCheckAll, mdiFilter } from '@mdi/js';
import Customspinner from "./Spinner"
import { useTranslation } from './Translation';

function Items(props) {

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
      console.error('error:', error)
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
        console.error('error:', error)
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
        console.error('error:', error)
    } 
}
        
  return (
    <div style={{padding: "10px"}} class="csscontainer">
      {error ? (<p>{t.dataFailed}</p>):(<>
      {loading ? (<Customspinner variant="Bounce"/>):(
      <Table hover>
        <thead>
          <tr>
            <th><h2>{t.items}</h2></th>
            <th style={{ textAlign: 'right' }}>
              <Button onClick={itemFilter}>{showOnlyRequired ? <><span className="respButton">{t.itemsFilterAll}  </span><Icon path={mdiCheckAll} size={1}/></> : <><span className="respButton">{t.itemsFilterOnlyRequired}  </span><Icon path={mdiFilter} size={1}/></>}</Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td style={{ textDecoration: item.required ? ("none") : ("line-through") }}>{item.name}</td>
              <td style={{ textAlign: 'right' }}>
                {item.required ? (
                  <Button variant="outline-primary" onClick={() => {setItemAsPurchased(item.id); setPurchasingItemId(item.id)}}>{purchasingItem && purchasingItemId === item.id ? (<Spinner animation="border" role="status" size="sm"></Spinner>) : (<><span className="respButton">{t.setAsBought}  </span><span><Icon size={1} path={mdiCartArrowDown}/></span></>)}</Button>
                ):(
                  <Button variant="outline-success" disabled><span className="respButton">{t.boughtIndicator}  </span><span className="onlyIcon"><Icon size={1} path={mdiCheck}></Icon></span></Button>
                )} 
                <Button variant="outline-danger" onClick={() => {deleteItem(item.id); setDeletingItemId(item.id)}}>{deletingItem && deletingItemId === item.id ? (<Spinner animation="border" role="status" size="sm"></Spinner>) : (<><span className="respButton">{t.delete}  </span><span className="onlyIcon"><Icon size={1} path={mdiTrashCanOutline}/></span></>)}</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>)}</>)}
      <Modal show={showModal} onHide={closeModal} className={props.dark ? "darkk" : null}>
        <Modal.Header>
          <Modal.Title>{t.addNewItem}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control type="text" placeholder={t.itemName} value={newItemName} onChange={(input) => setNewItemName(input.target.value)} autoFocus/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>{t.close}</Button>
          <Button variant="primary" onClick={addItem} disabled={newItemName.trim() === ''}> {addingItem ? (<Spinner animation="border" role="status" size="sm"></Spinner>):(<>{t.add}</>)}</Button>
        </Modal.Footer>
      </Modal>
      {loading ? (null) : (
      <Button variant="success" onClick={openModal} style={{margin: "5px 0 10px"}}>
        <Icon path={mdiPlus} size={1} /> {t.addNewItem}
      </Button>)}
    </div>
  );
}

export default Items;