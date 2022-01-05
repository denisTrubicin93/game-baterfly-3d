import React from 'react';
import { Route } from 'react-router-dom';
import Editor from './components/DemoGame/Editor';
import Round2 from './containers/Demo/Round2';
import Round3 from './containers/Demo/Round3';
// import TotalArcade from './components/DemoGame/totalArcade';
import Menu from './containers/Home/Menu';

const Routes = () => {
    return (
        <>
            <Route exact path="/" component={Menu} />
            <Route exact path="/round1" component={Editor} />
            <Route exact path="/round2" component={Round2} />
            <Route exact path="/round3" component={Round3} />
            {/* <Route exact path="/total" component={TotalArcade} /> */}
        </>
    );
};

export default Routes;
