db.collection("Questions").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           //Variables
           var answerA = doc.data().answers.a;
           var answerB = doc.data().answers.b;
           var answerC = doc.data().answers.c;
           var docID = doc.id;

        //    document.write('<h1>' + doc.data().question + '</h1>');
        
        var qHeader = document.createElement('h1');
        qHeader.textContent = doc.data().question;
        var divName = document.getElementById("questions");
        divName.appendChild(qHeader);

        var questionName = doc.id;
           //This will pull answers a, b, and c for each question into a dropdown
        //    document.write('<select name="' + docID +'" id="' + docID +'"><option value="' + answerA + '">' +           answerA + '</option><option value="' + answerB + '">' + answerB + '</option><option value="' + answerC +        '">' + answerC + '</option></select>');
        //Create and append select list
            
            //Create and append select list
        var selectList = document.createElement("select");
        selectList.id = questionName;
        divName.appendChild(selectList);
        // option 1
        var option1 = document.createElement("option");
        option1.value = answerA;
        option1.text = answerA;
        selectList.appendChild(option1);
        // option 2
        var option2 = document.createElement("option");
        option2.value = answerB;
        option2.text = answerB;
        selectList.appendChild(option2);
        //option 3
        var option3 = document.createElement("option");
        option3.value = answerC;
        option3.text = answerC;
        selectList.appendChild(option3);


         //Create submit buttons
        var submitBtn = document.createElement("button");
        submitBtn.innerHTML = "Submit";
       submitBtn.addEventListener("click", validateAnswer);
        divName.appendChild(submitBtn);

        var correctAns = doc.data().correctAnswer;
        var selectedAns = document.getElementById(docID);

        function validateAnswer() {
            db.collection("Questions").get().then(function(querySnapshot) {
                   
          
                    
                    var modal = document.getElementById("myModal");
                    // Get the button that opens the modal
                    var btn = document.getElementById("myBtn");

                    // Get the <span> element that closes the modal
                    var span = document.getElementsByClassName("close")[0];

                    // When the user clicks on the button, open the modal


                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function() {
                      modal.style.display = "none";
                    }

                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function(event) {
                      if (event.target == modal) {
                        modal.style.display = "none";
                      }
                    }
  
                    modal.style.display = "block";
                    
                    if (selectedAns.value == correctAns) {
                      
                      document.getElementById("msg").innerHTML = "You got it right!";
                      }else if(selectedAns.value != correctAns){
                        
                        document.getElementById("msg").innerHTML = "Sorry, you got it wrong!";
                      }
                      
                  
            });
          }
          //Button that finishes quiz
          var finButton = document.getElementById("finQuiz")
                finButton.addEventListener("click", finishQuiz)

               //Generates your results
          function finishQuiz() {
            db.collection("Questions").get().then(function(querySnapshot) {
              
                
                

                    if (selectedAns.value == correctAns) {
                      numCorrect.push(docID)
                   
                      }
                      console.log(numCorrect.length)
                      var totalNum = numCorrect.length
                      localStorage.setItem("numCorrect", totalNum);
                      window.location = "final-score.html";
              });     
            
          }
        });
    });
    //Passes  answers to an array to be used on finish quiz page
    const numCorrect = [];
    
//Output score to finish quiz page
    function finalScore() {
      document.getElementById("score").innerHTML = numCorrect.length;
    }

    
   



     