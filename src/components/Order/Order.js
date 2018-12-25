//..

import React from 'react';

import classes from './Order.css';


// Component created as a function

const order = (props) => {
	const ingredients = [];

	for (let ingredientName in props.ingredients) {
		ingredients.push(
			{
				name: ingredientName,
				amount: props.ingredients[ingredientName]
			}
		);
	}

	const mappedIngredients = ingredients.map(map_ing => {
		return <span 
		key={map_ing.name}
		style={{
			textTransform: 'capitalize',
			display: 'inline-block',
			margin: '0 8px',
			border: '1px solid #ccc',
			padding: '5px'
		}}
		>{map_ing.name} ({map_ing.amount})</span>;
	});
	return (
		<div className={classes.Order}>
			<p>Ingredients: {mappedIngredients}</p>
			<p>Price: <strong>USD: {props.price}</strong></p>
		</div>
	);
}


export default order;
