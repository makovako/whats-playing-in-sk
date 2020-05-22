const body = document.body

const container = document.createElement('div')
container.classList.add('container')

const get_image_url = radio_name => `img/${radio_name}.png`

const remove_song = index => {
    const data = JSON.parse(localStorage.getItem('saved_songs'))
    data.splice(index,1)
    localStorage.setItem('saved_songs',JSON.stringify(data))
}

const create_card_from_song = (song, index) => {
    const card = document.createElement('div')
    card.classList.add('card')

    const background = document.createElement('div')
    background.classList.add('background')
    background.style.backgroundImage = `url('${get_image_url(song.string)}')`

    const img_box = document.createElement('div')
    img_box.classList.add('img_box')

    const radio_name = document.createElement('p')
    radio_name.classList.add('radio_name')
    radio_name.textContent = song.name

    img_box.appendChild(radio_name)

    const text_box = document.createElement('div')
    text_box.classList.add('text_box')

    const interpret = document.createElement('p')
    interpret.classList.add('interpret')
    interpret.textContent = song.interpret

    const track = document.createElement('p')
    track.classList.add('track')
    track.textContent = song.track

    const date = document.createElement('p')
    date.classList.add('date')
    date.textContent = new Date(song.date).toLocaleString()

    const delete_button = document.createElement('button')
    delete_button.classList.add('button')
    delete_button.classList.add('delete_button')
    delete_button.textContent = "Delete"

    delete_button.addEventListener('click', e => {
        remove_song(index)
        location.reload()
    })

    text_box.appendChild(interpret)
    text_box.appendChild(track)
    text_box.appendChild(date)
    text_box.appendChild(delete_button)
    card.appendChild(background)
    card.appendChild(img_box)
    card.appendChild(text_box)
    return card
}


const data = JSON.parse(localStorage.getItem('saved_songs'))
if (data) {
    data.map((song,index) => {
        container.appendChild(create_card_from_song(song, index))
    })
} else {
    const card = document.createElement('div')
    card.classList.add('card')

    const p = document.createElement('p')
    p.classList.add('radio_name')
    p.style.padding = "1rem"
    p.textContent = "No saved songs found"

    
    card.appendChild(p)
    container.appendChild(card)
}

const buttons = document.createElement('div')
buttons.classList.add('buttons');

[{
    name: "Home",
    href: "/"
}].map(button => {
    const menu_button = document.createElement('a')
    menu_button.classList.add('menu_button')
    menu_button.setAttribute('href', button.href)
    menu_button.textContent = button.name
    buttons.appendChild(menu_button)
})

body.appendChild(container)
body.appendChild(buttons)