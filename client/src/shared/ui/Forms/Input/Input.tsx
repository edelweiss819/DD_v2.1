import React from 'react';
import {UseFormRegister, FieldValues, Path} from 'react-hook-form';
import classNames from 'classnames';
import styles from './Input.module.scss';

export interface InputProps<T extends FieldValues> {
    register: UseFormRegister<T>;
    name: Path<T>;
    type: string;
    required?: boolean;
    placeholder?: string;
    formType: 'input-search' | 'registration-form';
    validation?: Record<string, any>;
}

const Input = <T extends FieldValues>({
                                          register,
                                          name,
                                          required,
                                          placeholder,
                                          formType,
                                          type,
                                          validation,
                                      }: InputProps<T>): React.ReactElement => {
    const inputClass = classNames(styles['input'], {
        [styles['input-search']]: formType === 'input-search',
        [styles['input-registration-form']]: formType === 'registration-form',
    });

    return (
        <input
            className={inputClass}
            {...register(name, {required, ...validation})}
            type={type}
            placeholder={placeholder || ''}
        />
    );
};

export default Input;
