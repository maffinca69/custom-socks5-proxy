import {proxyUrlCallback} from "./callback/proxyUrlCallback.js";
import {domainsCallback} from "./callback/domainsCallback.js";
import {registerProxyConfig} from "./common.js";

chrome.action.onClicked.addListener(() => chrome.runtime.openOptionsPage())

let proxy = null
chrome.storage.sync.get('proxy_url').then(settings => proxy = proxyUrlCallback(settings))

chrome.storage.sync.get(['domains', 'domain_list_url']).then(settings => {
    domainsCallback(settings).then(domains => registerProxyConfig(proxy, domains))
})
