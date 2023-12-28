import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import useSnapshotListener from "./useSnapshotListener";
import { ISanta } from "./types";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { COLLECTION_NAME } from "./constants";
import { db } from "./firestore";

// context object structure
type ContextType = {
  santas: ISanta[];
  orphans: ISanta[];
  freeSantas: ISanta[];
  notUserSantas: ISanta[];
  assignOrphan: (santaId: string, orhpanId: string) => void;
  setSantaUser: (santa: ISanta) => void;
  santaUser: ISanta | undefined;
};

// create an empty context
const AppContext = createContext<ContextType>({
  santas: [],
  orphans: [],
  freeSantas: [],
  notUserSantas: [],
  assignOrphan: () => Promise.resolve(""),
  setSantaUser: () => {},
  santaUser: undefined,
});

// context provider container
export const AppProvider = (prop: { children: React.ReactNode }) => {
  const [santaUser, setSantaUser] = useState<ISanta>();
  const santas = useSnapshotListener();

  const orphans = useMemo(
    () => santas.filter(({ santaId, id }) => santaUser?.id !== id && !santaId),
    [santas, santaUser],
  );

  const notUserSantas = useMemo(
    () => santas.filter(({ id }) => santaUser?.id !== id),
    [santas, santaUser],
  );

  const freeSantas = useMemo(
    () => santas.filter(({ childId }) => !childId),
    [santas],
  );

  const assignOrphan = useCallback(
    async (santaId: string, orphanId: string) => {
      if (!!santas.find((orphans) => orphans.santaId === santaId)) {
        throw new Error("Santa Already Assigned");
      }

      await updateDoc(doc(db, COLLECTION_NAME, orphanId), {
        santaId,
      });

      await updateDoc(doc(db, COLLECTION_NAME, santaId), {
        childId: orphanId,
      });
    },
    [santas],
  );

  return (
    <AppContext.Provider
      value={{
        santas,
        santaUser,
        setSantaUser,
        orphans,
        freeSantas,
        assignOrphan,
        notUserSantas,
      }}
    >
      {prop.children}
    </AppContext.Provider>
  );
};

// custom context hook
const useApp = () => useContext(AppContext) as ContextType;

export default useApp;
