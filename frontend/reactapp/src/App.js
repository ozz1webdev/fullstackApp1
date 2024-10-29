import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import TestPage from './pages/testpage';
import AboutPage from './pages/aboutpage';
import LoginPage from './pages/auth/loginpage';
import LogoutPage from './pages/auth/logoutpage';
import TeacherPage from './pages/teacherpage';
import AdminPage from './pages/adminpage';
import StudentPage from './pages/studentpage';
import ContactPage from './pages/contactpage';
import NavigationBar from './components/navigationbar';
import Posts from './pages/posts';
import UserProfile from './pages/profile';


function App() {

	return (
    <>
			<Router>
				<NavigationBar />
				<Routes>
						<Route exact path="/" element={<HomePage />} />
						<Route path="/homepage" element={<HomePage />} />
						<Route path="/posts" element={<Posts />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/test" element={<TestPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/logout" element={<LogoutPage />} />
						<Route path="/profile" element={< UserProfile />} />
						<Route path="/teacherpage" element={<TeacherPage />} />
						<Route path="/adminpage" element={<AdminPage />} />
						<Route path="/studentpage" element={<StudentPage />} />
						<Route path="/contact" element={<ContactPage />} />
						<Route path="/*" element={<HomePage />} />
				</Routes>
		</Router>

	</>
  );
}

export default App;
