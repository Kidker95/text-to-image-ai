import axios from "axios";
import { appConfig } from "../Utils/AppConfig";

class GeneratorService {

    public async generateImage(prompt: string): Promise<string> {
        const body = {
            model: "dall-e-3",
            prompt
        };

        const options = {
            headers: {
                authorization: "Bearer " + appConfig.apiKey
            }
        };

        const response = await axios.post(appConfig.dalleUrl, body, options);
        const imageUrl = response.data.data[0].url;
        return imageUrl;
    }



}

export const generatorService = new GeneratorService();