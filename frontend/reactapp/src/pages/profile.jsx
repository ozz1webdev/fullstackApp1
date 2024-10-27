import React from 'react';
import { useProfile } from '../components/ProfileContext';
import style from '../assets/css/profile.module.css';

function UserProfile() {

		const {profile, loading, error } = useProfile();

		if (loading) return <p>Loading ...</p>
		if(error) return <p>Error loading profile data.</p>

		return(
		<>
				<h1>{profile.name} Profile</h1>
				<p>id : {profile.id}</p>
				<p>owner : {profile.owner}</p>
				<p>name :  {profile.name}</p>
				<p>lastname : {profile.lastname}</p>
				<p>email : {profile.email} </p>
				<p>role : {profile.role} </p>
				<p>Profile Image : <img className={style.profileimg} src={profile.profileImage} alt="profile" width="800" height="600"/></p>
				<p>Created_at : {profile.created_at} </p>
				<p>Updated_at : {profile.updated_at} </p>
		</>
		);
}

export default UserProfile
