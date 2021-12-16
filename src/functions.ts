import { Presentation, Slide, Size, Position, Element } from "./Types"
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
export function Change_Name(presentation: Presentation, name: string) {
    presentation.presentation_name = name;
}

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
export function Change_Image(element: Element, src: string) {}

/**
 * @param {Slide} slide
 * @param {string} color
 * @return {Slide}
 */
export function Change_Background_Color(slide: Slide, color: string) {}

/**
 * @param {Slide} slide
 * @param {string} src
 * @return {Slide}
 */
export function Change_Background_Image(slide: Slide, src: string) {}

/**
 * @param {Slide} slide
 * @param {Element} element
 * @return {Slide}  
 */
export function Add_Element(slide: Slide, element: Element) {}

/**
 * @param {Slide} slide
 * @param {Element} element
 * @return {Slide}
 */
export function Delete_Elemnt(slide: Slide, element: Element) {}

/**
 * @param {Element} element
 * @param {Position} new_pos
 * @return {Element}
 */
export function Move_Element(element: Element, new_pos: Position) {} 

/**
 * @param {Element} element
 * @param {Size} new_size
 * @return {Element}
 */
export function Resize_Element(element: Element, new_size: Size) {}

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
export function Change_Text(element: Element, new_text: string) {}

/**
 * @param {Element} element
 * @param {string} new_text
 * @return {Element}
 */
export function Change_Font_Text(element: Element, new_text: string) {} 

/**
 * @param {Element} element
 * @param {number} new_size
 * @return {Element}
 */
export function Change_Size_Text(element: Element, new_size: number) {}

/**
 * @param {Element} element
 * @param {number} new_size
 * @return {Element}
 */
export function Change_Border_Size(element: Element, new_size: number) {}

/**
 * @param {Element} element
 * @param {string} color
 * @return {Element}
 */
export function Change_Border_Color(element: Element, color: string) {}

/*export function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}*/