import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps, Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { Navbar } from 'app/components/Navbar';
import Home from 'app/containers/Home';
import Search from 'app/containers/ImagesGrid/components/Search';
import { ImageActions } from 'app/containers/ImagesGrid/actions';
import { Dispatch, bindActionCreators } from 'redux';
import { omit } from 'app/utils';
import { RootState } from 'app/reducers';
import { SearchRequest } from '../ImagesGrid/models';
export namespace App {
  export interface Props extends RouteComponentProps<void> {
    actions: ImageActions;
    currentPage: number;
    pageSize: number;
    isImagesLoading: boolean;
    searchText: string;
    showSearchInput: boolean;
    scrollSearchPositionY: number;
  }
  export interface State {
    changeHistory: string;
    amountOfRecomendation: number;
  }
}

class App extends Component<App.Props> {
  constructor(props: App.Props) {
    super(props);
    this.state = {
      changeHistory: '',
    };
  }
  componentDidMount: any = async () => {
  }

  componentWillUnmount() {
  }

  async search(text: string, page: number) {
    const request: SearchRequest = {
      keywords: text,
      page,
      pageSize: this.props.pageSize,
    };

    await this.props.actions.searchImages(request);
  }
  handleCloseModal: any = () => {
    this.props.actions.setShowSearchInput(false);
  }
  handleOkModal: any = () => {
  }
  getHome() {
    return <Home
      scrollSearchPositionY={this.props.scrollSearchPositionY}
    ></Home>
  }

  render() {
    return (
      <div>
        <Navbar history={this.props.history}
          showProgressBar={this.props.isImagesLoading}
          search={(text: string, page: number) => this.search(text, page)}
          searchText={this.props.searchText}
          setSearchText={this.props.actions.setSearchText}
          showSearchInput={this.props.showSearchInput}
          setShowSearchInput={this.props.actions.setShowSearchInput}
          resetSearch={this.props.actions.resetSearch}
        />
        <Switch>
          <Route exact path="/" render={() => { return this.getHome(); }} />
          <Route exact path="/welcome" render={() => { return this.getHome(); }} />
          <Route exact path="/search" render={() => { return <Search history={this.props.history} /> }} />

        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state: RootState): Partial<App.Props> {
  return {
    isImagesLoading: state.images.isLoading,
    searchText: state.images.searchText,
    showSearchInput: state.images.showSearchInput,
    scrollSearchPositionY: state.images.scrollSearchPositionY,
  };
}

function mapActionsToProps(
  dispatch: Dispatch,
): Pick<App.Props, 'actions'> {
  return {
    actions: bindActionCreators(omit(ImageActions, 'Type'), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(App as any);
