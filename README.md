# GlobalVet México — Sitio Web + Club VIP

Sitio estático listo para GitHub Pages, con Club VIP completo (autenticación, suscripciones, cursos, videos, PDFs, certificados, foro, etc.).

## Estructura

- `index.html` — inicio del sitio público
- `pages/` — páginas internas (público + Club VIP)
  - Públicas: `nosotros.html`, `servicios.html`, `cursos.html`, `galeria.html`, `testimonios.html`, `contacto.html`
  - Club VIP: `club-login.html`, `club-registro.html`, `club-dashboard.html`, `club-biblioteca.html`, `club-videos.html`, `club-pdfs.html`, `club-certificados.html`, `club-foro.html`, `club-logros.html`, `club-noticias.html`, `club-perfil.html`, `club-referidos.html`, `club-sesiones.html`, `club-suscripcion.html`
  - Admin: `admin.html`, `admin-club.html`
- `css/` — estilos del sitio público
- `assets/css/` — estilos del Club VIP
- `assets/js/` — lógica del Club (`club.js`, `admin.js`, `firebase-config.js`)
- `assets/img/` — imágenes organizadas por sección
- `railway/` — servidor de webhooks para Shopify (desplegar aparte en Railway)

## 🔑 Sistema de desbloqueo de contenido

Cada usuario desbloquea **1 curso/video/PDF nuevo cada 8 días**, contados desde
**su propia fecha de compra** (no desde una fecha global del sitio).

**Ejemplo:**
- Usuario A compra el 23 abril → curso 1 ya, curso 2 el 1 may, curso 3 el 9 may
- Usuario B compra el 25 mayo → curso 1 ya, curso 2 el 2 jun

El orden es por fecha de creación del contenido en Firebase (lo más antiguo se
desbloquea primero). El admin no tiene que configurar nada extra por curso.

Lógica en `assets/js/club.js` → `GLOBALVET_CLUB.getUnlockStatus(index, session)`.
Para cambiar el intervalo, editar `DAYS_PER_UNLOCK` en ese archivo.

## ⚠️ Configuración antes de lanzar

Ver instrucciones completas en `assets/js/firebase-config.js`. Pasos:

1. Crear proyecto Firebase `club-globalvet` (Auth email/password + Firestore).
2. Pegar credenciales en `firebase-config.js`.
3. Desplegar `railway/server.js` en Railway y pegar la URL.
4. Crear productos de suscripción en Shopify GlobalVet y pegar los IDs de variante.

## Publicación en GitHub Pages

1. Crear repositorio y subir el contenido de esta carpeta.
2. Settings → Pages → activar desde la rama principal.
3. El archivo `CNAME` ya apunta a `www.globalvetmexico.com`.
