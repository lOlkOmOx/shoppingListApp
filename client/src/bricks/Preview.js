import React, {useEffect, useState} from "react"
import { Modal, Button } from 'react-bootstrap'
import Customspinner from './Spinner'
import { useTranslation } from './Translation';

function Preview(props) {
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => {setTimeout(() => {resolve()}, 1500)})
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

    return (
      <Modal show={true} onHide={props.onClose} centered className={props.dark ? "darkk" : null}>
        {error ? (<><Modal.Header/><Modal.Body><p>{t.dataFailed}</p></Modal.Body></>) : (<>
        {loading ? (<>
        <Modal.Header/>
        <Modal.Body>
        <Customspinner variant="Bounce"/>
        </Modal.Body>
        </>
        ) : (<>
        <Modal.Header>
          <Modal.Title>{t.previewHeader} {props.shoppingList.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{paddingBottom: "10px"}} className="underlined">{t.previewOwner} {props.ownerName} {props.owner ? (<>{t.previewYouSign}</>) : (null)}</h6>
          <h6>{t.items}:</h6>
            <ul style={{paddingBottom: "10px"}}>
              {props.shoppingList.items.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          {props.owner ? ( 
            <p style={{color: "Red"}}>{t.previewInfoOwner}</p>
            ):(
            <p style={{color: "Red"}}>{t.previewInfoUser1} {props.ownerName} {t.previewInfoUser2}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>{t.close}</Button>
        </Modal.Footer></>
        )}</>)}
      </Modal>
    );
  }

export default Preview