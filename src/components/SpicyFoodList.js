import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filter, setFilter] = useState("All");

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    // basically when there is no more newFood, it will disable the button and prevent crashing the app.
    if (!newFood) return;
    setFoods([...foods, newFood]);
    console.log(newFood);
  }

  // function handleRemove(id) {
  //   setFoods(foods.filter((food) => food.id !== id));
  // }

  function handleHeatLevel(id, heatLevel) {
    setFoods(
      foods.map((food) => {
        if (food.id === id) {
          return {
            ...food,
            heatLevel: heatLevel + 1,
          };
        }
        return food;
      })
    );
  }

  function onChangeFilter(e) {
    console.log(e.target.value);
    setFilter(e.target.value);
  }

  // display foods by the filter
  const filteredFoods = foods.filter((food) => {
    if(filter === "All") return true;
    return food.cuisine === filter;
  }
  );

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={onChangeFilter}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>
        {filteredFoods.map(({ id, name, heatLevel, cuisine }) => (
          <li key={id} onClick={() => handleHeatLevel(id, heatLevel)}>
            Name: {name} | Heat: {heatLevel} | Cuisine: {cuisine}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpicyFoodList;
