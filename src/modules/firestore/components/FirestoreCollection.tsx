import React, { useEffect } from "react";
import { renderAndAddProps } from "render-and-add-props";
import get from "lodash/get";
import { useFirestoreContext } from "../Context";
import { FirestoreQuery } from "../types";

export const FirestoreCollection: React.FC<
  FirestoreQuery & {
    children: (
      {}: {
        path: string;
        value: any;
        ids: string[];
        isLoading: boolean;
      }
    ) => React.ReactNode;
  }
> = React.memo(({children, ...query}) => {
  const { dataTree, listenTo, stopListeningTo} = useFirestoreContext()
  const { path } = query;
  
  function listenToNode() {
    if (path === null) return;
    listenTo(query, "collection");
  }
  function stopListeningToNode() {
    if (path === null || path in dataTree) return;
    stopListeningTo(path);
  }

  useEffect(() => {
    listenToNode();
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
      ids: dataTree[path] && dataTree[path].ids,
      isLoading: dataTree[path] && dataTree[path].isLoading
    })
  );

}, (prev, next) => {
    const propsThatCanChange = [
      "path",
      "limit",
      "startAfter",
      "startAt",
      "endAt",
      "endBefore",
      "where",
      "orderBy"
    ];
    for (let propName of propsThatCanChange) {
      //@ts-ignore
      if (prev[propName] !== next[propName]) {
        return false;
      }
    }
    return true;
})
