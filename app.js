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

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputPass = passwordInput.value.trim().toLowerCase();

        if (inputPass === CORRECT_PASSWORD) {
            sessionStorage.setItem("noronha_auth", "true");
            loginError.classList.add("hidden");
            
            // Nice fade transition
            const loginScreen = document.getElementById("login-screen");
            loginScreen.style.opacity = "0";
            loginScreen.style.transition = "opacity 0.5s ease";
            
            setTimeout(() => {
                showDashboard();
            }, 450);
        } else {
            loginError.classList.remove("hidden");
            passwordInput.value = "";
            passwordInput.focus();
        }
    });

    // Logout Action
    document.getElementById("btn-logout").addEventListener("click", () => {
        sessionStorage.removeItem("noronha_auth");
        window.location.reload();
    });

    // Initialize all app components
    initApp();
});

function showDashboard() {
    document.getElementById("login-screen").classList.add("hidden");
    const mainContent = document.getElementById("main-content");
    mainContent.classList.remove("hidden");
    mainContent.style.opacity = "0";
    setTimeout(() => {
        mainContent.style.opacity = "1";
        mainContent.style.transition = "opacity 0.6s ease";
    }, 50);
}


// ================= DATA DEFINITIONS =================

// Noronha Beaches and Spots
const SPOTS_DATA = [
    {
        id: "sancho",
        name: "Praia do Sancho",
        description: "Considerada uma das praias mais bonitas do mundo. Acesso por escada vertical estreita entre rochas. Ideal para mergulho livre (sem coletes!). Fique atento aos ninhos de Atobá-de-pé-vermelho nas árvores.",
        tags: ["snorkel", "special"],
        tip: "Verifique os horários permitidos de descida/subida e a maré."
    },
    {
        id: "porcos",
        name: "Baía dos Porcos",
        description: "Melhor ponto de mergulho livre (snorkel) da ilha. Águas cristalinas e calmas em maré baixa, ideal para ver tartarugas e peixes. Fica ao lado da Cacimba do Padre.",
        tags: ["snorkel", "special"],
        tip: "Acesso por uma trilha curta de pedras a partir do lado esquerdo da Cacimba."
    },
    {
        id: "cacimba",
        name: "Praia da Cacimba do Padre",
        description: "Palco de grandes campeonatos de surf. Abriga o icônico Morro Dois Irmãos. Excelente ponto de banho e snorkel em épocas de mar calmo.",
        tags: ["snorkel"],
        tip: "Lugar clássico para fotos perfeitas do Morro Dois Irmãos."
    },
    {
        id: "porto",
        name: "Praia do Porto",
        description: "Lugar super movimentado com muita vida marinha (raias, tartarugas e tubarões). Fica bem perto do Naufrágio do navio grego, onde dá para ir nadando com snorkel.",
        tags: ["snorkel"],
        tip: "Dá para alugar bike aquática ou fazer passeio de canoa havaiana aqui."
    },
    {
        id: "leao",
        name: "Praia do Leão",
        description: "Praia de mar aberto, selvagem e belíssima. É o principal ponto de desova das tartarugas marinhas na ilha. Excelente para contemplação.",
        tags: ["special"],
        tip: "Cuidado com as correntes se for entrar na água."
    },
    {
        id: "conceicao",
        name: "Praia da Conceição",
        description: "Praia extensa com o Morro do Pico ao fundo. O lado direito (perto do morro de fora) possui um excelente ponto de snorkel com bastante peixes.",
        tags: ["snorkel", "sunset"],
        tip: "Perfeito para passar a tarde e assistir ao pôr do sol."
    },
    {
        id: "museu-tubaroes",
        name: "Museu dos Tubarões",
        description: "Excelente mirante e museu. Em julho, com a lua cheia, teremos o Festival da Lua Cheia (especialmente no dia 14/07).",
        tags: ["sunrise", "special"],
        tip: "Ponto imperdível para ver o Nascer da Lua Cheia! 🌝"
    },
    {
        id: "capelinha",
        name: "Capelinha de São Pedro",
        description: "Localizado no alto, próximo ao porto. Oferece uma vista panorâmica incrível de toda a baía do porto.",
        tags: ["sunrise"],
        tip: "Ponto espetacular para ver o nascer do sol."
    },
    {
        id: "air-france",
        name: "Ponta do Air France",
        description: "Local histórico onde as águas do mar de dentro e mar de fora se encontram.",
        tags: ["sunrise"],
        tip: "Muito indicado para ver o amanhecer ou iniciar passeios de canoa."
    },
    {
        id: "forte-boldro",
        name: "Mirante do Forte do Boldró",
        description: "O ponto mais famoso e tradicional da ilha para assistir ao pôr do sol, com vista privilegiada do Morro Dois Irmãos.",
        tags: ["sunset", "special"],
        tip: "Chegue cedo para pegar um bom lugar. Costuma lotar!"
    },
    {
        id: "bode",
        name: "Praia do Bode",
        description: "Praia tranquila e menos movimentada, vizinha da Cacimba do Padre.",
        tags: ["sunset"],
        tip: "Ótimo refúgio para ver o pôr do sol em silêncio."
    },
    {
        id: "boldro-praia",
        name: "Praia do Boldró",
        description: "Praia de pedras e piscinas naturais que surgem na maré baixa. Abriga o mirante no topo da falésia.",
        tags: ["sunset"],
        tip: "Ótimo local para relaxar no fim de tarde."
    }
];

// Daily Itinerary
const ITINERARY_DATA = {
    1: {
        title: "Dia 1: Chegada & Boas-Vindas",
        date: "Sexta-feira, 10 de Julho",
        badge: "Chegada",
        timeline: [
            { time: "Tarde", title: "Chegada no Aeroporto ✈️", desc: "Desembarque no aeroporto de Noronha. O transfer da Pousada Maresia estará nos aguardando para nos levar à pousada.", highlight: true },
            { time: "14:00 - 17:00", title: "Check-in na Pousada Maresia 🏨", desc: "Instalação no quarto na Vila dos Remédios, organização das malas e descanso da viagem." },
            { time: "Final da Tarde", title: "Caminhada pela Vila dos Remédios 🚶‍♂️🚶‍♀️", desc: "Reconhecimento rápido do centro (caixas eletrônicos, farmácia, mercados) e caminhada até a Praia do Cachorro ou Praia do Meio." },
            { time: "17:30", title: "Pôr do sol na Praia da Conceição 🌅", desc: "Nossa primeira recepção com o pôr do sol clássico de Noronha aos pés do Morro do Pico." },
            { time: "Noite", title: "Jantar na Vila dos Remédios 🍽️", desc: "Escolha de um restaurante aconchegante no centrinho (fica a 2-4 min a pé da nossa pousada)." }
        ]
    },
    2: {
        title: "Dia 2: Mar de Dentro & Naufrágio",
        date: "Sábado, 11 de Julho",
        badge: "Aventura Aquática",
        timeline: [
            { time: "08:00", title: "Café da manhã na Pousada ☕", desc: "Carregar as energias para o primeiro dia completo de exploração." },
            { time: "09:00", title: "Praia do Porto - Snorkel & Naufrágio 🤿", desc: "Mergulho de snorkel na Praia do Porto. Vamos procurar tartarugas, raias e ir nadando até o Naufrágio do Navio Grego! Possibilidade de alugar bike aquática ou fazer passeio de canoa havaiana.", highlight: true },
            { time: "Almoço", title: "Restaurante próximo ao Porto 🐟", desc: "Aproveitar peixe fresco local nos quiosques ou restaurantes da região do porto." },
            { time: "Tarde", title: "Praia da Conceição (Lado Direito)", desc: "Mergulho de snorkel no lado direito, próximo ao Morro de Fora, explorando a rica vida marinha costeira." },
            { time: "17:00", title: "Pôr do sol no Mirante do Forte do Boldró 🌇", desc: "Ir para as ruínas do Forte do Boldró para assistir ao pôr do sol mais tradicional da ilha com vista para o Morro Dois Irmãos." }
        ]
    },
    3: {
        title: "Dia 3: O Cartão Postal de Noronha",
        date: "Domingo, 12 de Julho",
        badge: "Imperdível",
        timeline: [
            { time: "08:30", title: "Partida para Cacimba do Padre 🏝️", desc: "Chegar na praia da Cacimba do Padre, tirar fotos clássicas em frente ao Morro Dois Irmãos." },
            { time: "10:00", title: "Baía dos Porcos (Mergulho Livre) 🐠", desc: "Seguir pela trilha curta na lateral esquerda da Cacimba para acessar a Baía dos Porcos. Fazer snorkel na piscina natural (melhor ponto de mergulho livre!). Lembrar de consultar a maré baixa.", highlight: true },
            { time: "Almoço", title: "Almoço na Vila 🍽️", desc: "Pausa para almoçar e descansar um pouco o sol." },
            { time: "15:00", title: "Mirante da Baía dos Porcos 📸", desc: "Subida até o mirante para ter aquela visão aérea perfeita dos Dois Irmãos e da Baía dos Porcos." },
            { time: "17:15", title: "Pôr do Sol na Praia do Bode 🌅", desc: "Caminhar até a Praia do Bode (vizinha) para curtir um pôr do sol mais reservado e tranquilo nas areias." }
        ]
    },
    4: {
        title: "Dia 4: A Praia Mais Bonita do Mundo",
        date: "Segunda-feira, 13 de Julho",
        badge: "Paraíso",
        timeline: [
            { time: "08:00", title: "Visita à Praia do Sancho 🌊", desc: "Descer a famosa escada vertical entre as fendas das rochas para acessar a espetacular Praia do Sancho. Mergulho livre sem colete!", highlight: true },
            { time: "Tarde", title: "Observação de Aves & Trilha 🦜", desc: "Caminhar pelas passarelas suspensas de madeira e procurar os ninhos de Atobá-de-pé-vermelho nas copas das árvores." },
            { time: "16:30", title: "Trilha do Piquinho 🧗", desc: "Subir a Trilha do Piquinho para termos uma visão de 360 graus da ilha no fim de tarde (segurança em primeiro lugar)." },
            { time: "17:30", title: "Pôr do Sol no Topo 🌅", desc: "Assistir ao pôr do sol do alto com vista panorâmica espetacular." }
        ]
    },
    5: {
        title: "Dia 5: Nascer do Sol & Lua Cheia",
        date: "Terça-feira, 14 de Julho",
        badge: "Dia Especial",
        timeline: [
            { time: "05:15", title: "Amanhecer na Capelinha de São Pedro 🌅", desc: "Acordar cedo para assistir ao nascer do sol na Capelinha ou na Ponta do Air France (alternativamente: passeio de canoa havaiana ao amanhecer)." },
            { time: "Manhã", title: "Praia do Leão 🐢", desc: "Visita à Praia do Leão. Praia linda e selvagem, famosa pela desova das tartarugas marinhas.", highlight: true },
            { time: "Tarde", title: "Relax na Pousada ou Compras 🛍️", desc: "Passeio pelas lojinhas de artesanato da Vila dos Remédios, descanso na Pousada Maresia." },
            { time: "17:00", title: "Museu dos Tubarões - Festival da Lua Cheia 🌝", desc: "Ir para o Museu dos Tubarões no fim do dia para presenciar o incrível Nascer da Lua Cheia sobre o oceano. Dia de Lua Cheia!", highlight: true }
        ]
    },
    6: {
        title: "Dia 6: Repeteco dos Favoritos",
        date: "Quarta-feira, 15 de Julho",
        badge: "Despedida",
        timeline: [
            { time: "Dia Todo", title: "Escolha do Casal 🗺️", desc: "Dia livre para repetir a praia que mais amamos (Sancho, Baía dos Porcos ou Porto) ou fazer algum passeio de barco complementar pela ilha.", highlight: true },
            { time: "Fim da Tarde", title: "Último Mergulho de Despedida 🌊", desc: "Aproveitar as últimas horas de água salgada morna na Praia da Conceição." },
            { time: "17:30", title: "Pôr do sol de despedida 🌇", desc: "Escolher nosso ponto preferido para se despedir do sol de Noronha." },
            { time: "Noite", title: "Jantar Especial de Despedida 🍷", desc: "Jantar especial de comemoração na Vila dos Remédios para celebrar essa viagem inesquecível." }
        ]
    },
    7: {
        title: "Dia 7: Retorno para Casa",
        date: "Quinta-feira, 16 de Julho",
        badge: "Fim da Viagem",
        timeline: [
            { time: "08:00 - 10:00", title: "Café e Preparação 🧳", desc: "Último café da manhã, fechamento das malas e checagem para não esquecer nada." },
            { time: "08:00 - 12:00", title: "Check-out Pousada Maresia 🚪", desc: "Realizar o check-out na recepção da pousada." },
            { time: "Horário do Voo", title: "Transfer de Volta 🚌✈️", desc: "Transfer gratuito da pousada nos levará ao Aeroporto de Noronha para o voo de volta para casa." }
        ]
    }
};

// ================= APP INITIALIZER =================

function initApp() {
    initCountdown();
    initTabs();
    initSpots();
    initItinerary();
    initChecklist();
}

// ================= 1. COUNTDOWN CONTROLLER =================
function initCountdown() {
    // Target Date: July 10, 2026 at 14:00 (Check-in time)
    const targetDate = new Date("2026-07-10T14:00:00-03:00").getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            document.getElementById("countdown").innerHTML = "<div class='success-badge' style='font-size:1.5rem; padding: 10px 20px;'><i class='fa-solid fa-umbrella-beach'></i> ESTAMOS NO PARAÍSO! 🌴</div>";
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

// ================= 2. TAB CONTROLLER =================
function initTabs() {
    const navButtons = document.querySelectorAll(".nav-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");

            // Update buttons active class
            navButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Update contents active class
            tabContents.forEach(content => {
                content.classList.remove("active");
                if (content.id === targetTab) {
                    content.classList.add("active");
                }
            });

            // If switching to map tab, initialize it and trigger invalidateSize
            if (targetTab === "tab-map") {
                setTimeout(() => {
                    initMap();
                    if (mapInstance) {
                        mapInstance.invalidateSize();
                    }
                }, 100); // Small timeout to ensure DOM element is displayed first
            }

            // If switching to mobile, scroll back to top of content
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// ================= 3. BEACHES AND SPOTS CONTROLLER =================
let visitedSpots = JSON.parse(localStorage.getItem("visited_spots")) || [];

function initSpots() {
    const container = document.getElementById("spots-container");
    const filterButtons = document.querySelectorAll(".filter-btn");

    function renderSpots(filter = "all") {
        container.innerHTML = "";

        const filtered = filter === "all" 
            ? SPOTS_DATA 
            : SPOTS_DATA.filter(s => s.tags.includes(filter));

        filtered.forEach(spot => {
            const isVisited = visitedSpots.includes(spot.id);
            const card = document.createElement("div");
            card.className = `spot-card ${isVisited ? "visited" : ""}`;
            card.dataset.id = spot.id;

            let tagBadges = "";
            spot.tags.forEach(t => {
                let label = t;
                if(t === "snorkel") label = "🤿 Snorkel";
                if(t === "sunset") label = "🌅 Pôr do Sol";
                if(t === "sunrise") label = "🌇 Nascer Sol";
                if(t === "special") label = "⭐ Especial";
                tagBadges += `<span class="spot-tag tag-${t}">${label}</span>`;
            });

            card.innerHTML = `
                <div class="spot-header">
                    <div class="spot-tags">${tagBadges}</div>
                    <button class="btn-visited-check" onclick="toggleSpotVisited('${spot.id}')" title="${isVisited ? 'Marcar como não visitado' : 'Marcar como visitado'}">
                        <i class="${isVisited ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle-check'}"></i>
                    </button>
                </div>
                <h4>${spot.name}</h4>
                <p>${spot.description}</p>
                <div class="spot-meta">
                    <i class="fa-solid fa-circle-info"></i> Dica: ${spot.tip}
                </div>
            `;
            container.appendChild(card);
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderSpots(btn.getAttribute("data-filter"));
        });
    });

    renderSpots();
}

window.toggleSpotVisited = function(spotId) {
    const index = visitedSpots.indexOf(spotId);
    if (index === -1) {
        visitedSpots.push(spotId);
        showToast("Marcado como visitado! 🎉");
    } else {
        visitedSpots.splice(index, 1);
    }
    localStorage.setItem("visited_spots", JSON.stringify(visitedSpots));
    
    // Rerender spots with current filter
    const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter");
    initSpots(); // Rerender
};

// ================= 4. ITINERARY DIARY CONTROLLER =================
function initItinerary() {
    const dayButtons = document.querySelectorAll(".day-btn");
    const container = document.getElementById("itinerary-details");

    function renderDay(dayNum) {
        const dayData = ITINERARY_DATA[dayNum];
        if (!dayData) return;

        let timelineHTML = "";
        dayData.timeline.forEach(item => {
            timelineHTML += `
                <div class="timeline-item ${item.highlight ? 'highlight' : ''}">
                    <span class="time">${item.time}</span>
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="itinerary-card">
                <div class="itinerary-header">
                    <h3>${dayData.title}</h3>
                    <span class="day-badge">${dayData.badge}</span>
                </div>
                <p style="color: var(--text-secondary); margin-bottom: 20px; font-style: italic;"><i class="fa-regular fa-calendar"></i> ${dayData.date}</p>
                <div class="timeline">
                    ${timelineHTML}
                </div>
            </div>
        `;
    }

    dayButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            dayButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderDay(btn.getAttribute("data-day"));
        });
    });

    // Render first day on startup
    renderDay(1);
}

// ================= 5. CHECKLIST CONTROLLER =================
let checklistItems = JSON.parse(localStorage.getItem("noronha_checklist")) || [];

// Default Checklist values if empty
const DEFAULT_CHECKLIST = [
    // Mala
    { id: 1, text: "Óculos de sol", category: "Mala", completed: false },
    { id: 2, text: "Protetor solar / Camisa Lycra", category: "Mala", completed: false },
    { id: 3, text: "Máscara de snorkel & Nadadeiras", category: "Mala", completed: false },
    { id: 4, text: "Sapatilha náutica / Calçado confortável", category: "Mala", completed: false },
    { id: 5, text: "Repelente de insetos", category: "Mala", completed: false },
    { id: 6, text: "Roupas de banho e roupas leves", category: "Mala", completed: false },
    // Documentos
    { id: 7, text: "RG ou CNH original físico", category: "Documentos", completed: false },
    { id: 8, text: "App da Booking com a reserva offline", category: "Documentos", completed: false },
    { id: 9, text: "Pagar Taxa de Preservação Ambiental (TPA)", category: "Documentos", completed: false },
    { id: 10, text: "Comprar Ingresso do Parque Nacional Marinho", category: "Documentos", completed: false },
    // Providências
    { id: 11, text: "Confirmar horário do Transfer de chegada", category: "Providências", completed: false },
    { id: 12, text: "Levar dinheiro em espécie (sinal oscila)", category: "Providências", completed: false }
];

function initChecklist() {
    if (checklistItems.length === 0) {
        checklistItems = [...DEFAULT_CHECKLIST];
        localStorage.setItem("noronha_checklist", JSON.stringify(checklistItems));
    }

    const form = document.getElementById("checklist-form");
    const input = document.getElementById("checklist-input");
    const categorySelect = document.getElementById("checklist-category");

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

    renderChecklists();
}

function renderChecklists() {
    const listMala = document.getElementById("list-mala");
    const listDocs = document.getElementById("list-docs");
    const listProvidencias = document.getElementById("list-providencias");

    listMala.innerHTML = "";
    listDocs.innerHTML = "";
    listProvidencias.innerHTML = "";

    checklistItems.forEach(item => {
        const li = document.createElement("li");
        li.className = `todo-item ${item.completed ? 'checked' : ''}`;
        li.innerHTML = `
            <div class="todo-left" onclick="toggleTodoCompleted(${item.id})">
                <div class="checkbox-custom">
                    <i class="fa-solid fa-check"></i>
                </div>
                <span class="todo-text">${item.text}</span>
            </div>
            <button class="btn-delete-todo" onclick="deleteTodoItem(${item.id})" title="Excluir item">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        `;

        if (item.category === "Mala") {
            listMala.appendChild(li);
        } else if (item.category === "Documentos") {
            listDocs.appendChild(li);
        } else {
            listProvidencias.appendChild(li);
        }
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
    if (checklistItems.length === 0) {
        document.getElementById("checklist-progress").style.width = "0%";
        document.getElementById("checklist-progress-text").innerText = "Sem itens no checklist";
        return;
    }

    const completedCount = checklistItems.filter(i => i.completed).length;
    const totalCount = checklistItems.length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    document.getElementById("checklist-progress").style.width = `${percentage}%`;
    document.getElementById("checklist-progress-text").innerText = `${completedCount} de ${totalCount} itens prontos (${percentage}%)`;
}


// ================= HELPER FUNCTIONS =================

// Copy text to clipboard
window.copyText = function(elementId, successMessage) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage);
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
    });
};

// Show temporary toast notification
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    // Hide after 2.5 seconds
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.classList.add("hidden");
        }, 400);
    }, 2500);
}

// ================= LEAFLET MAP CONTROLLER =================
let mapInstance = null;

function initMap() {
    if (mapInstance) return; // Prevent double initialization
    
    // Center of Fernando de Noronha
    const center = [-3.844, -32.414];
    
    // Create map instance
    mapInstance = L.map('map', {
        center: center,
        zoom: 13.5,
        minZoom: 12,
        maxZoom: 17
    });

    // Add CartoDB Dark Matter tile layer for a gorgeous look
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(mapInstance);

    // Custom marker style generator using divIcon
    const createCustomIcon = (iconClass, colorClass) => {
        return L.divIcon({
            html: `<div class="custom-map-marker ${colorClass}"><i class="${iconClass}"></i></div>`,
            className: 'leaflet-custom-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30]
        });
    };

    // Coordinate markers data
    const mapMarkers = [
        {
            name: "Pousada Maresia 🏨",
            coords: [-3.8415, -32.4124],
            desc: "Nossa hospedagem confirmada na Vila dos Remédios! Bairro central e aconchegante.",
            icon: "fa-solid fa-hotel",
            color: "marker-lodging",
            actionId: "tab-lodging"
        },
        {
            name: "Praia do Sancho 🌊",
            coords: [-3.8546, -32.4431],
            desc: "A praia mais bonita do mundo! Acesso por fenda estreita entre rochas. Mergulho livre.",
            icon: "fa-solid fa-umbrella-beach",
            color: "marker-special",
            actionId: "tab-spots"
        },
        {
            name: "Baía dos Porcos 🐠",
            coords: [-3.8504, -32.4339],
            desc: "Melhor ponto de snorkel (mergulho livre) com piscinas naturais de águas calmas.",
            icon: "fa-solid fa-mask-snorkel",
            color: "marker-special",
            actionId: "tab-spots"
        },
        {
            name: "Cacimba do Padre 🏝️",
            coords: [-3.8497, -32.4312],
            desc: "Vista clássica do Morro Dois Irmãos e excelente para banho de mar calmo.",
            icon: "fa-solid fa-umbrella-beach",
            color: "marker-default",
            actionId: "tab-spots"
        },
        {
            name: "Praia do Porto ⚓",
            coords: [-3.8347, -32.4035],
            desc: "Mergulho de snorkel próximo ao Naufrágio do navio grego, passeio de canoa ou bike aquática.",
            icon: "fa-solid fa-anchor",
            color: "marker-default",
            actionId: "tab-spots"
        },
        {
            name: "Praia do Leão 🐢",
            coords: [-3.8647, -32.4330],
            desc: "Praia de mar aberto belíssima e principal área de desova das tartarugas marinhas.",
            icon: "fa-solid fa-shield-halved",
            color: "marker-special",
            actionId: "tab-spots"
        },
        {
            name: "Praia da Conceição 🌅",
            coords: [-3.8427, -32.4172],
            desc: "Extensa praia aos pés do Morro do Pico, ideal para curtir o dia e ver o pôr do sol.",
            icon: "fa-solid fa-sun",
            color: "marker-sunset",
            actionId: "tab-spots"
        },
        {
            name: "Museu dos Tubarões 🌝",
            coords: [-3.8322, -32.4005],
            desc: "Mirante incrível para ver o Nascer da Lua Cheia no dia 14/07.",
            icon: "fa-solid fa-moon",
            color: "marker-special",
            actionId: "tab-spots"
        },
        {
            name: "Mirante do Forte do Boldró 🌇",
            coords: [-3.8490, -32.4280],
            desc: "O ponto mais famoso e tradicional da ilha para assistir ao pôr do sol com o Dois Irmãos ao fundo.",
            icon: "fa-solid fa-sun",
            color: "marker-sunset",
            actionId: "tab-spots"
        },
        {
            name: "Capelinha de São Pedro ⛪",
            coords: [-3.8335, -32.4015],
            desc: "Visual espetacular da baía do porto, ponto clássico para contemplar o nascer do sol.",
            icon: "fa-solid fa-church",
            color: "marker-default",
            actionId: "tab-spots"
        },
        {
            name: "Ponta do Air France ⛵",
            coords: [-3.8300, -32.4000],
            desc: "Encontro do mar de dentro e de fora. Ponto clássico do amanhecer.",
            icon: "fa-solid fa-compass",
            color: "marker-default",
            actionId: "tab-spots"
        }
    ];

    // Add markers to map
    mapMarkers.forEach(spot => {
        const icon = createCustomIcon(spot.icon, spot.color);
        const popupContent = `
            <div>
                <h3>${spot.name}</h3>
                <p>${spot.desc}</p>
                <button class="popup-btn" style="width:100%; border:1px solid var(--accent); padding:4px 0; border-radius:6px; cursor:pointer;" onclick="navigateToTab('${spot.actionId}')">Ver Detalhes</button>
            </div>
        `;
        L.marker(spot.coords, { icon: icon }).addTo(mapInstance).bindPopup(popupContent);
    });

    // Drawing Trails (Polylines)
    // 1. Trilha do Sancho (wooden walkways)
    const sanchoTrail = [
        [-3.8546, -32.4431], // Sancho Beach
        [-3.8530, -32.4420], // Sancho Viewpoint
        [-3.8510, -32.4410], // Sancho Access Road
    ];
    L.polyline(sanchoTrail, {
        color: '#e0b07a',
        weight: 3,
        dashArray: '5, 8',
        opacity: 0.8
    }).addTo(mapInstance).bindTooltip("Trilha do Sancho (Fácil)", { sticky: true });

    // 2. Trilha do Piquinho
    const piquinhoTrail = [
        [-3.8415, -32.4124], // Start near Vila
        [-3.8425, -32.4170], // Base of Pico
        [-3.8440, -32.4210], // Morro do Pico/Piquinho Peak
    ];
    L.polyline(piquinhoTrail, {
        color: '#ff6b4a',
        weight: 3.5,
        dashArray: '5, 8',
        opacity: 0.8
    }).addTo(mapInstance).bindTooltip("Trilha do Piquinho (Moderada)", { sticky: true });

    // 3. Trilha Baía dos Porcos (from Cacimba)
    const porcosTrail = [
        [-3.8497, -32.4312], // Cacimba do Padre
        [-3.8501, -32.4325], // Rocks path
        [-3.8504, -32.4339], // Baía dos Porcos
    ];
    L.polyline(porcosTrail, {
        color: '#10b981',
        weight: 3.5,
        dashArray: '3, 6',
        opacity: 0.9
    }).addTo(mapInstance).bindTooltip("Trilha Baía dos Porcos (Pedras - Curta)", { sticky: true });
}

// Global function to switch tabs from popup click
window.navigateToTab = function(tabId) {
    const btn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
    if (btn) {
        btn.click();
    }
};

