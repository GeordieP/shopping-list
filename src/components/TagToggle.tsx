import React from "react";
import { IonChip } from "@ionic/react";

const TagToggle: React.FC<TagToggleProps> = ({
  name,
  color,
  toggled,
  onClick
}) => {
  // TODO: use color
  return (
    <IonChip onClick={onClick} outline={toggled}>
      {name}
    </IonChip>
  );
};

export default TagToggle;

// Types

interface TagToggleProps {
  name: string;
  color: string;
  toggled: boolean;
  onClick: () => void;
}
