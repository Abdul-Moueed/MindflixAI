# 🎬 MindFlix AI

An AI-powered movie recommendation web application that analyzes a user's emotional state and delivers personalized movie recommendations using Google Gemini AI. By combining artificial intelligence with real-time movie data from The Movie Database (TMDB), MindFlix AI helps users discover films that match their mood, making the movie selection process faster, easier, and more enjoyable.

---

# 🌐 Live Demo

**Live Application:**  
https://mindflix-ai-stnm.vercel.app/

---

# 📖 Project Description

MindFlix AI is a full-stack web application designed to provide personalized movie recommendations based on a user's current emotional state. Instead of relying on viewing history or popular trends, the application uses an interactive mood questionnaire and optional custom input to understand how the user is feeling. The collected responses are analyzed using Google Gemini AI, which generates intelligent movie recommendations tailored to the user's emotions.

To enhance the recommendations, the application integrates with The Movie Database (TMDB) API to retrieve detailed movie information such as posters, ratings, release dates, genres, and trailers. This combination of AI-powered reasoning and live movie data creates an engaging and personalized movie discovery experience.

MindFlix AI demonstrates the practical use of artificial intelligence in solving a real-world problem by helping users spend less time searching for movies and more time enjoying content that matches their mood.

---

# ❗ Problem Statement

With thousands of movies available across multiple streaming platforms, choosing what to watch can be overwhelming. Traditional recommendation systems primarily rely on watch history, popularity, or similar user behavior, which often fails to reflect how a person feels at the present moment.

MindFlix AI addresses this challenge by analyzing the user's current emotional state and providing personalized movie recommendations that align with their mood. This approach offers a more meaningful and enjoyable viewing experience while reducing decision fatigue.

---

# 🎯 Target Users

MindFlix AI is designed for:

- Movie enthusiasts looking for personalized recommendations
- Users who struggle to decide what to watch
- People who want movies that match their current mood
- Anyone interested in discovering films beyond traditional recommendation algorithms

---

# ✨ Features

- AI-powered mood analysis using Google Gemini AI
- Personalized movie recommendations based on user emotions
- Interactive mood questionnaire
- Optional custom mood input
- AI-generated explanations for each recommendation
- Top Pick recommendation with additional curated suggestions
- Movie search functionality
- Real-time movie information using the TMDB API
- Movie posters, ratings, release years, and genres
- Official movie trailer links
- Save favorite movies
- Mood history tracking
- Responsive design for desktop and mobile devices
- Fast and intuitive user interface

---

# 🤖 AI Feature

MindFlix AI uses **Google Gemini 2.5 Flash** to analyze the user's responses from the mood questionnaire and optional custom input. Based on this analysis, the AI identifies the user's emotional state and generates personalized movie recommendations.

### AI Workflow

1. The user completes the mood questionnaire.
2. Responses are sent to the Express.js backend.
3. Google Gemini analyzes the user's emotional profile.
4. Gemini generates:
   - One **Top Pick** movie recommendation.
   - Five additional personalized movie recommendations.
   - A short explanation for why each recommendation matches the user's mood.
5. The application uses the TMDB API to retrieve posters, ratings, release years, genres, and trailers for each recommended movie.
6. The enriched recommendations are displayed in the application.

### AI System Prompt Summary

The application instructs Google Gemini AI to:

- Analyze the user's emotional state based on questionnaire responses.
- Recommend only real movies.
- Provide exactly one Top Pick and five additional recommendations.
- Match recommendations to the user's emotions.
- Avoid repetitive blockbuster suggestions.
- Prefer hidden gems, classics, independent films, international cinema, documentaries, anime, and recent releases where appropriate.
- Explain why each movie matches the user's mood.
- Return all recommendations in a structured JSON format for processing by the application.

---

# 🛠️ Tools, Services & AI Models Used

## Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

## Backend
- Node.js
- Express.js

## Database
- Supabase

## Artificial Intelligence
- Google Gemini 2.5 Flash

## External APIs
- The Movie Database (TMDB) API

## Deployment
- Vercel

## Version Control
- Git
- GitHub

---

# 📸 Screenshots

## Home Page

<img width="905" height="435" alt="Home mindflix" src="https://github.com/user-attachments/assets/8efa9a1e-f38c-4282-b21f-14b3e4a9403d" />


---

## Mood Analysis

<img width="243" height="439" alt="Mood analysis" src="https://github.com/user-attachments/assets/5fb50360-8ca8-4569-b1fe-a185002ba37e" />


---

## AI Recommendations

<img width="589" height="446" alt="Recommendations" src="https://github.com/user-attachments/assets/2c54b812-bbe6-4a4e-8424-6aa20ef3eafc" />


---

## Favorites

<img width="573" height="422" alt="Favourites" src="https://github.com/user-attachments/assets/2486f2b7-219a-4de0-a7a7-e30c486e320e" />
