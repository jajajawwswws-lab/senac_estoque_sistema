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
document.getElementById('btn-alterar-senha')?.addEventListener('click', () => {
    const senhaAtual = prompt('Digite sua senha atual:');
    const senhaCorreta = 'senha123'; // Exemplo
    
    if(senhaAtual === senhaCorreta){
        const novaSenha = prompt('Digite sua nova senha (mínimo 8 caracteres):');
        if(novaSenha && novaSenha.length >= 8){
            showNotification('Senha alterada com sucesso!', 'success');
        } else {
            showNotification('Senha inválida! Min. 8 caracteres.', 'error');
        }
    } else {
        showNotification('Senha incorreta!', 'error');
    }
});

// Notification function
function showNotification(message, type='info'){
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
        type==='success' ? 'bg-green-100 text-green-800 border border-green-200' :
        type==='error' ? 'bg-red-100 text-red-800 border border-red-200' :
        'bg-blue-100 text-blue-800 border border-blue-200'
    }`;
    notification.innerHTML = `<div class="flex items-center">
        <i class="fas ${
            type==='success' ? 'fa-check-circle' :
            type==='error' ? 'fa-exclamation-circle' : 'fa-info-circle'
        } mr-3"></i><span>${message}</span>
    </div>`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('translate-x-0');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('translate-x-0');
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
