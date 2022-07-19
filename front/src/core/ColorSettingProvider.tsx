import React, { useState } from "react";

export const ColorSettingContext = React.createContext<{
  isSetting: boolean;
  setIsSetting: (flag: boolean) => void;
} | null>(null);

type Props = {
  children: React.ReactNode;
};

export function ColorSettingsProvider({ children }: Props) {
  const [isSetting, setIsSetting] = useState(false);

  return (
    <ColorSettingContext.Provider
      value={{
        isSetting,
        setIsSetting,
      }}
    >
      {children}
    </ColorSettingContext.Provider>
  );
}
