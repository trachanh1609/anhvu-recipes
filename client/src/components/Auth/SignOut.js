import React from 'react';
import { withRouter} from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

const handleSignOut = (client, history ) => {
    localStorage.setItem('token', '');
    client.resetStore();
    history.push("/");
}
const Signout = ({history}) => (
    <ApolloConsumer>
        {
            client => {

                return (
                    <button onClick={()=> handleSignOut(client, history )}>Signout</button>
                )
            }
        }
    </ApolloConsumer>
)

export default withRouter(Signout);