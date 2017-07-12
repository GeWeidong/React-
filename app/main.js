//main.js 
import React from 'react';
import {render} from 'react-dom';
import Slider from './Slider';

const app = document.createElement('div');
// app.style.background = '#0A365A';
document.body.appendChild(app);
render(<Slider/>, app);