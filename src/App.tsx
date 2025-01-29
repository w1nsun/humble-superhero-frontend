import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SuperHeroForm from './pages/SuperHeroForm';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/create" element={<SuperHeroForm />} />
            </Routes>
        </>
    );
}

export default App;
