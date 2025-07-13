
# 📬 ApiContact

ApiContact es una API RESTful que permite a cualquier usuario recibir los datos de un formulario de contacto en su email, sin importar dónde esté alojada su landing page. Ideal para páginas estáticas, desarrollos sin backend propio o soluciones simples y rápidas.

---

## 🚀 Características

- ✅ Registro de usuarios con endpoint único por cuenta.
- ✉️ Recibe formularios de cualquier sitio web y envía los datos al email del usuario.
- 🔐 Seguridad mediante JWT y validaciones de dominio (opcional).
- 📊 (Opcional) Guardado de datos en base de datos para estadísticas o historial.
- ⚙️ Fácil integración en cualquier HTML o generador de landing pages.

---

## 📦 Tecnologías usadas

- Node.js + Express
- MongoDB + Mongoose
- Nodemailer
- JWT (autenticación)
- dotenv (variables de entorno)
- CORS y Helmet (seguridad)

---

## 🧠 ¿Cómo funciona?

### 1. Registrate

Usá el endpoint `/api/register` y obtené tu `formSlug`.

```json
{
  "name": "Juan",
  "email": "juan@example.com",
  "password": "tucontraseña",
  "formSlug": "juanfernet123"
}
````

---

### 2. Usá tu formulario desde cualquier sitio:

```html
<form action="https://api.tudominio.com/form/juanfernet123" method="POST">
  <input type="text" name="nombre" />
  <input type="email" name="email" />
  <textarea name="mensaje"></textarea>
  <button type="submit">Enviar</button>
</form>
```

---

### 3. ¡Listo!

Cada vez que alguien complete el formulario, los datos llegarán directo a tu correo registrado.

---

## 📂 Endpoints principales

| Método | Ruta              | Descripción                                  |
| ------ | ----------------- | -------------------------------------------- |
| POST   | `/api/register`   | Crea una cuenta y slug personalizado         |
| POST   | `/form/:formSlug` | Recibe datos del formulario y envía el email |
| GET    | `/api/user/info`  | Retorna info del usuario (token necesario)   |

---

## ⚠️ Seguridad y buenas prácticas

* Usá HTTPS siempre en producción.
* No pongas tu `formSlug` en lugares públicos.
* Podés implementar verificación de dominio si querés limitar desde dónde se puede usar el endpoint.

---

## 📩 Ejemplo de email recibido

```
Nuevo mensaje desde tu formulario:

Nombre: Lionel Messi
Email: leo@goat.com
Mensaje: Quiero pedirte un Fernet.
```

---

## 🛠 Instalación para desarrollo

```bash
git clone https://github.com/tuusuario/ApiContact.git
cd ApiContact
npm install
npm run dev
```

---

## 🌱 Variables de entorno `.env`

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/apicontact
JWT_SECRET=tu_clave_secreta
MAIL_USER=tuemail@gmail.com
MAIL_PASS=tu_contraseña_o_token_app
BASE_URL=https://api.tudominio.com
```

---

## 📬 Roadmap (próximas features)

* Panel web de administración para usuarios
* Estadísticas de formularios recibidos
* Logs y backups automáticos
* Webhooks personalizados
* Planes gratuitos/pagos

---

## 🧑‍💻 Autor

**Juan Martín Arrayago**
Desarrollador fullstack y maker de soluciones creativas.
[Instagram](https://instagram.com/juanmartinarrayago) | [LinkedIn](#)

---

## 🪪 Licencia

Este proyecto está bajo licencia MIT. Podés usarlo, modificarlo o adaptarlo libremente.

---
// trigger deploy
