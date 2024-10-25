import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './BaseSelect.module.scss';
import classNames from 'classnames';

export interface IBaseSelectProps {
    options: Array<{ value: string, label: string }>;
    selectedValue: string;
    type: 'select-search-options';
    onChange?: (value: string) => void;
}

const BaseSelect: React.FC<IBaseSelectProps> = ({
                                                    options,
                                                    selectedValue,
                                                    onChange,
                                                    type,
                                                }) => {
    
    const [selectedOption, setSelectedOption] = useState<string>(selectedValue);

    useEffect(() => {
        setSelectedOption(selectedValue);
    }, [selectedValue]);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setSelectedOption(newValue);
        if (typeof onChange === 'function') {
            onChange(newValue);
        } else {
            console.error('onChange is not a function');
        }
    };

    const selectClass = classNames({
                                       [styles['select-search-options']]: type === 'select-search-options',
                                   });

    return (
        <select value={selectedOption} onChange={handleChange}
                className={selectClass}>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.value}
                </option>
            ))}
        </select>
    );
};

export default BaseSelect;
