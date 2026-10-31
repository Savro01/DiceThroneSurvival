
/* ============================================================
   01 — INITIALISATION
   ============================================================ */

const zoneNavigation = document.getElementById("zoneNavigation");
const carteInteractive = document.getElementById("carteInteractive");
const surfaceCarte = document.getElementById("surfaceCarte");
const mapPrincipale = document.getElementById("mapPrincipale");
const conteneurZones = document.getElementById("zones");

zoneNavigation.addEventListener("dragstart", (event) => {
    event.preventDefault();
});


/* ============================================================
   02 — DONNÉES DES ZONES
   ============================================================ */

// Les positions sont des pourcentages de l'image.
// Le diamètre est un pourcentage de sa largeur.



const zones = [
    {
        nom: "Le volcan",
        positionX: 19.4,
        positionY: 11.0,
        diametre: 9.6,
        etat: "normale",
        image: "images/zones/zone_01_le_volcan.jpg",
        imageLoot: "images/listeLoot/ListeLoot1.png",
        imageAction: "images/listeAction/ActionZone1.png"
    },
    {
        nom: "La montagne sacrée",
        positionX: 30.7,
        positionY: 9.6,
        diametre: 9.6,
        etat: "normale",
        image: "images/zones/zone_02_la_montagne_sacree.jpg",
        imageLoot: "images/listeLoot/ListeLoot2.png",
        imageAction: "images/listeAction/ActionZone2.png"
    },
    {
        nom: "La forge écarlate",
        positionX: 10.2,
        positionY: 30.3,
        diametre: 9.4,
        etat: "normale",
        image: "images/zones/zone_03_la_forge_ecarlate.jpg",
        imageLoot: "images/listeLoot/ListeLoot3.png",
        imageAction: "images/listeAction/ActionZone3.png"
    },
    {
        nom: "Le cimetière des titans",
        positionX: 31.3,
        positionY: 27.4,
        diametre: 9.3,
        etat: "normale",
        image: "images/zones/zone_04_le_cimetiere_des_titans.jpg",
        imageLoot: "images/listeLoot/ListeLoot4.png",
        imageAction: "images/listeAction/ActionZone4.png"
    },
    {
        nom: "Les chutes majestueuses",
        positionX: 51.6,
        positionY: 28.6,
        diametre: 8.9,
        etat: "normale",
        image: "images/zones/zone_05_les_chutes_majestueuses.jpg",
        imageLoot: "images/listeLoot/ListeLoot5.png",
        imageAction: "images/listeAction/ActionZone5.png"
    },
    {
        nom: "La forêt des brumes",
        positionX: 77.1,
        positionY: 11.2,
        diametre: 9.4,
        etat: "normale",
        image: "images/zones/zone_06_la_foret_des_brumes.jpg",
        imageLoot: "images/listeLoot/ListeLoot6.png",
        imageAction: "images/listeAction/ActionZone6.png"
    },
    {
        nom: "La tour des mages",
        positionX: 89.9,
        positionY: 10.7,
        diametre: 8.8,
        etat: "normale",
        image: "images/zones/zone_07_la_tour_des_mages.jpg",
        imageLoot: "images/listeLoot/ListeLoot7.png",
        imageAction: "images/listeAction/ActionZone7.png"
    },
    {
        nom: "La mer de nuages",
        positionX: 76.8,
        positionY: 28.6,
        diametre: 8.8,
        etat: "normale",
        image: "images/zones/zone_08_la_mer_de_nuages.jpg",
        imageLoot: "images/listeLoot/ListeLoot8.png",
        imageAction: "images/listeAction/ActionZone8.png"
    },
    {
        nom: "L'aiguille noire",
        positionX: 87.3,
        positionY: 40.9,
        diametre: 8.9,
        etat: "normale",
        image: "images/zones/zone_09_laiguille_noire.jpg",
        imageLoot: "images/listeLoot/ListeLoot9.png",
        imageAction: "images/listeAction/ActionZone9.png"
    },
    {
        nom: "La grotte sous-marine",
        positionX: 66.6,
        positionY: 45.6,
        diametre: 9,
        etat: "normale",
        image: "images/zones/zone_10_la_grotte_sous_marine.jpg",
        imageLoot: "images/listeLoot/ListeLoot10.png",
        imageAction: "images/listeAction/ActionZone10.png"
    },
    {
        nom: "La cité éthérée",
        positionX: 55.1,
        positionY: 48.0,
        diametre: 9.5,
        etat: "normale",
        image: "images/zones/zone_11_la_cite_etheree.jpg",
        imageLoot: "images/listeLoot/ListeLoot11.png",
        imageAction: "images/listeAction/ActionZone11.png"
    },
    {
        nom: "La jungle luxuriante",
        positionX: 36.7,
        positionY: 53.5,
        diametre: 9.4,
        etat: "normale",
        image: "images/zones/zone_12_la_jungle_luxuriante.jpg",
        imageLoot: "images/listeLoot/ListeLoot12.png",
        imageAction: "images/listeAction/ActionZone12.png"
    },
    {
        nom: "La citadelle brisée",
        positionX: 19.5,
        positionY: 56.6,
        diametre: 9.4,
        etat: "normale",
        image: "images/zones/zone_13_la_citadelle_brisee.jpg",
        imageLoot: "images/listeLoot/ListeLoot13.png",
        imageAction: "images/listeAction/ActionZone13.png"
    },
    {
        nom: "Le refuge de l'ermite",
        positionX: 5.5,
        positionY: 61.5,
        diametre: 9.4,
        etat: "normale",
        image: "images/zones/zone_14_le_refuge_de_lermite.jpg",
        imageLoot: "images/listeLoot/ListeLoot14.png",
        imageAction: "images/listeAction/ActionZone14.png"
    },
    {
        nom: "Le désert aride",
        positionX: 29.1,
        positionY: 73.5,
        diametre: 9.1,
        etat: "normale",
        image: "images/zones/zone_15_le_desert_aride.jpg",
        imageLoot: "images/listeLoot/ListeLoot15.png",
        imageAction: "images/listeAction/ActionZone15.png"
    },
    {
        nom: "Le colisée éternel",
        positionX: 44.5,
        positionY: 77.9,
        diametre: 9.4,
        etat: "normale",
        image: "images/zones/zone_16_le_colisee_eternel.jpg",
        imageLoot: "images/listeLoot/ListeLoot16.png",
        imageAction: "images/listeAction/ActionZone16.png"
    },
    {
        nom: "Le bastion sombre",
        positionX: 74,
        positionY: 68.5,
        diametre: 9,
        etat: "normale",
        image: "images/zones/zone_17_le_bastion_sombre.jpg",
        imageLoot: "images/listeLoot/ListeLoot17.png",
        imageAction: "images/listeAction/ActionZone17.png"
    },
    {
        nom: "Le marais enchanté",
        positionX: 91.5,
        positionY: 73.9,
        diametre: 9.3,
        etat: "normale",
        image: "images/zones/zone_18_le_marais_enchante.jpg",
        imageLoot: "images/listeLoot/ListeLoot18.png",
        imageAction: "images/listeAction/ActionZone18.png"
    },
    {
        nom: "La fosse aux damnés",
        positionX: 65.0,
        positionY: 84.8,
        diametre: 9.3,
        etat: "normale",
        image: "images/zones/zone_19_la_fosse_aux_damnes.jpg",
        imageLoot: "images/listeLoot/ListeLoot19.png",
        imageAction: "images/listeAction/ActionZone19.png"
    },
    {
        nom: "L'île déserte",
        positionX: 13.7,
        positionY: 90.3,
        diametre: 8.7,
        etat: "normale",
        image: "images/zones/zone_20_lile_deserte.jpg",
        imageLoot: "images/listeLoot/ListeLoot20.png",
        imageAction: "images/listeAction/ActionZone20.png"
    }

    // Pour ajouter une zone, copie un objet et modifie ses valeurs.
    // États possibles : "normale", "dangereuse", "detruite"
];


/* ============================================================
   03 — NAVIGATION DE LA CARTE
   ============================================================ */

// --- Variables de navigation ---

let positionX = 0;
let positionY = 0;
let zoom = 1;

const zoomMinimum = 0.70;
const zoomMaximum = 3;

const pointeurs = new Map();
let modeNavigation = null;

let departX = 0;
let departY = 0;
let positionDepartX = 0;
let positionDepartY = 0;

let distanceDepart = 0;
let zoomDepart = 1;
let milieuDepartX = 0;
let milieuDepartY = 0;

let animationRetour = null;


// --- Dimensions de la map principale ---

function actualiserDimensionsCarte() {
    const largeurFenetre = zoneNavigation.clientWidth;
    const hauteurFenetre = zoneNavigation.clientHeight;

    // Une vidéo utilise videoWidth et videoHeight.
    const largeurImage = mapPrincipale.videoWidth;
    const hauteurImage = mapPrincipale.videoHeight;

    if (!largeurImage || !hauteurImage) return;

    // Ajuste la vidéo à l'écran sans déformer ses proportions.
    const echelle = Math.min(
        largeurFenetre / largeurImage,
        hauteurFenetre / hauteurImage
    );

    surfaceCarte.style.width =
        `${largeurImage * echelle}px`;

    surfaceCarte.style.height =
        `${hauteurImage * echelle}px`;
}



// --- Affichage de la carte ---

function actualiserCarte() {
    carteInteractive.style.transform =
        `translate(${positionX}px, ${positionY}px) scale(${zoom})`;
}


// --- Limites de déplacement ---

function obtenirLimites() {
    const largeurFenetre = zoneNavigation.clientWidth;
    const hauteurFenetre = zoneNavigation.clientHeight;

    const largeurCarte = surfaceCarte.offsetWidth * zoom;
    const hauteurCarte = surfaceCarte.offsetHeight * zoom;

    return {
        limiteX: Math.max(
            0,
            (largeurCarte - largeurFenetre) / 2
        ),
        limiteY: Math.max(
            0,
            (hauteurCarte - hauteurFenetre) / 2
        )
    };
}

function limiterValeur(position, limite) {
    return Math.max(-limite, Math.min(limite, position));
}


// --- Résistance élastique ---

function appliquerResistance(position, limite) {
    if (Math.abs(position) <= limite) {
        return position;
    }

    const signe = Math.sign(position);
    const depassement = Math.abs(position) - limite;

    const tailleEcran = Math.min(
        zoneNavigation.clientWidth,
        zoneNavigation.clientHeight
    );

    const resistance = tailleEcran * 0.25;
    const distanceSouple = tailleEcran * 0.14;

    const depassementSouple = resistance * (
        1 - Math.exp(-depassement / distanceSouple)
    );

    return signe * (limite + depassementSouple);
}

function limiterPosition() {
    const { limiteX, limiteY } = obtenirLimites();

    positionX = appliquerResistance(positionX, limiteX);
    positionY = appliquerResistance(positionY, limiteY);
}


// --- Animation de retour ---

function arreterAnimationRetour() {
    if (animationRetour !== null) {
        cancelAnimationFrame(animationRetour);
        animationRetour = null;
    }
}

function revenirDansLimites() {
    const { limiteX, limiteY } = obtenirLimites();

    const departPositionX = positionX;
    const departPositionY = positionY;

    const arriveeX = limiterValeur(positionX, limiteX);
    const arriveeY = limiterValeur(positionY, limiteY);

    if (
        departPositionX === arriveeX &&
        departPositionY === arriveeY
    ) {
        return;
    }

    const duree = 300;
    const debut = performance.now();

    function animer(maintenant) {
        const progression = Math.min(
            (maintenant - debut) / duree,
            1
        );

        const douceur = 1 - Math.pow(1 - progression, 4);

        positionX = departPositionX +
            (arriveeX - departPositionX) * douceur;

        positionY = departPositionY +
            (arriveeY - departPositionY) * douceur;

        actualiserCarte();

        if (progression < 1) {
            animationRetour = requestAnimationFrame(animer);
        } else {
            positionX = arriveeX;
            positionY = arriveeY;
            animationRetour = null;
            actualiserCarte();
        }
    }

    animationRetour = requestAnimationFrame(animer);
}


// --- Outils tactiles ---

function obtenirMilieuDeuxDoigts() {
    const doigts = [...pointeurs.values()];

    return {
        x: (doigts[0].x + doigts[1].x) / 2,
        y: (doigts[0].y + doigts[1].y) / 2
    };
}

function obtenirDistanceDeuxDoigts() {
    const doigts = [...pointeurs.values()];

    return Math.hypot(
        doigts[1].x - doigts[0].x,
        doigts[1].y - doigts[0].y
    );
}


// --- Début du déplacement ou du zoom ---

zoneNavigation.addEventListener("pointerdown", (event) => {
    if ((event.pointerType === "mouse" && event.button !== 0) || pointeurs.size >= 2 || event.target.closest(".zone")) {
        return;
    }
	
    arreterAnimationRetour();

    pointeurs.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
        type: event.pointerType
    });

    zoneNavigation.setPointerCapture(event.pointerId);

    if (pointeurs.size === 1) {
        modeNavigation = "deplacement";

        departX = event.clientX;
        departY = event.clientY;

        positionDepartX = positionX;
        positionDepartY = positionY;
    } else if (pointeurs.size === 2) {
        modeNavigation = "zoom";

        distanceDepart = obtenirDistanceDeuxDoigts();
        zoomDepart = zoom;

        const milieu = obtenirMilieuDeuxDoigts();

        milieuDepartX = milieu.x;
        milieuDepartY = milieu.y;
    }
});


// --- Déplacement et zoom ---

zoneNavigation.addEventListener("pointermove", (event) => {
    if (!pointeurs.has(event.pointerId)) return;

    pointeurs.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
        type: event.pointerType
    });

    if (
        pointeurs.size === 1 &&
        modeNavigation === "deplacement"
    ) {
        positionX = positionDepartX + event.clientX - departX;
        positionY = positionDepartY + event.clientY - departY;

        limiterPosition();
        actualiserCarte();
    }

    if (pointeurs.size === 2 && modeNavigation === "zoom") {
        const distanceActuelle = obtenirDistanceDeuxDoigts();

        if (distanceDepart <= 0) return;

        const nouveauZoom = Math.max(
            zoomMinimum,
            Math.min(
                zoomMaximum,
                zoomDepart * distanceActuelle / distanceDepart
            )
        );

        const milieu = obtenirMilieuDeuxDoigts();

        const centreX = zoneNavigation.clientWidth / 2;
        const centreY = zoneNavigation.clientHeight / 2;

        const pointCarteX =
            (milieuDepartX - centreX - positionX) / zoomDepart;

        const pointCarteY =
            (milieuDepartY - centreY - positionY) / zoomDepart;

        zoom = nouveauZoom;

        positionX = milieu.x - centreX - pointCarteX * zoom;
        positionY = milieu.y - centreY - pointCarteY * zoom;

        limiterPosition();
        actualiserCarte();
    }
});


// --- Fin du déplacement ou du zoom ---

function terminerDeplacement(event) {
    if (!pointeurs.has(event.pointerId)) return;

    pointeurs.delete(event.pointerId);

    if (pointeurs.size === 1) {
        const doigtRestant = [...pointeurs.values()][0];

        modeNavigation = "deplacement";

        departX = doigtRestant.x;
        departY = doigtRestant.y;

        positionDepartX = positionX;
        positionDepartY = positionY;
    } else if (pointeurs.size === 0) {
        modeNavigation = null;
        revenirDansLimites();
    }
}

zoneNavigation.addEventListener("pointerup", terminerDeplacement);
zoneNavigation.addEventListener("pointercancel", terminerDeplacement);


// --- Zoom à la molette sur PC ---

zoneNavigation.addEventListener("wheel", (event) => {
    event.preventDefault();

    if (pointeurs.size > 0) return;

    arreterAnimationRetour();

    const ancienZoom = zoom;
    const facteurZoom = event.deltaY < 0 ? 1.1 : 1 / 1.1;

    zoom = Math.max(
        zoomMinimum,
        Math.min(zoomMaximum, zoom * facteurZoom)
    );

    const rectangle = zoneNavigation.getBoundingClientRect();

    const sourisX = event.clientX - rectangle.left;
    const sourisY = event.clientY - rectangle.top;

    const centreX = zoneNavigation.clientWidth / 2;
    const centreY = zoneNavigation.clientHeight / 2;

    const pointCarteX =
        (sourisX - centreX - positionX) / ancienZoom;

    const pointCarteY =
        (sourisY - centreY - positionY) / ancienZoom;

    positionX = sourisX - centreX - pointCarteX * zoom;
    positionY = sourisY - centreY - pointCarteY * zoom;

    limiterPosition();
    actualiserCarte();
}, { passive: false });


// --- Redimensionnement de l'écran ---

window.addEventListener("resize", () => {
    actualiserDimensionsCarte();
    limiterPosition();
    actualiserCarte();
});


// --- Initialisation de la navigation ---

function initialiserNavigation() {
    actualiserDimensionsCarte();

    positionX = 0;
    positionY = 0;
    zoom = 1;

    actualiserCarte();
}


/* ============================================================
   04 — AFFICHAGE DES ZONES
   ============================================================ */

// --- Creations des zones ---
function creerZones() {
    conteneurZones.replaceChildren();

    zones.forEach((zone) => {
        const cercle = document.createElement("button");

        cercle.type = "button";
        cercle.classList.add("zone");

        // Évite les classes d'état inconnues.
        const etatsAutorises = [
            "normale",
            "dangereuse",
            "detruite"
        ];

        const etat = etatsAutorises.includes(zone.etat)
            ? zone.etat
            : "normale";

        cercle.classList.add(etat);

        cercle.setAttribute("aria-label", zone.nom);

        // Position par rapport à l'image.
        cercle.style.left = `${zone.positionX}%`;
        cercle.style.top = `${zone.positionY}%`;

        // Diamètre par rapport à la largeur de l'image.
        cercle.style.setProperty(
            "--diametre",
            `${zone.diametre}%`
        );

        // Une zone détruite n'est pas accessible.
        const accessible = etat !== "detruite";
        cercle.disabled = !accessible;

        cercle.addEventListener("click", () => {
			if (!accessible) return;

			const fenetre = document.getElementById("fenetreZone");
			const image = document.getElementById("imageZone");

			clearTimeout(minuterieFermeture);

			image.src = zone.image;
			image.alt = zone.nom;

			fenetre.classList.remove("fermetureEnCours");
			fenetre.classList.add("ouvertureEnCours");
			fenetre.classList.remove("masquee");

			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					fenetre.classList.remove("ouvertureEnCours");
				});
			});
		});

        conteneurZones.appendChild(cercle);
    });
}

// --- Fermeture de zone ---
const fenetreZone = document.getElementById("fenetreZone");
const imageZone = document.getElementById("imageZone");

let minuterieFermeture = null;

function fermerFenetreZone() {
    if (fenetreZone.classList.contains("masquee")) return;

    fenetreZone.classList.add("fermetureEnCours");

    clearTimeout(minuterieFermeture);

    minuterieFermeture = setTimeout(() => {
        fenetreZone.classList.add("masquee");
        fenetreZone.classList.remove("fermetureEnCours");
    }, 550);
}

fenetreZone.addEventListener("click", (event) => {
    // Un clic sur un logo ne ferme jamais la fenêtre.
    if (
        event.target.closest("#boutonListeLoot") ||
        event.target.closest("#boutonActionZone")
    ) {
        return;
    }

    // Un clic sur l'image principale ne ferme pas la fenêtre.
    if (imageZone.contains(event.target)) {
        return;
    }

    // Un clic sur le fond ferme la fenêtre et ses informations.
    fermerFenetreZone();
    cacherInfos();
});

document.addEventListener("click", (event) => {
    // Rien à faire si aucune zone n'est ouverte.
    if (fenetreZone.classList.contains("masquee")) return;

    // Un clic sur une zone est géré par son propre bouton.
    if (event.target.closest(".zone")) return;

    // Un clic en dehors de la fenêtre ferme tout.
    if (!fenetreZone.contains(event.target)) {
        fermerFenetreZone();
        cacherInfos();
    }
});

/* ============================================================
   05 — VUES DÉTAILLÉES ET CONTENU
   ============================================================ */

// --- Affichage des informations au survol ou au toucher ---

const logoLoot = document.getElementById("boutonListeLoot");
const logoAction = document.getElementById("boutonActionZone");

const infoLoot = document.getElementById("imageListeLoot");
const infoAction = document.getElementById("imageActionZone");

let logoActif = null;

// Cache les deux images d'information.
function cacherInfos() {
    infoLoot.classList.add("masquee");
    infoAction.classList.add("masquee");
    logoActif = null;
}

// Affiche l'image associée au logo.

function afficherInfo(logo, imageInfo) {
    const zone = zones.find(z => z.nom === imageZone.alt);

    if (!zone) return;

    const cheminImage = logo === logoLoot
        ? zone.imageLoot
        : zone.imageAction;

    infoLoot.classList.add("masquee");
    infoAction.classList.add("masquee");

    imageInfo.onload = () => {
        const positionLogo = logo.getBoundingClientRect();
        const surface = document.getElementById("surfaceZone");
        const positionSurface = surface.getBoundingClientRect();

        // Affiche temporairement l'image pour mesurer ses dimensions.
        imageInfo.classList.remove("masquee");

        const largeur = imageInfo.getBoundingClientRect().width;
        const hauteur = imageInfo.getBoundingClientRect().height;

        // Position initiale : au-dessus et à droite du logo.
		const decalageHorizontal = 4;
		const decalageVertical = 4;

		let gauche = positionLogo.right - positionSurface.left - decalageHorizontal;
		let haut = positionLogo.top - positionSurface.top - hauteur + decalageVertical;

        // Convertit les limites de la fenêtre en coordonnées de la surface.
        const marge = 8;
        const gaucheMin = window.scrollX + marge - positionSurface.left;
        const gaucheMax = window.scrollX + window.innerWidth - marge
            - positionSurface.left - largeur;
        const hautMin = window.scrollY + marge - positionSurface.top;
        const hautMax = window.scrollY + window.innerHeight - marge
            - positionSurface.top - hauteur;

        // Si l'image dépasse à droite, la place à gauche du logo.
        if (gauche > gaucheMax) {
            gauche = positionLogo.left - positionSurface.left - largeur + 80;
        }

        // Si elle dépasse en haut, la place sous le logo.
        if (haut < hautMin) {
            haut = positionLogo.bottom - positionSurface.top;
        }

        // Dernière sécurité : l'image reste dans les limites disponibles.
        gauche = Math.max(gaucheMin, Math.min(gauche, gaucheMax));
        haut = Math.max(hautMin, Math.min(haut, hautMax));

        imageInfo.style.left = `${gauche}px`;
        imageInfo.style.top = `${haut}px`;
        imageInfo.style.bottom = "auto";
        imageInfo.style.right = "auto";
        imageInfo.style.pointerEvents = "none";

        logoActif = logo;
    };

    imageInfo.alt = logo === logoLoot
        ? `Liste de loot : ${zone.nom}`
        : `Action : ${zone.nom}`;

    imageInfo.src = cheminImage;

    // Si l'image est déjà chargée, on déclenche aussi le calcul.
    if (imageInfo.complete && imageInfo.naturalWidth > 0) {
        imageInfo.onload();
    }
}


// Ordinateur : affichage au survol.
const appareilAvecSouris = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
);

logoLoot.addEventListener("mouseenter", () => {
    if (appareilAvecSouris.matches) {
        afficherInfo(logoLoot, infoLoot);
    }
});

logoLoot.addEventListener("mouseleave", () => {
    if (appareilAvecSouris.matches) {
        cacherInfos();
    }
});

logoAction.addEventListener("mouseenter", () => {
    if (appareilAvecSouris.matches) {
        afficherInfo(logoAction, infoAction);
    }
});

logoAction.addEventListener("mouseleave", () => {
    if (appareilAvecSouris.matches) {
        cacherInfos();
    }
});

// Téléphone et écran tactile : affichage au toucher.
function gererAppui(logo, imageInfo, event) {
    if (appareilAvecSouris.matches) return;

    event.preventDefault();
    event.stopPropagation();

    if (logoActif === logo) {
        cacherInfos();
    } else {
        afficherInfo(logo, imageInfo);
    }
}

logoLoot.addEventListener("click", (event) => {
    gererAppui(logoLoot, infoLoot, event);
});

logoAction.addEventListener("click", (event) => {
    gererAppui(logoAction, infoAction, event);
});


/* ============================================================
   06 — CHARGEMENT DE LA MAP
   ============================================================ */
   
const ecranChargement = document.getElementById("ecranChargement");
const videoChargement = document.getElementById("videoChargement");

function terminerChargement() {
    ecranChargement.classList.add("termine");
}

videoChargement.addEventListener("ended", terminerChargement);

// Si la vidéo ne peut pas être lue, ne bloque pas le site indéfiniment.
videoChargement.addEventListener("error", terminerChargement);


/* ============================================================
   07 — GESTION DU SON
   ============================================================ */

const sonFond = document.getElementById("sonFond");
let tentativeSonEffectuee = false;

function lancerSonFond() {
    if (!sonFond || !sonFond.paused || tentativeSonEffectuee) return;

    tentativeSonEffectuee = true;
    sonFond.volume = 0.25;

    sonFond.play()
        .then(() => {
            console.log("Musique lancée !");
        })
        .catch((erreur) => {
            console.log("Musique en attente d'une interaction :", erreur);
            tentativeSonEffectuee = false;
        });
}

// Si le navigateur bloque l'autoplay, le premier toucher ou clic relance la musique
function activerSonAuPremierGeste() {
    lancerSonFond();

    if (sonFond && !sonFond.paused) {
        document.removeEventListener("pointerdown", activerSonAuPremierGeste);
    }
}

document.addEventListener("pointerdown", activerSonAuPremierGeste);

/* ============================================================
   08 — AFFICHAGE DES CHEMINS
   ============================================================ */

const calqueChemins = document.getElementById("calqueChemins");
const boutonChemins = document.getElementById("boutonChemins");

boutonChemins.addEventListener("click", () => {
    const cheminsVisibles = calqueChemins.classList.toggle("visible");

    boutonChemins.textContent = cheminsVisibles
        ? "Masquer les chemins"
        : "Afficher les chemins";
});


/* ============================================================
   09 — INITIALISATION GÉNÉRALE
   ============================================================ */

function demarrerCarte() {
    actualiserDimensionsCarte();
    creerZones();
    initialiserNavigation();

    // La carte est prête : on lance la musique
    lancerSonFond();
}

if (mapPrincipale.readyState >= 1 && mapPrincipale.videoWidth) {
    demarrerCarte();
} else {
    mapPrincipale.addEventListener("loadedmetadata", demarrerCarte, {
        once: true
    });
}

