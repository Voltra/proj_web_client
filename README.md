Ludwig GUERIN

Info 2 Groupe 2



# Mini projet Web Client Riche - Flickr API

## Architecture

```
.
|_ dev
|	|_ js
|	|	|_ setup
|	|	|	|_ setupAutocomplete.js
|	|	|	|_ setupForm.js
|	|	|	|_ setupImage.js
|	|	|	|_ setupTabs.js
|	|	|
|	|	|_ index.js (point d'entrée)
|	|	|_ loadJquery.js
|	|	|_ prototypes.js
|	|	|_ urls.js
|	|
|	|_ sql
|		|_ db.sql (pour mise en place de la base de données)
|
|_ node_modules
|
|_ public_html
|	|_ assets
|	|	|_ css
|	|	|	|_ main.css (styles de la page)
|	|	|	|_ [...]
|	|	|
|	|	|_ fonts
|	|	|_ images
|	|	|_ js
|	|	|	|_ index.bundle.js (fichier compilé)
|	|	|
|	|	|_ js-libs (bibliothèques récalcitrantes)
|	|	|	|_ dataTables.min.js
|	|	|	|_ fancybox.min.js
|	|	|	|_ row-grid.min.js
|	|	|
|	|	|_ json
|	|		|_ autocomplete.json (configuration de l'autocomplete)
|	|		|_ config.json (configuration de l'application)
|	|		|_ flickr.json (configuration de l'utilisation de l'API)
|	|
|	|_ commune.php
|	|_ index.html
|
|_ [...]
```



## Configurations (dans ` ./public_html/assets/json/`)

### autocomplete.json

`root` défini l'URL (absolue ou relative) du fichier PHP (à partir du dossier `public_html` si relative) à utiliser pour l'autocomplete (fichier donné ou URL proposée dans le sujet).



### config.json

* `form` : Sélecteur CSS pour le formulaire de recherche
* `autocomplete` :
  * `container` : Sélecteur vers le champs nécessitant l'autocomplete
  * `minLength` : Nombre de caractères minimal pour lancer l'autocomplete
  * `maxRows` : Nombre d'éléments maximal à récupérer par l'autocomplete
* `tabs` :
  * `container` : Sélecteur vers le conteneur des onglets (utilisé pour jQuery UI)
  * `grid` : Sélecteur vers l'onglet pour la vue grille
  * `table` : Sélecteur vers l'onglet pour la vue table
* `rawTableID` : ID à donner à la table de l'onglet pour la vue table
* `rawTableSelector` : Sélecteur vers la table de l'onglet pour la vue table
* `galleries` :
  * `grid` : Nom de la galerie pour les images de la vue grille
  * `table` : Nom de la galerie pour les images de la vue table
* `headers` : En-têtes de la table de la vue table



### flickr.json

* `key` : Clé d'API
* `root` : URL de communication vers l'API 



