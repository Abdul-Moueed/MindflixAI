export interface QuestionOption {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  trait: string;
}

export interface PsychQuestion {
  id: number;
  category: string;
  questionText: string;
  questionHighlight: string;
  subtitle: string;
  bgImage: string;
  options: QuestionOption[];
}

export const PSYCHOLOGICAL_QUESTIONS: PsychQuestion[] = [
  {
    id: 1,
    category: "Sensory Environment",
    questionText: "How does the sound of distant rain on a cold glass window make you feel?",
    questionHighlight: "distant rain",
    subtitle: "Your immediate sensory comfort dictates the tempo and texture of cinema you need right now.",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj6XsM0AJkVRTwrP5gKH31ngqprz5uWiscZ_qvjtvY54Cdm6TNOWCwyj9vrO-vR_iZbLeDPUOjVctOu-n1YOC4FHqYzd9sEL2wNBFpLfzaL81lvafVn0GD9ofOQk37zMs9iylrXU6B3mpQqku8wpyjGbp2v15dio92dE9zQw3pD_tOBWWTxxrZkm5g7mxlBUWWr5R7ZzhFOkgwxgplK_BIY4jLIW92KXYsFOU5ieCxC8A12KtY-Iow7qDzEjnMuvrCPUrGJb4NIxA",
    options: [
      { id: "1a", emoji: "🏠", title: "Cozy & Safe", subtitle: "Warmed by indoor solitude", trait: "Cozy Nostalgia" },
      { id: "1b", emoji: "🫠", title: "Melancholic", subtitle: "Reflecting on distant memories", trait: "Bittersweet Depth" },
      { id: "1c", emoji: "⚡", title: "Restless", subtitle: "Craving movement & storm intensity", trait: "Adrenaline Surge" },
      { id: "1d", emoji: "🌌", title: "Cosmic Solitude", subtitle: "Small in a vast quiet universe", trait: "Philosophical Sci-Fi" }
    ]
  },
  {
    id: 2,
    category: "Emotional Needs",
    questionText: "What kind of catharsis does your mind subconsciously crave tonight?",
    questionHighlight: "catharsis",
    subtitle: "Are you seeking emotional release, intellectual stimulation, or sheer escapist joy?",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpfwT9y4pKe3scHFJL6Qq5IvtlKZLdT2msra3KnzBYVeSLFin5-ZZdZ4T0VyqZzEwRyATTS1nh57fxnyQd8RQ62KTex7iVsHTKsdOCjmM-3rEgd7aa7dY4sVC3ReLI-PEA6TO9BzENJ56u2qtYC0wbCX0xtzQuOMRbMPC2leTpScKtgHTsxaqmuxLBaIoGCmWCXExrXpXngDzc4aoS71b3D9iH-xM22njBweQadqX_y8_5RbpzsUsov15H7_wyxNvIchVfS4Qeqg0",
    options: [
      { id: "2a", emoji: "😭", title: "A Good Cry", subtitle: "Heartfelt human vulnerability", trait: "Raw Emotional Drama" },
      { id: "2b", emoji: "🤯", title: "Mind Explosion", subtitle: "Twists that challenge reality", trait: "Neo-Noir & Sci-Fi" },
      { id: "2c", emoji: "🚀", title: "Adrenaline Rush", subtitle: "High-octane excitement", trait: "Action & High Stakes" },
      { id: "2d", emoji: "✨", title: "Uplifting Joy", subtitle: "Heartwarming optimism", trait: "Warm Comfort Cinema" }
    ]
  },
  {
    id: 3,
    category: "Architectural Portal",
    questionText: "In a grand empty hallway with four doors, which one do you open first?",
    questionHighlight: "four doors",
    subtitle: "Spatial symbolism aligns with narrative structures and aesthetic atmospheres.",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW5lqQFjauDYYurka0I44Y-tKtQmACSIjJJd6HVg5Lr7IzORa-UuLQE0WqrzCSjt-KHn6_DTekG2vW2pIHXJRx0QP1tEWsjsUfVZNT-R-Psglc8PT4LTd0u2H2uSJ_0haCBRMFnEpYqJcguFrwlkI2SktTHf3SyreePAhmDCEfqlJm74tlBFuUcYouRecg4uyi6Ao3Cy-EXaJeJnE0RS6oltMIY_EOWlK-ldA9M4bnwQQoSx12rL676xa8BrVQ5JVce3UsYUR9vrA",
    options: [
      { id: "3a", emoji: "🌃", title: "Neon Cyber Door", subtitle: "Pulsing synthetic light & tech", trait: "Cyberpunk & AI" },
      { id: "3b", emoji: "📜", title: "Antique Oak Door", subtitle: "Dusty books and old stories", trait: "Historical & Classic" },
      { id: "3c", emoji: "🪞", title: "Mirror Glass Door", subtitle: "Reflecting parallel versions of you", trait: "Psychological Identity" },
      { id: "3d", emoji: "🌌", title: "Glowing Void Door", subtitle: "Leading to weightless outer space", trait: "Cosmic Odyssey" }
    ]
  },
  {
    id: 4,
    category: "Pacing & Tempo",
    questionText: "What tempo matches the current rhythm of your heartbeat?",
    questionHighlight: "rhythm of your heartbeat",
    subtitle: "Matching or counter-balancing your internal pulse with cinematic editing speed.",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVmBcVadPMOo1PkzWXYpKxzbmzFICO-PQgDt1EQ6heyES0eYMRf2hOus6Pt-DvY9e1xTM2vpg7cqkqFuDQfDuYAvbyij15D9mMOkMdzEOUVDk1lXLEUb0QcRFAVuM3KxCC_7oeGuUlXOv6ufC9Q8fXqQUjwUK7EneN-LZIgAkSFJU1hHILHly0TvVzCyNruADgLQmS5X7DmaPNefHDiBqsycIotGe8F9YZQPZyx49L_3xunejqYJE2v2xsH0AQldr6I7GiIcgycgY",
    options: [
      { id: "4a", emoji: "🐢", title: "Slow & Atmospheric", subtitle: "Long tracking shots & silence", trait: "Slow Burn Art Cinema" },
      { id: "4b", emoji: "🌊", title: "Smooth & Melodic", subtitle: "Gentle narrative flow", trait: "Character Driven" },
      { id: "4c", emoji: "⚡", title: "Fast & Kinetic", subtitle: "Relentless cuts & high energy", trait: "High Speed Thriller" },
      { id: "4d", emoji: "🌀", title: "Dreamlike Fluidity", subtitle: "Time bending and surreal shifts", trait: "Surrealist Dreamscape" }
    ]
  },
  {
    id: 5,
    category: "Resolution & Finale",
    questionText: "How do you want your movie experience to conclude tonight?",
    questionHighlight: "conclude tonight",
    subtitle: "The final psychological payoff ensures complete satisfaction when the credits roll.",
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlr8odLhhR6pYWjR60EkIzypF2nMrTmwX7WXTWeIKRqGEFww8xbV4eiM1OrEpoyPaaNqzOWC4fmF5SF-xkR7F33nmiKnog2XyFHKoVG-yG0KqjMAb44X53XgftdPeNc2IzM8VB1aYE2X4KT3wDyQvJyBh8s3ThFV8YaNGUth4ceKWlMQZAkyU7y7AMmAM3tL4VyxkrIq2OlFGraNatbtaNX6pSTAr3Q5wDzJJnHNvjMKFIXOPQh9vfoNYSxjb-ooorE6vhhOWwleU",
    options: [
      { id: "5a", emoji: "🧩", title: "An Unresolved Mystery", subtitle: "Leaving you thinking for days", trait: "Open Ended Masterpiece" },
      { id: "5b", emoji: "🌅", title: "Poignant Hope", subtitle: "Gentle warmth after hardship", trait: "Cathartic Redemption" },
      { id: "5c", emoji: "🏆", title: "Triumphant Victory", subtitle: "Satisfying heroic justice", trait: "Heroic Climax" },
      { id: "5d", emoji: "🌌", title: "Transcendent Wonder", subtitle: "Awestruck by beauty and scale", trait: "Awe-Inspiring Finale" }
    ]
  }
];
