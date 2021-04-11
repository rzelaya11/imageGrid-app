import './styles.scss';

import { Grid, Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import { ProductModel } from '../../../models';
import { RouteComponentProps } from 'react-router';
import * as React from 'react';

var parse = require('html-react-parser');

export namespace SearchResultItem {
  export interface Props extends Pick<RouteComponentProps<void>, 'history'> {
    item: ProductModel;
    index: number;
    Open: Function;
  }

  export interface State {
  }
}
export class SearchResultItem extends React.Component<SearchResultItem.Props, SearchResultItem.State> {
  constructor(props: SearchResultItem.Props) {
    super(props);
  }



  render() {
    const { image, description } = this.props.item;
    return (
      <Grid container item xs={12} md={4} className="">
        <Card className={"card"} onClick={() => { this.props.Open(this.props.index); }}>
          <CardMedia className={"cardMedia"} image={''}>
            <img src={image}></img>
          </CardMedia>
          <CardContent className={"cardContent"}>
            <Typography gutterBottom variant="h6" component="h6" className="ItemTitle">
              {parse(description)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

