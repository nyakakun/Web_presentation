import { Presentation, Slide, Size, Position, Element, Background, TypeElement, TextObj} from "../Types"

/**
 * @param {Presentation} presentation
 * @param {string} new_color
 * @return {Presentation}
 */
export function Change_Background_Color_Slide(presentation: Presentation, new_color: string){
    presentation.select_slides.forEach(
        function(item) {
            presentation.slide_list[item].background.color = new_color
        }
    )
}

/**
 * @param {Presentation} presentation 
 * @param {string} new_src
 * @return {Presentation}
 */
export function Change_Background_Image_Slide(presentation: Presentation, new_src: string){
    presentation.select_slides.forEach(
        function(item) {
            presentation.slide_list[item].background.src = new_src
        }
    )
}

/**
 * @param {Presentation} presentation
 * @param {Element} element
 * @return {Presentation}  
 */
export function Add_Element(presentation: Presentation, element: Element): Presentation {

    let temp_presentation: Presentation = {...presentation}
    let temp_slide_list: Slide[] = [...temp_presentation.slide_list]
    let temp_slide: Slide = {...temp_slide_list[temp_presentation.select_slides[0]]}
    let temp_elements: Element[] = [...temp_slide.elements, element]

    temp_slide.elements = temp_elements
    temp_slide.active_elements = [temp_elements.length - 1]
    temp_slide_list[temp_presentation.select_slides[0]] = temp_slide
    temp_presentation.slide_list = temp_slide_list

    return {
        ...temp_presentation
    }
}

/**
 * @param {Presentation} presentation
 * @return {Presentation}
 */
export function Delete_Elements(presentation: Presentation) {
    presentation.slide_list[presentation.select_slides[0]].active_elements.forEach(
        function(item, index){
            presentation.slide_list[presentation.select_slides[0]].elements.splice(item, 1)
        }
    )
    presentation.slide_list[presentation.select_slides[0]].active_elements = []
}

/**
 * @param {number[]} elements
 * @param {Slide} from_slide
export function Copy_Elements(elements: number[], from_slide: Slide) {}
 */

/**
 * @param {number[]} elements
 * @param {Slide} from_slide
export function Cut_Elements(presentation: number[], from_slide: Slide) {
    //Copy_Elements(presentation, arguments[1])
    //Delete_Elemnts(presentation, arguments[1])
}
 */

/**
 * @param {number[]} elements
 * @param {Slide} to_slide
export function Paste_Elements(elements: number[], to_slide: Slide) {}
 */