import './styles.scss';

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
import { CoverModal } from '../ImageDetails';

export namespace Search {
  export interface Props extends Pick<RouteComponentProps<void>, 'history'> {
    actions: ImageActions;
    hasLoadedResultsBefore: boolean;
    searchText: string;
    currentPage: number;
    pageSize: number;
    totalSearchResults: number;
    searchResults: Array<ProductModel>;
    isLoading: boolean;
    generalStatus: string;
    selectedImage: ProductModel;
    scrollSearchPositionY: number;
    sortDirection: number;
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


  openCoverModal: any = (index: number): void => {
    this.props.actions.selectImage(index);
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
    console.log('this.props.searchResults:', this.props.searchResults);
    return (
      <div>
        {
          this.state.currentTab === 0 &&
          <Grid container
            className="ResultsContainer">
            <CoverModal close={this.closeCoverModal}
              isOpen={this.state.isCoverModalOpen}
              changeImage={this.props.actions.changeImage}
              image={this.props.selectedImage.image}
              description={this.props.selectedImage.description} />
            {
              searchResults.map((item, index) => {
                return (
                  <SearchResultItem
                    history={this.props.history}
                    key={`search-result-item${index + 1}`}
                    index={index}
                    item={item}
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
    const { totalSearchResults, currentPage, pageSize } = this.props;

    const totalPages: number = Math.ceil(totalSearchResults / pageSize);
    return (currentPage === totalPages) ?
      null
      :
      (
        <div>
          <div className={"ContResultsCounterBottom"}>
            <Typography gutterBottom variant="body1" color="textSecondary">
              SHOWING {this.formatNumber(currentPage * 10)} OF {this.formatNumber(totalSearchResults)} RESULTS
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
    const { currentPage, pageSize, searchText } = this.props;
    console.log('currentPage', currentPage);
    this.setState({
      ...this.state,
      searchTextWithNoResults: this.props.searchText,
    });
    const nextPage: number = currentPage + 1;

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
  getSortImage: any = () => {
    if (this.props.sortDirection === -1)
      return < img className='sort' src={'data:image/png;base64,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'} alt="React Logo" />
    return < img className='sort' src={'data:image/png;base64,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'} alt="React Logo" />

  }
  render() {
    return (
      <Container maxWidth="lg">
        {this.getTabs()}

        <div className='sort' onClick={() => {
          console.log('sorting'); this.props.actions.sort()
        }}>
          {this.getSortImage()}
        </div>

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
    currentPage: state.images.currentPage,
    sortDirection: state.images.sortDirection
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