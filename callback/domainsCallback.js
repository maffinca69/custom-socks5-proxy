import {getDomains} from "../API.js";

export const domainsCallback = async (settings) => {
    let domainsForProxying = settings.domains ?? [];
    if (domainsForProxying.length) {
        return domainsForProxying;
    }

    const url = settings.domain_list_url ?? null
    if (url === null) {
        console.warn('Url for proxying domains is not set')
        return [];
    }

    await getDomains(url).then(domains => domainsForProxying = domains)

    chrome.storage.sync.set({'domains': domainsForProxying})

    return domainsForProxying
}
