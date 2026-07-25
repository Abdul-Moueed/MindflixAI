import { GoogleGenAI, Type } from '@google/genai';
import type { IncomingMessage, ServerResponse } from 'http';

// ─── Movie Library ────────────────────────────────────────────────────────────
const LIBRARY = [
  { id:'m-interstellar',   title:'Interstellar',                        year:2014, genre:'Sci-Fi / Adventure',  traits:['intellectual','melancholy'],       badge:'Cosmic Odyssey',           synopsis:"A team of explorers travel through a wormhole in space to ensure humanity's survival.",                    imageUrl:'https://image.tmdb.org/t/p/w500/gEU2QrmL2GlM2E2f1C4L8fL34eM.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fKSuV3v3v.jpg', voteAverage:8.7, duration:'2h 49m', director:'Christopher Nolan',    cast:['Matthew McConaughey','Anne Hathaway'],          trailerUrl:'https://www.youtube.com/watch?v=zSWdZVtXT7E', explanation:'Matches your desire for existential grandeur and cosmic emotional connection.' },
  { id:'m-bladerunner',    title:'Blade Runner 2049',                   year:2017, genre:'Sci-Fi / Cyberpunk',   traits:['intellectual','dark','melancholy'], badge:'Neon Noir',                synopsis:'A blade runner unearths a long-buried secret that could destabilise society.',                             imageUrl:'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/sA23vKG8A1S9CAnX7S55n2d2W2x.jpg', voteAverage:8.3, duration:'2h 44m', director:'Denis Villeneuve',     cast:['Ryan Gosling','Harrison Ford'],                 trailerUrl:'https://www.youtube.com/watch?v=gCcx85zbxz4', explanation:'Perfect for a moody state craving atmospheric immersion and existential questioning.' },
  { id:'m-madmax',         title:'Mad Max: Fury Road',                  year:2015, genre:'Action / Sci-Fi',      traits:['action','dark'],                   badge:'High-Octane Thrill',       synopsis:'A woman rebels against a tyrannical ruler in a post-apocalyptic wasteland.',                               imageUrl:'https://image.tmdb.org/t/p/w500/8tZYtuWezp8TbZHYdGbdToYV7Sp.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/nlCH7ToYFi5zMMURuLnFvMpeqXA.jpg', voteAverage:8.1, duration:'2h 00m', director:'George Miller',        cast:['Tom Hardy','Charlize Theron'],                  trailerUrl:'https://www.youtube.com/watch?v=hEJnMQGLai8', explanation:'Delivers relentless adrenaline and breathtaking visual choreography for a high-intensity mood.' },
  { id:'m-darkknight',     title:'The Dark Knight',                     year:2008, genre:'Action / Crime',       traits:['action','dark','mindbend'],        badge:'Crime Masterpiece',        synopsis:'Batman faces the Joker — a criminal genius who plunges Gotham into anarchy.',                              imageUrl:'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/hqkIcbrOHL86UncnHIsHVcVmzue.jpg', voteAverage:9.0, duration:'2h 32m', director:'Christopher Nolan',    cast:['Christian Bale','Heath Ledger'],                trailerUrl:'https://www.youtube.com/watch?v=EXeTwQWrcwY', explanation:'Satisfies your demand for complex psychological tension and high-stakes moral drama.' },
  { id:'m-her',            title:'Her',                                 year:2013, genre:'Romance / Sci-Fi',     traits:['romance','melancholy','cozy'],      badge:'Bittersweet Romance',      synopsis:'A lonely writer develops a deep relationship with an AI operating system.',                                imageUrl:'https://image.tmdb.org/t/p/w500/yk49STP93S1AAnS6mP3eT20uJ5q.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/lHbdnuVrAQqNkHkEJKXzIcvtMhX.jpg', voteAverage:8.0, duration:'2h 06m', director:'Spike Jonze',         cast:['Joaquin Phoenix','Scarlett Johansson'],         trailerUrl:'https://www.youtube.com/watch?v=ne6p6MfLBbo', explanation:'Resonates with your longing for emotional warmth and soft near-future nostalgia.' },
  { id:'m-spiritedaway',   title:'Spirited Away',                       year:2001, genre:'Animation / Fantasy',  traits:['cozy','fun'],                      badge:'Whimsical Masterpiece',    synopsis:'A young girl wanders into a world ruled by gods and spirits and must find a way home.',                    imageUrl:'https://image.tmdb.org/t/p/w500/39wmItE2FMv4F9Rocfb1WWh9Ziv.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/bSavla9eAi6jtm5soGHfJYiWTVQ.jpg', voteAverage:8.6, duration:'2h 05m', director:'Hayao Miyazaki',      cast:['Daveigh Chase','Suzanne Pleshette'],            trailerUrl:'https://www.youtube.com/watch?v=ByXuk9QqQkk', explanation:'Pure magical enchantment and cozy comfort for a heart seeking imaginative wonder.' },
  { id:'m-inception',      title:'Inception',                           year:2010, genre:'Sci-Fi / Action',      traits:['mindbend','action','intellectual'], badge:'Mind-Bending Heist',       synopsis:'A thief who steals corporate secrets through dream-sharing is given the inverse task.',                    imageUrl:'https://image.tmdb.org/t/p/w500/ljs28On2SSxD1dF0hZ0YjF0a85.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7y5v7zHRPqz5Ums.jpg', voteAverage:8.4, duration:'2h 28m', director:'Christopher Nolan',    cast:['Leonardo DiCaprio','Joseph Gordon-Levitt'],    trailerUrl:'https://www.youtube.com/watch?v=YoHD9XEInc0', explanation:'Engages your analytical curiosity with multi-layered dream logic and sleek action.' },
  { id:'m-parasite',       title:'Parasite',                            year:2019, genre:'Thriller / Drama',     traits:['dark','mindbend'],                 badge:"Palme d'Or Winner",        synopsis:'Greed and class discrimination threaten the symbiotic relationship between two families.',                  imageUrl:'https://image.tmdb.org/t/p/w500/7IiTqvZfyKG0vTzW2F6tM1ggjk4.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg', voteAverage:8.5, duration:'2h 12m', director:'Bong Joon Ho',        cast:['Song Kang-ho','Lee Sun-kyun'],                  trailerUrl:'https://www.youtube.com/watch?v=5xH0HfJHsaY', explanation:'Delivers razor-sharp social commentary and unpredictable twists for a thrill-seeking mind.' },
  { id:'m-spiderverse',    title:'Spider-Man: Across the Spider-Verse', year:2023, genre:'Animation / Action',  traits:['fun','action'],                    badge:'Visual Wonder',            synopsis:'Miles Morales catapults across the Multiverse encountering a team of Spider-People.',                       imageUrl:'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj7sfd8.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/4m9XDdnPKkG1JaVBZdRHIWUFSkA.jpg', voteAverage:8.7, duration:'2h 20m', director:'Joaquim Dos Santos',  cast:['Shameik Moore','Hailee Steinfeld'],             trailerUrl:'https://www.youtube.com/watch?v=cqGjhVJWtEg', explanation:'Immerses you in groundbreaking artistry, fast-paced energy, and heartfelt bonds.' },
  { id:'m-shutterisland',  title:'Shutter Island',                      year:2010, genre:'Mystery / Thriller',  traits:['mindbend','dark'],                 badge:'Psychological Thriller',   synopsis:'A US Marshal investigates the disappearance of a murderer from a hospital for the criminally insane.',     imageUrl:'https://image.tmdb.org/t/p/w500/4BgSWydCwW0vTzW2F6tM1WFpWAq.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/s3vWMXj4BBv6MMLmSHM00hSH1EB.jpg', voteAverage:8.1, duration:'2h 18m', director:'Martin Scorsese',     cast:['Leonardo DiCaprio','Mark Ruffalo'],             trailerUrl:'https://www.youtube.com/watch?v=5iaYLCiq5A8', explanation:'Creates an eerie, haunting atmospheric puzzle that keeps your mind guessing until the final reveal.' },
  { id:'m-lalaland',       title:'La La Land',                          year:2016, genre:'Romance / Drama',     traits:['romance','cozy','melancholy'],      badge:'Vibrant & Bittersweet',    synopsis:'A jazz musician and an aspiring actress fall in love while chasing their dreams in LA.',                   imageUrl:'https://image.tmdb.org/t/p/w500/uDO8hOhdDwxKhEChyvuVKhvYiyB.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/ndlQ2Cuc3cjTL7lTynw6I4boP4S.jpg', voteAverage:7.9, duration:'2h 08m', director:'Damien Chazelle',    cast:['Ryan Gosling','Emma Stone'],                   trailerUrl:'https://www.youtube.com/watch?v=0pdqf4P9MB8', explanation:'Blends glowing visual music with bittersweet romance for a passionate, soulful mood.' },
  { id:'m-getout',         title:'Get Out',                             year:2017, genre:'Horror / Thriller',   traits:['dark','mindbend'],                 badge:'Social Horror',            synopsis:"A young man visits his girlfriend's family and makes a series of increasingly disturbing discoveries.",    imageUrl:'https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/n9dQ3eRfCkLCfbTHkEKAFcM0xTw.jpg', voteAverage:7.7, duration:'1h 44m', director:'Jordan Peele',        cast:['Daniel Kaluuya','Allison Williams'],            trailerUrl:'https://www.youtube.com/watch?v=DzfpyUB60YY', explanation:'A brilliantly crafted psychological horror that delivers sustained dread and a shocking revelation.' },
  { id:'m-moonlight',      title:'Moonlight',                           year:2016, genre:'Drama',              traits:['melancholy','romance'],             badge:'Oscar Best Picture',       synopsis:"A young man's journey of self-discovery across three defining chapters of his life.",                       imageUrl:'https://image.tmdb.org/t/p/w500/qAwFbszMfYiYCVGo3xwV5HJBXkp.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/pvRkEqiRJmNsXSFNGlKzjBjcXMW.jpg', voteAverage:7.4, duration:'1h 51m', director:'Barry Jenkins',       cast:['Mahershala Ali','Naomie Harris'],               trailerUrl:'https://www.youtube.com/watch?v=9NJj12tJzqc', explanation:'An achingly tender portrait of identity and longing that reaches deep into emotional truth.' },
  { id:'m-jojorabbit',     title:'Jojo Rabbit',                         year:2019, genre:'Comedy / Drama',     traits:['cozy','fun','melancholy'],          badge:'Heartwarming Comedy',      synopsis:"A boy in WWII Germany befriends a Jewish girl hiding in his mother's attic.",                               imageUrl:'https://image.tmdb.org/t/p/w500/lI0BoElqEbNcfRCB2OjhZeKyGDK.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/2bqAuGW6JqUZWF1Bb8fjqnHmMb7.jpg', voteAverage:7.9, duration:'1h 48m', director:'Taika Waititi',       cast:['Roman Griffin Davis','Thomasin McKenzie'],     trailerUrl:'https://www.youtube.com/watch?v=tL4McUzXfFI', explanation:'Balances warmth, humour, and genuine heartbreak in equal measure.' },
  { id:'m-fury',           title:'Fury',                                year:2014, genre:'War / Action',        traits:['action','dark','melancholy'],       badge:'Brutal War Drama',         synopsis:'A war-hardened sergeant commands a Sherman tank crew behind enemy lines in Nazi Germany.',                  imageUrl:'https://image.tmdb.org/t/p/w500/pfte7wdMobmg1JHCvO4OkKv6FaR.jpg', backdropUrl:'https://image.tmdb.org/t/p/w1280/mSweRdDEDgTWZSzMzHiGGXsPZHX.jpg', voteAverage:7.6, duration:'2h 14m', director:'David Ayer',          cast:['Brad Pitt','Shia LaBeouf'],                    trailerUrl:'https://www.youtube.com/watch?v=2RBs2nJksvg', explanation:'Intense and visceral — for a state craving gritty realism and raw emotional courage.' },
];

// ─── Trait map ────────────────────────────────────────────────────────────────
const TRAIT_MAP: Record<string, string> = {
  'Cozy Nostalgia':'cozy',            'Bittersweet Depth':'melancholy',      'Adrenaline Surge':'action',     'Philosophical Sci-Fi':'intellectual',
  'Raw Emotional Drama':'melancholy', 'Neo-Noir & Sci-Fi':'mindbend',        'Action & High Stakes':'action', 'Warm Comfort Cinema':'cozy',
  'Cyberpunk & AI':'intellectual',    'Historical & Classic':'melancholy',   'Psychological Identity':'mindbend','Cosmic Odyssey':'intellectual',
  'Slow Burn Art Cinema':'melancholy','Character Driven':'romance',          'High Speed Thriller':'action',  'Surrealist Dreamscape':'mindbend',
  'Open Ended Masterpiece':'mindbend','Cathartic Redemption':'romance',      'Heroic Climax':'action',        'Awe-Inspiring Finale':'intellectual',
};

const MOOD_TAGS: Record<string, string> = {
  action:'High-Octane Adrenaline & Action Surge',  melancholy:'Deep Melancholy & Poetic Reflection',
  cozy:'Warm & Whimsical Emotional Comfort',        mindbend:'Mind-Bending Psychological Mystery',
  romance:'Bittersweet Redemption & Heart Cinema',  dark:'Dark Psychological Dilemma & Suspense',
  intellectual:'Cosmic Awe & Existential Odyssey', fun:'Vibrant & Creative Multiverse Energy',
};

// ─── Dynamic engine ───────────────────────────────────────────────────────────
function dynamicRecs(answers: Record<string,string> = {}, intensity = 80, customPrompt = '') {
  const votes: Record<string,number> = { action:0, melancholy:0, cozy:0, mindbend:0, romance:0, dark:0, intellectual:0, fun:0 };

  for (const val of Object.values(answers)) {
    const m = String(val).match(/Trait:\s*(.+)$/);
    if (m) { const b = TRAIT_MAP[m[1].trim()]; if (b && b in votes) votes[b] += 3; }
  }

  const pl = customPrompt.toLowerCase();
  if (pl.includes('action')||pl.includes('thrill')||pl.includes('fast'))    votes.action += 2;
  if (pl.includes('sad')||pl.includes('melanchol')||pl.includes('nostalgic')) votes.melancholy += 2;
  if (pl.includes('cozy')||pl.includes('warm')||pl.includes('comfort'))     votes.cozy += 2;
  if (pl.includes('mystery')||pl.includes('twist')||pl.includes('mind'))    votes.mindbend += 2;
  if (pl.includes('love')||pl.includes('romance')||pl.includes('heart'))    votes.romance += 2;
  if (pl.includes('dark')||pl.includes('horror')||pl.includes('scary'))     votes.dark += 2;
  if (pl.includes('space')||pl.includes('sci-fi')||pl.includes('cosmic'))   votes.intellectual += 2;
  if (pl.includes('fun')||pl.includes('comedy')||pl.includes('laugh'))      votes.fun += 2;

  for (const k in votes) votes[k] += Math.random() * 1.5;

  const sorted = Object.entries(votes).sort((a,b) => b[1]-a[1]);
  const primary   = sorted[0][0];
  const secondary = sorted[1][0];
  const moodTag   = MOOD_TAGS[primary] ?? 'Contemplative & Atmospheric Resonance';

  const pPool = LIBRARY.filter(m => m.traits.includes(primary)).sort(() => Math.random()-0.5);
  const sPool = LIBRARY.filter(m => !m.traits.includes(primary) && m.traits.includes(secondary)).sort(() => Math.random()-0.5);
  const rPool = LIBRARY.filter(m => !m.traits.includes(primary) && !m.traits.includes(secondary)).sort(() => Math.random()-0.5);

  const top  = pPool[0] ?? sPool[0] ?? rPool[0];
  const rest = [...pPool.slice(1),...sPool,...rPool].filter(m => m.id !== top.id).slice(0,3);

  return {
    success: true,
    moodTag,
    confidence: Math.min(99, Math.max(88, Math.floor(intensity * 0.9 + Math.random() * 8))),
    description: `Your choices reveal a ${moodTag.toLowerCase()} emotional profile — every film below is matched directly to your psychological responses.`,
    topPick: { id:`top-${Date.now()}`, title:top.title, year:top.year, genre:top.genre, matchPercentage:98, synopsis:top.synopsis, tagline:top.badge, imageUrl:top.imageUrl, backdropUrl:top.backdropUrl, voteAverage:top.voteAverage, duration:top.duration, director:top.director, cast:top.cast, trailerUrl:top.trailerUrl, aiExplanation:top.explanation },
    curatedMovies: rest.map((m,i) => ({ id:`cur-${i}-${Date.now()}`, title:m.title, year:m.year, genre:m.genre, badge:m.badge, synopsis:m.synopsis, imageUrl:m.imageUrl, backdropUrl:m.backdropUrl, voteAverage:m.voteAverage, duration:m.duration, matchPercentage:Math.max(75,95-i*5), trailerUrl:m.trailerUrl, aiExplanation:m.explanation })),
  };
}

// ─── Read POST body ───────────────────────────────────────────────────────────
function readBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

// ─── Vercel serverless handler ────────────────────────────────────────────────
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
  if (req.method !== 'POST')   { res.writeHead(405); res.end(JSON.stringify({ error: 'Method not allowed' })); return; }

  const body = await readBody(req);
  const answers: Record<string,string> = body.answers ?? {};
  const intensity: number = body.intensity ?? 80;
  const customPrompt: string = body.prompt ?? '';

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    res.writeHead(200);
    res.end(JSON.stringify(dynamicRecs(answers, intensity, customPrompt)));
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const promptText = `You are MindFlix AI, an expert movie psychologist.

User Questionnaire Answers:
${JSON.stringify(answers, null, 2)}

Mood Intensity: ${intensity}%
Custom Request: ${customPrompt || 'None'}

Your task:
- Detect the user's precise emotional state from their questionnaire traits.
- Recommend ONE top-pick movie and EXACTLY THREE curated movies.
- Vary genres broadly. Prefer hidden gems, international cinema, indie films, and recent releases.
- NEVER recommend the same movies if the user picks different questionnaire answers.
- Write a personalised 2-sentence explanation for each movie tied to the user's specific trait choices.

Return ONLY valid JSON:
{
  "moodTag": "string",
  "confidence": 95,
  "description": "string",
  "topPick": { "title": "string", "year": 2023, "genre": "string", "matchPercentage": 98, "synopsis": "string", "tagline": "string", "reason": "string" },
  "curatedMovies": [
    { "title": "string", "year": 2022, "genre": "string", "badge": "string", "reason": "string" }
  ]
}`;

    const geminiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            moodTag:        { type: Type.STRING },
            confidence:     { type: Type.INTEGER },
            description:    { type: Type.STRING },
            topPick: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING }, year: { type: Type.INTEGER },
                genre: { type: Type.STRING }, matchPercentage: { type: Type.INTEGER },
                synopsis: { type: Type.STRING }, tagline: { type: Type.STRING }, reason: { type: Type.STRING },
              },
              required: ['title','year','genre','matchPercentage','synopsis','tagline','reason'],
            },
            curatedMovies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING }, year: { type: Type.INTEGER },
                  genre: { type: Type.STRING }, badge: { type: Type.STRING }, reason: { type: Type.STRING },
                },
                required: ['title','year','genre','badge','reason'],
              },
            },
          },
          required: ['moodTag','confidence','description','topPick','curatedMovies'],
        },
      },
    });

    const parsed = JSON.parse(geminiResponse.text ?? '{}');
    const tmdbKey = process.env.TMDB_API_KEY;

    const enrich = async (title: string) => {
      if (!tmdbKey) return null;
      try {
        const r = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${encodeURIComponent(title)}`);
        if (!r.ok) return null;
        const d = await r.json();
        const movie = d.results?.[0];
        if (!movie) return null;
        return {
          imageUrl:    movie.poster_path   ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`    : '',
          backdropUrl: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : '',
          voteAverage: movie.vote_average  ? Math.round(movie.vote_average * 10) / 10 : 8.2,
          synopsis:    movie.overview || undefined,
          trailerUrl:  `https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' official trailer')}`,
        };
      } catch { return null; }
    };

    const topEnriched = await enrich(parsed.topPick?.title ?? '');
    const curEnriched  = await Promise.all((parsed.curatedMovies ?? []).map((c: any) => enrich(c.title)));

    const payload = {
      success: true,
      moodTag:      parsed.moodTag,
      confidence:   parsed.confidence,
      description:  parsed.description,
      topPick: {
        id: `top-${Date.now()}`,
        title: parsed.topPick.title, year: parsed.topPick.year, genre: parsed.topPick.genre,
        matchPercentage: parsed.topPick.matchPercentage ?? 98,
        synopsis:    topEnriched?.synopsis ?? parsed.topPick.synopsis,
        tagline:     parsed.topPick.tagline,
        imageUrl:    topEnriched?.imageUrl    ?? '',
        backdropUrl: topEnriched?.backdropUrl ?? '',
        voteAverage: topEnriched?.voteAverage ?? 8.5,
        trailerUrl:  topEnriched?.trailerUrl  ?? `https://www.youtube.com/results?search_query=${encodeURIComponent(parsed.topPick.title + ' trailer')}`,
        aiExplanation: parsed.topPick.reason,
      },
      curatedMovies: (parsed.curatedMovies ?? []).map((c: any, i: number) => ({
        id: `cur-${i}-${Date.now()}`,
        title: c.title, year: c.year, genre: c.genre, badge: c.badge,
        synopsis:    curEnriched[i]?.synopsis    ?? '',
        imageUrl:    curEnriched[i]?.imageUrl    ?? '',
        backdropUrl: curEnriched[i]?.backdropUrl ?? '',
        voteAverage: curEnriched[i]?.voteAverage ?? 8.2,
        matchPercentage: Math.max(75, 95 - i * 4),
        trailerUrl:  curEnriched[i]?.trailerUrl  ?? `https://www.youtube.com/results?search_query=${encodeURIComponent(c.title + ' trailer')}`,
        aiExplanation: c.reason,
      })),
    };

    res.writeHead(200);
    res.end(JSON.stringify(payload));

  } catch (err: any) {
    console.error('Gemini error, falling back:', err.message);
    res.writeHead(200);
    res.end(JSON.stringify(dynamicRecs(answers, intensity, customPrompt)));
  }
}
