import { is } from '@babel/types';
import React, { BaseSyntheticEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import {Element, Slide, TypeElement} from './Types'

type Updater_Function_Elements = Function
type Updater_Function_Slide = Function
type Updater_Function_Config = Function
type Updater_Function_Config_Inputs = Function
type Updater_Function_Slides = Function

let state_updater_elements: Map <string, Updater_Function_Elements> = new Map()
let state_updater_slide: Map <string, Updater_Function_Slide> = new Map()
let state_updater_config_inputs: Map <string, Updater_Function_Config_Inputs> = new Map()
let state_updater_config: Updater_Function_Config
let state_updater_slides: Map <string, Updater_Function_Config_Inputs> = new Map()

export function Add_State_Updater_Slides(name: string, update_function: Updater_Function_Slides): void{
    state_updater_slides.set(name, update_function)
}

export function Delete_State_Updater_Slides(id: string): void{
    if(state_updater_slides.has(id)) state_updater_slides.delete(id)
}

export function Add_State_Updater_Config_Inputs(name: string, update_function: Updater_Function_Elements): void{
    state_updater_config_inputs.set(name, update_function)
}

export function Add_State_Updater_Elements(id: string, update_function: Updater_Function_Elements): void{
    state_updater_elements.set(id, update_function)
}

export function Add_State_Updater_Slide(id: string, update_function: Updater_Function_Slide): void{
    state_updater_slide.set(id, update_function)
}

export function Add_State_Updater_Config(update_function: Updater_Function_Slide): void{
    state_updater_config = update_function
}

export function Delete_State_Updater(id: string): void{
    if(state_updater_elements.has(id)) state_updater_elements.delete(id)
    else if(state_updater_slide.has(id)) state_updater_slide.delete(id)
}

export function Clear_State_Updater_Config_Inputs(): void{
    state_updater_config_inputs.clear()
}

export function Update_State(id: string, new_state: any): void{
    if(Is_Element(new_state)){
        const Update = state_updater_elements.get(id)
        if(Update !== undefined) Update({...new_state})
    }else if(Is_Slide(new_state)){
        const Update = state_updater_slide.get(id)
        if(Update !== undefined) Update({...new_state})
    }
}

export function Update_State_Config(new_state: any): void{
    state_updater_config(new_state)
}

export function Update_State_Config_Inputs(new_state: Element | Slide): void{
    let state = {...new_state}
    if(Is_Element(state)){
        switch (state.data.type) {
            case TypeElement.Figure:
                console.log(state)
                if(state_updater_config_inputs.has('border-size')){
                    const Update = state_updater_config_inputs.get('border-size')
                    if(Update !== undefined) Update(state.data.border_size)
                }
                if(state_updater_config_inputs.has('border-color')){
                    const Update = state_updater_config_inputs.get('border-color')
                    if(Update !== undefined){
                        Update(state.data.border_color)
                    }
                }
                if(state_updater_config_inputs.has('color')){
                    const Update = state_updater_config_inputs.get('color')
                    if(Update !== undefined){
                        Update(state.data.background_color)
                    }
                }
                if(state_updater_config_inputs.has('border-size')){
                    const Update = state_updater_config_inputs.get('border-size')
                    if(Update !== undefined) Update(state.data.border_size)
                }
                break;
            case TypeElement.Image:
                if(state_updater_config_inputs.has('src')){
                    const Update = state_updater_config_inputs.get('src')
                    if(Update !== undefined) Update(state.data.src)
                }
                break;
            case TypeElement.Text:
                if(state_updater_config_inputs.has('text')){
                    const Update = state_updater_config_inputs.get('text')
                    if(Update !== undefined) Update(state.data.text)
                }
                if(state_updater_config_inputs.has('font')){
                    const Update = state_updater_config_inputs.get('font')
                    if(Update !== undefined) Update(state.data.font)
                }
                if(state_updater_config_inputs.has('size-text')){
                    const Update = state_updater_config_inputs.get('size-text')
                    if(Update !== undefined) Update(state.data.font_size)
                }
                break;
        
            default:
                break;
        }

        let temp_position = {...state.position}
        
        if(state_updater_config_inputs.has('position_X')){
            const Update = state_updater_config_inputs.get('position_X')
            if(Update !== undefined) Update(temp_position.x)
                    
            console.log('position_X есть')
        }
        
        if(state_updater_config_inputs.has('position_Y')){
            const Update = state_updater_config_inputs.get('position_Y')
            if(Update !== undefined) Update(temp_position.y)
                    
            console.log('position_Y есть')
        }
    }else if(Is_Slide(state)){
        if(state_updater_config_inputs.has('color-slide')){
            const Update = state_updater_config_inputs.get('color-slide')
            if(Update !== undefined) Update(state.background.color)
                    
            console.log('color-slide есть')
        }
        if(state_updater_config_inputs.has('src-slide')){
            const Update = state_updater_config_inputs.get('src-slide')
            if(Update !== undefined) Update(state.background.src)
                    
            console.log('src-slide есть')
        }
    }
}

function Is_Element(obj: any): obj is Element{
    return obj.data !== undefined
}

function Is_Slide(obj: any): obj is Slide{
    return obj.elements !== undefined
}