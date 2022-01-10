import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';
import {Element, FigureType, TypeElement, Presentation, Slide} from "./Types"
import {app} from "./test_data"
import {Add_Element, Change_Background_Color_Slide} from "./functions/WorkWith_Slide"
import {Change_Name} from "./functions/WorkWith_Presentation"
import {v4 as uuidv4} from 'uuid';

let empty_presentation: Presentation = {
    presentation_name: '',
    select_slides: [],
    slide_list: []
}

let React1 = require('react');

ReactDOM.render(
    Application(app),
    document.getElementById('root')
);

//console.log(app.presentation);

//console.log(app.presentation);

/*
function WorkArea(props: any) {
    let workAreaRef = useRef<SVGSVGElement|null>(null)
    //let pos: Position = 
    useMoveElement(props, workAreaRef)
    useResizeElement(props, workAreaRef)
    let slide = props.state.model.currentSlide
    let slideBackground = '#fff'
    if (slide.background.type === BackgroundType.image) {
        slideBackground = 'url(' + (slide.background as ImageElement).imageUrl + ')'
    } else {
        slideBackground = '#' + (slide.background as ColorString).color
    }
    let elements = slide.elements.map((e: Element) => {
        return (<svg data-element-id={e.id} style={{cursor: 'pointer'}} onClick={()=>props.selectElements([e.id])} key={e.id}>
            {Elem(e, 1, props)}
        </svg>
    )})
    const currentSlide = <div>
        <svg ref={workAreaRef} width={slideWidth} height={slideHeight} className="CurrentSlide" style={{background: `0 0 / cover ${slideBackground}`}}>
            {elements}
        </svg>
    </div>
    
    return (
        <div className="WorkArea">
            {currentSlide}
        </div>
    )
}

ReactDOM.render(
    <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

import {Store, createStore} from 'redux'
import {DispatchType, ActionType} from './actionType'
import { Presentation } from '../entries/entries'
import {NEW_PRESENTATION} from '../constants/presentation'
import reducer from './reducer'

const initialState: Presentation = NEW_PRESENTATION

export const store: Store<Presentation, ActionType> & {
    dispatch: DispatchType
} = createStore(reducer, initialState)
*/