import React, {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import {HEADER_NAVIGATION_PAGES} from '../constants';
import PrivateRoute
    from '../features/protectedRoutes/components/PrivateRoutes.tsx';
import PageLoader from '../shared/ui/Loaders/PageLoader/PageLoader.tsx';
import AdminRoutes
    from '../features/protectedRoutes/components/AdminRoutes.tsx';


const MainPage = React.lazy(() => import('../pages/MainPage/MainPage.tsx'));
const SingleArticlePage = React.lazy(() => import('../pages/SingleArticlePage/SingleArticlePage.tsx'));
const GenresPage = React.lazy(() => import('../pages/GenresPage/GenresPage.tsx'));
const SingleGenrePage = React.lazy(() => import('../pages/SingleGenrePage/SingleGenrePage.tsx'));
const SearchPage = React.lazy(() => import('../pages/SearchPage/SearchPage.tsx'));
const SignUpPage = React.lazy(() => import('../pages/SignUpPage/SignUpPage.tsx'));
const SignInPage = React.lazy(() => import('../pages/SignInPage/SignInPage.tsx'));
const ProfilePage = React.lazy(() => import('../pages/ProfilePage/ProfilePage.tsx'));
const WheelPage = React.lazy(() => import('../pages/WheelPage/WheelPage.tsx'));
const OtherUsersProfilePage = React.lazy(() => import('../pages/OtherUsersProfilePage/OtherUsersProfilePage.tsx'));
const AdminPanelPage = React.lazy(() => import('../pages/AdminPanelPage/AdminPanelPage.tsx'));

const AppRoutes: React.FC = () => {


    return (
        <Suspense fallback={<PageLoader/>}>
            <Routes>
                <Route path={HEADER_NAVIGATION_PAGES['Главная']}
                       element={<MainPage/>}/>
                <Route path="articles/:index" element={<SingleArticlePage/>}/>
                <Route path={HEADER_NAVIGATION_PAGES['Жанры']}
                       element={<GenresPage/>}/>
                <Route path="/genres/:genre" element={<SingleGenrePage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path={'/sign_up'} element={<SignUpPage/>}/>
                <Route path={'/sign_in'} element={<SignInPage/>}/>
                <Route path={'/wheel'} element={<WheelPage/>}/>
                <Route path={'/user/:index'}
                       element={
                           <PrivateRoute>
                               <OtherUsersProfilePage/>
                           </PrivateRoute>
                       }/>
                <Route
                    path={'/profile'}
                    element={
                        <PrivateRoute>
                            <ProfilePage/>
                        </PrivateRoute>
                    }
                />
                <Route path={'/admin-panel'} element={
                    <AdminRoutes>
                        <AdminPanelPage/>
                    </AdminRoutes>
                }/>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
