document.getElementById('chatForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usernameInput = document.getElementById('usernameInput');
    const messageInput = document.getElementById('messageInput');
    const chatBox = document.getElementById('chatBox');
    
    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();
    
    if(username !== "" && message !== "") {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg');
        msgDiv.innerHTML = `<strong>${escapeHtml(username)}:</strong> ${escapeHtml(message)}`;
        
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        
        messageInput.value = '';
    }
});

// Funzione di sicurezza per evitare problemi con caratteri speciali
function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}
