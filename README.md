**Project Overview** <br/>
A simple implementation for a store locator using the Starbucks kaggle database. I have implemented the project in 2 parts, a backend in express that connects and pushes the starbuck repository that has be uploaded to MongoDB.This connects to the React frontend that call in the store data and then from the user input filter the country (to reduce load times) and then call the relevent locations with the BING distance matrix API to generate a distance and then filter out results that are too far away. The results are then loaded to the page through their relevent componants.
<br/><br/>
**Known issues**<br/>
-Slow with countries with a lot of locations<br/>
-Map with locations does not load<br/>

**Future Implementations**<br/>
-Individual Pages for stores<br/>
