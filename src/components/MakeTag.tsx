import React from "react";
import {
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonContent
} from "@ionic/react";

import { makeTag } from "../entities";
import useInput from "../hooks/useInput";

const MakeTag: React.FC<MakeTagProps> = ({ saveTag }) => {
  const nameInput = useInput();
  const colorInput = useInput("#04c");

  function onSubmit() {
    const newTag = makeTag(nameInput.value, colorInput.value);
    saveTag(newTag);
  }

  return (
    <IonContent>
      <IonItem>
        <h1>New Tag</h1>
        <h2>SAV DEL</h2>
      </IonItem>
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

export default MakeTag;

// Types

interface MakeTagProps {
  saveTag: (tag: Tag) => void;
}
