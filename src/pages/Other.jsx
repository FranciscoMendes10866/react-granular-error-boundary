import { useCallback, useEffect } from "react";

import { GranularErrorBoundary } from "../components/GranularErrorBoundary";

const CustomErrorBoundary = ({ tryAgain }) => {
  return (
    <div>
      <h3>Custom Error Boundary</h3>
      <p>If you see this component, an error has occurred.</p>
      <button onClick={tryAgain}>Retry</button>
    </div>
  );
};

const ComponentToThrowError = () => {
  const randomIntFromInterval = useCallback((min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }, []);

  useEffect(() => {
    const num = randomIntFromInterval(1, 5);
    if (num > 4) {
      throw new Error("SOME RANDOM ERROR");
    }
  }, [randomIntFromInterval]);

  return <p>The component has been mounted successfully</p>;
};

const Other = () => {
  const handleOnError = useCallback((catchedError) => {
    console.error(`[Granular Error Boundary]: ${catchedError}`);
  }, []);

  return (
    <div>
      <h1>This is the "Other" Page</h1>
      <GranularErrorBoundary
        fallback={(fallbackProps) => <CustomErrorBoundary {...fallbackProps} />}
        onError={handleOnError}
      >
        <ComponentToThrowError />
      </GranularErrorBoundary>
    </div>
  );
};

export default Other;
