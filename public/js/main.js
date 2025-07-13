window.appState = {
  token: localStorage.getItem('apiContactToken'),
  user: JSON.parse(localStorage.getItem('apiContactUser')),
};

async function loadComponent(componentName) {
  const containers = document.querySelectorAll(`[data-component="${componentName}"]`);
  if (!containers.length) return;
  const res = await fetch(`/components/${componentName}.html`);
  if (!res.ok) throw new Error(`${componentName}.html no encontrado`);
  const html = await res.text();
  containers.forEach((el) => (el.innerHTML = html));
}

function initNavbar() {
  const btn = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-links');
  btn?.addEventListener('click', () => menu.classList.toggle('active'));
}

function updateAuthUI() {
  const authB = document.getElementById('auth-buttons');
  const userM = document.getElementById('user-menu');
  const greeting = document.getElementById('user-greeting');
  if (window.appState.token && window.appState.user) {
    authB?.classList.add('hidden');
    userM?.classList.remove('hidden');
    greeting.textContent = `Hola, ${window.appState.user.name}`;
  } else {
    authB?.classList.remove('hidden');
    userM?.classList.add('hidden');
  }
}

function logout() {
  localStorage.removeItem('apiContactToken');
  localStorage.removeItem('apiContactUser');
  window.appState.token = null;
  window.appState.user = null;
  updateAuthUI();
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadComponent('navbar');
    await loadComponent('footer');

    initNavbar();
    updateAuthUI();

    document.getElementById('logout-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
      window.location.href = '/';
    });
  } catch (err) {
    console.error(err);
  }
});

function showToast(title, message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return console.warn('No existe #toast-container');

  const toast = document.createElement('div');
  toast.classList.add('toast', `toast--${type}`);

  toast.innerHTML = `
    <strong>${title}</strong>
    <p>${message}</p>
    <span class="toast-close">&times;</span>
  `;

  toast.querySelector('.toast-close').addEventListener('click', () => container.removeChild(toast));

  container.appendChild(toast);
  setTimeout(() => {
    if (container.contains(toast)) container.removeChild(toast);
  }, duration);
}
// ---------------------------------------------
