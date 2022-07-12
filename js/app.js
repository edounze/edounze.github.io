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
            sectionData.choices.forEach(function(choice, index) {
                // On boucle sur les choix de l'item
                let sectionTypeClone = templateSectionItemType.content.cloneNode(true);
                let sectionTypelt = sectionTypeClone.querySelector('.item-section-type');
                sectionTypelt.dataset.next = sectionData.index + 1;
                sectionTypelt.dataset.choice = choice;
                sectionTypelt.dataset.section = section;
                sectionTypelt.classList.add('text-white', 'rounded');
                if (sectionType === "text") {
                    sectionTypelt.innerHTML = `<button class="text-light btn btn-dark w-100 p-3 item-btn">${choice}</button>`;
                } else if (sectionType === "color") {
                    // sectionTypelt.innerHTML = `<input type="color" id="head" name="head" value="${choice}">`;
                    sectionTypelt.innerHTML = `<button class="text-light btn btn-dark w-100 p-3 item-btn" style="background-color:${choice}">`;
                } else {
                    // Type image par défaut
                    sectionTypelt.innerHTML = `<a href="#" class="item-btn"><img src="${choice}" class="rounded"></a>`;
                }

                // On branche l'event sur les boutons de la section
                sectionTypelt.querySelectorAll('.item-btn').forEach(function(sectionItemElt) {
                    sectionItemElt.addEventListener('click', app.handleClickSection);
                });

                sectionElt.querySelector('.item-section-choice').appendChild(sectionTypelt);

            });

        } else {
            // On affiche le formulaire SendinBlue
            sectionElt.querySelector('.item-section-title').innerHTML = 'Formulaire';
            console.log('Fini !!');
        }

        // On affiche la section
        document.querySelector('.item-section-container').innerHTML = '';
        document.querySelector('.item-section-container').appendChild(sectionElt);

    }
};
document.addEventListener('DOMContentLoaded', app.init);