var qs = require("qs");
const fs = require("fs");
const axios = require("axios");
const config = require("./src/config.json");
let FormData = require("form-data");

let baseUrl = config.BASE_URL;
if (baseUrl === "$BASE_URL") {
    baseUrl = "http://localhost:5000/";
}

let token = "";
let site = {};

function getToken() {
    var data = {
        grant_type: "password",
        client_secret: "postman",
        client_id: "postman-client",
        scope: "epi_content_delivery epi_content_management epi_content_definitions",
        username: `${config.USERNAME}`,
        password: `${config.PASSWORD}`,
    };

    const response = axios.request({
        url: "/api/episerver/connect/token",
        method: "post",
        baseURL: baseUrl,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(data),
    });

    return response;
}

async function getContentInfo(content) {
    return await axios
        .request({
            url: `api/episerver/v3.0/content/${content.contentLink.guidValue}`,
            method: "get",
            baseURL: baseUrl,
            headers: {
                Authorization: "Bearer: " + token,
                "Content-Type": "application/json",
            },
        })
        .catch((err) => {
            console.error("Getting content info: ", err.response.statusText);
        });
}

async function publishContent(content) {
    const contentInfo = await getContentInfo(content);

    if (!contentInfo) {
        await axios
            .request({
                url: "/api/episerver/v3.0/contentmanagement",
                method: "post",
                baseURL: baseUrl,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                    "x-epi-validation-mode": "minimal",
                },
                data: content,
            })
            .catch((err) => {
                console.error("Publish content: ", err.response.statusText);
            });
    }
}

async function publishContentUsingForm(content, form) {
    // const contentInfo = await getContentInfo(content);

    // if (!contentInfo) {
    await axios
        .request({
            url: "/api/episerver/v3.0/contentmanagement",
            method: "post",
            baseURL: baseUrl,
            maxBodyLength: Infinity,
            headers: {
                ...form.getHeaders(),
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token,
                "x-epi-validation-mode": "minimal",
            },
            data: form,
        })
        .catch((err) => {
            console.error("Publish content: ", err.response.statusText);
        });
    // }
}

(async () => {
    try {
        /**
         * Gets a token.
         */
        {
            console.log("=== Gets a token. ===");
            let tokenResponse = await getToken();
            if (!tokenResponse) {
                throw new Error("Error getting token, please make sure the backend site is available.");
            }

            token = tokenResponse.data.access_token;
        }

        /**
         * Generates content folders.
         */
        {
            console.log("=== Generates content folders. ===");
            let folders = JSON.parse(fs.readFileSync("./import/content-folders.json", "utf8"));
            let promises = [];
            for (let i = 0; i < folders.length; i++) {
                const folder = folders[i];
                promises.push(publishContent(folder));
            }

            await Promise.all(promises);
        }

        /**
         * Upload images.
         */
        {
            console.log("=== Upload images. ===");
        }

        /**
         * Upload videos.
         */
        {
            console.log("=== Upload videos. ===");
            let videos = JSON.parse(fs.readFileSync("./import/videos.json", "utf8"));
            let promises = [];
            for (let i = 0; i < videos.length; i++) {
                const video = videos[i];
                let file = fs.createReadStream(`./import/videos/${video.name}`);
                const form = new FormData();
                form.append("file", file, video.name);
                form.append("content", JSON.stringify(video));
                promises.push(publishContentUsingForm(video, form));
            }

            await Promise.all(promises);
        }

        /**
         * Generates a home page.
         */
        {
            console.log("=== Generates a home page. ===");
            let homePages = JSON.parse(fs.readFileSync("./import/homes.json", "utf8"));
            let promises = [];
            for (let i = 0; i < homePages.length; i++) {
                const homePage = homePages[i];
                promises.push(publishContent(homePage));
            }

            await Promise.all(promises);
        }

        /**
         * Creates a new site.
         */
        // {
        //     site = await axios
        //         .request({
        //             url: "/api/episerver/v3.0/site",
        //             method: "get",
        //             baseURL: baseUrl,
        //             headers: {
        //                 Authorization: "Bearer " + token,
        //                 "Content-Type": "application/json",
        //             },
        //         })
        //         .catch((err) => {
        //             console.error(err);
        //         });

        //     if (!site || site.length === 0) {
        //         const siteResponse = await axios
        //             .request({
        //                 url: "/api/episerver/v3.0/site",
        //                 method: "post",
        //                 baseURL: baseUrl,
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     Authorization: "Bearer " + token,
        //                 },
        //             })
        //             .catch((err) => {
        //                 console.error(err);
        //             });
        //         if (siteResponse.data) {
        //             site = siteResponse.data;
        //         }
        //     }

        //     if (!site) {
        //         throw new Error("Error getting or creating site, please make sure the backend site is available.");
        //     }
        // }

        /**
         * Generates blogs.
         */
        {
            console.log("=== Generates blogs. ===");
            let blogs = JSON.parse(fs.readFileSync("./import/blogs.json", "utf8"));
            for (let i = 0; i < blogs.length; i++) {
                const blog = blogs[i];
                await publishContent(blog);
            }
        }

        /**
         * Generates blocks.
         */
        {
            console.log("=== Generates blocks. ===");
            let blocks = JSON.parse(fs.readFileSync("./import/blocks.json", "utf8"));
            let promises = [];
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                promises.push(publishContent(block));
            }

            await Promise.all(promises);
        }

        console.log("[DEBUGGING] Stop here");
        return;

        if (heroBlockResponse?.data) {
            const beachVideoResponse = await axios
                .post(baseUrl + "api/episerver/v3.0/contentmanagement", form, {
                    headers: {
                        ...form.getHeaders(),
                        Authorization: "Bearer " + token,
                        "x-epi-validation-mode": "minimal",
                    },
                })
                .catch((err) => {
                    console.error(err);
                });
            if (beachVideoResponse?.data) {
                await axios
                    .request({
                        url: "/api/episerver/v3.0/contentmanagement",
                        method: "patch",
                        baseURL: baseUrl,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                            "x-epi-validation-mode": "minimal",
                        },
                        data: {
                            contentLink: {
                                guidValue: "ca5aa43d-20f1-4992-9f1b-1cacbd7eda27",
                            },
                            backgroundVideo: {
                                id: beachVideoResponse.data.contentLink.id,
                            },
                        },
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        }

        let destinations = JSON.parse(fs.readFileSync("./import/destinations.json", "utf8"));
        if (!destinations) {
            throw new Error("Error reading destinations.");
        }

        destinations.forEach((destination) => {
            (async () => {
                await axios
                    .request({
                        url: "/api/episerver/v3.0/contentmanagement",
                        method: "post",
                        baseURL: baseUrl,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                            "x-epi-validation-mode": "minimal",
                        },
                        data: JSON.stringify(destination),
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            })();
        });

        let images = JSON.parse(fs.readFileSync("./import/images.json", "utf8"));

        if (!images) {
            throw new Error("Error reading images.");
        }

        images.forEach((image) => {
            (async () => {
                await axios
                    .request({
                        url: "/api/episerver/v3.0/contentmanagement",
                        method: "post",
                        baseURL: baseUrl,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                            "x-epi-validation-mode": "minimal",
                        },
                        data: JSON.stringify(image),
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            })();
        });

        for (let i = 0; i < destinations.length; i++) {
            await axios
                .request({
                    url: "/api/episerver/v3.0/content",
                    method: "patch",
                    baseURL: baseUrl,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                        "x-epi-validation-mode": "minimal",
                    },
                    data: {
                        contentLink: {
                            guidValue: destinations[i].contentLink.guidValue,
                        },
                        pageImage: {
                            guidValue: images[i].contentLink.guidValue,
                        },
                    },
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    } catch (error) {
        console.error(error);
    }
})();
