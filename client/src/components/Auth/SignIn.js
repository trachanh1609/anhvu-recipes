import React from 'react';
import {Mutation} from 'react-apollo';
import { SIGNIN_USER } from '../../queries';

const initialState = {
    username: "",
    password: "",
};

class SignIn extends React.Component {

    state= { ...initialState } ;

    clearState = () => {
        this.setState({...initialState});
    }

    handleChange = event => {
        const { name, value } = event.target ;
        this.setState({ [name] : value });
    }

    handleSubmit = (event, signinUser ) => {
        event.preventDefault();

        signinUser().then( ( {data} ) => {
            console.log(data) ;
            localStorage.setItem('token', data.signinUser.token);
            this.clearState();
        })
    }

    validateForm = () => {
        const { username, password } = this.state ;

        const isInvalid = !username || !password ;

        return isInvalid ;
    }

    render() {
        const { username, password } = this.state ;
        return (
            <div className="App">
                <h2 className="App">Sign In </h2>
                <Mutation mutation={SIGNIN_USER} variables={{ username, password}}>
                    { ( signinUser, { data, loading, error})=> {


                        return (
                            <form className="form" onSubmit={event => this.handleSubmit(event, signinUser)}>
                                <input value={username} type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
                                <input value={password} type="password" name="password" placeholder="Password" onChange={this.handleChange}/>

                                <button type="submit" 
                                disabled={ loading || this.validateForm() }
                                className="button-primary">Submit</button>
                                {error && <p>{error.message}</p>}
                            </form>
                        ) 
                    }

                    }
                </Mutation>
                
            </div>
        )
    }
}

export default SignIn;