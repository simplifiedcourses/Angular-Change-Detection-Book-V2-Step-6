import { ChildData } from "./child-data.type";

export function findNode(id: string, currentNode: ChildData) {
  let i,
      currentChild,
      result;

  if (id == currentNode.id) {
      return currentNode;
  } else {

      // Use a for loop instead of forEach to avoid nested functions
      // Otherwise "return" will not work properly
      for (i = 0; i < currentNode?.children?.length; i += 1) {
          currentChild = currentNode?.children[i];

          // Search in the current child
          result = findNode(id, currentChild);

          // Return the result if the node has been found
          if (result !== false) {
              return result;
          }
      }

      // The node has not been found and we have no more options
      return false;
  }
}

export function updateNodeTree(data: ChildData[], id: string){
  return data.map((child) => {
    if (!!(findNode(id, child))) {
      return {
        ...child,
        children: child?.children?.map((subChild) => {
          if (!!(findNode(id, subChild))) {
            return {
              ...subChild,
              children: subChild?.children?.map((subsubChild) => {
                if (!!(findNode(id, subsubChild))) {
                  return {
                    ...subsubChild,
                    label: (subsubChild.label += '!'),
                  };
                }
                return subsubChild;
              }),
            };
          }
          return subChild;
        }),
      };
    }
    return child;
  })
}