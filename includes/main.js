$(document).ready(function () {
  //hide the empty package area from the user
  $("#sales-jumbotron").hide();

  //defining number of questions to ask the user
  const fourQs = 4;
  const fiveQs = 5;
  var numQs = fourQs;
  //API to get customer location
  //assign variables for dereferencing
  var userInfo = 0;
  var userLoc, q2ans, q3ans;
  var q4ans = [];
  let latLong = null;
  var packageOption = 0;
  //below is a list of packages offered on this website. All pckgs button appends all to sales zone and skips questions

  let waterPackageA =
    "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><h3 class='card-header'>Water Package A</h3><div class='card-body'><h5 class='card-title'>The Kayak Pack</h5><h6 class='card-subtitle price-tag text-muted'>$249</h6></div><img style='height: 200px; width: 100%; display: block;'src='images/kayak.png'alt='The Kayak'/><div class='card-body'><p class='card-text'>This sturdy green stud will take you wherever you can dream on water. With a roomy storage container in the back, be ready for a full trip with everything you'll need to dominate the wettest of waters.</p></div><a class='btn btn-primary btn-lg add-to-cart' id='addWaterA' href='cart.html' role='button'style='margin: 10px 30px;'>Package A add to cart</a><div class='card-footer text-muted'>Good Value</div></div>";

  let waterPackageB =
    "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><h3 class='card-header'>Water Package B</h3><div class='card-body'><h5 class='card-title'>The Booty Pack</h5><h6 class='card-subtitle price-tag text-muted'>$169</h6></div><img style='height: 200px; width: 100%; display: block;'src='images/waterPackB.png'alt='The Booty Pack'/><div class='card-body'><p class='card-text'>This comfortable pfd and stylish water boots will keep you afloat in even the roughest waters. You can rely on the boots keeping you warm no matter how cold it is outside. And all for a great price!</p></div><a class='btn btn-primary btn-lg add-to-cart' id='addWaterB' href='cart.html' role='button'style='margin: 10px 30px;'>Package B add to cart</a><div class='card-footer text-muted'>Great Value!</div></div>";

  let waterPackageC =
    "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><h3 class='card-header'>Water Package C</h3><div class='card-body'><h5 class='card-title'>The Complete Water Pack</h5><h6 class='card-subtitle price-tag text-muted'>$389</h6></div><img style='height: 200px; width: 100%; display: block;'src='images/waterPackC.png'alt='The Complete Water Pack'/><div class='card-body'><p class='card-text'>Enjoy the full set of water gear with this all-in-one water adventure pack. All at our best low price! <br><br><br></p></div><a class='btn btn-primary btn-lg add-to-cart' id='addWaterC' href='cart.html' role='button'style='margin: 10px 30px;'>Package C add to cart</a><div class='card-footer text-muted'>Best Value!!</div></div>";

  let skiPackageA =
    "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><h3 class='card-header'>Mountain Package A</h3><div class='card-body'><h5 class='card-title'>The Speedy Skiers Pack</h5><h6 class='card-subtitle price-tag text-muted'>$299</h6></div><img style='height: 200px; width: 100%; display: block;'src='images/skis.png'alt='The Speedy Skiers Pack'/><div class='card-body'><p class='card-text'>You'll be the fastest one on the slopes with these high performance downhill skis. Everyone on the slopes will wonder where you got the confidence you'll get with our skis. Poles are included!</p></div><a class='btn btn-primary btn-lg add-to-cart' id='addSkiA' href='cart.html' role='button'style='margin: 10px 30px;'>Package A add to cart</a><div class='card-footer text-muted'>Good Value</div></div>";

  let skiPackageB =
    "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><h3 class='card-header'>Mountain Package B</h3><div class='card-body'><h5 class='card-title'>The Mountain Style Pack</h5><h6 class='card-subtitle price-tag text-muted'>$299</h6></div><img style='height: 200px; width: 100%; display: block;'src='images/skiPackB.png'alt='The Mountain Style Pack'/><div class='card-body'><p class='card-text'>Be the most stylish on the mountain with this weatherproof ski gear. You'll never get cold when you look this hot! All in this super breathable material that will make a snowman blush.</p></div><a class='btn btn-primary btn-lg add-to-cart' id='addSkiB' href='cart.html' role='button'style='margin: 10px 30px;'>Package B add to cart</a><div class='card-footer text-muted'>Great Value!</div></div>";

  let skiPackageC =
    "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><h3 class='card-header'>Mountain Package C</h3><div class='card-body'><h5 class='card-title'>The Complete Mountain Pack</h5><h6 class='card-subtitle price-tag text-muted'>$569</h6></div><img style='height: 200px; width: 100%; display: block;'src='images/skiPackC.png'alt='The Complete Mountain Pack'/><div class='card-body'><p class='card-text'>Get style and performance with this full set of mountain gear. You'll never need to worry about missing out on a ski trip again!<br><br></p></div><a class='btn btn-primary btn-lg add-to-cart' id='addSkiC' href='cart.html' role='button'style='margin: 10px 30px;'>Package C add to cart</a><div class='card-footer text-muted'>Best Value!!</div></div>";

  let landPackageA =
    "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><h3 class='card-header'>Adventure Package A</h3><div class='card-body'><h5 class='card-title'>The Camping Pack</h5><h6 class='card-subtitle price-tag text-muted'>$199</h6></div><img style='height: 200px; width: 100%; display: block;'src='images/tent.png'alt='The Camping Pack'/><div class='card-body'><p class='card-text'>Light and Portable yet Tough and Spacious, this tent is everything you'll need to spend your time in the great outdoors! With notable features such as a classic design and revolutionary pitch-it-your-way technology!</p></div><a class='btn btn-primary btn-lg add-to-cart' id='addLandA' href='cart.html' role='button'style='margin: 10px 30px;'>Package A add to cart</a><div class='card-footer text-muted'>Good Value</div></div>";

  let landPackageB =
    "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><h3 class='card-header'>Adventure Package B</h3><div class='card-body'><h5 class='card-title'>The Hikers Pack</h5><h6 class='card-subtitle price-tag text-muted'>$99</h6></div><img style='height: 200px; width: 100%; display: block;'src='images/landPackB.png'alt='The Hikers Pack'/><div class='card-body'><p class='card-text'>Looking for an excuse to go out and hit the trails? Look no further than our hikers pack! Some of the best storage/comfort technology has been worked into our products to ensure only the best trail hiking experiences!</p></div><a class='btn btn-primary btn-lg add-to-cart' id='addLandB' href='cart.html' role='button'style='margin: 10px 30px;'>Package B add to cart</a><div class='card-footer text-muted'>Great Value!</div></div>";

  let landPackageC =
    "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><h3 class='card-header'>Adventure Package C</h3><div class='card-body'><h5 class='card-title'>The Complete Adventure Pack</h5><h6 class='card-subtitle price-tag text-muted'>$269</h6></div><img style='height: 200px; width: 100%; display: block;'src='images/landPackC.png'alt='The Complete Adventure Pack'/><div class='card-body'><p class='card-text'>Head out on a true adventure with our Complete Adventure Pack. packed with everything you need to get out and go!<br><br> </p></div><a class='btn btn-primary btn-lg add-to-cart' id='addLandC' href='cart.html' role='button'style='margin: 10px 30px;'>Package C add to cart</a><div class='card-footer text-muted'>Best Value!!</div></div>";

  //For when the user identifies the gear they are missing based on expressed interest in packages
  let waterInterest =
    "<div class='form-check'><label class='form-check-label'><input class='form-check-input' type='checkbox' value='Kayak'>Kayak</label></div><div class='form-check'><label class='form-check-label'><input class='form-check-input' type='checkbox' value='PFD'>PFD</label></div><div class='form-check'><label class='form-check-label'><input class='form-check-input' type='checkbox' value='Booties'>Water Boots</label></div>";

  let skiInterest =
    "<div class='form-check'><label class='form-check-label'><input class='form-check-input' type='checkbox' value='Skis'>Skis</label></div><div class='form-check'><label class='form-check-label'><input class='form-check-input' type='checkbox' value='Jacket'>Ski Jacket</label></div><div class='form-check'><label class='form-check-label'><input class='form-check-input' type='checkbox' value='Pants'>Ski Pants</label></div>";

  let hikeInterest =
    "<div class='form-check'><label class='form-check-label'><input class='form-check-input' type='checkbox' value='Tent'>Tent</label></div><div class='form-check'><label class='form-check-label'><input class='form-check-input' type='checkbox' value='Boots'>Hiking Boots</label></div><div class='form-check'><label class='form-check-label'><input class='form-check-input' type='checkbox' value='Backpack'>Backpack</label></div>";
  //make call and assign data in variables
  $.ajax({
    type: "GET",
    url: "https://ipinfo.io/json",
    success: function (data) {
      userInfo = {
        userLoc: data.loc,
        userCity: data.city,
        userReg: data.region,
        userCn: data.country,
        userTZ: data.timezone,
        latLong: data.loc.split(","),
        userEmail: "",
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      //json formatted ip,city,region,country,timezone,loc++
    },
  });

  //incase we have a returning user that wants to browse all products
  //on products page
  $("#welcome-back-title").html("Welcome Back!");
  $("#message").html("Choose from any of our awesome packages below");
  $("#sales-packs").append(waterPackageA);
  $("#sales-packs").append(waterPackageB);
  $("#sales-packs").append(waterPackageC);
  $("#sales-packs").append(skiPackageA);
  $("#sales-packs").append(skiPackageB);
  $("#sales-packs").append(skiPackageC);
  $("#sales-packs").append(landPackageA);
  $("#sales-packs").append(landPackageB);
  $("#sales-packs").append(landPackageC);

  //beginning of my questions
  var questionNumber = 0;
  $("#ques-cont").click(function () {
    questionNumber++;
    htmlFiller(numQs);
  });

  $(document).on("click", "#q-next", function () {
    if (numQs == 4) {
      switch (questionNumber) {
        case 1:
          if ($('input[name="optionsRadios"]:checked')[0].value == "No") {
            numQs = fiveQs;
          } else {
            numQs = fourQs;
          }
          questionNumber++;
          $("#question-head").html("Question " + questionNumber);
          htmlFiller(numQs);
          break;

        case 2:
          q2ans = $('input[name="optionsRadios"]:checked')[0].value;
          if (q2ans == "Yes") {
            packageOption += 3;
          }

          //determine if they may be interested in water

          questionNumber++;
          $("#question-head").html("Question " + questionNumber);
          htmlFiller(numQs);
          break;

        case 3:
          //mountain or water
          q3ans = $('input[name="optionsRadios"]:checked')[0].value;
          if (q3ans == "W") {
            packageOption = 6;
            if (q2ans == "Yes") {
              packageOption = 15;
            }
          } else if (q3ans == "S") {
            packageOption = 9;
            if (q2ans == "Yes") {
              packageOption = 18;
            }
          } else if (q3ans == "B") {
            packageOption = 12;
            if (q2ans == "Yes") {
              packageOption = 21;
            }
          }
          questionNumber++;
          $("#question-head").html("Question " + questionNumber);
          htmlFiller(numQs);
          //get forecast
          $.ajax({
            type: "GET",
            url:
              "https://api.openweathermap.org/data/2.5/onecall?lat=" +
              userInfo["latLong"][0] +
              "&lon=" +
              userInfo["latLong"][1] +
              "&units=metric&appid=80b3e8b6b36c16336662464e6a0218c0",
            success: function (data) {
              var dailyCast = data['daily'];
              //append forcast at bottom of the page
              $("#possible-answers").append("<table class='table table-hover' id='forecast'><thead><tr><th scope='col'>Day</th><th scope='col'>Weather</th><th scope='col'>Temperature</th></tr></thead></table>");
              //only 5 days are available with this call
              for(var i = 0;i<5;i++){
                $("#forecast").append(`<tbody><tr class="table-active"><th scope="row">Day ${i+1}</th><td>${dailyCast[i]['weather'][0]['main']}</td><td>${dailyCast[i]['temp']['day']}&deg;C</td></tr></tbody>`);
                console.log(dailyCast[i]['temp']['day']);
              }
            }
          });
          break;
        case 4:
          //What gear are you missing?
          $(".form-check-input:checkbox:checked").each(function () {
            q4ans.push($(this).val());
            console.log(q4ans);
          });
          //a variable to make sure there was an available package based on the user selection
          var appended = false;
          //a for loop to check the array of strings for combinations matching packages
          //packages with 1 item
          for (var i = 0; i < q4ans.length; i++) {
            if (q4ans[i] == "Kayak") {
              $("#sales-jumbotron").append(waterPackageA);
              appended = true;
            } else if (q4ans[i] == "Skis") {
              $("#sales-jumbotron").append(skiPackageA);
              appended = true;
            } else if (q4ans[i] == "Tent") {
              $("#sales-jumbotron").append(landPackageA);
              appended = true;
            }
            if (i > 0) {
              //this checks the packages with two items
              if (q4ans[i] == "Booties" && q4ans[i - 1] == "PFD") {
                $("#sales-jumbotron").append(waterPackageB);
                appended = true;
              } else if (q4ans[i] == "Pants" && q4ans[i - 1] == "Jacket") {
                $("#sales-jumbotron").append(skiPackageB);
                appended = true;
              } else if (q4ans[i] == "Backpack" && q4ans[i - 1] == "Boots") {
                $("#sales-jumbotron").append(landPackageB);
                appended = true;
              }
            }
            if (i > 1) {
              //this checks the packages with three items
              if (
                q4ans[i] == "Booties" &&
                q4ans[i - 1] == "PFD" &&
                q4ans[i - 2] == "Kayak"
              ) {
                $("#sales-jumbotron").append(waterPackageC);
                appended = true;
              } else if (
                q4ans[i] == "Pants" &&
                q4ans[i - 1] == "Jacket" &&
                q4ans[i - 2] == "Skis"
              ) {
                $("#sales-jumbotron").append(skiPackageC);
                appended = true;
              } else if (
                q4ans[i] == "Backpack" &&
                q4ans[i - 1] == "Boots" &&
                q4ans[i - 2] == "Tent"
              ) {
                $("#sales-jumbotron").append(landPackageC);
                appended = true;
              }
            }
          }
          //backup in case the user selected options that didn't lead to a package
          if (!appended) {
            $("#sales-jumbotron").append(
              "Whoops! Seems like none of our available packages met your criteria. We hope you'll check out our full list of packages <a href='packages.html'><u>here</u></a>"
            );
          }
          //questions complete. Show the sales packages
          $("#questions-jumbotron").hide();
          $("#sales-jumbotron").show();
          break;
      }
    } else {
      //in case the user must confirm their location
      switch (questionNumber) {
        case 1:
          if ($('input[name="optionsRadios"]:checked')[0].value == "No") {
            numQs = fiveQs;
          } else {
            numQs = fourQs;
          }
          questionNumber++;
          $("#question-head").html("Question " + questionNumber);
          htmlFiller(numQs);
          break;

        case 2:
          questionNumber++;
          userInfo["userCity"] = $("input#userCity").val();
          userInfo["userReg"] = $("input#userRegion").val();
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          htmlFiller(numQs);
          break;

        case 3:
          //q2 in our other half of the if

          q2ans = $('input[name="optionsRadios"]:checked')[0].value;
          if (q2ans == "Yes") {
            packageOption += 3;
          }

          questionNumber++;
          $("#question-head").html("Question " + questionNumber);
          htmlFiller(numQs);
          break;

        case 4:
          //mountain or water
          q3ans = $('input[name="optionsRadios"]:checked')[0].value;
          if (q3ans == "W") {
            packageOption = 6;
            if (q2ans == "Yes") {
              packageOption = 15;
            }
          } else if (q3ans == "S") {
            packageOption = 9;
            if (q2ans == "Yes") {
              packageOption = 18;
            }
          } else if (q3ans == "B") {
            packageOption = 12;
            if (q2ans == "Yes") {
              packageOption = 21;
            }
          }
          questionNumber++;
          $("#question-head").html("Question " + questionNumber);
          htmlFiller(numQs);
          //get forecast
          $.ajax({
            type: "GET",
            url:
              "https://api.openweathermap.org/data/2.5/onecall?lat=" +
              userInfo["latLong"][0] +
              "&lon=" +
              userInfo["latLong"][1] +
              "&units=metric&appid=80b3e8b6b36c16336662464e6a0218c0",
            success: function (data) {
              var dailyCast = data['daily'];
              //append forcast at bottom of the page
              $("#possible-answers").append("<table class='table table-hover' id='forecast'><thead><tr><th scope='col'>Day</th><th scope='col'>Weather</th><th scope='col'>Temperature</th></tr></thead></table>");
              //only 5 days are available with this call
              for(var i = 0;i<5;i++){
                $("#forecast").append(`<tbody><tr class="table-active"><th scope="row">Day ${i+1}</th><td>${dailyCast[i]['weather'][0]['main']}</td><td>${dailyCast[i]['temp']['day']}&deg;C</td></tr></tbody>`);
                console.log(dailyCast[i]['temp']['day']);
              }
            }
          });
          break;
        case 5:
          //What gear are you missing?
          $(".form-check-input:checkbox:checked").each(function () {
            q4ans.push($(this).val());
            console.log(q4ans);
          });
          //a variable to make sure there was an available package based on the user selection
          var appended = false;
          //a for loop to check the array of strings for combinations matching packages
          //packages with 1 item
          for (var i = 0; i < q4ans.length; i++) {
            if (q4ans[i] == "Kayak") {
              $("#sales-jumbotron").append(waterPackageA);
              appended = true;
            } else if (q4ans[i] == "Skis") {
              $("#sales-jumbotron").append(skiPackageA);
              appended = true;
            } else if (q4ans[i] == "Tent") {
              $("#sales-jumbotron").append(landPackageA);
              appended = true;
            }
            if (i > 0) {
              //this checks the packages with two items
              if (q4ans[i] == "Booties" && q4ans[i - 1] == "PFD") {
                $("#sales-jumbotron").append(waterPackageB);
                appended = true;
              } else if (q4ans[i] == "Pants" && q4ans[i - 1] == "Jacket") {
                $("#sales-jumbotron").append(skiPackageB);
                appended = true;
              } else if (q4ans[i] == "Backpack" && q4ans[i - 1] == "Boots") {
                $("#sales-jumbotron").append(landPackageB);
                appended = true;
              }
            }
            if (i > 1) {
              //this checks the packages with three items
              if (
                q4ans[i] == "Booties" &&
                q4ans[i - 1] == "PFD" &&
                q4ans[i - 2] == "Kayak"
              ) {
                $("#sales-jumbotron").append(waterPackageC);
                appended = true;
              } else if (
                q4ans[i] == "Pants" &&
                q4ans[i - 1] == "Jacket" &&
                q4ans[i - 2] == "Skis"
              ) {
                $("#sales-jumbotron").append(skiPackageC);
                appended = true;
              } else if (
                q4ans[i] == "Backpack" &&
                q4ans[i - 1] == "Boots" &&
                q4ans[i - 2] == "Tent"
              ) {
                $("#sales-jumbotron").append(landPackageC);
                appended = true;
              }
            }
          }
          //backup in case the user selected options that didn't lead to a package
          if (!appended) {
            $("#sales-jumbotron").append(
              "Whoops! Seems like none of our available packages met your criteria. We hope you'll check out our full list of packages <a href='packages.html'><u>here</u></a>"
            );
          }
          //questions complete. Show the sales packages
          $("#questions-jumbotron").hide();
          $("#sales-jumbotron").show();
          break;
      }
    }
  });

  //function to populate html formatted questions and answers
  function htmlFiller(numQs) {
    if (numQs == 4) {
      switch (questionNumber) {
        case 1:
          $("#question-head").html("Question 1");
          $("#current-question").html(
            "Confirm your location: " +
              userInfo["userCity"] +
              ", " +
              userInfo["userReg"]
          );
          $("#possible-answers").html(
            " <div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='yes' value='Yes'>Yes</label></div><div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='no' value='No'>No</label></div><br><a id='q-next' class='btn btn-primary btn-lg' role='button' style='margin: 10px 30px; color:#FFFFFF'>Next</a><br>"
          );
          $("#ques-prog-bar").attr("aria-valuenow", "5");
          $("#ques-prog-bar").css("width", "5%");
          break;

        case 2:
          //canvas for onWater method calculation
          $("#current-question").html("Do you like Hiking?");
          $("#possible-answers").html(
            " <div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='yes' value='Yes'>Yes</label></div><div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='no' value='No'>No</label></div><br><a id='q-next' class='btn btn-primary btn-lg' role='button' style='margin: 10px 30px; color:#FFFFFF'>Next</a>"
          );
          $("#ques-prog-bar").attr("aria-valuenow", "25");
          $("#ques-prog-bar").css("width", "25%");

          break;
        case 3:
          $("#current-question").html(
            "Do you like Skiing, being on the Water, or both?"
          );
          $("#possible-answers").html(
            " <div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='skiAns' value='S'>Skiing</label></div><div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='waterAns' value='W'>On Water</label></div><div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='both' value='B'>Both</label></div><div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='neither' value='N'>Neither</label></div><br><a id='q-next' class='btn btn-primary btn-lg' role='button' style='margin: 10px 30px; color:#FFFFFF'>Next</a><br><br>"
          );
          $("#ques-prog-bar").attr("aria-valuenow", "50");
          $("#ques-prog-bar").css("width", "50%");
          break;
        case 4:
          $("#current-question").html("What gear are you missing?");
          switch (packageOption) {
            case 0:
              $("#current-question").html(
                "You don't seem to be interested in our gear. Just in case, take a look and check off any items you might be interested in"
              );
              $("#possible-answers").html("");
              $("#possible-answers").append(hikeInterest);
              $("#possible-answers").append(waterInterest);
              $("#possible-answers").append(skiInterest);
              break;
            case 3:
              $("#possible-answers").html("");
              $("#possible-answers").append(hikeInterest);
              break;
            case 6:
              $("#possible-answers").html("");
              $("#possible-answers").append(waterInterest);
              break;
            case 9:
              $("#possible-answers").html("");
              $("#possible-answers").append(skiInterest);
              break;
            case 12:
              $("#possible-answers").html("");
              $("#possible-answers").append(waterInterest);
              $("#possible-answers").append(skiInterest);
              break;
            case 15:
              $("#possible-answers").html("");
              $("#possible-answers").append(hikeInterest);
              $("#possible-answers").append(waterInterest);
              break;
            case 18:
              $("#possible-answers").html("");
              $("#possible-answers").append(hikeInterest);
              $("#possible-answers").append(skiInterest);
              break;
            case 21:
              $("#possible-answers").html("");
              $("#possible-answers").append(hikeInterest);
              $("#possible-answers").append(waterInterest);
              $("#possible-answers").append(skiInterest);
              break;
          }
          $("#possible-answers").append(
            "<a id='q-next' class='btn btn-primary btn-lg' role='button' style='margin: 10px 30px; color:#FFFFFF'>Next</a><br><br></br>"
          );
          $("#ques-prog-bar").attr("aria-valuenow", "75");
          $("#ques-prog-bar").css("width", "75%");
          break;
      }
    } else if (numQs == 5) {
      switch (questionNumber) {
        case 1:
          $("#question-head").html("Question 1");
          $("#current-question").html(
            "Confirm your location: " +
              userInfo["userCity"] +
              ", " +
              userInfo["userReg"]
          );
          $("#possible-answers").html(
            " <div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='optionsRadios1' value='option1'></label></div><div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='optionsRadios2' value='Yes'></label></div><br><a id='q-next' class='btn btn-primary btn-lg' role='button' style='margin: 10px 30px; color:#FFFFFF'>Next</a><br>"
          );
          $("#ques-prog-bar").attr("aria-valuenow", "5");
          $("#ques-prog-bar").css("width", "5%");
          break;
        case 2:
          $("#current-question").html("Please enter your location");
          $("#possible-answers").html(
            "<div class='form-group'><label class='col-form-label' for='inputDefault'>City</label><input type='text' class='form-control' style='background:#d3d3d3;' placeholder='City' id='userCity'></div><br><div class='form-group'><label class='col-form-label' for='inputDefault'>Region</label><input type='text' class='form-control' style='background:#d3d3d3;' placeholder='Province / Region' id='userRegion'></div><br><a id='q-next' class='btn btn-primary btn-lg' role='button' style='margin: 10px 30px; color:#FFFFFF;'>Confirm</a><br>"
          );
          $("#ques-prog-bar").attr("aria-valuenow", "20");
          $("#ques-prog-bar").css("width", "20%");
          break;
        case 3:
          $("#current-question").html("Are you looking to go hiking?");
          $("#possible-answers").html(
            " <div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='yes' value='Yes'>Yes</label></div><div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='no' value='No'>No</label></div><br><a id='q-next' class='btn btn-primary btn-lg' role='button' style='margin: 10px 30px; color:#FFFFFF'>Next</a><br><canvas id='myCanvas'></canvas>"
          );
          $("#ques-prog-bar").attr("aria-valuenow", "40");
          $("#ques-prog-bar").css("width", "40%");
          break;
        case 4:
          $("#current-question").html(
            "Do you like Skiing, being on the Water, or both?"
          );
          $("#possible-answers").html(
            " <div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='skiAns' value='S'>Skiing</label></div><div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='waterAns' value='W'>On Water</label></div><div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='both' value='B'>Both</label></div><div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='neither' value='N'>Neither</label></div><br><a id='q-next' class='btn btn-primary btn-lg' role='button' style='margin: 10px 30px; color:#FFFFFF'>Next</a><br><br>"
          );
          $("#ques-prog-bar").attr("aria-valuenow", "60");
          $("#ques-prog-bar").css("width", "60%");
          break;
        case 5:
          $("#current-question").html("What gear are you missing?");
          switch (packageOption) {
            case 0:
              $("#current-question").html(
                "You don't seem to be interested in our gear. Just in case, take a look and check off any items you might be interested in"
              );
              $("#possible-answers").html("");
              $("#possible-answers").append(hikeInterest);
              $("#possible-answers").append(waterInterest);
              $("#possible-answers").append(skiInterest);
              break;
            case 3:
              $("#possible-answers").html("");
              $("#possible-answers").append(hikeInterest);
              break;
            case 6:
              $("#possible-answers").html("");
              $("#possible-answers").append(waterInterest);
              break;
            case 9:
              $("#possible-answers").html("");
              $("#possible-answers").append(skiInterest);
              break;
            case 12:
              $("#possible-answers").html("");
              $("#possible-answers").append(waterInterest);
              $("#possible-answers").append(skiInterest);
              break;
            case 15:
              $("#possible-answers").html("");
              $("#possible-answers").append(hikeInterest);
              $("#possible-answers").append(waterInterest);
              break;
            case 18:
              $("#possible-answers").html("");
              $("#possible-answers").append(hikeInterest);
              $("#possible-answers").append(skiInterest);
              break;
            case 21:
              $("#possible-answers").html("");
              $("#possible-answers").append(hikeInterest);
              $("#possible-answers").append(waterInterest);
              $("#possible-answers").append(skiInterest);
              break;
          }
          $("#possible-answers").append(
            "<a id='q-next' class='btn btn-primary btn-lg' role='button' style='margin: 10px 30px; color:#FFFFFF'>Next</a><br><br></br>"
          );
          $("#ques-prog-bar").attr("aria-valuenow", "75");
          $("#ques-prog-bar").css("width", "75%");
          break;
      }
    }
  }

  //when the user is ready to purchase a package
  $(document).on("click", ".add-to-cart", function () {
    let pack = $(this).attr("id");
    createCartItem(pack);
    let time = new Date();
    localStorage.setItem("endTime", time.getTime() + 1000 * 5 * 60);
    localStorage.setItem("was-added", true);
  });

  //function that takes the pack and selects and creates an item based on the pack selected
  function createCartItem(pack) {
    //checks the passed value against what button names exist and assigns the selected package as a string of html
    if (pack == "addWaterA") {
      //$249
      var plain =
        "<tbody class='item'><tr class='table-active'><th scope='row'><img style='height: 100px; width: auto; display: block;'src='images/kayak.png'alt='The Kayak'/></th><td id='item-name'>The Kayak Pack</td><td id='currPrice'>$219</td><td><button type='button' id='remove-item' class='btn btn-danger'>Remove</button></td></tr>";
    } else if (pack == "addWaterB") {
      //$169
      var plain =
        "<tbody class='item'><tr class='table-active'><th scope='row'><img style='height: 100px; width: auto; display: block;'src='images/waterPackB.png'alt='Booties/PFD'/></th><td id='item-name'>The Booty Pack</td><td id='currPrice'>$139</td><td><button type='button' id='remove-item' class='btn btn-danger'>Remove</button></td></tr>";
    } else if (pack == "addWaterC") {
      //$389
      var plain =
        "<tbody class='item'><tr class='table-active'><th scope='row'><img style='height: 100px; width: auto; display: block;'src='images/waterPackC.png' alt='Full Water Pack'/></th><td id='item-name'>The Complete Water Pack</td><td id='currPrice'>$359</td><td><button type='button' id='remove-item' class='btn btn-danger'>Remove</button></td></tr>";
    } else if (pack == "addSkiA") {
      //$299
      var plain =
        "<tbody class='item'><tr class='table-active'><th scope='row'><img style='height: 100px; width: auto; display: block;'src='images/skis.png'alt='The Skis'/></th><td id='item-name'>The Speedy Skiers Pack</td><td id='currPrice'>$269</td><td><button type='button' id='remove-item' class='btn btn-danger'>Remove</button></td></tr>";
    } else if (pack == "addSkiB") {
      //$299
      var plain =
        "<tbody class='item'><tr class='table-active'><th scope='row'><img style='height: 100px; width: auto; display: block;'src='images/skiPackB.png'alt='Pants/Jacket'/></th><td id='item-name'>The Mountain Style Pack</td><td id='currPrice'>$269</td><td><button type='button' id='remove-item' class='btn btn-danger'>Remove</button></td></tr>";
    } else if (pack == "addSkiC") {
      //$569
      var plain =
        "<tbody class='item'><tr class='table-active'><th scope='row'><img style='height: 100px; width: auto; display: block;'src='images/skiPackC.png'alt='Full Mountain Pack'/></th><td id='item-name'>The Complete Mountain Pack</td><td id='currPrice'>$539</td><td><button type='button' id='remove-item' class='btn btn-danger'>Remove</button></td></tr>";
    } else if (pack == "addLandA") {
      //$199
      var plain =
        "<tbody class='item'><tr class='table-active'><th scope='row'><img style='height: 100px; width: auto; display: block;'src='images/tent.png' alt='The Tent'/></th><td id='item-name'>The Camping Pack</td><td id='currPrice'>$169</td><td><button type='button' id='remove-item' class='btn btn-danger'>Remove</button></td></tr>";
    } else if (pack == "addLandB") {
      //$99
      var plain =
        "<tbody class='item'><tr class='table-active'><th scope='row'><img style='height: 100px; width: auto; display: block;'src='images/landPackB.png'alt='Boots/Bag'/></th><td id='item-name'>The Hikers Pack</td><td id='currPrice'>$69</td><td><button type='button' id='remove-item' class='btn btn-danger'>Remove</button></td></tr>";
    } else if (pack == "addLandC") {
      //$269
      var plain =
        "<tbody class='item'><tr class='table-active'><th scope='row'><img style='height: 100px; width: auto; display: block;'src='images/landPackC.png' alt='Full Adventure Pack'/></th><td id='item-name'>The Complete Adventure Pack</td><td id='currPrice'>$239</td><td><button type='button' id='remove-item' class='btn btn-danger'>Remove</button></td></tr>";
    }
    //adds selection to local storage as a list item(html string)
    localStorage.setItem("item-added", plain);
    console.log("Stored as: " + localStorage.getItem("item-added"));
  }
});
