# Book API
## Gruppmöte 1

Datum: 8 / 9 2026
Deltagare: Minai, Erik & Lollo


---

## 1. Ansvarsområden

### Users & Auth
**Ansvarig: Lollo**  


### Books

**Ansvarig: Minai**


### Reviews
**Ansvarig: Erik**  


---

## 2. Gemensam projektstruktur

**Beslut:**  

### Mappstruktur

API-grupp-3/
├── api/
│   └── index.ts
│
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   ├── bookController.ts
│   │   └── reviewController.ts
│   │
│   ├── middleware/
│   │   └── verifyToken.ts
│   │
│   ├── models/
│   │   ├── User.ts
│   │   ├── Book.ts
│   │   └── Review.ts
│   │
│   └── routes/
│       ├── authRoutes.ts
│       ├── userRoutes.ts
│       ├── bookRoutes.ts
│       └── reviewRoutes.ts
│
├── public/
│   ├── To be continued
│
├── docs/
│   └── meeting-1.md
│
├── .env
├── .env.example
├── .prettierrc
├── .gitignore
├── package.json
└── README.md


**Att göra:**  

- [skapa grundstruktur i trädet för backend] 
- [ istallera prettier? ] 
- [ Se till att alla gjort gitpull innan dagens slut] 

---

## 3. MongoDB

**Databas: fixat ✅**  

**Collections:**

- users
- books
- reviews

**Ansvarig för Atlas: Lollo**  



---

## 4. Environment Variables

Variabler som projektet behöver:

- `MONGODB_URL`
- `JWT_SECRET`
- `NODE_ENV`
- `CLIENT_URL`
- `PORT = 3000`

**Anteckningar: alla lägger in sina egna .env filer med rätt MONGODB_URL**  

---

## 6. Git & GitHub

**Repository: Skapat av Minai**  

**Branch-struktur:**
- dev-erik
- dev-minai
- dev-lollo


**Hur gör vi med Pull Requests / merge till main?** 
Vi mergar till main tillsammans 

---

## 7. Gemensam setup

**Ansvarig: ALLA TILLSAMMANS**  

- [X] Kontrollera starter template
- [X] MongoDB-anslutning
- [X] `.gitignore`
- [?] `.env.example`
- [X] Gemensam filstruktur
- [X] Kontrollera att projektet startar

**Anteckningar: Starta egna branches själva genom github-repo**  

---

## Nästa möte

**Datum: 9/9 efter Eriks ledningsgruppmöte**  
**Vad ska vara klart tills dess: Vi ska alla börja smått med våra ansvarsområden + egna branches**  