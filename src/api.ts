import { doc, setDoc } from "firebase/firestore";
import data from "./data.json";
import { COLLECTION_NAME } from "./constants";
import { db } from "./firestore";

export const init = () => {
  return Promise.all(
    data.map((santa) => setDoc(doc(db, COLLECTION_NAME, santa.id), santa)),
  );
};

export const findAll = () => {};
