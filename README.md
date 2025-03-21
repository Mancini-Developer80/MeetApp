# **App Key Features**

## **1. Filter Events by City**
**User Story:**  
*As a user, I should be able to filter events by city so that I can see a list of events taking place in that city.*

### **Scenarios:**  
- **Scenario 1:** Show upcoming events from all cities when no city is specified.  
  - **GIVEN** the user hasn’t searched for any city,  
  - **WHEN** the user opens the app,  
  - **THEN** they should see a list of upcoming events from all cities.

- **Scenario 2:** Display city suggestions when a user searches.  
  - **GIVEN** the main page is open,  
  - **WHEN** the user starts typing in the city textbox,  
  - **THEN** they should receive a list of suggested cities matching their input.

- **Scenario 3:** Select a city from the suggested list.  
  - **GIVEN** the user is typing “Berlin” in the city textbox and a list of suggestions is displayed,  
  - **WHEN** they select a city (e.g., “Berlin, Germany”) from the list,  
  - **THEN** their selection is applied, and a list of upcoming events in that city is displayed.

---

## **2. Show/Hide Event Details**
**User Story:**  
*As a user, I should be able to show or hide event details so that I can control the information displayed.*

### **Scenarios:**  
- **Scenario 1:** Show event details.  
  - **GIVEN** the user wants to see event details,  
  - **WHEN** they click the "Show Details" button,  
  - **THEN** more details about the event are displayed.

- **Scenario 2:** Hide event details.  
  - **GIVEN** the user wants to hide event details,  
  - **WHEN** they click the "Hide Details" button,  
  - **THEN** the event details are hidden.

---

## **3. Specify Number of Events**
**User Story:**  
*As a user, I should be able to specify the number of events displayed so that I can control the amount of information.*

### **Scenarios:**  
- **Scenario 1:** Specify a number of events.  
  - **GIVEN** the user specifies a number of events,  
  - **WHEN** they search for events,  
  - **THEN** the app displays the specified number of events.

- **Scenario 2:** Default to all events if no number is specified.  
  - **GIVEN** the user doesn’t provide a number of events,  
  - **WHEN** they search for events,  
  - **THEN** all events meeting other criteria are displayed.

---

## **4. Use the App When Offline**
**User Story:**  
*As a user, I want to use the app offline so that it remains available without an internet connection.*

### **Scenario:**  
- **GIVEN** the user has stored the current state of the app on their device,  
- **WHEN** they lose internet connection,  
- **THEN** they can continue using the stored state of the app.

---

## **5. Add an App Shortcut to the Home Screen**
**User Story:**  
*As a user, I can add an app shortcut to the home screen so that I can quickly access the app.*

**Note:** This feature is dependent on platform capabilities and cannot be directly tested by a programmer.

---

## **6. Display Charts Visualizing Event Details**
**User Story:**  
*As a user, I can view charts visualizing event details so that I can easily understand the event data.*

### **Scenarios:**  
- **Scenario 1:** View chart on the event details page.  
  - **GIVEN** the user is on the event details page,  
  - **WHEN** they view the event details,  
  - **THEN** a chart visualizing the event data is displayed.

- **Scenario 2:** Display a chart for a specific event.  
  - **GIVEN** the user has selected a specific event,  
  - **WHEN** they navigate to the event details page,  
  - **THEN** a chart displaying the event’s data is shown in visual format.
