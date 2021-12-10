/**
 * @param {Presentation} presentation
 * @return {File}
*/
function Export(presentation) {}

function Redo() {}

function Undo() {}

/**
 * @param {Presentation} presentation
 * @return {string}
 */
function Save(presentation) {}

/**
 * @param {string} file
 * @return {Presentation}
 */
function Load(file) {}

function Whatch_Presentation() {}

function Edit_Presentation() {}

/**
 * @param {Presentation} presentation
 * @param {string} name
 * @return {Presentation} 
 */
function Change_Name(presentation, name) {}

/**
 * @param {num[]} elements
 * @param {Slide} from_slide
 */
function Copy(elements, from_slide) {}

/**
 * @param {num[]} elements
 * @param {Slide} from_slide
 */
function Cut(elements, from_slide) {}

/**
 * @param {num[]} elements
 * @param {Slide} to_slide
 */
function Paste(elements, to_slide) {}

/**
 * @param {Element} element
 * @param {string} src
 * @return {Element}
 */
function Change_Image(element, src) {}

/**
 * @param {Slide} slide
 * @param {string} color
 * @return {Slide}
 */
function Change_Background_Color(slide, color) {}

/**
 * @param {Slide} slide
 * @param {string} src
 * @return {Slide}
 */
function Change_Background_Image(slide, src) {}

/**
 * @param {Slide} slide
 * @param {Element} element
 * @return {Slide}  
 */
function Add_Element(slide, element) {}

/**
 * @param {Slide} slide
 * @param {Element} element
 * @return {Slide}
 */
function Delete_Elemnt(slide, element) {}

/**
 * @param {Element} element
 * @param {Position} new_pos
 * @return {Element}
 */
function Move_Element(element, new_pos) {} 

/**
 * @param {Element} element
 * @param {Size} new_size
 * @return {Element}
 */
function Resize_Element(element, new_size) {}

/**
 * @param {Presentation} presentation
 * @param {Slide} slide
 * @return {Presentation}
 */
function Duplicate_Slide(presentation, new_slide) {}

/**
 * @param {Presentation} presentation
 * @param {Slide} new_slide
 * @return {Presentation}
 */
function Add_Slide(presentation, new_slide) {}

/**
 * @param {Presentation} presentation
 * @param {num} slide
 * @return {Presentation}
 */
function Delete_Slide(presentation, slide) {}

/**
 * @param {Presentation} presentation
 * @param {num} target_slide
 * @param {num} new_pos
 * @return {Presentation}
 */
function Move_Slide(presentation, target_slide, new_pos) {} 

/**
 * @param {Presentation} presentation
 * @param {num} target_slide
 * @return {Presentation}
 */
function Change_Active_Slide(presentation, target_slide) {}

/**
 * @param {Element} element
 * @param {string} new_text
 * @return {Element}
 */
function Change_Text(element, new_text) {}

/**
 * @param {Element} element
 * @param {string} new_text
 * @return {Element}
 */
function Change_Font_Text(element, new_text) {} 

/**
 * @param {Element} element
 * @param {num} new_size
 * @return {Element}
 */
function Change_Size_Text(element, new_size) {}

/**
 * @param {Element} element
 * @param {num} new_size
 * @return {Element}
 */
function Change_Border_Size(element, new_size) {}

/**
 * @param {Element} element
 * @param {string} color
 * @return {Element}
 */
function Change_Border_Color(element, color) {}