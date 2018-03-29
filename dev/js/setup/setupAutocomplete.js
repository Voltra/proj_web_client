import { $ } from "@js/loadJquery"

/**
 * A function that sets up the autocomplete part of the DOM
 * @param {object} param0 - The config object that has "autocomplete" has one of its keys (the config)
 * @param {object} acConfig - The autocomplete configuration object
 */
export default function setupAutocomplete({autocomplete}, acConfig){
    const selector = autocomplete.container;
    
    autocomplete.source = ({term}, f_res)=>{
        if(/^\s+$/.test(term) || term.length < autocomplete.minLength)
            return;
        
        const url = acConfig.root;
        const e = _ => encodeURIComponent(_)
        const {maxRows} = autocomplete;
        
        $.getJSON(`${url}?commune=${e(term)}&maxRows=${e(maxRows)}`)
        .done(data => f_res(
            data.map(({Ville}) => ({
                label: Ville,
                value: Ville
            }))
        )).fail((_, e) => console.error(e));
    }
    
    $(selector).autocomplete(autocomplete);
}