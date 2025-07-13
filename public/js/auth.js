document.addEventListener('DOMContentLoaded', () => {
  if (window.appState?.token && window.appState?.user) {
    window.location.href = '../views/dashboard.html';
    return;
  }

  const action = new URLSearchParams(window.location.search).get('action') || 'register';
  showAuthForm(action);

  document.querySelectorAll('[data-auth-toggle]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target.closest('[data-auth-toggle]').getAttribute('data-auth-toggle');
      showAuthForm(target);
      history.replaceState(null, '', `?action=${target}`);
    });
  });

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleAuthSubmit(e.target, '/api/register', 'Registro exitoso');
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleAuthSubmit(e.target, '/api/login', 'Bienvenido');
    });
  }
});

function showAuthForm(action) {
  const registerContainer = document.getElementById('register-container');
  const loginContainer = document.getElementById('login-container');

  if (action === 'login') {
    registerContainer?.classList.add('hidden');
    loginContainer?.classList.remove('hidden');
  } else {
    loginContainer?.classList.add('hidden');
    registerContainer?.classList.remove('hidden');
  }
}

async function handleAuthSubmit(form, endpoint, successMessage) {
  const button = form.querySelector('button[type="submit"]');
  const btnText = button.querySelector('.btn-text');
  const spinner = button.querySelector('.fa-spinner');
  const isLogin = endpoint.includes('login');

  btnText.textContent = isLogin ? 'Iniciando sesión...' : 'Registrando...';
  spinner?.classList.remove('hidden');
  button.disabled = true;

  try {
    const data = isLogin
      ? {
          email: form.querySelector('[name="email"]').value,
          password: form.querySelector('[name="password"]').value,
        }
      : {
          name: form.querySelector('[name="name"]').value,
          email: form.querySelector('[name="email"]').value,
          password: form.querySelector('[name="password"]').value,
          formSlug: form.querySelector('[name="formSlug"]').value,
        };

    console.log('Enviando datos a', endpoint, ':', data); // Debug

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Respuesta recibida:', responseData);

    if (responseData.token && responseData.user) {
      window.appState = {
        token: responseData.token,
        user: responseData.user,
      };
      localStorage.setItem('apiContactToken', responseData.token);
      localStorage.setItem('apiContactUser', JSON.stringify(responseData.user));

      showToast('Éxito', `${successMessage}, ${responseData.user.name}`, 'success');
      setTimeout(() => (window.location.href = '../views/dashboard.html'), 1500);
    } else {
      throw new Error(responseData.msg || 'Respuesta inválida del servidor');
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    showToast('Error', error.message || 'Error de conexión con el servidor', 'error');
  } finally {
    btnText.textContent = isLogin ? 'Iniciar sesión' : 'Crear cuenta';
    spinner?.classList.add('hidden');
    button.disabled = false;
  }
}
