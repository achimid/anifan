const $progress = document.querySelector('.progress')
const $sPeers = document.querySelector('#sPeers')
const $sDownload = document.querySelector('#sDownloaSpeed')
const $sUpload = document.querySelector('#sUploadSpeed')
const $sMagnet = document.querySelector('#sMagnet')
const $sDownloadLink = document.querySelector('#sDownloadLink')
const $sName = document.querySelector('#sName')


const client = new WebTorrent()

client.on('error', function (err) {
    console.error('ERROR: ' + err.message)
})
const torrentIdDefault = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.fastcast.nz&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F'

function addTorrent(torrentId) {
    log('Adding ' + torrentId)
    client.add(torrentId, onTorrent)    
    
    $("#modal-video").modal()
}

function onTorrent(torrent) {
    log('Got torrent metadata!')
    log(
        'Torrent info hash: ' + torrent.infoHash + ' ' +
        '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
        '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>'
    )

    $sMagnet.href = torrent.magnetURI
    
    const interval = setInterval(function () {
        progress((torrent.progress * 100).toFixed(1), torrent.downloadSpeed, torrent.uploadSpeed, torrent.numPeers)
    }, 2000)

    torrent.on('done', function () {
        $sDownloadLink.href = torrent.torrentFileBlobURL        
    })

    torrent.files.filter(({ name })  => name.endsWith('.mp4')).forEach(function (file) {
        file.appendTo('.video')
        $sName.innerHTML = file.name
        file.getBlobURL(function (err, url) {
            if (err) return log(err.message)
            log('File done.')
            log('<a href="' + url + '">Download full file: ' + file.name + '</a>')            
        })
    })
}


function log (str) {    
    // document.querySelector('.log').innerHTML = str
}

function progress(progress, download, upload, peers) {
    $progress.innerHTML = `<div class="progress-bar" role="progressbar" style="width: ${progress}%;" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">${progress}%</div>`
    $sPeers.innerHTML = peers
    $sDownload.innerHTML = prettyBytes(download) + '/s'
    $sUpload.innerHTML = prettyBytes(upload) + '/s'
}

function prettyBytes(num) {
    const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const neg = num < 0
    if (neg) num = -num
    if (num < 1) return (neg ? '-' : '') + num + ' B'
    const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
    const unit = units[exponent]
    num = Number((num / Math.pow(1000, exponent)).toFixed(2))
    return (neg ? '-' : '') + num + ' ' + unit
}

