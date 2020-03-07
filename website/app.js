/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
let apiKey = '2b9d203fc68fc93978aec9603dc8ddb1';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Function that includes a promise nested with the additional data
document.getElementById('generate').addEventListener('click', performAction);
	function performAction(e) {
		const input = document.getElementById('feelings').value;
		const zip = document.getElementById('zip').value;
		getZipCode(baseURL, zip, apiKey)
		.then(function(data) {
			console.log(data)
			postData('http://localhost:8000/add', {temperature: data.main.temp, date: newDate, input: input })
			updateUI('http://localhost:8000/all');
		})
  }

//Function to get the zipcode 
  const getZipCode = async (baseURL, zipCode, key) => {
	const res = await fetch(`${baseURL}zip=${zipCode}&APPID=${apiKey}`,);
	try {
		const data = await res.json();
		console.log(data)
		return data;
	} catch(error) {
		console.log("error", error);
	}
}

//Post data grabbing the url information
const postData = async(url = '', data = {}) => {
	const res = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data), 
		});
		try {
			const newData = await res.json();
			console.log(newData);
			return newData;
		} catch(error) {
			console.log("error", error);
		}
	}

//Function to add the post data to the client side (website)
const updateUI = async (url = '') => {
  const request = await fetch(url);
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = "Date: " +allData[0].date;
    document.getElementById('temp').innerHTML = "Temp: " +allData[0].temperature;
    document.getElementById('content').innerHTML ="Feelings: " +allData[0].input;
  } catch(error){
    console.log("error", error);
  };
};




































