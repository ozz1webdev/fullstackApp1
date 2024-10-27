import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
		const [profile, setProfile] = useState(null);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(null);

		useEffect(() => {
				const token = localStorage.getItem('token');
	
				const fetchProfile = async () => {
						try {
								const response = await axios.get('/profile/',{
										headers: {
												'Content-Type': 'application/json',
												'Authorization': `Token ${token}`
										}
										});
										if (response.status === 200) {
												setProfile(response.data);
										}
								}catch(err) {
										setError(err);
								}finally {
										setLoading(false);
								}
						};
				fetchProfile();
				},[]);

		return (
				<ProfileContext.Provider value={{ profile, loading, error }}>
						{children}
				</ProfileContext.Provider>
		);
};

