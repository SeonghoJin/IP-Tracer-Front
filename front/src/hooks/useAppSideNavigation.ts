import {useRecoilState} from "recoil";
import {useAnimationState} from "react-use-animation-state";
import {appNavigationState} from "../atoms/appNavigationState";

export const useAppSideNavigation = () => {
    const {
        state,
        onAnimation,
        offAnimation
    }= useAnimationState('close');

    const [isOpen, setIsOpen] = useRecoilState(appNavigationState);

    setIsOpen(state === 'opening' || state === 'open');

    const on = onAnimation;
    const off = offAnimation;

    return {
        on,
        off,
        isOpen
    };
}
