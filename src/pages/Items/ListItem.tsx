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
  IonCol,
  IonButton,
  IonIcon
} from "@ionic/react";
import { albums } from "ionicons/icons";

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

const MyChipProps = {
  outline: true,
  color: "primary",
  style: { padding: "5px", height: "22px", fontSize: "8pt" }
};

/* const ListItem: React.FC<ListItemProps> = ({
 *   item,
 *   tags,
 *   onAddToList,
 *   onEdit,
 *   onDelete
 * }) => {
 *   return (
 *     <IonItemSliding>
 *       <IonItemOptions side="start">
 *         <IonItemOption color="primary" onClick={onEdit}>
 *           Edit Item
 *         </IonItemOption>
 *       </IonItemOptions>
 *
 *       <IonCard onClick={onAddToList} style={{ margin: "8px 10px" }}>
 *         <IonGrid>
 *           <IonRow class="ion-justify-content-between">
 *             <IonCol size="8">
 *               <IonRow>
 *                 <IonCol style={{}}>Title, Price</IonCol>
 *               </IonRow>
 *               <IonRow>
 *                 <IonCol>
 *                   <Mychip />
 *                   <Mychip />
 *                   <Mychip />
 *                   <Mychip value="..." />
 *                 </IonCol>
 *               </IonRow>
 *             </IonCol>
 *             <IonCol size="2">
 *               <IonButton
 *                 fill="outline"
 *                 style={{
 *                   height: "100%"
 *                 }}
 *               >
 *                 Add
 *               </IonButton>
 *             </IonCol>
 *           </IonRow>
 *         </IonGrid>
 *       </IonCard>
 *
 *       <IonItemOptions side="end">
 *         <IonItemOption color="danger" onClick={onDelete}>
 *           Delete
 *         </IonItemOption>
 *       </IonItemOptions>
 *     </IonItemSliding>
 *   );
 * };
 *  */
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

      <IonCard
        style={{
          marginTop: "9px",
          marginBottom: "9px",
          padding: 0,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div
          className="Wrap"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px"
          }}
        >
          <div className="DetailsColumn">
            <div className="DetailText">
              <h1 style={{ margin: "4px 0" }}>{item.name}</h1>
              <h5 style={{ margin: "4px 0" }}>{item.price}</h5>
            </div>
            <div className="DetailTags">
              {tags.map(t => (
                <IonChip key={t.id} {...MyChipProps}>
                  {t.name}
                </IonChip>
              ))}
            </div>
          </div>

          <div
            className="ButtonColumn"
            style={{ display: "flex", alignItems: "center" }}
          >
            <IonButton
              fill="outline"
              color="primary"
              style={{
                width: "4em",
                height: "80%",
                margin: 0
              }}
              onClick={onAddToList}
            >
              <IonIcon icon={albums} />
            </IonButton>
          </div>
        </div>
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
