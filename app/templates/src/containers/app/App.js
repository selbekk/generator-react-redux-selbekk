import React, { Component, PropTypes } from 'react';

import SiteHeader from '~/components/site-header/SiteHeader';

class AppContainer extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <SiteHeader />
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

AppContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppContainer;
