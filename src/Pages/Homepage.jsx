import React, { Component } from 'react';
import { Router , browserHistory } from 'react-router';
import Logout from '../Components/Logout';
import AddDream from '../Components/AddDream';
import DreamList from '../Components/DreamList';
import QuestList from '../Components/QuestList';
import AddQuest from '../Components/AddQuest';


var moment = require('moment');

class Homepage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			loginUser: '',
			dreams: [],
			quests: [],
			createdOn: '',
			clientToken: ''
		};
	}
	handleDeleteDream(id){
		const { dreams } = this.state;

		// find the first item in our state which has the ID we're looking for (itemId)
		const dream = dreams.find((dream) => dream.id === id);

		const updateDreams = dreams.filter((dream) => !dream.active);

		// if we found an item w/ that id, we toggle its `isCompleted` property
		fetch(`/dream/delete/${dream.id}`,{
			method: 'PUT',
			body: JSON.stringify(dream),
			headers: {
				Auth: localStorage.getItem('token'),
				'content-type': 'application/json',
				'accept': 'application/json'
			},
			credentials: 'include'
		}).then((response) => response.json())
		.then((results) => {
			for(var i = 0; i < updateDreams.length; i++){
				if (updateDreams[i].id === dream.id){
					dreams.splice(updateDreams[i], 1)
					this.setState({
						dreams: dreams
					});
				}
			}
		});	
	}
	handleAddDream(text){
		const { dreams } = this.state;
		const newDream = {
			title: text.title,
			description: text.description,
		};
		fetch('/dream/create', {
			method: 'post',
			body: JSON.stringify(newDream),
			headers: {
				Auth: localStorage.getItem('token'),
				'content-type': 'application/json',
				'accept': 'application/json'
			},
			credentials: 'include'
		}).then((response) => response.json())
			.then((results) => {
			this.setState({
				dreams: dreams.concat(results),
				createdOn: moment()
			});
		});
	} 
	handleAddQuest(text){
		const { quests } = this.state;
		const newQuest = {
			title: text.title,
			description: text.description,
		};
		fetch('/quest/create', {
			method: 'post',
			body: JSON.stringify(newQuest),
			headers: {
				Auth: localStorage.getItem('token'),
				'content-type': 'application/json',
				'accept': 'application/json'
			},
			credentials: 'include'
		}).then((response) => response.json())
			.then((results) => {
			this.setState({
				quest: quests.concat(results),
				createdOn: moment()
			});
		});
	} 
	handleDeleteQuest(id){
		const { quests } = this.state;

		// find the first item in our state which has the ID we're looking for (itemId)
		const quest = quests.find((quest) => quest.id === id);

		const updateQuests = quests.filter((quest) => !quest.active);

		// if we found an item w/ that id, we toggle its `isCompleted` property
		fetch(`/quest/delete/${quest.id}`,{
			method: 'PUT',
			body: JSON.stringify(quest),
			headers: {
				Auth: localStorage.getItem('token'),
				'content-type': 'application/json',
				'accept': 'application/json'
			},
			credentials: 'include'
		}).then((response) => response.json())
		.then((results) => {
			for(var i = 0; i < updateQuests.length; i++){
				if (updateQuests[i].id === quest.id){
					quests.splice(updateQuests[i], 1)
					this.setState({
						quests: quests
					});
				}
			}
		});	
	}
	logoutHandler(){
		fetch('/users/login', {
			method: 'delete',
			headers: {
				Auth: localStorage.getItem('token'),
			},
			credentials: 'include'
		}).then((results) => {
			browserHistory.push('/');
		});
	}
	componentWillMount(){
		const { clientToken } = this.props;

		fetch('/home', {
			credentials: 'include',
			headers: {
				Auth: localStorage.getItem('token')
			}
		}).then((response) => response.json())
		.then((results) => {
			const filtered = results.dreams.filter((dream) => !dream.active);
			this.setState({
				loginUser: results.currentUser.firstname,
				dreams: filtered
			});
		});
	}
	componentWillMountQuest(){
		const { clientToken } = this.props;

		fetch('/home', {
			credentials: 'include',
			headers: {
				Auth: localStorage.getItem('token')
			}
		}).then((response) => response.json())
		.then((results) => {
			const filtered = results.quests.filter((quest) => !quest.active);
			this.setState({
				loginUser: results.currentUser.firstname,
				dreams: filtered
			});
		});
	}
	render() {

		var { loginUser, dreams } = this.state;

		const updateDreams = dreams.filter((dream) => !dream.active);

		const updateQuest = quest.filter((quest) => !quest.active);

		return (
		<div>
			<div>
				<Logout onLogout={this.logoutHandler.bind(this)} />
				<h1 className = "text-center">Welcome Home </h1><h1 className="userName text-center">{loginUser}</h1>
				<AddDream onDreamCreate={this.handleAddDream.bind(this)} />
				<h2 className = "text-center">Your Dreams</h2>
				<div className="row">
					<div className="column small-centered small-11 medium-6 large-5">
						<div className="container">
							<DreamList dreams={updateDreams} handleDeleteDream={this.handleDeleteDream.bind(this)}/>
						</div>
					</div>
				</div>
			</div>
			<div>
				<AddQuest onQuestCreate={this.handleAddQuest.bind(this)} />
				<h2 className = "text-center">Your Quest</h2>
				<div className="row">
					<div className="column small-centered small-11 medium-6 large-5">
						<div className="container">
							<QuestList quest={updateQuest} handleDeleteQuest={this.handleDeleteQuest.bind(this)}/>
						</div>
					</div>
				</div>
			</div>
		</div>
		);

	}
}

export default Homepage;