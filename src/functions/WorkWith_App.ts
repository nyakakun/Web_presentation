import { Presentation, Slide, Size, Position, Element, Background, TypeElement, TextObj} from "../Types"

/**
 * @param {Presentation} presentation
 */
 export function Save_Presentation(presentation: Presentation) {}

 /**
  * @param {string} file
  * @return {Presentation}
  */
 export function Load_Presentation(file: string)/*: Presentation*/ {}
 
 export function Whatch_Presentation() {}
 
 export function Edit_Presentation() {}

 /**
 * @param {Presentation} presentation
 * @return {File}
 */
export function Export_Presentation(presentation: Presentation) {}