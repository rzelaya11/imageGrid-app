import * as React from 'react';
import IconsList from './IconsList';
import { SvgIcon } from '@material-ui/core';

export namespace Icon {
  export interface Props {
    name: string;
    color: string;
  }
}

export class Icon extends React.Component<Icon.Props> {
  constructor(props: Icon.Props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon width="100%" height="100%" viewBox="0 0 24 24">
        <path d={IconsList[this.props.name]} fill={this.props.color} fillRule="evenodd" clipRule="evenodd"></path>
      </SvgIcon>
    );
  }
}
