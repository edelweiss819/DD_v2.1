import React, {useEffect} from 'react';
import Header from '../../shared/ui/Header/Header.tsx';
import HeaderNavigation
    from '../../shared/ui/Header/HeaderNavigation/HeaderNavigation.tsx';
import HeaderContent
    from '../../shared/ui/Header/HeaderContent/HeaderContent.tsx';
import Footer from '../../shared/ui/Footer/Footer.tsx';
import Content from '../../shared/ui/Content/Content.tsx';
import GenresPageContent from './GenresPageContent/GenresPageContent.tsx';

const GenresPage: React.FC = () => {

    useEffect(() => {
        document.title = 'DD || Жанры';
    }, []);


    return (
        <>
            <Header>
                <HeaderNavigation/>
                <HeaderContent/>
            </Header>
            <Content>
                <GenresPageContent/>
            </Content>
            <Footer/>
        </>
    );
};

export default GenresPage;
