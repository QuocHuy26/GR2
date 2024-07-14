import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Routes, Switch } from "react-router-dom";

const TheContent = () => {
    const user = useSelector(state => state.user);

    return (
        <>
            <Suspense fallback={<h1>Loading ...</h1>}>
                <Routes>

                    <Route
                        path='/user'
                        element={<h1>The content</h1>}
                    />

                </Routes>
            </Suspense>
        </>
    );
};

export default React.memo(TheContent);