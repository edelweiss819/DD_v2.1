import React from 'react';
import HeaderNavigation
    from '../../shared/ui/Header/HeaderNavigation/HeaderNavigation.tsx';
import HeaderContent
    from '../../shared/ui/Header/HeaderContent/HeaderContent.tsx';
import Header from '../../shared/ui/Header/Header.tsx';

const MainHeaderLayout: React.FC = () => {
    return (
        <Header>
            <HeaderNavigation/>
            <HeaderContent/>
        </Header>
    );
};

export default MainHeaderLayout;
