<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyChQk1xyEQM5sT-xJMzF07I_bsqx6tkU1E",
    authDomain: "v1-lolnow.firebaseapp.com",
    projectId: "v1-lolnow",
    storageBucket: "v1-lolnow.firebasestorage.app",
    messagingSenderId: "473486188203",
    appId: "1:473486188203:web:4e41f4b86d46a3143361ee",
    measurementId: "G-PQXZBZDBVZ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
