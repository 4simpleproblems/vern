importScripts('/uv/uv.bundle.js');
importScripts('/uv.config.js');
importScripts('/baremux/index.js');

// Shared transport state
let transportReady = false;
let transportResolve;
const transportPromise = new Promise(resolve => {
    transportResolve = resolve;
});

const workerPath = "/baremux/worker.js";
const connection = new BareMux.WorkerConnection(workerPath);
const bareClient = new BareMux.BareClient(connection);

importScripts(__uv$config.sw || '/uv/uv.sw.js');

const uv = new UVServiceWorker();
uv.bareClient = bareClient;

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'baremuxinit' && event.data.port) {
        connection.port = event.data.port;
        transportReady = true;
        if (transportResolve) transportResolve();
        console.log("VERN SW: BareMux Port Synced");
    }
});

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

async function handleRequest(event) {
    if (uv.route(event)) {
        if (!transportReady) {
            await Promise.race([
                transportPromise,
                new Promise(r => setTimeout(r, 2000))
            ]);
        }
        return await uv.fetch(event);
    }
    
    return await fetch(event.request);
}

self.addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event));
});
