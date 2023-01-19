import {getDomains} from "./API.js";
import {registerProxyConfig} from "./common.js";

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(['proxy_url', 'domain_list_url']).then(settings => handlerPreloadValues(settings));
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        clickSaveButtonListener()
    })
});

const clickSaveButtonListener = async () => {
    let domains = []
    const proxy = document.getElementById('proxy').value
    const domainsUrl = document.getElementById('domainsUrl').value

    await getDomains(domainsUrl).then(ds => domains = ds)

    chrome.storage.sync.set({
        'proxy_url': proxy.length ? proxy : null,
        'domains': domains,
        'domain_list_url': domainsUrl.length ? domainsUrl : null
    }).then(() => alert('Saved!'));

    registerProxyConfig(proxy, domains)
}

const handlerPreloadValues = (settings) => {
    const proxyEditField = document.getElementById('proxy')
    const domainsEditField = document.getElementById('domainsUrl')

    if (settings.proxy_url) {
        proxyEditField.value = settings.proxy_url
    }

    if (settings.domain_list_url) {
        domainsEditField.value = settings.domain_list_url
    }
}


