import { $ } from "@js/loadJquery"
import {setupImage, resetTable, resetGrid} from "@js/setup/setupImage"

/**
 * A function that sets up the search form
 * @param {object} apiData - The api config object
 * @param {object} config - This app's config object
 */
export default function setupForm(apiData, config){
    const $form = $(config.form);
    $form.find("[type='submit']").button();
    $form.find("[name]")
    .button()
	.off("mouseenter")
	.off("mousedown")
    .off("keydown")
    .off("click")
    .css({
        font: "inherit",
        color: "inherit",
		background: "inherit !important",
        textAlign: "left",
        outline: "none",
        cursor: "text"
    });
    
    const {key} = apiData;
    const api = apiData.root //+ "?callback=?";
    const defaultSettings = {
        api_key: key,
        format: "json",
        nojsoncallback: 1
    };
    
    /**
     * Creates a valid FlicrAPI query string object
     * @param {string} method - The desired flickrAPI method
     * @param {object} obj - The extra configuration (for the query string)
     * @return {object} The settings object
     */
    const settings = (method, obj) => $.extend({}, defaultSettings, obj, {method});
    
    $form.on("submit", function(event){
        event.preventDefault();
        event.stopPropagation();        
        const $this = $(this);

        const input = $this.find("[name='complete']").eq(0).val().toString().toLowerCase();
        if(/^\s*$/.test(input)){
            $.flash("Le champs de recherche ne doit pas être vide", "failure");
            return;
        }

        const amount = parseInt( $this.find("[name='amount']").eq(0).val() );
        if(amount != amount){//is NaN
            $.flash("Le champs de limite doit contenir un entier positif", "failure");
            return;
        }

        
        [config.tabs.grid, config.tabs.table].map(e => $(e))
        .forEach($e => $e.empty());//On vide la table et la grille
        resetTable(config);//On réinitialise les données importantes
        resetGrid(config);//On réinitialise les données importantes
        $.getJSON(api, settings("flickr.photos.search", {//On fait une recherche par tag
            tags: input,
            per_page: amount,
            content_type: 1//Seulement des images
        })).done(res => {
            const {photos, stat} = res;
            if(stat !== "ok"){//Si le statut n'est pas "ok" alors il y a eu une erreur
                const error = "Erreur lors de la requête vers l'API";
                $.flash(error, "failure");
                console.log(error);
                console.log("response: ", res);
                return;
            }

            const images = photos.photo;

            if(images.length == 0){//Si il n'y a aucune image, alors il y a eu une erreur
                const error = "Aucune image n'a été trouvée";
                $.flash(error, "failure");
                console.log(error);
                return;
            }

            const updateImage = setupImage.bind(null, config);
            const withPhotoID = photo => ({photo_id: photo.id});
            images.map(photo => $.when(//Pour causer un bug, changer 'photo_id' pour 'id'
                $.getJSON(api, settings("flickr.photos.getInfo", withPhotoID(photo))),
                $.getJSON(api, settings("flickr.photos.getSizes", withPhotoID(photo)))
            )).forEach($deferred => $deferred.done(updateImage).fail((_, e)=>{
                const error = `Error while fetching a photo's info : ${e}`;
                $.flash(error, "failure");
                console.error(error);
            }));
        }).fail((_, e)=>{
            const error = `Error while fetching photos : ${e}`;
            $.flash(error, "failure");
            console.error(error);
        });
    });
}