import React from "react";
import { Header, List } from "semantic-ui-react";
import ChoiceItem from "./ChoiceItem";

const style = {
    list: { overflow: "scroll", maxHeight: "30vh", margin: "0.5rem 0 0 0" },
    wrapper: { margin: "1rem 0 0" },
    header: { margin: "0 0 0.25rem 0" }    
}


export const ChoiceList = (props) => {
    const data = props.data || [];
    return (
        <div style={style.wrapper}>
            <Header style={style.header} content="Choices"/>
            <List style={style.list} divided animated>  
                {data.map(item => 
                    <ChoiceItem 
                    disabled={props.disabled}
                    key={item.id} 
                    item={item}
                    handleRemoveChoice={props.handleRemoveChoice}
                    handleUpdateChoice={props.handleUpdateChoice} />
                )}
            </List>
        </div>
    )
}