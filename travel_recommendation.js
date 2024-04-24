const getSearch = async() => {
    try {
        const resp = await fetch('./travel_recommendation_api.json')

        if(!resp.ok){
            throw new Error("Error " + resp.status)
        }

        const data = await resp.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}

const searchBtn = document.getElementById('btnSearch')
const clearBtn = document.getElementById('btnClear')
const inputSearch = document.querySelector('.form-control');

const imageResult = document.getElementById('imageResult');
const titleResult = document.getElementById('titleResult');
const descriptionResult = document.getElementById('descriptionResult');

const imageResult2 = document.getElementById('imageResult2');
const titleResult2 = document.getElementById('titleResult2');
const descriptionResult2 = document.getElementById('descriptionResult2');

clearBtn.addEventListener('click', (event) => {
    event.preventDefault()
    inputSearch.value = ''
    imageResult.src = ''
    titleResult.textContent = ''
    descriptionResult.textContent = ''
    
    imageResult2.src = ''
    titleResult2.textContent = ''
    descriptionResult2.textContent = ''
})

searchBtn.addEventListener('click', async(event) => {
    event.preventDefault()

    const keyword = inputSearch.value.toLowerCase();

    const recommendation = await getSearch()


    if (keyword === 'beach' || keyword === 'beaches') {
        imageResult.src = recommendation.beaches[0].imageUrl;
        titleResult.textContent = recommendation.beaches[0].name;
        descriptionResult.textContent = recommendation.beaches[0].description;
        
        imageResult2.src = recommendation.beaches[1].imageUrl;
        titleResult2.textContent = recommendation.beaches[1].name;
        descriptionResult2.textContent = recommendation.beaches[1].description;

    } else if (keyword === 'temple' || keyword === 'temples') {
        imageResult.src = recommendation.temples[0].imageUrl;
        titleResult.textContent = recommendation.temples[0].name;
        descriptionResult.textContent = recommendation.temples[0].description;
        
        imageResult2.src = recommendation.temples[1].imageUrl;
        titleResult2.textContent = recommendation.temples[1].name;
        descriptionResult2.textContent = recommendation.temples[1].description;

    } else if (keyword === 'country' || keyword === 'countries') {

        imageResult.src = recommendation.countries[1].cities[1].imageUrl;
        titleResult.textContent = recommendation.countries[1].cities[1].name;
        descriptionResult.textContent = recommendation.countries[1].cities[1].description;
        
        imageResult2.src = recommendation.countries[0].cities[0].imageUrl;
        titleResult2.textContent = recommendation.countries[0].cities[0].name;
        descriptionResult2.textContent = recommendation.countries[0].cities[0].description;

    } else {
        console.log('No se encontraron resultados para "' + keyword + '"');
    }
});