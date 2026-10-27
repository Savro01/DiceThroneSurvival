
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
		nom: "La forge écarlate",
		positionX: 10.2,
		positionY: 30.1,
		diametre: 9.4,
		etat: "normale",
		image: "images/zones/zone_03_la_forge_ecarlate.jpg",
		imageLoot: "images/ImageLootActionPlaceholder.jpg",
		imageAction: "images/ImageLootActionPlaceholder.jpg"
	},
	{
		nom: "La grotte sous marine",
		positionX: 66.6,
		positionY: 45.4,
		diametre: 9,
		etat: "normale",
		image: "images/zones/zone_10_la_grotte_sous_marine.jpg",
		imageLoot: "images/ImageLootActionPlaceholder.jpg",
		imageAction: "images/ImageLootActionPlaceholder.jpg"
	}

    // Pour ajouter une zone, copie un objet et modifie ses valeurs.
    // États possibles : "normale", "menacee", "inaccessible"
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


// --- Dimensions de l'image ---

function actualiserDimensionsCarte() {
    const largeurFenetre = zoneNavigation.clientWidth;
    const hauteurFenetre = zoneNavigation.clientHeight;

    const largeurImage = mapPrincipale.naturalWidth;
    const hauteurImage = mapPrincipale.naturalHeight;

    if (!largeurImage || !hauteurImage) return;

    // Ajuste l'image à l'écran sans déformer ses proportions.
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
    if (!imageZone.contains(event.target)) {
        fermerFenetreZone();
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

    // Choisit l'image selon le logo utilisé.
    const cheminImage = logo === logoLoot
        ? zone.imageLoot
        : zone.imageAction;

    imageInfo.src = cheminImage;
    imageInfo.alt = logo === logoLoot
        ? `Liste de loot : ${zone.nom}`
        : `Action : ${zone.nom}`;

    infoLoot.style.pointerEvents = "none";
    infoAction.style.pointerEvents = "none";

    infoLoot.classList.add("masquee");
    infoAction.classList.add("masquee");

	const positionLogo = logo.getBoundingClientRect();
	const positionSurface = document.getElementById("surfaceZone").getBoundingClientRect();

	const decalageHorizontal = logo === logoLoot ? 0.10 : 0.10;
	const decalageVertical = logo === logoLoot ? 0.45 : 1.05;

	imageInfo.style.left =
		`${positionLogo.right - positionSurface.left - positionLogo.width * decalageHorizontal}px`;

	imageInfo.style.top =
		`${positionLogo.top - positionSurface.top - positionLogo.height * decalageVertical}px`;
	
    imageInfo.style.bottom = "auto";

    imageInfo.classList.remove("masquee");
    logoActif = logo;
}

 // Ordinateur : affichage au survol.
logoLoot.addEventListener("mouseenter", () => {
    afficherInfo(logoLoot, infoLoot);
});

logoLoot.addEventListener("mouseleave", cacherInfos);

logoAction.addEventListener("mouseenter", () => {
    afficherInfo(logoAction, infoAction);
});

logoAction.addEventListener("mouseleave", cacherInfos);

// Téléphone et écran tactile : affichage au toucher.
logoLoot.addEventListener("click", (event) => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
    }

    event.stopPropagation();

    if (logoActif === logoLoot) {
        cacherInfos();
    } else {
        afficherInfo(logoLoot, infoLoot);
    }
});

logoAction.addEventListener("click", (event) => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
    }

    event.stopPropagation();

    if (logoActif === logoAction) {
        cacherInfos();
    } else {
        afficherInfo(logoAction, infoAction);
    }
});


/* ============================================================
   06 — INITIALISATION GÉNÉRALE
   ============================================================ */
   
function demarrerCarte() {
    actualiserDimensionsCarte();
    creerZones();
    initialiserNavigation();
}

if (mapPrincipale.complete && mapPrincipale.naturalWidth) {
    demarrerCarte();
} else {
    mapPrincipale.addEventListener("load", demarrerCarte, {
        once: true
    });
}