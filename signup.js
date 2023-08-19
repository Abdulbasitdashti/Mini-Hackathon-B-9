  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
  const firebaseConfig = {
    apiKey: "AIzaSyC3iFi2dsa7OqYqrD0fSsbHAPdT_Abahhk",
    authDomain: "hackathon-ad63a.firebaseapp.com",
    projectId: "hackathon-ad63a",
    storageBucket: "hackathon-ad63a.appspot.com",
    messagingSenderId: "982678410272",
    appId: "1:982678410272:web:40efb250a402811519d845"
  };

  const app = initializeApp(firebaseConfig);

  let signupBtn = document.getElementById("signupBtn");

  const auth = getAuth();
  const db = getFirestore(app);


  signupBtn.addEventListener("click",()=>{

    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let obj = {
        firstName,
        lastName,
        email,
    }

    createUserWithEmailAndPassword(auth,email,password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          try {
            const docRef = await addDoc(collection(db, "users"), {
              ...obj,
              uid: user.uid,
            });
            console.log("Document written with ID: ", docRef.id);
        alert("Sign in succesfuull")
        window.location.href = "login.html";
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorMessage==>", errorMessage);
        });
  })
    
//     createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
    
//     console.log("user==>", user)
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;

//     console.log("error==>",errorMessage)
//     // ..
//   });


