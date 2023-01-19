const getDomains = async (url) => {
    let domains = [];
    await fetch(url).then(response => response.text()).then(resp => {
        domains = resp.split('\n')
    })

    domains = domains.filter(d => d)

    return domains
}

export {getDomains}
