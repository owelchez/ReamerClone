import React, { Component } from 'react';
import Quest from './Quest';

// this component is "dumb" as it has no state. really all its responsible
// for is iterating over an array of items and rendering TodoItem for each
// one
class QuestList extends Component {

	render() {
		const { quests, handleDeleteQuest } = this.props;

		var renderQuests = () => {
			if (quests.length === 0){
				return (
					<p className="container__message">You Have Had No Quests</p>
				);
			}
			return quests.map((quest, index) => {
				return (
					<Quest
						title={quest.title}
						description={quest.description}
						handleDeleteDream={handleDeleteQuest}
						id={quest.id}
						key={index}
					/>
				);
			});
		}

		return (
			<div>
				{renderQuest()}
			</div>
		);
	}
}

export default QuestList;