import React from "react";
const Friend = (props)=>{
    const{name} = props;
    const{webId} = props;

    return (
        <div id = "info">
            <p>{name}</p>
            </div>
    );

}
export default Friend;