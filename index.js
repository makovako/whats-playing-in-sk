const RADIO_LIST_URL = "https://www.radia.sk/_radia/radia.json";
const NOW_PLAYING_URL = "https://onair.radia.sk/all.json";
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

const create_card_from_radio = (radio) => {
    const card = document.createElement('div')

    const img_box = document.createElement('div')

    const text_box = document.createElement('div')
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
    filtered_radios.map((radio) => {
      const p = document.createElement("p");
      p.textContent = `${radio.name}: ${radio.interpret} - ${radio.track}`;
      body.appendChild(p);
    });
    console.log(filtered_radios);
  }
)();
