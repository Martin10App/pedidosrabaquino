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

// Al tocar un aviso de Windows, enfocar el portal ya abierto o abrirlo. La
// pantalla usa el hash para llevar al usuario al primer pedido pendiente.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const abierto = clients.find((client) => 'focus' in client);
      if (abierto) {
        abierto.postMessage({ type: 'IR_A_PENDIENTES' });
        return abierto.focus();
      }
      return self.clients.openWindow('./#pendientes');
    })
  );
});
