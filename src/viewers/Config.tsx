import React from 'react';
import ReactDOM from 'react-dom';
import { Change_Background_Color_Element, Change_Border_Color_Element, Change_Border_Size, Change_Font_Text, Change_Image, Change_Size_Text, Change_Text, Move_Elements } from '../functions/WorkWith_Element';
import { Add_History } from '../functions/WorkWith_History';
import { Delete_Slide } from '../functions/WorkWith_Presentation';
import { Change_Background_Color_Slide, Change_Background_Image_Slide, Delete_Elements } from '../functions/WorkWith_Slide';
import { App, Position, Presentation, Size, TypeElement } from '../Types';
//import { BackApp } from './BackApp';

export function Config(app: App): JSX.Element{
    let presentation = app.presentation
    let Active_Slide = presentation.slide_list[presentation.select_slides[0]]

    if(Active_Slide.active_elements.length == 0){
        return(
            <div className='Config'>
               {Change_Background_Color_Slide_Input(Active_Slide.background.color)}
               {Change_Background_Image_Slide_Input(Active_Slide.background.src)}
               {Apply_Button(app)}
               {Delete_Slide_Button(app)} 
            </div>
        )
    }
    
    let Elements_Type: TypeElement = Active_Slide.elements[Active_Slide.active_elements[0]].data.type
    let Types = 0

    Active_Slide.active_elements.forEach(
        function(item){
            if(Active_Slide.elements[item].data.type != Elements_Type){
                Types = 1
            }
        }
    )

    if(Types == 1){
        return(
            <div className = "Config">
                {Delete_Element_Button(app)}
                {Change_Position_Element_Input(Active_Slide.elements[Active_Slide.active_elements[0]].position)}  
                {Apply_Button(app)}
            </div>
        )
    }
    else{
        let temp_element = Active_Slide.elements[Active_Slide.active_elements[0]]
        switch(temp_element.data.type) {
            case TypeElement.Figure:
                return(
                    <div className = "Config">
                        {Change_Border_Size_Element_Input(temp_element.data.border_size)}
                        {Change_Border_Color_Element_Input(temp_element.data.border_color)}
                        {Change_Background_Color_Element_Input(temp_element.data.background_color)}
                        {Change_Position_Element_Input(temp_element.position)}
                        {Apply_Button(app)} 
                        {Delete_Element_Button(app)}
                    </div>
            )
                            
                break;
        
            case TypeElement.Image:
                return(
                    <div className = "Config">
                        {Change_Image_Input(temp_element.data.src)}
                        {Change_Position_Element_Input(temp_element.position)}
                        {Apply_Button(app)}
                        {Delete_Element_Button(app)}
                    </div>
                )
            
                break;
    
            case TypeElement.Text:
                return(
                    <div className = "Config">
                        {Change_Text_Input(temp_element.data.text)}
                        {Change_Font_Text_Input(temp_element.data.font)}
                        {Change_Size_Text_Input(temp_element.data.font_size)}
                        {Change_Position_Element_Input(temp_element.position)}
                        {Apply_Button(app)}
                        {Delete_Element_Button(app)}
                    </div>
                )
        
                break;
                    
            default:
                return(
                    <div className = "Config">
                    </div>
                )
                break;
        }
    }

    

    /*return (

        <div className="Config">
            {Change_Image_Input()}
            {Change_Text_Input()}
            {Change_Font_Text_Input()}
            {Change_Size_Text_Input()}
            {Change_Border_Size_Element_Input()}
            {Change_Border_Color_Element_Input()}
            {Change_Background_Color_Element_Input()}
            {Change_Background_Color_Slide_Input()}
            {Change_Background_Image_Slide_Input()}
            {Delete_Element_Input()}
        </div>
    )
    */
}



function Change_Image_Input(value: string): JSX.Element{
    return (
        <>
            <label htmlFor="Change_Image_Input">URL картинки</label>
            <input type='url' className='Change_Image' id="Change_Image_Input" defaultValue={value}/>
        </>
    )
}

function Change_Text_Input(value: string): JSX.Element{
    return (
        <>
            <label htmlFor='Change_Text_Input'>Текст</label>
            <input type='text' className='Change_Text' id="Change_Text_Input" defaultValue={value}/>
        </>
        
    )
}

function Change_Font_Text_Input(value: string): JSX.Element{
    return (
        <>
            <label htmlFor='Change_Font_Text_Input'>Шрифт</label>        
            <input type='text' className='Change_Font_Text' id='Change_Font_Text_Input' defaultValue={value}/>
        </>
        
    )
}

function Change_Size_Text_Input(value: number): JSX.Element{
    return (
        <>
            <label htmlFor='Change_Size_Text_Input'>Размер текста</label>
            <input type='number' className='Change_Size_Text' id='Change_Size_Text_Input' defaultValue={value}/>
        </>
        
        
    )
}

function Change_Border_Size_Element_Input(value: number): JSX.Element{
    return (
        <>
            <label htmlFor='Change_Border_Size_Element_Input'>Толщина границы</label>
            <input type='number' className='Change_Border_Element_Size' id='Change_Border_Size_Element_Input' defaultValue={value}/>
        </>
    )
}

function Change_Border_Color_Element_Input(value: string): JSX.Element{
    return (
        <>
            <label htmlFor='Change_Border_Color_Element_Input'>Цвет границы</label>
            <input type='color' className='Change_Border_Color_Element' id='Change_Border_Color_Element_Input' defaultValue={value}/>
        </>
        
    )
}

function Change_Background_Color_Element_Input(value: string): JSX.Element{
    return (
        <>
            <label htmlFor='Change_Background_Color_Element_Input'>Цвет бэкграунда</label>
            <input type='color' className='Change_Background_Color_Element' id='Change_Background_Color_Element_Input' defaultValue={value}/>
        </>
        
    )
}


function Change_Background_Color_Slide_Input(value: string): JSX.Element{
    return (
        <>
            <label htmlFor='Change_Background_Color_Slide_Input'>Цвет слайда</label>
            <input type='color' className='Change_Background_Color_Slide' id='Change_Background_Color_Slide_Input' defaultValue={value}/>
        </>
        
    )
}

function Change_Background_Image_Slide_Input(value: string): JSX.Element{
    return (
        <>
            <label htmlFor='Change_Background_Image_Slide_Input'>Фоновое изображение слайда</label>
            <input type='url' className='Change_Background_Image_Slide' id='Change_Background_Image_Slide_Input' defaultValue={value}/>
        </>
        
    )
}

function Delete_Slide_Button(app: App): JSX.Element {
    return(
        <button className='Delete_Slide' onClick={function(){
            app.presentation = Delete_Slide(app.presentation)
            Add_History(app)
        }}>
            Удалить выделенные слайды
        </button>
    )
}


function Delete_Element_Button(app: App): JSX.Element{
    return (
        <button className='Delete_Element' onClick={function(){
            app.presentation = Delete_Elements(app.presentation)
            Add_History(app)
        }}>
            Удалить выделенные элементы
        </button>
    )
}

function Change_Position_Element_Input(value: Position): JSX.Element{
    return (
        <>
            <label htmlFor='Change_Position_Element_Input_X'>X</label>
            <input type='number' className='Change_Position_Element' id='Change_Position_Element_Input_X' defaultValue={value.x}/>
            <label htmlFor='Change_Position_Element_Input_Y'>Y</label>
            <input type='number' className='Change_Position_Element' id='Change_Position_Element_Input_Y' defaultValue={value.y}/>
        </>
    )
}

function Apply_Button(app: App): JSX.Element{
    return(
        <button className = "Apply_Button" onClick={function(){
            let presentation = app.presentation
            let Active_Slide = presentation.slide_list[presentation.select_slides[0]]
            
            if(Active_Slide.active_elements.length == 0){
                let new_color_slide: string = (document.getElementById('Change_Background_Color_Slide_Input') as HTMLInputElement).value
                Change_Background_Color_Slide(presentation, new_color_slide)
                let new_image_slide: string = (document.getElementById('Change_Background_Image_Slide_Input') as HTMLInputElement).value
                Change_Background_Image_Slide(presentation, new_image_slide)
                Add_History(app)
            }
            else{
                let Elements_Type: TypeElement = Active_Slide.elements[Active_Slide.active_elements[0]].data.type
                let Types = 0

                Active_Slide.active_elements.forEach(
                    function(item){
                        if(Active_Slide.elements[item].data.type != Elements_Type){
                            Types = 1
                        }
                    }
                )
                if(Types == 1){
                    let new_position: Position = {
                        x: Number((document.getElementById('Change_Position_Element_Input_X') as HTMLInputElement).value),
                        y: Number((document.getElementById('Change_Position_Element_Input_Y') as HTMLInputElement).value)
                    }
                   Move_Elements(presentation, new_position)
                   Add_History(app) 
                }
                else{
                    let temp_element = Active_Slide.elements[Active_Slide.active_elements[0]]
                    switch(temp_element.data.type){
                        case TypeElement.Figure:
                            let new_border_size_element: number = Number((document.getElementById('Change_Border_Size_Element_Input') as HTMLInputElement).value) 
                            Change_Border_Size(presentation, new_border_size_element)
                            let new_border_color_element: string = (document.getElementById('Change_Border_Color_Element_Input') as HTMLInputElement).value
                            Change_Border_Color_Element(presentation, new_border_color_element) 
                            let new_background_color_element: string = (document.getElementById('Change_Background_Color_Element_Input') as HTMLInputElement).value
                            Change_Background_Color_Element(presentation, new_background_color_element)
                            let new_position_elements: Position = {
                                x: Number((document.getElementById('Change_Position_Element_Input_X') as HTMLInputElement).value),
                                y: Number((document.getElementById('Change_Position_Element_Input_Y') as HTMLInputElement).value)
                            }
                            Move_Elements(presentation, new_position_elements)
                            Add_History(app)
                            break;
                         
                        case TypeElement.Image:
                            let new_image: string = (document.getElementById('Change_Image_Input') as HTMLInputElement).value
                            Change_Image(presentation, new_image)
                            let new_position_images: Position = {
                                x: Number((document.getElementById('Change_Position_Element_Input_X') as HTMLInputElement).value),
                                y: Number((document.getElementById('Change_Position_Element_Input_Y') as HTMLInputElement).value)
                            }
                            Move_Elements(presentation, new_position_images)
                            Add_History(app)
                            break;
                        
                        case TypeElement.Text:
                            let new_text: string = (document.getElementById('Change_Text_Input') as HTMLInputElement).value
                            Change_Text(presentation, new_text)
                            let new_font_text: string = (document.getElementById('Change_Font_Text_Input') as HTMLInputElement).value
                            Change_Font_Text(presentation, new_font_text)
                            let new_size_text: number = Number((document.getElementById('Change_Size_Text_Input') as HTMLInputElement).value)
                            Change_Size_Text(presentation, new_size_text)
                            let new_position_text: Position = {
                                x: Number((document.getElementById('Change_Position_Element_Input_X') as HTMLInputElement).value),
                                y: Number((document.getElementById('Change_Position_Element_Input_Y') as HTMLInputElement).value)
                            }
                            Move_Elements(presentation, new_position_text)
                            Add_History(app)
                            break;
                        
                        default:
                            break;
                    }
                }
               
            }

            //ReactDOM.render(BackApp(app), document.getElementById('BackApp'))

        }}>Применить</button>
    )
}