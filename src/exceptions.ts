// Base class for all Jakan errors.
class JakanError extends Error {}

class JakanBuilderError extends JakanError {
    constructor(message: string) {
        const defaultMessage =
            "A error occurred while building a JakanClient: ";
        super(defaultMessage + message);
        this.name = "JakanBuilderError";
    }
}

class JakanSettingsError extends JakanError {
    constructor(message: string) {
        super(message);
        this.name = "JakanSettingsError";
    }
}

class JakanSearchError extends JakanError {
    constructor(message: string) {
        super(message);
        this.name = "JakanSearchError";
    }
}

class JakanMiscError extends JakanError {
    constructor(message: string) {
        super(message);
        this.name = "JakanMiscError";
    }
}

class JakanUsersError extends JakanError {
    constructor(message: string) {
        super(message);
        this.name = "JakanUsersError";
    }
}

export {
    JakanError,
    JakanBuilderError,
    JakanSettingsError,
    JakanSearchError,
    JakanMiscError,
    JakanUsersError,
};
