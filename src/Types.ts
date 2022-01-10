export enum PresentationMode{
    Wiew,
    Edit
}

export enum FigureType{
    Circle,
    Triangle,
    Rectangle
}

export enum TypeElement{
    Text,
    Image,
    Figure
}

export type App = {
    command_history: History,
    presentation: Presentation,
    mode: PresentationMode,
}

export type Presentation = {
    presentation_name: string,
    slide_list: Slide[],
    select_slides: number[],
}

export type History = {
    history: Presentation[]
    Last: number
}

export type Slide = {
    id: string,
    background: Background,
    elements: Element[],
    active_elements: number[],
}

export type Background = {
    src: string,
    color: string,
}

export type Position = {
    x: number,
    y: number,
}

export type Size = {
    h: number,
    w: number,
}

export type TextObj = {
    type: TypeElement.Text,
    text: string,
    text_color: string,
    font: string,
    font_size: number,
}

export type ImageObj = {
    type: TypeElement.Image,
    src: string
}

export type FigureObj = {
    type: TypeElement.Figure,
    border_color: string,
    border_size: number,
    background_color: string,
    figure_type: FigureType,
}

export type Element = {
    id: string,
    size: Size,
    position: Position,
    data: TextObj | ImageObj | FigureObj,
}