import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyC3iFi2dsa7OqYqrD0fSsbHAPdT_Abahhk",
    authDomain: "hackathon-ad63a.firebaseapp.com",
    projectId: "hackathon-ad63a",
    storageBucket: "hackathon-ad63a.appspot.com",
    messagingSenderId: "982678410272",
    appId: "1:982678410272:web:40efb250a402811519d845"
  };
  const app = initializeApp(firebaseConfig);

  
  const auth = getAuth();
//   const db = getFirestore(app);
  
  let loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click",()=>{
    let firstName = document.getElementById("firstname");
    let lastName = document.getElementById("lastname");
    
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    console.log("user==>", user)
    window.location.href = "dashboard.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log("error==>", errorMessage)
  });

  })