// ================= AUTHENTICATION LOGIC =================
const CORRECT_PASSWORD = "noronha2026";

document.addEventListener("DOMContentLoaded", () => {
    // Check if user is already authenticated
    if (sessionStorage.getItem("noronha_auth") === "true") {
        showDashboard();
    }

    // Login Form Submit
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");
    const passwordInput = document.getElementById("password");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputPass = passwordInput.value.trim().toLowerCase();

            if (inputPass === CORRECT_PASSWORD) {
                sessionStorage.setItem("noronha_auth", "true");
                loginError.classList.add("hidden");
                
                // Transition effect
                const loginScreen = document.getElementById("login-screen");
                loginScreen.style.opacity = "0";
                loginScreen.style.transition = "opacity 0.4s ease";
                
                setTimeout(() => {
                    showDashboard();
                }, 400);
            } else {
                loginError.classList.remove("hidden");
                passwordInput.value = "";
                passwordInput.focus();
            }
        });
    }

    // Logout Action
    const logoutBtn = document.getElementById("btn-logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            sessionStorage.removeItem("noronha_auth");
            window.location.reload();
        });
    }

    // Initialize all app components
    initApp();
});

function showDashboard() {
    const loginScreen = document.getElementById("login-screen");
    if (loginScreen) loginScreen.classList.add("hidden");
    
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
        mainContent.classList.remove("hidden");
        setTimeout(() => {
            mainContent.classList.add("visible");
        }, 50);
    }
}


// ================= DATA DEFINITIONS =================

// Noronha Beaches and Spots
const SPOTS_DATA = [
    {
        id: "lodging",
        name: "Pousada Maresia 🏨",
        coords: [-3.8415, -32.4124],
        description: "Nossa pousada charmosa na Vila dos Remédios. Localização espetacular: pertinho da praça principal, mercados, farmácias e ótimos restaurantes. Ar-condicionado, Wi-Fi e um café da manhã delicioso para recarregar as energias.",
        tags: ["special"],
        tip: "O transfer gratuito de ida/volta para o aeroporto está incluído! Lembre-se de confirmar o horário de pouso com eles.",
        icon: "fa-solid fa-hotel",
        color: "marker-lodging"
    },
    {
        id: "sancho",
        name: "Praia do Sancho 🌊",
        coords: [-3.8546, -32.4431],
        description: "Considerada múltiplas vezes a praia mais bonita do mundo. Cercada por falésias majestosas, com água cristalina cor de esmeralda. O acesso é feito descendo escadas de metal encravadas na rocha.",
        tags: ["snorkel", "special"],
        tip: "Consulte a tábua de marés. É obrigatório o uso de coletes salva-vidas em algumas áreas e há horários específicos para descer/subir as escadas.",
        icon: "fa-solid fa-umbrella-beach",
        color: "marker-special"
    },
    {
        id: "porcos",
        name: "Baía dos Porcos 🐠",
        coords: [-3.8504, -32.4339],
        description: "Uma jóia selvagem e rochosa. Forma piscinas naturais incríveis na maré baixa. Um dos melhores pontos de mergulho livre (snorkel) da ilha para nadar com peixes coloridos e tartarugas.",
        tags: ["snorkel", "special"],
        tip: "Acesso por uma pequena trilha de pedras a partir do canto esquerdo da praia da Cacimba do Padre. Vá de sapatilha de neoprene!",
        icon: "fa-solid fa-mask-snorkel",
        color: "marker-special"
    },
    {
        id: "cacimba",
        name: "Cacimba do Padre 🏝️",
        coords: [-3.8497, -32.4312],
        description: "Praia de areia fofa e o clássico cartão-postal com vista direta para o Morro Dois Irmãos. No verão é palco de campeonatos de surfe com ondas gigantes, no inverno de julho as águas costumam ser bem mais mansas.",
        tags: ["snorkel"],
        tip: "Ponto perfeito para fotos na areia com os 'Dois Irmãos' ao fundo ao entardecer.",
        icon: "fa-solid fa-umbrella-beach",
        color: "marker-default"
    },
    {
        id: "porto",
        name: "Praia do Porto ⚓",
        coords: [-3.8347, -32.4035],
        description: "Área de ancoragem das embarcações com rica vida marinha. Excelente para fazer snorkel perto do Naufrágio do Navio Grego, onde costumam aparecer raias chitas, tartarugas e tubarões.",
        tags: ["snorkel"],
        tip: "Dá para alugar caiaque, stand-up paddle ou fazer o famoso passeio de canoa havaiana aqui logo cedo.",
        icon: "fa-solid fa-anchor",
        color: "marker-default"
    },
    {
        id: "leao",
        name: "Praia do Leão 🐢",
        coords: [-3.8647, -32.4330],
        description: "Lado mar de fora. Praia de beleza selvagem, de areia avermelhada e cercada por duas grandes rochas (o Leão e a Viuvinha). É o principal berçário e local de desova das tartarugas marinhas na ilha.",
        tags: ["special"],
        tip: "Correntes muito fortes. Evite entrar no fundo do mar, prefira caminhar pela areia e contemplar os ninhos marcados pelo Projeto Tamar.",
        icon: "fa-solid fa-shield-halved",
        color: "marker-special"
    },
    {
        id: "conceicao",
        name: "Praia da Conceição 🌅",
        coords: [-3.8427, -32.4172],
        description: "Grande faixa de areia sob a imponência do Morro do Pico. Um dos pontos mais badalados da ilha, com quadras de futevôlei e o Bar do Meio nas proximidades. Excelentes mergulhos nas pedras do canto direito.",
        tags: ["snorkel", "sunset"],
        tip: "Perfeito para estender a canga no final da tarde e ver o sol se esconder ao lado do Morro do Pico.",
        icon: "fa-solid fa-sun",
        color: "marker-sunset"
    },
    {
        id: "museu-tubaroes",
        name: "Museu dos Tubarões 🌝",
        coords: [-3.8322, -32.4005],
        description: "Um museu interessante sobre a fauna marinha da ilha e um mirante gramado lindíssimo. Na maré baixa, dá para avistar tubarões limpando-se no raso da baía logo abaixo (Enseada dos Cações).",
        tags: ["sunrise", "special"],
        tip: "Nosso passeio obrigatório na noite de 14 de Julho para ver o nascer da deslumbrante Lua Cheia sobre o mar! 🌝",
        icon: "fa-solid fa-moon",
        color: "marker-special"
    },
    {
        id: "forte-boldro",
        name: "Mirante do Forte do Boldró 🌇",
        coords: [-3.8490, -32.4280],
        description: "Ruínas de uma antiga fortificação no alto de uma falésia. É o ponto mais tradicional, romântico e concorrido da ilha para assistir ao pôr do sol clássico de Noronha.",
        tags: ["sunset", "special"],
        tip: "Chegue uns 30 a 40 minutos antes do sol se pôr para conseguir um bom espaço e tirar fotos incríveis com o Morro Dois Irmãos alinhado.",
        icon: "fa-solid fa-sun",
        color: "marker-sunset"
    },
    {
        id: "capelinha",
        name: "Capelinha de São Pedro ⛪",
        coords: [-3.8335, -32.4015],
        description: "Pequena e charmosa capela localizada no alto do Porto de Santo Antônio. Oferece uma perspectiva aérea incrível da baía, dos barcos flutuando e do oceano.",
        tags: ["sunrise"],
        tip: "Ponto super pacífico e bonito para assistir ao nascer do sol.",
        icon: "fa-solid fa-church",
        color: "marker-default"
    },
    {
        id: "air-france",
        name: "Ponta do Air France ⛵",
        coords: [-3.8300, -32.4000],
        description: "Local histórico onde ficava a base da companhia aérea francesa na década de 30. Fica no extremo norte da ilha, onde o Mar de Dentro encontra o bravio Mar de Fora.",
        tags: ["sunrise"],
        tip: "Ótimo ponto para observar o nascer do sol e sentir o vento forte do oceano.",
        icon: "fa-solid fa-compass",
        color: "marker-default"
    },
    {
        id: "bode",
        name: "Praia do Bode 🌅",
        coords: [-3.8480, -32.4290],
        description: "Praia de mar calmo na maré baixa, vizinha da Cacimba do Padre. Possui poços de pedra ótimos para banho e é muito procurada para quem quer sossego.",
        tags: ["sunset"],
        tip: "Uma ótima alternativa para fugir do agito e curtir o pôr do sol em silêncio.",
        icon: "fa-solid fa-umbrella-beach",
        color: "marker-sunset"
    },
    {
        id: "boldro-praia",
        name: "Praia do Boldró 🌅",
        coords: [-3.8465, -32.4260],
        description: "Praia charmosa com piscinas naturais de recifes vulcânicos que se revelam na maré seca. Fica aos pés do famoso Mirante do Forte.",
        tags: ["sunset"],
        tip: "Na maré baixa, caminhar entre as rochas e ver peixes ornamentais aprisionados nas pequenas poças.",
        icon: "fa-solid fa-umbrella-beach",
        color: "marker-sunset"
    }
];

// Daily Itinerary
const ITINERARY_DATA = {
    1: {
        title: "Dia 1: Chegada & Pôr do Sol no Porto ⛵",
        date: "Sexta-feira, 10 de Julho de 2026",
        badge: "Chegada",
        timeline: [
            { time: "13:40", title: "Pouso em Noronha! ✈️", desc: "Chegada no aeroporto às 13:40. O transfer gratuito oferecido pela Pousada Maresia estará aguardando para nos levar à pousada.", highlight: true },
            { time: "14:00", title: "Check-in na Pousada Maresia 🏨", desc: "Acomodação no quarto, desfazer mochilas, vestir roupas leves de praia e passar protetor." },
            { time: "Tarde", title: "Almoço da Chegada 🍽️", desc: "Almoçar peixe fresco na Praia da Conceição ou Praia do Cachorro, com parada clássica no Bar da Praia do Meio." },
            { time: "17:00", title: "Pôr do Sol na Praia do Porto 🌅", desc: "Curtir o fim do dia na praia do Porto. Alugaremos Bike Aquática para navegar pertinho dos golfinhos rotadores!", highlight: true },
            { time: "Fim do Dia", title: "Banho & Mercadinho 🛒", desc: "Voltar para a pousada para banho e passar no mercadinho local para comprar água, lanchinhos e frutas." },
            { time: "Noite", title: "Jantar & Caminhada Noturna 🌙", desc: "Jantar no centro histórico (Vila dos Remédios) seguido de uma romântica caminhada noturna na Praia do Cachorro." }
        ]
    },
    2: {
        title: "Dia 2: O Super Combo Sancho & Boldró 🏖️",
        date: "Sábado, 11 de Julho de 2026",
        badge: "Intenso",
        timeline: [
            { time: "09:00", title: "Café da Manhã na Pousada ☕", desc: "Desfrutar do delicioso café da manhã regional às 9h para estarmos com toda energia." },
            { time: "09:45 - 15:30", title: "Super Combo de Praias e Mirantes 🌴", desc: "Cacimba do Padre > Mirante Dois Irmãos > Mirante Baía dos Porcos > Praia Baía dos Porcos > Mirante Sancho > Praia do Sancho (atenção aos horários regulamentados de subida/descida das escadas!) > Mirante dos Golfinhos.", highlight: true },
            { time: "16:00 - 17:30", title: "Trilha do Pôr do Sol no Boldró 🌇", desc: "Caminhar pela beira-mar passando pelas praias Cacimba > Bode > Americano. Finalizaremos assistindo ao espetacular pôr do sol no tradicional Mirante do Boldró." },
            { time: "20:00", title: "Jantar Especial + Bolo! 🎂", desc: "Jantar comemorativo em casal com direito a um bolo delicioso para comemorar em grande estilo.", highlight: true },
            { time: "Noite Adentro", title: "Caminhada sob o Luar 🌌", desc: "Andar de mãos dadas à noite ao longo da Praia da Conceição sob o céu estrelado." }
        ]
    },
    3: {
        title: "Dia 3: Baía dos Porcos & Dois Irmãos",
        date: "Domingo, 12 de Julho de 2026",
        badge: "Imperdível",
        timeline: [
            { time: "08:30", title: "Cacimba do Padre 🏖️", desc: "Visita e fotos em frente ao cartão-postal Dois Irmãos." },
            { time: "10:00", title: "Baía dos Porcos (Snorkel Perfeito) 🐠", desc: "Atravessar o curto caminho de pedras no canto esquerdo até a Baía dos Porcos na maré baixa. Snorkel na piscina natural rasa com peixes coloridos.", highlight: true },
            { time: "Almoço", title: "Pausa na Vila 🍽️", desc: "Retorno para a vila para almoçar e descansar do sol do meio-dia." },
            { time: "15:00", title: "Mirante dos Dois Irmãos 📸", desc: "Subida rápida ao mirante para tirar a famosa foto panorâmica de cima." },
            { time: "17:15", title: "Pôr do sol na Praia do Bode 🌅", desc: "Caminhar até a Praia do Bode e curtir o entardecer num clima super reservado." }
        ]
    },
    4: {
        title: "Dia 4: A Praia Mais Bonita do Mundo",
        date: "Segunda-feira, 13 de Julho de 2026",
        badge: "Paraíso",
        timeline: [
            { time: "08:00", title: "Praia do Sancho 🌊", desc: "Descer as falésias pelas famosas escadas de metal nas fendas de rocha para acessar o Sancho. Mergulho e snorkel sem colete!", highlight: true },
            { time: "Tarde", title: "Passarelas do Sancho & Atobás 🦜", desc: "Caminhar pelas passarelas de madeira suspensas, apreciando a vista aérea e avistando ninhos de Atobá nas árvores." },
            { time: "16:30", title: "Trilha do Piquinho 🧗", desc: "Caminhada leve pela mata até a base do Pico para ter uma visão de 360 graus de toda a ilha (fazer com segurança)." },
            { time: "17:30", title: "Pôr do Sol no Piquinho 🌅", desc: "Ver o sol descer no mar lá de cima do mirante." }
        ]
    },
    5: {
        title: "Dia 5: Praia do Leão & Nascer da Lua Cheia",
        date: "Terça-feira, 14 de Julho de 2026",
        badge: "Dia Especial",
        timeline: [
            { time: "05:15", title: "Amanhecer na Capelinha de São Pedro ⛪", desc: "Opcional: acordar cedo para ver o sol nascer sobre a baía do porto (ou agendar Canoa Havaiana ao amanhecer)." },
            { time: "09:30", title: "Praia do Leão (Vida Selvagem) 🐢", desc: "Visita à praia do Leão, santuário ecológico de águas indomáveis e desova de tartarugas.", highlight: true },
            { time: "Almoço", title: "Almoço Regional 🍽️", desc: "Peixe com molho de coco local em restaurante rústico." },
            { time: "Tarde", title: "Relax na Pousada & Lembranças 🛍️", desc: "Passear pelas lojinhas da Vila dos Remédios e descansar as pernas." },
            { time: "17:00", title: "Museu dos Tubarões - Lua Cheia 🌝", desc: "Ir ao gramado do museu para curtir a música e ver o espetacular nascer da Lua Cheia gigante subindo direto do oceano!", highlight: true }
        ]
    },
    6: {
        title: "Dia 6: Barco & Repetir Favoritos",
        date: "Quarta-feira, 15 de Julho de 2026",
        badge: "Despedida",
        timeline: [
            { time: "Manhã", title: "Passeio de Barco / Pranchinha 🛥️", desc: "Fazer o clássico passeio de barco de ponta a ponta na ilha ou mergulho com prancha rebocada (sub-plano do casal).", highlight: true },
            { time: "Tarde", title: "Repeteco do Melhor Lugar 🌴", desc: "Tarde livre para voltar à praia que mais gostamos de deitar na areia e nadar (ex: Sancho ou Baía dos Porcos)." },
            { time: "17:30", title: "Último Pôr do Sol de Despedida 🌇", desc: "Assistir ao espetáculo do entardecer no nosso ponto preferido de Noronha." },
            { time: "20:00", title: "Jantar Especial de Despedida 🍷", desc: "Jantar especial de encerramento para brindar essa viagem mágica em casal." }
        ]
    },
    7: {
        title: "Dia 7: Trilha Atalaia & Volta para Casa ✈️",
        date: "Quinta-feira, 16 de Julho de 2026",
        badge: "Retorno",
        timeline: [
            { time: "08:00", title: "Café da Manhã & Malas 🧳", desc: "Tomar o café com tranquilidade e fazer o checklist final da mala." },
            { time: "11:30", title: "Almoço de Despedida 🍽️", desc: "Almoçar cedo para estarmos prontos para o horário da trilha." },
            { time: "12:00 - 13:30", title: "Trilha & Flutuação no Atalaia 🌊", desc: "Caminhada de 3km ida/volta. Obrigatório portar máscara, snorkel e colete. Atenção extrema: proibido usar protetor solar ou repelente na água!", highlight: true },
            { time: "13:30 - 14:30", title: "Banho & Check-out na Pousada 🏨", desc: "Voltar correndo para a Pousada Maresia para um banho rápido e finalizar o check-out até as 14h30." },
            { time: "15:00", title: "Chegada no Aeroporto ✈️", desc: "O transfer nos deixará no aeroporto para despachar as malas." },
            { time: "15:40", title: "Voo decola de Noronha 🛫", desc: "Embarque de volta para o continente levando Noronha no coração." }
        ]
    }
};

// ================= APP INITIALIZER =================

function initApp() {
    initCountdown();
    initTabs();
    initItinerary();
    initChecklist();
    
    // Map is initialized lazily when switching to tab-map or on first display if auth is already bypassed
    if (sessionStorage.getItem("noronha_auth") === "true") {
        const activeTab = document.querySelector(".dock-btn.active");
        if (activeTab && activeTab.getAttribute("data-tab") === "tab-map") {
            setTimeout(initMap, 200);
        }
    }
}

// ================= 1. COUNTDOWN CONTROLLER =================
function initCountdown() {
    // Target Date: July 10, 2026 at 14:00 (Check-in time)
    const targetDate = new Date("2026-07-10T14:00:00-03:00").getTime();
    const daysPill = document.getElementById("days-pill");
    const hoursPill = document.getElementById("hours-pill");
    const countdownPill = document.getElementById("countdown-pill");

    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            if (countdownPill) {
                countdownPill.innerHTML = "🌴 Aproveitando!";
                countdownPill.style.background = "var(--emerald)";
                countdownPill.style.color = "#ffffff";
                countdownPill.style.borderColor = "var(--emerald)";
            }
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (daysPill) daysPill.innerText = String(days).padStart(2, '0');
        if (hoursPill) hoursPill.innerText = String(hours).padStart(2, '0');
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 60000); // Update every minute to save energy
}

// ================= 2. TAB CONTROLLER =================
function initTabs() {
    const dockButtons = document.querySelectorAll(".dock-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    dockButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");

            // Update buttons active class
            dockButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Update contents active class
            tabPanes.forEach(pane => {
                pane.classList.remove("active");
                if (pane.id === targetTab) {
                    pane.classList.add("active");
                }
            });

            // Lazy initialize map when switching to map tab
            if (targetTab === "tab-map") {
                setTimeout(() => {
                    initMap();
                    if (mapInstance) {
                        mapInstance.invalidateSize();
                    }
                }, 150);
            }

            // Scroll container top
            const paneElement = document.querySelector(".app-main-pane");
            if (paneElement) paneElement.scrollTop = 0;
        });
    });
}

// ================= 3. MAP & SPOTS CONTROLLER =================
let visitedSpots = JSON.parse(localStorage.getItem("visited_spots")) || [];
let mapInstance = null;
let mapMarkersRefs = {};
let currentDrawerSpotId = null;

function initMap() {
    if (mapInstance) return; // Prevent double initialization
    
    // Center of Fernando de Noronha
    const center = [-3.844, -32.414];
    
    // Create map instance
    mapInstance = L.map('map', {
        center: center,
        zoom: 13.2,
        minZoom: 12,
        maxZoom: 17,
        zoomControl: true
    });

    // Add CartoDB Positron tile layer (Light Mode)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(mapInstance);

    // Custom marker style generator using divIcon
    const createCustomIcon = (iconClass, colorClass) => {
        return L.divIcon({
            html: `<div class="custom-map-marker ${colorClass}"><i class="${iconClass}"></i></div>`,
            className: 'leaflet-custom-marker',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });
    };

    // Add markers to map from SPOTS_DATA
    SPOTS_DATA.forEach(spot => {
        const isVisited = visitedSpots.includes(spot.id);
        const isLodging = spot.id === "lodging";
        
        let colorClass = spot.color;
        if (isVisited && !isLodging) {
            colorClass = "visited-spot";
        }

        const icon = createCustomIcon(spot.icon, colorClass);
        const marker = L.marker(spot.coords, { icon: icon }).addTo(mapInstance);
        
        // Save reference to marker
        mapMarkersRefs[spot.id] = marker;

        // Custom action on marker click: open slide up drawer
        marker.on('click', () => {
            mapInstance.setView(spot.coords, 14.5);
            openDrawer(spot.id);
        });
    });

    // Drawing Trails (Polylines)
    // 1. Trilha do Sancho (wooden walkways)
    const sanchoTrail = [
        [-3.8546, -32.4431], // Sancho Beach
        [-3.8530, -32.4420], // Sancho Viewpoint
        [-3.8510, -32.4410], // Sancho Access Road
    ];
    L.polyline(sanchoTrail, {
        color: 'var(--gold)',
        weight: 3,
        dashArray: '5, 8',
        opacity: 0.85
    }).addTo(mapInstance).bindTooltip("Trilha do Sancho (Fácil)", { sticky: true });

    // 2. Trilha do Piquinho
    const piquinhoTrail = [
        [-3.8415, -32.4124], // Start near Vila
        [-3.8425, -32.4170], // Base of Pico
        [-3.8440, -32.4210], // Morro do Pico/Piquinho Peak
    ];
    L.polyline(piquinhoTrail, {
        color: 'var(--sunset)',
        weight: 3.5,
        dashArray: '5, 8',
        opacity: 0.85
    }).addTo(mapInstance).bindTooltip("Trilha do Piquinho (Moderada)", { sticky: true });

    // 3. Trilha Baía dos Porcos (from Cacimba)
    const porcosTrail = [
        [-3.8497, -32.4312], // Cacimba do Padre
        [-3.8501, -32.4325], // Rocks path
        [-3.8504, -32.4339], // Baía dos Porcos
    ];
    L.polyline(porcosTrail, {
        color: 'var(--emerald)',
        weight: 3.5,
        dashArray: '3, 6',
        opacity: 0.9
    }).addTo(mapInstance).bindTooltip("Trilha Baía dos Porcos (Pedras)", { sticky: true });

    // Close drawer when clicking anywhere on the map
    mapInstance.on('click', () => {
        closeDrawer();
    });

    // Hook up rules modal triggers
    const btnToggleRules = document.getElementById("btn-toggle-rules");
    const rulesModal = document.getElementById("rules-modal");
    const btnCloseRules = document.getElementById("btn-close-rules");

    if (btnToggleRules && rulesModal && btnCloseRules) {
        btnToggleRules.addEventListener("click", () => {
            rulesModal.classList.remove("hidden");
        });
        btnCloseRules.addEventListener("click", () => {
            rulesModal.classList.add("hidden");
        });
        rulesModal.addEventListener("click", (e) => {
            if (e.target === rulesModal) {
                rulesModal.classList.add("hidden");
            }
        });
    }

    // Drawer handle click closes drawer
    const drawerHandle = document.getElementById("map-drawer-handle");
    if (drawerHandle) {
        drawerHandle.addEventListener("click", () => {
            closeDrawer();
        });
    }
}

function openDrawer(spotId) {
    const spot = SPOTS_DATA.find(s => s.id === spotId);
    if (!spot) return;

    currentDrawerSpotId = spotId;
    document.getElementById("drawer-title").innerText = spot.name;
    document.getElementById("drawer-description").innerText = spot.description;
    document.getElementById("drawer-tip").innerText = spot.tip;

    // Render tags
    const tagsContainer = document.getElementById("drawer-tags");
    tagsContainer.innerHTML = "";
    spot.tags.forEach(t => {
        let label = t;
        if(t === "snorkel") label = "🤿 Snorkel";
        if(t === "sunset") label = "🌅 Pôr do Sol";
        if(t === "sunrise") label = "🌇 Nascer Sol";
        if(t === "special") label = "⭐ Especial";
        
        const span = document.createElement("span");
        span.className = `spot-tag tag-${t}`;
        span.innerText = label;
        tagsContainer.appendChild(span);
    });

    // Update visited state button styles
    updateDrawerVisitedButton(spotId);

    // Show drawer
    const drawer = document.getElementById("map-drawer");
    if (drawer) {
        drawer.classList.remove("hidden");
        setTimeout(() => {
            drawer.classList.add("active");
        }, 10);
    }
}

function closeDrawer() {
    const drawer = document.getElementById("map-drawer");
    if (drawer && drawer.classList.contains("active")) {
        drawer.classList.remove("active");
        setTimeout(() => {
            drawer.classList.add("hidden");
        }, 300);
    }
    currentDrawerSpotId = null;
}

function updateDrawerVisitedButton(spotId) {
    const isVisited = visitedSpots.includes(spotId);
    const btn = document.getElementById("drawer-visited-btn");
    const isLodging = spotId === "lodging";

    if (btn) {
        if (isLodging) {
            btn.style.display = "none";
            return;
        }
        btn.style.display = "flex";

        if (isVisited) {
            btn.classList.add("visited");
            btn.querySelector("i").className = "fa-solid fa-circle-check";
            btn.querySelector("span").innerText = "Visitado!";
        } else {
            btn.classList.remove("visited");
            btn.querySelector("i").className = "fa-regular fa-circle-check";
            btn.querySelector("span").innerText = "Marcar Visitado";
        }
    }
}

window.toggleDrawerSpotVisited = function() {
    if (!currentDrawerSpotId || currentDrawerSpotId === "lodging") return;
    
    const index = visitedSpots.indexOf(currentDrawerSpotId);
    if (index === -1) {
        visitedSpots.push(currentDrawerSpotId);
        showToast("Marcado como visitado! 🎉");
    } else {
        visitedSpots.splice(index, 1);
        showToast("Removido dos visitados.");
    }
    localStorage.setItem("visited_spots", JSON.stringify(visitedSpots));
    updateDrawerVisitedButton(currentDrawerSpotId);
    
    // Update map marker icon color
    updateMapMarkersVisitedState();
};

function updateMapMarkersVisitedState() {
    SPOTS_DATA.forEach(spot => {
        const marker = mapMarkersRefs[spot.id];
        if (marker) {
            const isVisited = visitedSpots.includes(spot.id);
            const isLodging = spot.id === "lodging";
            
            let colorClass = spot.color;
            if (isVisited && !isLodging) {
                colorClass = "visited-spot";
            }
            
            // Re-create the icon with the correct color
            const newIcon = L.divIcon({
                html: `<div class="custom-map-marker ${colorClass}"><i class="${spot.icon}"></i></div>`,
                className: 'leaflet-custom-marker',
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            });
            
            marker.setIcon(newIcon);
        }
    });
}

// Global function to switch tabs from popup click
window.navigateToTab = function(tabId) {
    const btn = document.querySelector(`.dock-btn[data-tab="${tabId}"]`);
    if (btn) {
        btn.click();
    }
};


// ================= 4. ITINERARY DIARY CONTROLLER =================
function initItinerary() {
    const container = document.getElementById("itinerary-accordion-container");
    if (!container) return;
    
    container.innerHTML = "";

    Object.keys(ITINERARY_DATA).forEach(dayKey => {
        const day = ITINERARY_DATA[dayKey];
        
        const accordionItem = document.createElement("div");
        accordionItem.className = "accordion-item";
        if (dayKey === "1") {
            accordionItem.classList.add("active");
        }

        let timelineHTML = "";
        day.timeline.forEach(item => {
            timelineHTML += `
                <div class="timeline-item ${item.highlight ? 'highlight' : ''}">
                    <span class="time">${item.time}</span>
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            `;
        });

        accordionItem.innerHTML = `
            <div class="accordion-header" onclick="toggleAccordion(this)">
                <div class="header-left">
                    <span class="day-num">D${dayKey}</span>
                    <div>
                        <h4>${day.title}</h4>
                        <small>${day.date}</small>
                    </div>
                </div>
                <div class="header-right">
                    <span class="day-badge">${day.badge}</span>
                    <i class="fa-solid fa-chevron-down accordion-icon"></i>
                </div>
            </div>
            <div class="accordion-content" style="${dayKey === '1' ? 'max-height: 1000px;' : ''}">
                <div class="timeline">
                    ${timelineHTML}
                </div>
            </div>
        `;

        container.appendChild(accordionItem);
    });
}

window.toggleAccordion = function(headerElement) {
    const clickedItem = headerElement.parentElement;
    const isAlreadyActive = clickedItem.classList.contains("active");
    
    // Close all other accordions and reset max-heights
    document.querySelectorAll(".accordion-item").forEach(item => {
        item.classList.remove("active");
        const content = item.querySelector(".accordion-content");
        if (content) {
            content.style.maxHeight = null;
        }
    });

    // If it wasn't active, open it
    if (!isAlreadyActive) {
        clickedItem.classList.add("active");
        const content = clickedItem.querySelector(".accordion-content");
        if (content) {
            content.style.maxHeight = "1000px"; // Set to high max-height for animation
        }
    }
};


// ================= 5. CHECKLIST CONTROLLER =================
let checklistItems = JSON.parse(localStorage.getItem("noronha_checklist")) || [];

// Default Checklist values
const DEFAULT_CHECKLIST = [
    { id: 1, text: "Óculos de sol", category: "Mala", completed: false },
    { id: 2, text: "Protetor solar corporal e facial", category: "Mala", completed: false },
    { id: 3, text: "Camiseta com proteção UV (Lycra)", category: "Mala", completed: false },
    { id: 4, text: "Máscara de snorkel e nadadeiras", category: "Mala", completed: false },
    { id: 5, text: "Sapatilhas náuticas de neoprene (crucial para Baía dos Porcos)", category: "Mala", completed: false },
    { id: 6, text: "Repelente de insetos eficiente", category: "Mala", completed: false },
    { id: 7, text: "Casaco leve corta-vento (ventos noturnos)", category: "Mala", completed: false },
    { id: 8, text: "Documento de identidade físico (RG ou CNH)", category: "Documentos", completed: false },
    { id: 9, text: "Pagar Taxa de Preservação Ambiental (TPA) online", category: "Documentos", completed: false },
    { id: 10, text: "Comprar ingresso do Parque Nacional Marinho online", category: "Documentos", completed: false },
    { id: 11, text: "Garantir o Voucher do transfer de chegada", category: "Providências", completed: false },
    { id: 12, text: "Levar dinheiro em espécie (sinal de internet falha muito)", category: "Providências", completed: false }
];

function initChecklist() {
    if (checklistItems.length === 0) {
        checklistItems = [...DEFAULT_CHECKLIST];
        localStorage.setItem("noronha_checklist", JSON.stringify(checklistItems));
    }

    const form = document.getElementById("checklist-form");
    const input = document.getElementById("checklist-input");
    const categorySelect = document.getElementById("checklist-category");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = input.value.trim();
            const category = categorySelect.value;

            if (text) {
                const newItem = {
                    id: Date.now(),
                    text: text,
                    category: category,
                    completed: false
                };
                checklistItems.push(newItem);
                localStorage.setItem("noronha_checklist", JSON.stringify(checklistItems));
                input.value = "";
                renderChecklists();
                showToast("Item adicionado! 🎒");
            }
        });
    }

    // Category pills filter trigger
    const pills = document.querySelectorAll(".cat-pill");
    pills.forEach(pill => {
        pill.addEventListener("click", () => {
            pills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            renderChecklists();
        });
    });

    renderChecklists();
}

function renderChecklists() {
    const listContainer = document.getElementById("todo-items-list");
    if (!listContainer) return;
    
    listContainer.innerHTML = "";

    const activePill = document.querySelector(".cat-pill.active");
    const activeCategory = activePill ? activePill.getAttribute("data-cat") : "all";

    const filteredItems = activeCategory === "all" 
        ? checklistItems 
        : checklistItems.filter(item => item.category === activeCategory);

    filteredItems.forEach(item => {
        const li = document.createElement("li");
        li.className = `todo-item ${item.completed ? 'checked' : ''}`;
        
        let iconHtml = "";
        if (item.category === "Mala") {
            iconHtml = '<i class="fa-solid fa-suitcase text-turquoise"></i>';
        } else if (item.category === "Documentos") {
            iconHtml = '<i class="fa-solid fa-file-invoice text-gold"></i>';
        } else {
            iconHtml = '<i class="fa-solid fa-circle-exclamation text-sunset"></i>';
        }

        li.innerHTML = `
            <div class="todo-left" onclick="toggleTodoCompleted(${item.id})">
                <div class="checkbox-custom">
                    <i class="fa-solid fa-check"></i>
                </div>
                <span class="todo-cat-icon">${iconHtml}</span>
                <span class="todo-text">${item.text}</span>
            </div>
            <button class="btn-delete-todo" onclick="deleteTodoItem(${item.id})" title="Excluir item">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        `;
        listContainer.appendChild(li);
    });

    updateProgress();
}

window.toggleTodoCompleted = function(id) {
    const item = checklistItems.find(i => i.id === id);
    if (item) {
        item.completed = !item.completed;
        localStorage.setItem("noronha_checklist", JSON.stringify(checklistItems));
        renderChecklists();
    }
};

window.deleteTodoItem = function(id) {
    checklistItems = checklistItems.filter(i => i.id !== id);
    localStorage.setItem("noronha_checklist", JSON.stringify(checklistItems));
    renderChecklists();
    showToast("Item excluído!");
};

function updateProgress() {
    const completedCount = checklistItems.filter(i => i.completed).length;
    const totalCount = checklistItems.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // Checklist Tab Progress
    const fill = document.getElementById("checklist-progress-fill");
    if (fill) fill.style.width = `${percentage}%`;
    
    const percentLabel = document.getElementById("checklist-progress-percent");
    if (percentLabel) percentLabel.innerText = `${percentage}%`;
    
    const countLabel = document.getElementById("checklist-progress-label");
    if (countLabel) countLabel.innerText = `${completedCount} de ${totalCount} concluídos`;

    // Dashboard Tab Ring Progress
    const ringPercent = document.getElementById("progress-ring-percent");
    if (ringPercent) ringPercent.innerText = `${percentage}%`;
    
    const circle = document.getElementById("dashboard-progress-ring");
    if (circle) {
        const circumference = 2 * Math.PI * 24; // 150.8
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
}


// ================= HELPER FUNCTIONS =================

// Copy text to clipboard
window.copyText = function(elementId, successMessage) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const text = element.innerText;
    navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage);
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
    });
};

// Show temporary toast notification
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerText = message;
    toast.classList.remove("hidden");
    
    // Tiny timeout to trigger CSS transition
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    // Hide after 2.5 seconds
    setTimeout(() => {
        toast.classList.remove("show");
        // Wait for CSS fade-out before adding hidden back
        setTimeout(() => {
            toast.classList.add("hidden");
        }, 400);
    }, 2500);
}
