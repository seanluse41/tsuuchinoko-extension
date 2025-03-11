export const getCybozuData = async () => {
    if (passedData !== undefined) {
        return passedData;
    }
    return new Promise((resolve, reject) => {
        const timer = window.setTimeout(() => {
            document.body.removeEventListener("pass-cybozu-data", handler);
            reject(new Error("Could not get cybozu.data."));
        }, 1000);
        const handler = async (event) => {
            clearTimeout(timer);
            passedData = event.detail;
            resolve(event.detail);
        };
        document.body.addEventListener("pass-cybozu-data", handler, {
            once: true,
        });
        const scriptEl = document.createElement("script");
        scriptEl.src = chrome.runtime.getURL("pass-cybozu-data.js");
        document.body.appendChild(scriptEl);
    });
};