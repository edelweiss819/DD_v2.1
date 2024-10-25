import React from 'react';
import BaseModal from '../BaseModal.tsx';
import Button from '../../../Button/Button.tsx';
import styles from './DeleteConfirmationModal.module.scss'
import {useParams} from 'react-router';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../store/store.ts';
import {
    useDeleteSingleArticleByIndex
} from '../../../../../entities/articles';
import {useNavigate} from 'react-router-dom';
import {ModalType} from '../BaseModal.enums.ts';
import {ButtonColor, ButtonType} from '../../../Button/Button.enums.ts';


interface DeleteConfirmationModalProps {
    closeSetter: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({closeSetter}) => {
    const {index} = useParams();
    const {token} = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();


    const {mutate} = useDeleteSingleArticleByIndex();

    const handleDeleteButtonClick = () => {
        if (index && token) {
            mutate({
                       index,
                       token
                   });
        }
        navigate(-1);
    };

    const handleCancelButtonClick = () => {
        closeSetter(false);
    };

    return (
        <BaseModal modalType={ModalType.CENTERED} closeSetter={closeSetter}>
            <div className={styles['container']}>
                <span
                    className={styles['container-title']}>Удалить статью?</span>
                <div className={styles['container-button-block']}>
                    <Button text={'Удалить'} type={ButtonType.MEDIUM}
                            color={ButtonColor.BLUE}
                            onClick={handleDeleteButtonClick}/>
                    <Button text={'Отмена'} type={ButtonType.MEDIUM}
                            color={ButtonColor.RED}
                            onClick={handleCancelButtonClick}/>
                </div>
            </div>
        </BaseModal>
    );
};

export default DeleteConfirmationModal;

