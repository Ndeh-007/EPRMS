import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import PageHeader from "../components/PageHeader";
import { capitalizeString } from "../Functions/functions";
import "../styles/Page.css";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string; mode?: string }>();

  return (
    <IonPage>
      <PageHeader name={name}></PageHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
