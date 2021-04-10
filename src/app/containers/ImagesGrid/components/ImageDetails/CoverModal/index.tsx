import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import Hidden from '@material-ui/core/Hidden';
import { Icon } from 'app/components/Icons';
import './styles.css';

export namespace CoverModal {
  export interface Props {
    image: any,
    isOpen: boolean,
    changeImage: Function,
    close: any,
  }
  export interface State {
    height: number;
    width: number;
    imgRef: any;
    initialHeight: number;
    initialWidth: number;
  }
}

export class CoverModal extends React.Component<CoverModal.Props, CoverModal.State> {
  constructor(props: CoverModal.Props) {
    super(props);
    this.state = {
      height: 0,
      width: 300,
      imgRef: React.createRef(),
      initialHeight: 0,
      initialWidth: 0
    }

  }

  componentDidMount() {
    this.setState({
      ...this.state,
      initialHeight: this.state.imgRef.current ? this.state.imgRef.current.clientHeight : 0,
      initialWidth: this.state.imgRef.current ? this.state.imgRef.current.clientWidth : 0
    })
  }

  handleZoomIn() {
    var IMG = document.getElementById('IMG');
    if (IMG) {
      console.log('IMG', IMG);
      var currentWidth = this.state.width - 50;
      this.setState({ ...this.state, width: currentWidth });
      IMG.style.setProperty('width', currentWidth + 'px');
    }

  }
  // Event handler callback zoom out
  handleZoomOut() {
    var IMG = document.getElementById('IMG');
    if (IMG) {
      console.log('IMG', IMG);
      var currentWidth = this.state.width + 50;
      this.setState({ ...this.state, width: currentWidth });
      IMG.style.setProperty('width', currentWidth + 'px');
    }
  }
  render() {
    //const imgStyle = { height: this.state.height, width: this.state.width }
    return (
      <Modal
        className="modalOverlay"
        open={this.props.isOpen}
        onClose={this.props.close}>
        <div >
          <div>
            <button onClick={() => { this.props.changeImage(-1) }}>Previous</button>
            <button onClick={this.handleZoomIn.bind(this)}>Zoom In</button>
            <button onClick={this.handleZoomOut.bind(this)}>Zoom Out</button>
            <button onClick={() => { this.props.changeImage(1) }}>Next</button>
          </div>
          <img className="modalEnlargeImage" src={this.props.image} id='IMG' />

          <Hidden mdUp>
            <div className="CoverModalClose" onClick={this.props.close}>
              <Icon name={'close'} color='rgba(0, 0, 0, 0.87);' />
            </div>
          </Hidden>

          <Hidden smDown>
            <div className="CoverModalClose" onClick={this.props.close}>
              <Icon name={'close'} color='rgba(0, 0, 0, 0.87);' />
            </div>
          </Hidden>
        </div>
      </Modal>
    )
  }
}
