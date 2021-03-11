import React, {useEffect} from "react";
import { renderAndAddProps } from "render-and-add-props";

import { useFirestoreContext } from "../Context";
import { FirestoreQuery } from "../types";

export const FirestoreDocument:React.FC<
  FirestoreQuery & {
    children: (
      {}: {
        path: string;
        value: any;
        isLoading: boolean;
      }
    ) => React.ReactNode;
  }
> = ({children, ...query}) => {
  const {dataTree, listenTo, stopListeningTo} = useFirestoreContext()
  const {path} = query; 

  function listenToNodeIfNotInContext() {
      if (path === null || path in dataTree) return;
      listenTo(query, "document");
  }
  function stopListeningToNode() {
      if (path === null || path in dataTree) return;
      stopListeningTo(path);
  }

  useEffect(() => {
    listenToNodeIfNotInContext();
    return () => {
        stopListeningToNode();
    }
  }, [path])

  if (path === null) {
    console.warn("path not provided to FirestoreNode ! Not rendering.");
    return null;
  }

  return (
    renderAndAddProps(children, {
      path,
      value: dataTree[path] && dataTree[path].value,
      isLoading: dataTree[path] && dataTree[path].isLoading
    })
  );
  
}
