// import ContextApi from "../components/ContextApi";
import React from 'react';

const connectToContext = (context) => (mapContextToProps) => (Component)=>{
    return (
        <context.Consumer>
            {
                (contextValue) => {
                    console.log("context value:", contextValue);
                    let value = mapContextToProps(contextValue);
                    return <Component {...value}/>
                }
            }
        </context.Consumer>
    )
}

export default connectToContext;