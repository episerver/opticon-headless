const fs = require("fs");
const axios = require('axios');
const config = require('./src/config.json');
const async = require("async");
var FormData = require('form-data');

var baseUrl = config.BASE_URL;
if (baseUrl === '$BASE_URL') {
    baseUrl = "http://localhost:5000/";
}

var token = '';

async function getToken() {
    const reqData = "grant_type=client_credentials&client_secret=postman&client_id=postman-client";
    const response = await axios.request({
        url: "/api/episerver/connect/token",
        method: "post",
        baseURL: baseUrl,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: (reqData)
    });
    return response;
};

(async () => {

    try {


        var tokenResponse = await getToken();
        if (!tokenResponse) {
            throw new Error("Error getting token, please make sure the backend site is available.")
        }

        token = tokenResponse.data.access_token;
        var home = await axios.request({
            url: "api/episerver/v3.0/content/97333fc8-932c-47d4-8693-9c0870fb7fc9",
            method: "get",
            baseURL: baseUrl,
            headers: {
                "Authorization": "Bearer: " + token,
                "Content-Type": "application/json"
            }
        }).catch(err => {
            console.error(err);
        });

        if (!home?.data) {
            const homeResponse = await axios.request({
                url: "/api/episerver/v3.0/contentmanagement",
                method: "post",
                baseURL: baseUrl,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                    "x-epi-validation-mode": "minimal"
                },
                data: {
                    "contentLink": {
                        "guidValue": "97333fc8-932c-47d4-8693-9c0870fb7fc9"
                    },
                    "name": "Home",
                    "language": {
                        "name": "en"
                    },
                    "contentType": [
                        "Page",
                        "Standard"
                    ],
                    "parentLink": {
                        "id": 1
                    },
                    "status": "Published"
                }
            }).catch(err => {
                console.error(err);
            });

            if (homeResponse?.data) {
                home = homeResponse.data;
                const heroBlockResponse = await axios.request({
                    url: "/api/episerver/v3.0/contentmanagement",
                    method: "post",
                    baseURL: baseUrl,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                        "x-epi-validation-mode": "minimal"
                    },
                    data: {
                        "contentLink": {
                            "guidValue": "ca5aa43d-20f1-4992-9f1b-1cacbd7eda27"
                        },
                        "title": "First Class Destinations",
                        "description": "Top 1% locations worldwide",
                        "name": "Beach Hero",
                        "language": {
                            "name": "en"
                        },
                        "contentType": [
                            "Block",
                            "HeroBlock"
                        ],
                        "parentLink": {
                            "id": home.contentLink.id
                        },
                        "status": "Published",
                        "buttonText": "Explore",
                        "isScreenWidth": true,

                    }
                }).catch(err => {
                    console.error(err);
                });

                if (heroBlockResponse?.data) {
                    const form = new FormData();
                    form.append("content", JSON.stringify({
                        "contentLink": {
                            "guidValue": "246f4b37-1431-45c7-96f9-65548063fd23"
                        },
                        "name": "beachVid.mp4",
                        "contentType": [
                            "Video",
                            "VideoFile"
                        ],
                        "parentLink": {
                            "id": heroBlockResponse.data.contentLink.id
                        },
                        "status": "Published",

                    }));

                    var file = fs.readFileSync('./import/images/beachVid.mp4', 'base64');;
                    form.append('file', file, 'beachVid.mp4');

                    const beachVideoResponse = await axios.post(baseUrl + 'api/episerver/v3.0/contentmanagement', form, {
                        headers: {
                            ...form.getHeaders(),
                            "Authorization": "Bearer " + token,
                            "x-epi-validation-mode": "minimal"
                        },
                    }).catch(err => {
                        console.error(err);
                    });
                    if (beachVideoResponse?.data) {
                        await axios.request({
                            url: "/api/episerver/v3.0/contentmanagement",
                            method: "patch",
                            baseURL: baseUrl,
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + token,
                                "x-epi-validation-mode": "minimal"
                            },
                            data: {
                                "contentLink": {
                                    "guidValue": "ca5aa43d-20f1-4992-9f1b-1cacbd7eda27"
                                },
                                "backgroundVideo": {
                                    "id": beachVideoResponse.data.contentLink.id
                                }
                            }
                        }).catch(err => {
                            console.error(err);
                        });
                    }
                }
            }
            //beachVid.mp4
        }

        var site = await axios.request({
            url: "/api/episerver/v3.0/site",
            method: "get",
            baseURL: baseUrl,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            }
        }).catch(err => {
            console.error(err);
        });

        if (!site || site.length === 0) {
            const siteResponse = await axios.request({
                url: "/api/episerver/v3.0/sites",
                method: "post",
                baseURL: baseUrl,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            }).catch(err => {
                console.error(err);
            });
            if (siteResponse.data) {
                site = siteResponse.data;
            }
        }

        if (!site) {
            throw new Error("Error getting or creating site, please make sure the backend site is available.")
        }

        var destinations = JSON.parse( fs.readFileSync("./import/destinations.json", "utf8"));
        if (!destinations) {
            throw new Error("Error reading destinations.")
        }

        destinations.forEach((destination) => {
            (async () => {
                await axios.request({
                    url: "/api/episerver/v3.0/contentmanagement",
                    method: "post",
                    baseURL: baseUrl,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                        "x-epi-validation-mode": "minimal"
                    },
                    data: JSON.stringify(destination)
                }).catch(err => {
                    console.error(err);
                });
            })();
        });

        var images = JSON.parse( fs.readFileSync("./import/images.json", "utf8"));
       
        if (!images) {
            throw new Error("Error reading images.")
        }

        images.forEach((image) => {
            (async () => {
                await axios.request({
                    url: "/api/episerver/v3.0/contentmanagement",
                    method: "post",
                    baseURL: baseUrl,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                        "x-epi-validation-mode": "minimal"
                    },
                    data: JSON.stringify(image)
                }).catch(err => {
                    console.error(err);
                });
            })();
        });

        for (let i = 0; i < destinations.length; i++) {
            await axios.request({
                url: "/api/episerver/v3.0/content",
                method: "patch",
                baseURL: baseUrl,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                    "x-epi-validation-mode": "minimal"
                },
                data: {
                    "contentLink": {
                        "guidValue": destinations[i].contentLink.guidValue
                    },
                    "pageImage": {
                        "guidValue": images[i].contentLink.guidValue
                    }
                }
            }).catch(err => {
                console.error(err);
            });
        }
    }
    catch (error) {
        console.error(error);
    }
})();