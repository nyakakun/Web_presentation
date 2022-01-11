import { Presentation, Slide, Size, Position, Element, Background, TypeElement, TextObj} from "../Types"

/**
 * @param {Presentation} presentation
 * @param {string} src
 * @return {Presentation}
 */
export function Change_Image(presentation: Presentation, src: string) {
    let temp_slide_list: Slide[] = presentation.slide_list
    let temp_slide: Slide = temp_slide_list[presentation.select_slides[0]]
    temp_slide.active_elements.forEach(
        function(item) {
            let temp_element: Element = temp_slide.elements[item]
            if(temp_element.data.type == TypeElement.Image){
                temp_element.data.src = src
            }
        }
    )
}

/**
 * @param {Presentation} presentation
 * @param {string} new_text
 * @return {Presentation}
 */
export function Change_Text(presentation: Presentation, new_text: string) {
    let temp_slide_list: Slide[] = presentation.slide_list
    let temp_slide: Slide = temp_slide_list[presentation.select_slides[0]]
    temp_slide.active_elements.forEach(
        function(item) {
            let temp_element: Element = temp_slide.elements[item]
            if(temp_element.data.type == TypeElement.Text){
                temp_element.data.text = new_text
            }
        }
    )
}

/**
 * @param {Presentation} presentation
 * @param {string} new_text
 * @return {Presentation}
 */
export function Change_Font_Text(presentation: Presentation, new_font: string) {
    let temp_slide_list: Slide[] = presentation.slide_list
    let temp_slide: Slide = temp_slide_list[presentation.select_slides[0]]
    temp_slide.active_elements.forEach(
        function(item) {
            let temp_element: Element = temp_slide.elements[item]
            if(temp_element.data.type == TypeElement.Text){
                temp_element.data.font = new_font
            }
        }
    )
} 

/**
 * @param {Presentation} presentation
 * @param {number} new_size
 * @return {Presentation}
 */
export function Change_Size_Text(presentation: Presentation, new_size: number) {
    let temp_slide_list: Slide[] = presentation.slide_list
    let temp_slide: Slide = temp_slide_list[presentation.select_slides[0]]
    temp_slide.active_elements.forEach(
        function(item) {
            let temp_element: Element = temp_slide.elements[item]
            if(temp_element.data.type == TypeElement.Text){
                temp_element.data.font_size = new_size
            }
        }
    )
}

/**
 * @param {Presentation} presentation
 * @param {number} new_size
 * @return {Presentation}
 */
export function Change_Border_Size(presentation: Presentation, new_size: number){
    let temp_slide_list: Slide[] = presentation.slide_list
    let temp_slide: Slide = temp_slide_list[presentation.select_slides[0]]
    temp_slide.active_elements.forEach(
        function(item) {
            let temp_element: Element = temp_slide.elements[item]
            if(temp_element.data.type == TypeElement.Figure){
                temp_element.data.border_size = new_size
            }
        }
    )
}
/**
 * @param {Presentation} presentation
 * @param {string} new_color
 * @return {Presentation}
 */
export function Change_Border_Color_Element(presentation: Presentation, new_color: string){
    let temp_slide_list: Slide[] = presentation.slide_list
    let temp_slide: Slide = temp_slide_list[presentation.select_slides[0]]
    temp_slide.active_elements.forEach(
        function(item) {
            let temp_element: Element = temp_slide.elements[item]
            if(temp_element.data.type == TypeElement.Figure){
                temp_element.data.border_color = new_color
            }
        }
    )
}

/**
 * @param {Presentation} presentation
 * @param {string} new_color
 * @return {Presentation}
 */
export function Change_Background_Color_Element(presentation: Presentation, new_color: string){
    let temp_slide_list: Slide[] = presentation.slide_list
    let temp_slide: Slide = temp_slide_list[presentation.select_slides[0]]
    temp_slide.active_elements.forEach(
        function(item) {
            let temp_element: Element = temp_slide.elements[item]
            if(temp_element.data.type == TypeElement.Figure)
                temp_element.data.background_color = new_color
        }
    )
}

/**
 * @param {Presentation} presentation
 * @param {Size} new_size
 * @return {Presentation}
 */
export function Resize_Elements(presentation: Presentation, new_size: Size) {
    let temp_slide_list: Slide[] = presentation.slide_list
    let temp_slide: Slide = temp_slide_list[presentation.select_slides[0]]
    temp_slide.active_elements.forEach(
        function(item) {
            temp_slide.elements[item].size = new_size
        }
    )
}

/**
 * @param {Presentation} presentation
 * @param {Position} new_pos
 * @return {Presentation}    
 */
export function Move_Elements(presentation: Presentation, new_pos: Position) {

    let temp_slide_list: Slide[] = presentation.slide_list
    let temp_slide: Slide = temp_slide_list[presentation.select_slides[0]]
    temp_slide.active_elements.forEach(
        function(item) {
            temp_slide.elements[item].position = new_pos
        }
    )

} 

/*
import { Presentation, Slide, Size, Position, Element, Background, TypeElement, TextObj} from "../Types"

 export function Change_Image(presentation: Presentation, src: string): Presentation {

    let temp_presentation: Presentation = {...presentation}
    let temp_slide_list: Slide[] = [...temp_presentation.slide_list]
    let temp_slide: Slide = {...temp_slide_list[temp_presentation.select_slides[0]]}
    let temp_elements: Element[] = [...temp_slide.elements]
    let temp_element: Element = {...temp_elements[temp_slide.active_elements[0]]}
    if(temp_element.data.type == TypeElement.Image){

        temp_element.data.src = src

        temp_elements[temp_slide.active_elements[0]] = temp_element
        temp_slide.elements = temp_elements
        temp_slide_list[temp_presentation.select_slides[0]] = temp_slide
        temp_presentation.slide_list = temp_slide_list
    }

    return{
        ...temp_presentation
    }
}
export function Change_Text(presentation: Presentation, new_text: string) {
    let temp_presentation: Presentation = presentation
    let temp_slide_list: Slide[] = temp_presentation.slide_list
    let temp_slide: Slide = temp_slide_list[temp_presentation.select_slides[0]]
    let temp_elements: Element[] = temp_slide.elements
    let temp_element: Element = temp_elements[temp_slide.active_elements[0]]
    if(temp_element.data.type == TypeElement.Text){
        temp_element.data.text = new_text
    }
              
    return temp_presentation
}
export function Change_Font_Text(presentation: Presentation, new_font: string): Presentation {
    
    let temp_presentation: Presentation = {...presentation}
    let temp_slide_list: Slide[] = [...temp_presentation.slide_list]
    let temp_slide: Slide = {...temp_slide_list[temp_presentation.select_slides[0]]}
    let temp_elements: Element[] = [...temp_slide.elements]
    let temp_element: Element = {...temp_elements[temp_slide.active_elements[0]]}
    if(temp_element.data.type == TypeElement.Text){
        
        temp_element.data.font = new_font

        temp_elements[temp_slide.active_elements[0]] = temp_element
        temp_slide.elements = temp_elements
        temp_slide_list[temp_presentation.select_slides[0]] = temp_slide
        temp_presentation.slide_list = temp_slide_list
    }
    
    return{
        ...temp_presentation
    }
} 

export function Change_Size_Text(presentation: Presentation, new_size: number): Presentation {
    
    let temp_presentation: Presentation = {...presentation}
    let temp_slide_list: Slide[] = [...temp_presentation.slide_list]
    let temp_slide: Slide = {...temp_slide_list[temp_presentation.select_slides[0]]}
    let temp_elements: Element[] = [...temp_slide.elements]
    let temp_element: Element = {...temp_elements[temp_slide.active_elements[0]]}
    if(temp_element.data.type == TypeElement.Text){
        
        temp_element.data.font_size = new_size

        temp_elements[temp_slide.active_elements[0]] = temp_element
        temp_slide.elements = temp_elements
        temp_slide_list[temp_presentation.select_slides[0]] = temp_slide
        temp_presentation.slide_list = temp_slide_list
    }
    
    return{
        ...temp_presentation
    }

}
export function Change_Border_Size(presentation: Presentation, new_size: number): Presentation {
    
    let temp_presentation: Presentation = {...presentation}
    let temp_slide_list: Slide[] = [...temp_presentation.slide_list]
    let temp_slide: Slide = {...temp_slide_list[temp_presentation.select_slides[0]]}
    let temp_elements: Element[] = [...temp_slide.elements]
    let temp_element: Element = {...temp_elements[temp_slide.active_elements[0]]}
    if(temp_element.data.type == TypeElement.Figure){
        
        temp_element.data.border_size = new_size

        temp_elements[temp_slide.active_elements[0]] = temp_element
        temp_slide.elements = temp_elements
        temp_slide_list[temp_presentation.select_slides[0]] = temp_slide
        temp_presentation.slide_list = temp_slide_list
    }
       
    return{
        ...temp_presentation
    }
}
export function Change_Border_Color_Element(presentation: Presentation, new_color: string): Presentation {
   
    let temp_presentation: Presentation = {...presentation}
    let temp_slide_list: Slide[] = [...temp_presentation.slide_list]
    let temp_slide: Slide = {...temp_slide_list[temp_presentation.select_slides[0]]}
    let temp_elements: Element[] = [...temp_slide.elements]
    let temp_element: Element = {...temp_elements[temp_slide.active_elements[0]]}
    if(temp_element.data.type == TypeElement.Figure){
        
        temp_element.data.border_color = new_color
        
        temp_elements[temp_slide.active_elements[0]] = temp_element
        temp_slide.elements = temp_elements
        temp_slide_list[temp_presentation.select_slides[0]] = temp_slide
        temp_presentation.slide_list = temp_slide_list
    }
       
    return{
        ...temp_presentation
    }
}
export function Change_Background_Color_Element(presentation: Presentation, new_color: string): Presentation {
   
    let temp_presentation: Presentation = {...presentation}
    let temp_slide_list: Slide[] = [...temp_presentation.slide_list]
    let temp_slide: Slide = {...temp_slide_list[temp_presentation.select_slides[0]]}
    let temp_elements: Element[] = [...temp_slide.elements]
    temp_presentation.select_slides.forEach(
        function(item) {
            let temp_element: Element = {...temp_elements[item]}
            if(temp_element.data.type == TypeElement.Figure)
                temp_element.data = {...temp_element.data, background_color: new_color}
            temp_elements[item] = temp_element
        }
    )
    temp_slide.elements = temp_elements
    temp_slide_list[temp_presentation.select_slides[0]] = temp_slide
    temp_presentation.slide_list = temp_slide_list
       
    return{
        ...temp_presentation
    }
}
export function Resize_Elements(presentation: Presentation, new_size: Size): Presentation {
    let temp_presentation: Presentation = {...presentation}
    let temp_slide_list: Slide[] = [...temp_presentation.slide_list]
    let temp_slide: Slide = {...temp_slide_list[temp_presentation.select_slides[0]]}
    let temp_elements: Element[] = [...temp_slide.elements]
    temp_presentation.select_slides.forEach(
        function(item) {
            let temp_element: Element = {...temp_elements[item], size: new_size}
            temp_elements[item] = temp_element
        }
    )
    temp_slide.elements = temp_elements
    temp_slide_list[temp_presentation.select_slides[0]] = temp_slide
    temp_presentation.slide_list = temp_slide_list
    return{
        ...temp_presentation
    }
}

export function Move_Elements(presentation: Presentation, new_pos: Position): Presentation {

    let temp_presentation: Presentation = {...presentation}
    let temp_slide_list: Slide[] = [...temp_presentation.slide_list]
    let temp_slide: Slide = {...temp_slide_list[temp_presentation.select_slides[0]]}
    let temp_elements: Element[] = [...temp_slide.elements]
    temp_presentation.select_slides.forEach(
        function(item) {
            let temp_element: Element = {...temp_elements[item], position: new_pos}
            temp_elements[item] = temp_element
        }
    )
    temp_slide.elements = temp_elements
    temp_slide_list[temp_presentation.select_slides[0]] = temp_slide
    temp_presentation.slide_list = temp_slide_list

    return{
        ...temp_presentation
    }
} 
*/