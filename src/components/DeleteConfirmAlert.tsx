import React from "react";
import { IonAlert } from "@ionic/react";

const DeleteConfirmAlert: React.FC<DeleteConfirmAlertProps> = ({
  onCancel,
  onDelete,
  ...props
}) => {
  return (
    <IonAlert
      header={"Delete"}
      message={"Are you sure you want to delete this item?"}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: onCancel
        },
        {
          text: "Delete",
          cssClass: "danger",
          handler: onDelete
        }
      ]}
      {...props}
    />
  );
};

export default DeleteConfirmAlert;

interface DeleteConfirmAlertProps {
  onCancel: () => void;
  onDelete: () => void;
  onDidDismiss?: () => void;
  isOpen: boolean;
}
