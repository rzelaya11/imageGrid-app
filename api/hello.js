const fetch = require('node-fetch');
module.exports = async (req, res) => {
    const { keywords, page } = req.query
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With,Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    )

    var url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCAE5WJYGP9dqKBnHhvNK0bhBpdmBmzDeQ&start=' + page * 10 + '&cx=2adb281db276580e1&searchtype=IMAGE&q=' + keywords
    return fetch(url, {
        method: 'GET',
    }).then(result => result.json())
        .then((result) => {
            var imagesToReturn = [];
            result.items.forEach(element => {
                if (element.pagemap && element.pagemap.cse_thumbnail) {
                    var image = {
                        image: element.pagemap.cse_thumbnail[0].src,
                        description: element.htmlTitle,
                    };
                    imagesToReturn.push(image);
                }
            });
            return res.status(200).send({ images: imagesToReturn, totalSearchResults: result.searchInformation.totalResults });
        })
}