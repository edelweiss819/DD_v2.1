import React from 'react';

import Header from '../../shared/ui/Header/Header.tsx';
import HeaderNavigation
    from '../../shared/ui/Header/HeaderNavigation/HeaderNavigation.tsx';
import SimpleHeaderContentTemplate
    from '../../templates/SimpleHeaderContentTemplate/SimpleHeaderContentTemplate.tsx';
import Footer from '../../shared/ui/Footer/Footer.tsx';
import WheelPageContent from './WheelPageContent/WheelPageContent.tsx';


const WheelPage: React.FC = () => {


    return (
        <>
            <Header>
                <HeaderNavigation/>
                <SimpleHeaderContentTemplate pageName={'Колесо'}/>
            </Header>
            <WheelPageContent/>
            <Footer/>
        </>
    );
};

export default WheelPage;
