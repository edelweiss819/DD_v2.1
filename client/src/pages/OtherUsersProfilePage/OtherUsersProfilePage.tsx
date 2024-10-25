import React, {useEffect} from 'react';
import Header from '../../shared/ui/Header/Header.tsx';
import HeaderNavigation
    from '../../shared/ui/Header/HeaderNavigation/HeaderNavigation.tsx';
import Footer from '../../shared/ui/Footer/Footer.tsx';
import Content from '../../shared/ui/Content/Content.tsx';
import SimpleHeaderContentTemplate
    from '../../templates/SimpleHeaderContentTemplate/SimpleHeaderContentTemplate.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';
import {useFetchOtherUser} from '../../entities/users';
import {useParams} from 'react-router';
import OtherUsersProfilePageContent
    from './OtherUsersProfilePageContent/OtherUsersProfilePageContent.tsx';
import {decodeUserToken} from '../../shared/utils';
import {useNavigate} from 'react-router-dom';


const OtherUsersProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const {token} = useSelector((state: RootState) => state.user);
    const {index} = useParams();
    const decodedUserToken = decodeUserToken(token!);


    const {
        data: otherUser,
        isLoading
    } = useFetchOtherUser(token!, [
        'firstName',
        'lastName',
        'registrationDate',
    ], Number(index));


    const userFullName = otherUser?.user.firstName && otherUser?.user.lastName
        ? `${otherUser.user.firstName} ${otherUser.user.lastName}`
        : '';

    useEffect(() => {
        if (userFullName) {
            document.title = `DD || ${userFullName}`;
        }
    }, [userFullName]);


    const user = {
        firstName: otherUser?.user.firstName || 'Неизвестное имя',
        lastName: otherUser?.user.lastName || 'Неизвестная фамилия',
        registrationDate: otherUser?.user.registrationDate || -1,
    }

    useEffect(() => {
        if (decodedUserToken.index === Number(index)) {
            navigate('/profile');
        }
    }, [
                  decodedUserToken.index,
                  index,
                  navigate
              ]);

    if (isLoading) {
        return null;
    }

    return (

        <>
            <Header>
                <HeaderNavigation/>
                <SimpleHeaderContentTemplate userFirstName={user.firstName}
                                             userLastName={user.lastName}
                                             registrationDate={user.registrationDate}/>
            </Header>
            <Content>
                <OtherUsersProfilePageContent/>
            </Content>
            <Footer/>
        </>
    );
};

export default OtherUsersProfilePage;
