function Question(text,choices,answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice_entered){
    return this.answer === choice_entered;
}

let ques =[
    new Question("Inside which HTML element do we put the JavaScript?",["<scripting>","<script>","<javascript>","<js>"],"<script>"),
    new Question("How do you write 'Hello World' in an alert box?",["msgBox('Hello World');", "msg('Hello World');","alert('Hello World');", "alertBox('Hello World');"], "alert('Hello World');"),
    new Question("How do you create a function in JavaScript?", ["function-myFunction()", "function:myFunction()","function=myFunction()", "function myFunction()"], "function myFunction()"),
    new Question("How to write an IF statement in JavaScript?", ["if i == 5 then", "if (i == 5)", "if i = 5 then", "if i = 5"], "if (i == 5)"),
    new Question("Which is not a JavaScript Framework?", ["Django", "JQuery","Python Script", "NodeJS"], "Django"),
    new Question("How can you add a comment in a JavaScript?", ["<!--This is a comment-->", "//This is a comment", "'This is a comment", "None of These"], "//This is a comment")
];

function Quiz(ques)
{
    this.ques = ques;
    this.score = 0;
    this.question_index = 0;
}

Quiz.prototype.getQuestionByIndex = function(){
    return this.ques[this.question_index];
}

Quiz.prototype.updateScore = function(answer){
    let currentquestion = this.getQuestionByIndex();
    console.log('update score')
    console.log(currentquestion);
    console.log(answer)
    if(currentquestion.isCorrectAnswer(answer))
    {
        this.score+=1;
    }
    this.question_index+=1;

}

Quiz.prototype.isQuizEnded = function(){
    return this.question_index === ques.length;
}

let obj= new Quiz(ques);

function loadQuestions(){
    if(obj.isQuizEnded())
    {
        displayScore();
    }
    else
    {
        let q1 = document.getElementById('question');
        console.log('************  '+obj.question_index);
        q1.innerText = obj.getQuestionByIndex().text;
        let choices = obj.getQuestionByIndex().choices;
        for(var i=0; i<choices.length; i++)
        {
            let sp1 = document.getElementById('choice' + i);
            sp1.innerText = choices[i];
            let btn = document.getElementById('btn' + i);
            const choice = choices[i];
            btn.onclick=()=>{
                //alert('Button Clicked');
                obj.updateScore(choice);
                console.log('load questions')
                console.log(obj.question_index);
                console.log(obj.score)
                loadQuestions();
            };
        } 
        updateProgress();

    }
}

function displayScore(){
    let quiz = document.getElementById('quiz');
    let res = "<h1>Result</h1>"
    res+="<h2>" +" Your Score is: "+ obj.score + "<br>"+" Marks percentage is: " + (obj.score/ques.length*100) + "%" +"</h2>";
    quiz.innerHTML = res;



}

function updateProgress(){
    let prog = document.getElementById("progress");
    prog.innerText = "Question " + (obj.question_index +1) + " of " + obj.ques.length; 
}

loadQuestions();