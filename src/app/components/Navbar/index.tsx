import './styles.scss';

import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, IconButton, Hidden, Container, TextField } from '@material-ui/core';
import { Icon } from 'app/components/Icons';
import { SearchInput } from '../SearchInput';
import { RouteComponentProps } from 'react-router';

export namespace Navbar {
  export interface Props extends Pick<RouteComponentProps<void>, 'history'> {
    search: Function;
    setSearchText: Function;
    setShowSearchInput: Function;
    searchText: string;
    showProgressBar: boolean;
    resetSearch: Function;
    showSearchInput: boolean;
    currentPage: number;
    sort: Function;
  }
  export interface State {
    showNavbarMenu: boolean;
    activeResults: boolean;
    showSearchDesktop: boolean;
  }
}

export class Navbar extends React.Component<Navbar.Props, Navbar.State> {
  constructor(props: Navbar.Props) {
    super(props);
    this.state = {
      showNavbarMenu: false,
      activeResults: false,
      showSearchDesktop: false
    };
  }

  closeNavbarMenu: any = () => {
    this.setState({ ...this.state, showNavbarMenu: false });
  }

  closeSearchInput: any = () => {
    this.setState({ ...this.state });
    this.props.setShowSearchInput(false);
    this.props.history.push('/welcome');
  }
  openNavbarMenu: any = () => {
    this.setState({ ...this.state, showNavbarMenu: true });
  }

  openSearchInput: any = () => {
    this.props.setShowSearchInput(true);
    this.setState({ ...this.state, activeResults: false });
    this.props.history.push('/search');
  }

  getLeftMobileWidget: any = () => {
    const { showSearchInput } = this.props;
    return showSearchInput ?
      this.getLeftArrow()
      :
      (
        <Grid item xs={2} container justify='flex-start'>
          <IconButton onClick={this.openNavbarMenu}>
            <Icon name={'menu'} color={'#286FA9'} />
          </IconButton>
        </Grid>
      );
  }
  getLeftDesktopWidget: any = () => {
    const { showSearchInput } = this.props;
    const { activeResults } = this.state;

    return showSearchInput && !activeResults ?
      this.getLeftArrow()
      :
      (
        <Grid item xs={5} container justify='flex-start'>
          <span className="logoImage" onClick={() => this.props.history.push('/')} />
        </Grid>
      );
  }

  getCenterMobileWidget: any = () => {
    const { showSearchInput } = this.props;
    const path = this.props.history.location.pathname;
    return showSearchInput ?
      this.getSearchInput()
      :
      (
        <Grid item xs={8} container justify='center'>
          <span className={path === '/' ? "logoHomepage" : "logoImage"} onClick={() => this.props.history.push('/')} />
        </Grid>
      );
  }

  getCenterDesktopWidget: any = () => {
    const { showSearchInput } = this.props;
    const { activeResults } = this.state;
    return showSearchInput && !activeResults ?
      this.getSearchInput()
      :
      (
        <Grid item xs={5} lg={6} container justify='space-between'>
          {this.getSearchOpener()}
        </Grid>
      );
  }

  getRightMobileWidget: any = () => {
    const { showSearchInput } = this.props;
    return showSearchInput ?
      null
      :
      (
        <Grid item xs={2} container justify='flex-end'>
          <IconButton onClick={this.openSearchInput}>
            <Icon name={'search'} color={'#286FA9'} />
          </IconButton>
        </Grid>
      );
  }

  getRightDesktopWidget: any = () => {
    const { showSearchInput } = this.props;
    const { activeResults } = this.state;
    return showSearchInput && !activeResults ?
      null
      :
      (
        <Grid item xs={2} lg={1} container justify='flex-start'>
          <div className='sort' onClick={() => {
            console.log('sorting'); this.props.sort()
          }}>
            < img className='sort' src={'data:image/png;base64,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'} alt="React Logo" />
          </div>
        </Grid>
      );
  }

  closeSearchInputDesktop: any = () => {
    this.setState({ showSearchDesktop: false });
    if (this.props.history.location.pathname !== '/welcome' && this.props.history.location.pathname !== '/dashboard')
      this.props.history.push('/welcome');
    this.clear();
  }

  openSearchInputDesktop: any = () => {
    this.setState({ showSearchDesktop: true });
  }

  handleSearchTextDesktop: any = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setSearchText(event.target.value);
  }

  handleKeyDownOnSearchDesktop: any = (event: any) => {
    if (event.key === 'Enter') {
      this.props.search(this.props.searchText, this.props.currentPage + 1);
      this.setState({ activeResults: true })
      this.props.history.push('/search');
      event.target.blur();
    }
  }


  searchImagesDesktop: any = () => {
    this.props.search(this.props.searchText, this.props.currentPage + 1);
    this.setState({ activeResults: true })
    this.props.history.push('/search');
  }

  clear: any = () => {
    this.props.resetSearch();
    const input = document.getElementById("search-input-desktop");
    if (input) {
      input.focus();
    }
  }

  getSearchOpener: any = () => {
    return (
      <div className="btn-search-cont">
        <div className="search-open" style={{ display: this.state.showSearchDesktop ? 'block' : 'none' }}>
          <TextField
            id="search-input-desktop"
            className="SearchField MuiInput-underline"
            placeholder="Search..."
            onChange={this.handleSearchTextDesktop}
            onKeyPress={this.handleKeyDownOnSearchDesktop}
            value={this.props.searchText}
          />
          <div className="btn-closesearch">
            <IconButton id={'ClearIcon'} onClick={this.closeSearchInputDesktop}>
              <Icon name={'close'} color={'#286FA9'} />
            </IconButton>
          </div>
          <IconButton className="BtnSearchGo" onClick={this.searchImagesDesktop}>
            <Icon name={'search'} color='#F96565' />
          </IconButton>
        </div>
        <div className="search-closed">
          <div className="label-closedsearch" onClick={this.openSearchInputDesktop}>
            Search...
          </div>
          <IconButton onClick={this.openSearchInputDesktop}>
            <Icon name={'search'} color={'#000000'} />
          </IconButton>
        </div>
      </div>
    );
  }

  getLeftArrow: any = () => {
    return (
      <Grid item xs={1} container justify='flex-start'>
        <IconButton onClick={this.closeSearchInput}>
          <Icon name={'arrowLeft'} color={'#286FA9'} />
        </IconButton>
      </Grid>
    );
  }

  getSearchInput: any = () => {
    const { showSearchInput } = this.props;
    return showSearchInput ?
      (
        <Grid item xs={11} container justify='center'>
          <SearchInput search={(_: any) => {
            this.setState({ ...this.state, activeResults: true });
            this.props.search(this.props.searchText, this.props.currentPage + 1);
          }}
            textChanged={this.props.setSearchText}
            resetSearch={this.props.resetSearch}
            searchText={this.props.searchText} />
        </Grid>
      )
      :
      null;
  }

  render() {
    const { showSearchInput } = this.props;
    const { activeResults } = this.state;
    let expandedClass = 'root';

    if (showSearchInput && !activeResults) {
      expandedClass = 'root expanded';
    }
    return (
      <div className='ContainerNavbar'>
        <AppBar position='fixed' className='Navbar'>
          <Container maxWidth='lg'>
            <Toolbar>
              <Hidden mdUp>
                <Grid container className='root' spacing={0} direction='row'>
                  {this.getLeftMobileWidget()}
                  {this.getCenterMobileWidget()}
                  {this.getRightMobileWidget()}
                </Grid>
              </Hidden>
              <Hidden smDown>
                <Grid container className={expandedClass} spacing={0} direction='row'>
                  {this.getLeftDesktopWidget()}
                  {this.getCenterDesktopWidget()}
                  {this.getRightDesktopWidget()}
                </Grid>
              </Hidden>
            </Toolbar>
          </Container>
        </AppBar>

      </div>
    );
  }
}
