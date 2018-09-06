import React from 'react';

const RecipeItem = ({recipe})=> (
    <li>
        <h5>{recipe.name}</h5>
        <h6>{recipe.category}</h6>
        <p>{recipe.description}</p>
    </li>
);

export default RecipeItem;