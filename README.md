# Structure des illustrations

`content_blueprint` est le dossier source, il contient tout les chapitres

`content_blueprint/chap_[#num]` est le dossier qui contient toutes les illustrations d'un chapitre. Il faut remplacer `[#num]` par le numero du chapitre.

`content_blueprint/chap_[#num]/planche_[#num].png` est l'illustration d'une planche. Il faut remplacer `[#num]` par le numero de la planche.

Les `[#num]` commence à 1.

Exemple de l'abre des illustrations:

```
content_blueprint/
    chap_1/
        planche_1.png
        planche_2.png
        planche_3.png
        planche_4.png
    chap_2/
        planche_1.png
        planche_2.png
```

Ensuite, le `content_blueprint` est automatiquement transformer (quand le site web est contruit) dans `content` qui lui comprend les images compressées.

# Développement web

1. Installer [direnv](https://direnv.net/docs/installation.html) et [nix package manager](https://nixos.org/download/)
2. Pour build & runner le site localement: `just build`

## Pipeline

L'application convertir `content_blueprint` en `content`
voici ce qu'elle fait :

- Convertie les `.png` en `.webp`
- Convertie plusieurs `.png` pour en faire un `.pdf` : `magick *.png chapitre.pdf`
- Fait un `statics.json` qui liste toutes les pages possible d'un chapitre.
