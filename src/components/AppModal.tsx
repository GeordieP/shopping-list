import React from "react";
import { IonModal, IonButton, IonToast } from "@ionic/react";

const AppModal: React.FC<AppModalProps> = ({ isOpen, hide, children }) => {
  return (
    <IonModal isOpen={isOpen}>
      {children}
      <IonButton onClick={hide}>Close</IonButton>
    </IonModal>
  );
};

export default AppModal;

export const AppModalErrToast: React.FC<AppModalErrToastProps> = props => {
  return (
    <IonToast
      isOpen={true}
      position="top"
      color="danger"
      duration={5000}
      {...props}
    />
  );
};

// Hooks

export function useModal(defaultOpen = false) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [error, setError] = React.useState<string | undefined>();

  function show() {
    setIsOpen(true);
  }

  function hide() {
    setIsOpen(false);
  }

  function clearError() {
    setError(undefined);
  }

  return {
    isOpen,
    show,
    hide,
    setIsOpen,
    error,
    setError,
    clearError
  };
}

// Types

interface AppModalProps {
  isOpen: boolean;
  hide: () => void;
}

interface AppModalErrToastProps {
  onDidDismiss: () => void;
  message: string | undefined;
  duration?: number;
}
