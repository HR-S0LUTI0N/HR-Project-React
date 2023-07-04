import React, { useEffect, useRef } from 'react';

const ImageModal = ({ selectedImage, closeModal }) => {
  const modalRef = useRef(null);

  

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <div
      ref={modalRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      onClick={closeModal}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <img src={selectedImage} alt="Bill" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
    </div>
  );
};

export default ImageModal;