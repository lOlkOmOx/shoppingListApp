import React, { useState, useEffect } from "react";
import dataMockup from "../data/dataMockup";
import ShoppingListItem from "./ShoppingListItem";
import { Stack, Button, Tab, Tabs, Modal, Form, FloatingLabel, Spinner } from "react-bootstrap"
import Customspinner from "./Spinner"
import { useTranslation } from './Translation';


function ShoppingLists(props) {

    const [shoppingList, setShoppingList] = useState([]);

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { t } = useTranslation()
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await new Promise((resolve) => {
                    setTimeout(() => {
                    resolve(dataMockup)
                    }, 3000)})
                setShoppingList(response)
                setLoading(false)
            } catch (error) {
                setError(error)
              setLoading(false)
            }}
        fetchData()
    }, [])

    const fakeServerRequest = (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {resolve("OK")}, 1000);
        });
    };

//Mazání seznamu
    const [deletingList, setDeletingList] = useState(false);
    const deleteList = async (id) => {
        try {
            setDeletingList(true)
            await fakeServerRequest()
            const updatedLists = shoppingList.filter(list => list.id !== id)
            setShoppingList(updatedLists)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setDeletingList(false)
            setShowModal(false)
            }
    }

//Archivování seznamu
    const [archivingList, setArchivingList] = useState(false)
    const archiveList = async (id) => {
        try {
            setArchivingList(true)
            await fakeServerRequest()
            const updatedLists = shoppingList.map(list => {if (list.id === id) {return {...list, archived: true}} return list})
            setShoppingList(updatedLists)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setArchivingList(false)
        }
    }

//Reaktivování seznamu
    const unArchiveList = async (id) => {
        try {
            setArchivingList(true)
            await fakeServerRequest()
            const updatedLists = shoppingList.map(list => {if (list.id === id) {return {...list, archived: false}} return list})
            setShoppingList(updatedLists)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setArchivingList(false)
        }
    }

//Vytváření nového seznamu
    const [showModal, setShowModal] = useState(false)
    const [newListName, setNewListName] = useState("")
    const [creatingList, setCreatingList] = useState(false)
    const createNewList = async () => {
        try {
            setCreatingList(true)
            await fakeServerRequest()
            const newList = {id: shoppingList.length + 1, name: newListName, ownerId: props.userId, usersIds: [], archived: false, items: []}
            setShoppingList([...shoppingList, newList])
            setShowModal(false)
            setNewListName("")
            setCreatingList(false)
        } catch (error) {
            console.error('Error:', error)
        } 
    }

//Přejmenování seznamu
    const renameList = async (listId, newName) => {
        try {
            await fakeServerRequest()
            const updatedLists = shoppingList.map(list => {if (list.id === listId) {return { ...list, name: newName }} return list})
            setShoppingList(updatedLists)
        } catch (error) {
            console.error('Error:', error)
        } 
    }

    return(
        <div className="csscontainer" style={{padding: "20px"}}>
            {error ? (<p>{t.dataFailed}</p>) : (<>
            
            {loading ? (<Customspinner variant={"Bounce"} />) : (   
            <Tabs defaultActiveKey="all" className="mb-3" fill justify>
                <Tab eventKey="all" title={t.activeShoppingLists}>
                    <Stack direction="horizontal" gap={3} className="flex-wrap">
                        {shoppingList.map(list => (
                            !list.archived ? (
                                (list.ownerId === props.userId || list.usersIds.includes(props.userId)) ? (
                                    <ShoppingListItem 
                                        shoppingList={list} 
                                        userId={props.userId} 
                                        key={list.id} 
                                        onDelete={() => deleteList(list.id)} 
                                        onArchive={() => archiveList(list.id)}
                                        onListNameChange={newName => renameList(list.id, newName)}
                                        deleting={deletingList}
                                        archiving={archivingList}
                                        dark={props.dark}
                                        />
                                ) : (null)
                            ) : (null)
                        ))}
                    </Stack>
                </Tab>
                <Tab eventKey="archiv" title={t.archivedShoppingLists}>
                    <Stack direction="horizontal" gap={3} className="flex-wrap">
                        {shoppingList.map(list => (
                            list.archived ? (
                                (list.ownerId === props.userId || list.usersIds.includes(props.userId)) ? (
                                    <ShoppingListItem 
                                        shoppingList={list} 
                                        userId={props.userId} 
                                        key={list.id} 
                                        onDelete={() => deleteList(list.id)}
                                        onUnArchive={() => unArchiveList(list.id)}
                                        deleting={deletingList}
                                        archiving={archivingList}
                                        dark={props.dark}
                                        />
                                ) : (null)
                            ) : (null)
                        ))}
                    </Stack>
                </Tab>
            </Tabs>)}</>)}

    {loading || error ? (null):(<Button variant="success" style={{marginTop: "10px"}} onClick={() => setShowModal(true)}>{t.newShoppingList}</Button>)}
    <Modal show={showModal} onHide={() => setShowModal(false)} className={props.dark ? "darkk" : null}>
        <Modal.Header >
            <Modal.Title>{t.newShoppingList}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Control type="text" placeholder={t.setName} value={newListName} onChange={(e) => setNewListName(e.target.value)}   />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>{t.cancel}</Button>
            <Button variant="success" onClick={createNewList} disabled={newListName.trim() === ''}>{creatingList ? (<Spinner animation="border" role="status" size="sm"></Spinner>):(<>{t.save}</>)}</Button>
        </Modal.Footer>
    </Modal>
    </div>
    )
}

export default ShoppingLists