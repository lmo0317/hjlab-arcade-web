// Route only the existing public game APIs; GitHub Pages serves static files.
(() => {
  const originalFetch = window.fetch.bind(window);
  window.fetch = function(input, init) {
    const raw = input instanceof Request ? input.url : String(input);
    const url = new URL(raw, location.href);
    if (url.origin === location.origin && /^\/api\/(block-game|block-wukong)\//.test(url.pathname)) {
      const destination = 'https://minohlee.mooo.com' + url.pathname + url.search;
      return originalFetch(input instanceof Request ? new Request(destination, input) : destination, { ...init, credentials: 'omit', mode: 'cors' });
    }
    return originalFetch(input, init);
  };
})();
