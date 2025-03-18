import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

type SimulationPlacePageContextType = {
  modalState: readonly [
    boolean,
    {
      readonly open: () => void;
      readonly close: () => void;
      readonly toggle: () => void;
    },
  ];
};

export const SimulationPlacePageContext = createContext<SimulationPlacePageContextType>({
  modalState: [false, { open: () => {}, close: () => {}, toggle: () => {} }],
});

type MapBoxVrTourPageContextProps = {
  children: React.ReactNode;
};

export const SimulationPlacePageContextProvider: React.FC<MapBoxVrTourPageContextProps> = ({
  children,
}) => {
  const modalState: readonly [
    boolean,
    {
      readonly open: () => void;
      readonly close: () => void;
      readonly toggle: () => void;
    },
  ] = useDisclosure(false);

  return (
    <SimulationPlacePageContext.Provider value={{ modalState }}>
      {children}
    </SimulationPlacePageContext.Provider>
  );
};

export const useSimulationPlacePageContext = () => useContext(SimulationPlacePageContext);
