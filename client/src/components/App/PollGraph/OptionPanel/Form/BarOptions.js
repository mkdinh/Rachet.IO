import React from "react";
import { Form } from "semantic-ui-react";
import ScaleForm from "./ScaleForm";
import AxesForm from "./AxesForm";

const style = {
    form: { margin: "1rem 0" }
}

export const BarOptions = (props) => 
    <Form style={style.form}>
        <ScaleForm disabled={props.disabled} header="Height" name="height" {...props}/>
        <ScaleForm disabled={props.disabled} header="Width" name="width" {...props}/>
        <AxesForm disabled={props.disabled} {...props}/>
    </Form>

