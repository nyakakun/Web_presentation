import { Presentation, Slide, Size, Position, Element, Background, TypeElement, TextObj, App} from "../Types"

/**
 * @param {App} app
 * @return {Presentation}
 */
export function Redo(app: App): Presentation {
    if(app.command_history.history.length > (app.command_history.Last + 1)){
        return JSON.parse(JSON.stringify(app.command_history.history[++app.command_history.Last]))
    }
    return JSON.parse(JSON.stringify(app.command_history.history[app.command_history.Last]))
}

/**
 * @param {App} app
 * @return {Presentation}
 */
export function Undo(app: App): Presentation {
    if(app.command_history.Last == 0){
        return JSON.parse(JSON.stringify(app.command_history.history[app.command_history.Last]))
    }
    return JSON.parse(JSON.stringify(app.command_history.history[--app.command_history.Last]))
}

/**
 * @param {App} app
 */
export function Add_History(app: App){
    if(app.command_history.history.length > app.command_history.Last++){
        app.command_history.history = app.command_history.history.slice(0, app.command_history.Last)
    }
    app.command_history.history.push(JSON.parse(JSON.stringify(app.presentation)))
    console.log(app.command_history.history)
}