# volby-na-dialku
Aplikácia na vytvorenie žiadostí a pre voľby poštou zo zahraničia alebo mimo miesta trvalého bydliska


## Štruktúra aplikácie na základe použitých technológií
Aplikácia je napísaná v HTML5, JavaScripte a CSS3. Postavená je
na knižnici jQuery a CSS frameworku Bootstrap 3.

### HTML
Základ pplikácie tvoria 4 html súbory ( statické strányk),
zodpovedajúcich členeniu jej užívateľského rozhrania. Aplikácia tak
neumožňuje spracovanie užívateľského vstupu (iného než požiadavka
na zobrazenie niektorej zo 4 html súborov aplikácie).

### JavaScript
Samotná aplikčná logiku by mala byť zabezpečená prostredníctvom
natiahnutia zodpovedajúcich JavaScriptových súborov. 

Všetky stránky aplikácie (okrem knižnice jQuery a skriptov dodávaných 
s Bootstrapom), využívajú spoločný JavaScriptový súbor 
js/main.js (zabezpečuje funkcionalitu spoločnú pre všetky stránky). 

Stránka (mimo-bydliska.html) s formulárom pre voličov, ktorí majú záujem
hlasovať na základe hlasovacieho preukazu, využíva JavaScriptový súbor 
js/away.js. V ňom obsiahntý kód by mal zabezpečiť vytvorenie pdf súboru
so žiadosťou o vydanie hlasovacieho preukazu z dát vložených do formulára.
 
Stránka s formulárom pre voličov, ktorí chcú hlasovať poštou
zo zahraničia (zo-zahranicia.html), využíva JavaScriptový súbor
js/abroad.js. Tento súbor by mal obsahovať kód zabezpečujúci vytvorenie 
pdf súborov:
  * žiadosť o voľbu poštou pre voličov, ktorí **majú** trvalý pobyt
  na území SR
  * žiadosť o voľbu poštou a čestného vyhlásenia, 
  pre voličov, ktorí **nemajú** trvalý pobyt na území SR.

### CSS
Všetky stránky aplikácie využívajú štýli spojené s frameworkom Bootstrap 3.
Zatiaľ len veľmi limitovanú kustomizáciu aplikácie zabezpečujú CSS pravidlá obsiahnuté
v súboere css/main.css.

## Užívateľské rozhranie

Applikáciia je z hľadiska užívateľa rozdelená do 4 častí:
 
1. Hlavná stránka (Home)
  * Základné informácie o voľbách
2. Hlasovanie v mieste trvalého pobytu
  * Základné informácie o hlasovaní v mieste trvalého pobytu
  * Náležitosti potrebené na hlasovanie v mieste trvalého pobytu
  * Postup, ako hlasovať v okrskovej volebnej miestnosti v mieste
  trvalého pobytu
3. Hlasovanie mimo miesta trvalého pobytu v rámci SR na základe
hlasovacieho preukazu
  * Základné informácie, ako požiadať obec svoj trvalého pobytu
  o vydanie hlasovacieho preukazu
  * Náležitosti potrebné k vydaniu hlasovacieho preukazu
  a hlasovaniu s hlasovacím preukazom
  * Postup, ako získať hlasovací preukaz a hlasovať s hlasovacím
  preukazom
  * Formulár na vytvorenie žiadosti o vydanie hlasovacieho preukazu
  (plus prípadné splnomocnenie, ak má preukaz prebrať poverená osoba)
4. Hlasovanie zo zahraničia
  1. voličov, ktorí **majú** trvalý pobyt na území SR
    * Základné informácie ako požiadať o voľbu poštou
    * Náležitosti potrebné na požiadanie o voľbu poštou
    * Postup, ako hlasovať poštou
    * Formulár na vytvorenie žiadosti o voľbu poštou
  2. voličov, ktorí **nemajú** trvalý pobyt na území SR
    * Základné informácie ako požiadať o voľbu poštou
    * Náležitosti potrebné na požiadanie o voľbu poštou
    * Postup, ako hlasovať poštou
    * Formulár na vytvorenie žiadosti o voľbu poštou a čestného 
    vyhlásenia, že volič nemá trvalý pobyt na území SR
 	
## TODO
V budúcnosti by malo byť do aplikácie doplnené: 

1. vytváranie pdf dokumentov z formulárov (hlavný účel aplikácie)
2. korekcia textov a upravenie vzhľadu aplikácie do viac
user-friendly podoby
3. SEO a Open Graph meta dát
4. integrácia so sociálnymi sieťami
5. ovládanie na vytlačenie formulárov priamo z aplikácie


## Licencia
MIT - čo zhruba znamená, že ktokoľvek môže zadarmo získať a využívať kópiu
tohto sofvéru a pripojených dokumentov (Softvér) bez akýchkoľvek obmedzení,
čo zahŕňa právo používať, kopírovať, modifikovať, spájať s iným softvérom, 
publikovať, rozširovať a predávať kópie tohto softvéru pod podmienkou, že 
každá kópia obsahuje súbor LICENSE (alebo súbor s rovnakým obsahom, ktorého
názov jednoznačne vyjadruje, že sa jedná súbor s licenčnými podmienkami),
ktorý je súčasťou tohto softvéru.
