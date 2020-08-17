import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const ProtectedLoginRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (localStorage.getItem("isLogged")) {
					return <Component {...props} />;
				} else {
					return <Redirect to={
						{
							pathname: "/sign-in",
							state: {
								from: props.location
							}
						}
					} />
				}

			}}
		/>
	);

}