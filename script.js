// Cambio scheda tra Forum e Chat
function showTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

// Mostra o nasconde il form di creazione
function toggleForm(id) {
    const box = document.getElementById(id);
    box.classList.toggle('hidden');
}

// Pubblica una nuova discussione nel Forum
function publishThread() {
    const title = document.getElementById('threadTitle').value.trim();
    const content = document.getElementById('threadContent').value.trim();
    const imgFile = document.getElementById('threadImg');
    const list = document.getElementById('forumList');

    if (!title || !content) {
        alert("Per favore, inserisci un titolo e il contenuto del thread.");
        return;
    }

    const row = document.createElement('div');
    row.className = 'forum-row';

    let imgTag = '';
    if (imgFile.files && imgFile.files[0]) {
        const imgUrl = URL.createObjectURL(imgFile.files[0]);
        imgTag = `<br><img src="${imgUrl}" class="preview-img">`;
    }

    row.innerHTML = `
        <div class="forum-icon">📌</div>
        <div class="forum-info">
            <h3 class="forum-title">${sanitize(title)}</h3>
            <p class="forum-desc">${sanitize(content)}</p>
            ${imgTag}
        </div>
    `;

    list.prepend(row);

    // Pulizia form
    document.getElementById('threadTitle').value = '';
    document.getElementById('threadContent').value = '';
    imgFile.value = '';
    toggleForm('forum-create-box');
}

// Invia un messaggio nella Chat Globale
function sendChatMessage() {
    const nick = document.getElementById('chatUser').value.trim() || 'Utente';
    const text = document.getElementById('chatText').value.trim();
    const imgFile = document.getElementById('chatImg');
    const box = document.getElementById('chatMessages');

    if (!text && (!imgFile.files || !imgFile.files[0])) return;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';

    let imgTag = '';
    if (imgFile.files && imgFile.files[0]) {
        const imgUrl = URL.createObjectURL(imgFile.files[0]);
        imgTag = `<br><img src="${imgUrl}" class="preview-img">`;
    }

    bubble.innerHTML = `<strong>${sanitize(nick)}:</strong> ${sanitize(text)} ${imgTag}`;

    box.appendChild(bubble);
    box.scrollTop = box.scrollHeight;

    document.getElementById('chatText').value = '';
    imgFile.value = '';
}

// Sanitizzazione testo
function sanitize(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}
