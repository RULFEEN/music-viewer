let findUser = document.querySelector('#find-user')
findUser.addEventListener('submit', (e)=>{
    e.preventDefault()
    // console.log(e.target.user.value)
    // console.log(e.target.playlist.value)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c3862c89cfmshd4a0d750f2b6f8cp152339jsna6a18e9722a5',
            'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
        }
    };
    fetch(`https://spotify81.p.rapidapi.com/search?q=${e.target.playlist.value}&type=playlists&offset=0&limit=100&numberOfTopResults=25`, options)
	.then(response => response.json())
	.then(data => {
        console.log(data)
        let playlists = data.playlists.items
        let goal = playlists.find(user => user.data.owner.name == e.target.user.value)
        let username = goal.data.owner.username
        fetch(`https://spotify81.p.rapidapi.com/user_profile?id=${username}&playlistLimit=50&artistLimit=10`, options)
        .then(res => res.json())
        .then(info => {
            console.log(info)
            if(info.has_spotify_name.toString() === 'true'){
                document.querySelector("#username").innerHTML = `${info.name}`
            }
            document.querySelector("#username").parentNode.className = "flex-child"

            if(info.has_spotify_image.toString() === 'true'){
                document.querySelector("#user-image").src = info.image_url
            }
            document.querySelector("#user-image").parentNode.className = "flex-child"
            document.querySelector("#find-user").parentNode.className = "flex-child disabled"
            info.public_playlists.forEach((pList) => {
                // console.log(pList.image_url)
                // console.log(pList.name)
                console.log(pList.uri.toString().split(':')[2])
            })
            e.target.reset()
        })
        .catch(err => console.error(err));
    })
	.catch(err => console.error(err));
})