const { Configuration, OpenAIApi } = require("openai");

const secrets = require('./secret.json');

const configuration = new Configuration({
    apiKey: secrets.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function created(prompt: String) {
    try {
        let response = await openai.createImage({
            prompt: prompt,
            n: 4,
            size: "1024x1024",
        });

        let image_url = response.data.data[0].url;

        return image_url;
    } catch (error: any) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

module.exports = created;

export { }