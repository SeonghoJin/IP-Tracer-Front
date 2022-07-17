import React from "react";
import {useAnimationState} from "react-use-animation-state";


export const OptionTerminalContext = React.createContext<ReturnType<typeof useAnimationState> | null>(null);

type Props = {
    children: React.ReactNode;
};

export function OptionTerminalProvider ({ children }: Props) {

    const {onAnimation, offAnimation, state} = useAnimationState('close', {
        onPreemption: true,
        offPreemption: true,
        offAnimationTime: 500,
        onAnimationTime: 500,
    })

    return (
        <OptionTerminalContext.Provider value={{
            offAnimation,
            onAnimation,
            state
        }}>
            {children}
        </OptionTerminalContext.Provider>
    );
}
