import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './css/Config.css';
import { Change_Background_Color_Element, Change_Border_Color_Element, Change_Border_Size, Change_Font_Text, Change_Image, Change_Size_Text, Change_Text, Move_Elements } from '../functions/WorkWith_Element';
import { Add_History } from '../functions/WorkWith_History';
import { Delete_Slide } from '../functions/WorkWith_Presentation';
import { Change_Background_Color_Slide, Change_Background_Image_Slide, Delete_Elements } from '../functions/WorkWith_Slide';
import { App, Position, Presentation, Size, TypeElement, Slide, Element} from '../Types';
import { Add_State_Updater_Config, Add_State_Updater_Config_Inputs, Clear_State_Updater_Config_Inputs, Update_State, Update_State_Config, Update_State_Config_Inputs } from '../StateChangers';

enum ActivePanel{
    Mixed,
    Text,
    Image,
    Figure,
    Slide
}

export function GetPanelType(active_slide: Slide): ActivePanel{
    let type_panel: ActivePanel
    let Elements_Type: TypeElement

    if(active_slide.active_elements.length == 0){
        type_panel = ActivePanel.Slide
    }else{
        Elements_Type = active_slide.elements[active_slide.active_elements[0]].data.type
        switch (Elements_Type) {
            case TypeElement.Figure:
                type_panel = ActivePanel.Figure
                break;
            case TypeElement.Image:
                type_panel = ActivePanel.Image
                break;
            case TypeElement.Text:
                type_panel = ActivePanel.Text
                break;
        
            default:
                break;
        }
    }

    active_slide.active_elements.forEach(
        function(item){
            if(active_slide.elements[item].data.type != Elements_Type){
                type_panel = ActivePanel.Mixed
            }
        }
    )
    return type_panel!
}

export function Config(props: {app: App, type_panel: ActivePanel}): JSX.Element{
    const [type_panel, change_type_panel] = useState(props.type_panel)
    //const [application, change_panel] = useState()
    Add_State_Updater_Config(change_type_panel)

    //let type_panel = GetPanelType(props.app)

    let active_slide = props.app.presentation.slide_list[props.app.presentation.select_slides[0]]
    let temp_element
    //Clear_State_Updater_Config_Inputs()
    switch (type_panel) {
        case ActivePanel.Slide:
            return (<>
                <Slide_Config active_slide={active_slide}/>
                <div className='Config'>
                    {Apply_Button(props.app)}
                </div>
            </>)
        case ActivePanel.Figure:
            temp_element = active_slide.elements[active_slide.active_elements[0]]
            return (<>
                <Figure_Config temp_element={temp_element}/>
                <Buttons_Config app={props.app}/>
            </>)
        case ActivePanel.Image:
            temp_element = active_slide.elements[active_slide.active_elements[0]]
            return (<>
                <Image_Config temp_element={temp_element}/>
                <Buttons_Config app={props.app}/>
            </>)
        case ActivePanel.Text:
            temp_element = active_slide.elements[active_slide.active_elements[0]]
            return (<>
                <Text_Config temp_element={temp_element}/>
                <Buttons_Config app={props.app}/>
            </>)
        case ActivePanel.Mixed:
            temp_element = active_slide.elements[active_slide.active_elements[0]]
            return (<>
                <Buttons_Config app={props.app}/>
            </>)
        default:
            return(<div className = "Config"></div>)
    }
}

function Buttons_Config(props: {app: App}): JSX.Element{
    return(
        <div className='Config'>
            {Apply_Button(props.app)}
            {Delete_Element_Button(props.app)}
        </div>
    )
}

function All_Config(props: {active_slide: Slide}): JSX.Element{
    return(
        <div className='Config'>
            <Change_Position_X_Element_Input value={props.active_slide.elements[props.active_slide.active_elements[0]].position.x}/>  
            <Change_Position_Y_Element_Input value={props.active_slide.elements[props.active_slide.active_elements[0]].position.y}/>  
        </div>
    )
}

function Slide_Config(props: {active_slide: Slide}): JSX.Element{
    return(
        <div className='Config'>
            <Change_Background_Color_Slide_Input value={props.active_slide.background.color}/>
            <Change_Background_Image_Slide_Input value ={props.active_slide.background.src}/>
        </div>
    )
}

function Figure_Config(props: {temp_element: Element}): JSX.Element{
    if(props.temp_element.data.type == TypeElement.Figure){
        return(
            <div className = "Config">
                <Change_Border_Size_Element_Input value={props.temp_element.data.border_size}/>
                <Change_Border_Color_Element_Input value={props.temp_element.data.border_color}/>
                <Change_Background_Color_Element_Input value={props.temp_element.data.background_color}/>
                <Change_Position_X_Element_Input value={props.temp_element.position.x}/>  
                <Change_Position_Y_Element_Input value={props.temp_element.position.y}/>  
            </div>
        )
    }
    return <></>
}

function Image_Config(props: {temp_element: Element}): JSX.Element{
    if(props.temp_element.data.type == TypeElement.Image){
        return(
            <div className = "Config">
                <Change_Image_Input value ={props.temp_element.data.src}/>
                <Change_Position_X_Element_Input value={props.temp_element.position.x}/>  
                <Change_Position_Y_Element_Input value={props.temp_element.position.y}/>  
            </div>
        )
    }
    return <></>
}

function Text_Config(props: {temp_element: Element}): JSX.Element{
    if(props.temp_element.data.type == TypeElement.Text){
        return(
            <div className = "Config">
                <Change_Text_Input value={props.temp_element.data.text} />
                <Change_Font_Text_Input value={props.temp_element.data.font} />
                <Change_Size_Text_Input value={props.temp_element.data.font_size} />
                <Change_Position_X_Element_Input value={props.temp_element.position.x}/>  
                <Change_Position_Y_Element_Input value={props.temp_element.position.y}/>  
            </div>
        )
    }
    return <></>
}

function Change_Image_Input(props: {value: string}): JSX.Element{
    const [state, change_state] = useState(props.value)
    Add_State_Updater_Config_Inputs('src', change_state)
    function on_change(event: React.ChangeEvent<HTMLInputElement>){
        change_state(event.target.value)
    }
    return (
        <>
            <label htmlFor="Change_Image_Input">URL картинки</label>
            <input type='url' className='Change_Image' id="Change_Image_Input" value={state} onChange={on_change}/>
        </>
    )
}

function Change_Text_Input(props: {value: string}): JSX.Element{
    const [state, change_state] = useState(props.value)
    Add_State_Updater_Config_Inputs('text', change_state)
    function on_change(event: React.ChangeEvent<HTMLInputElement>){
        change_state(event.target.value)
    }
    return (
        <>
            <label htmlFor='Change_Text_Input'>Текст</label>
            <input type='text' className='Change_Text' id="Change_Text_Input" value={state} onChange={on_change}/>
        </>
    )
}

function Change_Font_Text_Input(props: {value: string}): JSX.Element{
    const [state, change_state] = useState(props.value)
    Add_State_Updater_Config_Inputs('font', change_state)
    function on_change(event: React.ChangeEvent<HTMLInputElement>){
        change_state(event.target.value)
    }
    return (
        <>
            <label htmlFor='Change_Font_Text_Input'>Шрифт</label>        
            <input type='text' className='Change_Font_Text' id='Change_Font_Text_Input' value={state} onChange={on_change}/>
        </>
    )
}

function Change_Size_Text_Input(props: {value: number}): JSX.Element{
    const [state, change_state] = useState(props.value)
    Add_State_Updater_Config_Inputs('size-text', change_state)
    function on_change(event: React.ChangeEvent<HTMLInputElement>){
        change_state(Number(event.target.value))
    }
    return (
        <>
            <label htmlFor='Change_Size_Text_Input'>Размер текста</label>
            <input type='number' className='Change_Size_Text' id='Change_Size_Text_Input' value={state} onChange={on_change}/>
        </>
    )
}

function Change_Border_Size_Element_Input(props: {value: number}): JSX.Element{
    const [state, change_state] = useState(props.value)
    Add_State_Updater_Config_Inputs('border-size', change_state)
    function on_change(event: React.ChangeEvent<HTMLInputElement>){
        change_state(Number(event.target.value))
    }
    return (
        <>
            <label htmlFor='Change_Border_Size_Element_Input'>Толщина границы</label>
            <input type='number' className='Change_Border_Element_Size' id='Change_Border_Size_Element_Input' value={state} onChange={on_change}/>
        </>
    )
}

function Change_Border_Color_Element_Input(props: {value: string}): JSX.Element{
    const [state, change_state] = useState(props.value)
    Add_State_Updater_Config_Inputs('border-color', change_state)
    function on_change(event: React.ChangeEvent<HTMLInputElement>){
        change_state(event.target.value)
    }
    return (
        <>
            <label htmlFor='Change_Border_Color_Element_Input'>Цвет границы</label>
            <input type='color' className='Change_Border_Color_Element' id='Change_Border_Color_Element_Input' value={state} onChange={on_change}/>
        </>
    )
}

function Change_Background_Color_Element_Input(props: {value: string}): JSX.Element{
    const [state, change_state] = useState(props.value)
    Add_State_Updater_Config_Inputs('color', change_state)
    function on_change(event: React.ChangeEvent<HTMLInputElement>){
        change_state(event.target.value)
    }
    return (
        <>
            <label htmlFor='Change_Background_Color_Element_Input'>Цвет бэкграунда</label>
            <input type='color' className='Change_Background_Color_Element' id='Change_Background_Color_Element_Input' value={state} onChange={on_change}/>
        </>
    )
}


function Change_Background_Color_Slide_Input(props: {value: string}): JSX.Element{
    const [state, change_state] = useState(props.value)
    Add_State_Updater_Config_Inputs('color-slide', change_state)
    function on_change(event: React.ChangeEvent<HTMLInputElement>){
        change_state(event.target.value)
    }
    return (
        <>
            <label htmlFor='Change_Background_Color_Slide_Input'>Цвет слайда</label>
            <input type='color' className='Change_Background_Color_Slide' id='Change_Background_Color_Slide_Input' value={state} onChange={on_change}/>
        </>
    )
}

function Change_Background_Image_Slide_Input(props: {value: string}): JSX.Element{
    const [state, change_state] = useState(props.value)
    Add_State_Updater_Config_Inputs('src-slide', change_state)
    function on_change(event: React.ChangeEvent<HTMLInputElement>){
        change_state(event.target.value)
    }
    return (
        <>
            <label htmlFor='Change_Background_Image_Slide_Input'>Фоновое изображение слайда</label>
            <input type='url' className='Change_Background_Image_Slide' id='Change_Background_Image_Slide_Input' value={state} onChange={on_change}/>
        </>
    )
}

function Delete_Slide_Button(app: App): JSX.Element {
    return(
        <button className='Delete_Slide' onClick={function(){
            Delete_Slide(app.presentation)
            Add_History(app)
        }}>
            Удалить выделенные слайды
        </button>
    )
}


function Delete_Element_Button(app: App): JSX.Element{
    console.log(app)
    return (
        <button className='Delete_Element' onClick={function(){
            Delete_Elements(app.presentation)
            Update_State(app.presentation.slide_list[app.presentation.select_slides[0]].id, {...app.presentation.slide_list[app.presentation.select_slides[0]]})
            Update_State_Config(GetPanelType(app.presentation.slide_list[app.presentation.select_slides[0]]))
            Update_State_Config_Inputs(app.presentation.slide_list[app.presentation.select_slides[0]])
            Add_History(app)
        }}>
            Удалить выделенные элементы
        </button>
    )
}

function Change_Position_X_Element_Input(props: {value: number}): JSX.Element{
    const [state_X, change_state_X] = useState(props.value)
    Add_State_Updater_Config_Inputs('position_X', change_state_X)
    function on_change(event: React.ChangeEvent<HTMLInputElement>){
        change_state_X(Number(event.target.value))
    }
    
    return (
        <>
            <label htmlFor='Change_Position_Element_Input_X'>X</label>
            <input type='number' className='Change_Position_Element' id='Change_Position_Element_Input_X' value={state_X} onChange={on_change}/>
        </>
    )
}

function Change_Position_Y_Element_Input(props: {value: number}): JSX.Element{
    const [state_Y, change_state_Y] = useState(props.value)
    Add_State_Updater_Config_Inputs('position_Y', change_state_Y)
    function on_change(event: React.ChangeEvent<HTMLInputElement>){
        change_state_Y(Number(event.target.value))
    }
    
    return (
        <>
            <label htmlFor='Change_Position_Element_Input_Y'>Y</label>
            <input type='number' className='Change_Position_Element' id='Change_Position_Element_Input_Y' value={state_Y} onChange={on_change}/>
        </>
    )
}

function Apply_Button(app: App): JSX.Element{
    return(
        <button className="Apply_Button" onClick={function(){
            let presentation = app.presentation
            let Active_Slide = presentation.slide_list[presentation.select_slides[0]]
            
            if(Active_Slide.active_elements.length == 0){
                let new_color_slide: string = (document.getElementById('Change_Background_Color_Slide_Input') as HTMLInputElement).value
                let new_image_slide: string = (document.getElementById('Change_Background_Image_Slide_Input') as HTMLInputElement).value

                Change_Background_Color_Slide(presentation, new_color_slide)
                Change_Background_Image_Slide(presentation, new_image_slide)
                Add_History(app)

                Active_Slide = app.presentation.slide_list[presentation.select_slides[0]]
                Update_State(Active_Slide.id, Active_Slide) //
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
                            let new_border_color_element: string = (document.getElementById('Change_Border_Color_Element_Input') as HTMLInputElement).value
                            let new_background_color_element: string = (document.getElementById('Change_Background_Color_Element_Input') as HTMLInputElement).value
                            let new_position_elements: Position = {
                                x: Number((document.getElementById('Change_Position_Element_Input_X') as HTMLInputElement).value),
                                y: Number((document.getElementById('Change_Position_Element_Input_Y') as HTMLInputElement).value)
                            }

                            Change_Border_Size(presentation, new_border_size_element)
                            Change_Border_Color_Element(presentation, new_border_color_element) 
                            Change_Background_Color_Element(presentation, new_background_color_element)
                            Move_Elements(presentation, new_position_elements)
                            Add_History(app)
                            break;
                         
                        case TypeElement.Image:
                            let new_image: string = (document.getElementById('Change_Image_Input') as HTMLInputElement).value
                            let new_position_images: Position = {
                                x: Number((document.getElementById('Change_Position_Element_Input_X') as HTMLInputElement).value),
                                y: Number((document.getElementById('Change_Position_Element_Input_Y') as HTMLInputElement).value)
                            }

                            Change_Image(presentation, new_image)
                            Move_Elements(presentation, new_position_images)
                            Add_History(app)
                            break;
                        
                        case TypeElement.Text:
                            let new_text: string = (document.getElementById('Change_Text_Input') as HTMLInputElement).value
                            let new_font_text: string = (document.getElementById('Change_Font_Text_Input') as HTMLInputElement).value
                            let new_size_text: number = Number((document.getElementById('Change_Size_Text_Input') as HTMLInputElement).value)
                            let new_position_text: Position = {
                                x: Number((document.getElementById('Change_Position_Element_Input_X') as HTMLInputElement).value),
                                y: Number((document.getElementById('Change_Position_Element_Input_Y') as HTMLInputElement).value)
                            }

                            Change_Text(presentation, new_text)
                            Change_Font_Text(presentation, new_font_text)
                            Change_Size_Text(presentation, new_size_text)
                            Move_Elements(presentation, new_position_text)
                            Add_History(app)
                            break;
                        
                        default:
                            break;
                    }
                }
                app.presentation.slide_list[presentation.select_slides[0]].active_elements.forEach((element: number)=>{
                    let new_state = app.presentation.slide_list[presentation.select_slides[0]].elements[element]
                    Update_State(new_state.id, new_state)
                })
            }

            //ReactDOM.render(BackApp(app), document.getElementById('BackApp'))

        }}>Применить</button>
    )
}


/*
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Change_Background_Color_Element, Change_Border_Color_Element, Change_Border_Size, Change_Font_Text, Change_Image, Change_Size_Text, Change_Text, Move_Elements } from '../functions/WorkWith_Element';
import { Add_History } from '../functions/WorkWith_History';
import { Delete_Slide } from '../functions/WorkWith_Presentation';
import { Change_Background_Color_Slide, Change_Background_Image_Slide, Delete_Elements } from '../functions/WorkWith_Slide';
import { App, Position, Presentation, Size, TypeElement, Slide, Element} from '../Types';
import { Add_State_Updater_Config, Update_State } from '../StateChangers';

enum ActivePanel{
    Mixed,
    Text,
    Image,
    Figure,
    Slide
}

export function Type_Config(props: {app: App}): ActivePanel{
    let app = props.app
    let presentation = app.presentation
    let active_slide = presentation.slide_list[presentation.select_slides[0]]
    let type_panel: ActivePanel
    let Elements_Type: TypeElement

    if(active_slide.active_elements.length == 0){
        type_panel = ActivePanel.Slide
    }else{
        Elements_Type = active_slide.elements[active_slide.active_elements[0]].data.type
        switch (Elements_Type) {
            case TypeElement.Figure:
                type_panel = ActivePanel.Figure
                break;
            case TypeElement.Image:
                type_panel = ActivePanel.Image
                break;
            case TypeElement.Text:
                type_panel = ActivePanel.Text
                break;
        
            default:
                break;
        }
    }

    active_slide.active_elements.forEach(
        function(item){
            if(active_slide.elements[item].data.type != Elements_Type){
                type_panel = ActivePanel.Mixed
            }
        }
    )

    return type_panel!
}

export function Config(props: {type_panel: ActivePanel, app: App}): JSX.Element{

    const [state_config, change_ctate_config] = useState(props.type_panel)
    Add_State_Updater_Config(change_ctate_config)

    let app = props.app
    let active_slide = app.presentation.slide_list[app.presentation.select_slides[0]]
    let temp_element

    switch (state_config) {
        case ActivePanel.Slide:
            return (<>
                <Slide_Config active_slide={active_slide}/>
                <Buttons_Config app={app}/>
            </>)
        case ActivePanel.Figure:
            temp_element = active_slide.elements[active_slide.active_elements[0]]
            return (<>
                <Figure_Config temp_element={temp_element}/>
                <Buttons_Config app={app}/>
            </>)
        case ActivePanel.Image:
            temp_element = active_slide.elements[active_slide.active_elements[0]]
            return (<>
                <Image_Config temp_element={temp_element}/>
                <Buttons_Config app={app}/>
            </>)
        case ActivePanel.Text:
            temp_element = active_slide.elements[active_slide.active_elements[0]]
            return (<>
                <Text_Config temp_element={temp_element}/>
                <Buttons_Config app={app}/>
            </>)
        case ActivePanel.Mixed:
            temp_element = active_slide.elements[active_slide.active_elements[0]]
            return (<>
                <Buttons_Config app={app}/>
            </>)
        default:
            return(<div className = "Config"></div>)
    }
}

function Buttons_Config(props: {app: App}): JSX.Element{
    return(
        <div className='Config'>
            {Apply_Button(props.app)}
            {Delete_Element_Button(props.app)}
        </div>
    )
}

function All_Config(props: {active_slide: Slide}): JSX.Element{
    return(
        <div className='Config'>
            {Change_Position_Element_Input(props.active_slide.elements[props.active_slide.active_elements[0]].position)}  
        </div>
    )
}

function Slide_Config(props: {active_slide: Slide}): JSX.Element{
    return(
        <div className='Config'>
            {Change_Background_Color_Slide_Input(props.active_slide.background.color)}
            {Change_Background_Image_Slide_Input(props.active_slide.background.src)}
        </div>
    )
}

function Figure_Config(props: {temp_element: Element}): JSX.Element{
    if(props.temp_element.data.type == TypeElement.Figure){
        return(
            <div className = "Config">
                {Change_Border_Size_Element_Input(props.temp_element.data.border_size)}
                {Change_Border_Color_Element_Input(props.temp_element.data.border_color)}
                {Change_Background_Color_Element_Input(props.temp_element.data.background_color)}
                {Change_Position_Element_Input(props.temp_element.position)}
            </div>
        )
    }
    return <></>
}

function Image_Config(props: {temp_element: Element}): JSX.Element{
    if(props.temp_element.data.type == TypeElement.Image){
        return(
            <div className = "Config">
                {Change_Image_Input(props.temp_element.data.src)}
                {Change_Position_Element_Input(props.temp_element.position)}
            </div>
        )
    }
    return <></>
}
function Text_Config(props: {temp_element: Element}): JSX.Element{
    if(props.temp_element.data.type == TypeElement.Text){
        return(
            <div className = "Config">
                {Change_Text_Input(props.temp_element.data.text)}
                {Change_Font_Text_Input(props.temp_element.data.font)}
                {Change_Size_Text_Input(props.temp_element.data.font_size)}
                {Change_Position_Element_Input(props.temp_element.position)}
            </div>
        )
    }
    return <></>
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
                presentation = Change_Background_Color_Slide(presentation, new_color_slide)
                let new_image_slide: string = (document.getElementById('Change_Background_Image_Slide_Input') as HTMLInputElement).value
                presentation = Change_Background_Image_Slide(presentation, new_image_slide)
                app.presentation.slide_list = presentation.slide_list
                Add_History(app)
                Active_Slide = app.presentation.slide_list[presentation.select_slides[0]]
                Update_State(Active_Slide.id, Active_Slide)
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

                    app.presentation.slide_list = Move_Elements(presentation, new_position).slide_list
                    Add_History(app) 
                }
                else{
                    let temp_element = Active_Slide.elements[Active_Slide.active_elements[0]]
                    switch(temp_element.data.type){
                        case TypeElement.Figure:
                            let new_border_size_element: number = Number((document.getElementById('Change_Border_Size_Element_Input') as HTMLInputElement).value)
                            presentation = Change_Border_Size(presentation, new_border_size_element)
                            let new_border_color_element: string = (document.getElementById('Change_Border_Color_Element_Input') as HTMLInputElement).value
                            presentation = Change_Border_Color_Element(presentation, new_border_color_element) 
                            let new_background_color_element: string = (document.getElementById('Change_Background_Color_Element_Input') as HTMLInputElement).value
                            presentation = Change_Background_Color_Element(presentation, new_background_color_element)
                            let new_position_elements: Position = {
                                x: Number((document.getElementById('Change_Position_Element_Input_X') as HTMLInputElement).value),
                                y: Number((document.getElementById('Change_Position_Element_Input_Y') as HTMLInputElement).value)
                            }
                            app.presentation.slide_list = Move_Elements(presentation, new_position_elements).slide_list
                            Add_History(app)
                            break;
                         
                        case TypeElement.Image:
                            let new_image: string = (document.getElementById('Change_Image_Input') as HTMLInputElement).value
                            presentation = Change_Image(presentation, new_image)
                            let new_position_images: Position = {
                                x: Number((document.getElementById('Change_Position_Element_Input_X') as HTMLInputElement).value),
                                y: Number((document.getElementById('Change_Position_Element_Input_Y') as HTMLInputElement).value)
                            }
                            app.presentation.slide_list = Move_Elements(presentation, new_position_images).slide_list
                            Add_History(app)
                            break;
                        
                        case TypeElement.Text:
                            let new_text: string = (document.getElementById('Change_Text_Input') as HTMLInputElement).value
                            presentation = Change_Text(presentation, new_text)
                            let new_font_text: string = (document.getElementById('Change_Font_Text_Input') as HTMLInputElement).value
                            presentation = Change_Font_Text(presentation, new_font_text)
                            let new_size_text: number = Number((document.getElementById('Change_Size_Text_Input') as HTMLInputElement).value)
                            presentation = Change_Size_Text(presentation, new_size_text)
                            let new_position_text: Position = {
                                x: Number((document.getElementById('Change_Position_Element_Input_X') as HTMLInputElement).value),
                                y: Number((document.getElementById('Change_Position_Element_Input_Y') as HTMLInputElement).value)
                            }
                            app.presentation.slide_list = Move_Elements(presentation, new_position_text).slide_list
                            Add_History(app)
                            break;
                        
                        default:
                            break;
                    }
                }
                app.presentation.slide_list[presentation.select_slides[0]].active_elements.forEach((element: number)=>{
                    let new_state = app.presentation.slide_list[presentation.select_slides[0]].elements[element]
                    Update_State(new_state.id, new_state)
                })
            }

            //ReactDOM.render(BackApp(app), document.getElementById('BackApp'))

        }}>Применить</button>
    )
}
*/