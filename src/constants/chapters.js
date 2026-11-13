// User-supplied narrative, grouped by chapter. Empty audio paths are intentional.
// Camera framing is artistic; source links and proxy labels travel with each object.
export const CHAPTERS = [
  {
    id: "introduction",
    slug: "introduction",
    number: null,
    label: "Introduction",
    title: "Abandoned, but not forgotten",
    region: "Introduction",
    kind: "introduction",
    audio: "/audio/chapters/introduction.mp3",
    backgroundImage: "",
    text: [
      "Across the Moon and Mars, exploration has left behind more than footprints. There are landers, rovers, instruments, and spacecraft that once carried out extraordinary missions — and then fell silent.",
      "Each one represents a moment when humanity reached beyond its own world, exploring places we had never truly known.",
      "Some completed their missions. Others survived far longer than expected. And some continued travelling long after their final signals reached Earth.",
      "Their journeys may have ended, but their stories have not.",
      "This is not simply a record of abandoned machines. It is a story of discovery, courage, and the remarkable things humanity leaves behind when it dares to explore the unknown.",
    ],
    artifacts: [],
  },
  {
    id: "chapter-1",
    slug: "chapter-1",
    number: 1,
    label: "Chapter 1",
    title: "The First Footprints: Apollo's Lunar Legacy",
    region: "The Moon",
    kind: "chapter",
    audio: "",
    backgroundImage: "/images/chapter/moon-background.png",
    text: [],
    artifacts: [
      {
        id: "apollo-lunar-module",
        title: "Apollo Lunar Module — Descent Stage",
        audio: "/audio/chapters/01-chapter-1.mp3",
        text: [
          "When Apollo astronauts prepared to leave the Moon, they could not take every part of their spacecraft with them. The Lunar Module was designed in two stages: the descent stage carried the astronauts down to the lunar surface, while the ascent stage took them back into lunar orbit.",
          "After the crew departed, the descent stage remained behind, along with its landing legs, engine, and footpads.",
          "It had completed the most important part of its journey: bringing humans safely to another world. What remained was a lasting reminder of one of humanity's greatest achievements.",
        ],
        model: "/models/apollo-lunar-module.glb",
        image: "",
        caption:
          "Complete mission-era Lunar Module, including the ascent stage; only the descent stage stayed at the landing site.",
        credit: "NASA/Michael D. Carbajal",
        assetSource:
          "https://science.nasa.gov/3d-resources/apollo-lunar-module/",
        sources: [
          {
            label: "NASA NSSDCA mission record",
            url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "The Moon Module",
      },
      {
        id: "lunar-roving-vehicle",
        title: "Lunar Roving Vehicle — Apollo 15, 16 and 17",
        audio: "/audio/chapters/01-chapter-2.mp3",
        text: [
          "The final Apollo missions changed the way astronauts explored the Moon. Apollo 15, 16, and 17 each carried a Lunar Roving Vehicle — a battery-powered vehicle that allowed astronauts to travel farther across the lunar surface.",
          "For the first time, astronauts could explore areas beyond their immediate landing sites, collecting samples and investigating a wider range of terrain.",
          "The rovers became an important part of lunar exploration. When their missions ended, they remained parked on the Moon, at their landing sites.",
          "Their wheels stopped turning, but the paths they created remain part of humanity's exploration history.",
        ],
        model: "/models/lunar-rover.glb",
        image: "",
        caption:
          "Simplified reconstruction with replacement materials; not a photograph or an exact reconstruction.",
        credit: "Hameed / OldSchool3D",
        assetSource:
          "https://blenderartists.org/t/nasa-lunar-rover-scene-file/1610886",
        sources: [
          {
            label: "NASA NSSDCA mission record",
            url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "Lunar Roving Vehicle",
      },
    ],
  },
  {
    id: "chapter-2",
    slug: "chapter-2",
    number: 2,
    label: "Chapter 2",
    title: "Silent Witnesses: The Moon's Forgotten Machines",
    region: "The Moon",
    kind: "chapter",
    audio: "",
    backgroundImage: "/images/chapter/moon-background.png",
    text: [],
    artifacts: [
      {
        id: "alsep",
        title: "Apollo Lunar Surface Experiments Package — ALSEP",
        audio: "/audio/chapters/02-chapter-1.mp3",
        text: [
          "Not everything left on the Moon was designed to move. Some equipment was built to stay behind and continue working.",
          "During Apollo 12, 14, 15, 16, and 17, astronauts deployed scientific stations known as the Apollo Lunar Surface Experiments Packages, or ALSEP.",
          "These stations carried instruments designed to study the Moon's environment, including its seismic activity, magnetic fields, and internal structure.",
          "After the astronauts returned to Earth, the experiments continued sending valuable scientific data for years.",
          "NASA finally switched off the ALSEP stations on September 30, 1977. Their transmissions ended, but the equipment remained on the lunar surface — silent instruments from an extraordinary period of exploration.",
        ],
        model: "",
        image: "/images/artifacts/alsep.jpg",
        caption: "Apollo 12 ALSEP archival photograph.",
        credit: "NASA",
        assetSource:
          "https://science.nasa.gov/image-detail/as12-46-6789-alsep/",
        sources: [
          {
            label: "NASA NSSDCA mission record",
            url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "ALSEP",
      },
      {
        id: "surveyor-3",
        title: "Surveyor 3",
        audio: "/audio/chapters/02-chapter-2.mp3",
        text: [
          "In April 1967, Surveyor 3 arrived on the Moon with an important mission: to study the lunar surface and help determine whether it could support future human landings.",
          "After bouncing twice during its descent, the spacecraft finally settled in Oceanus Procellarum. It began transmitting images and used its robotic sampler to investigate the lunar soil.",
          "Its work helped scientists understand the surface conditions that future Apollo astronauts would encounter.",
          "Two and a half years later, Apollo 12 astronauts landed nearby and visited the spacecraft. They recovered parts of Surveyor 3, including its camera, and brought them back to Earth.",
          "Surveyor 3 had completed its mission, but its story was not over. It became one of the few robotic spacecraft that humans would later revisit on another world.",
        ],
        model: "",
        image: "/images/artifacts/surveyor-3.jpg",
        caption: "Surveyor 3 visited during Apollo 12; archival photograph.",
        credit: "NASA",
        assetSource: "https://science.nasa.gov/mission/surveyor-3/",
        sources: [
          {
            label: "NASA mission record",
            url: "https://science.nasa.gov/mission/surveyor-3/",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "Surveyor 3",
      },
    ],
  },
  {
    id: "chapter-3",
    slug: "chapter-3",
    number: 3,
    label: "Chapter 3",
    title: "The Beginning of a New Era: Pathfinder",
    region: "Mars",
    kind: "chapter",
    audio: "",
    backgroundImage: "/images/chapter/mars-background.png",
    text: [],
    artifacts: [
      {
        id: "sojourner",
        title: "Sojourner — Mars Pathfinder",
        audio: "/audio/chapters/03-chapter-1.mp3",
        text: [
          "When Mars Pathfinder landed in Ares Vallis on July 4, 1997, it delivered something that had never operated on the Martian surface before: a small robotic rover named Sojourner.",
          "Designed as a technology demonstration, Sojourner explored nearby rocks and soil, sending images and scientific information back to Earth. Its original mission was expected to last only seven days, but it continued operating for 83 days.",
          "During that time, it demonstrated that a small mobile robot could successfully explore another planet.",
          "When the final data transmission from Pathfinder arrived on September 27, 1997, communication with the lander was lost. Although attempts to restore contact continued for several months, the mission was officially terminated on March 10, 1998.",
          "Sojourner remained on Mars, marking the beginning of a new chapter in robotic exploration.",
        ],
        model: "",
        image: "/images/artifacts/sojourner.jpg",
        caption:
          "PIA00621 color mosaic from Pathfinder imagery; not a single exposure.",
        credit: "NASA/JPL",
        assetSource: "https://science.nasa.gov/mission/mars-pathfinder/",
        sources: [
          {
            label: "NASA mission record",
            url: "https://science.nasa.gov/mission/mars-pathfinder/",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "Sojourner",
      },
    ],
  },
  {
    id: "chapter-4",
    slug: "chapter-4",
    number: 4,
    label: "Chapter 4",
    title: "The First Martian Laboratories: Viking Missions",
    region: "Mars",
    kind: "chapter",
    audio: "",
    backgroundImage: "/images/chapter/mars-background.png",
    text: [],
    artifacts: [
      {
        id: "viking-1",
        title: "Viking 1 — Lander",
        audio: "",
        text: [
          "On July 20, 1976, Viking 1 touched down on Chryse Planitia, becoming the first NASA spacecraft to successfully operate on the surface of Mars.",
          "Its mission was to investigate the planet's atmosphere, soil, and possible signs of life. Its cameras returned the first images from its landing site, while its scientific instruments conducted experiments on the Martian environment.",
          "Viking 1 continued operating for more than six years, far beyond its original planned mission.",
          "Its final communication came on November 13, 1982, after a faulty command interrupted its operations.",
          "The lander never left the place where it first touched down. It remains there as one of the earliest witnesses to humanity's exploration of the Red Planet.",
        ],
        model: "/models/viking-lander.glb",
        image: "",
        caption: "Shared Viking lander model; mission facts describe Viking 1.",
        credit: "NASA/Michael D. Carbajal",
        assetSource: "https://science.nasa.gov/3d-resources/viking-lander/",
        sources: [
          {
            label: "NASA mission record",
            url: "https://science.nasa.gov/mission/viking-1/",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "Viking 1",
      },
      {
        id: "viking-2",
        title: "Viking 2 — Lander",
        audio: "",
        text: [
          "Following the success of Viking 1, its twin spacecraft, Viking 2, arrived at Utopia Planitia on September 3, 1976.",
          "Like its predecessor, Viking 2 was designed to investigate the Martian environment and search for possible signs of life. It photographed the surrounding landscape, monitored local weather conditions, and carried out experiments on the soil.",
          "Its experiments revealed important information about the planet's chemistry, although they did not provide clear evidence of living organisms.",
          "After more than three and a half years of operation, Viking 2 sent its final communication on April 11, 1980.",
          "Its work had ended, but together with Viking 1, it had established a new foundation for studying Mars directly from its surface.",
        ],
        model: "/models/viking-lander.glb",
        image: "",
        caption: "Shared Viking lander model; mission facts describe Viking 2.",
        credit: "NASA/Michael D. Carbajal",
        assetSource: "https://science.nasa.gov/3d-resources/viking-lander/",
        sources: [
          {
            label: "NASA mission record",
            url: "https://science.nasa.gov/mission/viking-2/",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "Viking 2",
      },
    ],
  },
  {
    id: "chapter-5",
    slug: "chapter-5",
    number: 5,
    label: "Chapter 5",
    title: "Beyond Expectations: Spirit and Opportunity",
    region: "Mars",
    kind: "chapter",
    audio: "",
    backgroundImage: "/images/chapter/mars-background.png",
    text: [],
    artifacts: [
      {
        id: "spirit",
        title: "Spirit — Mars Exploration Rover",
        audio: "",
        text: [
          "Spirit arrived at Gusev Crater in January 2004 with a mission to investigate the geological history of Mars and search for evidence of ancient water.",
          "What began as a planned 90-day mission became a journey lasting more than six years. Spirit travelled approximately 7.73 kilometres, examining rocks and soil that revealed evidence of a much wetter Martian past.",
          "In 2009, the rover became trapped in soft soil and could no longer continue its planned journey. Its last communication with Earth came on March 22, 2010.",
          "After months of unsuccessful attempts to re-establish contact, NASA officially ended recovery efforts on May 25, 2011.",
          "Spirit could no longer explore, but its discoveries had already changed what scientists knew about the history of Mars.",
        ],
        model: "/models/spirit-opportunity.glb",
        image: "",
        caption:
          "Shared Mars Exploration Rover model; mission facts describe Spirit.",
        credit: "NASA/JPL-Caltech",
        assetSource:
          "https://science.nasa.gov/resource/spirit-and-opportunity-rover-3d-model/",
        sources: [
          {
            label: "NASA mission record",
            url: "https://science.nasa.gov/mission/mer-spirit/",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "Spirit",
      },
      {
        id: "opportunity",
        title: "Opportunity — Mars Exploration Rover",
        audio: "",
        text: [
          "Opportunity landed on the opposite side of Mars from its twin, Spirit, in January 2004. Its destination was Meridiani Planum, a region selected because its minerals could reveal clues about the planet's watery past.",
          "Originally designed for a 90-Martian-day mission, Opportunity continued exploring for nearly 15 years.",
          "It travelled more than 45 kilometres, studying rocks, craters, and minerals that provided evidence of ancient water on Mars.",
          "In 2018, a planet-wide dust storm covered its location and reduced the sunlight reaching its solar panels. Its final communication was received on June 10, 2018.",
          "NASA officially declared the mission over on February 13, 2019.",
          "Opportunity's journey lasted far longer than anyone had expected. Its tracks remain a reminder of how far a small robotic explorer can go.",
        ],
        model: "/models/spirit-opportunity.glb",
        image: "",
        caption:
          "Shared Mars Exploration Rover model; mission facts describe Opportunity.",
        credit: "NASA/JPL-Caltech",
        assetSource:
          "https://science.nasa.gov/resource/spirit-and-opportunity-rover-3d-model/",
        sources: [
          {
            label: "NASA mission record",
            url: "https://science.nasa.gov/mission/mer-opportunity/",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "Opportunity",
      },
    ],
  },
  {
    id: "chapter-6",
    slug: "chapter-6",
    number: 6,
    label: "Chapter 6",
    title: "Searching Beneath the Surface: Phoenix and InSight",
    region: "Mars",
    kind: "chapter",
    audio: "",
    backgroundImage: "/images/chapter/mars-background.png",
    text: [],
    artifacts: [
      {
        id: "phoenix",
        title: "Phoenix — Mars Lander",
        audio: "",
        text: [
          "On May 25, 2008, Phoenix landed in Vastitas Borealis, the northern plains of Mars, with a mission to investigate the planet's icy environment.",
          "Unlike a rover, Phoenix remained in one location. Its robotic arm dug into the soil, collecting samples that could be examined by its onboard instruments.",
          "One of its most important discoveries was the confirmation of water ice beneath the Martian surface.",
          "But Phoenix depended on sunlight for power. As the Martian winter approached, daylight decreased and temperatures dropped, making it increasingly difficult for the lander to continue operating.",
          "Its final communication was received on November 2, 2008.",
          "Phoenix may have been stationary, but its discoveries revealed an important part of Mars that future explorers would continue investigating.",
        ],
        model: "",
        image: "/images/artifacts/phoenix.jpg",
        caption: "Phoenix in a cleanroom on Earth, not on Mars.",
        credit: "NASA/JPL",
        assetSource: "https://science.nasa.gov/mission/mars-phoenix/",
        sources: [
          {
            label: "NASA mission record",
            url: "https://science.nasa.gov/mission/mars-phoenix/",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "Phoenix",
      },
      {
        id: "insight",
        title: "InSight — Mars Lander",
        audio: "",
        text: [
          "Not every mission to Mars was designed to explore its surface. Some were sent to understand what lies beneath it.",
          "InSight landed on Elysium Planitia in November 2018 with a unique mission: to study the internal structure of Mars.",
          "Its seismometer detected marsquakes, allowing scientists to investigate the planet's interior and learn more about its crust, mantle, and core.",
          "For more than four years, InSight collected valuable information about the hidden activity of the Red Planet.",
          "But dust gradually accumulated on its solar panels, reducing the energy available to operate its instruments and communicate with Earth.",
          "NASA received InSight's final communication on December 15, 2022.",
          "InSight never travelled across the Martian landscape, but it revealed a world that could not be seen from the surface.",
        ],
        model: "/models/insight.glb",
        image: "",
        caption: "Mission-era 3D representation.",
        credit:
          "NASA Visualization Technology Applications and Development (VTAD)",
        assetSource: "https://science.nasa.gov/resource/insight-3d-model/",
        sources: [
          {
            label: "NASA mission record",
            url: "https://science.nasa.gov/mission/insight/",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "InSight",
      },
    ],
  },
  {
    id: "chapter-7",
    slug: "chapter-7",
    number: 7,
    label: "Chapter 7",
    title: "A New Perspective: Ingenuity",
    region: "Mars",
    kind: "chapter",
    audio: "",
    backgroundImage: "/images/chapter/mars-background.png",
    text: [],
    artifacts: [
      {
        id: "ingenuity",
        title: "Ingenuity — Mars Helicopter",
        audio: "",
        text: [
          "When Ingenuity arrived on Mars beneath the Perseverance rover, it carried an ambitious experiment: could an aircraft fly in the thin atmosphere of another planet?",
          "On April 19, 2021, Ingenuity made history by completing the first powered, controlled flight on another planet.",
          "Originally designed for just five test flights, the small helicopter went on to complete 72 flights over nearly three years.",
          "Its role eventually expanded beyond testing flight technology. It became an aerial scout, helping scientists and rover planners observe Martian terrain from above.",
          "On January 18, 2024, Ingenuity completed its 72nd and final flight. Damage to its rotor blades during landing meant it could no longer fly. NASA announced the end of its flight mission on January 25, 2024.",
          "It remains on Mars, at a location NASA named Valinor Hills.",
          "A small experimental aircraft had opened an entirely new way of exploring other worlds.",
        ],
        model: "/models/ingenuity.glb",
        image: "",
        caption:
          "Mission-era helicopter model with intact blades; not a depiction of its condition after its final flight.",
        credit: "NASA/Brian E. Kumanchik",
        assetSource:
          "https://science.nasa.gov/3d-resources/ingenuity-mars-helicopter/",
        sources: [
          {
            label: "NASA mission record",
            url: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "Ingenuity",
      },
    ],
  },
  {
    id: "chapter-8",
    slug: "chapter-8",
    number: 8,
    label: "Chapter 8",
    title: "Worlds Beyond: Dawn and NEAR Shoemaker",
    region: "Beyond the Moon and Mars",
    kind: "chapter",
    audio: "",
    backgroundImage: "",
    text: [],
    artifacts: [
      {
        id: "dawn",
        title: "Dawn — Orbiting Vesta and Ceres",
        audio: "",
        text: [
          "Dawn was never sent to land on a planet. Instead, it travelled into the asteroid belt to explore two of its largest worlds: Vesta and the dwarf planet Ceres.",
          "Using its advanced ion propulsion system, Dawn became the first spacecraft to orbit two different extraterrestrial bodies during the same mission.",
          "It spent months studying Vesta before continuing its journey to Ceres, where it investigated the dwarf planet's surface, composition, and mysterious bright spots.",
          "Dawn missed scheduled communications on October 31 and November 1, 2018, after exhausting the hydrazine fuel needed to control its orientation. NASA officially announced the end of the mission on November 1, 2018. Communication eventually ended, but the spacecraft did not crash into Ceres.",
          "It remains in orbit around the dwarf planet, silently accompanying the world it spent years exploring.",
        ],
        model: "/models/dawn.glb",
        image: "",
        caption: "Mission-era 3D representation.",
        credit: "NASA/Brian E. Kumanchik",
        assetSource: "https://science.nasa.gov/3d-resources/dawn/",
        sources: [
          {
            label: "NASA mission record",
            url: "https://science.nasa.gov/mission/dawn/",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 3.141592653589793, 0],
        },
        displayTitle: "Dawn",
      },
      {
        id: "near-shoemaker",
        title: "NEAR Shoemaker — Asteroid Eros",
        audio: "",
        text: [
          "NEAR Shoemaker began its journey in 1996 with one important destination: the asteroid Eros.",
          "After reaching Eros in 2000, the spacecraft spent months studying its surface, mapping its craters, and collecting information about its composition.",
          "Then, on February 12, 2001, mission controllers guided it through a carefully controlled descent toward the asteroid.",
          "Although NEAR Shoemaker had not originally been designed to land, it successfully touched down on the surface of Eros, becoming the first spacecraft to land on an asteroid.",
          "Even more remarkably, it survived the landing and continued transmitting scientific data for approximately two weeks.",
          "Its final communication arrived on February 28, 2001.",
          "NEAR Shoemaker had reached its destination and achieved something no spacecraft had done before. Its final resting place became part of the very world it was sent to study.",
        ],
        model: "/models/near-shoemaker.glb",
        image: "",
        caption: "Mission-era 3D representation.",
        credit: "NASA (no individual author listed)",
        assetSource: "https://science.nasa.gov/3d-resources/near-shoemaker/",
        sources: [
          {
            label: "NASA mission record",
            url: "https://science.nasa.gov/mission/near-shoemaker/",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "NEAR Shoemaker",
      },
    ],
  },
  {
    id: "chapter-9",
    slug: "chapter-9",
    number: 9,
    label: "Chapter 9",
    title: "Messages Into the Unknown: Pioneer Missions",
    region: "Beyond the Moon and Mars",
    kind: "chapter",
    audio: "",
    backgroundImage: "",
    text: [],
    artifacts: [
      {
        id: "pioneer-10",
        title: "Pioneer 10 — Deep Space",
        audio: "",
        text: [
          "Launched in 1972, Pioneer 10 began a journey that would take it farther than any previous spacecraft had travelled.",
          "It became the first spacecraft to pass through the asteroid belt and the first to make a closeup exploration of Jupiter.",
          "But its journey did not end there. Pioneer 10 continued beyond the outer planets, following a trajectory that would eventually carry it out of the solar system.",
          "On board was a special metal plaque designed to communicate basic information about humanity and Earth's location to anyone who might encounter it.",
          "Its final signal reached Earth on January 23, 2003, from approximately 12.23 billion kilometres away.",
          "Pioneer 10 could no longer communicate with us, but it continued travelling outward, carrying a message from Earth into the unknown.",
        ],
        model: "/models/pioneer-10.glb",
        image: "",
        caption: "Mission-era 3D representation.",
        credit: "NASA/JPL/Eyes on the Solar System",
        assetSource: "https://science.nasa.gov/3d-resources/pioneer/",
        sources: [
          {
            label: "NASA mission record",
            url: "https://science.nasa.gov/mission/pioneer-10/",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "Pioneer 10",
      },
      {
        id: "pioneer-11",
        title: "Pioneer 11 — Deep Space",
        audio: "",
        text: [
          "Following the path of its sister spacecraft, Pioneer 11 continued humanity's journey into the outer solar system.",
          "Launched in 1973, it first travelled to Jupiter before continuing toward Saturn. In September 1979, it became the first spacecraft to fly past Saturn, returning valuable observations of the planet and its rings.",
          "Like Pioneer 10, it carried a metal plaque showing the origin of the spacecraft and information about the humans who created it.",
          "NASA made its last contact with Pioneer 11 on September 30, 1995. A final set of engineering data was received on November 24, 1995. Since then, Pioneer 11 has continued along its trajectory toward interstellar space.",
          "Unlike the landers left on the Moon and Mars, Pioneer 11 has no resting place on another world.",
          "It is still travelling, silently moving farther away from the planet where its journey began.",
        ],
        model: "/models/pioneer-10.glb",
        image: "",
        caption: "Pioneer 10 model used as a visual proxy for Pioneer 11.",
        credit: "NASA/JPL/Eyes on the Solar System",
        assetSource: "https://science.nasa.gov/3d-resources/pioneer/",
        sources: [
          {
            label: "NASA mission record",
            url: "https://science.nasa.gov/mission/pioneer-11/",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "Pioneer 11",
      },
    ],
  },
  {
    id: "chapter-10",
    slug: "chapter-10",
    number: 10,
    label: "Chapter 10",
    title: "Beyond the Final Signal: Kepler",
    region: "Beyond the Moon and Mars",
    kind: "chapter",
    audio: "",
    backgroundImage: "",
    text: [],
    artifacts: [
      {
        id: "kepler",
        title: "Kepler — Space Telescope",
        audio: "",
        text: [
          "Kepler did not explore the surface of another planet. Instead, it spent its mission searching for planets beyond our solar system.",
          "Launched in 2009, the space telescope observed distant stars, looking for tiny changes in their brightness. These changes could reveal planets passing in front of their stars.",
          "Over nine years of observations, Kepler transformed our understanding of the universe and left behind a legacy of more than 2,600 planet discoveries beyond our solar system.",
          "On October 30, 2018, after running out of the fuel needed for further scientific operations, NASA officially retired the spacecraft in its safe orbit away from Earth.",
          "Kepler no longer watches the stars, but the discoveries it left behind continue to shape humanity's search for other worlds.",
        ],
        model: "/models/kepler.glb",
        image: "",
        caption: "Mission-era 3D representation.",
        credit: "NASA/Brian E. Kumanchik; NASA/Christian A. Lopez",
        assetSource: "https://science.nasa.gov/3d-resources/kepler-a/",
        sources: [
          {
            label: "NASA mission record",
            url: "https://science.nasa.gov/mission/kepler/",
            claims:
              "Mission purpose, chronology, discoveries, and final communication described in this narrative.",
          },
        ],
        camera: {
          position: [4, 2.4, 5],
          rotation: [0, 0, 0],
        },
        displayTitle: "Kepler",
      },
    ],
  },
  {
    id: "ending",
    slug: "ending",
    number: null,
    label: "Ending",
    title: "Abandoned, but not forgotten",
    region: "The legacy remains",
    kind: "ending",
    audio: "",
    backgroundImage: "",
    text: [
      "Some journeys end on distant surfaces. Others continue silently through space.",
      "Across the Moon, Mars, and beyond, these machines represent more than abandoned technology. They represent the questions humanity dared to ask and the extraordinary distances we travelled to find answers.",
      "Their signals may have faded, their instruments may have fallen silent, and their missions may have ended.",
      "But every discovery they made remains part of our story.",
      "Because exploration does not end when a machine stops working.",
      "It lives on in everything it teaches us.",
      "ABANDONED, BUT NOT FORGOTTEN",
    ],
    artifacts: [],
  },
];
