import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItems/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorFetch, setErrorFetch] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch('https://react-http-test-454f1-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        });
      }
      setMeals(transformedData);
      setIsLoading(false);
    }
    fetchMeals().catch(error => {
      setIsLoading(false);
      setErrorFetch(error.message);
    })
  }, []);

  if (isLoading) {
    return (
      <section>
        <p style={{ textAlign: 'center', color: 'white' }}>Loading...</p>
      </section>
    );
  }

  if (errorFetch) {
    return (
      <section>
        <p style={{ textAlign: 'center', color: 'white' }}>{errorFetch}</p>
      </section>
    );
  }

  const mealsList = meals.map(meal =>
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  );
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals