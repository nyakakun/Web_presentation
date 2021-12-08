export type {
    App,
    Presentation,
    History,
    Slide,
    Background,
    Position,
    Size,
    TextObj,
    ImageObj,
    FigureObj,
    Square,
    Triangle,
    Circle,
    Element,


}

type App = {
    command_history: History,
    presentation: Presentation,
}

type Presentation = {
    presentation_name: string,
    active_slide: number,
    slide_list: Slide[],
    select_slides: number[],
}

type History = {

}

type Slide = {
    backgrond: Background,
    elements: Element[],
    active_object: Number,
}

type Background = {
    src: string,
    color: string,
}

type Position = {
    x: number,
    y: number,
}

type Size = {
    h: number,
    w: number,
}

type TextObj = {
    type: 'text',
    text: string,
    text_color: string,
    font: string,
    font_size: number,
}

type ImageObj = {
    type: 'img',
    src: string
}

type FigureObj = {
    type: 'figure',
    Border_color: string,
    Border_size: number,
    figureType: Circle | Triangle | Square,
}

type Square = {

}

type Triangle = {

}

type Circle = {

}

type Element = {
    size: Size,
    position: Position,
    data: TextObj | ImageObj | FigureObj,
}

/*
let a: Element

a.data.type == 'figure' && a.data.figureType

*/
