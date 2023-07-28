import React from 'react';
import Options from "./Options";
import {useOrderDetails} from "../../contexts/OrderDetails";
import {formatCurrency} from "../../util";
import Button from "react-bootstrap/Button";

// eslint-disable-next-line react/prop-types
function OrderEntry({setOrderPhase}) {
    const {totals} = useOrderDetails()
    return (
        <div>
            <Options optionType='scoops'/>
            <Options optionType='toppings'/>
            <h2>Grand total: {formatCurrency( totals.scoops + totals.toppings)}</h2>
            <Button onClick={() => setOrderPhase("review")} disabled={totals.scoops===0}>Order Sundae!</Button>
        </div>
    );
}

export default OrderEntry;