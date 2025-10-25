import { useState } from "react";
import supabase from "../utils/supabase";

export default function Utensils() {
  const [utensils, setUtensils] = useState([]);

  const utensilDisplay = [];
  for (let i = 0; i < utensils.length; i++) {
    utensilDisplay.push(
      <li>
        {utensils[i].guest_name} is bringing {utensils[i].item_name} ({utensils[i].item_type}), enough for {utensils[i].quantity}
      </li>
    );
  }

  async function handleFetchUtensils() {
    const result = await supabase.from("Utensils").select();
    const data = result.data;
    setUtensils(data);
  }

  async function addUtensils(event) {
    event.preventDefault();
    const itemName = event.target.elements.itemName.value;
    const guestName = event.target.elements.guestName.value;
    const quantity = event.target.elements.quantity.value;
    const itemType = event.target.elements.itemType.value;

    const newUtensils = {
      item_name: itemName,
      guest_name: guestName,
      quantity: parseInt(quantity),
      item_type: itemType,
    };

    await supabase.from("Utensils").insert(newUtensils);

    const utensilList = await supabase.from("Utensils").select();
    const data = utensilList.data;
    setUtensils(data);

    event.target.elements.itemName.value = ""
    event.target.elements.guestName.value = ""
    event.target.elements.quantity.value = ""
    event.target.elements.itemType.value = ""
  }

  return (
    <>
      <section>
        <div>
          <h1>Utensils</h1>
          <button onClick={handleFetchUtensils}>Get Utensil List</button>
        </div>
        <div>
          <ul>{utensilDisplay}</ul>
        </div>
        <div>
          <form onSubmit={addUtensils}>
            {/* Item Name Input */}
            <div>
              <label>
                Item Name:
                <input type="text" name="itemName" id="itemName" />
              </label>
            </div>
            {/* Guest Name Input */}
            <div>
              <label>
                Guest Name:
                <input type="text" name="guestName" id="guestName" />
              </label>
            </div>
            {/* Quantity Input */}
            <div>
              <label>
                Quantity:
                <input type="number" name="quantity" id="quantity" />
              </label>
            </div>
            {/* Type of Item Input */}
            <div>
              <label>
                Item Type:
                <select defaultValue="" name="itemType" id="itemType">
                  <option value="" disabled>
                    Select One
                  </option>
                  <option value="Silverware">Silverware</option>
                  <option value="Plates/Cups">Plates/Cups</option>
                  <option value="Paper Towels">Paper Towels</option>
                </select>
              </label>
            </div>
            {/* Submit Button */}
            <div>
                <button type="Submit">Add Utensils</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
