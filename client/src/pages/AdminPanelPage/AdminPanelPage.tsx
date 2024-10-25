import React, {useEffect, useState} from 'react';
import AdminPanelPageHeader
    from './AdminPanelPageHeader/AdminPanelPageHeader.tsx';
import AdminPanelPageContent
    from './AdminPanelPageContent/AdminPanelPageContent.tsx';
import AdminPanelPageContentUsersControl
    from './AdminPanelPageContent/AdminPageContentUsersControl/AdminPageContentUsersControl.tsx';
import AdminPanelPageContentArticlesControl
    from './AdminPanelPageContent/AdminPageContentArticlesControl/AdminPageContentArticlesControl.tsx';

const AdminPanelPage: React.FC = () => {
    const [isUserControl, setIsUserControl] = useState<boolean>(false);
    useEffect(() => {
        document.title = 'DD || Панель управления'
    }, []);

    return (
        <>
            <AdminPanelPageHeader setIsUserControl={setIsUserControl}/>
            <AdminPanelPageContent>
                {isUserControl ? <AdminPanelPageContentUsersControl/> :
                    <AdminPanelPageContentArticlesControl/>}
            </AdminPanelPageContent>
        </>
    );
};

export default AdminPanelPage;
