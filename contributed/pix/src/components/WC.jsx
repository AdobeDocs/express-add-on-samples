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
import React from "react";

export class WC extends React.Component {
    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent(evt) {
        const propName = `on${evt.type[0].toUpperCase()}${evt.type.substr(1)}`;
        if (this.props[propName]) {
            this.props[propName].call(evt.target, evt);
        }
    }

    componentDidMount() {
        const el = this.el.current;
        const eventProps = Object.entries(this.props).filter(([k,v]) => k.startsWith("on"));
        eventProps.forEach(([k,v]) => el.addEventListener(k.substr(2).toLowerCase(), this.handleEvent));
    }

    componentWillUnmount() {
        const el = this.el.current;
        const eventProps = Object.entries(this.props).filter(([k,v]) => k.startsWith("on"));
        eventProps.forEach(([k,v]) => el.removeEventListener(k.substr(2).toLowerCase(), this.handleEvent));
    }

    render() {
        const filteredProps = Object.fromEntries(Object.entries(this.props).filter(([k,v]) => !k.startsWith("on")));
        return <div ref={this.el} {...filteredProps}>{this.props.children}</div>
    }
}