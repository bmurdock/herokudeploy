// This has nothing to do with Bitcoin
const crypto = require('crypto');
// Make fetch happen
const fetch = require('node-fetch');

const privKey = process.env.PRIVATE_KEY;
const pubKey = process.env.PUBLIC_KEY;
if (typeof pubKey === 'undefined' || pubKey === '' || typeof privKey === 'undefined' || privKey === '')
{
    throw new Error("You do not have a public/private key defined in your environment variables.");
}

console.log('credentials loaded');

function auth()
{
    const ts = new Date().getTime();
    const hash = crypto.createHash('md5').update(ts + privKey + pubKey).digest('hex');


    return {ts, hash};
}

function grab(resource, options)
{
    return new Promise((resolve, reject) =>
    {
        const apiKey = process.env.PUBLIC_KEY;
        const base = 'https://gateway.marvel.com';
        const {ts, hash} = auth();
        let route = `${base}/v1/public/${resource}`;

   
        route += `?apikey=${apiKey}&ts=${ts}&hash=${hash}`;


        // This is where things can get very complicated and where you can 
        // do the most customization
        if (options)
        {
            // we need to do something omg
            if(options.name)
            {
                route += `&nameStartsWith=${options.name}`
            }
        }
        console.log('route: ', route);
        fetch(`${route}`)
        .then((response) =>
        {
            return response.json();
        }).
        then((data) =>
        {
            if (data.code === 200)
            {
                resolve(data.data.results);
            }
            else
            {
                console.log('data: ', data);
                // We probably should have a better explanation.
                reject(new Error('For reasons..'));
            }
        })
        .catch((err) =>
        {
            console.log('Error fetching: ', err);
            reject(err);
        });
    })
}

exports.auth = auth;
exports.grab = grab;