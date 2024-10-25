import React from 'react';
import styles from './ErrorMesage.module.scss';
import {IRegistrationForm} from '../RegistationForm';

const ErrorMessage: React.FC<{
    field: keyof IRegistrationForm;
    errors: any;
}> = ({
          field,
          errors
      }) => {
    return (
        <>
            {errors[field] &&
				<div className={styles['error']}>{errors[field].message}</div>}
        </>
    );
};

export default ErrorMessage