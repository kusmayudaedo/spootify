import axios from 'axios';
import qs from 'querystring';
import config from '../../../config';

/* Step to get data from spotify API
1. Create a post request to authURL declare in config.js authURL
2. Request authorization must include
	- body parameter -> grand_type : client_credentials
	- header parameter -> 'Content-Type': 'application/x-www-form-urlencoded',
	- Authorization -> this construct using clientId : clientSecret in base64 format
3. The response will include access_token that we can used to make a get request. 
*/

const { api } = config;

const apiRequest = async (endpoint, resourceType) => {
	//@Destructure the response access_token and rename into Token
	const {
		data: { access_token: token },
	} = await axios.post(
		api.authUrl,
		qs.stringify({ grant_type: 'client_credentials' }),
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${btoa(`${api.clientId}:${api.clientSecret}`)}`,
			},
		}
	);

	//@Use token to send a get request to get data from spotify
	const res = await axios.get(
		`${api.baseUrl}/browse/${endpoint}?locale=en_US`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return res.data[resourceType].items;
};

export default apiRequest;
