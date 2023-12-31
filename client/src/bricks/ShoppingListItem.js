import React, {useState} from "react";
import Icon from '@mdi/react';
import { mdiAccount, mdiOpenInNew, mdiArchiveOutline, mdiTrashCanOutline, mdiArchiveCancelOutline } from '@mdi/js';
import usersDataMockup from "../data/usersDataMockup";
import Preview from "./Preview"
import Show from "./Show"
import { Button, Card, Stack, Modal, Spinner } from "react-bootstrap"
import { useTranslation } from './Translation';

function ShoppingListItem(props)  {

    const [showPreview, setShowPreview] = useState(false);
    const [showShow, setShowShow] = useState(false);

    const owner = usersDataMockup.find(user => user.id === props.shoppingList.ownerId);
    const ownerName =  `${owner.name} ${owner.surname}`
    const [showModal, setShowModal] = useState(false);

    const [archivingItemId, setArchivingItemId] = useState(null);
    const { t } = useTranslation()

 return( 
    <div>
    <Card className="respCard">
    <Card.Body>
        <Card.Title className="underlined">
            <h3>{props.shoppingList.name}</h3>
        </Card.Title>

        <div style={{ paddingBottom: "5px"}} className="underlined">
            <Icon path={mdiAccount} size={1} color="darkgrey"/> {ownerName}
        </div>

        <ul style={{ paddingTop: "5px"}} className="underlined">
            {props.shoppingList.items.slice(0, 3).map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
            <li>...</li>
        </ul>
            {!props.shoppingList.archived ? (
                <Stack direction="horizontal" gap={2}>
                    {props.shoppingList.ownerId === props.userId ? ( 
                        <Stack direction="horizontal" gap={2}>
                            <Button variant="primary" className="p-2" onClick={() => setShowShow(true)}><span className="rText">{t.show}</span><span className="rIcon"><Icon path={mdiOpenInNew} size={1}/></span></Button>
                                {showShow ? ( 
                                    <Show dark={props.dark} shoppingList={props.shoppingList} ownerName={ownerName} owner={true} onClose={() => setShowShow(false)} onListNameChange={props.onListNameChange}/>
                                ) : (null)}
                            <Button variant="outline-secondary" className="p-2" onClick={() => {setArchivingItemId(props.shoppingList.id); props.onArchive() }}>{props.archiving && archivingItemId === props.shoppingList.id ? (<Spinner animation="border" role="status" size="sm"></Spinner>) : (<><span className="rText">{t.archive}</span><span className="rIcon"><Icon path={mdiArchiveOutline} size={1}/></span></>)}</Button>
                            <Button variant="outline-danger" className="p-2" onClick={() => setShowModal(true)}><span className="rText">{t.delete}</span><span className="rIcon"><Icon path={mdiTrashCanOutline} size={1}/></span></Button></Stack> 
                    ) : (
                        <div>
                            <Button variant="primary" className="p-2" onClick={() => setShowShow(true)}>{t.show}</Button>
                                {showShow ? ( 
                                    <Show dark={props.dark} shoppingList={props.shoppingList} ownerName={ownerName} owner={false} onClose={() => setShowShow(false)} />
                                ) : (null)}
                        </div>
                    )}
                </Stack> 
            ) : (
                props.shoppingList.ownerId === props.userId ? (     
                    <Stack direction="horizontal" gap={2}>
                        <Button variant="outline-secondary" onClick={() => setShowPreview(true)}><span className="rText">{t.preview}</span><span className="rIcon"><Icon path={mdiOpenInNew} size={1}/></span></Button>
                            {showPreview ? ( 
                                <Preview dark={props.dark} shoppingList={props.shoppingList} ownerName={ownerName} owner={true} onClose={() => setShowPreview(false)} />
                            ) : (null)}
                        <Button variant="outline-secondary" className="p-2" onClick={() => {setArchivingItemId(props.shoppingList.id); props.onUnArchive() }}>{props.archiving && archivingItemId === props.shoppingList.id ? (<Spinner animation="border" role="status" size="sm"></Spinner>) : (<><span className="rText">{t.reactivate}</span><span className="rIcon"><Icon path={mdiArchiveCancelOutline} size={1}/></span></>)}</Button>
                        <Button variant="outline-danger" className="p-2" onClick={() => setShowModal(true)}><Icon path={mdiTrashCanOutline} size={1}/></Button>
                    </Stack>  
                ) : (
                    <div>
                        <Button variant="outline-secondary" onClick={() => setShowPreview(true)}>{t.preview}</Button>
                            {showPreview ? ( 
                                <Preview dark={props.dark} shoppingList={props.shoppingList} ownerName={ownerName} owner={false} onClose={() => setShowPreview(false)} />
                            ) : (null)}
                    </div>
                )
            )}
           
    </Card.Body>
    </Card> 
    <Modal show={showModal} onHide={() => setShowModal(false)} className={props.dark ? "darkk" : null}>
        <Modal.Header >
            <Modal.Title>{t.deleteConfirmHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>{t.deleteConfirmText1}</p>
            <p>{t.deleteConfirmText2}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>{t.cancel}</Button>
            <Button variant="danger" onClick={props.onDelete}>
            {props.deleting ? (
                    <Spinner animation="border" role="status" size="sm"></Spinner>
                ) : (
                    <>{t.delete}</>
                )}</Button>
        </Modal.Footer>
    </Modal>
    </div>
 )
}


export default ShoppingListItem