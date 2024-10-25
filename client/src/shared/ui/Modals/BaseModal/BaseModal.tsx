import React from 'react';
import styles from './BaseModal.module.scss';
import classNames from 'classnames';
import {ModalType} from './BaseModal.enums.ts';


interface BaseModalProps {
    modalType: ModalType;
    closeSetter: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({
                                                 modalType,
                                                 children,
                                                 closeSetter
                                             }) => {
    const handleClose = () => {
        closeSetter(false);
    }

    const backgroundClass = classNames({
                                           [styles['modal-centered-background']]: modalType === ModalType.CENTERED,
                                       });

    const windowClass = classNames({
                                       [styles['modal-centered-window']]: modalType === ModalType.CENTERED,
                                   })
    const closeElement = classNames({
                                        [styles['modal-centered-close-element']]: modalType === ModalType.CENTERED,
                                    })

    return (
        <div className={backgroundClass}>
            <div className={windowClass}>
                <span className={closeElement} onClick={handleClose}>X</span>
                {children}
            </div>
        </div>
    );
};

export default BaseModal;
