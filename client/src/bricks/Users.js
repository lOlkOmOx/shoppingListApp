import React, { useState } from "react";
import { Card, Button, Stack } from "react-bootstrap"
import usersMockup from "../data/usersDataMockup"
import ChooseUser from "./ChooseUser";

function Users(props) {
    const owner = usersMockup.filter(user => user.role === 'owner'); 
    const [invitedUsers, setInvitedUsers] = useState(usersMockup.filter(user => user.role === 'user')); 
    const [otherUsers, setOtherUsers] = useState(usersMockup.filter(user => user.role === 'none')); 

    const removeUser = (userId) => {
        const newInvitedUsers = invitedUsers.filter(user => user.id !== userId);
        setInvitedUsers(newInvitedUsers);
        const removedUser = invitedUsers.find(user => user.id === userId);
        setOtherUsers(oldOtherUsers => [...oldOtherUsers, removedUser]);
    };

    const addUser = (userId) => {
        const newOtherUsers = otherUsers.filter(user => user.id !== userId);
        setOtherUsers(newOtherUsers);
        const addedUser = otherUsers.find(user => user.id === userId);
        setInvitedUsers(oldInvitedUsers => [...oldInvitedUsers, addedUser]);
    };

    return (
        <div>
            <div class="csscontainer" style={{padding: "10px", marginTop: "5px"}}>
                <h4>Uživatelé</h4>
                    <Stack direction="horizontal" className="flex-wrap">    
                        <div className="p-2"> 
                            {owner.map(owner => (
                                <div key={owner.id}>
                                    <Card border="primary" style={{ width: '18rem', marginBottom: '20px' }}>
                                        <Card.Img variant="top" src={owner.img} />
                                        <Card.Body>
                                            <Card.Title>{owner.name} {owner.surname}</Card.Title>
                                            <Button variant="info" disabled>Majitel seznamu</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                        {invitedUsers.map(invited => (
                            <div key={invited.id} className="p-2" >
                                <Card border="secondary" style={{ width: '18rem', marginBottom: '20px' }}>
                                    <Card.Img variant="top" src={invited.img} />
                                    <Card.Body>
                                        <Card.Title>{invited.name} {invited.surname}</Card.Title>
                                        {props.owner ? (<Button variant="danger" onClick={() => removeUser(invited.id)}>Odebrat uživatele</Button>) : (<Button variant="secondary" disabled>Člen</Button>) }
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Stack>
            </div>
            <ChooseUser otherUsers={otherUsers} onAddUser={addUser} owner={props.owner} onClose={props.onClose}/>
        </div>
    );
}

export default Users;