import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type MapBoxVrTourPageContextType = {
  isHidePopUp: boolean;
  setIsHidePopUp: Dispatch<SetStateAction<boolean>>;
};

export const MapBoxVrTourPageContext = createContext<MapBoxVrTourPageContextType>({
  isHidePopUp: false,
  setIsHidePopUp: () => {},
});

type MapBoxVrTourPageContextProps = {
  children: React.ReactNode;
};

export const MapBoxVrTourPageContextProvider: React.FC<MapBoxVrTourPageContextProps> = ({
  children,
}) => {
  const [isHidePopUp, setIsHidePopUp] = useState<boolean>(false);

  return (
    <MapBoxVrTourPageContext.Provider
      value={{
        isHidePopUp,
        setIsHidePopUp,
      }}
    >
      {children}
    </MapBoxVrTourPageContext.Provider>
  );
};

export const useMapBoxVrTourPageContext = () => useContext(MapBoxVrTourPageContext);
