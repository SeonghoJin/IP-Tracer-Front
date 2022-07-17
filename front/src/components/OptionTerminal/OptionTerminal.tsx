import cx from 'classnames';
import React, {MouseEventHandler, useCallback, useEffect, useRef, useState} from "react";
import {useOptionTerminal} from "../../hooks/useOptionTerminal";
import {useMapPixelSize} from "../../hooks/useMapPixelSize";
import {useMapDotType} from "../../hooks/useMapDotType";
import {useMapBackgroundColor} from "../../hooks/useMapBackgroundColor";
import {useMapGapSize} from "../../hooks/useMapGapSize";
import {useMapPixelColor} from "../../hooks/useMapPixelColor";
import style from './OptionTerminal.module.scss';

function OptionTerminal(){

    const terminal = useRef<HTMLDivElement>(null)
    const {isOpen} = useOptionTerminal();
    const {setMapPixelSize} = useMapPixelSize();
    const {setPixelColor} = useMapPixelColor();
    const {setMapDotType} = useMapDotType();
    const {setBackgroundColor} = useMapBackgroundColor();
    const {setMapGapSize} = useMapGapSize();

    const mousePosition = useRef<null | {x: number, y: number}>(null);
    const [currentPosition, setCurrentPosition] = useState({
        x: 0,
        y: 0,
    });

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

    const onMouseDown = useCallback(() => {
        terminal.current!.addEventListener('mousemove', onMouseMove as any);
    }, [])

    const onMouseUp = useCallback(() => {
        terminal.current!.removeEventListener('mousemove', onMouseMove as any);
        mousePosition.current = null;
    }, [])

    useEffect(() => {
        if(isOpen === true){
            terminal.current!.addEventListener('mousedown',onMouseDown);
            terminal.current!.addEventListener('mouseup', onMouseUp);
        }
        return () => {
            terminal.current!.removeEventListener('mousedown', onMouseDown);
            terminal.current!.removeEventListener('mouseup', onMouseDown);
        }
    }, [isOpen]);

    return <>
        <div
            ref={terminal}
            className={cx(style.SideNavigation, {
            [style['SideNavigation--open']]: isOpen,
            [style['SideNavigation--close']]: !isOpen
        },
                )}
            style={{
                left: currentPosition.x,
                top: currentPosition.y,
            }}
        >
            background
            <input onChange={(e) => {
                setBackgroundColor(e.target.value);
            }}/>
            gapSize
            <input onChange={(e) => {
                setMapGapSize(parseInt(e.target.value));
            }}/>
            pixelColor
            <input onChange={(e) => {
                setPixelColor(e.target.value);
            }}/>
            pixelSize
            <input onChange={(e) => {
                setMapPixelSize(parseInt(e.target.value));
            }}/>
            dotType
            <input onChange={(e) => {
                setMapDotType(e.target.value);
            }}/>
        </div>
    </>
}

export default OptionTerminal;
