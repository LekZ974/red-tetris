import React  from 'react';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-responsive-modal';

const ModalContainer = (props) => {
  const {open, onClose, children, closeOnOverlayClick} = props

  return (
    <Modal open={open} onClose={onClose} closeOnOverlayClick={closeOnOverlayClick} center>
      <Zoom>
        {children}
      </Zoom>
    </Modal>
  )
}
export default ModalContainer
