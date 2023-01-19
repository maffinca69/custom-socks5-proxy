/**
 * Return PAC Script data.
 *
 * FORKED FROM https://github.com/roskomsvoboda/censortracker/blob/31a72b91099640a773f75e3d665b144f88ead1ac/src/shared/js/background/pac.js
 *
 * @param domains {Array<string>} - List of domains to proxy.
 * @param proxyServerURI {string} - URI of the proxy server.
 * @returns {string} PAC script
 */
export const getPacScript = (domains = [], proxyServerURI) => {
    return `
      function FindProxyForURL(url, host) {
        function isHostBlocked(array, target) {
          let left = 0;
          let right = array.length - 1;
          while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);
            if (array[mid] === target) {
              return true;
            }
            if (array[mid] < target) {
              left = mid + 1;
            } else {
              right = mid - 1;
            }
          }
          return false;
        }
        // Remove ending dot
        if (host.endsWith('.')) {
          host = host.substring(0, host.length - 1);
        }
        // Make domain second-level.
        let lastDot = host.lastIndexOf('.');
        if (lastDot !== -1) {
          lastDot = host.lastIndexOf('.', lastDot - 1);
          if (lastDot !== -1) {
            host = host.substr(lastDot + 1);
          }
        }
        // Domains, which are blocked.
        let domains = ${JSON.stringify(domains)};
        
        // Proxy *.onion and *.i2p domains.
        // if (shExpMatch(host, '*.onion') || shExpMatch(host, '*.i2p')) {
        //   return 'SOCKS5 ${proxyServerURI};';
        // }

        // Return result
        if (isHostBlocked(domains, host)) {
          return 'SOCKS5 ${proxyServerURI};';
        } else {
          return 'DIRECT';
        }
      }`
}
