import { useState } from "react";
import supabase from "../utils/supabase";

export default function PotluckMeals() {
  const [meals, setMeals] = useState([]);

  const mealsDisplay = [];
  for (let i = 0; i < meals.length; i++) {
    mealsDisplay.push(
      <li>
        {meals[i].guest_name} is bringing {meals[i].meal_name} for{" "}
        {meals[i].serves} ({meals[i].kind_of_dish})
      </li>
    );
  }

  async function handleFetchMeals() {
    const result = await supabase.from("potluck_meals").select();
    const data = result.data;
    setMeals(data);
  }

  async function handleAddMeal(event) {
    event.preventDefault();
    const mealName = event.target.elements.mealName.value;
    const guestName = event.target.elements.guestName.value;
    const serves = event.target.elements.serves.value;
    const kindOfDish = event.target.elements.kindOfDish.value;

    const newMeal = {
      meal_name: mealName,
      guest_name: guestName,
      serves: parseInt(serves),
      kind_of_dish: kindOfDish,
    };

    await supabase.from("potluck_meals").insert(newMeal);

    const mealList = await supabase.from("potluck_meals").select();
    const data = mealList.data;
    setMeals(data);

    event.target.elements.mealName.value = "";
    event.target.elements.guestName.value = "";
    event.target.elements.serves.value = "";
    event.target.elements.kindOfDish.value = "";
  }

  return (
    <>
      <section className="container text-center">
        <div>
          <h1>Potluck Meals</h1>
          <button onClick={handleFetchMeals} className="btn btn-success">
            Get Meal List
          </button>
        </div>
        <div>
          <ul className="text-start border move-center m-1">{mealsDisplay}</ul>
        </div>
        <div className="form-group">
          <form onSubmit={handleAddMeal}>
            {/* Meal Name Input */}
            <div>
              <label>
                Meal Name:
                <input
                  className="form-control"
                  type="text"
                  name="mealName"
                  id="mealName"
                />
              </label>
            </div>
            {/* Guest Name Input */}
            <div>
              <label>
                Guest Name:
                <input
                  className="form-control"
                  type="text"
                  name="guestName"
                  id="guestName"
                />
              </label>
            </div>
            {/* Serves Input */}
            <div>
              <label>
                Serves:
                <input
                  className="form-control"
                  type="number"
                  name="serves"
                  id="serves"
                />
              </label>
            </div>
            {/* Kind Of Dish Input */}
            <div>
              <label>
                Kind Of Dish:
                <select
                  className="form-control"
                  defaultValue=""
                  name="kindOfDish"
                  id="kindOfDish"
                >
                  <option value="" disabled>
                    Select One
                  </option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Desert">Desert</option>
                </select>
              </label>
            </div>
            {/* Submit Button */}
            <div className="m-2">
              <button className="btn btn-success" type="submit">
                Add Meal
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
