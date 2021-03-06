import { gql } from 'apollo-boost';

/* Recipes Queries */ 
export const GET_ALL_RECIPES = gql`
query {
    getAllRecipes{
        _id
        name
        description
        instructions
        category
        likes
        username
    }
}
`;

/* Recipes Mutations */ 
export const ADD_NEW_RECIPE = gql`
    mutation ( $name: String! , $category: String! , $description: String!, $instructions: String!, $username: String) {
        addRecipe ( name: $name, category: $category, description: $description, instructions: $instructions, username: $username) {
            _id
            name
            description
            instructions
            category
            likes
            username
        }
    }
`;

/* User Queries */ 
export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            username
            joinDate
            email
        }
    }
`;

/* User Mutations */ 
export const SIGNUP_USER = gql`
mutation( $username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password ){token}
  }

`;

export const SIGNIN_USER = gql`
mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password ){token}
  }

`;