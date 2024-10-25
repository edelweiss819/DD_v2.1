import React from 'react';

export interface AdminPanelPageContent {
    children?: React.ReactNode;
}

const AdminPanelPageContent: React.FC<AdminPanelPageContent> = ({children}) => {
    return (
        <>
            {children}
        </>
    );
};

export default AdminPanelPageContent;
