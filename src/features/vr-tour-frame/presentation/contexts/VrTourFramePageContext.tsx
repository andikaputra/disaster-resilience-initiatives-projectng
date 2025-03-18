import { createContext, LegacyRef, useContext, useRef } from 'react';

type VrTourFramePageContextType = {
  simulationPlacesRef: any;
};

export const VrTourFramePageContext = createContext<VrTourFramePageContextType>({
  simulationPlacesRef: {} as LegacyRef<HTMLDivElement> | undefined,
});

type VrTourFramePageContextProps = {
  children: React.ReactNode;
};

export const VrTourFramePageContextProvider: React.FC<VrTourFramePageContextProps> = ({
  children,
}) => {
  const simulationPlacesRef = useRef(null);

  return (
    <VrTourFramePageContext.Provider
      value={{
        simulationPlacesRef,
      }}
    >
      {children}
    </VrTourFramePageContext.Provider>
  );
};

export const useVrTourFramePageContext = () => useContext(VrTourFramePageContext);
