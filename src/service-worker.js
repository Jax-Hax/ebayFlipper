/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));
let CACHE_NAME = "cache-" + Date.now();

sw.addEventListener("push", (event) => {
  // Double check the push event
    event.waitUntil(
      sw.registration.showNotification("Notification", {
        body: event.data?.text(),
      })
    );
});