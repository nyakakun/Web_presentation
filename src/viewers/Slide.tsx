import React, { BaseSyntheticEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Presentation, Element, TypeElement, FigureType, Slide, App } from '../Types';

import styles from './Button.module.css';


export function SlideSVG(app: App){
    const [menuSwitcher, setMenuSwitcher] = useState(true);
    const handleToggleView = () => setMenuSwitcher(!menuSwitcher);
    return (
        <div>
            {
                menuSwitcher
                ? <ElementListTool foo={handleToggleView}/>
                : <ReorderListTool foo={handleToggleView}/>
            }
        </div>
    );
}

type ElementListToolProps = {
    foo: () => void | undefined
}

export function ElementListTool(props: ElementListToolProps): JSX.Element {
    return <div>
        <Button text="Undo" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={() => undefined}/>
        <VerticalLine />
        <Button text="Redo" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={() => undefined}/>
        <VerticalLine />
        <Button  text="Reorder" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={props.foo}/>
        <VerticalLine />
        <Button text="Opacity" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={() => undefined}/>
        <VerticalLine />
        <Button text="Delete" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={() => undefined}/>
        <VerticalLine />
        <Button text="Fullscreen" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={() => undefined}/>
    </div>;
}

export function VerticalLine(): JSX.Element {
    return (
        <div className={styles.vertical_line}></div>
    );
}

type ReorderListToolProps = {
    foo: () => void | undefined
}

export function ReorderListTool(props: ReorderListToolProps): JSX.Element {
    return <div>
        <Button text="Backward" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={props.foo}/>
        <VerticalLine />
        <Button text="Back" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={props.foo}/>
        <VerticalLine />
        <Button text="Forward" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={props.foo}/>
        <VerticalLine />
        <Button text="Front" state="disabled" contentType="icon" content={{hotkeyInfo: ""}} foo={props.foo}/>
    </div>
}

type ButtonProps = {
    text: string,
    state: 'disabled' | 'active' | 'focused' | 'default',
    contentType: 'text' | 'icon' | 'leftSideIconAndTextInSubMenu' | 'rightSideIconAndTextInSubMenu' | 'rightSideHotKeyInfoAndTextInSubMenu' | 'textInSubMenu',
    content: {
        hotkeyInfo: string,
    } | undefined,
    foo: () => void | undefined
}

export function Button(props: ButtonProps = {
    text: '',
    state: 'disabled',
    contentType: 'text',
    content: undefined,
    foo: () => {},
}): JSX.Element {
    const { text, content, contentType, state, foo } = props;

    const onClickHandler = (_: BaseSyntheticEvent) => {
        if (foo !== undefined) {
            foo();
        }
    }

    const [buttonStyle, setButtonStyle] = useState(styles.default);

    useEffect(() => {
        if (state !== 'default') {
            const style = (contentType === 'icon')
                ? (state === 'disabled') ? styles.icon : (state === 'active') ? styles['icon-pressed'] : styles['icon-focused']
                :
                (contentType === 'leftSideIconAndTextInSubMenu')
                    ? (state === 'disabled') ? styles.button : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
                    :
                    (contentType === 'rightSideIconAndTextInSubMenu')
                        ? (state === 'disabled') ? styles.button : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
                        :
                        (contentType === 'rightSideHotKeyInfoAndTextInSubMenu')
                            ? (state === 'disabled') ? styles.button : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
                            :
                            (contentType === 'textInSubMenu')
                                ? (state === 'disabled') ? styles['button-in-submenu'] : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
                                :
                                (contentType === 'text')
                                    ? (state === 'disabled') ? styles.button : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
                                        : styles.button;
            setButtonStyle(style);
        }
    }, [state, contentType]);

    const [preventingMouseUp, setPreventMouseUpStatus] = useState(false);

    const onMouseDownHandler = (state === 'default')
        ? (_: BaseSyntheticEvent) => {
            setButtonStyle(styles['default-pressed']);
        }
        : (_: BaseSyntheticEvent) => {
            return undefined;
        }

    const onMouseUpHandler = (state === 'default')
        ? (event: BaseSyntheticEvent) => {
            setButtonStyle(styles.default);
            if (preventingMouseUp) {
                setPreventMouseUpStatus(false);
                event.target.blur();
            } else {
                setPreventMouseUpStatus(true);
            }
        }
        : (_: BaseSyntheticEvent) => {
            return undefined;
        }

    const button: JSX.Element =
        <button
            className={buttonStyle}
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            onClick={onClickHandler}
        >
            {text}
            {(content !== undefined)
                ?   <div className="hotkey-info">
                        {content.hotkeyInfo}
                    </div>
                : ''
            }
        </button>;

    return button;
}




//import { Config } from './Config';
/*
export function SlideSVG(app: App){
    let presentation = app.presentation
    let slide = presentation.slide_list[presentation.select_slides[0]]
    //let StateChanger: Map <number, React.Dispatch<React.SetStateAction<Element>>> = new Map()
    //let state = useState(slide)
    //state[1](slide)
    function on_click(event: React.MouseEvent){
        if(event.ctrlKey){
            slide.active_elements.push(Number(event.currentTarget.getAttribute('data-index')))
        }else{
            slide.active_elements = [Number(event.currentTarget.getAttribute('data-index'))]
        }
    }
    let elements = slide.elements.map((element: Element, index: number)=>{
        let svg_element = SVGObject(element, index, on_click)
        //StateChanger.set(svg_element[2], svg_element[1])
        return svg_element[0]
    })
    /*let elements = slide.elements.map((element: Element, index: number)=>{
        let svg_element = Element_To_SVG(app, index)
        //StateChanger.set(svg_element[2], svg_element[1])
        return svg_element
    })*/
/*
    let svg_slide = <svg height={'1080px'} width={'1920px'} key={state[0].id}>{elements}</svg>
    return svg_slide
}

function SVGObject(element: Element, index: number, on_click: React.MouseEventHandler<SVGElement>): [JSX.Element, number]{

    let svg_element: JSX.Element = <></>;
    switch (element.data.type) {
        case TypeElement.Figure:
            svg_element = Figure_SVG(element, index, on_click)
            break;

        case TypeElement.Text:

        default:
            break;
    }

    return [svg_element, index]
}

function Figure_SVG(element: Element, index: number, On_Click: React.MouseEventHandler<SVGElement>): JSX.Element{
    if(element.data.type == TypeElement.Figure){
        switch (element.data.figure_type) {
            case FigureType.Circle:
                let cx: number = element.position.x + element.size.w / 2
                let cy: number = element.position.y + element.size.h / 2

                let rx: number = element.size.w / 2
                let ry: number = element.size.h / 2

                return (
                    <ellipse
                        key = {element.id}
                        cx = {cx}
                        cy = {cy}
                        rx = {rx}
                        ry = {ry}
                        fill = {element.data.background_color}
                        stroke = {element.data.border_color}
                        stroke-width = {element.data.border_size}
                        data-index = {index}
                        data-uid = {element.id}
                        onClick={On_Click}
                    ></ellipse>
                )
            case FigureType.Rectangle:

                return (
                    <rect 
                        key = {element.id}
                        x = {element.position.x} 
                        y = {element.position.y}
                        fill = {element.data.background_color}
                        width = {element.size.w}
                        height = {element.size.h}
                        stroke = {element.data.border_color}
                        stroke-width = {element.data.border_size}
                        data-index = {index}
                        onClick={On_Click}
                    />
                )
            case FigureType.Triangle:
                let angle: number = 0
                let h: number = element.size.h
                let w: number = element.size.w
                let g: number = Math.sqrt(h * h + (w * w / 4))
                let r: number = g * g / Math.sqrt(4 * g * g - w * w)
                let PointTop: number[] = [r * Math.sin(angle) + w / 2, r * Math.cos(angle) - r]
                let PointLeftBottom:  number[] = [  r * Math.sin(angle) - h * Math.sin(angle) + (w / 2) * Math.cos(-angle - Math.PI) + w / 2,
                                                    r * Math.cos(angle) - h * Math.cos(angle) + (w / 2) * Math.sin(-angle - Math.PI) - r]
                let PointRightBottom: number[] = [  r * Math.sin(angle) - h * Math.sin(angle) + (w / 2) * Math.cos(-angle) + w / 2,
                                                    r * Math.cos(angle) - h * Math.cos(angle) + (w / 2) * Math.sin(angle + Math.PI) - r]
                return (
                    <polygon
                        key = {element.id}
                        points = {`${PointTop[0]}, ${PointTop[1]} ${PointLeftBottom[0]}, ${PointLeftBottom[1]} ${PointRightBottom[0]}, ${PointRightBottom[1]}`}
                        fill = {element.data.background_color}
                        stroke = {element.data.border_color}
                        stroke-width = {element.data.border_size}
                        fillRule = 'nonzero'
                        data-index = {index}
                        onClick={On_Click}
                    />
                )
            default:
                break;
        }
    }
    return <></>
}




/*


export function BackApp(app: App){
    let presentation: Presentation = app.presentation
    let Active_Slide = presentation.slide_list[presentation.select_slides[0]]

    let SVGElements: JSX.Element[] = []

    Active_Slide.elements.forEach(
        function(item, index){
            //if(Active_Slide.active_elements.indexOf(index) < 0){
                let SVG_Element: JSX.Element = Element_To_SVG(app, index)
                SVGElements.push(SVG_Element)
            //}
        }
    );
    
    return (
        <svg height={'1080px'} width={'1920px'}>
            <rect x={0} y={0} height={'1080px'} width={'1920px'} fill={'#'+Active_Slide.background.color}></rect>
            {SVGElements}
        </svg>
        );
}



function Element_To_SVG(app: App, index: number): JSX.Element{

    let presentation: Presentation = app.presentation
    let slide = presentation.slide_list[presentation.select_slides[0]]
    let element: Element = slide.elements[index]
    function On_Click(event: React.MouseEvent){
        /*if(event.ctrlKey){
            slide.active_elements.push(index)
        }else{
            slide.active_elements = [index]
        }
        ReactDOM.render(
            Config(app),
            document.getElementById('Config')
        )*/
/*    }
    switch (element.data.type) {
        case TypeElement.Text:
            return (
                <text
                    x = {element.position.x}
                    y = {element.position.y}
                    fill = {element.data.text_color}
                    fontSize = {element.data.font_size}
                    fontFamily = {element.data.font}
                    data-index = {index}
                    onClick={On_Click}
                >
                    {element.data.text}
                </text>)
        case TypeElement.Figure:
            switch (element.data.figure_type) {
                case FigureType.Circle:
                    let cx: number = element.position.x + element.size.w / 2
                    let cy: number = element.position.y + element.size.h / 2

                    let rx: number = element.size.w / 2
                    let ry: number = element.size.h / 2

                    return (
                        <ellipse
                            cx = {cx}
                            cy = {cy}
                            rx = {rx}
                            ry = {ry}
                            fill = {element.data.background_color}
                            stroke = {element.data.border_color}
                            stroke-width = {element.data.border_size}
                            data-index = {index}
                            onClick={On_Click}
                        ></ellipse>
                    )
                case FigureType.Rectangle:

                    return (
                        <rect 
                            x = {element.position.x} 
                            y = {element.position.y}
                            fill = {element.data.background_color}
                            width = {element.size.w}
                            height = {element.size.h}
                            stroke = {element.data.border_color}
                            stroke-width = {element.data.border_size}
                            data-index = {index}
                            onClick={On_Click}
                        />
                    )
                case FigureType.Triangle:

                    let angle: number = 0
                    let h: number = element.size.h
                    let w: number = element.size.w
                    let g: number = Math.sqrt(h * h + (w * w / 4))
                    let r: number = g * g / Math.sqrt(4 * g * g - w * w)
                    let PointTop: number[] = [r * Math.sin(angle) + w / 2, r * Math.cos(angle) - r]
                    let PointLeftBottom:  number[] = [  r * Math.sin(angle) - h * Math.sin(angle) + (w / 2) * Math.cos(-angle - Math.PI) + w / 2,
                                                        r * Math.cos(angle) - h * Math.cos(angle) + (w / 2) * Math.sin(-angle - Math.PI) - r]
                    let PointRightBottom: number[] = [  r * Math.sin(angle) - h * Math.sin(angle) + (w / 2) * Math.cos(-angle) + w / 2,
                                                        r * Math.cos(angle) - h * Math.cos(angle) + (w / 2) * Math.sin(angle + Math.PI) - r]
                    return (
                        <polygon
                            points = {`${PointTop[0]}, ${PointTop[1]} ${PointLeftBottom[0]}, ${PointLeftBottom[1]} ${PointRightBottom[0]}, ${PointRightBottom[1]}`}
                            fill = {element.data.background_color}
                            stroke = {element.data.border_color}
                            stroke-width = {element.data.border_size}
                            fillRule = 'nonzero'
                            data-index = {index}
                            onClick={On_Click}
                        />)
                default:
                    break;
            }
            break;
        case TypeElement.Image:
            return (<image
                x = {element.position.x}
                y = {element.position.y}
                href = {element.data.src}
                data-index = {index}
                onClick={On_Click}
            />)
        default:
            break;
    }
    return <></>
}

/*
const ADD_SLIDE = 'ADD_SLIDE'
<button className='IconButton Icon' onClick={()=>props.addSlide()}></button>
addSlide: () => dispatch({type: ADD_SLIDE})
switch (action.type) {
    case actionTypes.ADD_SLIDE:
        return addSlide(state)    
}

const dispatchOne = (dispatch: Dispatch<any>) => {
    return {
        addSlide: () => dispatch({type: ADD_SLIDE}),
        backgroundPicture: (e: React.ChangeEvent<HTMLInputElement>) => backgroundPicture(e, dispatch),
        deleteSlide: () => dispatch({type: DELETE_SLIDE})
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        addText: (text: string) => dispatch({type: Action.ADD_TEXT, payload: text}),
        addPrimitiveCircle: () => dispatch({type: Action.ADD_PRIMITIVE_CIRCLE}),
        addPrimitiveRectangle: () => dispatch({type: Action.ADD_PRIMITIVE_RECTANGLE}),
        addPrimitiveTriangle: () => dispatch({type: Action.ADD_PRIMITIVE_TRIANGLE}),
        changePresentationName: (newName: string) => dispatch({type: Action.CHANGE_NAME, payload: newName}),
        createPresentation: () => dispatch({type: Action.CREATE_PRESENTATION}),
        openLocalPresentation: (e: React.ChangeEvent<HTMLInputElement>) => openLocalPresentation(e, dispatch),
        undo: () => dispatch({type: Action.UNDO}),
        redo: () => dispatch({type: Action.REDO}),
        changeTextSize: (newTextSize: string) => dispatch({type: Action.TEXT_SIZE, payload: newTextSize}),
        changeFont: (font: string) => dispatch({type: Action.CHANGE_FONT, payload: font}),
        changeTextAlign: (align: string) => dispatch({type: Action.CHANGE_TEXT_ALIGN, payload: align}),
        changeTextBold: () => dispatch({type: Action.TEXT_BOLD}),
        changeTextItalic: () => dispatch({type: Action.TEXT_ITALIC}),
        changeTextUnderline: () => dispatch({type: Action.TEXT_UNDERLINE}),
        openPicture: (e: React.ChangeEvent<HTMLInputElement>) => openPicture(e, dispatch),
        showPresentation: (b: boolean) => dispatch({type: Action.SHOW_STOP_PRESENTATION, payload: b}) 
    } 
}

const mapStateToProps = (state: Presentation) => {
    return {state: state}
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkArea)
export default connect(mapStateToProps, mapDispatchToProps)(ButtonsBlock)
*/