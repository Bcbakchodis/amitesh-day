# 🎂 Amitesh Mallick — Interactive Birthday Experience

An interactive, cinematic, mobile-first birthday surprise web application for **Amitesh Mallick**, featuring his college journey from first year to final year and culminating in an empty-gift comedy reveal involving Manas.

---

## 🌟 Features Implemented

1. **Opening Screen — Welcome, Mr. Mallick**:
   - Dark luxury aesthetic with golden spotlight glow and ambient grid.
   - Terminal access and classified biometric decryption sequence.
   - Audio unlock on first deliberate user gesture.

2. **Roast Section — The Exposé ("THE MALLICK FILES")**:
   - Classified evidence card viewer with meme-style captions.
   - Smooth Framer Motion transitions and dossier exhibits.
   - Transition notice alerting the user to a hidden confidential file.

3. **Scratch-to-Reveal Card**:
   - Genuine HTML Canvas with silver metallic glitter texture.
   - Full touch & mouse support with `touch-action: none` to prevent accidental mobile scroll.
   - Real-time scratch threshold tracking (~48% auto-clears remaining with sparkle burst and confetti).
   - Realistic synthesized scratch audio on drag.
   - Quick scratch / reveal button for accessibility.

4. **Interactive Birthday Cake**:
   - Animated candles with flickering flames and smoke blowout animation.
   - Celebratory confetti explosion (`canvas-confetti`).
   - Fanfare audio sequence.
   - Hindi/Hinglish celebration captions.

5. **College Journey (Year 01 → Year 04)**:
   - Chronological timeline with step navigation.
   - Dedicated year cards for First Year, Second Year, Third Year, and Final Year.
   - Safe photo rendering preventing any face cropping on group photos.
   - Closing emotional milestone banner.

6. **Gift Section & Final Plot Twist (Manas Forgot the Gift)**:
   - 3D interactive gift box with ribbon and bow.
   - Increasing shake intensity with each tap (Clicks 1 to 6 with humorous status updates).
   - Lid pops open to reveal a completely empty box!
   - Comedic "wah-wah-wah-waaaah" trombone brass sound.
   - **Exact punchline**: `"MANAS NE DALA HI NAHI GIFT YAHA PE!"`
   - Sub-punchline: `"ABE AMITESH, ITNI DER SE GIFT DHOONDH RAHA THA… MANAS NE BOX MEIN KUCH RAKHA HI NAHI! 😂"`
   - Manas Culprit / Suspect Card.
   - Final heartfelt wishes and "RELIVE THE CHAOS ↻" replay button (restarts without page reload).

7. **Sound & Music Architecture**:
   - Persistent `AudioProvider` mounted at root layout so music continues uninterrupted across all sections.
   - Automatic audio ducking during sound effects.
   - Built-in zero-dependency Web Audio synthesizers (scratch noise, fanfare, box rumble, comedy trombone fail) with seamless custom MP3 file overrides.
   - Floating music player widget with animated sound wave bars, play/pause, and mute controls.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Interactions**: HTML5 Canvas, Web Audio API, Canvas Confetti
- **Icons**: Lucide React

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```
