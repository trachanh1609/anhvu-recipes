import React from 'react';


class SignUp extends React.Component {

    state= {
        username: "",
        email: "",
        password: "",
        passwordConfimation: "",
    }

    handleChange = event => {
        const { name, value } = event.target ;
        this.setState({ [name] : value });
    }

    render() {
        const { username, email, password, passwordConfimation } = this.state ;
        return (
            <div className="App">
                <h2 className="App">Signup</h2>
                <form className="form">
                    <input value={username} type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
                    <input value={email} type="email" name="email" placeholder="Email" onChange={this.handleChange}/>
                    <input value={password} type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                    <input value={passwordConfimation} type="password" name="passwordConfimation" placeholder="Confirm password" onChange={this.handleChange}/>

                    <button type="submit" className="button-primary">Submit</button>

                </form>
            </div>
        )
    }
}

export default SignUp;