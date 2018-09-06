import React , { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import withSession from './components/withSession';
import Navbar from './components/Navbar';
import Search from './components/Recipe/Search';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token
            }
        })
    },
    onError: ({networkError})=> {
        if(networkError){
            console.log('Network Error', networkError);
            
        }
    }
})

const Root = ({ refetch, session }) => (
    <Router>
        <Fragment>
            <Navbar session={session}></Navbar>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/search" exact component={Search} />
                <Route path="/signin" render={() => <SignIn refetch={refetch} /> } />
                <Route path="/signup" render={() => <SignUp refetch={refetch} /> } />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </Router>
)

const RootWithSession = withSession(Root) ;

ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession />
    </ApolloProvider>
, document.getElementById('root'));
registerServiceWorker();
