import React from 'react';
import {Mutation} from 'react-apollo';
import { SIGNUP_USER } from '../../queries';

const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfimation: "",
};

class SignUp extends React.Component {

    state= { ...initialState } ;

    clearState = () => {
        this.setState({...initialState});
    }

    handleChange = event => {
        const { name, value } = event.target ;
        this.setState({ [name] : value });
    }

    handleSubmit = (event, signupUser ) => {
        event.preventDefault();

        signupUser().then(data => {
            console.log(data) ;
            this.clearState();
        })
    }

    validateForm = () => {
        const { username, email, password, passwordConfimation } = this.state ;

        const isInvalid = !username || !email || !password || password !== passwordConfimation ;

        return isInvalid ;
    }

    render() {
        const { username, email, password, passwordConfimation } = this.state ;
        return (
            <div className="App">
                <h2 className="App">Signup</h2>
                <Mutation mutation={SIGNUP_USER} variables={{ username, email, password}}>
                    { ( signupUser, { data, loading, error})=> {


                        return (
                            <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
                                <input value={username} type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
                                <input value={email} type="email" name="email" placeholder="Email" onChange={this.handleChange}/>
                                <input value={password} type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                                <input value={passwordConfimation} type="password" name="passwordConfimation" placeholder="Confirm password" onChange={this.handleChange}/>

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

export default SignUp;