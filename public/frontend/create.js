// create.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ create.js - VERSÃO OFICIAL COM BACKEND + reCAPTCHA');

    const form = document.getElementById('registrationForm');

    async function handleSubmit(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;
        const phone = document.getElementById('phone').value;

        try {
            // Executa o reCAPTCHA v3
            const token = await grecaptcha.execute('6LdIoX4sAAAAAM9K2uFgBvMYT9PkpImGbgVvmcCB', { action: 'register' });

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username, phone, recaptchaToken: token })
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ Conta criada com sucesso!');
                window.location.href = 'index.html';
            } else {
                alert('❌ Erro: ' + (data.error || 'Desconhecido'));
            }
        } catch (error) {
            console.error(error);
            alert('❌ Erro de conexão ou reCAPTCHA');
        }
    }

    if (form) form.addEventListener('submit', handleSubmit);
});
