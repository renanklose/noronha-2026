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

    // Edit Drawer Actions
    const openEditBtn = document.getElementById("btn-open-edit");
    if (openEditBtn) {
        openEditBtn.addEventListener("click", () => {
            openEditDrawer();
        });
    }

    const closeEditBtn = document.getElementById("btn-close-edit");
    if (closeEditBtn) {
        closeEditBtn.addEventListener("click", () => {
            closeEditDrawer();
        });
    }

    const editDetailsForm = document.getElementById("edit-details-form");
    if (editDetailsForm) {
        editDetailsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            localStorage.setItem("noronha_pousada_name", document.getElementById("edit-pousada-name").value.trim());
            localStorage.setItem("noronha_pousada_reserva", document.getElementById("edit-pousada-reserva").value.trim());
            localStorage.setItem("noronha_pousada_pin", document.getElementById("edit-pousada-pin").value.trim());
            localStorage.setItem("noronha_pousada_address", document.getElementById("edit-pousada-address").value.trim());
            localStorage.setItem("noronha_pousada_whatsapp", document.getElementById("edit-pousada-whatsapp").value.trim());
            localStorage.setItem("noronha_flight_loc", document.getElementById("edit-flight-loc").value.trim().toUpperCase());
            localStorage.setItem("noronha_flight_req", document.getElementById("edit-flight-req").value.trim());
            localStorage.setItem("noronha_cpf_gio", document.getElementById("edit-cpf-gio").value.trim());
            localStorage.setItem("noronha_cpf_renan", document.getElementById("edit-cpf-renan").value.trim());

            loadSavedDetails();
            closeEditDrawer();
            showToast("Informações salvas! 🌴");
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
        coords: [2207, 2650],
        description: "Nossa pousada charmosa na Vila dos Remédios. Localização espetacular: pertinho da praça principal, mercados, farmácias e ótimos restaurantes. Ar-condicionado, Wi-Fi e um café da manhã delicioso para recarregar as energias.",
        tags: ["special"],
        tip: "O transfer gratuito de ida/volta para o aeroporto está incluído! Lembre-se de confirmar o horário de pouso com eles.",
        icon: "fa-solid fa-hotel",
        color: "marker-lodging"
    },
    {
        id: "sancho",
        name: "Praia do Sancho 🌊",
        coords: [2183, 1298],
        description: "Considerada múltiplas vezes a praia mais bonita do mundo. Cercada por falésias majestosas, com água cristalina cor de esmeralda. O acesso é feito descendo escadas de metal encravadas na rocha.",
        tags: ["snorkel", "special"],
        tip: "Consulte a tábua de marés. É obrigatório o uso de coletes salva-vidas em algumas áreas e há horários específicos para descer/subir as escadas.",
        icon: "fa-solid fa-umbrella-beach",
        color: "marker-special"
    },
    {
        id: "porcos",
        name: "Baía dos Porcos 🐠",
        coords: [2263, 1454],
        description: "Uma jóia selvagem e rochosa. Forma piscinas naturais incríveis na maré baixa. Um dos melhores pontos de mergulho livre (snorkel) da ilha para nadar com peixes coloridos e tartarugas.",
        tags: ["snorkel", "special"],
        tip: "Acesso por uma pequena trilha de pedras a partir do canto esquerdo da praia da Cacimba do Padre. Vá de sapatilha de neoprene!",
        icon: "fa-solid fa-mask-snorkel",
        color: "marker-special"
    },
    {
        id: "cacimba",
        name: "Cacimba do Padre 🏝️",
        coords: [2286, 1780],
        description: "Praia de areia fofa e o clássico cartão-postal com vista direta para o Morro Dois Irmãos. No verão é palco de campeonatos de surfe com ondas gigantes, no inverno de julho as águas costumam ser bem mais mansas.",
        tags: ["snorkel"],
        tip: "Ponto perfeito para fotos na areia com os 'Dois Irmãos' ao fundo ao entardecer.",
        icon: "fa-solid fa-umbrella-beach",
        color: "marker-default"
    },
    {
        id: "porto",
        name: "Praia do Porto ⚓",
        coords: [2247, 2888],
        description: "Área de ancoragem das embarcações com rica vida marinha. Excelente para fazer snorkel perto do Naufrágio do Navio Grego, onde costumam aparecer raias chitas, tartarugas e tubarões.",
        tags: ["snorkel"],
        tip: "Dá para alugar caiaque, stand-up paddle ou fazer o famoso passeio de canoa havaiana aqui logo cedo.",
        icon: "fa-solid fa-anchor",
        color: "marker-default"
    },
    {
        id: "leao",
        name: "Praia do Leão 🐢",
        coords: [1974, 1509],
        description: "Lado mar de fora. Praia de beleza selvagem, de areia avermelhada e cercada por duas grandes rochas (o Leão e a Viuvinha). É o principal berçário e local de desova das tartarugas marinhas na ilha.",
        tags: ["special"],
        tip: "Correntes muito fortes. Evite entrar no fundo do mar, prefira caminhar pela areia e contemplar os ninhos marcados pelo Projeto Tamar.",
        icon: "fa-solid fa-shield-halved",
        color: "marker-special"
    },
    {
        id: "conceicao",
        name: "Praia da Conceição 🌅",
        coords: [2333, 2486],
        description: "Grande faixa de areia sob a imponência do Morro do Pico. Um dos pontos mais badalados da ilha, com quadras de futevôlei e o Bar do Meio nas proximidades. Excelentes mergulhos nas pedras do canto direito.",
        tags: ["snorkel", "sunset"],
        tip: "Perfeito para estender a canga no final da tarde e ver o sol se esconder ao lado do Morro do Pico.",
        icon: "fa-solid fa-sun",
        color: "marker-sunset"
    },
    {
        id: "museu-tubaroes",
        name: "Museu dos Tubarões 🌝",
        coords: [2357, 3000],
        description: "Um museu interessante sobre a fauna marinha da ilha e um mirante gramado lindíssimo. Na maré baixa, dá para avistar tubarões limpando-se no raso da baía logo abaixo (Enseada dos Cações).",
        tags: ["sunrise", "special"],
        tip: "Dá para avistar tubarões nadando no rasinho nas primeiras horas do dia ou na maré seca.",
        icon: "fa-solid fa-fish-fins",
        color: "marker-special"
    },
    {
        id: "forte-boldro",
        name: "Mirante do Forte do Boldró 🌇",
        coords: [2247, 2200],
        description: "Ruínas de uma antiga fortificação no alto de uma falésia. É o ponto mais tradicional, romântico e concorrido da ilha para assistir ao pôr do sol clássico de Noronha.",
        tags: ["sunset", "special"],
        tip: "Chegue uns 30 a 40 minutos antes do sol se pôr para conseguir um bom espaço e tirar fotos incríveis com o Morro Dois Irmãos alinhado.",
        icon: "fa-solid fa-sun",
        color: "marker-sunset"
    },
    {
        id: "capelinha",
        name: "Capelinha de São Pedro ⛪",
        coords: [2317, 2850],
        description: "Pequena e charmosa capela localizada no alto do Porto de Santo Antônio. Oferece uma perspectiva aérea incrível da baía, dos barcos flutuando e do oceano.",
        tags: ["sunrise"],
        tip: "Ponto super pacífico e bonito para assistir ao nascer do sol.",
        icon: "fa-solid fa-church",
        color: "marker-default"
    },
    {
        id: "air-france",
        name: "Ponta do Air France ⛵",
        coords: [2427, 3065],
        description: "Local histórico onde ficava a base da companhia aérea francesa na década de 30. Fica no extremo norte da ilha, onde o Mar de Dentro encontra o bravio Mar de Fora.",
        tags: ["sunrise"],
        tip: "Ótimo ponto para observar o nascer do sol e sentir o vento forte do oceano.",
        icon: "fa-solid fa-compass",
        color: "marker-default"
    },
    {
        id: "bode",
        name: "Praia do Bode 🌅",
        coords: [2308, 1982],
        description: "Praia de mar calmo na maré baixa, vizinha da Cacimba do Padre. Possui poços de pedra ótimos para banho e é muito procurada para quem quer sossego.",
        tags: ["sunset"],
        tip: "Uma ótima alternativa para fugir do agito e curtir o pôr do sol em silêncio.",
        icon: "fa-solid fa-umbrella-beach",
        color: "marker-sunset"
    },
    {
        id: "boldro-praia",
        name: "Praia do Boldró 🌅",
        coords: [2293, 2289],
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
    loadSavedDetails();
    initCountdown();
    initTabs();
    initItinerary();
    initChecklist();
    initTides();
    checkTrailAvailability();
    
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
    
    // Bounds of the official_map.png image: 3657x2467 pixels
    const bounds = [[0, 0], [2467, 3657]];
    
    // Create map instance with Simple Coordinate system
    mapInstance = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -3.5,
        maxZoom: 1.5,
        zoomControl: true,
        bounds: bounds,
        maxBounds: bounds
    });

    // Add the official PNG map drawing as an image overlay
    L.imageOverlay('oficial_map.png', bounds).addTo(mapInstance);

    // Set initial view centered on the island bounds
    mapInstance.fitBounds(bounds);

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
            mapInstance.setView(spot.coords, -0.5);
            openDrawer(spot.id);
        });
    });

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

// ================= EDIT DRAWER CONTROLLER =================

function openEditDrawer() {
    document.getElementById("edit-pousada-name").value = localStorage.getItem("noronha_pousada_name") || "Pousada Maresia";
    document.getElementById("edit-pousada-reserva").value = localStorage.getItem("noronha_pousada_reserva") || "5007217316";
    document.getElementById("edit-pousada-pin").value = localStorage.getItem("noronha_pousada_pin") || "4776";
    document.getElementById("edit-pousada-address").value = localStorage.getItem("noronha_pousada_address") || "Rua Amaro Preto, 480 - Vila do Boldró";
    document.getElementById("edit-pousada-whatsapp").value = localStorage.getItem("noronha_pousada_whatsapp") || "+55 (81) 99999-9999";
    document.getElementById("edit-flight-loc").value = localStorage.getItem("noronha_flight_loc") || "NPGIBT";
    document.getElementById("edit-flight-req").value = localStorage.getItem("noronha_flight_req") || "3963411";
    document.getElementById("edit-cpf-gio").value = localStorage.getItem("noronha_cpf_gio") || "485.052.028-64";
    document.getElementById("edit-cpf-renan").value = localStorage.getItem("noronha_cpf_renan") || "449.227.578-99";

    const drawer = document.getElementById("edit-drawer");
    if (drawer) {
        drawer.classList.remove("hidden");
        setTimeout(() => {
            drawer.classList.add("active");
        }, 10);
    }
}

function closeEditDrawer() {
    const drawer = document.getElementById("edit-drawer");
    if (drawer && drawer.classList.contains("active")) {
        drawer.classList.remove("active");
        setTimeout(() => {
            drawer.classList.add("hidden");
        }, 300);
    }
}

function loadSavedDetails() {
    const pousadaName = localStorage.getItem("noronha_pousada_name") || "Pousada Maresia";
    const pousadaReserva = localStorage.getItem("noronha_pousada_reserva") || "5007217316";
    const pousadaPin = localStorage.getItem("noronha_pousada_pin") || "4776";
    const pousadaAddress = localStorage.getItem("noronha_pousada_address") || "Rua Amaro Preto, 480 - Vila do Boldró";
    const pousadaWhatsapp = localStorage.getItem("noronha_pousada_whatsapp") || "+55 (81) 99999-9999";
    const flightLoc = localStorage.getItem("noronha_flight_loc") || "NPGIBT";
    const flightReq = localStorage.getItem("noronha_flight_req") || "3963411";
    const cpfGio = localStorage.getItem("noronha_cpf_gio") || "485.052.028-64";
    const cpfRenan = localStorage.getItem("noronha_cpf_renan") || "449.227.578-99";

    // Update UI elements
    const displayPousadaName = document.getElementById("display-pousada-name");
    if (displayPousadaName) displayPousadaName.innerText = pousadaName;

    const displayReserva = document.getElementById("reserva-num");
    if (displayReserva) displayReserva.innerText = pousadaReserva;

    const displayPin = document.getElementById("pin-code");
    if (displayPin) displayPin.innerText = pousadaPin;

    const displayAddress = document.getElementById("pousada-address");
    if (displayAddress) displayAddress.innerText = pousadaAddress;

    const displayWhatsapp = document.getElementById("pousada-whatsapp");
    if (displayWhatsapp) {
        displayWhatsapp.innerText = pousadaWhatsapp;
        const link = document.getElementById("pousada-whatsapp-link");
        if (link) {
            const digits = pousadaWhatsapp.replace(/\D/g, "");
            link.href = `https://wa.me/${digits}`;
        }
    }

    const displayFlightLoc = document.getElementById("flight-loc");
    if (displayFlightLoc) displayFlightLoc.innerText = flightLoc;

    const displayFlightReq = document.getElementById("flight-req");
    if (displayFlightReq) displayFlightReq.innerText = flightReq;

    const displayCpfGio = document.getElementById("display-cpf-gio");
    if (displayCpfGio) displayCpfGio.innerText = "CPF: " + cpfGio;

    const displayCpfRenan = document.getElementById("display-cpf-renan");
    if (displayCpfRenan) displayCpfRenan.innerText = "CPF: " + cpfRenan;

    // Regenerate QR Codes
    const cleanCpfGio = cpfGio.replace(/\D/g, "");
    const cleanCpfRenan = cpfRenan.replace(/\D/g, "");

    const qrGio = document.getElementById("display-qr-gio");
    if (qrGio) {
        qrGio.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Participante%3A%20Giovanna%20Farnezi%20Silva%0ACPF%3A%20${cleanCpfGio}%0AAtalaia%2016%2F07%2F2026%2012%3A30`;
    }

    const qrRenan = document.getElementById("display-qr-renan");
    if (qrRenan) {
        qrRenan.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Participante%3A%20Renan%20Donadeli%20Anhezini%0ACPF%3A%20${cleanCpfRenan}%0AAtalaia%2016%2F07%2F2026%2012%3A30`;
    }
}

// ================= 5. TIDES & TRAIL CHECKER CONTROLLER =================

const TIDES_DATA = [
    {
        day: 10,
        weekDay: "Sexta-feira",
        dateLabel: "10 de Julho",
        moon: "Lua Minguante (20%)",
        moonIcon: "fa-moon",
        sunrise: "06:17",
        sunset: "18:12",
        tides: [
            { time: "00:47", height: "1.97", isHigh: true },
            { time: "07:08", height: "0.58", isHigh: false },
            { time: "13:21", height: "1.97", isHigh: true },
            { time: "19:36", height: "0.55", isHigh: false }
        ],
        svgPath: "M 0,35 C 13,31 66,82 119,82 C 172,82 195,31 222,31 C 249,31 300,83 327,83 C 354,83 387,50 400,45",
        svgFillPath: "M 0,35 C 13,31 66,82 119,82 C 172,82 195,31 222,31 C 249,31 300,83 327,83 C 354,83 387,50 400,45 L 400,120 L 0,120 Z",
        points: [
            { cx: 13, cy: 31, label: "1.97m", time: "00:47", isHigh: true },
            { cx: 119, cy: 82, label: "0.58m", time: "07:08", isHigh: false },
            { cx: 222, cy: 31, label: "1.97m", time: "13:21", isHigh: true },
            { cx: 327, cy: 83, label: "0.55m", time: "19:36", isHigh: false }
        ],
        recommendation: "Pico de maré baixa às 07:08. Ótimo horário para snorkeling e piscinas naturais na Baía dos Porcos ou do Sancho logo cedo."
    },
    {
        day: 11,
        weekDay: "Sábado",
        dateLabel: "11 de Julho",
        moon: "Lua Minguante (12%)",
        moonIcon: "fa-moon",
        sunrise: "06:17",
        sunset: "18:12",
        tides: [
            { time: "01:55", height: "2.08", isHigh: true },
            { time: "08:19", height: "0.44", isHigh: false },
            { time: "14:32", height: "2.05", isHigh: true },
            { time: "20:40", height: "0.45", isHigh: false }
        ],
        svgPath: "M 0,40 C 15,35 75,87 139,87 C 200,87 215,28 242,28 C 270,28 315,87 344,87 C 370,87 390,60 400,50",
        svgFillPath: "M 0,40 C 15,35 75,87 139,87 C 200,87 215,28 242,28 C 270,28 315,87 344,87 C 370,87 390,60 400,50 L 400,120 L 0,120 Z",
        points: [
            { cx: 32, cy: 27, label: "2.08m", time: "01:55", isHigh: true },
            { cx: 139, cy: 87, label: "0.44m", time: "08:19", isHigh: false },
            { cx: 242, cy: 28, label: "2.05m", time: "14:32", isHigh: true },
            { cx: 344, cy: 87, label: "0.45m", time: "20:40", isHigh: false }
        ],
        recommendation: "Maré baixa espetacular (0.44m) às 08:19! Perfeito para as piscinas naturais do Sancho e flutuação em Abreus."
    },
    {
        day: 12,
        weekDay: "Domingo",
        dateLabel: "12 de Julho",
        moon: "Lua Minguante (6%)",
        moonIcon: "fa-moon",
        sunrise: "06:17",
        sunset: "18:12",
        tides: [
            { time: "02:57", height: "2.21", isHigh: true },
            { time: "09:21", height: "0.28", isHigh: false },
            { time: "15:36", height: "2.15", isHigh: true },
            { time: "21:42", height: "0.35", isHigh: false }
        ],
        svgPath: "M 0,55 C 25,45 80,92 156,92 C 220,92 235,24 260,24 C 285,24 330,90 362,90 C 380,90 395,70 400,65",
        svgFillPath: "M 0,55 C 25,45 80,92 156,92 C 220,92 235,24 260,24 C 285,24 330,90 362,90 C 380,90 395,70 400,65 L 400,120 L 0,120 Z",
        points: [
            { cx: 49, cy: 22, label: "2.21m", time: "02:57", isHigh: true },
            { cx: 156, cy: 92, label: "0.28m", time: "09:21", isHigh: false },
            { cx: 260, cy: 24, label: "2.15m", time: "15:36", isHigh: true },
            { cx: 362, cy: 90, label: "0.35m", time: "21:42", isHigh: false }
        ],
        recommendation: "Maré super seca às 09:21 (0.28m). Excelente dia para as piscinas de Caieiras e Buraco da Raquel."
    },
    {
        day: 13,
        weekDay: "Segunda-feira",
        dateLabel: "13 de Julho",
        moon: "Lua Minguante (2%)",
        moonIcon: "fa-moon",
        sunrise: "06:17",
        sunset: "18:12",
        tides: [
            { time: "03:57", height: "2.36", isHigh: true },
            { time: "10:19", height: "0.14", isHigh: false },
            { time: "16:32", height: "2.26", isHigh: true },
            { time: "22:34", height: "0.26", isHigh: false }
        ],
        svgPath: "M 0,65 C 30,55 90,97 172,97 C 235,97 250,20 276,20 C 300,20 345,93 376,93 C 390,93 398,80 400,75",
        svgFillPath: "M 0,65 C 30,55 90,97 172,97 C 235,97 250,20 276,20 C 300,20 345,93 376,93 C 390,93 398,80 400,75 L 400,120 L 0,120 Z",
        points: [
            { cx: 66, cy: 17, label: "2.36m", time: "03:57", isHigh: true },
            { cx: 172, cy: 97, label: "0.14m", time: "10:19", isHigh: false },
            { cx: 276, cy: 20, label: "2.26m", time: "16:32", isHigh: true },
            { cx: 376, cy: 93, label: "0.26m", time: "22:34", isHigh: false }
        ],
        recommendation: "Maré quase zerada (0.14m) às 10:19! O mar estará muito raso, ideal para o snorkel mais nítido da viagem."
    },
    {
        day: 14,
        weekDay: "Terça-feira",
        dateLabel: "14 de Julho",
        moon: "Lua Nova",
        moonIcon: "fa-circle",
        sunrise: "06:17",
        sunset: "18:12",
        tides: [
            { time: "04:51", height: "2.48", isHigh: true },
            { time: "11:12", height: "0.03", isHigh: false },
            { time: "17:25", height: "2.33", isHigh: true },
            { time: "23:25", height: "0.20", isHigh: false }
        ],
        svgPath: "M 0,75 C 35,65 100,101 187,101 C 250,101 265,18 290,18 C 315,18 360,95 390,95 C 395,95 398,90 400,85",
        svgFillPath: "M 0,75 C 35,65 100,101 187,101 C 250,101 265,18 290,18 C 315,18 360,95 390,95 C 395,95 398,90 400,85 L 400,120 L 0,120 Z",
        points: [
            { cx: 81, cy: 13, label: "2.48m", time: "04:51", isHigh: true },
            { cx: 187, cy: 101, label: "0.03m", time: "11:12", isHigh: false },
            { cx: 290, cy: 18, label: "2.33m", time: "17:25", isHigh: true },
            { cx: 390, cy: 95, label: "0.20m", time: "23:25", isHigh: false }
        ],
        recommendation: "Lua Nova! Maré seca absoluta (0.03m) às 11:12. Céu escuro, noite maravilhosa para contemplar estrelas! 🌌"
    },
    {
        day: 15,
        weekDay: "Quarta-feira",
        dateLabel: "15 de Julho",
        moon: "Lua Crescente (1%)",
        moonIcon: "fa-moon",
        sunrise: "06:17",
        sunset: "18:12",
        tides: [
            { time: "05:42", height: "2.56", isHigh: true },
            { time: "12:02", height: "0.00", isHigh: false },
            { time: "18:14", height: "2.36", isHigh: true }
        ],
        svgPath: "M 0,85 C 40,75 110,102 201,102 C 265,102 280,17 304,17 C 330,17 375,98 400,95",
        svgFillPath: "M 0,85 C 40,75 110,102 201,102 C 265,102 280,17 304,17 C 330,17 375,98 400,95 L 400,120 L 0,120 Z",
        points: [
            { cx: 95, cy: 10, label: "2.56m", time: "05:42", isHigh: true },
            { cx: 201, cy: 102, label: "0.00m", time: "12:02", isHigh: false },
            { cx: 304, cy: 17, label: "2.36m", time: "18:14", isHigh: true }
        ],
        recommendation: "Maré ZERADA às 12:02! Excelente oportunidade para caminhar nas poças da Enseada dos Cações ou Buraco da Raquel."
    },
    {
        day: 16,
        weekDay: "Quinta-feira",
        dateLabel: "16 de Julho",
        moon: "Lua Crescente (4%)",
        moonIcon: "fa-moon",
        sunrise: "06:17",
        sunset: "18:12",
        tides: [
            { time: "00:14", height: "0.19", isHigh: false },
            { time: "06:31", height: "2.58", isHigh: true },
            { time: "12:51", height: "0.03", isHigh: false },
            { time: "19:02", height: "2.34", isHigh: true }
        ],
        svgPath: "M 0,95 C 5,95 50,9 109,9 C 160,9 175,101 214,101 C 250,101 285,18 317,18 C 345,18 385,85 400,90",
        svgFillPath: "M 0,95 C 5,95 50,9 109,9 C 160,9 175,101 214,101 C 250,101 285,18 317,18 C 345,18 385,85 400,90 L 400,120 L 0,120 Z",
        points: [
            { cx: 2, cy: 95, label: "0.19m", time: "00:14", isHigh: false },
            { cx: 109, cy: 9, label: "2.58m", time: "06:31", isHigh: true },
            { cx: 214, cy: 101, label: "0.03m", time: "12:51", isHigh: false },
            { cx: 317, cy: 18, label: "19:02", isHigh: true }
        ],
        recommendation: "Dia de retorno e da flutuação na Atalaia (agendada para as 12:00-13:30, casando perfeitamente com a maré baixa)."
    }
];

function initTides() {
    const container = document.getElementById("tides-cards-container");
    if (!container) return;
    container.innerHTML = "";

    TIDES_DATA.forEach(day => {
        let tideListHTML = "";
        day.tides.forEach(t => {
            tideListHTML += `
                <div class="tide-list-item ${t.isHigh ? 'high-tide' : 'low-tide'}" style="padding: 6px; border-radius: 8px; background: ${t.isHigh ? 'rgba(0, 180, 216, 0.08)' : 'rgba(255, 107, 74, 0.08)'}; border: 1px solid ${t.isHigh ? 'rgba(0, 180, 216, 0.15)' : 'rgba(255, 107, 74, 0.15)'}; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <span style="font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: ${t.isHigh ? 'var(--turquoise-dark)' : 'var(--sunset)'}; margin-bottom: 2px;">
                        ${t.isHigh ? '<i class="fa-solid fa-arrow-trend-up"></i> Alta' : '<i class="fa-solid fa-arrow-trend-down"></i> Baixa'}
                    </span>
                    <strong style="font-size: 0.85rem; color: var(--text-primary);">${t.height}m</strong>
                    <span class="time" style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 1px; font-weight: 500;">${t.time}</span>
                </div>
            `;
        });

        let pointsHTML = "";
        day.points.forEach(pt => {
            const isHigh = pt.isHigh;
            pointsHTML += `
                <circle cx="${pt.cx}" cy="${pt.cy}" r="4.5" fill="${isHigh ? 'var(--turquoise-dark)' : 'var(--sunset)'}" stroke="#ffffff" stroke-width="1.5" />
                <text x="${pt.cx}" y="${isHigh ? pt.cy - 10 : pt.cy + 13}" font-size="9.5" fill="${isHigh ? 'var(--turquoise-dark)' : 'var(--sunset)'}" text-anchor="middle" font-weight="700">${pt.label}</text>
                <text x="${pt.cx}" y="${isHigh ? pt.cy + 13 : pt.cy - 7}" font-size="8" fill="var(--text-secondary)" text-anchor="middle" font-weight="500">${pt.time}</text>
            `;
        });

        const card = document.createElement("div");
        card.className = "tide-day-card app-glass-card";
        card.style.cssText = "padding: 16px; margin-bottom: 8px;";
        card.innerHTML = `
            <div class="tide-card-header" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                <div class="tide-day-title" style="display: flex; align-items: center; gap: 12px;">
                    <span class="day-num-small" style="background: var(--turquoise-gradient); color: #ffffff; width: 36px; height: 36px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: 700; font-size: 0.95rem; flex-shrink: 0;">${day.day}</span>
                    <div>
                        <strong style="font-size: 0.95rem; display: block; color: var(--text-primary); font-family: var(--font-body); font-weight: 600;">${day.weekDay}, ${day.dateLabel}</strong>
                        <span class="moon-badge" style="font-size: 0.72rem; color: var(--gold-dark); font-weight: 600; display: inline-flex; align-items: center; gap: 4px; margin-top: 2px;"><i class="fa-solid ${day.moonIcon}"></i> ${day.moon}</span>
                    </div>
                </div>
                <div class="tide-sun-times" style="font-size: 0.7rem; color: var(--text-secondary); text-align: right; display: flex; flex-direction: column; gap: 2px;">
                    <span><i class="fa-solid fa-sun-up" style="color: var(--gold-dark);"></i> Nascer: ${day.sunrise}</span>
                    <span><i class="fa-solid fa-sun-down" style="color: var(--turquoise-medium);"></i> Ocaso: ${day.sunset}</span>
                </div>
            </div>
            
            <div class="tide-wave-container" style="background: rgba(255, 255, 255, 0.4); border-radius: 12px; padding: 10px; border: 1px solid var(--glass-border); margin: 12px 0; position: relative;">
                <svg viewBox="0 0 400 120" style="width: 100%; height: auto; display: block; overflow: visible;">
                    <defs>
                        <linearGradient id="tide-fill-grad-${day.day}" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="var(--turquoise-medium)" stop-opacity="0.35"/>
                            <stop offset="100%" stop-color="var(--turquoise-light)" stop-opacity="0.01"/>
                        </linearGradient>
                        <linearGradient id="tide-line-grad-${day.day}" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stop-color="var(--turquoise-dark)"/>
                            <stop offset="50%" stop-color="var(--turquoise-medium)"/>
                            <stop offset="100%" stop-color="var(--turquoise-dark)"/>
                        </linearGradient>
                    </defs>
                    
                    <!-- Shading daylight hours (06:17 to 18:12) -->
                    <!-- Daylight width is roughly 50% of the day. Map: 06:17 -> X=105, 18:12 -> X=303 -->
                    <rect x="105" y="5" width="198" height="110" fill="rgba(253, 218, 13, 0.04)" rx="4" />
                    <line x1="105" y1="5" x2="105" y2="115" stroke="rgba(253, 218, 13, 0.2)" stroke-dasharray="2,2" />
                    <line x1="303" y1="5" x2="303" y2="115" stroke="rgba(253, 218, 13, 0.2)" stroke-dasharray="2,2" />
                    <text x="204" y="15" font-size="7.5" fill="var(--gold-dark)" text-anchor="middle" font-weight="600" opacity="0.6">Período Diurno (Sol)</text>
                    
                    <path d="${day.svgPath}" fill="none" stroke="url(#tide-line-grad-${day.day})" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="${day.svgFillPath}" fill="url(#tide-fill-grad-${day.day})"/>
                    
                    ${pointsHTML}
                </svg>
            </div>
            
            <div class="tide-grid-container" style="display: grid; grid-template-columns: repeat(${day.tides.length}, 1fr); gap: 8px; margin-bottom: 12px; text-align: center;">
                ${tideListHTML}
            </div>

            <div class="tide-recommendation" style="font-size: 0.8rem; border-top: 1px dashed var(--glass-border); padding-top: 10px; color: var(--text-primary); display: flex; gap: 8px; align-items: flex-start; line-height: 1.35;">
                <i class="fa-solid fa-circle-info text-turquoise" style="margin-top: 2px; flex-shrink: 0; font-size: 0.85rem;"></i>
                <span><strong>Dica:</strong> ${day.recommendation}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function checkTrailAvailability() {
    const banner = document.getElementById("trail-checker-banner");
    const icon = document.getElementById("trail-status-icon");
    const title = document.getElementById("trail-status-title");
    const time = document.getElementById("trail-status-time");
    
    if (!banner) return;
    
    fetch("trail_alerts.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("No alert file found");
            }
            return response.json();
        })
        .then(data => {
            if (data.last_checked) {
                time.innerText = `Última verificação: ${data.last_checked}`;
            }
            
            if (data.alerts && data.alerts.length > 0) {
                banner.style.borderLeftColor = "var(--sunset)";
                banner.style.background = "rgba(255, 107, 74, 0.08)";
                icon.className = "fa-solid fa-triangle-exclamation text-sunset";
                icon.style.animation = "pulse 1.5s infinite";
                
                let alertTexts = data.alerts.map(a => `${a.trail} (${a.slots} vagas em ${a.date} ${a.time})`);
                title.innerHTML = `<span class="text-sunset" style="font-weight: 700;">🚨 VAGAS ENCONTRADAS!</span> ${alertTexts.join(", ")}`;
            } else {
                banner.style.borderLeftColor = "var(--emerald)";
                banner.style.background = "rgba(16, 185, 129, 0.04)";
                icon.className = "fa-solid fa-circle-check text-emerald";
                title.innerText = "🟢 Monitoramento de trilhas ativo (nenhuma vaga disponível no momento)";
            }
        })
        .catch(err => {
            console.log("Trail alerts not fetched:", err);
            banner.style.borderLeftColor = "var(--turquoise-medium)";
            icon.className = "fa-solid fa-circle-info text-turquoise";
            title.innerText = "🟢 Monitoramento de trilhas ativo (checado em background)";
        });
}
