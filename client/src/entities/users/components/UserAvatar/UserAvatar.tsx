import React from 'react';
import DefaultAvatar
    from '../../../../assets/Avatars/DefaultAvatar/DefaultAvatar.svg?react';
import {Link} from 'react-router-dom';
import styles from './UserAvatar.module.scss';


type AvatarType = string | React.FC<React.SVGProps<SVGSVGElement>>;

export interface UserAvatarProps {
    avatarUrl: AvatarType; 
    userIndex: number;
    width?: number;
    height?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
                                                   avatarUrl,
                                                   userIndex,
                                                   width = 24,
                                                   height = 24,
                                               }) => {
    const avatarSrc: AvatarType = avatarUrl === 'defaultAvatar' ? DefaultAvatar : avatarUrl;

    return (
        <Link to={`/user/${userIndex}`}>
            {typeof avatarSrc === 'string' ? (
                <img
                    className={styles['user-avatar-container']}
                    src={avatarSrc}
                    width={width}
                    height={height}
                    alt="User Avatar"
                />
            ) : (
                React.createElement(avatarSrc, {
                    width,
                    height
                })
            )}
        </Link>
    );
};

export default UserAvatar;
