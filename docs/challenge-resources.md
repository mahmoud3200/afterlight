# Challenge resource coverage

Verified against the [official resources tab](https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/?tab=resources) on 2026-11-13. The page's server response contains 14 resource links, preserved verbatim in [challenge-resources.json](challenge-resources.json). Recheck before submission because the challenge says resources may be added.

The team wants to use every listed resource. **The supplied narrative is now implemented in the chapter registry. The original research plan below is retained; current runtime mappings and verification limits are recorded at the end of this document.** For each row, add the eventual chapter ID, the particular claim or media derived from the source, and its location in the experience. Cite the specific mission record used, not only an archive homepage.

| Resource as listed | Official link | Intended substantive use |
| --- | --- | --- |
| NSSDCA | https://nssdc.gsfc.nasa.gov/ | Cross-check spacecraft identities, chronology, instruments, and final status throughout. |
| Apollo Lunar Modules | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C | Explain the landing/ascent sequence and why the descent stage remained. |
| Lunar Roving Vehicles | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C | Connect surface mobility to expanded exploration and sample collection. |
| ALSEP Scientific Packages | https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C | Explain experiments that continued working after the astronauts departed. |
| Surveyor Landers | https://science.nasa.gov/mission/surveyor-3/ | Connect robotic landing reconnaissance to Apollo; cover Surveyor 3's later visit. |
| Sojourner Rover | https://science.nasa.gov/mission/mars-pathfinder/ | Show the small rover's role in Pathfinder and mobile Mars science. |
| Spirit & Opportunity | https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/ | Contrast the twins' separate journeys, discoveries, and endings. |
| Viking 1 & 2 Landers | https://science.nasa.gov/mission/viking-1/ | Explain early surface laboratories; supplement with Viking 2 facts. |
| Phoenix & InSight Landers | https://science.nasa.gov/mission/insight/ | Distinguish ice/soil research from interior/seismic science; add Phoenix's own mission source. |
| Dawn Spacecraft | https://science.nasa.gov/mission/dawn/ | Beyond Moon/Mars: connect exploration of Vesta and Ceres to the spacecraft's final orbit. |
| NEAR Shoemaker | https://science.nasa.gov/mission/near-shoemaker/ | Beyond Moon/Mars: explain asteroid investigation and the landing on Eros. |
| Pioneer 10 & 11 | https://science.nasa.gov/mission/pioneer-10/ | Beyond Moon/Mars: contrast outer-planet encounters and loss of contact; add Pioneer 11's source. |
| Ingenuity Helicopter | https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/ | Connect the flight demonstration to its legacy; distinguish the end of flight from other operations. |
| Kepler Space Telescope | https://science.nasa.gov/mission/kepler/ | Beyond Moon/Mars: explain exoplanet discovery and the observatory's retirement. |

## Editorial cautions

The challenge groups several links together and places deep-space examples under a Mars heading. Preserve the original links for traceability, but organize the experience by the actual destinations. The InSight link does not replace a Phoenix source, nor does Viking 1/Pioneer 10 substantiate every statement about their twins. Supplement with [Phoenix](https://science.nasa.gov/mission/mars-phoenix/), [Viking 2](https://science.nasa.gov/mission/viking-2/), and [Pioneer 11](https://science.nasa.gov/mission/pioneer-11/) records during script research.

Avoid treating simplified challenge descriptions as precision engineering references. Verify which experiment package and mission are shown, distinguish ALSEP from other Apollo surface experiments, and use time-qualified status statements. Assets in this repository are preparation material, not evidence that a source has been incorporated into a finished chapter.

## Submission preparation

Keep an accurate AI-assistance disclosure for code, data, narration, and media used in the final submission. Review current [organizer guidance](https://github.com/nasa/spaceapps/discussions/1849) and the event's participant rules before submission. The organizer clarification says at least one listed NASA source is required for Global Awards eligibility; the all-resources target above is the team's stronger requirement.


## Runtime narrative coverage — 2026-11-13

`src/constants/chapters.js` contains the supplied opening, all 17 object narratives, and closing. Each object carries NASA mission citations and local asset credits. The text is rendered by `ChapterSection`, with object selectors within grouped chapters. This is a content implementation record, not a claim that every sentence has completed an independent historical audit.

| Resources | Runtime chapter | Substantive narrative use |
| --- | --- | --- |
| NSSDCA; Apollo Lunar Modules; Lunar Roving Vehicles | chapter-1 | Landing/ascent stages, descent-stage legacy, surface mobility and sampling |
| NSSDCA; ALSEP Scientific Packages; Surveyor Landers | chapter-2 | Continued experiments after crew departure; robotic reconnaissance and Apollo 12 retrieval |
| Sojourner Rover | chapter-3 | Pathfinder mobility demonstration and communication timeline |
| Viking 1 & 2 Landers | chapter-4 | Surface laboratories, soil science, separate mission endings |
| Spirit & Opportunity | chapter-5 | Water evidence, separate traverses and loss-of-contact timelines |
| Phoenix & InSight Landers | chapter-6 | Subsurface ice versus seismic interior science |
| Ingenuity Helicopter | chapter-7 | Flight demonstration, scouting, and end of flight operations |
| Dawn; NEAR Shoemaker | chapter-8 | Vesta/Ceres exploration versus landing on Eros |
| Pioneer 10 & 11 | chapter-9 | Jupiter/Saturn encounters, plaques, separate final contacts |
| Kepler Space Telescope | chapter-10 | Transit observations, planet discoveries, retirement |

Chapter 8–10 explicitly say “Beyond the Moon and Mars.” They use no planetary background pending destination-appropriate artwork. Introduction and ending have no scene imagery or models.

Editorial cleanup removed copied search-result labels, softened unsupported permanent/exact-position wording, and distinguished Ingenuity's flight ending from other operations. Dawn's fuel exhaustion is described through its missed communication dates. Spirit/Opportunity links use the mission-specific NASA records. NASA mission links were checked where accessible; NSSDCA returned a tool content-type error. Complete claim-by-claim verification, particularly the supplied Pioneer 11 contact wording, remains an editorial review item before public release.
