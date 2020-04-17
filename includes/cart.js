$(document).ready(function(){
    //hide the timer in case it isnt running
    $(".alert").hide();
    //appends our stored package as a cart item
    $("#items").append(localStorage.getItem('item-added'));

    //boolean to see if an item is in the cart > assignment converts string to boolean
    var added = (localStorage.getItem('was-added')=='true');
    //start the timer for their discount if an itme is in cart
    if(added){
        var fiveMinutes = localStorage.getItem('end-time') - localStorage.getItem('time'),
            display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
        $(".alert").show();
    }
    
    //remove an item from the cart
    $(document).on("click", "#remove-item", function () {
        localStorage.removeItem('item-added');
        //item
        $(".item").remove();
        //timer and anything else
        $("#items").nextAll(':not(#checkout)').remove();
        //no timer will dispay on cart page in the future
        localStorage.setItem('was-added', false);
        added = (localStorage.getItem('was-added')=='true');
    });

    //Final step of sale. Get user email and clear local storage
    $(document).on("click", "#checkout", function () {
        if(added){
            //get email
            var userEmail = prompt("Please enter your email", "");
            //verify it is a realish email
            while (!userEmail.match(/\S+@\S+\.\S/i)){
                userEmail = prompt("Whoops! Something went wrong. Please re-enter your email", "");
            }
            //store email
            localStorage.setItem('user-email', userEmail);
            //remove the item
            localStorage.removeItem('item-added');
            //remove item from cart as above
            localStorage.setItem('item-name', $("#item-name").text());
            localStorage.setItem('item-price',$('#currPrice').text());
            $(".item").remove();
            $("#items").nextAll(':not(#checkout)').remove();
            localStorage.setItem('was-added', false);
            added = (localStorage.getItem('was-added')=='true');
            final();
        }else{
            alert("There is nothing in your cart!")
        }
    });

    //timer that gives the user the opportunity for a special price
    function startTimer() {
        var countDownDate = localStorage.getItem('endTime');

        // Update the count down every 1 second
        var x = setInterval(function() {

            // Get the time now
            var now = new Date().getTime();

            // Find the time between now and the end time
            var distance = countDownDate - now;

            // Time calculations for minutes and seconds
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if(seconds<10){
                seconds = ("0"+seconds);
            }
            // Display the result in the time span
            $("#time").html(minutes + ":" + seconds);

            // If the count down is finished
            if (distance < 0) {
                //get rid of timer
                $("#checkout").nextAll().remove();
                //change pricetag
                var newPrice = $('#currPrice').text().split("");
                var temp = "";
                for(var i = 0;i<newPrice.length;i++){
                    if(newPrice[i].match(/\d/)){
                        temp+=newPrice[i];
                    }
                }
                newPrice = parseInt(temp) + 30;
                $("#currPrice").html(`<del>${$('#currPrice').text()}</del><br>$${newPrice}`);
                clearInterval(x);
            }
        }, 1000);
    };

    //thank you page inside of the cart
    function final(){
        //after checking out, allows the user to see the other packages and provides a "support email"
        $("#in-cart").html(`<h1 class="display-3">Thank you!</h1><p class="lead">Your email has been recorded as ${localStorage.getItem('user-email')}. You puchased ${localStorage.getItem('item-name')} for ${localStorage.getItem('item-price')}. We will email you with further details of your purchase</p><hr class="my-4"><p>If you have any inquiries or feedback, please feel free to email us at <u>thisisnotarealbusiness@notascam.com</u></p><p class="lead"><a class="btn btn-primary btn-lg" href="packages.html" role="button">All Packages</a></p>`);
        
    }
});