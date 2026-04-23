/* ============================================================ */
/* FIREBASE CONFIG — CLUB VIP GLOBALVET MÉXICO                    */
/* ============================================================ */
/*
 * ⚠️ ACCIÓN REQUERIDA DE TEC CAPITAL ANTES DE LANZAR:
 *
 * 1. Crear un proyecto Firebase nuevo para GlobalVet México:
 *    https://console.firebase.google.com → "Agregar proyecto"
 *    Nombre sugerido: club-globalvet
 *
 * 2. Habilitar Authentication (Email/Password) y Firestore Database.
 *
 * 3. Copiar las credenciales del proyecto y reemplazar los valores
 *    de FIREBASE_CONFIG abajo.
 *
 * 4. Desplegar el servidor de webhooks (carpeta railway/) en Railway
 *    y pegar la URL resultante en WEBHOOK_SERVER_URL.
 *
 * 5. En Shopify de GlobalVet, crear los productos de suscripción
 *    (mensual y anual) y pegar los IDs de variante abajo.
 */

const FIREBASE_CONFIG = {
  apiKey: "REEMPLAZAR_CON_API_KEY_DE_FIREBASE",
  authDomain: "club-globalvet.firebaseapp.com",
  projectId: "club-globalvet",
  storageBucket: "club-globalvet.firebasestorage.app",
  messagingSenderId: "REEMPLAZAR",
  appId: "REEMPLAZAR"
};

const WEBHOOK_SERVER_URL = "https://globalvet-webhook-production.up.railway.app";

const VARIANT_MENSUAL = "REEMPLAZAR_ID_VARIANTE_MENSUAL_SHOPIFY";
const VARIANT_ANUAL   = "REEMPLAZAR_ID_VARIANTE_ANUAL_SHOPIFY";

const SHOPIFY_DOMAIN = "globalvetmexico.myshopify.com";
const SHOPIFY_CHECKOUT_URL        = `https://${SHOPIFY_DOMAIN}/cart/${VARIANT_MENSUAL}:1?selling_plan=auto`;
const SHOPIFY_ANNUAL_CHECKOUT_URL = `https://${SHOPIFY_DOMAIN}/cart/${VARIANT_ANUAL}:1?selling_plan=auto`;

function buildCheckoutURL(plan, email) {
  const variantId  = plan === 'anual' ? VARIANT_ANUAL : VARIANT_MENSUAL;
  const emailParam = email ? `&checkout[email]=${encodeURIComponent(email)}` : '';
  return `https://${SHOPIFY_DOMAIN}/cart/${variantId}:1?selling_plan=auto${emailParam}`;
}

if (typeof firebase !== 'undefined') {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
  window.auth = firebase.auth();
  window.db   = firebase.firestore();
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});
}
