import React, { useState } from "react";

function OEE_Dialog(props) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openDialog}>Open Dialog</button>
      {isOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <button onClick={closeDialog} className="close-button">
              X
            </button>
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dialog;
