import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';

export interface AdminPanelPageHeaderProps {
    setIsUserControl: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminPanelPageHeader: React.FC<AdminPanelPageHeaderProps> = ({setIsUserControl}) => {
    const navigate = useNavigate();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    Панель управления
                </Typography>
                <Box sx={{
                    display: 'flex',
                    gap: 1
                }}>
                    <Button color="secondary"
                            variant="contained"
                            onClick={() => setIsUserControl(true)}>Пользователи
                    </Button>
                    <Button variant="contained"
                            color="secondary"
                            onClick={() => setIsUserControl(false)}>Статьи</Button>
                    <Button color="warning" variant="contained"
                            onClick={() => navigate('/')}>Выход</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AdminPanelPageHeader;
