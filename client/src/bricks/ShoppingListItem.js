import React, {useState} from "react";
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import usersDataMockup from "../data/usersDataMockup";
import Preview from "./Preview"
import Show from "./Show"
import { Button, Card, Stack, Modal } from "react-bootstrap"

function ShoppingListItem(props)  {

    const [showPreview, setShowPreview] = useState(false);
    const [showShow, setShowShow] = useState(false);

    const owner = usersDataMockup.find(user => user.id === props.shoppingList.ownerId);
    const ownerName =  `${owner.name} ${owner.surname}`
    const [showModal, setShowModal] = useState(false);

 return( 
    <div>
    <Card style={{ width: '20rem'}}>
    <Card.Body>
        <Card.Title style={{borderBottom: "solid lightgray 1px"}}>
            <h3>{props.shoppingList.name}</h3>
        </Card.Title>

        <div style={{borderBottom: "solid lightgray 1px", paddingBottom: "5px"}}>
            <Icon path={mdiAccount} size={1} color="black"/> {ownerName}
        </div>

        <ul style={{borderBottom: "solid lightgray 1px", paddingTop: "5px"}}>
            {props.shoppingList.items.slice(0, 3).map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
            <li>...</li>
        </ul>
            {!props.shoppingList.archived ? (
                <Stack direction="horizontal" gap={2}>
                    {props.shoppingList.ownerId === props.userId ? ( 
                        <Stack direction="horizontal" gap={2}>
                            <Button variant="primary" className="p-2" onClick={() => setShowShow(true)}>Zobrazit</Button>
                                {showShow ? ( 
                                    <Show shoppingList={props.shoppingList} ownerName={ownerName} owner={true} onClose={() => setShowShow(false)} onListNameChange={props.onListNameChange}/>
                                ) : (null)}
                            <Button variant="outline-secondary" className="p-2"onClick={props.onArchive}>Archivovat</Button>
                            <Button variant="outline-danger" className="p-2" onClick={() => setShowModal(true)}>Smazat</Button></Stack> 
                    ) : (
                        <div>
                            <Button variant="primary" className="p-2" onClick={() => setShowShow(true)}>Zobrazit</Button>
                                {showShow ? ( 
                                    <Show shoppingList={props.shoppingList} ownerName={ownerName} owner={false} onClose={() => setShowShow(false)} />
                                ) : (null)}
                        </div>
                    )}
                </Stack> 
            ) : (
                props.shoppingList.ownerId === props.userId ? (     
                    <Stack direction="horizontal" gap={2}>
                        <Button variant="outline-secondary" onClick={() => setShowPreview(true)}>Náhled</Button>
                            {showPreview ? ( 
                                <Preview shoppingList={props.shoppingList} ownerName={ownerName} owner={true} onClose={() => setShowPreview(false)} />
                            ) : (null)}
                        <Button variant="outline-secondary" className="p-2"onClick={props.onUnArchive}>Reaktivovat</Button>
                        <Button variant="outline-danger" className="p-2" onClick={() => setShowModal(true)}>Smazat</Button>
                    </Stack>  
                ) : (
                    <div>
                        <Button variant="outline-secondary" onClick={() => setShowPreview(true)}>Náhled</Button>
                            {showPreview ? ( 
                                <Preview shoppingList={props.shoppingList} ownerName={ownerName} owner={false} onClose={() => setShowPreview(false)} />
                            ) : (null)}
                    </div>
                )
            )}
           
    </Card.Body>
    </Card>   
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header >
            <Modal.Title>Potvrzení smazání</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Opravdu chcete smazat tento nákupní seznam?
            Tato akce je nevratná.
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Zrušit</Button>
            <Button variant="danger" onClick={props.onDelete}>Smazat</Button>
        </Modal.Footer>
    </Modal>  
    </div>
 )
}


export default ShoppingListItem