import cx from 'classnames';
import React, {MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useOptionTerminal} from "../../hooks/useOptionTerminal";
import OptionTerminalHeader from "../OptionTerminalHeader";
import OptionTerminalBody from "../OptionTerminalBody";
import {OptionTerminalViewTypes} from "../../constants";
import style from './OptionTerminal.module.scss';


function OptionTerminal(){
    const [viewType, setViewType] = useState<OptionTerminalViewTypes>(OptionTerminalViewTypes.Background);
    const terminal = useRef<HTMLDivElement>(null)
    const {state} = useOptionTerminal();

    const mousePosition = useRef<null | {x: number, y: number}>(null);
    const [currentPosition, setCurrentPosition] = useState({
        x: 0,
        y: 0,
    });

    const changeViewType = (type: OptionTerminalViewTypes) => {
        setViewType(type);
    }

    const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        const {screenX, screenY} = e;
        if(mousePosition.current === null){
            mousePosition.current = {
                x: screenX,
                y: screenY
            }
            return;
        }
        const {x, y} = mousePosition.current;
        const moveX = screenX - x;
        const moveY = screenY - y;

        mousePosition.current = {
            x: screenX,
            y: screenY
        }

        setCurrentPosition((position) => {
            return {
                x: position.x + moveX,
                y: position.y + moveY
            }
        })

    }, []);

    const onMouseDown = useCallback((e) => {
        const $color_picker = document.querySelector('.sketch-picker');

        if($color_picker && $color_picker.contains(e.target)){
            return;
        }
        terminal.current!.style.cursor = 'grab';
        terminal.current!.addEventListener('mousemove', onMouseMove as any);
    }, [])

    const onMouseUp = useCallback(() => {
        terminal.current!.removeEventListener('mousemove', onMouseMove as any);
        terminal.current!.style.cursor = 'default'
        mousePosition.current = null;
    }, []);

    useEffect(() => {
        if(state === 'open'){
            window.addEventListener('mousedown',onMouseDown);
            window.addEventListener('mouseup', onMouseUp);
        }
        return () => {
            terminal.current!.removeEventListener('mousedown', onMouseDown);
            terminal.current!.removeEventListener('mouseup', onMouseDown);
        }
    }, [state]);

    const position = useMemo(() => {
        if(state === 'closing'){
            return {
                x: 0,
                y: 0,
            }
        }

        if(state === 'close'){
            return  {
                x: 0,
                y: 0,
            }
        }
        return currentPosition
    }, [state, currentPosition])

    return <div
            ref={terminal}
            className={cx(style.OptionTerminal, {
            [style['OptionTerminal--open']]: state === 'open',
            [style['OptionTerminal--opening']]: state === 'opening',
            [style['OptionTerminal--close']]: state === 'close',
            [style['OptionTerminal--closing']]: state === 'closing'
        },
                )}
            style={{
                left: position.x,
                top: position.y,
            }}
        >
            <OptionTerminalHeader
                selectedView={viewType}
                changeViewType={changeViewType}
            />
            <OptionTerminalBody
                selectedView={viewType}
            />
        </div>
}

export default OptionTerminal;
