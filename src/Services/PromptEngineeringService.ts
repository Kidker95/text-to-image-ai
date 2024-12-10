import { ParamsModel } from "../Models/ParamsModel";

class PromptEngineeringService {

    public getPrompt(params: ParamsModel): string {
        const prompt = `${params.description} in a ${params.style} style.`;
        return prompt;

    }
}

export const promptEngineeringService = new PromptEngineeringService();
