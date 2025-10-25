import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PotluckMeals from './components/PotluckMeals'
import Beverages from './components/Beverages'
import Utensils from './components/Utensils'

function App() {

  return (
    <>
      <PotluckMeals />
      <Beverages />
      <Utensils />
    </>
  )
}

export default App
