const fetch = require('node-fetch');
//const google = require('googleapis').google
//const customSearch = google.customSearch('v1')
//const state = require('./state.js')
module.exports = async (req, res) => {
    const { keywords, page } = req.query
    //console.log('start');
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With,Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    )

    //const content = state.load()
    //async function loadImages() {
    console.log('req.query', req.query);
    console.log('keywords', keywords);
    var url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCAE5WJYGP9dqKBnHhvNK0bhBpdmBmzDeQ&start=' + page * 10 + '&cx=2adb281db276580e1&searchtype=IMAGE&q=' + keywords
    return fetch(url, {
        method: 'GET',
    }).then(result => result.json())
        .then((result) => {
            var images = [];
            console.log('result', result);
            result.items.forEach(element => {
                if (element.pagemap && element.pagemap.cse_thumbnail) {
                    var image = {
                        image: {
                            small: element.pagemap.cse_thumbnail[0].src,
                            large: element.pagemap.cse_thumbnail[0].src,
                            extraLarge: element.pagemap.cse_thumbnail[0].src
                        },
                        description: '',
                        itemlookupcode: '',
                        price: 0,
                    };
                    images.push(image);
                }
            });
            return res.status(200).send(images)
        })
    /**/
    //console.log(response2.text());    
    //}

}
//loadImages();