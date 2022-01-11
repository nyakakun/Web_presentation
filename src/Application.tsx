import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import './css/Application.css';
//import {app} from './test_data'
import { App, Element, FigureObj, FigureType, Position, Size, TypeElement } from './Types';
import { SlideSVG } from './viewers/Slide';
import { Config, GetPanelType } from './viewers/Config';
import { Menu } from './viewers/Menu';
import { SlideList } from './viewers/SlideList';

export 

function Application(props: {app: App}) {
    return (
        <>
            <div id="Menu">
                <Menu app={props.app} />
            </div>
            <div className='Presentation'>
                <div id="SlideList">
                    <SlideList app={props.app} />
                </div>
                <div id="SlideWiew">
                    <SlideSVG app={props.app} />
                </div>
                <div id="Config">
                    <Config app={props.app} type_panel={GetPanelType(props.app.presentation.slide_list[props.app.presentation.select_slides[0]])}/>
                </div>
            </div>
        </>
    );
}

export default Application