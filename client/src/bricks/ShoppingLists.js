import React, { useState } from "react";
import dataMockup from "../data/dataMockup";
import ShoppingListItem from "./ShoppingListItem";
import { Stack, Button, Tab, Tabs, Modal, Form, FloatingLabel } from "react-bootstrap"

function ShoppingLists(props) {
    const [shoppingList, setShoppingList] = useState(dataMockup);
    const deleteList = (id) => {
        const updatedLists = shoppingList.filter(list => list.id !== id);
        setShoppingList(updatedLists);
    };

    const archiveList = (id) => {
        const updatedLists = shoppingList.map(list => {
            if (list.id === id) { 
                return {...list, archived: true}
            }
            return list
        })
        setShoppingList(updatedLists);
    }

    const unArchiveList = (id) => {
        const updatedLists = shoppingList.map(list => {
            if (list.id === id) {
                return {...list, archived: false}
            }
            return list
        })
        setShoppingList(updatedLists);
    }

    const [showModal, setShowModal] = useState(false);

    const [newListName, setNewListName] = useState("");

    const createNewList = () => {
        const newList = {
          id: shoppingList.length + 1,
          name: newListName,
          ownerId: props.userId,
          usersIds: [], 
          archived: false,
          items: []
        };
    
        setShoppingList([...shoppingList, newList]);
        setShowModal(false);
        setNewListName("");
      };

    const renameList = (listId, newName) => {
        const updatedLists = shoppingList.map(list => {
          if (list.id === listId) {
            return { ...list, name: newName };
          }
          return list;
        });
        setShoppingList(updatedLists);
      };

    return(
        <div className="csscontainer" style={{padding: "20px"}}>
            <h1 style={{textAlign: "center", marginBottom: "40px"}}>Shop.io app</h1>
            <Tabs defaultActiveKey="all" className="mb-3" fill justify>
                <Tab eventKey="all" title="Nákupní seznamy">
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
                                    />
                                ) : (null)
                            ) : (null)
                        ))}
                    </Stack>
                </Tab>
                <Tab eventKey="archiv" title="Archivované seznamy">
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
                                    />
                                ) : (null)
                            ) : (null)
                        ))}
                    </Stack>
                </Tab>
            </Tabs>

    <Button variant="success" style={{marginTop: "10px"}} onClick={() => setShowModal(true)}>Vytvořit nový seznam</Button>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header >
            <Modal.Title>Nový seznam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel controlId="floatingInput" label="Název seznamu" className="mb-3">
            <Form.Control type="text" placeholder="Název seznamu" value={newListName} onChange={(e) => setNewListName(e.target.value)}   />
        </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Zrušit</Button>
            <Button variant="success" onClick={createNewList} disabled={newListName.trim() === ''}>Vytvořit</Button>
        </Modal.Footer>
    </Modal>
    </div>
    )
}

export default ShoppingLists