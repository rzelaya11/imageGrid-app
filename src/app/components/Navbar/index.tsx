import './styles.css';

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
      this.props.search(this.props.searchText, 1);
      this.setState({ activeResults: true })
      this.props.history.push('/search');
      event.target.blur();
    }
  }


  searchImagesDesktop: any = () => {
    this.props.search(this.props.searchText, 1);
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
            this.props.search(this.props.searchText, 1);
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
