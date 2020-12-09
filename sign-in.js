  
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBecH2HgmxW84zZPdZR2c5DnN8yLKX0xBk",
    authDomain: "animal-quiz-24eae.firebaseapp.com",
    databaseURL: "https://animal-quiz-24eae.firebaseio.com",
    projectId: "animal-quiz-24eae",
    storageBucket: "animal-quiz-24eae.appspot.com",
    messagingSenderId: "385679238200",
    appId: "1:385679238200:web:e52ff3a03acb14e5c9b2cd"
  };
 
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    
    //Create a new account
    function handleSignUp() {

      var userEmail = document.getElementById("email-field").value;
      var userPass= document.getElementById("password-field").value;
      var confirmPass = document.getElementById("confirmpass-field").value;

      

//Confirms passwords match
      if(userPass === confirmPass) {
      var userPassword = document.getElementById("password-field").value;
      } else {
      alert('Passwords do not match');
      }

//Make sure enters an email address
      if (userEmail.length < 4) {
      alert('Please enter an email address.');
      return;
      }

      //Enter a strong enough password
      if (userPassword.length < 4) {
      alert('Please enter a password.');
      return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
      } else {
          alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
      });
      // [END createwithemail]

  }
  /* *** calls function to add user information to database once account has been successfully created *** */
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
        console.log("account created succesfully")
        document.getElementById("startQuiz").style.display = "inline";
    } else {
        console.log("not signed in")
    }
    
});

//Allows me to sign up for testing
function signOut() {
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
})
};

//Go to quiz page
function goToQuiz() { 

  location.href = "quiz.html";
}
