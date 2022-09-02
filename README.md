1. PROJECT TITLE
    Playlists Viewer

2. PROJECT DESCRIPTION
    1. What the application does
        It is impossible to specify every user in Spotify just by their name. Spotify randomly awards users a combination of letters and numbers into an ID such as "31ugj2bllphpos5qux3ktlxbany4". This makes it impossible to find a user by their name since this ID is quite impossible to master. Our application tries to pursue this gap.
        The first thing it does is to fetch playlists with the name of the playlist given. The catch is that the public API only allows a fetch of 100 items at most. This means that you can only search for an artist with a unique playlist name, with at most ninety-nine more 'name-sakes'.
        Through JavaScript, we map each playlist's owner's name to find the name that matches the name given in the search.
        Upon finding the said playlist with the given name, it displays the user's playlists on the left column below the dispayed profile and Spotify's public playlists on the right column.
        When you click on any playlist, it displays the songs there-in in the middle column.
    
    2. Why the technologies used
        We use HTML-5 for the page design, CSS-3 for the styling and just JavaScript for the back-end. They are the preferred since they are pretty simple to understand.

    3. Challenges
        The first challenge would be finding users. Just like it's impossible to narrow down one user on Spotify search, we haven't been able to find every user.

3. HOW TO USE THE PROJECT
    1. Example.
        Check out ./assets/Playlists Viewer.mp4 for an illustration.
    
    2. Visual aids.
        Check out ./assets/Screenshots/ for screenshots.

4. CREDITS


