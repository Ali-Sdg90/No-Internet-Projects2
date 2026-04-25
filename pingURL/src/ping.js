const ping = require("ping");
const { domains } = require("./domains");

async function checkDomains() {
    const success = [];

    for (const domain of domains) {
        try {
            const res = await ping.promise.probe(domain, { timeout: 1 }); // timeout 1s
            if (res.alive) {
                console.log(`${domain} responded`);
                success.push(domain);
            } else {
                console.log(`${domain} did not respond`);
            }
        } catch (err) {
            console.log(`${domain} error: ${err.message}`);
        }
    }

    console.log("\n✅ Domains that responded:");
    success.forEach((d) => console.log(d));
}

checkDomains();
