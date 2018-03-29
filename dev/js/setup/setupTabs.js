import { $ } from "@js/loadJquery"

/**
 * A function that sets up the tabbed part of the DOM
 * @param {object} param0 - The config object that has "tabs" as one of its keys
 */
export default function setupTabs({tabs}){
    const $tabs = $(tabs.container).tabs();
    $tabs.tabs("option", "active", 0);
}