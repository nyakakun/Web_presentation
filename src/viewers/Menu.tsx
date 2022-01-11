import React from 'react';
import './css/Menu.css'
import { Load_Presentation, Save_Presentation } from '../functions/WorkWith_App';
import { App, Presentation } from '../Types';

export function Menu(props: any){
    let app: App = props.app
    return (
        <div className="Menu">
            {Load_Button(app)}
            {Save_Button(app.presentation)}
            {Add_Slide_Button()}
            {Add_Element_Button()}
            {Start_View_Button()}
            {Name_Presentation(app.presentation.presentation_name)}
        </div>
    )
}

function Save_Button(presentation: Presentation){
    return (
        <button className='Save'
            onClick={function(){
                Save_Presentation(presentation)
            }}
        >
            Save
        </button>
    )
}

function Load_Button(app: App){
    return (
        <button className='Load' onClick={function() {
            let file_Loader = document.createElement('input')
            file_Loader.type = 'file'
            file_Loader.accept = 'application/json'
            file_Loader.multiple = false
            file_Loader.onchange = function(){
                if (file_Loader.files?.length !== undefined && file_Loader.files?.length > 0){
                    Load_Presentation(file_Loader.files[0], app)
                }
            }
            file_Loader.click()
        }}>
            Load
        </button>
    )
}

function Add_Slide_Button(){
    return (
        <button className='Add_Slide'>
            Add Slide
        </button>
    )
}

function Add_Element_Button(){
    return (
        <button className='Add_Element'>
            Add Element
        </button>
    )
}

function Start_View_Button(){
    return (
        <button className='Start_View'>
            Start View
        </button>
    )
}

function Name_Presentation(name: string){
    return (
        <span className='Presentation_Name'>{name}</span>
    )
}