import React, { useEffect, useState } from 'react';

import Card from '../ui/Card';
import MealItem from './meal-item/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-burger-app-bb.firebaseio.com/meals.json');
      const data = await response.json();

      const loadedMeals = [];
      console.log(data);
      for (const meal in data) {
        loadedMeals.push({
          id: meal,
          name: data[meal].name,
          description: data[meal].description,
          price: data[meal].price,
        })
      }

      setMeals(loadedMeals);
    };

    fetchMeals();
  }, [])

  const mealsList = meals.map((meal) => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);
  return (
    <section className={classes.meals}>
      <Card><ul>{mealsList}</ul></Card>
    </section>
  );
}

export default AvailableMeals;
