import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import MoonLoader from "react-spinners/MoonLoader";

function Spinner(props) {

    return(
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding:"20px"}}>
            {props.variant === "Bounce" ? (<BounceLoader color="gray"/>):(<MoonLoader color="blue" size={150} speedMultiplier={0.7}/>)}
        </div>
    )
}

export default Spinner