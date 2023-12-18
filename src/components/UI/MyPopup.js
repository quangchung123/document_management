import React, {cloneElement, forwardRef, useImperativeHandle, useState} from "react";
import Popup from "reactjs-popup";

const MyPopup = (props, ref) => {
  // states
  const [open, setOpen] = useState(false);

  // Methods
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  // UI Methods
  const BModal = () => {
    return <props.button onClick={openModal} />;
  };

  const Children = () => {
    return cloneElement(props.children, { closeModal });
  };

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal
  }))
  // Hooks

  return (
    <div>
      <BModal />
      <Popup
        open={open}
        modal
        nested
        contentStyle={{ width: 800 }}
        closeOnDocumentClick={true}
        onClose={closeModal}
        {...props}
      >
        <div className="modal rounded-5 px-2">
          <div className="form-container">
            <Children />
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default forwardRef(MyPopup);
