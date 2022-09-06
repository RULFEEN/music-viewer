let findUser = document.querySelector('#find-user')
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c3862c89cfmshd4a0d750f2b6f8cp152339jsna6a18e9722a5',
        'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
    }
};

findUser.addEventListener('submit', (e)=>{
    e.preventDefault()
    // console.log(e.target.user.value)
    // console.log(e.target.playlist.value)
    document.querySelector("#page-loader").className = "loader"
    if(e.target.playlist.value.length > 0 && e.target.playlist.value.trim().length > 0){
        fetch(`https://spotify81.p.rapidapi.com/search?q=${e.target.playlist.value}&type=playlists&offset=0&limit=100&numberOfTopResults=25`, options)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            let playlists = data.playlists.items
            // playlists.forEach(user => console.log(user.data.owner.name))
            if(e.target.user.value.length > 0 && e.target.user.value.trim().length > 0){
                let goal = playlists.find(user => user.data.owner.name.toString().toLowerCase() == e.target.user.value.toString().toLowerCase() || user.data.owner.name.split(' ')[0, 2] == e.target.user.value)
                let username = goal.data.owner.username
                fetch(`https://spotify81.p.rapidapi.com/user_profile?id=${username}&playlistLimit=50&artistLimit=10`, options)
                .then(res => res.json())
                .then(info => {
                    // console.log(info)
                    if(info.name != false){
                        document.querySelector("#username").innerHTML = `${info.name}`
                    }
                    document.querySelector("#username").parentNode.className = "flex-child"

                    if(info.image_url != false){
                        document.querySelector("#user-image").src = info.image_url
                    }
                    document.querySelector("#user-image").parentNode.className = "flex-child"
                    document.querySelector("#find-user").parentNode.className = "flex-child disabled"
                    let playlists = document.querySelector('#playlists')
                    let lastId = parseInt(playlists.lastElementChild.id)
                    info.public_playlists.forEach((pList) => {
                        // console.log(pList.name)
                        document.querySelector('#playlists').parentNode.parentNode.className = "flex-container black"
                        let div = document.createElement('div')
                        let img = document.createElement('img')
                        let p = document.createElement('p')
                        let div1 = document.createElement('div')
                        let div2 = document.createElement('div')
                        img.src = `https://i.scdn.co/image/${pList.image_url.split(':')[2]}`
                        img.class = 'playlist-image'
                        p.innerHTML = `${pList.name}`
                        p.id = pList.uri.split(':')[2]
                        div1.appendChild(img)
                        div1.className = 'flex-child image'
                        div2.appendChild(p)
                        div2.className = 'flex-child title'
                        div.appendChild(div1)
                        div.appendChild(div2)
                        div.id = lastId +=1
                        div.className = 'playlist flex-container'
                        playlists.appendChild(div)
                    })
                    e.target.reset()
                })
                .catch(err => console.error(err));

                fetch('https://spotify81.p.rapidapi.com/user_profile?id=spotify&playlistLimit=44&artistLimit=10', options)
                .then(res => res.json())
                .then(info => {
                    // console.log(info)
                    let playlists = document.querySelector('#recommended')
                    let lastId = parseInt(playlists.lastElementChild.id)
                    info.public_playlists.forEach((pList) => {
                        document.querySelector('#playlists').parentNode.parentNode.className = "flex-container black"
                        let div = document.createElement('div')
                        let img = document.createElement('img')
                        let p = document.createElement('p')
                        let div1 = document.createElement('div')
                        let div2 = document.createElement('div')
                        img.src = `https://i.scdn.co/image/${pList.image_url.split('/')[4]}`
                        img.class = 'playlist-image'
                        p.innerHTML = `${pList.name}`
                        p.id = pList.uri.split(':')[2]
                        div1.appendChild(img)
                        div1.className = 'flex-child image'
                        div2.appendChild(p)
                        div2.className = 'flex-child title'
                        div.appendChild(div1)
                        div.appendChild(div2)
                        div.id = lastId +=1
                        div.className = 'playlist flex-container'
                        playlists.appendChild(div)
                        document.querySelector('#user-container').className = 'flex-container user'
                        document.querySelector("#page-loader").className = "loader disabled"
                    })
                })
                .catch(err => console.error(err));
            }
            else{
                window.alert('Name isn\'t valid')
            }
        })
        .catch(err => console.error(err));
    }
    else{
        window.alert('Search wasn\'t executed')
    }
})

const results = document.querySelector('#results')
const playlists = document.querySelector('#playlists')
playlists.addEventListener('click', (e)=>{
    // console.log(e.target)
    // console.log(e.target.parentNode.parentNode.lastElementChild.lastElementChild.id)
    document.querySelector("#music-loader").className = "loader"
    fetch(`https://spotify81.p.rapidapi.com/playlist_tracks?id=${e.target.parentNode.parentNode.lastElementChild.lastElementChild.id}&offset=0&limit=100`, options)
	.then(res => res.json())
	.then(data => {
        // console.log(data)
        let lastId = parseInt(results.lastElementChild.id)
        document.querySelector('#music-p').innerHTML = `${e.target.parentNode.parentNode.lastElementChild.lastElementChild.textContent}`
        results.innerHTML = '<div class="result disabled" id="0"></div>'
        data.items.forEach(song => {
            let div = document.createElement('div')
            let img = document.createElement('img')
            let p = document.createElement('p')
            let div1 = document.createElement('div')
            let div2 = document.createElement('div')
            img.src = `${song.track.album.images[2].url}`
            img.class = 'result-image'
            p.innerHTML = `${song.track.name}`
            p.id = song.track.id
            div1.appendChild(img)
            div1.className = 'flex-child image'
            div2.appendChild(p)
            div2.className = 'flex-child title'
            div.appendChild(div1)
            div.appendChild(div2)
            div.id = lastId +=1
            div.className = 'playlist flex-container'
            results.appendChild(div)
            document.querySelector("#music-loader").className = "loader disabled"
        })
    })
	.catch(err => {
        console.error(err)
        fetch(`https://spotify81.p.rapidapi.com/playlist_tracks?id=${e.target.parentNode.lastElementChild.lastElementChild.id}&offset=0&limit=100`, options)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            let lastId = parseInt(results.lastElementChild.id)
            document.querySelector('#music-p').innerHTML = `${e.target.parentNode.lastElementChild.lastElementChild.textContent}`
            results.innerHTML = '<div class="result disabled" id="0"></div>'
            data.items.forEach(song => {
                let div = document.createElement('div')
                let img = document.createElement('img')
                let p = document.createElement('p')
                let div1 = document.createElement('div')
                let div2 = document.createElement('div')
                img.src = `${song.track.album.images[2].url}`
                img.class = 'result-image'
                p.innerHTML = `${song.track.name}`
                p.id = song.track.id
                div1.appendChild(img)
                div1.className = 'flex-child image'
                div2.appendChild(p)
                div2.className = 'flex-child title'
                div.appendChild(div1)
                div.appendChild(div2)
                div.id = lastId +=1
                div.className = 'playlist flex-container'
                results.appendChild(div)
                document.querySelector("#music-loader").className = "loader disabled"
            })
        })
        .catch(err2 => console.error(err2))
    });
})

const recommended = document.querySelector('#recommended')
recommended.addEventListener('click', (e)=>{
    // console.log(e.target)
    document.querySelector("#music-loader").className = "loader"
    fetch(`https://spotify81.p.rapidapi.com/playlist_tracks?id=${e.target.parentNode.parentNode.lastElementChild.lastElementChild.id}&offset=0&limit=100`, options)
	.then(res => res.json())
	.then(data => {
        // console.log(data)
        let lastId = parseInt(results.lastElementChild.id)
        document.querySelector('#music-p').innerHTML = `${e.target.parentNode.parentNode.lastElementChild.lastElementChild.textContent}`
        results.innerHTML = '<div class="result disabled" id="0"></div>'
        data.items.forEach(song => {
            let div = document.createElement('div')
            let img = document.createElement('img')
            let p = document.createElement('p')
            let div1 = document.createElement('div')
            let div2 = document.createElement('div')
            img.src = `${song.track.album.images[2].url}`
            img.class = 'result-image'
            p.innerHTML = `${song.track.name}`
            p.id = song.track.id
            div1.appendChild(img)
            div1.className = 'flex-child image'
            div2.appendChild(p)
            div2.className = 'flex-child title'
            div.appendChild(div1)
            div.appendChild(div2)
            div.id = lastId +=1
            div.className = 'playlist flex-container'
            results.appendChild(div)
            document.querySelector("#music-loader").className = "loader disabled"
        })
    })
	.catch(err => {
        console.error(err)
        fetch(`https://spotify81.p.rapidapi.com/playlist_tracks?id=${e.target.parentNode.lastElementChild.lastElementChild.id}&offset=0&limit=100`, options)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            let lastId = parseInt(results.lastElementChild.id)
            document.querySelector('#music-p').innerHTML = `${e.target.parentNode.lastElementChild.lastElementChild.textContent}`
            results.innerHTML = '<div class="result disabled" id="0"></div>'
            data.items.forEach(song => {
                let div = document.createElement('div')
                let img = document.createElement('img')
                let p = document.createElement('p')
                let div1 = document.createElement('div')
                let div2 = document.createElement('div')
                img.src = `${song.track.album.images[2].url}`
                img.class = 'result-image'
                p.innerHTML = `${song.track.name}`
                p.id = song.track.id
                div1.appendChild(img)
                div1.className = 'flex-child image'
                div2.appendChild(p)
                div2.className = 'flex-child title'
                div.appendChild(div1)
                div.appendChild(div2)
                div.id = lastId +=1
                div.className = 'playlist flex-container'
                results.appendChild(div)
                document.querySelector("#music-loader").className = "loader disabled"
            })
        })
        .catch(err2 => console.error(err2))
    });
})
