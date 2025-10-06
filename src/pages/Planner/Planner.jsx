import DayCard from "../../components/DayCard.jsx";
import React, { useEffect, useState } from "react";
/* 
TODO: Implement meal planning features here.
Features will include:
- Viewing planned meals for the week
- Each week will have 7 days, where the first day is today
- Each day will have 3 meals: Breakfast, Lunch, Dinner
- For what days of the week are displayed, depends on what day it is today, meaning each day will have a different set of days displayed depending on what day it is today
- Ability to add meals to a day of the week and remove meals from a day of the week.
- Allows for users to drag and drop meals between days and between meal types (e.g., moving a meal from Breakfast on Monday to Lunch on Tuesday).
- Ability to save a days worth of meals as a template for future use.
- Ability to click inside of the meal card to view more details about the meal, such as ingredients, instructions, etc.

Architecture:
## - Starting Natural flow
- The days of the the week will be displayed in a horizontal fashion using cards. and for each card will have a header for the day of the week respectively
- Below each header, inside of the card, will have 3 section, each one for each meal type (Breakfast, Lunch, Dinner). There will be a button to save the days meals as a template.
- Each section will have a 3 meals per section. Users don't need to fill out all 3 meals per section, but they can if they want to.
- Each meal will be represented by a smaller card isnide of the section, and will show th meal name, and a small image of the meal. Also a remove button to remove the meal from the section.
- If no meals have been added to the planner, then a message will be displayed to the user to add meals to the planner.
- Below those cards the days of the week cards will display a button to add a meal to the planner, this will route the user to the search page, where they can search for a meal and add it to the planner.
- Below the button will be the templates of the meals that user as saved.
- If no meals have been added to template, then a message will be displayed to the user to add meals to the planner.
## - End Natural flow

Considerations for arcihtecture:
TODO: - How do we implement drag and drop functionality?
TODO: - How do we want to save the users meals for templates?
TODO: - How do we want to handle meal details view when a user clicks on a meal card send the user to the meal details page, using a modal or a new page?
* Resolved ^: we will use the query parameter that is passed and call the api.
TODO: - How do we make sure that the days of the week dont wrap around when the next day comes around
## - Component Breakdown
- Planner
  - DayCard (for each day of the week)
    - MealSection (for each meal type: Breakfast, Lunch, Dinner)
      - MealCard (for each meal added to the section)
      - If no meals, show message to add meals
      - SaveAsTemplateButton
  - AddMealButton
  - TemplateSection
    - TemplateCard (for each saved template)
    - If no templates, show message to add templates

*/

const Planner = () => {
  const [weekdays, setWeekdays] = useState([]);

  useEffect(() => {
    const setDates = () => {
      const today = new Date();
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date);
      }
      setWeekdays(dates);
    };

    setDates();
  }, []);
  return (
    <div className="flex-1 mt-6">
      <h1 className="text-center">Your Weekly Plan</h1>
      <ul className="flex justify-center items-stretch gap-4 mt-6 w-full px-2.5">
        {weekdays.map((weekday, index) => {
          return (
            <li className="flex-1" key={index}>
              <DayCard weekday={weekday} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Planner;
