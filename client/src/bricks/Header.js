import React from "react"
import { Dropdown, DropdownButton, Stack, Button } from 'react-bootstrap'
import { useTranslation } from './Translation'
import Icon from '@mdi/react';
import { mdiTranslate, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';



function Header(props) {

    const { t, changeLanguage } = useTranslation()

    const changeT = (newLanguage) => {
      changeLanguage(newLanguage)
    };


    return (
        <Stack direction="horizontal">
            <h1 className="Name">Shop.io</h1>
            <DropdownButton title={<span><Icon path={mdiTranslate} size={1} /> {t.language}</span>} className="ms-auto" style={{margin: "20px 0"}}>
                <Dropdown.Item onClick={() => changeT('en')}>EN | {t.english}</Dropdown.Item>
                <Dropdown.Item onClick={() => changeT('cz')}>CZ | {t.czech}</Dropdown.Item>
                <Dropdown.Item onClick={() => changeT('de')}>DE | {t.german}</Dropdown.Item>
            </DropdownButton>
            <Button variant="outline-secondary" className="p-2 " style={{margin: "20px"}} onClick={() => props.switchMode()}>
                <Icon path={props.dark ? mdiWeatherSunny : mdiWeatherNight } size={1} />
            </Button>
        </Stack>
        )
}
 
export default Header