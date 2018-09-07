import React from 'react';
import { Mutation} from 'react-apollo';

import { ADD_NEW_RECIPE } from '../../queries';

const emptyRecipe = {
    name: "",
    category: "Fastfood",
    description: "",
    instructions: "",
    username: "",
}

class AddRecipe extends React.Component{

    state = {
        ...emptyRecipe,
    }

    componentDidMount(){
        this.setState({username: this.props.session.getCurrentUser.username});
    }

    handleChange = (event) => {
        const { name, value } = event.target ;

        // working, longer version
        let updatedRecipe = this.state;
        updatedRecipe[name] = value;
        this.setState({ updatedRecipe });

        // or change state={name, category, description, instructions} and use this 
        // this.setState({[name]: value});
    }

    validateInput = () => {
        const { name , category, description, instructions } = this.state ;
        const isInvalid = !name || !category || !description || !instructions ;
        return isInvalid;
    }

    handleSubmit = (event, addRecipe ) => {
        event.preventDefault();
        console.log("Submit is pressed") ;

        addRecipe()
        .then( ({data})=>{
            console.log('New Recipe added');
            this.setState( {
                ...emptyRecipe
            });
        })

    }

    render() {
        const { name, category, description, instructions, username} = this.state ;

        return (
            <div className="App">
                <h4 className="main-title">Add Recipe</h4>

                <Mutation mutation={ADD_NEW_RECIPE} variables={ {name, category, description, instructions, username } }>
                    {
                        (addRecipe, { data, loading, error } ) => {

                            return (
                <form className="form" onSubmit={(event)=>{this.handleSubmit(event, addRecipe)}}>
                    <input type="text" value={name} onChange={this.handleChange} name="name" placeholder="Name"/>
                    <select name="category" value={category} onChange={this.handleChange}>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Fastfood">Fastfood</option>
                    </select>
                    <input type="text" value={description} onChange={this.handleChange} name="description" placeholder="Description"/>
                    <input type="text" value={instructions} onChange={this.handleChange} name="instructions" placeholder="Instructions"/>
                    <button type="submit" 
                            disabled={loading || this.validateInput()}
                            className="button-primary">
                            Submit
                    </button>
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

export default AddRecipe;