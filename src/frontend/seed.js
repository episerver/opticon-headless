var qs = require("qs");
const fs = require("fs");
const axios = require("axios");
const config = require("./src/config.json");
let FormData = require("form-data");
const { Console } = require("console");

let baseUrl = config.BASE_URL;
if (baseUrl === "$BASE_URL") {
    baseUrl = "http://localhost:5000/";
}

let token = "";
let site = {};

function getToken() {
    var data = {
        grant_type: "client_credentials",
        client_secret: "postman",
        client_id: "postman-client",
        scope: "epi_content_delivery epi_content_management epi_content_definitions",
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
            if (err.response.status != 404) {
                console.error("Error Getting content info: ", err.response.statusText);
            }
        });
}

async function publishContent(content) {
    const contentInfo = await getContentInfo(content);
    if (!contentInfo) {
        console.log("Content not found. Creating content: " + content.name);
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
                console.error("Error Publishing content: ", err.response.statusText);
            });
    }
}

async function patchContent(contentGuid, content) {
    await axios
        .request({
            url: "/api/episerver/v3.0/contentmanagement/" + contentGuid,
            method: "patch",
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
                "x-epi-validation-mode": "minimal",
            },
            data: content,
        })
        .catch((err) => {
            console.error("Error patching content: ", err.response.statusText);
        });
}

async function publishContentUsingForm(content, form) {
    const contentInfo = await getContentInfo(content);

    if (!contentInfo) {
        console.log("Content not found. Creating content: " + content.name);
        let response = await axios.request({
            url: "/api/episerver/v3.0/contentmanagement",
            method: "post",
            baseURL: baseUrl,
            maxBodyLength: Infinity,
            headers: {
                ...form.getHeaders(),
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token,
                "x-epi-validation-mode": "minimal",
                "x-epi-parent-location-rule": "AssetFolder",
            },
            data: form,
        });
        if (response.status != 201) {
            console.error("Error in Publish content: ", response);
        }
        return response.data;
    }
    return contentInfo;
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
            for (let i = 0; i < folders.length; i++) {
                const folder = folders[i];
                await publishContent(folder);
            }
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
        {
            site = await axios
                .request({
                    url: "/api/episerver/v3.0/site",
                    method: "get",
                    baseURL: baseUrl,
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                })
                .catch((err) => {
                    console.error(err);
                });

            if (!site || site.data.length === 0) {
                const siteResponse = await axios
                    .request({
                        url: "/api/episerver/v3.0/sites",
                        method: "post",
                        baseURL: baseUrl,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                if (siteResponse.data) {
                    site = siteResponse.data;
                }
            }

            if (!site) {
                throw new Error("Error getting or creating site, please make sure the backend site is available.");
            }
        }

        /**
         * Generates blocks.
         */
        {
            console.log("=== Generates blocks. ===");
            let blocks = JSON.parse(fs.readFileSync("./import/blocks.json", "utf8"));
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                await publishContent(block);
            }
        }

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
         * Generates destinations.
         */
        {
            console.log("=== Generates destinations. ===");
            let destinations = JSON.parse(fs.readFileSync("./import/destinations.json", "utf8"));
            for (let i = 0; i < destinations.length; i++) {
                await publishContent(destinations[i]);
            }

            console.log("=== Adding images for destinations. ===");
            let images = JSON.parse(fs.readFileSync("./import/images-destinations.json", "utf8"));
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                let file = fs.createReadStream(`./import/images/destinations/${image.name}`);
                const form = new FormData();
                form.append("file", file, image.name);
                form.append("content", JSON.stringify(image));
                await publishContentUsingForm(image, form);
            }

            for (let i = 1; i < destinations.length; i++) {
                await patchContent(destinations[i].contentLink.guidValue, { pageImage: destinations[i].pageImage });
            }
            return;
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
    } catch (error) {
        console.error(error);
    }
})();
