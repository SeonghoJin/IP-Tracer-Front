import {useRecoilState} from "recoil";
import {useAnimationState} from "react-use-animation-state";
import {useCallback, useEffect} from "react";
import {appNavigationState} from "../atoms/appNavigationState";

export const useAppSideNavigation = () => {
    const [isOpen, setIsOpen] = useRecoilState(appNavigationState);

    const {
        state,
        onAnimation,
        offAnimation
    } = useAnimationState('close', {
        onAnimationTime: 300,
        offAnimationTime: 300,
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
