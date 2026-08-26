// Navigazione tra schede (Forum / Chat)
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    if (tabName === 'forum') {
        document.getElementById('forumTab').classList.add('active');
        event.target.classList.add('active');
    } else {
        document.getElementById('chatTab').classList.add('active');
        event.target.classList.add('active');
    }
}

// Mostra/Nascondi form creazione forum
function toggleForm(id) {
    const form = document.getElementById(id);
    form.classList.toggle('hidden');
}

// Creazione dinamica di un Forum con Immagine
function createForum() {
    const title = document.getElementById('forumTitle').value.trim();
    const desc = document.getElementById('forumDesc').value.trim();
    const imgInput = document.getElementById('forumImage');
    const forumList = document.getElementById('forumList');

    if (!title || !desc) {
        alert("Inserisci titolo e descrizione!");
        return;
    }

    const card = document.createElement('div');
    card.classList.add('forum-card');

    let imgHtml = '';
    if (imgInput.files && imgInput.files[0]) {
        const imgUrl = URL.createObjectURL(imgInput.files[0]);
        imgHtml = `<br><img src="${imgUrl}" class="forum-img">`;
    }

    card.innerHTML = `
        <div class="forum-info">
            <h3>💬 ${escapeHtml(title)}</h3>
            <p>${escapeHtml(desc)}</p>
            ${imgHtml}
        </div>
    `;

    forumList.prepend(card);

    // Reset input
    document.getElementById('forumTitle').value = '';
    document.getElementById('forumDesc').value = '';
    imgInput.value = '';
    toggleForm('newForumForm');
}

// Invio messaggi Chat Globale con Immagine
function sendChatMessage() {
    const user = document.getElementById('chatUser').value.trim() || "Anonimo";
    const msg = document.getElementById('chatMsg').value.trim();
    const imgInput = document.getElementById('chatImage');
    const chatBox = document.getElementById('chatBox');

    if (!msg && (!imgInput.files || !imgInput.files[0])) return;

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-msg');

    let imgHtml = '';
    if (imgInput.files && imgInput.files[0]) {
        const imgUrl = URL.createObjectURL(imgInput.files[0]);
        imgHtml = `<br><img src="${imgUrl}" class="chat-img">`;
    }

    msgDiv.innerHTML = `<strong>${escapeHtml(user)}:</strong> ${escapeHtml(msg)} ${imgHtml}`;

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Reset campi
    document.getElementById('chatMsg').value = '';
    imgInput.value = '';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}
