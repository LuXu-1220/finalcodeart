$(document).ready(function()
{

    makeCorrectSize();


    var music = new Audio('audio/Mii Channel Music.mp3');


    var score = 0;
    $("#score").text("Score: " + score );
    var timer = 0;
    $("#timer").text("Timer: " + timer);
    var whackImages = [];
    var moleStateMap = [];

    var recentlyWhacked = -1;

    preloadMoles();
    displayMoles();

    window.setInterval(function()
    {
      if (timer > 0)
      {
        raiseMole();
        updateTimer();
      }
      if (timer === 0)
      {
          resetMoles();
          resetGame();

      }

    }, 1000);

    function preloadMoles()
    {


        var imageObject = '<img src = "images/hole.png">';

        whackImages.push(imageObject);

        imageObject = '<img src = "images/mole.png">';

        whackImages.push(imageObject);

        imageObject = '<img src = "images/hole.png">';

        whackImages.push(imageObject);

        for (var counter = 0; counter < 12; counter++)
            moleStateMap.push(false);

    }

    function displayMoles()
    {
        $("#whackTable tbody").empty();
        for (var counter = 0; counter < 12; counter++)
        {
            if (counter%4 === 0)
            {

                if (counter !== 0)
                    $("#whackTable tbody").append("</tr>");
                $("#whackTable tbody").append("<tr>");
            }
            if (moleStateMap[counter])
                $("#whackTable tbody").append("<td id='" +counter + "'>" + whackImages[1] + "</td>");
            else
                 $("#whackTable tbody").append("<td id='" +counter + "'>" + whackImages[0] + "</td>");
        }
        $("#whackTable tbody").append("</tr>");
        $("#whackTable img").css('width', screen.width/5 + 'px');
        $("#whackTable img").css('height', screen.height/5 + 'px');
    }

    function raiseMole()
    {
        var repetitionCounter = 0;
        var randomNumber = Math.floor((Math.random() * 12));
        while (moleStateMap[randomNumber] === true && randomNumber !== recentlyWhacked)
        {
           randomNumber = Math.floor((Math.random() * 12));
           repetitionCounter++;
           if (repetitionCounter === 5)
               break;

        }
        moleStateMap[randomNumber] = true;
        displayMoles();
    }

    function updateTimer()
    {
        timer--;
        $("#timer").text("Timer: " + timer);

    }

    $("#whackDiv").on("click","td",function()
    {
        var location = $(this).attr('id');
        if (moleStateMap[location])
        {
            recentlyWhacked = location;
            moleStateMap[location] = false;
            displayMoles();
            updateScore();
            if (Math.floor((Math.random() * 5) + 1) >= 4)
                raiseMole();
        }

    });

    function updateScore()
    {
        score += 10;
        $("#score").text("Score: " + score);
    }


    function resetMoles()
    {
        for (var counter = 0; counter < 12; counter++)
            moleStateMap[counter] = false;
        displayMoles();
        recentlyWhacked = -1;
        music.pause();
    }

    $("#startButton").on("click",function()
    {
        $(this).css({"visibility":"hidden"});
        timer = 60;
        music.play();
    });

    function resetGame()
    {
        $("#startButton").css({"visibility":"visible"});
        score = 0;
    }


    function makeCorrectSize()
    {


        $('#whackDiv').css('height', screen.height + 'px');
        $("#whackDiv").css('width', screen.width + 'px');

    }

});
