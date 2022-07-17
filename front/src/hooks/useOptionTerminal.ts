import {useRecoilState} from "recoil";
import {useAnimationState} from "react-use-animation-state";
import {useCallback, useEffect} from "react";
import {optionTerminal} from "../atoms/appNavigationState";

export const useOptionTerminal = () => {
    const [isOpen, setIsOpen] = useRecoilState(optionTerminal);

    const {
        state,
        onAnimation,
        offAnimation
    } = useAnimationState('close', {
        onAnimationTime: 1000,
        offAnimationTime: 1000,
        onPreemption: true,
        offPreemption: true
    });

    useEffect(() => {
        setIsOpen(state === 'opening' || state === 'open');
    }, [state]);

    const toggle = useCallback(() => {
        if(isOpen){
            offAnimation();
            return;
        }

        onAnimation();
    }, [isOpen, onAnimation, offAnimation])

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
        isOpen
    };
}
