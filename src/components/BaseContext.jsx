import React from "react";
import createContextConnector from "../general/createContextConnector";

const BaseContext = React.createContext();

export const connectToContext = createContextConnector(BaseContext);

export default BaseContext;
