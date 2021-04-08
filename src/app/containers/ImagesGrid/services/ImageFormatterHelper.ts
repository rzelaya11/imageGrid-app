import { SearchResponse } from "../models";

export function getImagesInformation(responseAsJson: any): SearchResponse {

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
  const response: SearchResponse = {
    totalItems: 20,
    items: [image, image, image, image, image, image, image, image, image, image, image, image]
  };

  return response;
}

