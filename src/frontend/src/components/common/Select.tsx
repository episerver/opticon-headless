import React from "react";
import TextValue from "@models/common/TextValue";

interface SelectProps {
    id: string;
    className?: string;
    options: TextValue[];
    value?: string;
    onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = (props) => {
    return (
        <select
            id={`select-${props.id}`}
            className={`${props.className} form-select rounded-md border border-inherit dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 px-4 py-2 w-full`}
            onChange={(e) => props.onChange(e.target.value)}
        >
            {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.text}
                </option>
            ))}
        </select>
    );
};

export default Select;
