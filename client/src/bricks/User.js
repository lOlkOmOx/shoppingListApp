import React, { useState } from "react";
import { Card, Button, Stack } from "react-bootstrap"
import ChooseUser from "./ChooseUser";


function User(props) {
    const usersMockup = [
        {    
            id: "1",
            name: "Adélaaaa",
            surname: "Flanderková",
            role: "owner",
            img: "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=1380&t=st=1699686446~exp=1699687046~hmac=ccba31b12cf8eca085e5190e8995db8846f9447e97a96dd5119f7b2d9f1a32e2"
        },
        {   
            id: "2",
            name: "Olina",
            surname: "Nová",
            role: "user",
            img: "https://img.freepik.com/free-vector/illustration-businesswoman_53876-5857.jpg?w=1380&t=st=1699686470~exp=1699687070~hmac=03866506b976fb3efa4348319bbffa9590632cbf2cc00ceb5a00c632c41e91d4"
        },
        {   
            id: "3",
            name: "Naděžda",
            surname: "Radová",
            role: "user",
            img: "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5908.jpg?w=1380&t=st=1699686488~exp=1699687088~hmac=c76cc9cbfbd5baaeda93876b6119a7ba3483c3d99fc89beec929e6c23446b903"
        },
        {   
            id: "4",
            name: "Jan",
            surname: "Šedivý",
            role: "user",
            img: "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=1380&t=st=1699686446~exp=1699687046~hmac=ccba31b12cf8eca085e5190e8995db8846f9447e97a96dd5119f7b2d9f1a32e2"
        },
        {   
            id: "5",
            name: "Nazařazený",
            surname: "uživatel",
            role: "none",
            img: "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=1380&t=st=1699686446~exp=1699687046~hmac=ccba31b12cf8eca085e5190e8995db8846f9447e97a96dd5119f7b2d9f1a32e2"
        },
        {   
            id: "6",
            name: "Michaela",
            surname: "Čermáková",
            role: "user",
            img: "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5908.jpg?w=1380&t=st=1699686488~exp=1699687088~hmac=c76cc9cbfbd5baaeda93876b6119a7ba3483c3d99fc89beec929e6c23446b903"
        },
        {   
            id: "7",
            name: "Miroslav",
            surname: "Divný",
            role: "user",
            img: "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=1380&t=st=1699686446~exp=1699687046~hmac=ccba31b12cf8eca085e5190e8995db8846f9447e97a96dd5119f7b2d9f1a32e2"
        },
        {   
            id: "8",
            name: "Stanislav",
            surname: "Tuček",
            role: "user",
            img: "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=1380&t=st=1699686446~exp=1699687046~hmac=ccba31b12cf8eca085e5190e8995db8846f9447e97a96dd5119f7b2d9f1a32e2"
        },
    ];

    const owner = usersMockup.filter(user => user.role === 'owner'); //Zjištění majitele seznamu
    const [invitedUsers, setInvitedUsers] = useState(usersMockup.filter(user => user.role === 'user')); //Seznam pozvaných uživatelů
    const [otherUsers, setOtherUsers] = useState(usersMockup.filter(user => user.role === 'none')); //Seznam volných uživatelů

//Odebrání člena
    const removeUser = (userId) => {

        const newInvitedUsers = invitedUsers.filter(user => user.id !== userId);
        setInvitedUsers(newInvitedUsers);

        const removedUser = invitedUsers.find(user => user.id === userId);
        setOtherUsers(oldOtherUsers => [...oldOtherUsers, removedUser]);
    };

//Přidání člena
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
                        <div className="p-2"> {/*Vykreslení majitele seznamu na první pozici*/}
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
                    {/*Vykreslení pozvaných uživatelů*/}
                        {invitedUsers.map(invited => (
                            <div key={invited.id} className="p-2" >
                                <Card border="secondary" style={{ width: '18rem', marginBottom: '20px' }}>
                                    <Card.Img variant="top" src={invited.img} />
                                    <Card.Body>
                                        <Card.Title>{invited.name} {invited.surname}</Card.Title>
                                        {props.role === "Majitel" ? (<Button variant="danger" onClick={() => removeUser(invited.id)}>Odebrat uživatele</Button>) : (<Button variant="secondary" disabled>Člen</Button>) }
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Stack>
            </div>
            <ChooseUser otherUsers={otherUsers} onAddUser={addUser} role={props.role}/>
        </div>
    );
}

export default User;