# SNAP interview

## Overview
This is a sample interview project for engineering managers at SNAP.

## Agenda 

### General Questions
1. Introduce yourself
2. Can you tell me about a time when you had to resolve a conflict?

### API questions
1. can you design API to create a profile for a user? This API will be consumed by snapchat developers and business teams. 
Field in the profile:
    - name
    - phone number
    - address with city, state, country
    - username 
2. why do you represent address using json instead of string? 
3. can you design API to update a profile? (similar to question 1)
### Coding questions
Given a string of alphanumeric characters and parentheses, return a string with balanced parentheses by removing the fewest characters possible. You cannot add anything to the string. Example 1: Input: "ab(a(c)fg)9)" Output: "ab(a(c)fg)9" or "ab(a(c)fg9)" or "ab(a(cfg)9)"

Sample of Answer:
1. create a profile for a user
```
POST /api/v1/profiles
{
    "name": "John Doe",
    "phone_number": "+1234567890",
    "address": {
        "city": "Anytown",
        "state": "CA",
        "country": "USA"
    },
    "username": "john_doe"
}
```
Method: POST
Endpoint: /profiles
BaseURL: https://api.snapchat.com
Headers:
    - Content-Type: application/json
    - Authorization: Bearer <token>

Response: (Success - 201 Created)
```
{
  "user_id": "abc123xyz",
  "name": "John Doe",
  "username": "john_doe123",
  "phone_number": "+11234567890",
  "address": {
    "street": "123 Main St",
    "city": "Los Angeles",
    "state": "California",
    "country": "USA"
  },
  "created_at": "2025-03-14T12:00:00Z"
}
```

Response: (Error - 400 Bad Request)
```
{
  "error": "Invalid phone number"
}
```
Error Response:
- 400 Bad Request: Invalid phone number
- 409 Conflict: User already exists
- 500 Internal Server Error: Failed to create profile   


```
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const profiles = new Map(); // Simulated in-memory database

// Utility function to validate input
const isValidProfile = ({ name, phone_numbers, address, username }) =>
    name && username && Array.isArray(phone_numbers) && phone_numbers.length > 0 &&
    address && address.city && address.state && address.country;

// POST /api/v1/profiles - Create a new profile
app.post("/api/v1/profiles", (req, res) => {
    const { name, phone_numbers, address, username } = req.body;

    // Validate input
    if (!isValidProfile(req.body)) {
        return res.status(400).json({ error: "Invalid input data" });
    }

    // Check if username already exists
    if (profiles.has(username)) {
        return res.status(409).json({ error: "Username already exists" });
    }

    // Create new profile
    const profile = {
        id: uuidv4(),
        name,
        phone_numbers,
        address,
        username,
        created_at: new Date().toISOString()
    };

    profiles.set(username, profile);

    res.status(201).json(profile);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```
Key Features & Best Practices Used:
- RESTful Principles: Uses POST for creating resources.
- Declarative Approach: Uses functional validation and avoids unnecessary loops.
- Validation: Ensures all required fields are present.
- Error Handling: Returns appropriate HTTP status codes (400, 409, 500).
- UUID for IDs: Generates a unique id for each profile.
- In-Memory Database Simulation: Uses Map() for storing profiles (can be replaced with a real DB like MongoDB/PostgreSQL).

2. why do you represent address using json instead of string? 
- structured data is easier to query and analyze. 
- easier to parse and use/validation in different parts of the application. 
- flexibility to for future enhancements 
    adding more fields to the address if needed in the future. 
- standardization & API consistency
    Keeping the same format makes it easier for integration with other services that expect the same format. 

3. can you design API to update a profile? 
Method: PUT
Endpoint: /profiles/{user_id}
BaseURL: https://api.snapchat.com
Headers:
    - Content-Type: application/json
    - Authorization: Bearer <token>
Path Parameters:
- user_id: string : the unique identifier for the user whose profile needs to be updated 

### Addtional considerations:
- rate limiting : implement rate limiting to prevent abuse
- error handling: return appropriate error codes and messages
- validation: validate the input data
    - phone number: must follow E.164 format 
    - username: must be unique 
    - address: must be a valid address, including city, state, country 
- authentication: require API key or oauth token 2.0
- authorization: require proper access control for different roles












