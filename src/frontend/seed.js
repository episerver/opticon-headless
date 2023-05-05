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
const UpdateMediaContentFor = {
    PageOrBlock: "PageOrBlock",
    AssetFolder: "AssetFolder",
};

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

async function getContentInfo(contentGuid) {
    return await axios
        .request({
            url: `api/episerver/v3.0/content/${contentGuid}`,
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
    const contentInfo = await getContentInfo(content.contentLink.guidValue);
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
                console.error("Error Publishing content: ", err.response);
            });
    }
}

async function patchContent(content, updateData) {
    console.log("Updating content: " + content.name);
    await axios
        .request({
            url: "/api/episerver/v3.0/contentmanagement/" + content.contentLink.guidValue,
            method: "patch",
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
                "x-epi-validation-mode": "minimal",
            },
            data: updateData,
        })
        .catch((err) => {
            console.error("Error patching content: ", err.response.statusText);
        });
}

async function patchPropertyContentReferences(content, updateData) {
    const contentInfo = await getContentInfo(content.contentLink.guidValue);
    let updateDataKey = Object.keys(updateData)[0];
    let updateDataValue = Object.values(updateData)[0];
    let updateDataInfo = {};
    let found = false;

    // if the content area has content references already, all references must be removed then new data will be updated.
    // the whole array of references will be passed to patch API, if any references exist, the update would skip.
    if (Array.isArray(updateDataValue)) {
        const ids = [];
        for (let i = 0; i < updateDataValue.length; i++) {
            updateDataInfo = await getContentInfo(updateDataValue[i].contentLink.guidValue);
            if (updateDataInfo) {
                ids.push(updateDataInfo.data.contentLink.id);
            }
        }

        if (!contentInfo || ids.length == 0) {
            return;
        }

        if (contentInfo.data[updateDataKey]) {
            for (let i = 0; i < contentInfo.data[updateDataKey].length; i++) {
                const element = contentInfo.data[updateDataKey][i];
                if (ids.includes(element.contentLink.id)) {
                    found = true;
                    break;
                }
            }
        }

        if (found) {
            return;
        }

        for (let i = 0; i < ids.length; i++) {
            updateData[updateDataKey][i].contentLink.id = ids[i];
        }
    } else {
        const contentInfo = await getContentInfo(content.contentLink.guidValue);
        updateDataInfo = await getContentInfo(updateData[updateDataKey].guidValue);
        if (!contentInfo && !updateDataInfo) {
            return;
        }

        if (
            contentInfo.data[updateDataKey] &&
            updateData[updateDataKey].guidValue == updateDataInfo.data.contentLink.guidValue
        ) {
            return;
        }

        updateData[updateDataKey].id = updateDataInfo.data.contentLink.id;
    }

    console.log("Updating references for content: " + content.name);
    await axios
        .request({
            url: "/api/episerver/v3.0/contentmanagement/" + content.contentLink.guidValue,
            method: "patch",
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
                "x-epi-validation-mode": "minimal",
            },
            data: updateData,
        })
        .catch((err) => {
            console.error("Error patching content: ", err.response.statusText);
        });
}

async function publishMediaContent(content, form, updateMediaContentFor = UpdateMediaContentFor.PageOrBlock) {
    let headers = {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
        "x-epi-validation-mode": "minimal",
    };
    if (updateMediaContentFor == UpdateMediaContentFor.PageOrBlock) {
        headers["x-epi-parent-location-rule"] = "AssetFolder";
    }

    const contentInfo = await getContentInfo(content.contentLink.guidValue);

    if (!contentInfo) {
        console.log("Content not found. Creating content: " + content.name);
        let response = await axios.request({
            url: "/api/episerver/v3.0/contentmanagement",
            method: "post",
            baseURL: baseUrl,
            maxBodyLength: Infinity,
            headers: {
                ...form.getHeaders(),
                ...headers,
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
            let folders = JSON.parse(fs.readFileSync("./import/content-folders/content-folders.json", "utf8"));
            for (let i = 0; i < folders.length; i++) {
                const folder = folders[i];
                await publishContent(folder);
            }
        }

        /**
         * Generates a setting block for global settings.
         */
        {
            console.log("=== Generates a setting block for global settings. ===");
            let globalSettings = JSON.parse(fs.readFileSync("./import/blocks/setting-block.json", "utf8"));
            await publishContent(globalSettings);
        }

        /**
         * Generates a home page.
         */
        {
            console.log("=== Generates a home page. ===");
            let homePages = JSON.parse(fs.readFileSync("./import/pages/homes.json", "utf8"));
            for (let i = 0; i < homePages.length; i++) {
                const homePage = homePages[i];
                await publishContent(homePage);
            }
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
         * Adds logo dark and logo light.
         */
        {
            console.log("=== Adds logo dark and logo light. ===");
            let logos = JSON.parse(fs.readFileSync("./import/images/images-logos.json", "utf8"));
            for (let i = 0; i < logos.length; i++) {
                const logo = logos[i];
                let file = fs.createReadStream(`./import/images/logos/${logo.name}`);
                const form = new FormData();
                form.append("file", file, logo.name);
                form.append("content", JSON.stringify(logo));
                await publishMediaContent(logo, form, UpdateMediaContentFor.AssetFolder);
            }

            let globalSettings = JSON.parse(fs.readFileSync("./import/blocks/setting-block.json", "utf8"));

            await patchPropertyContentReferences(globalSettings, {
                siteLogoDark: globalSettings.siteLogoDark,
            });
            await patchPropertyContentReferences(globalSettings, {
                siteLogoLight: globalSettings.siteLogoLight,
            });
        }

        /**
         * Generates navbar item blocks.
         */
        {
            console.log("=== Generates navbar item blocks. ===");
            let blocks = JSON.parse(fs.readFileSync("./import/blocks/navbar-item-blocks.json", "utf8"));
            for (let i = 0; i < blocks.length; i++) {
                await publishContent(blocks[i]);
            }
        }

        /**
         * Generates teaser blocks.
         */
        {
            console.log("=== Generates teaser blocks. ===");
            let blocks = JSON.parse(fs.readFileSync("./import/blocks/teaser-blocks.json", "utf8"));
            for (let i = 0; i < blocks.length; i++) {
                await publishContent(blocks[i]);
            }

            console.log("=== Adding images for teaser blocks. ===");
            let images = JSON.parse(fs.readFileSync("./import/images/images-teaser-blocks.json", "utf8"));
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                let file = fs.createReadStream(`./import/images/teaser-blocks/${image.name}`);
                const form = new FormData();
                form.append("file", file, image.name);
                form.append("content", JSON.stringify(image));
                await publishMediaContent(image, form, UpdateMediaContentFor.AssetFolder);
            }

            for (let i = 0; i < blocks.length; i++) {
                await patchPropertyContentReferences(blocks[i], {
                    backgroundImage: blocks[i].backgroundImage,
                });
            }
        }

        /**
         * Generates search blocks.
         */
        {
            console.log("=== Generates search blocks. ===");
            let blocks = JSON.parse(fs.readFileSync("./import/blocks/search-blocks.json", "utf8"));
            for (let i = 0; i < blocks.length; i++) {
                await publishContent(blocks[i]);
            }
        }

        /**
         * Generates rich content blocks.
         */
        {
            console.log("=== Generates rich content blocks. ===");
            let blocks = JSON.parse(fs.readFileSync("./import/blocks/rich-content-blocks.json", "utf8"));
            for (let i = 0; i < blocks.length; i++) {
                await publishContent(blocks[i]);
            }

            console.log("=== Adding images for rich content blocks. ===");
            let images = JSON.parse(fs.readFileSync("./import/images/images-rich-content-blocks.json", "utf8"));
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                let file = fs.createReadStream(`./import/images/rich-content-blocks/${image.name}`);
                const form = new FormData();
                form.append("file", file, image.name);
                form.append("content", JSON.stringify(image));
                await publishMediaContent(image, form, UpdateMediaContentFor.AssetFolder);
            }

            for (let i = 0; i < blocks.length; i++) {
                await patchPropertyContentReferences(blocks[i], {
                    backgroundImage1: blocks[i].backgroundImage1,
                });
                await patchPropertyContentReferences(blocks[i], {
                    backgroundImage2: blocks[i].backgroundImage2,
                });
            }
        }

        /**
         * Generates tags.
         */
        {
            console.log("=== Generates tags. ===");
            let tags = JSON.parse(fs.readFileSync("./import/pages/tags.json", "utf8"));
            for (let i = 0; i < tags.length; i++) {
                await publishContent(tags[i]);
            }
        }

        /**
         * Generates blogs.
         */
        {
            console.log("=== Generates blog pages. ===");
            let blogs = JSON.parse(fs.readFileSync("./import/pages/blogs.json", "utf8"));
            for (let i = 0; i < blogs.length; i++) {
                const blog = blogs[i];
                await publishContent(blog);
            }

            console.log("=== Adding images for blogs. ===");
            let images = JSON.parse(fs.readFileSync("./import/images/images-blogs.json", "utf8"));
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                let file = fs.createReadStream(`./import/images/blogs/${image.name}`);
                const form = new FormData();
                form.append("file", file, image.name);
                form.append("content", JSON.stringify(image));
                await publishMediaContent(image, form);
            }

            for (let i = 1; i < blogs.length; i++) {
                await patchPropertyContentReferences(blogs[i], {
                    pageImage: blogs[i].pageImage,
                });
            }
        }

        /**
         * Generates blog list page blocks.
         */
        {
            console.log("=== Generates page list blocks. ===");
            let blocks = JSON.parse(fs.readFileSync("./import/blocks/page-list-blocks.json", "utf8"));
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                await publishContent(block);
            }

            console.log("=== Adding reference of page for blocks. ===");
            for (let i = 0; i < blocks.length; i++) {
                await patchPropertyContentReferences(blocks[i], { roots: blocks[i].roots });
            }
        }

        /**
         * Generates destinations.
         */
        {
            console.log("=== Generates destinations. ===");
            let destinations = JSON.parse(fs.readFileSync("./import/pages/destinations.json", "utf8"));
            for (let i = 0; i < destinations.length; i++) {
                await publishContent(destinations[i]);
            }

            console.log("=== Adding images for destinations. ===");
            let images = JSON.parse(fs.readFileSync("./import/images/images-destinations.json", "utf8"));
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                let file = fs.createReadStream(`./import/images/destinations/${image.name}`);
                const form = new FormData();
                form.append("file", file, image.name);
                form.append("content", JSON.stringify(image));
                await publishMediaContent(image, form);
            }

            for (let i = 1; i < destinations.length; i++) {
                await patchPropertyContentReferences(destinations[i], {
                    pageImage: destinations[i].pageImage,
                });
            }
        }

        /**
         * Add blocks to the home page.
         */
        {
            console.log("=== Adding blocks to the home page. ===");
            let homePages = JSON.parse(fs.readFileSync("./import/pages/homes.json", "utf8"));
            await patchPropertyContentReferences(homePages[0], {
                mainContentArea: [
                    { contentLink: { guidValue: "543b721a-84ff-4d00-aa96-ee6654f0572f" } }, // Teaser Block: Banner
                    { contentLink: { guidValue: "b3cb5663-7d9a-4619-bdce-f28b2b2e742c" } }, // Search Block: Search your trip
                    { contentLink: { guidValue: "abe42835-8837-4496-a8ee-8c72e379cc2c" } }, // Rich Content Block: Get inspiration
                    { contentLink: { guidValue: "793392ad-61b5-4fc2-ada0-b75ea30081f5" } }, // Page List Block: Blogs
                ],
            });
        }

        return;

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
                promises.push(publishMediaContent(video, form));
            }

            await Promise.all(promises);
        }
    } catch (error) {
        console.error(error);
    }
})();
