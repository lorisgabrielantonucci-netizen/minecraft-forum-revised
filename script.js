// Database locale per memorizzare Forum e Commenti
let threads = [
    {
        id: 1,
        icon: "💬",
        title: "Discussioni Generali",
        content: "Benvenuti nel forum ufficiale! In questo spazio si discute di tutte le novità e notizie su Minecraft.",
        img: null,
        comments: [
            { user: "Steve", text: "Bellissimo questo nuovo forum!", img: null }
        ]
    },
    {
        id: 2,
        icon: "🎮",
        title: "Server & Multiplayer",
        content: "Condividi il tuo server Minecraft o cerca nuovi compagni per giocare insieme.",
        img: null,
        comments: []
    }
];

let activeThreadId = null;

// Avvio
document.addEventListener("DOMContentLoaded", () => {
    renderThreads();
});

// Cambia Tab
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');

    if (tabId === 'forum-tab') document.getElementById('btn-forum').classList.add('active');
    if (tabId === 'chat-tab') document.getElementById('btn-chat').classList.add('active');
}

function toggleForm(id) {
    document.getElementById(id).classList.toggle('hidden');
}

// Renderizza lista thread
function renderThreads() {
    const list = document.getElementById('forumList');
    list.innerHTML = '';

    threads.forEach(t => {
        const row = document.createElement('div');
        row.className = 'forum-row';
        row.onclick = () => openThread(t.id);

        row.innerHTML = `
            <div class="forum-icon">${t.icon}</div>
            <div class="forum-info">
                <h3 class="forum-title">${sanitize(t.title)}</h3>
                <p class="forum-desc">${sanitize(t.content.substring(0, 100))}...</p>
                <div class="comment-badge">💬 ${t.comments.length} Commenti</div>
            </div>
        `;
        list.appendChild(row);
    });
}

// Apri Thread Dettagliato
function openThread(id) {
    activeThreadId = id;
    const t = threads.find(item => item.id === id);
    if (!t) return;

    document.getElementById('detailTitle').innerText = t.title;
    document.getElementById('detailBody').innerText = t.content;
    
    const imgBox = document.getElementById('detailImgBox');
    imgBox.innerHTML = t.img ? `<img src="${t.img}" class="preview-img">` : '';

    renderComments();
    showTab('thread-detail-tab');
}

// Renderizza Commenti del Thread Attivo
function renderComments() {
    const t = threads.find(item => item.id === activeThreadId);
    const box = document.getElementById('commentsList');
    document.getElementById('commentCount').innerText = t.comments.length;
    box.innerHTML = '';

    if (t.comments.length === 0) {
        box.innerHTML = '<p style="color:#666; font-style:italic;">Nessun commento presente. Sii il primo a commentare!</p>';
        return;
    }

    t.comments.forEach(c => {
        const card = document.createElement('div');
        card.className = 'comment-card';

        let imgHtml = c.img ? `<br><img src="${c.img}" class="preview-img">` : '';

        card.innerHTML = `
            <strong>${sanitize(c.user)}</strong>
            <p>${sanitize(c.text)}</p>
            ${imgHtml}
        `;
        box.appendChild(card);
    });
}

// Aggiungi un Commento
function addComment() {
    const user = document.getElementById('commentUser').value.trim() || 'Anonimo';
    const text = document.getElementById('commentText').value.trim();
    const imgInput = document.getElementById('commentImg');

    if (!text && (!imgInput.files || !imgInput.files[0])) return;

    const t = threads.find(item => item.id === activeThreadId);

    let imgUrl = null;
    if (imgInput.files && imgInput.files[0]) {
        imgUrl = URL.createObjectURL(imgInput.files[0]);
    }

    t.comments.push({ user, text, img: imgUrl });

    document.getElementById('commentText').value = '';
    imgInput.value = '';

    renderComments();
    renderThreads();
}

// Pubblica un nuovo Thread
function publishThread() {
    const title = document.getElementById('threadTitle').value.trim();
    const content = document.getElementById('threadContent').value.trim();
    const imgInput = document.getElementById('threadImg');

    if (!title || !content) {
        alert("Inserisci titolo e contenuto!");
        return;
    }

    let imgUrl = null;
    if (imgInput.files && imgInput.files[0]) {
        imgUrl = URL.createObjectURL(imgInput.files[0]);
    }

    const newThread = {
        id: Date.now(),
        icon: "📌",
        title: title,
        content: content,
        img: imgUrl,
        comments: []
    };

    threads.unshift(newThread);

    document.getElementById('threadTitle').value = '';
    document.getElementById('threadContent').value = '';
    imgInput.value = '';
    toggleForm('forum-create-box');

    renderThreads();
}

// Invio Messaggi Chat Globale
function sendChatMessage() {
    const user = document.getElementById('chatUser').value.trim() || 'Utente';
    const text = document.getElementById('chatText').value.trim();
    const imgInput = document.getElementById('chatImg');
    const box = document.getElementById('chatMessages');

    if (!text && (!imgInput.files || !imgInput.files[0])) return;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';

    let imgHtml = '';
    if (imgInput.files && imgInput.files[0]) {
        const url = URL.createObjectURL(imgInput.files[0]);
        imgHtml = `<br><img src="${url}" class="preview-img">`;
    }

    bubble.innerHTML = `<strong>${sanitize(user)}:</strong> ${sanitize(text)} ${imgHtml}`;

    box.appendChild(bubble);
    box.scrollTop = box.scrollHeight;

    document.getElementById('chatText').value = '';
    imgInput.value = '';
}

function sanitize(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}
