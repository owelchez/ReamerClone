import React, { Component } from 'react';

class AddQuest extends Component {
	constructor(...args){
		super(...args)
		this.state = {
		}
	}
	onCreateQuest(e){
		e.preventDefault();

		var creds = {};
		var title = this.refs.title.value;
		var description = this.refs.description.value;

		if (title.length > 0) {
			this.refs.title.value = '';
			creds.title = title;
		}

		if (description.length > 0) {
			this.refs.description.value = '';
			creds.description = description;
		}

		this.props.onQuestCreate(creds);
	}
	render() {
		return (
			<div className="row">
				<div className="column small-centered small-11 medium-6 large-5">
					<div className="container">
						<form onSubmit={this.onCreateQuest.bind(this)}>
								<h2 className = "text-center">Add Quest</h2>
							<div>
								<input type="text" ref="title" placeholder="Quest Title"/>
							</div>
							<div>
								<textarea ref="description" placeholder="Quest Description"></textarea>
							</div>
							<div>
								<input className="button expanded hollow" type="submit" placeholder="Add Quest" />
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default AddQuest;