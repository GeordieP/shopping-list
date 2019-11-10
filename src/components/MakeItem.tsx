import React from "react";
import {
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonContent
} from "@ionic/react";

import TagToggle from "../components/TagToggle";
import { makeItem } from "../entities";
import useInput from "../hooks/useInput";

const MakeItem: React.FC<MakeItemProps> = ({ saveItem, tags }) => {
  const nameInput = useInput();
  const priceInput = useInput("0.00");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  function onSubmit() {
    const newItem = makeItem(nameInput.value, priceInput.value, selectedTags);
    saveItem(newItem);
  }

  function addTag(tagId: string) {
    setSelectedTags([...selectedTags, tagId]);
  }

  function removeTag(tagId: string) {
    setSelectedTags(selectedTags.filter(t => t !== tagId));
  }

  return (
    <IonContent>
      <IonItem>
        <h1>New Item</h1>
        <h2>SAV DEL</h2>
      </IonItem>
      <IonItem>
        <IonLabel>Name</IonLabel>
        <IonInput {...nameInput} />
      </IonItem>

      <IonItem>
        <IonLabel>Price</IonLabel>
        <IonInput {...priceInput} clearOnEdit />
      </IonItem>

      <IonItem>
        <h3>Tags</h3>
        {tags.map(t => {
          const toggled = selectedTags.includes(t.id);

          const onClick = () => {
            if (toggled) removeTag(t.id);
            else addTag(t.id);
          };

          return (
            <TagToggle
              key={t.id}
              name={t.name}
              color={t.color}
              toggled={toggled}
              onClick={onClick}
            />
          );
        })}
      </IonItem>

      <IonItem>
        <IonButton expand="block" onClick={onSubmit}>
          Save
        </IonButton>
      </IonItem>
    </IonContent>
  );
};

export default MakeItem;

// Types

interface MakeItemProps {
  saveItem: (item: Item) => void;
  tags: Tag[];
}
