// Choix de couleurs
const choiceColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];


// Choix de styles
const choiceStyles = [
    'https://via.placeholder.com/300?text=Style1',
    'https://via.placeholder.com/300?text=Style2',
    'https://via.placeholder.com/300?text=Style3',
    'https://via.placeholder.com/300?text=Style4'
];

// Choix des sols
const choiceFloor = [
    'https://via.placeholder.com/300?text=Sol1',
    'https://via.placeholder.com/300?text=Sol2',
    'https://via.placeholder.com/300?text=Sol3',
    'https://via.placeholder.com/300?text=Sol4'
];


// Choix des luminaires
const choiceLight = [
    'https://via.placeholder.com/300?text=Luminaire1',
    'https://via.placeholder.com/300?text=Luminaire2',
    'https://via.placeholder.com/300?text=Luminaire3',
    'https://via.placeholder.com/300?text=Luminaire4'
];

// Choix des cuisines
const choiceKitchen = [
    'https://via.placeholder.com/300?text=Cuisine1',
    'https://via.placeholder.com/300?text=Cuisine2',
    'https://via.placeholder.com/300?text=Cuisine3',
    'https://via.placeholder.com/300?text=Cuisine4'
];


// Choix des cuisines
const choiceBathroom = [
    'https://via.placeholder.com/300?text=SalleDeBain1',
    'https://via.placeholder.com/300?text=SalleDeBain2',
    'https://via.placeholder.com/300?text=SalleDeBain3',
    'https://via.placeholder.com/300?text=SalleDeBain4'
];

// Choix du domaine d'activités
const choiceActivities = ['Artiste peintre', 'Graphiste', 'Investisseur', 'Avocat'];


const formData = {
    "sections": {
        "individual": [
            { index: 1, title: "Couleur", choices: choiceColors, type: "color" },
            { index: 2, title: "Style", choices: choiceStyles },
            { index: 3, title: "4 sols", choices: choiceFloor },
            { index: 4, title: "4 luminaires", choices: choiceLight },
            { index: 5, title: "Cuisine", type: "question", "next_yes": 6, "next_no": 7 },
            { index: 6, title: "4 Cuisines", choices: choiceKitchen },
            { index: 7, title: "Salle de bain", type: "question", "next_yes": 8, "next_no": 9 },
            { index: 8, title: "4 sdb", choices: choiceBathroom },
            { index: 9, title: "Ajouter des photos", type: "file" }
        ],
        "pro": [
            { index: 1, title: "Domaine d'activité", choices: choiceActivities, type: "text" },
            { index: 2, title: "Palette de couleur", choices: choiceColors, type: "color" },
            { index: 3, title: "Style", choices: choiceStyles },
            { index: 4, title: "Sols", choices: choiceFloor },
            { index: 5, title: "4 luminaires", choices: choiceLight },
        ]
    }
};