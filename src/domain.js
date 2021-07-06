import React from 'react';

//https://stackoverflow.com/questions/52702466/detect-react-reactdom-development-production-build?answertab=votes#tab-top
// React elements have the property _self defined, whereas in production mode that property is not defined.
export const url = '_self' in React.createElement('div') ? 'http://localhost:3001' : 'https://www.uprophet.com';
