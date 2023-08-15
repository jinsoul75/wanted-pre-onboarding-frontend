import { Route, Routes } from 'react-router-dom';

import Signup from './Signup';

export default function Router() {
    return(
        <Routes>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
    )
}