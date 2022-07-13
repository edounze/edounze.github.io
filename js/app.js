const app = {
    init: function() {
        console.log('App initialized');

        // Choix de la section : Pro/Individual
        document.querySelectorAll('.item-section .item-btn').forEach(function(section) {
            section.addEventListener('click', app.handleClickSection);
        });
    },

    /**
     * Choix de la section
     * @param {*} event 
     */
    handleClickSection: function(event) {
        event.preventDefault();

        const btnElt = event.target;
        const sectionTypeElt = btnElt.closest('.item-section-type');
        // const sectionTypeElt = event.target;

        // On récupère la section que l'on stocke dans la variable app.section
        // TODO : on le stocke en sessionStorage
        const sectionType = sectionTypeElt.dataset.section;
        const sectionIndex = sectionTypeElt.dataset.next || 1;


        console.log('sectionType : ', sectionType, 'sectionIndex : ', sectionIndex);

        // On affiche les questions de la section
        app.goToSection(sectionType, sectionIndex);
    },

    goToSection: function(section, index = 1) {

        const templateSection = document.querySelector("#tpl-item-section");
        const templateSectionItemType = document.querySelector("#tpl-item-section-type");

        // On récupère le template de la section
        let sectionElt = templateSection.content.cloneNode(true);

        // On récupère le template de l'item de la section, que l'on remplit avec les données de l'item


        const sectionData = formData.sections[section].find(item => item.index == index);
        console.log(sectionData, formData.sections[section]);

        if (sectionData) {
            // Titre de la section
            sectionElt.querySelector('.item-section-title').innerHTML = sectionData.title;

            let sectionType = sectionData.type ? sectionData.type : 'image';
            // On affiche des propositions tant qu'on a pas atteint le nombre de propositions

            // Est ce que c'est une question ?
            if (sectionType == 'question') {
                // const sectionYesClone = templateSectionItemType.content.cloneNode(true);
                // const sectionNoClone = templateSectionItemType.content.cloneNode(true);

                // Bouton Oui
                let sectionYesElt = app.cloneSectionType(section, sectionData.next_yes, `${sectionData.title} - OUI`);
                sectionYesElt.innerHTML = `<button class="text-light btn btn-dark w-100 p-3 item-btn">OUI</button>`;
                // sectionYesElt.addEventListener('click', app.handleClickSection);
                sectionElt.querySelector('.item-section-choice').appendChild(sectionYesElt);

                // OU
                sectionElt.querySelector('.item-section-choice').innerHTML += `<div class="col-1 align-self-center p-2"><span>OU</span></div>`;

                // Bouton Non
                let sectionNoElt = app.cloneSectionType(section, sectionData.next_no, `${sectionData.title} - NON`);
                sectionNoElt.innerHTML = `<button class="text-light btn btn-dark w-100 p-3 item-btn">NON</button>`;
                sectionElt.querySelector('.item-section-choice').appendChild(sectionNoElt);

                // On associe l'event click aux boutons OUI et NON
                // sectionYesElt.querySelector('.item-btn').addEventListener('click', app.handleClickSection);
                // sectionNoElt.querySelector('.item-btn').addEventListener('click', app.handleClickSection);
                sectionElt.querySelectorAll('.item-btn').forEach(function(sectionItemElt) {
                    sectionItemElt.addEventListener('click', app.handleClickSection);
                });
            }
            // Est ce qu'il s'agit de l'upload d'une image ?
            else if (sectionType == 'file') {
                let sectionTypelt = app.cloneSectionType(section, sectionData.index + 1, choice);
                sectionTypelt.innerHTML = `<input type="file />"`;
                sectionElt.querySelector('.item-section-choice').appendChild(sectionTypelt);
            } else {
                sectionData.choices.forEach(function(choice, index) {
                    // On boucle sur les choix de l'item
                    // const sectionTypeClone = templateSectionItemType.content.cloneNode(true);
                    // let sectionTypelt = sectionTypeClone.querySelector('.item-section-type');
                    // sectionTypelt.dataset.section = section;
                    // sectionTypelt.dataset.next = sectionData.index + 1;
                    // sectionTypelt.dataset.choice = choice;
                    // sectionTypelt.classList.add('text-white', 'rounded');

                    let sectionTypelt = app.cloneSectionType(section, sectionData.index + 1, choice);

                    if (sectionType === "text") {
                        sectionTypelt.innerHTML = `<button class="text-light btn btn-dark w-100 p-3 item-btn">${choice}</button>`;
                    } else if (sectionType === "color") {
                        // sectionTypelt.innerHTML = `<input type="color" id="head" name="head" value="${choice}">`;
                        sectionTypelt.innerHTML = `<button class="text-light btn btn-dark w-100 p-3 item-btn" style="background-color:${choice}">`;
                    } else {
                        // Type image par défaut
                        sectionTypelt.innerHTML = `<a href="#" class="item-btn"><img src="${choice}" class="rounded"></a>`;
                    }

                    // sectionTypelt.querySelectorAll('.item-btn').forEach(function(sectionItemElt) {
                    //     sectionItemElt.addEventListener('click', app.handleClickSection);
                    // });

                    sectionElt.querySelector('.item-section-choice').appendChild(sectionTypelt);

                    // On branche l'event sur les boutons de la section
                    // sectionTypelt.querySelector('.item-btn').addEventListener('click', app.handleClickSection);

                });
            }

            // Maj des boutons suivants/précédents
            app.setNavigation(section, sectionData.index);

        } else {
            // On affiche le formulaire SendinBlue
            sectionElt.querySelector('.item-section-title').innerHTML = 'Formulaire';
            console.log('Fini !!');
        }

        // On affiche la section
        document.querySelector('.item-section-container').innerHTML = '';
        document.querySelector('.item-section-container').appendChild(sectionElt);

    },

    cloneSectionType: function(section, nexIndex, choice = null) {
        const templateSectionItemType = document.querySelector("#tpl-item-section-type");
        const sectionTypeClone = templateSectionItemType.content.cloneNode(true);
        let sectionTypelt = sectionTypeClone.querySelector('.item-section-type');
        sectionTypelt.dataset.section = section;
        sectionTypelt.dataset.next = nexIndex;
        if (choice) {
            sectionTypelt.dataset.choice = choice;
        }
        sectionTypelt.classList.add('text-white', 'rounded');

        // On branche l'event sur les boutons de la section
        // sectionTypelt.addEventListener('click', app.handleClickSection);
        // sectionTypelt.querySelector('.item-btn').addEventListener('click', app.handleClickSection);

        return sectionTypelt;
    },

    setNavigation: function(section, index) {
        // On récupère les boutons précédent/suivant
        let prevElt = document.querySelector('.item-navigation-prev');
        let nextElt = document.querySelector('.item-navigation-next');

        // On active/désactive les boutons précédent/suivant en fonction de l'index
        // nextElt.classList.toggle('disabled', index === 0);

        // On affiche les boutons précédent/suivant
        if (index && index > 0) {
            prevElt.classList.add('disabled');
        } else {
            prevElt.classList.remove('disabled');
        }

        // On configure les metadata pour se déplacer dans les sections
        prevElt.dataset.next -= index;
        nextElt.dataset.next += index;

        prevElt.dataset.section = section;
        nextElt.dataset.section = section;

        // On branche l'event sur les boutons précédent/suivant
        prevElt.addEventListener('click', app.handleClickSection);
        nextElt.addEventListener('click', app.handleClickSection);
    }
};
document.addEventListener('DOMContentLoaded', app.init);