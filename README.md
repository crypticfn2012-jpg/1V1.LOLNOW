# 1V1.LOLNOW

GitHub Pages wrapper for the 1v1.LOL WebGL client with Firebase accounts, profiles, stats and a browser-side game-session bridge.

## What is already wired

- Firebase Email/Password and Google authentication
- Firestore player profiles and leaderboard
- The external game's session flow through `/api/auth/google`
- `1v1_session_token`, `1v1_google_id` and `/api/player` compatibility
- Unity Remote Config handoff through `MainMenuManagers.ActivateRemoteConfig`
- Full mode catalogue passed to the client
- Full known character-skin catalogue injected into the server-user entitlement object
- Fullscreen and account/profile UI

The Unity build itself is still loaded from:

`https://onecloudcdn.site/build.json`

The repository does not contain the compiled Unity WebGL binary or the external server emulator, so those external assets still have to remain available.

## Required Firebase setup

### 1. Firebase project

Use the Firebase project configured in `firebase-config.js` (the current project is `v1-lolnow`).

In Firebase Console:

1. Open **Authentication -> Sign-in method**.
2. Enable **Email/Password**.
3. Enable **Google**.
4. Open **Authentication -> Settings -> Authorized domains** and add the hostname that serves the site, for example:
   - `crypticfn2012-jpg.github.io`
   - your custom domain, if you use one

Firebase requires the page's domain to be authorized for web authentication flows. citeturn199643search0turn199643search1

### 2. Firestore

Create the default Cloud Firestore database.

Then open **Firestore -> Rules**, paste the contents of `firestore.rules`, and **Publish**. The rules file in this repository does not deploy to Firebase automatically just because it is committed to GitHub. Firebase documents publishing the rules from the console or deploying them with the Firebase CLI. citeturn199643search7turn199643search5

### 3. Web app config

The site already has `firebase-config.js`. It must contain the config object for the same Firebase project as the Auth and Firestore resources. Firebase's web setup flow provides this config when you register a Web App in Project settings. citeturn199643search2

Do not put Firebase Admin SDK service-account JSON, private keys, or other server credentials in this repository.

## GitHub Pages

Publish the repository's `main` branch as a GitHub Pages site using the repository root as the source.

Open the site over **HTTPS**. Google sign-in uses the browser OAuth flow and the serving domain must be authorized in Firebase. citeturn199643search1

## Important: Firebase does not provide matchmaking

Firebase in this project handles the website account/profile data. It does **not** create the actual Unity matchmaking server.

The current game bridge talks to the external emulator/session layer used by the loaded Unity build. That layer provides the game session token and player object the WebGL client expects. The wrapper now starts that emulator after the website user is authenticated, then resumes the game session before the Unity client is instantiated.

For the current architecture, the important game-session routes are:

- `POST /api/auth/google`
- `POST /api/auth/guest`
- `POST /api/auth/logout`
- `GET /api/player`
- `POST /api/player/save`

The external emulator also controls the game's WebSocket/matchmaking behaviour.

If those external assets or their backend are unavailable, Firebase settings alone cannot make matchmaking work.

## Match stats

When the game integration reports a finished match:

```js
window.recordMatchResult({
  opponentId: null,
  won: true,
  kills: 5,
  deaths: 2,
  mode: "1v1"
});
```

This is currently client-authoritative. Players can forge browser-side results, so a competitive leaderboard should eventually validate match results on a trusted backend.

## Skins and modes

The wrapper now sends the original mode configuration shape back into Unity through `MainMenuManagers.ActivateRemoteConfig`, and it patches the external server-user adapter to expose the known skin catalogue as owned character skins.

That does not create missing game content. The external Unity build still needs to contain the corresponding assets and code paths.

## Troubleshooting

### Website login works but the in-game login button does nothing

Open the browser console and look for:

- `[1V1.LOLNOW] Game session established`
- `[1V1.LOLNOW] In-game Firebase login bridge installed.`
- `[1V1.LOLNOW] Full cosmetic entitlement bridge installed.`

If the session line never appears, the game-session layer did not return a valid token/player object.

### The game loads but matchmaking still shows an in-game error

That means Firebase login succeeded but the Unity client or its WebSocket/matchmaking layer rejected the game session or could not reach the external game service.

At that point, changing Firestore rules will not fix matchmaking. The external game runtime/backend must be reachable and compatible with the Unity build.

## One-time setup checklist

1. Enable Email/Password.
2. Enable Google.
3. Add the GitHub Pages/custom-domain hostname to Firebase Authorized Domains.
4. Create Firestore.
5. Publish `firestore.rules`.
6. Confirm `firebase-config.js` points at `v1-lolnow`.
7. Confirm GitHub Pages is serving the site over HTTPS.
8. Confirm `onecloudcdn.site/build.json`, `server-mock.js`, `UnityLoader.js` and `UnityProgress.js` are reachable from the browser.

Firebase recommends keeping web authentication domains explicitly authorized and using Firestore Security Rules to protect client data. citeturn199643search0turn199643search7
