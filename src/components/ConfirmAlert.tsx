import React from "react";
import { IonAlert } from "@ionic/react";

const ConfirmAlert: React.FC<ConfirmAlertProps> = ({
  onCancel,
  onConfirm,
  ...props
}) => {
  return (
    <IonAlert
      header={"Confirm"}
      message={"Are you sure you want to perform this action?"}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: onCancel
        },
        {
          text: "Confirm",
          cssClass: "danger",
          handler: onConfirm
        }
      ]}
      {...props}
    />
  );
};

export default ConfirmAlert;

interface ConfirmAlertProps {
  onCancel: () => void;
  onConfirm: () => void;
  onDidDismiss?: () => void;
  message?: string;
  isOpen: boolean;
}
