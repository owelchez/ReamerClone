import React, { Component } from 'react';

// another "dumb" component responsible for just rendering the HTML relevant
// for ONE todo item
class DeleteDream extends Component {
	// onFormSubmit(e){
	// 	e.preventDefault();

	// 	var { id } = this.props;

	// 	this.props.onDeleteDream(id);
	// }
	render() {

		return (
			<div>
				<form>
					<button onClick={this.props.onClick}>Delete</button>
				</form>
			</div>
		);
	}
}

export default DeleteDream;