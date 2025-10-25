import { useState } from "react";
import supabase from "../utils/supabase";

export default function Beverages() {
  const [drinks, setDrinks] = useState([]);

  const drinkDisplay = [];
  for (let i = 0; i < drinks.length; i++) {
    drinkDisplay.push(
      <li>
        {drinks[i].guest_name} is bringing {drinks[i].beverage_name}, and has
        enough for {drinks[i].quantity} ({drinks[i].type_of_drink})
      </li>
    );
  }

  async function handleFetchDrinks() {
    const result = await supabase.from("beverages").select();
    const data = result.data;
    setDrinks(data);
  }

  async function handleAddDrink(event) {
    event.preventDefault();
    const drinkName = event.target.elements.drinkName.value;
    const guestName = event.target.elements.guestName.value;
    const quantity = event.target.elements.quantity.value;
    const kindOfDrink = event.target.elements.kindOfDrink.value;

    const newDrink = {
      beverage_name: drinkName,
      guest_name: guestName,
      quantity: parseInt(quantity),
      type_of_drink: kindOfDrink,
    };

    console.log(newDrink);

    await supabase.from("beverages").insert(newDrink);

    const drinkList = await supabase.from("beverages").select();
    const data = drinkList.data;
    setDrinks(data);

    event.target.elements.drinkName.value = "";
    event.target.elements.guestName.value = "";
    event.target.elements.quantity.value = "";
    event.target.elements.kindOfDrink.value = "";
  }

  return (
    <>
      <section className="container text-center">
        <div>
          <h1>Beverages</h1>
          <button className="btn btn-success" onClick={handleFetchDrinks}>
            Get Drink List
          </button>
        </div>
        <div>
          <ul className="text-start border move-center m-1">{drinkDisplay}</ul>
        </div>
        <div className="form-group">
          <form onSubmit={handleAddDrink}>
            {/* Drink Name Input */}
            <div>
              <label>
                Drink Name:
                <input
                  className="form-control"
                  type="text"
                  name="drinkName"
                  id="drinkName"
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
            {/* Quanity Input */}
            <div>
              <label>
                Quantity:
                <input
                  className="form-control"
                  type="number"
                  name="quantity"
                  id="quantity"
                />
              </label>
            </div>
            {/* Type Of Drink Input */}
            <div>
              <label>
                Type Of Drink:
                <select
                  defaultValue=""
                  name="kindOfDrink"
                  id="kindOfDrink"
                  className="form-control"
                >
                  <option value="" disabled>
                    Select One
                  </option>
                  <option value="Soda">Soda</option>
                  <option value="Juice/Tea">Juice or Tea</option>
                  <option value="Alcohol">Alcohol</option>
                </select>
              </label>
            </div>
            {/* Submit Button */}
            <div className="m-2">
              <button className="btn btn-success" type="submit">
                Add Drink
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
