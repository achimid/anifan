async function extract() {
    const episodes = [...document.querySelectorAll(".episode")]
    for (let i = 0; i < episodes.length; i++) {
        const $episode = episodes[i]

        const title = $episode.querySelector(".episode-info-title").innerText
        const anime = $episode.querySelector(".episode-info-title-orange").innerText
        const url = $episode.querySelector("a.episode-info-title-orange").href
        const mirrorOnline = $episode.querySelector(".episode-figure > a").href
        
        let mirrorMP4
        let mirror720p
        let mirror1080p
        
        const $blue = $episode.querySelector(".episode-info-tabs-item-blue")
        if ($blue) {
            $blue.click()
            await new Promise(r => setTimeout(r, 100))
            mirrorMP4 = [...$episode.querySelectorAll(".episode-info-links > a")].filter(e => e.innerText.trim() == "Drive" || e.innerText.trim() == "Mega" )[0].href        
        }
        
        const $green = $episode.querySelector(".episode-info-tabs-item-green")
        if ($green) {
            $green.click()
            await new Promise(r => setTimeout(r, 100))
            mirror720p = [...$episode.querySelectorAll(".episode-info-links > a")].filter(e => e.innerText.trim() == "Drive" || e.innerText.trim() == "Mega" )[0].href
        }

        const $red = $episode.querySelector(".episode-info-tabs-item-red")
        if ($red) {
            $red.click()
            await new Promise(r => setTimeout(r, 100))
            mirror1080p = [...$episode.querySelectorAll(".episode-info-links > a")].filter(e => e.innerText.trim() == "Drive" || e.innerText.trim() == "Mega" )[0].href
        }
        
        
        const post = {
            from: "Animes Telecine",
            url,
            title,
            anime,
            mirrors: [
                {
                    description: "Online",
                    url: mirrorOnline
                },
                {
                    description: "1080p",
                    url: mirror1080p
                },
                {
                    description: "720p",
                    url: mirror720p
                },
                {
                    description: "MP4",
                    url: mirrorMP4
                }
            ]
        }
        
        console.log(post)
        fetch("https://anifan.com.br/api/v1/post", {
            method: 'POST',
            body: JSON.stringify(post),
            mode: 'no-cors'
        }).then(console.log).catch(console.error)
        
    }
}

extract()