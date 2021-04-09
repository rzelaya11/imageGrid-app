module.exports = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    var image = {
        image: {
            small: 'https://firebasestorage.googleapis.com/v0/b/sconliestore.appspot.com/o/Items%2f028400040129.jpg?alt=media',
            large: 'https://firebasestorage.googleapis.com/v0/b/sconliestore.appspot.com/o/Items%2f028400040129.jpg?alt=media',
            extraLarge: 'https://firebasestorage.googleapis.com/v0/b/sconliestore.appspot.com/o/Items%2f028400040129.jpg?alt=media'
        },
        description: '',
        itemlookupcode: '',
        price: 0,
    };
    const response = {
        totalItems: 20,
        items: [image, image, image, image, image, image, image, image, image, image, image, image, image, image, image, image, image, image
            , image, image,]
    };
    res.status(200).send(response)
}