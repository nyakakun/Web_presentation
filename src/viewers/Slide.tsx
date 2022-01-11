import React, { BaseSyntheticEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './css/Slide.css';
import { Presentation, Element, TypeElement, FigureType, Slide, App, Background } from '../Types';
import { Config, GetPanelType } from './Config';
import { v4 as uuidv4 } from 'uuid';
import { Add_State_Updater_Elements, Add_State_Updater_Slide, Update_State, Update_State_Config, Update_State_Config_Inputs } from '../StateChangers';
import { scale } from '../AppConfigs'

export function SlideSVG(props: {app: App}){
    let presentation = props.app.presentation
    let slide = presentation.slide_list[presentation.select_slides[0]]

    const [state_slide, Change_State_Slide] = useState(slide)

    Add_State_Updater_Slide(state_slide.id, Change_State_Slide)
    presentation.slide_list[presentation.select_slides[0]] = state_slide
    function on_click_element(event: React.MouseEvent){
        let index = Number(event.currentTarget.getAttribute('data-index'))
        let active_elements = slide.active_elements
        if(active_elements.indexOf(index) < 0){
            if(event.ctrlKey){
                slide.active_elements.push(index)
                //state_slide.active_elements.push(index)
            }else{
                slide.active_elements = [index]
                //state_slide.active_elements = [index]
            }
            Update_State_Config(GetPanelType(slide))
            Update_State_Config_Inputs(slide.elements[index])
            Change_State_Slide(slide)
        }
    }

    function on_click_slide(event: React.MouseEvent){
        slide.active_elements = []
        //state_slide.active_elements = []
        Update_State_Config(GetPanelType(slide))
        Change_State_Slide({...slide, ...elements})
    }

    let elements = state_slide.elements.map((element: Element, index: number)=>{
        let svg_element = <SVGObject element={element} index={index} on_click={on_click_element} />
        return svg_element
    })

    let svg_slide = (<svg height={1080 * scale} width={1920 * scale} className='Slide' key={state_slide.id}>
            <Background_SVG background={state_slide.background} on_click={on_click_slide}/>
            {elements}
        </svg>)
    return svg_slide
}

function Background_SVG(props: {background: Background, on_click: React.MouseEventHandler<SVGElement>}): JSX.Element{
    return(
        props.background.src === '' ? <rect x={0} y={0} height={'100%'} width={'100%'} fill={props.background.color} onClick={props.on_click}></rect> : <image x={0} y={0} href={props.background.src} height={'100%'} width={'100%'} onClick = {props.on_click}/>
    )
}

function SVGObject(props: {element: Element, index: number, on_click: React.MouseEventHandler<SVGElement>}): JSX.Element{
    const [state_element, Set_State_Element] = useState({...props.element})

    Add_State_Updater_Elements(state_element.id, Set_State_Element)
    let index = props.index
    let On_Click = props.on_click

    let svg_element: JSX.Element = <></>;
    switch (state_element.data.type) {
        case TypeElement.Figure:
            svg_element = <Figure_SVG element={state_element} index={index} on_click={On_Click}/>
            break;

        case TypeElement.Text:
            svg_element = <Text_SVG element={state_element} index={index} on_click={On_Click}/>
            break;

        case TypeElement.Image:
            svg_element = <Image_SVG element={state_element} index={index} on_click={On_Click}/>
            break;
        default:
            break;
    }

    return svg_element
}

function Figure_SVG(props:
{
    element: Element,
    index: number,
    on_click: React.MouseEventHandler<SVGElement>
}): JSX.Element
{
    let element = props.element
    let index = props.index
    let On_Click = props.on_click
    if(element.data.type == TypeElement.Figure){
        switch (element.data.figure_type) {
            case FigureType.Circle:
                let cx: number = (element.position.x + element.size.w / 2)
                let cy: number = (element.position.y + element.size.h / 2)

                let rx: number = (element.size.w / 2)
                let ry: number = (element.size.h / 2)

                return (
                    <ellipse
                        cx = {cx * scale}
                        cy = {cy * scale}
                        rx = {rx * scale}
                        ry = {ry * scale}
                        fill = {element.data.background_color}
                        stroke = {element.data.border_color}
                        strokeWidth = {element.data.border_size * scale}
                        data-index = {index}
                        data-uid = {element.id}
                        onClick = {On_Click}
                    ></ellipse>
                )
            case FigureType.Rectangle:
                let rectangle:JSX.Element = (
                <rect 
                    x = {element.position.x * scale} 
                    y = {element.position.y * scale}
                    fill = {element.data.background_color}
                    width = {element.size.w * scale}
                    height = {element.size.h * scale}
                    stroke = {element.data.border_color}
                    strokeWidth = {element.data.border_size * scale}
                    data-index = {index}
                    data-uid = {element.id}
                    onClick = {On_Click}
                />)
                return rectangle
            case FigureType.Triangle:
                let angle: number = 180 * Math.PI / 180
                let x: number = (element.position.x + element.data.border_size / 2) * scale
                let y: number = (element.position.y + element.data.border_size / 2) * scale
                let h: number = (element.size.h - element.data.border_size) * scale
                let w: number = (element.size.w - element.data.border_size) * scale
                let g: number = Math.sqrt(h * h + (w * w / 4)) //сторона треугольника
                let r: number = g * g / Math.sqrt(4 * g * g - w * w) //радиус описанной окружности
                let PointTop: number[] = [r * Math.sin(angle) + w / 2 + x, r * Math.cos(angle) + y + r]
                let PointLeftBottom:  number[] = [  r * Math.sin(angle) - h * Math.sin(angle) + (w / 2) * Math.cos(-angle - Math.PI) + w / 2 + x,
                                                    r * Math.cos(angle) - h * Math.cos(angle) + (w / 2) * Math.sin(-angle - Math.PI) + y + r]
                let PointRightBottom: number[] = [  r * Math.sin(angle) - h * Math.sin(angle) + (w / 2) * Math.cos(-angle) + w / 2 + x,
                                                    r * Math.cos(angle) - h * Math.cos(angle) + (w / 2) * Math.sin(angle + Math.PI) + y + r]
                return (
                    <polygon
                        points = {`${PointTop[0]}, ${PointTop[1]} ${PointLeftBottom[0]}, ${PointLeftBottom[1]} ${PointRightBottom[0]}, ${PointRightBottom[1]}`}
                        fill = {element.data.background_color}
                        stroke = {element.data.border_color}
                        strokeWidth = {element.data.border_size * scale}
                        fillRule = 'nonzero'
                        data-index = {index}
                        data-uid = {element.id}
                        onClick = {On_Click}
                    />
                )
            default:
                break;
        }
    }
    return <></>
}

function Text_SVG(props:
{
    element: Element,
    index: number,
    on_click: React.MouseEventHandler<SVGElement>
}): JSX.Element
{
    let element = props.element
    let index = props.index
    let On_Click = props.on_click
    if(element.data.type == TypeElement.Text){
        return(
            <>
                <text
                    x = {element.position.x}
                    y = {element.position.y}
                    fill = {element.data.text_color}
                    fontSize = {element.data.font_size}
                    fontFamily = {element.data.font}
                    data-index = {index}
                    data-uid = {element.id}
                    onClick = {On_Click}
                >
                    {element.data.text}
                </text>
            </>)
    }
    return <></>
}

function Image_SVG(props:
{
    element: Element,
    index: number,
    on_click: React.MouseEventHandler<SVGElement>
}): JSX.Element
{
    let element = props.element
    let index = props.index
    let On_Click = props.on_click
    if(element.data.type == TypeElement.Image){
        return (<image
            x = {element.position.x}
            y = {element.position.y}
            href = {element.data.src}
            data-index = {index}
            data-uid = {element.id}
            onClick = {On_Click}
        />)
    }
    return <></>
}