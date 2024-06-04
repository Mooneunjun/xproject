import { useState } from "react";

function useAsync(asyncFuntion) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = async (...args) => {
    try {
      setError(null);
      setPending(true);
      return await asyncFuntion(...args);
    } catch (error) {
      setError(error);
      return;
    } finally {
      setPending(false);
    }
  };
  return [];
}

export default useAsync;
