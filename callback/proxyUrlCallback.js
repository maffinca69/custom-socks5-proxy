export const proxyUrlCallback = (settings) => {
    let proxy = settings.proxy_url ?? null
    if (proxy === null) {
        console.warn('Proxy url is not set!')
    }

    return proxy
}
