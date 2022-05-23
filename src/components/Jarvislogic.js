const { Configuration, OpenAIApi } = require("openai");

const fetchResponse = async (request, bot) => {
	const configuration = new Configuration({
		apiKey: "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",
	});
	const openai = new OpenAIApi(configuration);

	const response = await openai
		.createCompletion(`${bot}`, {
			prompt: "My name is Jarvis" + `${request}`,
			temperature: 0.7,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		})
		.then((item) => {
			//heading: `AI Tweet suggestion about: ${formDataObj.topic}`,
			console.log(`${bot}`);
			console.log("This is the prompt", prompt);
			return item.data.choices[0].text;
		});
	// fetch(
	// 	`http://api.icndb.com/jokes/random?firstName=${request}`
	// )
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		console.log("It ran");
	// 		console.log(request);
	// 		console.log(data.value.joke);

	// 		return data.value.joke;
	// 	});

	return response;
};

export default fetchResponse;
