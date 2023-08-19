import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, collection, query, where,addDoc, getDocs,setDoc,doc, getDoc,} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyC3iFi2dsa7OqYqrD0fSsbHAPdT_Abahhk",
  authDomain: "hackathon-ad63a.firebaseapp.com",
  projectId: "hackathon-ad63a",
  storageBucket: "hackathon-ad63a.appspot.com",
  messagingSenderId: "982678410272",
  appId: "1:982678410272:web:40efb250a402811519d845"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



let postContainer = document.querySelectorAll(".container-body")[0];

let postForm = document.querySelectorAll("#post_form")[0];

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let postTitle = document.querySelectorAll("#post_title")[0].value;
    let postDescription = document.querySelectorAll("#post_desc")[0].value;

    try {
        const userInfo = await getUserInfo(auth.currentUser.uid);
        
        if (userInfo) {
            const postObj = {
                postTitle,
                postDescription,
                userUid: auth.currentUser.uid,
                userName: userInfo.name,
                created_at: new Date().getTime().toString()
            }

            const postRef = collection(db, 'hackathon');
            await addDoc(postRef, postObj);
        } else {
            console.log("No user info found");
        }
    } catch (error) {
        console.error("Error getting user info:", error);
    }
    getPosts();
    postForm.reset();
});
let  getUserInfo = async(uid)=> {
    const userRef = doc(db, "hackathon", uid)
    const docSnap = await getDoc(userRef);
    let info = null
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        info = docSnap.data(
        )
    } else {
        console.log("No such document!");
    }

    return info
}
let getPosts = async () => {
    const q = query(collection(db, "hackathon"), where("userUid", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const postInfo = doc.data();
        const { postTitle, created_at, userName, postDescription } = postInfo;

        const card = `
            <div class="card">
                <div class="card-title card-userInfo">
                    <span> Post By ${userName} </span> 
                    <span> ${new Date(Number(created_at)).toLocaleDateString()} </span> 
                </div>
                <div class="card-title">
                    ${postTitle}
                </div>
                <div class="card-body">${postDescription}</div>
                <button id="edit">Edit</button>
                <button id="delete">Delete</button>
            </div>
        `;

        postContainer.innerHTML += card;
    });
};