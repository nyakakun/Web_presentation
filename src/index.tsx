import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Element, FigureType, TypeElement} from "./Types"
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
  background_color: 'ХУЙ}',
  data:{
    type: TypeElement.Figure,
    border_color: '399932',
    border_size: 4,
    figure_type: FigureType.Circle
  }
}

//app.presentation.slide_list[app.presentation.select_slides[0]] = Add_Element(app.presentation.slide_list[app.presentation.select_slides[0]], TempElement)

console.log(app.presentation);
