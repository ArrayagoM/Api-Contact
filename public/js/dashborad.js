document.addEventListener('DOMContentLoaded', () => {
  const testForm = document.getElementById('test-form');
  if (testForm) {
    testForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = testForm.querySelector('button[type="submit"]');
      const txt = btn.querySelector('.btn-text');
      const spn = btn.querySelector('.fa-spinner');
      txt.textContent = 'Enviando...';
      spn.classList.remove('hidden');
      btn.disabled = true;

      try {
        const payload = {};
        new FormData(testForm).forEach((v, k) => (payload[k] = v));

        const resp = await fetch(`/form/${window.appState.user.formSlug}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (resp.ok) {
          showToast('Éxito', 'Mensaje de prueba enviado correctamente', 'success');
          testForm.reset();
        } else {
          const err = await resp.json();
          showToast('Error', err.msg || 'Error al enviar el mensaje', 'error');
        }
      } catch (error) {
        showToast('Error', 'Error de conexión', 'error');
      } finally {
        txt.textContent = 'Enviar mensaje de prueba';
        spn.classList.add('hidden');
        btn.disabled = false;
      }
    });
  }
});
