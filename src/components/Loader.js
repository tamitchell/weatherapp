import * as React from "react";
import { Spinner } from 'reactstrap';


export const Loader = () => {
    return (
        <span className="container loader-wrapper">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />

        <p>Gathering Local Weather Data...</p>
        </span>
    )
}
