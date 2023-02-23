import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoute } from "./routes";
import DefaultLayout from "./layout/DefaultLayout";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        if (location.pathname === "/") location.pathname = "/login";
    }, [location.pathname]);

    return (
        <Router>
            <Routes>
                {publicRoute.map((route, index) => {
                    const WrapComponent = DefaultLayout;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <WrapComponent>
                                    <Page />
                                </WrapComponent>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
