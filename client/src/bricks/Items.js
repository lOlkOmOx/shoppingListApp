import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Item from './Item'
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

function Items() {
  const [showModal, setModalShow] = useState(false); //Modalní okno, výchozí hodnota false
  const [newItemName, setNewItemName] = useState(""); //Ipnut v modálním okně pro přidání položky
  const [shoppingListItems, setShoppingListItems] = useState({ //Mockup dat
    items: [
      {
        id: "1",
        name: "5 kg brambor",
        required: true
      },
      {
        id: "2",
        name: "2 kostky máslo",
        required: true
      },
      {
        id: "3",
        name: "7 litrů mléka",
        required: true
      },
      {
        id: "4",
        name: "10 rohlíků",
        required: true
      },
      {
        id: "5",
        name: "1 chleba",
        required: true
      },
      {
        id: "6",
        name: "20 deka šunky",
        required: true
      },
    ],
  });

// Pomocné pro modalní okno
  const closeModal = () => setModalShow(false);
  const openModal = () => setModalShow(true);

// Přidání nové položky 
  const addItem = () => {
    const newItem = {
      id: Math.random().toString(),
      name: newItemName,
      required: true,
    }; 

// Aktualizace položek
    setShoppingListItems({
      items: [...shoppingListItems.items, newItem],
    });

// Uzavření modálu a promazání inputu
    closeModal();
    setNewItemName(""); //Promazání inputu na defaultní hodnotu
  };

// Fce pro odebrání položky z mockupu
  const removeItem = (updatedItems) => {
    setShoppingListItems({ items: updatedItems });
  };

// Fce pro označení položky required: false v mockupu
  const purchaseItem = (updatedItems) => {
    setShoppingListItems({
      items: updatedItems,
    });
  };

  return (
    <div>
    {/* Seznam položek - komponenta */}
      <Item shoppingListItems={shoppingListItems} removeItem={removeItem} itemPurchase={purchaseItem}/>
    {/* Modal s inputem pro přidání nové položky */}
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
          <Button variant="secondary" onClick={closeModal}>
            Zavřít
          </Button>
          <Button variant="primary" onClick={addItem}>
            Přidat
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="success" onClick={openModal} style={{margin: "5px 0 10px"}}>
        <Icon path={mdiPlus} size={1} /> Přidat novou položku
      </Button>
    </div>
  );
}

export default Items;