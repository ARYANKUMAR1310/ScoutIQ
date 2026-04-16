# ScoutIQ

ScoutIQ is a simple React Native app (Expo + TypeScript) built to help scouts discover athletes, evaluate them, and maintain a shortlist — all locally without any backend.

---

# How to run

```bash
git clone https://github.com/ARYANKUMAR1310/ScoutIQ.git
cd ScoutIQ
npm install
npx expo start
```

Open using Expo Go or an emulator.

---
Key decisions

* Used a **local JSON file** for athlete data to keep things simple and aligned with the assignment.
* Calculated the **readiness score dynamically** based on sport-specific weights instead of hardcoding it.
* Built a **custom progress bar** using basic React Native views (no libraries).
* Implemented **debounced search (300ms)** to keep the UI responsive.
* Used **AsyncStorage** to persist shortlist data across sessions.

---

## What’s incomplete

* No backend or real data (intentionally kept local)
* No images for athletes
* Shortlist uses a button instead of swipe gestures

---

## What I’d improve with more time

I would add swipe-to-delete on the shortlist and improve the UI with better visual feedback and small animations.

---

## AI usage

Used ChatGPT codex and Claude code mainly for debugging, structuring parts of the app, and improving edge case handling. 
Final decisions and implementation were done manually.
