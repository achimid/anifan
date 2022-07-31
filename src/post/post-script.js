const $episode = document.querySelector(".episode")
const title = $episode.querySelector(".episode-info-title").innerText
const anime = $episode.querySelector(".episode-info-title-orange").innerText
const url = $episode.querySelector("a.episode-info-title-orange").href
const mirrorOnline = $episode.querySelector(".episode-figure > a").href

$episode.querySelector(".episode-info-tabs-item-blue").click()
await new Promise(r => setTimeout(r, 100))
const mirrorMP4 = [...$episode.querySelectorAll(".episode-info-links > a")].filter(e => e.innerText.trim() == "Drive" || e.innerText.trim() == "Mega" )[0].href

$episode.querySelector(".episode-info-tabs-item-green").click()
await new Promise(r => setTimeout(r, 100))
const mirror720p = [...$episode.querySelectorAll(".episode-info-links > a")].filter(e => e.innerText.trim() == "Drive" || e.innerText.trim() == "Mega" )[0].href

$episode.querySelector(".episode-info-tabs-item-red").click()
await new Promise(r => setTimeout(r, 100))
const mirror1080p = [...$episode.querySelectorAll(".episode-info-links > a")].filter(e => e.innerText.trim() == "Drive" || e.innerText.trim() == "Mega" )[0].href

const post = {
    url,
    title,
    anime,
    mirrors: {
        online: mirrorOnline,
        "1080p": mirror1080p,
        "720p": mirror720p,
        "mp4": mirrorMP4,        
    }
}

console.log(post)



const postObj = {
    "url": "https://www.animestc.net/animes/boruto-naruto-next-generations-download-assistir-online",
    "title": "Boruto - Naruto Next Generations - Episódio 260",
    "anime": "Boruto - Naruto Next Generations",
    "mirrors": {
      "online": "https://www.animestc.net/online/boruto-naruto-next-generations-episodio-260",
      "1080p": "https://protetor.animestc.xyz/link/MjIxMzAvaGlnaC8y",
      "720p": "https://protetor.animestc.xyz/link/MjIxMzAvbWVkaXVtLzI=",
      "mp4": "https://protetor.animestc.xyz/link/MjIxMzAvbG93LzI="
    }
}