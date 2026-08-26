// Cambio Sezioni (Tab)
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const targetTab = document.getElementById('tab-' + tabId);
    if(targetTab) targetTab.classList.add('active');

    // Evidenzia il pulsante del menu cliccato
    const activeBtn = Array.from(document.querySelectorAll('.nav-btn')).find(b => b.getAttribute('onclick').includes(tabId));
    if(activeBtn) activeBtn.classList.add('active');
}

// Commenti per gli Articoli Admin
function addArticleComment(e, articleId) {
    e.preventDefault();
    const form = e.target;
    const author = form.querySelector('.c-author').value;
    const text = form.querySelector('.c-text').value;
    const container = document.getElementById('comments-' + articleId);

    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment-item';
    commentDiv.innerHTML = `<strong>${escapeHTML(author)}:</strong> ${escapeHTML(text)}`;

    container.appendChild(commentDiv);
    form.reset();
}

// Gestione FORUM (Thread Creati dagli Utenti)
document.addEventListener("DOMContentLoaded", function() {
    const forumForm = document.getElementById('forum-form');
    const threadsList = document.getElementById('forum-threads-list');

    loadThreads();

    if(forumForm) {
        forumForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const user = document.getElementById('forum-user').value;
            const title = document.getElementById('forum-title').value;
            const msg = document.getElementById('forum-msg').value;

            const newThread = {
                id: Date.now(),
                user: user,
                title: title,
                msg: msg,
                date: new Date().toLocaleDateString("it-IT"),
                replies: []
            };

            let threads = JSON.parse(localStorage.getItem('mc_threads_revised')) || [];
            threads.unshift(newThread);
            localStorage.setItem('mc_threads_revised', JSON.stringify(threads));

            loadThreads();
            forumForm.reset();
        });
    }

    function loadThreads() {
        let threads = JSON.parse(localStorage.getItem('mc_threads_revised')) || [];
        threadsList.innerHTML = '';

        if(threads.length === 0) {
            threadsList.innerHTML = '<p style="color:#777;">Nessun thread creato nel forum. Creane uno tu!</p>';
            return;
        }

        threads.forEach(t => {
            const card = document.createElement('div');
            card.className = 'forum-thread-card';
            
            let repliesHTML = '';
            t.replies.forEach(r => {
                repliesHTML += `<div class="comment-item"><strong>${escapeHTML(r.user)}:</strong> ${escapeHTML(r.msg)}</div>`;
            });

            card.innerHTML = `
                <h4 style="margin:0 0 5px 0;">${escapeHTML(t.title)}</h4>
                <p style="margin:0 0 8px 0; color:#444;">${escapeHTML(t.msg)}</p>
                <div style="font-size:10px; color:#777;">Inviato da <b>${escapeHTML(t.user)}</b> il ${t.date}</div>
                
                <div class="comment-section">
                    <h5>Risposte (${t.replies.length})</h5>
                    <div class="comments-list">${repliesHTML}</div>
                    <form onsubmit="addThreadReply(event, ${t.id})" class="mini-comment-form">
                        <input type="text" placeholder="Nome" class="c-author" required>
                        <input type="text" placeholder="Rispondi al thread..." class="c-text" required>
                        <button type="submit">Invia</button>
                    </form>
                </div>
            `;
            threadsList.appendChild(card);
        });
    }

    // Gestione CHAT GLOBALE
    const chatForm = document.getElementById('chat-form');
    const chatList = document.getElementById('chat-messages-list');

    if(chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const user = document.getElementById('chat-user').value;
            const msg = document.getElementById('chat-msg').value;

            const item = document.createElement('div');
            item.className = 'chat-msg-item';
            item.innerHTML = `<span style="color:#2a5d1b; font-weight:bold;">${escapeHTML(user)}:</span> ${escapeHTML(msg)}`;
            
            chatList.appendChild(item);
            chatForm.querySelector('#chat-msg').value = '';
            chatList.scrollTop = chatList.scrollHeight;
        });
    }
});

// Aggiungi risposta a un thread
function addThreadReply(e, threadId) {
    e.preventDefault();
    const form = e.target;
    const author = form.querySelector('.c-author').value;
    const text = form.querySelector('.c-text').value;

    let threads = JSON.parse(localStorage.getItem('mc_threads_revised')) || [];
    let target = threads.find(t => t.id === threadId);

    if(target) {
        target.replies.push({ user: author, msg: text });
        localStorage.setItem('mc_threads_revised', JSON.stringify(threads));
        location.reload();
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}