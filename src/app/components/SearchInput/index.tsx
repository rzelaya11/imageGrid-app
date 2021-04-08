import './styles.css';

import * as React from 'react';
import { IconButton, TextField, Grid } from '@material-ui/core';
import { Icon } from 'app/components/Icons';

export namespace SearchInput {
  export interface Props {
    search: any;
    textChanged: Function;
    resetSearch: Function;
    searchText: string;
  }

  export interface State {
    text: string;
  }
}

export class SearchInput extends React.Component<SearchInput.Props, SearchInput.State> {
  constructor(props: SearchInput.Props) {
    super(props);
    this.state = {
      text: this.props.searchText,
    };
  }

  clear: any = () => {
    this.setState({ ...this.state, text: '' });
    this.props.resetSearch();
    const input = document.getElementById("search-input");
    if (input) {
      input.focus();
    }
  }

  handleTextChange: any = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, text: event.target.value });
    this.props.textChanged(event.target.value);
  }

  handleKeyDown: any = (event: any) => {
    if (event.key === 'Enter') {
      this.props.search();
      event.target.blur();
    }
  }

  getClearButton = (): any => {
    return this.state.text.length > 0 ?
      (
        <Grid item xs={1} container justify="flex-end" className="BtnCloseCont">
          <IconButton id={'ClearIcon'} onClick={this.clear}>
            <Icon name={'close'} color={'#286FA9'} />
          </IconButton>
        </Grid>
      )
      :
      null;
  }
  render() {
    return (
      <Grid container className="SearchField_Grid" spacing={0} direction="row">
        <Grid item xs={9} container justify="center">
          <TextField
            id="search-input"
            autoFocus={true}
            className="SearchField MuiInput-underline"
            value={this.state.text}
            onChange={this.handleTextChange}
            margin="normal"
            onKeyPress={this.handleKeyDown}
          />
        </Grid>

        {this.getClearButton()}

        <Grid item xs={1} container justify="flex-end" className="BtnSearchCont">
          <IconButton onClick={this.props.search}
            disabled={this.state.text === ''}
            className="BtnSearchGo"
          >
            <Icon name={'search'} color='#F96565' />
          </IconButton>
        </Grid>
      </Grid>
    )
  }
}
