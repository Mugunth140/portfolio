/** @type {import('next').NextConfig} */
// Dev-only localStorage shim to prevent dev/SSR errors when the runtime
// exposes a malformed or missing `localStorage` (e.g. some dev runtimes).
// This runs early because Next loads `next.config.*` before other internals.
if (process.env.NODE_ENV !== 'production') {
  try {
    const cur = globalThis.localStorage;
    const needsPatch = !cur || typeof cur.getItem !== 'function' || typeof cur.setItem !== 'function';

    if (needsPatch) {
      const _store = new Map();

      globalThis.localStorage = {
        getItem(key) {
          const v = _store.get(String(key));
          return v === undefined ? null : v;
        },
        setItem(key, value) {
          _store.set(String(key), String(value));
        },
        removeItem(key) {
          _store.delete(String(key));
        },
        clear() {
          _store.clear();
        },
        key(i) {
          return Array.from(_store.keys())[i] ?? null;
        },
        get length() {
          return _store.size;
        },
      };

      // eslint-disable-next-line no-console
      // patched globalThis.localStorage for dev (silenced log)
      // console.warn('[next.config] patched globalThis.localStorage for dev');
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    // localStorage shim failed (silenced warning):
    // console.warn('[next.config] localStorage shim failed:', e && e.message);
  }
}

const nextConfig = {
  output: 'standalone',
  // Reduce memory usage in production
  experimental: {
    // Optimize memory usage for smaller VMs
    workerThreads: false,
    cpus: 1,
  },
  // Compress images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
