class JakanError extends Error {}

class JakanBuilderError extends JakanError {
    constructor(message: string) {
        super(message);
        this.name = "JakanBuilderError";
    }
}

class JakanSettingsError extends JakanError {
    constructor(message: string) {
        super(message);
        this.name = "JakanSettingsError";
    }
}

export { JakanBuilderError, JakanSettingsError };
