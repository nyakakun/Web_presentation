import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Element, FigureType, TypeElement, Presentation, Slide} from "./Types"
import {app} from "./test_data"
import {Change_Name,  Add_Element} from "./functions"
import {v4 as uuidv4} from 'uuid';

ReactDOM.render(
  <div></div>,
  document.getElementById('root')
);

console.log(app.presentation);

app.presentation = Change_Name(app.presentation, "ГАВНИЩЕ");

var TempElement: Element = {
  id: uuidv4(),
  size: {
    h: 10,
    w: 100
  },
  position:{
    x: 100,
    y: 200
  },
  background_color: 'ДА_НЕТ_11011010_00100101',
  data:{
    type: TypeElement.Figure,
    border_color: '399932',
    border_size: 4,
    figure_type: FigureType.Circle
  }
}

app.presentation = Add_Element(app.presentation, TempElement)

console.log(app.presentation);
