import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Element, FigureType, TypeElement, Presentation, Slide} from "./Types"
import {app} from "./test_data"
import {Add_Element, Change_Background_Color} from "./functions/WorkWith_Slide"
import {Change_Name} from "./functions/WorkWith_Presentation"
import {v4 as uuidv4} from 'uuid';

import {TEST} from './functions/tests/test'

ReactDOM.render(
  <div></div>,
  document.getElementById('root')
);

TEST()

//console.log(app.presentation);

//console.log(app.presentation);