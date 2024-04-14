import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import apiRequest from './apiRequest';

export default class Discover extends Component {
	constructor() {
		super();

		this.state = {
			newReleases: [],
			playlists: [],
			categories: [],
		};
	}

	componentDidMount() {
		this.fetchData('newReleases', 'new-releases', 'albums');
		this.fetchData('playlists', 'featured-playlists', 'playlists');
		this.fetchData('categories', 'categories', 'categories');
	}

	async fetchData(key, endpoint, type) {
		try {
			const data = await apiRequest(endpoint, type);
			this.setState({ [key]: data });
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	render() {
		const { newReleases, playlists, categories } = this.state;

		return (
			<div className='discover'>
				<DiscoverBlock
					text='RELEASED THIS WEEK'
					id='released'
					data={newReleases}
				/>
				<DiscoverBlock
					text='FEATURED PLAYLISTS'
					id='featured'
					data={playlists}
				/>
				<DiscoverBlock
					text='BROWSE'
					id='browse'
					data={categories}
					imagesKey='icons'
				/>
			</div>
		);
	}
}
