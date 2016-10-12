import React, { Component } from 'react';
var moment = require('moment');

// another "dumb" component responsible for just rendering the HTML relevant
// for ONE todo item
class Dream extends Component {

	render() {
		const { id, title, description, createdOn, handleDeleteDream } = this.props;

		var renderDate = () =>  {
			var message = "Added on ";
			var timestamp = createdOn;

			return message + moment(timestamp).format('MMM Do YYYY @ h:mm a')
		};

		return (
			<div className="text-center">
				<p className="dreamTitle">{title}</p>
				<p>{description}</p>
				<p>{renderDate()}</p>
				<button className="button hollow" onClick={() => handleDeleteDream(id)}>Delete</button>
			</div>
		);
	}
}

export default Dream;