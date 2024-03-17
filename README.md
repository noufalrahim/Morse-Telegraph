# Telegraph Simulator

Welcome to the Telegraph Simulator repository! This project aims to simulate the operation of a telegraph system through a web application and a corresponding mobile app. It utilizes WebSocket technology to establish real-time communication between the web application and the mobile app. Below is a brief overview of the components and technologies used in this simulator.

## Components:

1. **Admin Portal Website**: This component provides an interface for administrators to manage the telegraph system. Administrators can perform tasks such as adding new users, monitoring system activity, and configuring system settings. The website is built using Next.js and Tailwind CSS.

2. **Telegraph Messaging App**: This mobile application allows users to send telegraph messages using Morse code. Users can input their messages via the app's interface, and the messages are then transmitted using the telegraph system. The app is developed using Flutter.

3. **WebSocket Server**: The WebSocket server acts as a bridge between the admin portal website and the telegraph messaging app. It facilitates real-time communication by managing WebSocket connections and handling message transmission between the web application and the mobile app. The server is built using Node.js.

## Frameworks Used:

- **Next.js**: Next.js is a React framework that enables server-side rendering and provides features such as routing and API routes. It is used to develop the admin portal website, offering a fast and SEO-friendly web application.

- **Node.js**: Node.js is a JavaScript runtime that allows building scalable network applications. In this project, Node.js is utilized to create the WebSocket server, enabling bidirectional communication between the web application and the mobile app.

- **MongoDB**: MongoDB is a NoSQL database used for storing data related to the telegraph system. It facilitates efficient data management and retrieval, ensuring the smooth operation of the system.

- **Flutter**: Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. It is used to develop the telegraph messaging app, providing a cross-platform solution with a rich set of widgets and tools.

- **Tailwind CSS**: Tailwind CSS is a utility-first CSS framework that allows for rapid UI development by applying pre-defined utility classes. It is utilized to style the admin portal website, offering a customizable and responsive design.

## Getting Started:

To set up the Telegraph Simulator on your local machine, follow these steps:

1. Clone this repository to your local environment.
2. Install dependencies for each component:
   - For the admin portal website, navigate to the `admin-portal` directory and run `npm install`.
   - For the telegraph messaging app, navigate to the `telegraph-app` directory and run `flutter pub get`.
   - For the WebSocket server, navigate to the `server` directory and run `npm install`.
3. Configure environment variables:
   - Set up environment variables required for each component, such as database connection strings and server configurations.
4. Start each component:
   - For the admin portal website, run `npm run dev`.
   - For the telegraph messaging app, use Flutter commands to build and run the app on your desired platform (e.g., `flutter run` for Android).
   - For the WebSocket server, run `npm start`.
5. Access the admin portal website and telegraph messaging app through their respective URLs or local addresses.

## Contributing:

Contributions to the Telegraph Simulator project are welcome! If you'd like to contribute new features, enhancements, or bug fixes, please follow the standard GitHub workflow by forking the repository, creating a new branch for your changes, and submitting a pull request.

## License:

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance. Happy simulating! 📡📜

##Screenshots

![Image](https://i.postimg.cc/4NZvCZ8N/Screenshot-2024-03-17-101429.png)
![Image](https://i.postimg.cc/rFJ1MbbG/Screenshot-2024-03-17-101716.png)
![Image](https://i.postimg.cc/h4V83h15/Screenshot-2024-03-17-101731.png)
![Image](https://i.postimg.cc/0jhNW17j/Whats-App-Image-2024-03-17-at-10-31-43-AM.jpg)
![Image](https://i.postimg.cc/Dyb0WmKX/Whats-App-Image-2024-03-17-at-10-31-51-AM.jpg)
![Image](https://i.postimg.cc/c1z64wPW/Whats-App-Image-2024-03-17-at-10-32-00-AM.jpg)
![Image](https://i.postimg.cc/2y167Sbg/Whats-App-Image-2024-03-17-at-10-32-27-AM.jpg)
