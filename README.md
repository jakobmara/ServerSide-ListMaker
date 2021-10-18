# List Maker

<h2> What is this </h2>
<p>This project is a website I created for users to create ordered lists for movies and TV shows.</p>

<h2>How does it work? </h2>
<p>This website was designed as a Server-Side-Rendered website which utilizes react redux to synchronize client and server data. The front end was designed using React Bootstrap. The <a href="https://github.com/jakobmara/ListmakerAPI">REST API</a> the website which uses is made in Python Flask it utilizes TMDB API to query for movies and tv show information. It uses the Auth0 API for authentication purposes (login, making sure user can't edit lists they didn't make). The backend is hosted using the Express framework.</p>

<h2>What is the purpose of this</h2>
<p> Originally my parents would always ask me the order they're supposed to watch the marvel movies in so I wanted to create an application where I'd be able to provide them the list. After working on it further I thought it'd be neat to implement TV shows and slowly started to add more features and functionality to the application, eventually leading to me making it a website.</p>

<h2>Current features</h2>
<p>Allow users to sign in and provide them with a page of all the lists they've created. Users can edit lists to add, remove, or change position of entries, users can edit entries to assign them a score or leave some comments about the specific entry. Users can view other user created lists by navigating to the explore tab.</p>