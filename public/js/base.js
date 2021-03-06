// this is all week 4 stuff

const classSelector = document.getElementById('classes');
let storedClasses = {};

const genders = ['M', 'F', 'None', 'Other', 'Whatever', 'All'];


// set up the code to talk to the api
const apiBaseRoute = 'https://www.dnd5eapi.co/api';

const resourceFetch = (resource, options) =>
{
    // this will be easier to use as a promise, maybe?
    return new Promise((resolve, reject) =>
    {
        let route = `${apiBaseRoute}/${resource}`;
        if (options)
        {
            // need to handle this
        }
        fetch(route)
        .then((response) =>
        {
            // error handling needs to happen here, what if there is no Dana? (json)
            return response.json();
        })
        .then((data) =>
        {
            // error handling needs to happen here, what if the response code is not a good one?
            resolve(data.results);
        })
        .catch((err) =>
        {
            // getting the fetch to actually fail to here is harder than you think
            console.log('Fetch failed: ', err);
            reject(err);
        });
    })

}

// get the classes 
function classFetcher() {

	// perfect example of how to talk to the api
    fetch(apiBaseRoute + '/classes/')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // now we need to create our options/selections
           

            // create an option for each class in our returned data
            const classes = data.results;
            console.log('classes: ', classes);
            for (let i = 0; i < classes.length; i++) {
                // define the class we are working with
                let thisClass = classes[i];
                // create an option element
                let option = document.createElement('option');
                option.value = thisClass.index;
                option.textContent = thisClass.name;
                // append the option i just made to the select
                classSelector.appendChild(option);
                
                
                // populate our class holder variable
                storedClasses[thisClass.index] = thisClass.name;
            }
        })
        .catch(function(err) {
            console.log('Ooops, we could not fetch the classes');
        });
}

// event for when they change the selected class
function selectClass(event)
{
	// What is the value of the class they just selected?
    const selectedClass = event.target.value;
    // Get the actual text of that class
    const text = storedClasses[selectedClass];
    // the element that i want to change
    const cardClass = document.getElementById('cardClass');
    // change the text of the element to match what they selected
    cardClass.textContent = text;
    
	
}
classSelector.addEventListener('change', selectClass);;

function levelDropdownMaker()
{
    const select = document.createElement('select');
    let temp;
    for (let i = 1; i <= 20; i++)
    {
        temp = document.createElement('option');
        temp.value = i;
        temp.textContent = i;
        select.appendChild(temp);
    }
    return select;
}

// this function returns an entire <div><input><etc> block to add to the control bar
const controlMaker = (type, options) =>
{
    console.log(`making ${type}: `, options);
    const holder = document.createElement('div');
    if (options.label)
    {
        const label = document.createElement('label');
        label.textContent = options.label;
        holder.appendChild(label);
    }
    switch(type)
    {
        case 'select':
            const select = document.createElement('select');
            let temp;
            for (let i = 0; i < options.options.length; i++)
            {
                console.log('looping: ', i);
                temp = document.createElement('option');
                temp.value = options.options[i];
                if (typeof options.options[i] === 'string')
                {
                    temp.textContent = options.options[i].toUpperCase();
                }
                else
                {
                    // assume it is an object and we have to handle that
                    temp.textContent = options.options[i].name;
                    temp.value = options.options[i].index;
                }


                select.appendChild(temp);
            }
            holder.appendChild(select);
            break;
        default:
            console.log('no clue lulz');
            break;
    }

    return holder;
};
const controls = document.getElementById('controls');
controls.appendChild(controlMaker('select', {label: 'Gender', options: genders}));
const levelSelect = document.getElementById('levelSelect');
levelSelect.appendChild(levelDropdownMaker());

classFetcher();

resourceFetch('races')
.then((data) =>
{
    controls.appendChild(controlMaker('select', {label: 'Race', options: data}));
})