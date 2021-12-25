import { Presentation, Slide, Size, Position, Element, Background, TypeElement, TextObj} from "../Types"
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

/**
 * @param {Presentation} presentation
 * @param {Slide} new_slide
 * @return {Presentation}
 */
export function Add_Slide(presentation: Presentation, new_slide: Slide) {

    let temp_presentation: Presentation = {...presentation}
    let temp_slide_list: Slide[] = [...temp_presentation.slide_list, new_slide]
    
    temp_presentation.slide_list = temp_slide_list

    return {
        ...temp_presentation
    }
}

/**
 * @param {Presentation} presentation
 * @param {number} slide
 * @return {Presentation}
 */
export function Delete_Slide(presentation: Presentation): Presentation {

    let temp_presentation: Presentation = {...presentation}
    let temp_slide_list: Slide[] = []
    temp_presentation.slide_list.forEach(
        function(item, index){
            if(temp_presentation.select_slides.indexOf(index) < 0){
                temp_slide_list.push(item)
            }
        }
    )
    temp_presentation.slide_list = temp_slide_list
    temp_presentation.select_slides = []

    return{
        ...temp_presentation
    }

}

/**
 * @param {Presentation} presentation
 * @param {number} target_slide
 * @param {number} new_pos
 * @return {Presentation}
 */
export function Move_Slide(presentation: Presentation, target_slide: Slide, new_pos: number) {} 

/**
 * @param {Presentation} presentation
 * @param {number[]} target_slide
 * @return {Presentation}
 */
export function Change_Select_Slide(presentation: Presentation, target_slide: number[]) {
    return{
        ...presentation, select_slides: target_slide
    }
}


/**
 * @param {Presentation} presentation
 * @param {Slide} new_slide
 * @return {Presentation}
export function Duplicate_Slide(presentation: Presentation, new_slide: Slide) {}
 */
