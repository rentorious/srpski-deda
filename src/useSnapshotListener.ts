import { useEffect, useState } from "react";
import { ISanta } from "./types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firestore";
import { COLLECTION_NAME } from "./constants";

export default function useSnapshotListener() {
  const [data, setData] = useState<ISanta[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, COLLECTION_NAME), (snap) => {
      return setData(snap.docs.map((doc) => doc.data() as ISanta));
    });

    return () => {
      unsub();
    };
  }, []);

  return data;
}
