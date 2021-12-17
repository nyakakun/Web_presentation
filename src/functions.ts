import { Presentation, Slide, Size, Position, Element, Background, TypeElement, TextObj} from "./Types"
//import { v4 as uuidv4 } from 'uuid'

/**
 * @param {Presentation} presentation
 * @return {File}
*/
export function Export(presentation: Presentation) {}

export function Redo() {}

export function Undo() {}

/**
 * @param {Presentation} presentation
 * @return {string}
 */
export function Save(presentation: Presentation) {}

/**
 * @param {string} file
 * @return {Presentation}
 */
export function Load(file: string) {}

export function Whatch_Presentation() {}

export function Edit_Presentation() {}

/**
 * @param {Presentation} presentation
 * @param {string} name
 * @return {Presentation} 
 */
export function Change_Name(presentation: Presentation, name: string): Presentation {
    return {
        ...presentation, presentation_name: name
    }
}

/*
export function Change_Name(presentation: Presentation, name: string) {
    presentation.presentation_name = name;
}
*/

/**
 * @param {number[]} elements
 * @param {Slide} from_slide
 */
export function Copy(elements: number[], from_slide: Slide) {}

/**
 * @param {number[]} elements
 * @param {Slide} from_slide
 */
export function Cut(elements: number[], from_slide: Slide) {}

/**
 * @param {number[]} elements
 * @param {Slide} to_slide
 */
export function Paste(elements: number[], to_slide: Slide) {}

/**
 * @param {Element} element
 * @param {string} src
 * @return {Element}
 */
export function Change_Image(element: Element, src: string) {

}

/**
 * @param {Slide} slide
 * @param {string} new_color
 * @return {Slide}
 */
export function Change_Background_Color(slide: Slide, new_color: string): Slide {
    return{
        ...slide, background: {
            ...slide.background,
            color: new_color
        }
    }
}

/**
 * @param {Slide} slide
 * @param {string} new_src
 * @return {Slide}
 */
export function Change_Background_Image(slide: Slide, new_src: string) {
    return{
        ...slide, background: {
            ...slide.background,
            src: new_src
        }
    }
}

/**
 * @param {Presentation} presentation
 * @param {Element} element
 * @return {Presentation}  
 */
export function Add_Element(presentation: Presentation, element: Element): Presentation {

    var TempPresentation: Presentation = {...presentation}
    var TempSlideList: Slide[] = {...TempPresentation.slide_list}
    var TempSlide: Slide = {...TempSlideList[TempPresentation.select_slides[0]]}
    let TempElements: Element[] = [...TempSlide.elements]

    TempElements.push(element)

    TempSlide.elements = TempElements
    TempSlideList[TempPresentation.select_slides[0]] = TempSlide
    TempPresentation.slide_list = TempSlideList

    return {
        ...TempPresentation
    }
}

/**
 * @param {Slide} slide
 * @param {Element} element
 * @return {Slide}
 */
export function Delete_Elemnts(slide: Slide, element: Element) {}

/**
 * @param {Element} element
 * @param {Position} new_pos
 * @return {Element}
 */
export function Move_Elements(element: Element, new_pos: Position) {} 

/**
 * @param {Element} element
 * @param {Size} new_size
 * @return {Element}
 */
export function Resize_Elements(element: Element, new_size: Size): Element {
        return {
            ...element, size: new_size
        }
}

/**
 * @param {Presentation} presentation
 * @param {Slide} new_slide
 * @return {Presentation}
 */
export function Duplicate_Slide(presentation: Presentation, new_slide: Slide) {}

/**
 * @param {Presentation} presentation
 * @param {Slide} new_slide
 * @return {Presentation}
 */
export function Add_Slide(presentation: Presentation, new_slide: Slide) {}

/**
 * @param {Presentation} presentation
 * @param {number} slide
 * @return {Presentation}
 */
export function Delete_Slide(presentation: Presentation, slide: Slide) {}

/**
 * @param {Presentation} presentation
 * @param {number} target_slide
 * @param {number} new_pos
 * @return {Presentation}
 */
export function Move_Slide(presentation: Presentation, target_slide: Slide, new_pos: number) {} 

/**
 * @param {Presentation} presentation
 * @param {number} target_slide
 * @return {Presentation}
 */
export function Change_Active_Slide(presentation: Presentation, target_slide: Slide) {}

/**
 * @param {Element} element
 * @param {string} new_text
 * @return {Element}
 */
export function Change_Text(element: Element, new_text: string): Element {
    if(element.data.type == TypeElement.Text)
        return{
            ...element, data: {
                ...element.data,
                text: new_text
            }
        }
        
    return{...element}
}

/**
 * @param {Element} element
 * @param {string} new_text
 * @return {Element}
 */
export function Change_Font_Text(element: Element, new_text: string): Element {
    if(element.data.type == TypeElement.Text)
        return {
            ...element, data: {
                ...element.data, 
                font: new_text
        } 
    }
    return{...element}
} 

/**
 * @param {Element} element
 * @param {number} new_size
 * @return {Element}
 */
export function Change_Size_Text(element: Element, new_size: number) {
    if(element.data.type == TypeElement.Text)
    return{
        ...element, data: {
            ...element.data,
            font_size: new_size
        }
    }
    
return{...element}

}

/**
 * @param {Element} element
 * @param {number} new_size
 * @return {Element}
 */
export function Change_Border_Size(element: Element, new_size: number): Element {
    if(element.data.type == TypeElement.Figure)
        return{
            ...element, data: {
                ...element.data,
                border_size: new_size
            }
        }
    return{...element}
}
/**
 * @param {Element} element
 * @param {string} new_color
 * @return {Element}
 */
export function Change_Border_Color(element: Element, new_color: string): Element {
    if(element.data.type == TypeElement.Figure)
        return{
            ...element, data: {
                ...element.data,
                border_color: new_color
            }
        }
    return{...element}
}