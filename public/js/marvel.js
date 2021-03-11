const form = document.getElementById('marvelSearch');
const searchInput = document.getElementById('mSearch');


const localCharSearch = (search) =>
{
    fetch(`character-lookup?name=${search}`)
    .then((response) =>
    {
        // you will regret not handling errors here
        return response.json();
    })
    .then((data) =>
    {
        // do something with the data
        // data is an array...that's tricky
        const first = data[0];
        const charName = document.getElementById('charName');
        charName.textContent = first.name;

        const desc = document.getElementById('charDesc');
        const descBlock = document.createElement('p');
        descBlock.textContent = first.description;

        desc.appendChild(descBlock);

        // see what our options are
        console.log('keys: ', Object.keys(first));
    })
    .catch((err) =>
    {
        // we ALWAYS use a catch block with our promises (fetch is a promise)
        console.log('Error fetching: ', err);
    });
}

form.addEventListener('submit', (e) =>
{
    e.preventDefault();
    localCharSearch(searchInput.value);

});
