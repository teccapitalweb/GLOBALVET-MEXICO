/* ═══════════════════════════════════════════════════════════════════════
   GLOBALVET MÉXICO — Club Extra JS
   Auth, sidebar compartido, helpers de drip content.
   Firebase proyecto: globalvet-club (mismo que usa club-dashboard.html)
   ═══════════════════════════════════════════════════════════════════════ */

import { initializeApp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, addDoc, query, orderBy, getDocs, serverTimestamp, where }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const cfg = {
  apiKey:"AIzaSyB_OgAmyW7XNiLUyKp6Ih92A5qxm3LNCqg",
  authDomain:"globalvet-club.firebaseapp.com",
  projectId:"globalvet-club",
  storageBucket:"globalvet-club.firebasestorage.app",
  messagingSenderId:"880780506385",
  appId:"1:880780506385:web:be49dbc8886147a79048b0"
};

const app  = initializeApp(cfg);
const auth = getAuth(app);
const db   = getFirestore(app);

// ═══ CONSTANTES DE DRIP CONTENT ═══
// 1 contenido nuevo cada 8 días desde la fecha de compra individual de cada usuario
export const DRIP_DIAS_POR_CURSO = 8;

// ═══ AUTH WRAPPER ═══
// Garantiza que el usuario esté logueado y devuelve su perfil de Firestore
export function requireAuth(redirectTo = 'club-login.html') {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = redirectTo;
        return resolve(null);
      }
      try {
        const snap = await getDoc(doc(db, 'miembros', user.uid));
        const pd = snap.exists() ? snap.data() : {};
        resolve({
          uid: user.uid,
          email: user.email,
          name: pd.nombre || user.displayName || user.email.split('@')[0],
          pd,  // Perfil completo de Firestore
          role: pd.role || 'member',
          planActivo: pd.planActivo || false,
          fechaRegistro: pd.fechaRegistro || null
        });
      } catch (err) {
        console.error('Error cargando perfil:', err);
        resolve({ uid: user.uid, email: user.email, name: user.email.split('@')[0], pd:{}, role:'member' });
      }
    });
  });
}

// ═══ DRIP CONTENT: desbloqueo personalizado por fecha de compra ═══
/**
 * Calcula cuántos días han pasado desde que ESTE usuario se registró/compró.
 * Usa pd.fechaRegistro (Firestore timestamp) como fuente de verdad.
 */
export function getDiasDesdeRegistro(session) {
  if (session?.pd?.fechaRegistro?.toDate) {
    const inicio = session.pd.fechaRegistro.toDate();
    return Math.floor((Date.now() - inicio.getTime()) / 86400000);
  }
  return 0;
}

/**
 * Determina si un contenido (curso, video, pdf) está desbloqueado para ESTE usuario.
 * @param {number} index - posición del contenido en la lista ordenada (0 = primero)
 * @param {Object} session - sesión del usuario (requireAuth)
 * @returns {{ unlocked:boolean, unlockDate:Date|null, daysLeft:number }}
 */
export function getUnlockStatus(index, session) {
  if (!session?.pd?.fechaRegistro?.toDate) {
    return { unlocked: true, unlockDate: null, daysLeft: 0 };  // Sin fecha registro: desbloquear todo
  }
  const inicio = session.pd.fechaRegistro.toDate();
  const unlockDate = new Date(inicio.getTime() + index * DRIP_DIAS_POR_CURSO * 86400000);
  const now = new Date();
  const unlocked = now >= unlockDate;
  const daysLeft = unlocked ? 0 : Math.ceil((unlockDate - now) / 86400000);
  return { unlocked, unlockDate, daysLeft };
}

export function formatUnlockDate(date) {
  if (!date) return '';
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return `${date.getDate()} ${meses[date.getMonth()]} ${date.getFullYear()}`;
}

// ═══ SIDEBAR COMPARTIDO ═══
// Se renderiza en todas las páginas del club con el item activo marcado
export function renderSidebar(activeKey = '') {
  const items = [
    { key:'dashboard',  label:'Inicio',          href:'club-dashboard.html',   icon:'🏠' },
    { key:'biblioteca', label:'Biblioteca',      href:'club-dashboard.html#biblioteca', icon:'📚' },
    { key:'videos',     label:'Videos',          href:'club-videos.html',      icon:'🎥' },
    { key:'pdfs',       label:'PDFs',            href:'club-dashboard.html#pdfs',       icon:'📄' },
    { key:'sesiones',   label:'Sesiones en vivo', href:'club-dashboard.html#sesiones',  icon:'🔴' },
    { key:'certificados', label:'Certificados',  href:'club-certificados.html', icon:'🏆' },
    { key:'logros',     label:'Logros',          href:'club-logros.html',      icon:'⭐' },
    { key:'noticias',   label:'Noticias',        href:'club-noticias.html',    icon:'📰' },
    { key:'foro',       label:'Foro',            href:'club-foro.html',        icon:'💬' },
    { key:'referidos',  label:'Referidos',       href:'club-referidos.html',   icon:'🎁' },
    { key:'perfil',     label:'Perfil',          href:'club-dashboard.html#perfil',     icon:'👤' }
  ];
  return `
    <div class="slabel">Club VIP</div>
    ${items.map(it => `
      <a href="${it.href}" class="nbtn ${it.key === activeKey ? 'active' : ''}">
        <span style="font-size:1rem;line-height:1;">${it.icon}</span>
        <span>${it.label}</span>
      </a>
    `).join('')}
    <div style="margin-top:auto;padding-top:1rem;border-top:1px solid var(--line);">
      <a href="../index.html" class="nbtn" style="color:var(--muted);font-size:.78rem;">← Volver al sitio</a>
    </div>
  `;
}

// ═══ TOP NAV COMPARTIDO ═══
export function renderTopNav(session) {
  const nom = session?.name || 'Usuario';
  return `
    <div class="tnav-l">
      <a href="club-dashboard.html" class="tnav-logo">
        <img src="../assets/logo/globalvet-logo.jpg" alt="GlobalVet">
        <span>Club GlobalVet</span>
      </a>
      <span class="tnav-badge">VIP</span>
    </div>
    <div class="tnav-r">
      <a href="club-dashboard.html" class="tnav-back">← Mi área</a>
      <span style="color:rgba(255,255,255,.55);font-size:.82rem;">${nom}</span>
      <button class="tnav-back" id="btnLogout" style="cursor:pointer;background:none;border:none;">Salir</button>
    </div>
  `;
}

// ═══ LOGOUT ═══
export async function doLogout() {
  try {
    await signOut(auth);
    window.location.href = 'club-login.html';
  } catch (err) { console.error(err); }
}

// ═══ TOAST ═══
export function toast(msg, isError = false) {
  let el = document.getElementById('gvToast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'gvToast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.background = isError ? 'var(--red)' : 'var(--dark)';
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

// Exportar Firebase handles para que las páginas los usen
export { auth, db, doc, getDoc, setDoc, updateDoc, collection, addDoc, query, orderBy, getDocs, serverTimestamp, where };
