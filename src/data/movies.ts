import { Movie, MoodHistoryItem, UserProfile } from '../types';

export const USER_PROFILE: UserProfile = {
  name: "Alex Chen",
  title: "Neural Nexus Member",
  analyzedFilms: 142,
  eqAlignment: 89,
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzIh201zHM2pLUkEXxqkTGmEXn7jenQ9BwXrQB532FMnr6pfeWKP50wIg09lfZaDuC82_cywzG4WhYSepY9XZl1Sv8A03McGda494MAo7okjT0S235nkuFeTZcWlB79YX6c63i4SX_lFBsvUw4OJKVsQvzNfJ9-8HBZT-Uvo6oZPOWcvTYyPg_Wcu1phlqfy52kHknq_WP1CTaei_opdHlx-nrF1zN3d-sqPaDR1BMIkv12YaEpHgBGOcUeL7oqcjIBo25YcKKWQE",
  plan: "Neural Nexus Premium"
};

export const MOOD_HISTORY: MoodHistoryItem[] = [
  { day: "Mon", value: 40, color: "bg-on-surface-variant/40", moodName: "Peaceful & Calm" },
  { day: "Tue", value: 65, color: "bg-[#4cd6ff]/40", moodName: "Curious & Focused" },
  { day: "Wed", value: 90, color: "bg-[#e50914]/40", moodName: "Deeply Reflective" },
  { day: "Thu", value: 55, color: "bg-[#7701d0]/40", moodName: "Melancholic" },
  { day: "Fri", value: 80, color: "bg-[#4cd6ff]/40", moodName: "Awe-Inspired" },
  { day: "Sat", value: 70, color: "bg-[#e50914]/40", moodName: "Cozy & Warm" },
  { day: "Sun", value: 30, color: "bg-on-surface-variant/20", moodName: "Serene & Idle" }
];

export const INITIAL_HERO_MOVIE: Movie = {
  id: "hero-1",
  title: "BEYOND REALITY",
  year: 2025,
  genre: "Sci-Fi / Odyssey",
  synopsis: "An AI-curated odyssey through the furthest reaches of the subconscious. A solitary astronaut voyages past the event horizon into infinite neural dimensions.",
  imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ0Gu90FMGxGuT4Cd-IS4D2qJdx4WE7aM4y5RLaCEXCMuJCmX6KUGFxbZHyabjyXwwAz1QUhiHYD0mIpGlAdiniS6yz18ptfp_1m7JF7akITlwCYqkZlPeccVqYYlkbCNCmAoQX5LIsLxochjWdxsrKIEShN-6jtRSRVK9PWPmEfeThG7iPCJ3VWhjHg941SbrcYaqdbCfb3YSr6RDOmcioQIc0MqNI5690ILeavbqdxgvPeAiYG-Mwoa8rV9Oaw5zOysCNKel67M",
  tagline: "EVENT HORIZON",
  duration: "2h 18m",
  rating: "PG-13",
  director: "Liam Chen",
  cast: ["Elara Vance", "Kenji Tanaka"],
  trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
};

export const TRENDING_MOVIES: Movie[] = [
  {
    id: "m-1",
    title: "Neon Pulse",
    year: 2024,
    genre: "Sci-Fi",
    synopsis: "A high-stakes techno-thriller following a rogue hacker whose mind gets linked to a sentient digital grid in neo-Tokyo.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW5lqQFjauDYYurka0I44Y-tKtQmACSIjJJd6HVg5Lr7IzORa-UuLQE0WqrzCSjt-KHn6_DTekG2vW2pIHXJRx0QP1tEWsjsUfVZNT-R-Psglc8PT4LTd0u2H2uSJ_0haCBRMFnEpYqJcguFrwlkI2SktTHf3SyreePAhmDCEfqlJm74tlBFuUcYouRecg4uyi6Ao3Cy-EXaJeJnE0RS6oltMIY_EOWlK-ldA9M4bnwQQoSx12rL676xa8BrVQ5JVce3UsYUR9vrA",
    duration: "1h 52m",
    rating: "R",
    director: "Jax Serrano",
    isFavorite: true
  },
  {
    id: "m-2",
    title: "The Silent Void",
    year: 2023,
    genre: "Drama",
    synopsis: "A psychological journey of a lone wanderer confronting suppressed memories in a foggy, surreal coastal landscape.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkFc4uFAJ_v0-mqQZCW6RIVnW8euLsYfhqWYRM3nqwq-WnBcUHcuItm7Q4Ou52jcy1CHFagxH3VsfO9B7og-wmI7rt3IrlfLdpjFzBUcVwyB1Ql-I0XDRRWYXLFNT32M6dFLIRxt7JpGckCSmf9tjsPVKWA60WAKi-7jt29VCwOxarpB8NQ73nuCZkG07MgzfTzUY17Obc8PmFRmYZjy-9-qxX4gluYv_Lgjts87bioDmVPN80tXwsqLEvObxlAvk946TYgCQ4LC8",
    duration: "2h 05m",
    rating: "PG-13",
    director: "Eliza Reid"
  },
  {
    id: "m-3",
    title: "Velocity 9",
    year: 2024,
    genre: "Action",
    synopsis: "High-octane cyberpunk street racing through rain-slicked city boulevards at midnight.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVmBcVadPMOo1PkzWXYpKxzbmzFICO-PQgDt1EQ6heyES0eYMRf2hOus6Pt-DvY9e1xTM2vpg7cqkqFuDQfDuYAvbyij15D9mMOkMdzEOUVDk1lXLEUb0QcRFAVuM3KxCC_7oeGuUlXOv6ufC9Q8fXqQUjwUK7EneN-LZIgAkSFJU1hHILHly0TvVzCyNruADgLQmS5X7DmaPNefHDiBqsycIotGe8F9YZQPZyx49L_3xunejqYJE2v2xsH0AQldr6I7GiIcgycgY",
    duration: "1h 45m",
    rating: "PG-13",
    isFavorite: true
  },
  {
    id: "m-4",
    title: "Origin Point",
    year: 2024,
    genre: "Mystery",
    synopsis: "A colossal monolith hovering over a desert unlocks ancient quantum secrets for a group of astrophysicists.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpfwT9y4pKe3scHFJL6Qq5IvtlKZLdT2msra3KnzBYVeSLFin5-ZZdZ4T0VyqZzEwRyATTS1nh57fxnyQd8RQ62KTex7iVsHTKsdOCjmM-3rEgd7aa7dY4sVC3ReLI-PEA6TO9BzENJ56u2qtYC0wbCX0xtzQuOMRbMPC2leTpScKtgHTsxaqmuxLBaIoGCmWCXExrXpXngDzc4aoS71b3D9iH-xM22njBweQadqX_y8_5RbpzsUsov15H7_wyxNvIchVfS4Qeqg0",
    duration: "2h 10m",
    rating: "PG-13"
  }
];

export const INSIGHT_MOVIES: Movie[] = [
  {
    id: "m-insight-1",
    title: "Mindscape",
    year: 2024,
    genre: "Reflective Drama",
    synopsis: "A tranquil exploration of consciousness across a mirror-like twilight lake.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7J8AG3h6kURkOMNEx9F7hF-2QyKhWYVh-VyHY971Glo0gQtjOuLohIjNjR6RMLBlKplkB4tRChsK0CbkvfqXXAj6kzQJVdGT-uNa80piv5P9AQuMGAltcvevzoi2fZkRqdQl0OC4F7sO_UT82qf8ELGGGqFU5qWM9Shp1mwqdpSqS2tDw7u3VUftj2xPLPsIiC7_aqSmNjVzB_dxKuvG2V1iiy2OldbI6GZU7yD885h0ifRWoOpwzUs2H2WzfgkGJk1KR59psYPU"
  },
  {
    id: "m-insight-2",
    title: "Chronos",
    year: 2023,
    genre: "Philosophical Sci-Fi",
    synopsis: "An intricate tale of time manipulation and golden clockwork destiny.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1-Oh9pLOUnxInesoq-35Xdu2xLDt1Z9dRm9v25SloKvNdjhVaYM8Z_pJJDLygCv2fExewHkiVqeqxz0EVIHLq98Nk6hJTRYasQ4WlIy5QtuOUXf-9Y9O9EtEJk5QjjpLFan_z35Z2emPuIm0nSkOAek5ZsdubJ3kmHac9sFJhzGLCip_6D-zx3eOsdqK2aGXuWajiK71WnDsJ2IQCCQFhy_lZz_9WX2JxSk2Kis8LzUSHpikuJm0hZpm-YpHg1YIX0QxJbkqNPM4"
  }
];

export const EXCLUSIVE_MOVIES: Movie[] = [
  {
    id: "m-ex-1",
    title: "Sentience",
    year: 2024,
    genre: "AI Thriller",
    badge: "Streaming Now",
    synopsis: "A synthetic human achieves emotional awareness and navigates a world unprepared for artificial soul.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ8_9T_SOly2eBPGKPWI-qSyyv7tUbMWRLfrjuNMfqQdA_GQtIJaItU4NLIsKyqaFCZo2U8QRNPkiFWGexsp-O_FU9zC8Ec1Dp3_56y5DvvbLk7sUUASBz58ojv0R1KNu5sm0uo3ezHbXYUuALvd23N_X4ZJdqMiUk7Na-euIZBKDlA55UWoutAXOzMJk93nWrCfWDuS1Csf18-bQbwAqNuHipMtRn3iPw1ANLwJXMFaxSkbp1hKrUei3ZdSjb-Kq2cWGLlThQHvc"
  },
  {
    id: "m-ex-2",
    title: "Quantum Unfolding",
    year: 2024,
    genre: "Cosmic Mystery",
    synopsis: "Swirling luminous particle clouds reveal parallel dimensions in deep space.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoSg2ZjMQ2fb2kBBUMu2_4rRUEcVCN2gvj9zzf9pS8iOjdrtMfefoh4B3uTJI1Vp8DZLfBJudfPMRWcKoP3ERA1AkCJ0PEzfc5-BEQHQ0zox0tY5A0jqjlQOtd4Y4w-Ai04ThYyA66fcMm-6MaOTo-Ngg2qidxbzVMKIwCRzHz23ZxkiSUqq0uXs4blbPari3YfSCZlP9oLsy6Wlzc4iWCIHOommccb9eWWL2djcWkJSt4YfuUPDoH0KW4AaY6K0xXrT4TpDTiqwQ"
  },
  {
    id: "m-ex-3",
    title: "Neon Alleyways",
    year: 2024,
    genre: "Noir Fantasy",
    synopsis: "Raindrops glistens under neon umbrellas in a shadowy future metropolis.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdzYNZqX_vMfIGRadEsZPhppKtaLOxGlMfdYm8ohFRuzaBd3E68RxF2urI-fwTobVxd4GFM73X0OLCjYLd3QslQYEppvMk4HPL9ERdefjMXuzVlQ7yiRJvx7BY6yrz9loc_9Ywvk9EzBPruTBu9IRLFWxRcAyNAG9F6K9okdjtuw8FGzZfYoLB-3ciieWnRLMdXaaHu_YY7VF6RIaLz3Kn0CnEa_hKKVEMXi9nDPYOT-r3CnkfWlDO9Vr9OdZR72yw5ws5-abeBRg"
  }
];

export const INITIAL_FAVORITES: Movie[] = [
  {
    id: "fav-1",
    title: "Neon Horizon",
    year: 2025,
    genre: "Sci-Fi",
    badge: "AI Pick",
    synopsis: "A sweeping cinematic cyber-odyssey through glowing skyscrapers and endless virtual realities.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDr_SsZ3PmeRfskGAuWjwsXu6XoNStb8ajETa7BEhA8j2LPYovUSwKYKkRQ5x4MZUot-e969WgnNsIu4TTwfVskmDNHYyPg1UeElD-H_IU5ywDSFxpUdRqy3ICQHqgjwIqgHy5vBgXQiCHW8VnJA57DztbkYKyyVY19TV_pCGLE-GCuiiMcjUcpGe3cG1NZP7FO0OY94gmoAPxxLtQlJ4C28bPbFWc52AEGeKYiqGa1AVue_OBAiJzDmrvhjQSvHH19hKeZULkoLTM",
    isFavorite: true
  },
  {
    id: "fav-2",
    title: "The Void",
    year: 2024,
    genre: "Drama",
    synopsis: "A minimalist masterpiece set on a solitary white salt flat under a deep indigo sky.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuVwgPPz2k3qCIIk0JU7Pna0wXgaLAu3Q-mjfRIV3UyT4JVFynDMfKnFNw6JUW8xb5sDT_s3dvXX-Rez1Pe9GpHdRwDpdoyqbKt8rxEdUzqkWITzQ-wnqHGnu73M4pKdREVDHHj76qLD3EqY29EMxbApni6TDoTp_GIOvE1sLGyyAsjKtbFlnUBOpLHs3DH1pBI5IsXhuHaQ6Wj7FxbWCoRbomxzr1KuTjuWdr5PJOvly4MgN32AByYbZsjJNX2SnNX-YYP4_Bf_c",
    isFavorite: true
  },
  {
    id: "fav-3",
    title: "Velocity",
    year: 2023,
    genre: "Action",
    synopsis: "Fast-paced night racing through a tunnel of light with dramatic neon streaks.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIn-Y0xS284-7VZU2FL_Md6VBqkXHI29rydlxdcZfaI5I9KQrmkocZ-99vwLFpHTKv6PsS-AOXe5l5G8aUm1XY4WSKJl_3LUZk0Gcxz9YnVTlEncs-E2OkSp1O4Q2N5p4179y_8FIkkrBSZ-77-MFQ9G9nx5bORI_DQFR6zF4GJEJqBOmcBhGlMQe_n5u-C778-4AiEfhvOUWB20VdUR03XnU_FBGXhN5mNYuqVAWFmON6dAFSIhJgIzFH11SSL5GG7iv5CnCOb0g",
    isFavorite: true
  },
  {
    id: "fav-4",
    title: "Prism",
    year: 2024,
    genre: "Fantasy",
    synopsis: "Bioluminescent rainforest canopy glowing under a cosmic moon in a dreamscape realm.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsJpdslx2fYnaNUh6d6lKHG_3_nNtdukoozO1iqRsuytFY1KRyYbuc6__ZMZ3Z02fSPM3WXxGecFIQYv-K9AzlCnpkAWyyJ2Dz93rrbOeAoUHqAJN_U56XN6PXoZ_osa06iTeTCIN1iikAZv6wvQwWLK-9puDRA70patpWxUL2T15L0O6PJTxc4WKdif7R9u4J_9jFbnjT_ffPY1_lcHWaW9wJZtFkQ33kVy_nbOSuVNIQr_Zuse47pQSmVpx0q7qiqR-EkRa7mH8",
    isFavorite: true
  },
  {
    id: "fav-5",
    title: "Afterhours",
    year: 2022,
    genre: "Noir",
    synopsis: "Neo-noir night streets glistening with rain and classic automotive reflections.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB30gbZdQxoI62lKiUfywots6axYCT6fpKR8og6pzKDwfh2TgqpupclTj0DFDmLZNhIVvF5ZewqRGpiz41olbeDvEqdIeBXo_xtqPBnTAV6izPCaE55T4uwYh5ZGSMQMbUEF8KQ0i3zQE2GLOqcqzaKN7Msg2r7jPkr_bsgdFMK6iFH68uL5ECEAi5PYZf4-KjOup8LIz5tYohr1JMG1jmYQeCv_8L3f7eZGZsQ5mUDf2_lOdpeu-cgW_eeEAPkjTX8l7iQem9K25c",
    isFavorite: true
  }
];
