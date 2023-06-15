:- Process after Cloning

1. Clone the code first.
2. Run "npm update", it will update used package of node modules.
3. Replace the mysql credentials.
4. Run index file "npx nodemon src/index.js".

Note:- This project is all about fetching data from third party API, push data to mysql by creating table as well.
        After inserting data, updating data by id, any one field or all field to be updated. get all data, pagination for 10 pages. het by id, delete by id.

Endpoints: 
1. Fetch and Push data.
>>>> http://localhost:4000/bulkData
result:- {
    "status": true,
    "message": "Fetched data, created table, and data inserted successfully."
    }

2. Get Data 10 data per page only.
>>>> http://localhost:4000/getAllData
result:- {
    "status": true,
    "count": 10,
    "data": [
        {
            "id": 1,
            "API": "AdoptAPet",
            "Description": "Resource to help get pets adopted",
            "Auth": "apiKey",
            "HTTPS": 1,
            "Cors": "yes",
            "Link": "https://www.adoptapet.com/public/apis/pet_list.html",
            "Category": "Animals"
        },
        {
            "id": 2,
            "API": "Axolotl",
            "Description": "Collection of axolotl pictures and facts",
            "Auth": "Hello",
            "HTTPS": 2,
            "Cors": "no",
            "Link": "https://theaxolotlapi.netlify.app/",
            "Category": "Animals"
        },
        {
            "id": 3,
            "API": "Cat Facts",
            "Description": "Daily cat facts",
            "Auth": "",
            "HTTPS": 1,
            "Cors": "no",
            "Link": "https://alexwohlbruck.github.io/cat-facts/",
            "Category": "Animals"
        },
        {
            "id": 4,
            "API": "Cataas",
            "Description": "Cat as a service (cats pictures and gifs)",
            "Auth": "",
            "HTTPS": 1,
            "Cors": "no",
            "Link": "https://cataas.com/",
            "Category": "Animals"
        },
        {
            "id": 5,
            "API": "Cats",
            "Description": "Pictures of cats from Tumblr",
            "Auth": "apiKey",
            "HTTPS": 1,
            "Cors": "no",
            "Link": "https://docs.thecatapi.com/",
            "Category": "Animals"
        },
        {
            "id": 6,
            "API": "Dog Facts",
            "Description": "Random dog facts",
            "Auth": "",
            "HTTPS": 1,
            "Cors": "yes",
            "Link": "https://dukengn.github.io/Dog-facts-API/",
            "Category": "Animals"
        },
        {
            "id": 7,
            "API": "Dog Facts",
            "Description": "Random facts of Dogs",
            "Auth": "",
            "HTTPS": 1,
            "Cors": "yes",
            "Link": "https://kinduff.github.io/dog-api/",
            "Category": "Animals"
        },
        {
            "id": 8,
            "API": "Dogs",
            "Description": "Based on the Stanford Dogs Dataset",
            "Auth": "",
            "HTTPS": 1,
            "Cors": "yes",
            "Link": "https://dog.ceo/dog-api/",
            "Category": "Animals"
        },
        {
            "id": 9,
            "API": "eBird",
            "Description": "Retrieve recent or notable birding observations within a region",
            "Auth": "apiKey",
            "HTTPS": 1,
            "Cors": "no",
            "Link": "https://documenter.getpostman.com/view/664302/S1ENwy59",
            "Category": "Animals"
        },
        {
            "id": 10,
            "API": "FishWatch",
            "Description": "Information and pictures about individual fish species",
            "Auth": "",
            "HTTPS": 1,
            "Cors": "yes",
            "Link": "https://www.fishwatch.gov/developers",
            "Category": "Animals"
        }
    ]
}

3. get Data by id.
>>>> http://localhost:4000/getDataById/2
result: - {
    "status": true,
    "data": [
        {
            "id": 2,
            "API": "Axolotl",
            "Description": "Collection of axolotl pictures and facts",
            "Auth": "Hello",
            "HTTPS": 2,
            "Cors": "no",
            "Link": "https://theaxolotlapi.netlify.app/",
            "Category": "Animals"
        }
    ]
}

4. Update by id
>>>> http://localhost:4000/updateData/2
request: {
    "Auth": "Hello",
    "HTTPS": 2,
    "Cors": "no"
}

result:-{
    "status": true,
    "message": "Data Updated Successfully"
}

5. Delete By id.
>>>> http://localhost:4000/deleteById/2
result:- {
    "status": true,
    "message": "Data Deleted Successfully"
}