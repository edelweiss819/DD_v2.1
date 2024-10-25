import React from 'react';
import styles from './SimpleHeaderContentTemplate.module.scss'
import {timestampToLocalDate} from '../../shared/utils';

export interface ISimpleHeaderLayoutProps {
    pageName?: string
    userFirstName?: string,
    userLastName?: string,
    registrationDate?: number,
}

const SimpleHeaderContentTemplate: React.FC<ISimpleHeaderLayoutProps> = ({
                                                                             pageName,
                                                                             userFirstName,
                                                                             userLastName,
                                                                             registrationDate
                                                                         }) => {
    return (
        <section className={styles.container}>
            <div className={styles['title-block']}>
                <div className={styles['title-block-title']}>
                    {pageName ?? (userFirstName + ' ' + userLastName)}
                    {registrationDate && <div
						className={styles['title-block-title-reg-date']}>На
						сайте с {timestampToLocalDate(registrationDate)}
					</div>}
                </div>
            </div>
        </section>
    );
};

export default SimpleHeaderContentTemplate;
