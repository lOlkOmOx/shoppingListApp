import React, {useState} from "react";
import userDataMockup from '../data/usersDataMockup'
import ShoppingLists from "./ShoppingLists";
import { Form, Stack } from "react-bootstrap"

function Home () {

const [userId, setUserId] = useState("100")

const changeUser = (id) => {
  console.log("Vybraný uživatel:", id.target.value)
  setUserId(id.target.value)
}

    return(
        <div style={{margin: "20px"}}>
          <div className="csscontainer" style={{padding:"20px"}}>
            <h1>Zvol uživatele aplikace</h1> 
              <Stack direction="horizontal" fill gap={5}>
                <Form.Select onChange={changeUser} value={userId}>
                  {userDataMockup.map(user => (
                  <option key={user.id} value={user.id}>{user.name} {user.surname}, ID: {user.id}</option>
                  ))}
                </Form.Select>
              </Stack>
          </div>
          <ShoppingLists userId={userId}/>
        </div>
    )
}

export default Home