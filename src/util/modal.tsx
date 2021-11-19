import {CSSProperties, FC, ReactChildren} from "react";

type ModalProps = {
    style?: CSSProperties;
    active: boolean
}

export const Modal : FC<ModalProps>= ({style, children, active}) => {

    return (active && (
        <>
        <div style={{
            position: "fixed",
            width: '100%',
            height: '100%',
            backgroundColor: 'rgb(0,0,0, 0.5)',
            zIndex: 1000,
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={style}>
                {children}
            </div>
        </div>
        </>
        ) || <></>)
}

Modal.defaultProps = {
    style : undefined
}