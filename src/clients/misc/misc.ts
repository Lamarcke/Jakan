import JakanClient from "../base";

class JakanMisc extends JakanClient {
    private readonly teste: string;

    constructor(baseURL: string, teste: string) {
        super(baseURL);
        this.teste = teste;
    }
}

export default JakanMisc;
