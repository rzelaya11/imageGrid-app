module.exports = (req, res) => {
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
        items: [image, image, image, image, image, image, image, image, image, image, image, image]
    };
    res.status(200).send(response)
}