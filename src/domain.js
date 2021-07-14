import React from 'react';
import { isMobile } from 'react-device-detect';

//https://stackoverflow.com/questions/52702466/detect-react-reactdom-development-production-build?answertab=votes#tab-top
// React elements have the property _self defined, whereas in production mode that property is not defined.
const deviceDomain = isMobile ? 'http://192.168.86.206:3001' : 'http://localhost:3001';

export const url = '_self' in React.createElement('div') ? deviceDomain : 'api';
