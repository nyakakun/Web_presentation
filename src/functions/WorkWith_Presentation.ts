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
 * @param {number} new_pos
 * @return {Presentation}
 */
export function Move_Slide(presentation: Presentation, new_pos: number) {
    function Compare(a: number, b: number) {if(a > b){return 1} else if(a == b){return 0} else {return -1}}
    let temp_presentation: Presentation = {...presentation}
    let temp_select_slides: number[] = [...temp_presentation.select_slides].sort(Compare)
    let temp_slide_list: Slide[] = []
    temp_presentation.slide_list.forEach(
        function(item, index){
            if(new_pos == index){
                temp_select_slides.forEach(
                    function(item){
                        temp_slide_list.push(temp_presentation.slide_list[item])
                    }
                )
            }
            if(temp_select_slides.indexOf(index) < 0){
                temp_slide_list.push(item)
            }
        }
    )
} 

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
