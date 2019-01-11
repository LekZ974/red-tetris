import React  from 'react';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-responsive-modal';

const ModalContainer = (props) => {
  const {open, onClose, children, closeOnOverlayClick} = props

  return (
    <Modal classNames={{modal: {customModal: {'border-radius': '5px'}}}} open={open} onClose={onClose} closeOnOverlayClick={closeOnOverlayClick} center>
      <Zoom>
        {children}
      </Zoom>
    </Modal>
  )
}
export default ModalContainer
