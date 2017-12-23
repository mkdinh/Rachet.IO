import React from "react";
import { Form } from "semantic-ui-react";
import ScaleForm from "./ScaleForm";
import AxesForm from "./AxesForm";

const style = {
    form: { margin: "1rem 0" }
}

export const PieOptions = (props) => 
    <Form style={style.form}>
        <ScaleForm disabled={props.disabled} header="Radius" name="radius" {...props}/>
        <ScaleForm disabled={props.disabled} header="innerRadius" name="innerRadius" {...props}/>
    </Form>

