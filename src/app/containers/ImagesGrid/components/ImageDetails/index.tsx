import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import Hidden from '@material-ui/core/Hidden';
import { Icon } from 'app/components/Icons';
import './styles.scss';

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
      var currentWidth = this.state.width + 50;
      this.setState({ ...this.state, width: currentWidth });
      IMG.style.setProperty('width', currentWidth + 'px');
    }

  }
  handleZoomOut() {
    var IMG = document.getElementById('IMG');
    if (IMG) {
      console.log('IMG', IMG);
      var currentWidth = this.state.width - 50;
      this.setState({ ...this.state, width: currentWidth });
      IMG.style.setProperty('width', currentWidth + 'px');
    }
  }
  render() {
    return (
      <Modal
        className="modalOverlay"
        open={this.props.isOpen}
        onClose={this.props.close}>
        <div >
          <div>
            <div className="arrow-left" onClick={() => { this.props.changeImage(-1) }}>
              <Icon name={'arrowLeft'} color='rgba(0, 0, 0, 0.87);' />
            </div>
            <div className="arrow-right" onClick={() => { this.props.changeImage(1) }}>
              <Icon name={'arrowRight'} color='rgba(0, 0, 0, 0.87);' />
            </div>


            <div onClick={this.handleZoomIn.bind(this)}>
              <img className="zoomIn" src={'data:image/png;base64,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'} alt="React Logo" />
            </div>
            <div onClick={this.handleZoomOut.bind(this)}>
              <img className="zoomOut" src={'data:image/png;base64,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'} alt="React Logo" />
            </div>

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
