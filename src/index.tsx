import React from 'react';
import { render } from 'react-dom';

import App from './app.component';

import './globa.styles.sass';

// Draggable components styles
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './override-grid-layout-styles.css';


render(<App />, document.getElementById('root'));
