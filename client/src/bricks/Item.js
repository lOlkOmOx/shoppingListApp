import React, { useState } from "react";
import { Button, Table } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiCheckBold, mdiTrashCanOutline, mdiCircleMedium, mdiCartArrowDown } from '@mdi/js';

function Item(props) {
  const [purchasedItems, setPurchasedItems] = useState([]); //Již zakoupené položky
  const [clickedButtons, setClickedButtons] = useState([]);
  const [showOnlyRequired, setShowOnlyRequired] = useState(false); //Filtr položek

//Odebrání položky ze seznamu
  const deleteItem = (itemId) => {
  // Zobrazení položek kromě té odstraněné
      const updatedItems = props.shoppingListItems.items.filter(item => item.id !== itemId);
  // Poslání informace o smazání do rodičovské komponenty, aby se změnila v mockupu dat.
      props.removeItem(updatedItems);
  };

//Označení položky jako zakoupená
  const purchaseItem = (itemId) => {

  // Aktualizace seznamu zakoupených položek
    setPurchasedItems([...purchasedItems, itemId]);
    setClickedButtons([...clickedButtons, itemId]);

  // Aktualizace seznamu položek v nadřazené komponentě
    const updatedItems = props.shoppingListItems.items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          required: false, // Změna z true na false
        };
      }
      return item;
    });
    //Samotná aktualizace
    props.itemPurchase(updatedItems);
  };

//Filtrování položek  
  const itemFilter = () => {
    setShowOnlyRequired(!showOnlyRequired);
  };

  const filteredItems = showOnlyRequired
    ? props.shoppingListItems.items.filter(item => item.required)
    : props.shoppingListItems.items;

  return (
    <div style={{padding: "10px"}} class="csscontainer">
      <Table hover>
        <thead style={{backgroundColor: "lightGray"}}>
          <tr>
            <th><h2 style={{fontWeight: "bold"}}>Položky</h2></th>
            <th style={{ textAlign: 'right' }}>      
                <Button variant="primary" onClick={itemFilter}>
                {showOnlyRequired ? "Zobrazit všechny položky" : "Zobrazit pouze potřebné položky"}
                </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id} style={{ textDecoration: purchasedItems.includes(item.id) ? 'line-through' : 'none' }}>
              <td>
              <h4> {item.required ? <Icon path={mdiCircleMedium} size={1} /> : <Icon path={mdiCartArrowDown} size={1} />} {item.name}</h4>
              </td>
              <td style={{ textAlign: 'right' }}>
                {!clickedButtons.includes(item.id) && (
                  <>
                    <Button variant="outline-primary" onClick={() => purchaseItem(item.id)} style={{marginRight: "5px"}}>
                    <Icon path={mdiCheckBold} size={1} /> Zakoupeno
                    </Button>
                  </>
                )}
                <Button variant="outline-danger" onClick={() => deleteItem(item.id)} style={{marginRight: "5px"}}> <Icon path={mdiTrashCanOutline} size={1} /> Odstranit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Item;