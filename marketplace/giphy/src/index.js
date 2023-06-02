/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
let apiKey = "API Key"
let limit = 12;
let offset = 0;
let query = "";
let searchLimit = 50;
let requestCompleted = true;
let giphyAPI = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&`;
let gifslist = [];

window.onNameKeydown = textfield => {
    if (event.key === "Enter" && textfield.value.length > 0) {
        searchGiphy();
    }
};

window.onscroll = function () {
    if (((window.innerHeight + window.scrollY) > document.body.offsetHeight)) {
        if (requestCompleted) {
            requestCompleted = false;
            offset = offset + limit;
            searchGiphy();
        }
    }
};

function gif_clicked(index) {
    const url = document.getElementById("gif_img_" + index).getAttribute("src");
    if (url) {
        add_image(url);
    }
}

function searchGiphy() {
    let currentQuery = document.getElementById("searchquery").value.replace(" ", "+");
    if (currentQuery.length > 0) {
        if (currentQuery != query || query == "") {
            offset = 0;
            gifslist = [];
            query = currentQuery;
        }
        if (offset < searchLimit) {
            requestCompleted = false;
            searchQueryApi = giphyAPI + `limit=${limit}&offset=${offset}&q=${query}`;
            fetch(searchQueryApi)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    if (json.data.length != 0) {
                        // Create list of gif URLs
                        for (let i = 0; i < json.data.length; i++) {
                            gifslist.push(json.data[i].images.original.url);
                        }
                        // Call render table
                        addgrid(gifslist);
                    } else {
                        addMessage();
                    }
                    requestCompleted = true;
                })

                .catch(err => console.log(err));
        }
    }
}


function createTableRows(itemList) {
    let gifIndex = 0;

    return itemList.map((item, index) => {
        gifIndex = gifIndex + 2;
        let call_name = gifIndex - 2;
        if (gifIndex <= itemList.length) {
            return React.createElement(
                "tr",
                { id: "gif_tr_" + (gifIndex - 2), key: "gif_tr_" + (gifIndex - 2) },
                React.createElement(
                    "td",
                    {
                        id: "gif_td_a" + (gifIndex - 2),
                        key: "gif_td_a" + (gifIndex - 2),
                        className: "gif_td"
                    },
                    [(() => {
                        const image = React.createElement(
                            "img",
                            {
                                ref: (image) => {
                                    enableDragOnImage(image)
                                },
                                src: itemList[gifIndex - 2],
                                width: "125",
                                className: "gif_img",
                                id: "gif_img_" + (gifIndex - 2),
                                key: "gif_img_" + (gifIndex - 2)
                            },
                            null,
                        );
                        return image;
                    })(),
                    React.createElement(
                        "button",
                        {
                            className: "gif_add",
                            id: "button_" + (gifIndex - 2),
                            key: "button_" + (gifIndex - 2),
                            onClick: () => { gif_clicked(call_name) }
                        },
                        "+",
                    )])
                ,
                React.createElement(
                    "td",
                    {
                        id: "gif_td_b" + (gifIndex - 1),
                        key: "gif_td_b" + (gifIndex - 1),
                        className: "gif_td"
                    },
                    [(() => {
                        const image = React.createElement(
                            "img",
                            {
                                ref: (image) => {
                                    enableDragOnImage(image)
                                },
                                src: itemList[gifIndex - 1],
                                width: "125",
                                className: "gif_img",
                                id: "gif_img_" + (gifIndex - 1),
                                key: "gif_img_" + (gifIndex - 1)
                            },
                            null,
                        );
                        return image;
                    })(),
                    React.createElement(
                        "button",
                        {
                            className: "gif_add",
                            id: "button_" + (gifIndex - 2),
                            key: "button_" + (gifIndex - 2),
                            onClick: () => { gif_clicked(call_name + 1) }
                        },
                        "+",
                    )]
                )
            )
        }
    })
}

function addMessage() {
    class ErrorMessage extends React.Component {
        render() {
            return React.createElement("p", { style: { color: "grey" } }, null, this.props.message);
        }
    }
    ReactDOM.render(
        React.createElement(ErrorMessage, { message: "Sorry, we couldn\"t find any results. Try searching for something related." }),
        document.getElementById("root")
    );
}

function addgrid(gifslist) {
    class Grid extends React.Component {
        render() {
            const element = React.createElement(
                "table",
                { id: "gif_table", key: "gif_table" },
                React.createElement(
                    "tbody",
                    { id: "gif_tbody", key: "gif_tbody" },
                    createTableRows(this.props.itemList)
                )
            )
            return element;
        }
    }
    ReactDOM.render(
        React.createElement(Grid, { itemList: gifslist }),
        document.getElementById("root")
    );
}
