# Structure des illustrations

```content_blueprint``` est le dossier source, il contient tout les chapitres

```content_blueprint/chap_[#num]``` est le dossier qui contient toutes les illustrations d'un chapitre. Il faut remplacer ```[#num]``` par le numero du chapitre.

```content_blueprint/chap_[#num]/chap_[#num].pdf``` est le PDF téléchargeable.

```content_blueprint/chap_[#num]/page_[#num].png``` est l'illustration d'une seule page. Il faut remplacer ```[#num]``` par le numero de la page.

Les ```[#num]``` commence à 1.

Exemple de l'abre des illustrations:
```
content_blueprint/
    chap_1/
        chap_1.pdf
        page_1.png
        page_2.png
        page_3.png
        page_4.png
    chap_2/
        chap_2.pdf
        page_1.png
        page_2.png
```
Ensuite, le ```content_blueprint``` est automatiquement transformer (quand le site web est contruit) dans ```content``` qui lui comprend les images compressées.

# Développement web
1) Installer NPM
2) Pour runner le site: ```npx browser-sync start --server "build" --files "css/*.css, *.html" --port 8000```
3) Pour reconstruire le site: ```npm run build```

## Pipeline
### Statics
L'application "statics" permet de convertir ```content_blueprint``` en ```content```
voici ce qu'elle fait :
- Copie tout les folders et ```.pdf```
- Convertie les ```.png``` en ```.webp```
- Fait un ```statics.json``` qui liste toutes les pages possible d'un chapitre.