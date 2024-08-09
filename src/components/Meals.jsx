import { currencyFormatter } from "../utils/formatter";
import Button from "./UI/Button";

export default function Meals({ meals, onSelectMeal }) {
  return (
    <div>
      <h2>Available Meals</h2>
      {meals.length > 0 && (
        <ul id="meals">
          {meals.map((meal) => (
            <li key={meal.id} className="meal-item">
              <article>
                <img src={`http://localhost:3000/${meal.image}`} />
                <div>
                  <h3>{meal.name}</h3>
                  <p className="price">
                    {currencyFormatter.format(meal.price)}
                  </p>
                  <p className="description">{meal.description}</p>
                </div>
                <p className="meals-item-actions">
                  <Button onClick={() => onSelectMeal(meal)}>
                    Add to cart
                  </Button>
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
