declare const settings: {
    url: string;
    subUrl: string;
    options: {
        [key: string]: string;
    };
    fetch: {
        method: string;
        headers: {
            [key: string]: string;
        };
    };
};
export default settings;
