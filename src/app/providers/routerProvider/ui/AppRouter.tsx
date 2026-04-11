import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../../../../shared/config/routeConfig/routeConfig';

const AppRouter = () => {
    return (
        <Routes>
            {Object.values(routeConfig).map((route) => {
                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                );
            })}
        </Routes>
    );
};

export default memo(AppRouter);
