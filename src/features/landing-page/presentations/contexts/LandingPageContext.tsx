import { createContext, LegacyRef, useContext, useRef } from 'react';
import { LandingPageServerSideProps } from '../../domain/types';

type LandingPageContextType = {
  simulationPlacesRef: any;
};

export const LandingPageContext = createContext<LandingPageContextType>({
  simulationPlacesRef: {} as LegacyRef<HTMLDivElement> | undefined,
});

type LandingPageContextProps = {
  children: React.ReactNode;
};

export const LandingPageContextProvider: React.FC<LandingPageContextProps> = ({ children }) => {
  const simulationPlacesRef = useRef(null);

  return (
    <LandingPageContext.Provider
      value={{
        simulationPlacesRef,
      }}
    >
      {children}
    </LandingPageContext.Provider>
  );
};

export const useLandingPageContext = () => useContext(LandingPageContext);
