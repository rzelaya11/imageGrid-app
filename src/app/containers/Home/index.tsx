import * as React from 'react';
import { Component } from 'react';
import './styles.css';

export namespace Home {
  export interface Props {
    scrollSearchPositionY: number
  }
}

class Home extends Component<Home.Props> {
  constructor(props: Home.Props) {
    super(props);
  }

  componentDidMount: any = async () => {
    window.scrollTo(0, this.props.scrollSearchPositionY);
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Home;
