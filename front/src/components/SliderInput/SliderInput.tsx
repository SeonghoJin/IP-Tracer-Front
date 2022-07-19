import React, {ChangeEvent, useState} from "react";

type Props<T extends number | string> = {
    min: T,
    max: T,
    defaultValue: T,
    step: number,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SliderInput<T extends number | string>({min, defaultValue, step, max, onChange}: Props<T>){

    const [value, setValue] = useState<number | string>(defaultValue);

    return <input
        type={'range'}
        value={value}
        min={min}
        max={max}
        defaultValue={defaultValue}
        step={step}
        onChange={(e) => {
            onChange(e);
            setValue(e.target.value);
        }}
    />
}

export default SliderInput;
