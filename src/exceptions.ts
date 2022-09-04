class JakanError extends Error {}

class JakanBuilderError extends JakanError {
    constructor(message: string) {
        super(message);
        this.name = "JakanBuilderError";
    }
}

export { JakanBuilderError };
