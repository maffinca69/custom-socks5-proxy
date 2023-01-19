import {getPacScript} from "./pac.js";

const registerProxyConfig = (ip, domains = []) => {
    let config = {
        mode: "pac_script",
        pacScript: {}
    };

    config.pacScript.data = getPacScript(domains, ip)

    chrome.proxy.settings.set({
        value: config,
        scope: 'regular'
    });
}

export {registerProxyConfig}
