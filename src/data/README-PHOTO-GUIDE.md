# 📸 Amitesh Mallick Birthday Website — Photo & Content Guide

Welcome! This interactive website features the **6-screen narrative sequence**, starting directly with the **Scratch-to-Reveal Card**.

You can drop your real photos and music file directly into the folders below without modifying any code, or customize the captions anytime in `src/data/birthday-content.ts`.

---

## 🎬 The 6-Screen Story Sequence

1. **SCREEN 1 — Scratch to Reveal**:
   - The visitor starts directly here!
   - Heading: `ABE, SCRATCH KAR! 👀`
   - Subtitle: `Andar kuch chhupa hai, khud dekh le!`
   - Interactive scratch card starts music upon first touch/drag, tracks scratch coverage, and automatically reveals the mystery photo after ~45% scratching.

2. **SCREEN 2 — Comedy Reveal**:
   - Displays the revealed funny photo.
   - Shows the editable meme caption: *"Abe Mallick, ye koun si state mein photo khinchwaya tha?! Asli roop bahar aa gaya! 📸🔥"*.
   - Primary button: `AAGE BADH 😂` to proceed to the cake.

3. **SCREEN 3 — Birthday Cake**:
   - Heading: `HAVE SOME CAKE! 🎂`
   - Button: `CLICK KAR!`
   - Blows out candles, triggers a multi-colored confetti burst, fanfare audio, and reveals `CHAL, AB AAGE BADH!` to continue.

4. **SCREEN 4 — College Journey**:
   - Chronological timeline: **Year 01 → Year 02 → Year 03 → Year 04**.
   - Preserves all real photos without cropping faces.
   - Closing banner: `COLLEGE KHATAM, BAKCHODI KI YAADEIN ABHI BAAKI HAIN ❤️`.
   - Button: `CHAL AB, BIRTHDAY GIFT LE!`.

5. **SCREEN 5 — Gift Prank**:
   - Animated 3D gift box with progressive shaking.
   - On repeated taps:
     1. *"Opening gift…"*
     2. *"Checking inventory…"*
     3. *"Searching for gift…"*
     4. *"Contacting Manas…"*
     5. *"Manas is not responding…"*
   - Box opens to reveal that it is **COMPLETELY EMPTY**!

6. **SCREEN 6 — Final Punchline**:
   - Dramatic comedy reveal:
     - **“ABE YAAR 😭”**
     - **“MANAS NE DALA HI NAHI GIFT YAHA PE!”**
     - *“ABE AMITESH, ITNI DER SE GIFT DHOONDH RAHA THA… MANAS NE BOX MEIN KUCH RAKHA HI NAHI! 😂”*
   - Manas Culprit / Suspect Card.
   - Final wish: **“HAPPY BIRTHDAY, AMITESH MALLICK ❤️”**.
   - Replay button: `RELIVE THE CHAOS` (restarts directly from Screen 1).

---

## 📂 Image Asset Directory Map

Drop your photos into the respective folders in `/public/images/`:

| Screen | Target File Path | Description |
| :--- | :--- | :--- |
| **Screens 1 & 2** | `/public/images/scratch/mystery.jpg` | Mystery photo under the scratch card & comedy reveal |
| **Screen 3** | `/public/images/cake/cake.jpg` | Birthday celebration cake |
| **Screen 4 (Year 1)** | `/public/images/college/first-year/photo-1.jpg` | Freshers & 1st Year memory |
| **Screen 4 (Year 2)** | `/public/images/college/second-year/photo-1.jpg` | 2nd Year adventures |
| **Screen 4 (Year 3)** | `/public/images/college/third-year/photo-1.jpg` | 3rd Year fest & chaos |
| **Screen 4 (Year 4)** | `/public/images/college/final-year/photo-1.jpg` | Final Year farewell & graduation |
| **Screen 6** | `/public/images/gift/manas.jpg` | *(Optional)* Photo of Manas for the "Culprit" card |

> **Face Safety**: All image components use `object-fit: contain` with an ambient glow so nobody in group photos is cropped out.

---

## 🎵 Background Music & Audio

Drop your custom song file into:
```
/public/audio/birthday-song.mp3
```

- Plays continuously across all screens from Screen 1 through Screen 6 without restarting.
- When sound effects play, the background music automatically ducks to 20% and restores.
- If no custom MP3 is uploaded yet, the site automatically uses its built-in Web Audio celebratory chime loop.

---

## ✍️ Editing Captions & Real Memories

All text and captions are centralized in:
```
src/data/birthday-content.ts
```

Open this file to customize any captions, funny college incidents, or the final birthday quote!

---

## 🚀 Running the App

```bash
# Start development server
npm run dev

# Build for production
npm run build
npm start
```
