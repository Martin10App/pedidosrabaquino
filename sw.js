/* Service worker del portal de pedidos.
 *
 * Está solo para que el navegador permita instalar el portal como aplicación.
 * A propósito NO cachea nada: el portal muestra pedidos y stock, y servir una
 * copia vieja sería peor que avisar que no hay conexión.
 */

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  // Se deja pasar todo a la red, sin tocar nada. El handler existe porque
  // algunos navegadores lo piden para considerar la página instalable.
  event.respondWith(fetch(event.request));
});
