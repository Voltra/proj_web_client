import { $ } from "@js/loadJquery"
import { json } from "@js/urls"
import setupTabs from "@js/setup/setupTabs"
import setupAutocomplete from "@js/setup/setupAutocomplete"
import setupForm from "@js/setup/setupForm"

(function(){
    $.when(
        $.getJSON(json("flickr.json")),
        $.getJSON(json("autocomplete.json")),
        $.getJSON(json("config.json")),
    ).done(([apiData], [acData], [config]) => {
        $(document).ready(_ => {
            window.config = config;
            window.api = apiData;
            window.autocompleteData = acData;
            
            setupTabs(config);
            setupAutocomplete(config, acData)
            setupForm(apiData, config);

            window.makeGalleriesInterval= setInterval(()=>$("a[data-fancybox]").fancybox({protect: true}), 1000);
        });
    }).fail((_, e) => console.error(e));
})()