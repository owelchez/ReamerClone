import React, { Component } from 'react';
var moment = require('moment');

// another "dumb" component responsible for just rendering the HTML relevant
// for ONE todo item
class Quest extends Component {

	render() {
		const { id, title, description, createdOn, handleDeleteQuest } = this.props;

		var renderDate = () =>  {
			var message = "Added on ";
			var timestamp = createdOn;

			return message + moment(timestamp).format('MMM Do YYYY @ h:mm a')
		};

		return (
			<div className="text-center">
				<p className="questTitle">{title}</p>
				<p>{description}</p>
				<p>{renderDate()}</p>
				<button className="button hollow" onClick={() => handleDeleteQuest(id)}>Delete</button>
			</div>
		);
	}
}

export default Quest;