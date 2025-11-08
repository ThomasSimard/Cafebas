# Comment ouvrire le site web
1) Installer python
2) ```python -m http.server 8000```
3) ```http://localhost:8000/```

# Structure des illustrations

```content``` est le dossier source, il contient tout les chapitres

```content/chap_[#num]``` est le dossier qui contient toutes les illustrations d'un chapitre. Il faut remplacer ```[#num]``` par le numero du chapitre.

```content/chap_[#num]/page_[#num].png``` est l'illustration d'une seule page. Il faut remplacer ```[#num]``` par le numero de la page.

Les ```[#num]``` commence à 1.

Exemple de l'abre des illustrations:
```
content/
    chap_1/
        page_1.png
        page_2.png
        page_3.png
        page_4.png
    chap_2/
        page_1.png
        page_2.png
```