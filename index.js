const RADIO_LIST_URL = "https://www.radia.sk/_radia/radia.json";
const NOW_PLAYING_URL = "https://onair.radia.sk/all.json";
// TODO Save to local storage and let user pick
const weight = {
  expres: 100,
  fun: 95,
  europa2: 90,
  jemne: 85,
  "best-fm": 80,
  viva: 75,
  slovensko: 70,
  vlna: 65,
};

const get_image_url = radio_name => `https://radia.sk/_radia/loga/nadpis/${radio_name}.png`

const create_card_from_radio = (radio) => {
    const card = document.createElement('div')
    card.classList.add('card')

    const background = document.createElement('div')
    background.classList.add('background')
    background.style.backgroundImage = `url('${get_image_url(radio.string)}')`

    const img_box = document.createElement('div')
    img_box.classList.add('img_box')

    const radio_name = document.createElement('p')
    radio_name.classList.add('radio_name')
    radio_name.textContent = radio.name

    img_box.appendChild(radio_name)

    const text_box = document.createElement('div')
    text_box.classList.add('text_box')

    const interpret = document.createElement('p')
    interpret.classList.add('interpret')
    interpret.textContent = radio.interpret

    const track = document.createElement('p')
    track.classList.add('track')
    track.textContent = radio.track

    const save_button = document.createElement('button')
    save_button.classList.add('save_button')
    save_button.textContent = "Save"

    save_button.addEventListener('click', e => {
        // TODO save song to local storage
        console.log('saved');
        console.log({radio});
          
        save_button.classList.add('saved')
        save_button.textContent = "Saved!"
        setTimeout(() => {
            save_button.classList.remove('saved')
            save_button.textContent = "Save"
        },3000)
    })

    text_box.appendChild(interpret)
    text_box.appendChild(track)
    text_box.appendChild(save_button)
    card.appendChild(background)
    card.appendChild(img_box)
    card.appendChild(text_box)
    return card
}

(async () => {
    const radios = await (await fetch("radia.json")).json();
    const now_playing = await (await fetch("all.json")).json();
  
    const filtered_radios = radios.radia
      .filter((radio) => Object.keys(weight).includes(radio.s))
      .sort((a, b) => weight[b.s] - weight[a.s])
      .map((radio) => {
        const [playing] = now_playing.data.filter((play) => play.r === radio.i);
        return {
          index: radio.i,
          string: radio.s,
          name: radio.n,
          interpret: playing.i,
          track: playing.t,
        };
      });

    const body = document.body;
    const container = document.createElement("div");
    container.classList.add('container')
    filtered_radios.map((radio) => {
      container.appendChild(create_card_from_radio(radio));
    });
    
    const buttons = document.createElement('div')
    buttons.classList.add('buttons');
    
    [{
        name: "List saved",
        href: "/list"
    },{
        name: "Pick radios",
        href: "/pick"
    }].map(button => {
        const menu_button = document.createElement('a')
        menu_button.classList.add('menu_button')
        menu_button.setAttribute('href', button.href)
        menu_button.textContent = button.name
        buttons.appendChild(menu_button)
    })
    body.appendChild(container)
    body.appendChild(buttons)
  }
)();
