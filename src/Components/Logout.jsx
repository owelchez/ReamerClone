import React, { Component } from 'react';

class Logout extends Component {
	onFormSubmit(e){
		e.preventDefault();

		var { loginUser } = this.props;

		this.props.onLogout(loginUser);
	}
	render() {
		return (
			<div className="row">
				<div className = "small-10 large-10 columns">
				</div>
				<div className="small-2 large-2 columns">
					<form onSubmit={this.onFormSubmit.bind(this)}>
						<button className="button success">Logout</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Logout;