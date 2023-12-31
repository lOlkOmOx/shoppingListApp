import React, {useState, useEffect} from "react";
import userDataMockup from '../data/usersDataMockup'
import ShoppingLists from "./ShoppingLists";
import { Form, Stack } from "react-bootstrap"
import Customspinner from "./Spinner"
import { useTranslation } from './Translation';

function Home (props) {

const { t } = useTranslation()

const [userId, setUserId] = useState("100")

const changeUser = (id) => {
  setUserId(id.target.value)
}
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(userDataMockup)
          }, 2000);
        });
        setData(response)
        setLoading(false)
      } catch (error) {
        setError(error)
        console.log(error)
        setLoading(false)
      }
    };
    fetchData()
  }, [])

    return(
        <div style={{margin: "20px"}}>
          <div className="csscontainer" style={{padding:"20px"}}>
            <h1>{t.changeUser}</h1> 
            {loading ? (<Customspinner variant={"Bounce"} />) : (
              <Stack direction="horizontal" fill gap={5}>
              {error ? (<p>{t.dataFailed}</p>) : (
                <Form.Select onChange={changeUser} value={userId}>
                  {data.map(user => (
                  <option key={user.id} value={user.id}>{user.name} {user.surname}, ID: {user.id}</option>
                  ))}
                </Form.Select>)}
              </Stack>
            )}
          </div>
          <ShoppingLists userId={userId} dark={props.dark}/>
        </div>
    )
}

export default Home