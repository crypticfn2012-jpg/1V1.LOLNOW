# 1V1.LOLNOW

GitHub Pages wrapper for the playable 1v1.LOL client with Firebase accounts, profiles and a live leaderboard.

## Setup

1. Create a Firebase project.
2. Enable Authentication -> Sign-in method -> Email/Password.
3. Enable Google if you want Google login.
4. Create a Firestore database.
5. Add a Web App in Firebase Project settings.
6. Put its web config into firebase-config.js.
7. Paste firestore.rules into Firestore Rules.
8. Add your GitHub Pages domain to Firebase Authentication -> Authorized domains.

GitHub Pages hosts the frontend; Firebase provides Auth and Firestore.

## Match stats

When your game integration knows a match ended:

window.recordMatchResult({
  opponentId: null,
  won: true,
  kills: 5,
  deaths: 2,
  mode: "1v1"
});

This MVP is client-authoritative. Browser users can forge results. For a serious competitive leaderboard, move match validation/stat updates to a trusted server or Firebase Cloud Function.

## Skins

Player profiles contain allSkinsUnlocked: true. That flag is ready for a Unity-side entitlement check. It cannot by itself modify an already-built external Unity WebGL binary.

The current game binary is loaded from onecloudcdn.site/build.json.
