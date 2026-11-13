# Queen Events – React (Vite)

## Run
```
npm install
npm run dev        # http://localhost:5173
npm run build      # output in /dist
```
## Deploy (Netlify)
Fastest: drag the ready-built `dist` folder onto app.netlify.com/drop.
Or connect the repo (settings are in `netlify.toml`).

## Pages (src/pages)
Home · Events (search, filters, sort) · Calendar · Venue Map · About · My Events · Login · Signup · Admin

## Accounts
- Signup creates an account stored in this browser (demo only: no real server).
- **Admin:** open Login → "Admin login", then press **Login as Admin** (default saved details).
  Default admin: admin@queenevents.com / admin123 (change in `src/data/areas.js`).
- Admin can add or delete events; they appear on Events, Calendar and Map instantly.

## Structure
```
public/images        photos + video
src/data             events.js, areas.js (map coordinates, colours, admin default)
src/pages            Home, Events, Calendar, MapPage, About, MyEvents, Login, Signup, Admin
src/components       Navbar, Hero, EventCard, Filters, EventDetails, RegistrationForm, Contact, Countdown, Highlights, Footer, Modal, Toast, BackToTop
src/hooks            useLocalStorage, useRoute
src/styles/index.css
```
