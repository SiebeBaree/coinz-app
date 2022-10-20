import { Routes, Route } from 'react-router-dom'

import Navbar from './pages/components/Navbar'
import Footer from './pages/components/Footer'

import Home from './pages/Home.jsx'
import Faq from './pages/Faq.jsx'
import Commands from './pages/Commands.jsx'
import Store from './pages/Store.jsx'
import Discord from './pages/Discord.jsx'
import Invite from './pages/Invite.jsx'

function App() {
    return (
        <>
            <Navbar />
            <div className="page-content">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/commands" element={<Commands />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/ban-appeal" element={<Store />} />
                    <Route path="/suggest" element={<Store />} />
                    <Route path="/report" element={<Store />} />
                    <Route path="/discord" element={<Discord />} />
                    <Route path="/invite">
                        <Route index element={<Invite />} />
                        <Route path=":id" element={<Invite />} />
                    </Route>
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default App
