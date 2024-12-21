import { cyber } from "./Cyber";

class AppConfig {
	public readonly dalleUrl = "https://api.openai.com/v1/images/generations";
    private readonly cypherApiKey = "g_!dfc^!B*%-ee@+SFdG]!eLibB*C&e`+\\N:V+kbgA%+Kk?YEc9nL+e^>eFZ)'Jb^:]^>^Z_>ADDG=\\`dCH'6`V_:>8fhYH=dnZ&H9CCmddknB<g$SWMMNd$[;`,>l5CN^6HGnm8'K6[@EB*&HB@^Xn?)h!h>c?,WUM5";
    public get apiKey(): string {
        return cyber.decrypt(this.cypherApiKey);
    }

}

export const appConfig = new AppConfig();
