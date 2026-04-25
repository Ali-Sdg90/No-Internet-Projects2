const fetch = require('node-fetch');
const { domains } = require("./domains");

async function checkDomains() {
    const success = [];

    for (const domain of domains) {
        const url = `https://${domain}`;
        try {
            const res = await fetch(url, { method: "GET", timeout: 3000 }); // timeout 3s
            if (res.ok) {
                console.log(`${domain} is reachable (status: ${res.status})`);
                success.push(domain);
            } else {
                console.log(`${domain} responded with status ${res.status}`);
            }
        } catch (err) {
            console.log(`${domain} did not respond (error: ${err.message})`);
        }
    }

    console.log("\n✅ Domains that are reachable:");
    success.forEach((d) => console.log(d));
}

checkDomains();
