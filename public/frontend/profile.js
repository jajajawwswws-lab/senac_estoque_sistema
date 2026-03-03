// Toggle sidebar
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('collapsed');
}

// Avatar upload
document.querySelector('.edit-avatar-btn')?.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = e => {
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = event => {
                document.querySelector('.profile-avatar img').src = event.target.result;
                showNotification('Foto de perfil atualizada com sucesso!', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
});

// Edit username
document.getElementById('btn-edit-username')?.addEventListener('click', () => {
    const username = prompt('Digite seu novo nome de usuário:');
    if(username && username.trim().length >= 3){
        document.querySelector('h2.text-2xl').textContent = username.trim();
        showNotification('Nome de usuário atualizado com sucesso!', 'success');
    } else {
        showNotification('Nome de usuário inválido. Min. 3 caracteres.', 'error');
    }
});

// Toggle switches
document.querySelectorAll('.switch input').forEach(input => {
    input.addEventListener('change', () => {
        const settingName = input.closest('.flex').querySelector('.font-medium').textContent;
        const isEnabled = input.checked;
        showNotification(`${settingName} ${isEnabled ? 'ativado' : 'desativado'}`, 'info');
    });
});

// Alterar senha
function alterar_senha() {
    const senha = prompt("Digite sua senha atual: ");
    const senha_correta = 'senha123'; // Exemplo de senha correta

    if(senha === senha_correta) {
        const nova_senha = prompt("Digite sua nova senha: ");
        if(nova_senha && nova_senha.length >= 8) {
            alert("Senha válida! Sua senha foi alterada.");
            showNotification('Senha alterada com sucesso!', 'success');
        } else {
            alert("Sua senha não preenche os 8 caracteres requisitados.");
            showNotification('Senha inválida! Min. 8 caracteres.', 'error');
        }
    } else {
        alert("Senha incorreta!");
        showNotification('Senha incorreta!', 'error');
    }
}

//
