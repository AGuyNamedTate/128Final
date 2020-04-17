function onWater(lat, long) {
    // Gets the image from the API call
    var apiCall =
      "https://maps.googleapis.com/maps/api/staticmap?center=" +
      lat +
      "," +
      long +
      "&zoom=11&size=400x400&maptype=roadmap&key=AIzaSyDidt8ZdVqW8g5_uYu6wC9D8jPWi-2-v8Y";
    // alert(apiCall);

    // Set image source as constructed API call string
    var img = new Image();
    img.crossOrigin = "anonymous"; // To fix the security issue of reading images from other sources
    var src = apiCall;

    // Sets up the canvas
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    // Fill in the backgorund color with red so we can see it
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 10, 10);

    // // Download the image
    img.onload = function () {
      // ...then set the onload handler...
      ctx.drawImage(img, 0, 0);
      let x = 0;
      let y = 0;
      while (x < 399) {
        // Get color of image
        while (y < 399) {
          var imgData = ctx.getImageData(x, y, 1, 1);
          var red = imgData.data[0];
          var green = imgData.data[1];
          var blue = imgData.data[2];
          var alpha = imgData.data[3];

          // Hides the canvas as we are not interested in seeing it
          canvas.style.display = "none";

          /*console.log(
                  "red: " +
                    red +
                    " green: " +
                    green +
                    " blue: " +
                    blue +
                    " alpha: " +
                    alpha
                );*/

          // Determine if this response is WATER or NOT WATER
          if (red == 170 && green == 218 && blue == 254) {
            console.log("water found");

            return;
          } else {
            y++;
          }
        }
        x++;
        y = 0;
      }
    };
    img.src = src; // because the internet says you should put your src after your load
  }