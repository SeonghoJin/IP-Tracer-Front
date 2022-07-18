import {useContext} from "react";
import {ColorSettingContext} from "../core/ColorSettingProvider";

export const useColorSettings = () => {
    const colorSettingContext = useContext(ColorSettingContext);

    if(colorSettingContext === null){
        throw new Error('not found ColorSettingContext');
    }

    const {isSetting, setIsSetting} = colorSettingContext;

    return [isSetting, setIsSetting] as const;
}
