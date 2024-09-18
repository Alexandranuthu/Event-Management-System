# Event Management System

This web app helps event organizers manage everything from ticketing to attendee tracking. Built with the MERN stack (MongoDB, Express, React, Node.js), it provides an all-in-one solution for planning and running events efficiently.

## Features

- **Event Creation:** Allows organizers to create and manage events with details like date, time, location, and description.
- **Ticketing System:** 
Attendees can purchase tickets and receive QR codes for entry.
Theres and option to set different ticket types like early bird, VIP, VVIP etc
Payment integration with options like MPESA for easy transactions
- **QR Code Check-In:** Attendees can check in at events using QR codes.
- **Attendee Management:** Manage and view attendee details and ticket statuses.
- **Search and filtering**
To help users find events based on location and category
filter to narrow down e.g free events or online events etc
- **RSVP and Attendance Tracking**
Organizers can track RSVPs and attendance for each event.
Users can RSVP to events, so organizers know how many people to expect
- **Calendar Integration**
users can sync events with their google calendar or other calendar reminders
- **Admin Dashboard**
organizers can have access to a dashboard where they can manage their ticket sales and see stats e.g number of attendees

### why this is cool? 
- for organizers to manage events way easier
- for attendee to find it super convenient to access events, buy tickets

## Getting Started

### Prerequisites

- Node.js (version 18.x recommended)
- MongoDB (local or hosted, e.g., MongoDB Atlas)
- npm or yarn (for package management)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repository-name.git
    ```
2. Navigate to the project directory:
    ```bash
    cd your-repository-name
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. **Set up environment variables**: Create a .env file in the root directory and add your MongoDB URI and any other necessary environment variables:
    ```bash
    PORT=5000
    MONGO_URI=your-mongodb-connection-string
    ```
5. Start the server:
    ```bash
    nodemon "primary-entry-point-of-app e.g index.js"
    ```
   
## USAGE
- **Access the API**: Navigate to http://localhost:5000 in your browser to see the API running.
- **Check Routes**: Test API routes using tools like Postman.

## Contributing
Feel free to open issues or submit pull requests if you have suggestions or improvements. Contributions are welcome!

## Contact
For questions or further information, you can contact me at  
Email: <a href="alexandranuthuu@gmail.com">alexandranuthuu@gmail.com</a>


