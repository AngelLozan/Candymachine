import React from 'react';

interface Props {
	setIsAuth:React.Dispatch<React.SetStateAction<boolean>>;
};

const Login: React.FC<Props> = ({setIsAuth}) => { //Define the type as a React.FC (functional component) and pass it the props which are defined above. Pass it the function of setIsAuth as property.
	const history= useHistory();
	const handleLogin = () => {
		setIsAuth(true);
		history.push('/home');
	};
	return <button onClick={() => handleLogin() }>Login</button>
};

export default Login;