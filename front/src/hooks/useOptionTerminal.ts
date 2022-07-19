import {useRecoilState} from "recoil";
import {useAnimationState} from "react-use-animation-state";
import {useCallback, useContext, useEffect} from "react";
import {optionTerminal} from "../atoms/optionTerminal";
import {OptionTerminalContext} from "../core/OptionTerminalProvider";

export const useOptionTerminal = () => {
    const context = useContext(OptionTerminalContext);

    if(context === null){
        throw new Error("not defined optionTerminal Context");
    }

    const { state, offAnimation, onAnimation } = context;

    const toggle = useCallback(() => {
        if(state === 'open' || state === 'opening'){
            offAnimation();
            return;
        }

        onAnimation();
    }, [onAnimation, offAnimation])

    const off = useCallback(() => {
        offAnimation();
    }, [offAnimation]);

    const on = useCallback(() => {
        onAnimation();
    }, [onAnimation])


    return {
        toggle,
        on,
        off,
        state
    };
}
