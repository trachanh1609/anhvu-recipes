import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';


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

const Root = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Redirect to="/" />
        </Switch>
    </Router>
)

ReactDOM.render(
    <ApolloProvider client={client}>
        <Root />
    </ApolloProvider>
, document.getElementById('root'));
registerServiceWorker();
