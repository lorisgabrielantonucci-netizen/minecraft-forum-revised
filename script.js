// Navigazione a schede (Forums / Chat Globale)
function switchSection(sectionId, btnElement) {
    document.querySelectorAll('.section-content').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));

    document.getElementById(sectionId + 'Section').classList.add('active');
    btnElement.classList.add('active');
}

// Mostra / Nascondi pannello di creazione
function toggleElement(id) {
    const el = document.getElementById(id);
    el.classList.toggle('hidden');
}

// Aggiungi Discussione nel Forum
function addForumThread() {
    const title = document.getElementById('newTitle').value.trim();
    const desc = document.getElementById('newDesc').value.trim();
    const imgInput = document.getElementById('newImg');
    const container = document.getElementById('forumContainer');

    if (!title || !desc) {
        alert("Inserisci sia il titolo che la descrizione.");
        return;
    }

    const article = document.createElement('article');
    article.className = 'forum-card';

    let imageHtml = '';
    if (imgInput.files && imgInput.files[0]) {
        const url = URL.createObjectURL(imgInput.files[0]);
        imageHtml = `<br><img src="${url}" class="attached-img">`;
    }

    article.innerHTML = `
        <div class="forum-icon">📌</div>
        <div class="forum-details">
            <h3>${cleanText(title)}</h3>
            <p>${cleanText(desc)}</p>
            ${imageHtml}
        </div>
    `;

    container.prepend(article);

    document.getElementById('newTitle').value = '';
    document.getElementById('newDesc').value = '';
    imgInput.value = '';
    toggleElement('createForumBox');
}

// Invia Messaggio in Chat Globale
function sendGlobalMessage() {
    const nick = document.getElementById('chatNick').value.trim() || 'Utente';
    const text = document.getElementById('chatText').value.trim();
    const imgInput = document.getElementById('chatImg');
    const box = document.getElementById('chatMessages');

    if (!text && (!imgInput.files || !imgInput.files[0])) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = 'msg';

    let imageHtml = '';
    if (imgInput.files && imgInput.files[0]) {
        const url = URL.createObjectURL(imgInput.files[0]);
        imageHtml = `<br><img src="${url}" class="attached-img">`;
    }

    msgDiv.innerHTML = `<strong>${cleanText(nick)}:</strong> ${cleanText(text)} ${imageHtml}`;

    box.appendChild(msgDiv);
    box.scrollTop = box.scrollHeight;

    document.getElementById('chatText').value = '';
    imgInput.value = '';
}

function cleanText(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}
