import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import Hidden from '@material-ui/core/Hidden';
import { Icon } from 'app/components/Icons';
import './styles.css';

export namespace CoverModal {
  export interface Props {
    image: any,
    isOpen: boolean,
    close: any,
  }
}

export class CoverModal extends React.Component<CoverModal.Props> {
  constructor(props: CoverModal.Props) {
    super(props);
  }

  render() {
    return (
      <Modal
        className="modalOverlay"
        open={this.props.isOpen}
        onClose={this.props.close}>
        <div onClick={this.props.close}>
          <img className="modalEnlargeImage" src={this.props.image} />

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
