import './styles.css';

import * as React from 'react';
import { Component } from 'react';

import { RouteComponentProps } from 'react-router';
import NoResultsImage from '../../../../../assets/images/illu-noresults.svg';
import { Tabs, Tab, Grid, Fab, Typography, Container } from '@material-ui/core';
import { RootState } from 'app/reducers/state';
import { ImageActions } from '../../actions';
import { Dispatch, bindActionCreators } from 'redux';
import { omit } from 'app/utils';
import { connect } from 'react-redux';
import { ProductModel, SearchRequest } from '../../models';
import { SearchResultItem } from './SearchResultItem';
import { CoverModal } from '../ImageDetails/CoverModal';

export namespace Search {
  export interface Props extends Pick<RouteComponentProps<void>, 'history'> {
    actions: ImageActions;
    hasLoadedResultsBefore: boolean;
    searchText: string;
    page: number;
    pageSize: number;
    totalSearchResults: number;
    searchResults: Array<ProductModel>;
    isLoading: boolean;
    generalStatus: string;
    selectedImage: ProductModel;
    scrollSearchPositionY: number;
  }

  export interface State {
    currentTab: number;
    searchTextWithNoResults: string;
    searchTextWithResults: string;
    isCoverModalOpen: boolean,
  }
}

export class Search extends Component<Search.Props, Search.State> {
  constructor(props: Search.Props) {
    super(props);

    this.state = {
      currentTab: 0,
      isCoverModalOpen: false,
      searchTextWithNoResults: '',
      searchTextWithResults: props.searchText,
    };
  }

  componentDidMount: any = () => {
    window.scrollTo(0, this.props.scrollSearchPositionY);
  }

  componentDidUpdate: any = (previousProps: Search.Props) => {
    if (this.haveSearchResultsChanged(previousProps, this.props)) {
      window.scrollTo(0, 0);
      this.setState({
        ...this.state,
        searchTextWithResults: this.props.searchText,
      });
    }
    if (previousProps.generalStatus !== 'empty-results' && this.props.generalStatus === 'empty-results') {
      this.setState({
        ...this.state,
        searchTextWithNoResults: this.props.searchText,
      });
    }
  }


  openCoverModal: any = (): void => {
    this.setState({ isCoverModalOpen: true });
  }

  closeCoverModal: any = (): void => {
    this.setState({ isCoverModalOpen: false });
  }

  haveSearchResultsChanged: any = (previousProps: Search.Props, nextProps: Search.Props): boolean => {
    const { totalSearchResults: previousTotalResults } = previousProps;
    const { totalSearchResults: newTotalResults } = nextProps;
    return previousTotalResults !== newTotalResults;
  }

  getMessageForNoResultsFound: any = () => {
    const { generalStatus } = this.props;

    if (generalStatus !== 'empty-results') {
      return null;
    }

    return (
      <Container className={"SearchNoResult"} maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img src={NoResultsImage} className="illustration" />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography gutterBottom variant="h4" component="h4">
              Sorry!
            </Typography>

            <Typography gutterBottom variant="body1">
              We couldn’t find a match for
              <br /> <strong>“{this.state.searchTextWithNoResults}”</strong>.
            </Typography>

            <ul>
              <li>Check your spelling</li>
              <li>Use fewer words or more general words</li>
              <li>Search for a less specific term</li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    );
  }

  getSearchResultsCount: any = () => {
    const { hasLoadedResultsBefore, totalSearchResults } = this.props;

    return (hasLoadedResultsBefore && totalSearchResults > 0) ?
      (
        <div className="ResultsCouter">
          <Typography gutterBottom variant="body1">
            {this.formatNumber(totalSearchResults)} Results <span className="TypeSearchTerm"> for
            <strong>{this.state.searchTextWithResults}</strong></span>
          </Typography>
        </div>
      )
      :
      null;
  }

  getTabs: any = () => {
    const { hasLoadedResultsBefore, totalSearchResults } = this.props;

    return (hasLoadedResultsBefore && totalSearchResults > 0) ?
      (
        <Tabs value={this.state.currentTab}
          className="searchTabs"
          indicatorColor="primary"
          textColor="primary">
          <Tab label="All" />
        </Tabs>
      )
      :
      null;
  }

  getResults: any = () => {
    const { hasLoadedResultsBefore, searchResults, totalSearchResults } = this.props;

    if (!hasLoadedResultsBefore || totalSearchResults === 0) {
      return null;
    }

    return (
      <div>
        {
          this.state.currentTab === 0 &&
          <Grid container
            className="ResultsContainer">
            <CoverModal close={this.closeCoverModal}
              isOpen={this.state.isCoverModalOpen}
              image={'https://firebasestorage.googleapis.com/v0/b/sconliestore.appspot.com/o/Items%2f028400040129.jpg?alt=media'} />
            {
              searchResults.map((item, index) => {
                return (
                  <SearchResultItem
                    history={this.props.history}
                    key={`search-result-item${index + 1}`}
                    item={item}
                    setScrollPosition={this.props.actions.setScrollPosition}
                    setImageDetailSource={this.props.actions.setImageDetailSource}
                    Open={this.openCoverModal}
                  />
                )
              })
            }
          </Grid>
        }

        {this.getBottomSearchResults()}
      </div>
    );
  }

  getBottomSearchResults: any = () => {
    const { totalSearchResults, page, pageSize } = this.props;

    const totalPages: number = Math.ceil(totalSearchResults / pageSize);

    return (page === totalPages) ?
      null
      :
      (
        <div>
          <div className={"ContResultsCounterBottom"}>
            <Typography gutterBottom variant="body1" color="textSecondary">
              SHOWING {this.formatNumber(page * pageSize)} OF {this.formatNumber(totalSearchResults)} RESULTS
            </Typography>
          </div>
          <div className={"ContLoadMore"}>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="Add"
              className={"BtnLoadMore"}
              disabled={this.props.isLoading}
              onClick={this.loadMoreResults} >
              Load More
            </Fab>
          </div>
        </div>
      );
  }

  loadMoreResults: any = () => {
    const { page, pageSize, searchText } = this.props;
    this.setState({
      ...this.state,
      searchTextWithNoResults: this.props.searchText,
    });
    const nextPage: number = page + 1;

    const request: SearchRequest = {
      keywords: searchText,
      page: nextPage,
      pageSize,
    };

    this.props.actions.searchImages(request);
  }

  formatNumber: any = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    return (
      <Container maxWidth="lg">
        {this.getTabs()}

        {this.getSearchResultsCount()}

        {this.getMessageForNoResultsFound()}

        {this.getResults()}
      </Container>
    );
  }
}

function mapStateToProps(state: RootState): Partial<Search.Props> {
  return {
    hasLoadedResultsBefore: state.images.hasLoadedResultsBefore,
    searchText: state.images.searchText,
    totalSearchResults: state.images.totalSearchResults,
    searchResults: state.images.searchResults,
    isLoading: state.images.isLoading,
    generalStatus: state.images.generalStatus,
    selectedImage: state.images.selectedProduct,
    scrollSearchPositionY: state.images.scrollSearchPositionY,
  };
}

function mapActionsToProps(
  dispatch: Dispatch,
): Pick<Search.Props, 'actions'> {
  return {
    actions: bindActionCreators(omit(ImageActions, 'Type'), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Search as any);