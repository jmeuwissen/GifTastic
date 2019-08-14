//variables for storing search parameters
const LIMIT = 10;
const RATING = "pg";
const API_KEY = "sKbBNsUBqFrbWnYl5Ju4HvgHDh9GyVKK"

const topics = ["cats", "bears", "walrus", "potatoes", "poutine", "fireworks", "bread", "salmon", "candles", "sandwiches"]



function displayGifs() {
    document.getElementById('gifs').innerHTML = ""


    const topic = this.getAttribute("data-name");
    const queryURL = "https://api.giphy.com/v1/gifs/search?q="
        + topic + "&limit=" + LIMIT + "&rating=" + RATING + "&api_key=" + API_KEY;

    // Creates AJAX call for the specific topic button being clicked
    fetch(queryURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (responseJson) {

            const gifObjects = responseJson.data;

            //code for pausing/unpausing gifs
            //needs to be within gif display function

            //found in 06-fetch assignment 15 "pausing gifs" 
            gifObjects.forEach(function (gifObject) {

                const gifEl = document.createElement("img");
                gifEl.setAttribute("src", gifObject.images.fixed_height.url);
                gifEl.setAttribute("data-animate", gifObject.images.fixed_height.url);
                gifEl.setAttribute("data-still", gifObject.images.fixed_height_still.url);
                gifEl.addEventListener("click", function (event) {
                    event.preventDefault();



                    // STEP ONE: study the html above.
                    // Look at all the data attributes.
                    // Run the file in the browser. Look at the images.

                    // After we complete steps 1 and 2 we'll be able to pause gifs from giphy.

                    // STEP TWO: make a variable named state and then store the image's data-state into it.
                    // Use the .attr() method for this.


                    // ============== FILL IN CODE HERE FOR STEP TWO =========================

                    const state = event.target.getAttribute("data-state");

                    // =============================================

                    // STEP THREE: Check if the variable state is equal to 'still',
                    // then update the src attribute of this image to it's data-animate value,
                    // and update the data-state attribute to 'animate'.

                    // If state is equal to 'animate', then update the src attribute of this
                    // image to it's data-still value and update the data-state attribute to 'still'
                    // ============== FILL IN CODE HERE FOR STEP THREE =========================

                    // CODE GOES HERE
                    if (state === "still") {
                        event.target.setAttribute("src", event.target.getAttribute("data-animate"));
                        event.target.setAttribute("data-state", "animate");
                    }
                    else {
                        event.target.setAttribute("src", event.target.getAttribute("data-still"));
                        event.target.setAttribute("data-state", "still");
                    }

                    // ==============================================

                    // STEP FOUR: open the file in the browser and click on the images.
                    // Then click again to pause.
                });
                document.getElementById("gifs").append(gifEl);

            });
            
        });

}




// Function for displaying Topic data
//grabbed from 06-fetch activity 10
function renderButtons() {

    // Deleting the buttons prior to adding new topics
    // (this is necessary otherwise you will have repeat buttons)
    document.getElementById("topics").innerHTML = "";

    // Looping through the array of topics
    for (let i = 0; i < topics.length; i++) {

        // Then dynamically generating buttons for each Topic in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        const a = document.createElement("button");
        // Adding a class of Topic to our button
        a.classList.add("topic");
        // Adding a data-attribute
        a.setAttribute("data-name", topics[i]);
        // Providing the initial button text
        a.innerHTML = topics[i];
        // Adding the button to the topics div
        document.getElementById("topics").append(a);

        // Function for displaying the gifs from the topics
        a.addEventListener("click", displayGifs);
    }
}



renderButtons();


document.getElementById("topic-submit").addEventListener("click", function(event){
    event.preventDefault();

    const topicVal = document.getElementById("topic-input").value.trim();
    const newTopic = document.createElement("button");
    newTopic.classList.add("topic");
    newTopic.setAttribute("data-name", topicVal);
    newTopic.innerHTML = topicVal;
    document.getElementById("topics").append(newTopic);
    newTopic.addEventListener("click", displayGifs);

});
