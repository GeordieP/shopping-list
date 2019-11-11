import React from "react";
import {
  IonChip,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonCard,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/react";

/*
const old = (


          <IonRow>
            <IonCol>
              <h1>{item.name}</h1>
            </IonCol>
            <IonCol>
              <p>{item.price}</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {tags.map(t => (
                <IonChip
                  key={t.id}
                  outline
                  color="primary"
                  style={{ padding: "5px", height: "22px", fontSize: "8pt" }}
                >
                  {t.name}
                </IonChip>
              ))}
            </IonCol>
          </IonRow>
)
*/

const Mychip = (props: any) => (
  <IonChip
    outline
    color="primary"
    style={{ padding: "5px", height: "22px", fontSize: "8pt" }}
  >
    test chip
  </IonChip>
);

const ListItem: React.FC<ListItemProps> = ({
  item,
  tags,
  onAddToList,
  onEdit,
  onDelete
}) => {
  return (
    <IonItemSliding>
      <IonItemOptions side="start">
        <IonItemOption color="primary" onClick={onEdit}>
          Edit Item
        </IonItemOption>
      </IonItemOptions>

      <IonCard onClick={onAddToList} style={{ margin: "8px 10px" }}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonRow>
                <IonCol style={{ background: "#f0f" }}>Title, Price</IonCol>
              </IonRow>
              <IonRow>
                <IonCol
                  style={{
                    overflowX: "auto",
                    height: "30px"
                  }}
                >
                  <Mychip />
                  <Mychip />
                  <Mychip />
                  <Mychip />
                  <Mychip />
                  <Mychip />
                  <Mychip />
                  <Mychip />
                  <Mychip />
                </IonCol>
              </IonRow>
            </IonCol>

            <IonCol size="3" style={{ background: "#0f0" }}>
              Add Button
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={onDelete}>
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default ListItem;

// Types

interface ListItemProps {
  item: Item;
  tags: Tag[];
  onAddToList: () => void;
  onEdit: () => void;
  onDelete: () => void;
}
