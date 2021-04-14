import React from "react";
const Friend = (props)=>{
    const{webId} = props;

    return (
        <div id = "info">
            <p>{webId}</p>
            </div>
    );

}
export default Friend;