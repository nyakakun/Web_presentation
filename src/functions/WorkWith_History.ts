import { Presentation, Slide, Size, Position, Element, Background, TypeElement, TextObj, App} from "../Types"
import { v4 as uuidv4 } from 'uuid'

/**
 * @param {App} app
 * @return {Presentation}
 */
export function Redo(app: App): Presentation {
    if(app.command_history.history.length > (app.command_history.Last + 1)){
        return app.command_history.history[++app.command_history.Last]
    }
    return app.command_history.history[app.command_history.Last]
}

/**
 * @param {App} app
 * @return {Presentation}
 */
export function Undo(app: App): Presentation {
    if(app.command_history.Last == 0){
        return app.command_history.history[app.command_history.Last]
    }
    return app.command_history.history[--app.command_history.Last]
}

/**
 * @param {App} app
 */
export function Add_History(app: App){
    if(app.command_history.history.length > app.command_history.Last){
        app.command_history.history = app.command_history.history.slice(0, app.command_history.Last)
    }
    app.command_history.history.push(app.presentation)
}