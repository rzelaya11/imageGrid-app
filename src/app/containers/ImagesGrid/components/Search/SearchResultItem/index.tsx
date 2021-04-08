import './styles.css';

import { Grid, Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import { ImageModel, ProductModel } from '../../../models';
import ImageUnavailable from '../../../../../../assets/images/image-unavailable.png'
import { RouteComponentProps } from 'react-router';
import * as React from 'react';

export namespace SearchResultItem {
  export interface Props extends Pick<RouteComponentProps<void>, 'history'> {
    item: ProductModel;
    setScrollPosition: Function;
    setImageDetailSource: Function;
    Open: Function;
  }

  export interface State {
  }
}
export class SearchResultItem extends React.Component<SearchResultItem.Props, SearchResultItem.State> {
  constructor(props: SearchResultItem.Props) {
    super(props);
  }

  getImage: any = (image: ImageModel): any => {
    return (image.large === '#') ?
      ImageUnavailable
      :
      image.large;
  }



  render() {
    const { image, description, itemlookupcode } = this.props.item;
    return (
      <Grid container item xs={12} md={4} className="">
        <Card className={"card"} onClick={() => { console.log(this.props.Open); this.props.Open(); }}>
          <CardMedia className={"cardMedia"} image={''}>
            <img src={this.getImage(image)}></img>
          </CardMedia>
          <CardContent className={"cardContent"}>
            <Typography gutterBottom variant="h6" component="h6" className="ItemBookTitle">
              {description}
            </Typography>
            <Typography variant="body1" gutterBottom color="textSecondary">
              {itemlookupcode}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

