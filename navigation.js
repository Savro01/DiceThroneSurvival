export function initialiserNavigation() {
    const zoneNavigation = document.getElementById("zoneNavigation");
    const carteInteractive = document.getElementById("carteInteractive");
    const mapPrincipale = document.getElementById("mapPrincipale");

    // Empêche le navigateur de démarrer un glisser-déposer natif
    zoneNavigation.addEventListener("dragstart", (event) => {
        event.preventDefault();
    });

    // Position et niveau de zoom
    let positionX = 0;
    let positionY = 0;
    let zoom = 1.0;

    // État du déplacement
    let deplacementEnCours = false;
    let sourisDepartX = 0;
    let sourisDepartY = 0;
    let carteDepartX = 0;
    let carteDepartY = 0;
    let pointeurActif = null;

    // Gestion de l'animation de retour
    let animationRetour = null;

    // Applique la position et le zoom à la carte
    function actualiserCarte() {
        carteInteractive.style.transform =
            `translate(${positionX}px, ${positionY}px) scale(${zoom})`;
    }

    // Calcule les limites de déplacement
    function obtenirLimites() {
        const largeurFenetre = zoneNavigation.clientWidth;
        const hauteurFenetre = zoneNavigation.clientHeight;

        const largeurOriginale = mapPrincipale.naturalWidth;
        const hauteurOriginale = mapPrincipale.naturalHeight;

        if (!largeurOriginale || !hauteurOriginale) {
            return { limiteX: 0, limiteY: 0 };
        }

        const echelleBase = Math.min(
            largeurFenetre / largeurOriginale,
            hauteurFenetre / hauteurOriginale
        );

        const largeurCarte = largeurOriginale * echelleBase * zoom;
        const hauteurCarte = hauteurOriginale * echelleBase * zoom;

        const margeDeplacement = 180;

        return {
            limiteX: Math.abs(largeurCarte - largeurFenetre) / 2
                + margeDeplacement,
            limiteY: Math.abs(hauteurCarte - hauteurFenetre) / 2
                + margeDeplacement
        };
    }

    // Ramène une valeur dans les limites normales
    function limiterValeur(position, limite) {
        return Math.max(-limite, Math.min(limite, position));
    }

    // Applique la résistance élastique
    function appliquerResistance(position, limite) {
        if (Math.abs(position) <= limite) {
            return position;
        }

        const signe = Math.sign(position);
        const depassement = Math.abs(position) - limite;

        const depassementSouple = 180 * (
            1 - Math.exp(-depassement / 100)
        );

        return signe * (limite + depassementSouple);
    }

    // Arrête une éventuelle animation en cours
    function arreterAnimationRetour() {
        if (animationRetour !== null) {
            cancelAnimationFrame(animationRetour);
            animationRetour = null;
        }
    }

    // Anime le retour dans les limites normales
    function revenirDansLimites() {
        const { limiteX, limiteY } = obtenirLimites();

        const departX = positionX;
        const departY = positionY;

        const arriveeX = limiterValeur(positionX, limiteX);
        const arriveeY = limiterValeur(positionY, limiteY);

        if (departX === arriveeX && departY === arriveeY) {
            return;
        }

        const duree = 500;
        const debut = performance.now();

        function animer(maintenant) {
            const progression = Math.min(
                (maintenant - debut) / duree,
                1
            );

            const douceur = 1 - Math.pow(1 - progression, 4);

            positionX = departX + (arriveeX - departX) * douceur;
            positionY = departY + (arriveeY - departY) * douceur;

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

    // Début du déplacement
    zoneNavigation.addEventListener("pointerdown", (event) => {
        // Laisse les clics sur les zones à zones.js
        if (event.target.closest(".zone")) return;

        if (event.button !== 0 || pointeurActif !== null) return;

        arreterAnimationRetour();

        const { limiteX, limiteY } = obtenirLimites();

        positionX = limiterValeur(positionX, limiteX);
        positionY = limiterValeur(positionY, limiteY);

        pointeurActif = event.pointerId;

        sourisDepartX = event.clientX;
        sourisDepartY = event.clientY;

        carteDepartX = positionX;
        carteDepartY = positionY;

        deplacementEnCours = true;

        zoneNavigation.setPointerCapture(event.pointerId);
    });

    // Déplacement de la souris
    zoneNavigation.addEventListener("pointermove", (event) => {
        if (!deplacementEnCours || event.pointerId !== pointeurActif) return;

        const { limiteX, limiteY } = obtenirLimites();

        const positionSouhaiteeX =
            carteDepartX + event.clientX - sourisDepartX;

        const positionSouhaiteeY =
            carteDepartY + event.clientY - sourisDepartY;

        positionX = appliquerResistance(positionSouhaiteeX, limiteX);
        positionY = appliquerResistance(positionSouhaiteeY, limiteY);

        actualiserCarte();
    });

    // Fin du déplacement
    function terminerDeplacement(event) {
        if (event.pointerId !== pointeurActif) return;

        deplacementEnCours = false;
        pointeurActif = null;

        revenirDansLimites();
    }

    zoneNavigation.addEventListener("pointerup", terminerDeplacement);
    zoneNavigation.addEventListener("pointercancel", terminerDeplacement);

    // Zoom avec la molette
    zoneNavigation.addEventListener("wheel", (event) => {
        event.preventDefault();

        if (deplacementEnCours) return;

        arreterAnimationRetour();

        if (event.deltaY < 0) {
            zoom += 0.05;
        } else {
            zoom -= 0.05;
        }

        zoom = Math.max(0.70, Math.min(1.50, zoom));

        const { limiteX, limiteY } = obtenirLimites();

        positionX = limiterValeur(positionX, limiteX);
        positionY = limiterValeur(positionY, limiteY);

        actualiserCarte();
    }, { passive: false });

    // Affichage initial
    actualiserCarte();
}
