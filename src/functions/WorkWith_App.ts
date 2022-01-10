import { type } from "os"
import { Presentation, Slide, Size, Position, Element, Background, TypeElement, TextObj, App, PresentationMode} from "../Types"



/**
 * @param {Presentation} presentation
 */
export function Save_Presentation(presentation: Presentation) {
    let json_presentation: string = JSON.stringify(presentation)
    let temp_button:HTMLAnchorElement = document.createElement("a")
    let file_Saver: Blob = new Blob([json_presentation], {type: 'plain/text'})
    temp_button.href = URL.createObjectURL(file_Saver)
    temp_button.download = presentation.presentation_name + '.json'
    temp_button.click()
}

/**
 * @param {Presentation} presentation
 * @return {Presentation}
 */
export function Load_Presentation(file_name: File, app: App) {
    let Reader: FileReader = new FileReader();
    Reader.onload = function(event){
        if(typeof(event.target?.result) == 'string'){
            let temp_presentation: Presentation = JSON.parse(event.target?.result) as Presentation
            console.log(temp_presentation)
        }

    }
    Reader.readAsText(file_name)
}

export function Whatch_Presentation(app: App) {
    app.mode = PresentationMode.Wiew
}
 
export function Edit_Presentation(app: App) {
    app.mode = PresentationMode.Edit
}

/**
* @param {Presentation} presentation
* @return {File}
*/
//export function Export_Presentation(presentation: Presentation) {}