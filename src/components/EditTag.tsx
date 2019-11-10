import React from "react";
import {
  IonContent,
  IonItem,
  IonButton,
  IonInput,
  IonLabel
} from "@ionic/react";

import useInput from "../hooks/useInput";

const EditTag: React.FC<EditTagProps> = ({ tag, saveTag }) => {
  const nameInput = useInput(tag.name);
  const colorInput = useInput(tag.color);

  function onSubmit() {
    saveTag({
      ...tag,
      name: nameInput.value,
      color: colorInput.value
    });
  }

  return (
    <IonContent>
      <h1>Edit Tag</h1>

      <IonItem>
        <IonLabel>Name</IonLabel>
        <IonInput {...nameInput} />
      </IonItem>

      <IonItem>
        <IonLabel>Color</IonLabel>
        <IonInput {...colorInput} clearOnEdit />
      </IonItem>

      <IonItem>
        <IonButton expand="block" onClick={onSubmit}>
          Save
        </IonButton>
      </IonItem>
    </IonContent>
  );
};

export default EditTag;

// Types

interface EditTagProps {
  tag: Tag;
  saveTag: (tag: Tag) => void;
}
