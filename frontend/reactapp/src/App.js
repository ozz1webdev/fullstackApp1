import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import TestPage from './pages/testpage';
import AboutPage from './pages/aboutpage';
import LoginPage from './pages/auth/loginpage';
import LogoutPage from './pages/auth/logoutpage';
import NavigationBar from './components/navigationbar';
import UserProfile from './pages/profile';


function App() {
	return (
    <>
			<Router>
				<NavigationBar />
				<Routes>
						<Route exact path="/" element={<HomePage />} />
						<Route path="/homepage" element={<HomePage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/test" element={<TestPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/logout" element={<LogoutPage />} />
						<Route path="/profile" element={< UserProfile/>} />
						<Route path="/*" element={<LoginPage />} />
				</Routes>
		</Router>

	< />
  );
}

export default App;
