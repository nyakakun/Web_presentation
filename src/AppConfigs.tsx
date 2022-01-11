const width: number = window.screen.width
const height: number = window.screen.height
const attitude: number = height/width
const width_slide: number = 1920
const height_slide: number = 1080
const body_scale: number = 0.98

export const scale_slide: number = 0.8
export const scale_mini_slide: number = 0.15
export const scale_screen: number = width / width_slide
export const scale: number = scale_screen * scale_slide * body_scale
export const scale_mini: number = scale_screen * scale_mini_slide * body_scale
