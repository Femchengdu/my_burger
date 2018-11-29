import React from 'react';

import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	const transIngredients = Object.keys(props.ingredients)
		.map(ingKey => {
			return [...Array(props.ingredients[ingKey])].map((_, elemIndex) => {
				return <BurgerIngredient key={ingKey + elemIndex} type={ingKey} />;
			} );
		});
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
