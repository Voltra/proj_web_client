import { $ } from "@js/loadJquery"

/**
 * A function that creates the DOM part for a photo based on its FlickrAPI representation
 * @param {object} photo - The photo's FlickrAPI object
 * @param {array} urls - The photo's url objects
 * @param {string} galleryIdentifier - The identifier for the fancybox gallery
 * @return {JQuery} The jquery object of the element created
 */
function makeImage(photo, urls, galleryIdentifier){
    const $a = $("<a></a>", {
        "data-fancybox": galleryIdentifier,
        "data-caption": photo.title._content,
        "href": urls[7].source
    });

    
    //1 -> Large Square
    //7 -> Large
    const url = urls[1].source
    $(`<img src='${url}'></img>`, {
        "data-content": JSON.stringify(photo),
        "alt": "img"
    }).appendTo($a);
    return $a;
}

/**
 * A function that creates the DOM part for a url (for the grid) based on its FlickrAPI representation
 * @param {object} photo - The photo's FlickrAPI object
 * @param {array} urls - The photo's url objects
 * @param {object} config - This app's config object
 * @return {JQuery} The jquery object of the element created
 */
function makeGridImage(photo, urls, config){
    return makeImage(photo, urls, config.galleries.grid);
}

/**
 * A function that creates the DOM part for a url (for the table) based on its FlickrAPI representation
 * @param {object} photo - The photo's FlickrAPI object
 * @param {array} urls - The photo's url objects
 * @param {object} config - This app's config object
 * @return {JQuery} The jquery object of the element created
 */
function makeTableImage(photo, urls, config){
    return makeImage(photo, urls, config.galleries.table);
}

/**
 * A function that resets the table part of the DOM
 * @param {object} config - This app's config object
 */
export function resetTable(config){
    const $tableTab = $(config.tabs.table);
    const $table = $(`<table id='${config.rawTableID}'></table>`);
    const $headRow = $("<tr></tr>");
    const $footRow = $("<tr></tr>");
    const $thead = $("<thead></thead>");
    const $tfoot = $("<tfoot></tfoot>");

    config.headers.map(text => [$("<th></th>", {text}), $("<th></th>", {text})])
    .forEach(([$header, $footerHeader]) => {
        $header.appendTo($headRow);
        $footerHeader.appendTo($footRow);
    });
    $headRow.appendTo($thead);
    $thead.appendTo($table);
    $("<tbody></tbody>").appendTo($table);
    $footRow.appendTo($tfoot);
    $tfoot.appendTo($table);
    $table.appendTo($tableTab);
    $table.DataTable();

    $(config.tabs.container).tabs("refresh");
}

/**
 * A function that resets the grid part of the DOM
 * @param {object} config - This app's config object
 */
export function resetGrid(config){
    const $gridTab = $(config.tabs.grid);
    $gridTab.empty();
    $gridTab.rowGrid({
        itemSelector: ".item",
        minMargin: 10,
        maxMargin: 35,
        resize: false,
        lastRowGrid: "last-row",
        firstItemClass: "first-item"
    });
}

/**
 * A function that adds a photo to the grid
 * @param {object} config - This app's config object
 * @param {object} photo - The photo object from the FlickrAPI that will be added to the grid
 * @param {array} urls - The photo's url objects
 */
function setupGrid(config, photo, urls){
    const $grid = $(config.tabs.grid);
    const $a = makeGridImage(photo, urls, config);
    $a.data("caption", `${photo.title._content} | ${photo.owner.username} | ${photo.dates.taken}`);
    $a.fancybox({
        protect: true
    });
    $a.appendTo("<div class='item'></div>").parent().appendTo($grid);
}

/**
 * A function that adds a photo to the table
 * @param {object} config - This app's config object
 * @param {object} photo - The photo object from the FlickrAPI that will be added to the table
 * @param {array} urls - The photo's url objects
 */
function setupTable(config, photo, urls){
    const $dataTable = $(config.rawTableSelector).DataTable();
    const $a = makeTableImage(photo, urls, config);
    $a.fancybox({
        protect: true
    });

    $dataTable.row.add([
        $a.appendTo("<div>").parent().html(),
        photo.title._content,
        photo.dates.taken,
        photo.owner.username
    ]).draw(false);
}


 /** A function that adds an image to both the grid and table view based on data from the API
  * @param {object} config - This app's config object
  * @param {array} temp0 - The response array for the photo's info
  * @param {array} temp1 - The response array for the photo's urls
  */
export function setupImage(config, [image, jqStatus, response], [sizesObj, jqStatusSizes, responseSizes]){
    if(image.stat !== "ok"){//Si le statut n'est pas "ok" alors il y a eu une erreur
        const error = `Error while fetching photo data : ${image.message}`;
        $.flash(error, "failure");
        console.error(error);
        console.error("response: ", response);
        return;
    }

    if(sizesObj.stat !== "ok"){//Si le résultat n'est pas "ok" alors il y a eu une erreur
        const error = `Error while fetching photo urls : ${sizesObj.message}`;
        $.flash(error, "failure");
        console.error(error);
        console.error("response: ", responseSizes);
        return;
    }

    const {photo} = image;
    const urls = sizesObj.sizes.size;
    setupGrid(config, photo, urls);
    setupTable(config, photo, urls);
}