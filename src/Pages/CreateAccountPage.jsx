import React, { Component } from 'react';
import CreateAccount from '../Components/CreateAccount';
import { Router , browserHistory } from 'react-router';

class CreateAccountPage extends Component {
	handleNewData (creds) {
		const newUser = {
			firstname: creds.firstname,
			lastname: creds.lastname,
			username: creds.username,
			email: creds.email,
			password: creds.password
		}
		fetch('/users/create', {
			method: 'post',
			body: JSON.stringify(newUser),
			headers: {
				'content-type': 'application/json'
			}
		}).then((response) => response.json())
		.then((results) => {
			if (results.createdAt){
				browserHistory.push('/login');
			} else {
				results.errors.filter((result) => alert(result.message));
			}
		})
	}
	render() {

		return (
			<div className = "row">
				<div className="column small-centered small-11 medium-6 large-5">
					<div className="container">
						<h1 className = "container_header text-center">Create Account</h1>
						<CreateAccount onCreate={this.handleNewData.bind(this)}/>
					</div>
				</div>
			</div>
		);

	}
}

export default CreateAccountPage;