import React from 'react';
import connectToContext from '../general/connectToContext';

const ContextApi = React.createContext();

ContextApi = connectToContext(ContextApi);

export default ContextApi;