import { useEffect, useState } from "react";
import { loadStoredValue, storeValue } from "../utils/storage";

function usePersistentState(key, fallback) {
  const [value, setValue] = useState(() => loadStoredValue(key, fallback));

  useEffect(() => {
    storeValue(key, value);
  }, [key, value]);

  return [value, setValue];
}

export default usePersistentState;
