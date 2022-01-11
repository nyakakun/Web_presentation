import React, { useState } from 'react';
import { Presentation, App, TypeElement, Element, Slide, FigureType} from '../Types';
import { scale_mini } from '../AppConfigs'
import './css/SlideList.css'
import { Change_Select_Slide } from '../functions/WorkWith_Presentation';
import ReactDOM from 'react-dom';
import { SlideSVG } from './Slide';
import { Add_State_Updater_Slides, Update_State } from '../StateChangers';



export function SlideList(props: {app: App}){

    function Change_slide(event: React.MouseEvent){
        Change_Select_Slide(props.app.presentation, Number(event.currentTarget.getAttribute('data-index')))
        Update_State(props.app.presentation.slide_list[props.app.presentation.select_slides[0]].id, {...props.app.presentation.slide_list[props.app.presentation.select_slides[0]]})
        document.getElementById('SlideWiew')!.innerHTML = ''
        ReactDOM.render(
            <SlideSVG app={props.app}/>,
            document.getElementById('SlideWiew')
        )
        console.log({...props.app.presentation.slide_list[props.app.presentation.select_slides[0]]})
    }
    
    return (
        <div className="SlideList">
            {
                props.app.presentation.slide_list.map(function(item, index):JSX.Element{
                    //const [state, state_changer] = useState(item)
                    //Add_State_Updater_Slides(item.id, state_changer)
                    return(
                        <Mini_Slide slide={item} Change_slide={Change_slide} index={index}/>
                    ) 
                })
            }
        </div>
    )
}

function Mini_Slide(props: {slide: Slide, Change_slide: React.MouseEventHandler<SVGElement>, index: number}): JSX.Element{
    const [state, state_changer] = useState(props.slide)
    Add_State_Updater_Slides(state.id, state_changer)
    let elements = state.elements.map(
        function(item):JSX.Element{
            switch(item.data.type){
                case TypeElement.Figure:
                    return <Figure_SVG element={item}/>
                case TypeElement.Image:
                    return <Image_SVG element={item}/>
                case TypeElement.Text:
                    return <Text_SVG element={item}/>
                default:
                    return <></>
            }
        }
    )
    return(
        <svg height={1080 * scale_mini} width={1920 * scale_mini} className='Mini_Slide' onClick={props.Change_slide} data-index={props.index}>
            <rect x={0} y={0} height={'100%'} width={'100%'} fill={state.background.color} />
            {elements}
        </svg>
    )
}

function Figure_SVG(props:
    {
        element: Element,
    }): JSX.Element
    {
        let element = props.element
        if(element.data.type == TypeElement.Figure){
            switch (element.data.figure_type) {
                case FigureType.Circle:
                    let cx: number = (element.position.x + element.size.w / 2)
                    let cy: number = (element.position.y + element.size.h / 2)
    
                    let rx: number = (element.size.w / 2)
                    let ry: number = (element.size.h / 2)
    
                    return (
                        <ellipse
                            cx = {cx * scale_mini}
                            cy = {cy * scale_mini}
                            rx = {rx * scale_mini}
                            ry = {ry * scale_mini}
                            fill = {element.data.background_color}
                            stroke = {element.data.border_color}
                            strokeWidth = {element.data.border_size * scale_mini}
                        ></ellipse>
                    )
                case FigureType.Rectangle:
                    let rectangle:JSX.Element = (
                    <rect 
                        x = {element.position.x * scale_mini} 
                        y = {element.position.y * scale_mini}
                        fill = {element.data.background_color}
                        width = {element.size.w * scale_mini}
                        height = {element.size.h * scale_mini}
                        stroke = {element.data.border_color}
                        strokeWidth = {element.data.border_size * scale_mini}
                    />)
                    return rectangle
                case FigureType.Triangle:
                    let angle: number = 180 * Math.PI / 180
                    let x: number = element.position.x * scale_mini
                    let y: number = element.position.y * scale_mini
                    let h: number = element.size.h * scale_mini
                    let w: number = element.size.w * scale_mini
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
                            strokeWidth = {element.data.border_size * scale_mini}
                            fillRule = 'nonzero'
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
    }): JSX.Element
    {
        let element = props.element
        if(element.data.type == TypeElement.Text){
            return(
                <>
                    <text
                        x = {element.position.x * scale_mini}
                        y = {element.position.y * scale_mini}
                        fill = {element.data.text_color}
                        fontSize = {element.data.font_size * scale_mini}
                        fontFamily = {element.data.font}
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
    }): JSX.Element
    {
        let element = props.element
        if(element.data.type == TypeElement.Image){
            return (<image
                x = {element.position.x * scale_mini}
                y = {element.position.y * scale_mini}
            />)
        }
        return <></>
    }