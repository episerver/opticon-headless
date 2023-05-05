import React from "react";

interface RadioProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (val: string) => void;
}

const Radio: React.FC<RadioProps> = (props) => {
    return (
        <div className="flex items-center mb-4">
            <input
                id={`radio-${props.id}`}
                type="radio"
                className="w-4 h-4 form-radio"
                onChange={(e) => props.onChange(e.target.value)}
                checked={props.checked}
            />
            <label htmlFor={`radio-${props.id}`} className="ml-2 font-medium text-gray-900 dark:text-gray-300">
                {props.label}
            </label>
        </div>
    );
};

export default Radio;
