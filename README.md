
#  TrueTix Frontend

## 📌 Project & Repository Description
TrueTix frontend is a responsive React application that connects users to a dynamic ticketing experience. Users can browse events, register, verify their accounts, manage their tickets, and interact with the resale system.

## 🛠️ Tech Stack
- React
- Axios
- React Router
- Tailwind CSS
- JWT Integration
- Docker

##  Backend Repository
[TrueTix Backend (Django)](https://github.com/Taif_Asiri/TrueTix_backend)

## IceBox Features

-  Resale ticket listing page
-  QR code display for purchased tickets
-  Event types: Sports, Cultural, Entertainment, and more
-  Dark mode support
-  Enhanced cart experience
-  Advanced filtering and search
- User dashboard




| Route Path             | Component/Page         | Description                                      | Access Level     |
|------------------------|------------------------|--------------------------------------------------|------------------|
| `/`                    | `HomePage`             | Landing page with featured content               | Public           |
| `/events/:id`          | `EventDetail`          | Detailed view of a specific event                | Public           |
| `/login`               | `LoginPage`            | User login form                                  | Public           |
| `/signup`              | `SignupPage`           | User registration form                           | Public           |
| `/verify`              | `Verify`               | OTP verification after registration              | Public           |
| `/navbar`              | `Navbar`               | Navigation bar component                         | Public           |
| `/events`              | `EventList`            | List of all available events                     | Public           |
| `/cart`                | `CartPage`             | Shopping cart with selected tickets              | Authenticated    |
| `/tickets`             | `MyTickets` (Protected)| User’s purchased tickets                         | Authenticated    |