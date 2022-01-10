import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import './Application.css';
import {app} from './test_data'
import { App, Element, FigureObj, FigureType, Position, Size, TypeElement } from './Types';
import { SlideSVG } from './viewers/Slide';
import { Config } from './viewers/Config';
import { Menu } from './viewers/Menu';
import { SlideList } from './viewers/SlideList';

function Application(app: App) {
    return (
        <>
            <div id="Menu">
                <Menu app={app}/>
            </div>
            <div className='Presentation'>
                <div id="SlideList">
                    {SlideList(app.presentation)}
                </div>
                <div id="SlideWiew">
                    {SlideSVG(app)}
                </div>
                <div id="Config">
                    {Config(app)}
                </div>
            </div>
        </>
    );
}

export default Application
    /*return (
        <>
            <div id="Menu">
                <Menu app={app}/>
            </div>
            <div className='Presentation'>
                <div id="SlideList">
                    {SlideList(app.presentation)}
                </div>
                <div id="SlideWiew">
                    {SlideSVG(app)}
                </div>
                <div id="Config">
                    {Config(app)}
                </div>
            </div>
        </>
    );*/
    
