import * as React from "react";
import { FirestoreProviderState } from "./types";

export const firestoreDefaultContext = {
  listenTo: (a: any) => {},
  stopListeningTo: (path: string) => {},
  dataTree: {},
  firebase: {},
  firestore: null as any
} as FirestoreProviderState;

export const FirestoreContext = React.createContext(firestoreDefaultContext);
export const {
  Provider: FirestoreContextProvider,
  Consumer: FirestoreContextConsumer
} = FirestoreContext;

export const useFirestoreContext = () => React.useContext(FirestoreContext);
