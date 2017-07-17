// Pro akce, které používají asynchronní volání je vhodné používat sufix SUCCESS.
// To značí, že se daná akce vyvolá v případě úspěšného načtení dat z api.
// Lze pak přidávat další akce jako např. LOAD_COURSES_ERROR, která se vyvolá v případě neúspěšného načtení dat apod.
export const LOAD_COURSES_SUCCESS = 'LOAD_COURSES_SUCCESS';