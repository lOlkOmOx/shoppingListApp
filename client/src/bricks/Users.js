import React, { useState, useEffect } from "react";
import { Card, Button, Stack, Spinner } from "react-bootstrap"
import usersMockup from "../data/usersDataMockup"
import ChooseUser from "./ChooseUser";
import Customspinner from "./Spinner"
import { useTranslation } from './Translation';

function Users(props) {

    const { t } = useTranslation()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await new Promise((resolve) => {setTimeout(() => {resolve()}, 1000)
          })
          setLoading(false)
        } catch (error) {
          setError(error)
          setLoading(false)
        }
      }
      fetchData()
    }, [])

    const owner = usersMockup.filter(user => user.role === 'owner')
    const [invitedUsers, setInvitedUsers] = useState(usersMockup.filter(user => user.role === 'user'))
    const [otherUsers, setOtherUsers] = useState(usersMockup.filter(user => user.role === 'none'))

//Přidávání uživatele
    const addUser = (userId) => {
        const newOtherUsers = otherUsers.filter(user => user.id !== userId)
        setOtherUsers(newOtherUsers)
        const addedUser = otherUsers.find(user => user.id === userId)
        setInvitedUsers(oldInvitedUsers => [...oldInvitedUsers, addedUser])
    }

    const fakeServerRequest = () => {
        return new Promise((resolve) => {setTimeout(() => {resolve("OK")}, 1000)})}

//Odebírání uživatele
    const [removingUser, setRemovingUser] = useState(false)
    const [removingUserId, setRemovingUserId] = useState(null)
    const removeUser = async (userId) => {
        try {
          setRemovingUser(true)
          await fakeServerRequest()
          const newInvitedUsers = invitedUsers.filter(user => user.id !== userId);
          setInvitedUsers(newInvitedUsers);
          const removedUser = invitedUsers.find(user => user.id === userId);
          setOtherUsers(oldOtherUsers => [...oldOtherUsers, removedUser]);
          setRemovingUser(false)
        } catch (error) {
          console.error('Error:', error);
        } 
    }

    return (
        <div class="csscontainer" style={{padding: "10px", marginTop: "5px"}}>
            {error ? (<p>{t.dataFailed}</p>):(<>
            {loading ? (null) : (
            <div >
                <h4>{t.users}</h4>
                    <Stack direction="horizontal" className="flex-wrap">    
                        <div className="p-2"> 
                            {owner.map(owner => (
                                <div key={owner.id}>
                                    <Card border="primary" className="respCard">
                                        <Card.Img variant="top" src={owner.img} className="CardIMG"/>
                                        <Card.Body>
                                            <Card.Title>{owner.name} {owner.surname}</Card.Title>
                                            <Button variant="info" disabled>{t.owner}</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                        {invitedUsers.map(invited => (
                            <div key={invited.id} className="p-2" >
                                <Card border="secondary" className="respCard">
                                    <Card.Img variant="top" src={invited.img} className="CardIMG"/>
                                    <Card.Body>
                                        <Card.Title>{invited.name} {invited.surname}</Card.Title>
                                        {props.owner ? (<Button variant="danger" onClick={() => {removeUser(invited.id); setRemovingUserId(invited.id)}}>{removingUser && removingUserId === invited.id ? (<Spinner animation="border" role="status" size="sm"></Spinner>) : (<>{t.removeUser}</>)}</Button>) : (<Button variant="secondary" disabled>{t.userIndicator}</Button>) }
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Stack>
                 <ChooseUser otherUsers={otherUsers} onAddUser={addUser} owner={props.owner} onClose={props.onClose} dark={props.dark}/>   
            </div>)}</>)}
            
        </div>
    );
}

export default Users;