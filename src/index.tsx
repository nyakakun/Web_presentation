import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Application from './Application';
import {Element, FigureType, TypeElement, Presentation, Slide, App, PresentationMode} from "./Types"
import {app} from "./test_data"
import {Add_Element, Change_Background_Color_Slide} from "./functions/WorkWith_Slide"
import {Change_Name} from "./functions/WorkWith_Presentation"
import {v4 as uuidv4} from 'uuid';

let application: App = {
    command_history: {
        history: [],
        Last: 0
    },
    mode: PresentationMode.Edit,
    presentation: {
        presentation_name: 'Новая презентация',
        select_slides: [0],
        slide_list: [
            {
                active_elements:[],
                background:{
                    color: '#ffffff',
                    src: ''
                },
                elements: [],
                id: uuidv4()
            }
        ]
    }
}

ReactDOM.render(
    <Application app={app}/>,
    document.getElementById('root')
);