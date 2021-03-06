// Pro akce, které používají asynchronní volání je vhodné používat sufix SUCCESS.
// To značí, že se daná akce vyvolá v případě úspěšného načtení dat z api.
// Lze pak přidávat další akce jako např. LOAD_COURSES_ERROR, která se vyvolá v případě neúspěšného načtení dat apod.
export const BEGIN_AJAX_CALL = 'BEGIN_AJAX_CALL';
export const AJAX_CALL_ERROR = 'AJAX_CALL_ERROR';

export const LOAD_COURSES_SUCCESS = 'LOAD_COURSES_SUCCESS';
export const LOAD_AUTHORS_SUCCESS = 'LOAD_AUTHORS_SUCCESS';
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const UPDATE_COURSE_SUCCESS = 'UPDATE_COURSE_SUCCESS';

