import { useCallback, useEffect, useState } from "react";

function useAsyncData(loader, dependencies = []) {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: true,
  });

  const execute = useCallback(async () => {
    setState({ data: null, error: null, loading: true });
    try {
      const data = await loader();
      setState({ data, error: null, loading: false });
    } catch (error) {
      setState({ data: null, error, loading: false });
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return {
    ...state,
    reload: execute,
  };
}

export default useAsyncData;
