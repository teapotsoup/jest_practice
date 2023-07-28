import React from 'react';
import Alert from "react-bootstrap/Alert";

// eslint-disable-next-line react/prop-types
function AlertBanner({message, variant}) {
    const alertMessage = message || 'error spotted'
    const alertVariant = variant || 'danger'
    return (
        <Alert variant={alertVariant} style={{backgroundColor:'red'}}>
            {alertMessage}
        </Alert>
    );
}

export default AlertBanner;