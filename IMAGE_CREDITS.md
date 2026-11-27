# Image Credits

See `IMAGE_POLICY.md` for the selection policy (real licensed image → contextual licensed image → AI-generated illustration fallback → temporary placeholder) that governs how each image below was chosen. This file is the per-image record for everything actually in use.

All homepage thumbnail photographs currently in use are real photographs sourced from Wikimedia Commons, used under their stated free-reuse licenses. Each entry below was verified directly on its Wikimedia Commons file page before download. None of these are publisher news photographs, AI-generated images, or Unsplash+/Getty content. (Future editions may include a clearly-labelled AI-generated illustration per `IMAGE_POLICY.md`; when that happens, its record will be added here in the AI-generated format that policy specifies.)

## Original six (development placeholders, currently unused by any live story)

---

### 1. `cargo-port.jpg`
- **Subject:** Cargo ship being loaded with shipping containers, Port of Rotterdam
- **Photographer / creator:** Alf van Beem
- **Original file page:** https://commons.wikimedia.org/wiki/File:COSCO_Shipping_Danube_(ship,_2016)_IMO_9731913,_Amazonehaven,_Port_of_Rotterdam_pic5.JPG
- **License:** Public Domain (self-dedicated by the copyright holder)
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "Alf van Beem".

### 2. `semiconductor-chip.jpg`
- **Subject:** Bottom view of an Intel Pentium III 1100 (RB80526PY005256) CPU
- **Photographer / creator:** D-Kuru
- **Original file page:** https://commons.wikimedia.org/wiki/File:Intel_Pentium_III_1100_(RB80526PY005256)-bottom_oblique_PNr%C2%B00356.jpg
- **License:** CC BY-SA 3.0 AT (Creative Commons Attribution-ShareAlike 3.0 Austria)
- **Attribution wording required:** "D-Kuru / Wikimedia Commons / CC BY-SA 3.0 AT"

### 3. `coral-reef-underwater.jpg`
- **Subject:** Coral outcrop on Flynn Reef, part of the Great Barrier Reef, Queensland, Australia
- **Photographer / creator:** Toby Hudson
- **Original file page:** https://commons.wikimedia.org/wiki/File:Coral_Outcrop_Flynn_Reef.jpg
- **License:** CC BY-SA 3.0 (Creative Commons Attribution-ShareAlike 3.0)
- **Attribution wording required:** "Toby Hudson / Wikimedia Commons / CC BY-SA 3.0"

### 4. `student-sleeping.jpg`
- **Subject:** A student asleep at a classroom desk — "Sleeping when studying," Nakhon Sawan, Thailand
- **Photographer / creator:** Love Krittaya
- **Original file page:** https://commons.wikimedia.org/wiki/File:Sleeping_students.jpg
- **License:** Public Domain (self-dedicated by the copyright holder)
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "Love Krittaya".

### 5. `financial-district.jpg`
- **Subject:** View of the Manhattan Financial District skyline
- **Photographer / creator:** Josh B
- **Original file page:** https://commons.wikimedia.org/wiki/File:Financial_District_Skyline.jpg
- **License:** CC BY-SA 2.0 (Creative Commons Attribution-ShareAlike 2.0 Generic)
- **Attribution wording required:** "Josh B / Wikimedia Commons / CC BY-SA 2.0"

### 6. `urban-bike-street.jpg`
- **Subject:** Pedestrians and cyclists filling Dizengoff Street in Tel Aviv, Israel during a car-free day
- **Photographer / creator:** LeRenartQuiPense
- **Original file page:** https://commons.wikimedia.org/wiki/File:Car_free_day_Tel_Aviv_Israel_Yom_Kippur.jpg
- **License:** CC BY 4.0 (Creative Commons Attribution 4.0)
- **Attribution wording required:** "LeRenartQuiPense / Wikimedia Commons / CC BY 4.0"

---

**Note:** Files were downloaded at a reduced width (1200px, where the original was larger) directly from Wikimedia's `Special:FilePath` redirect, which serves the same media hosted at `upload.wikimedia.org`. If any of these images are used beyond local development (e.g., in a public deployment), the CC BY-SA entries require attribution to remain visible and any modified redistribution to remain under a compatible ShareAlike license; the CC BY entry requires attribution only; the two Public Domain entries require no attribution.

## Current six real stories (as of the 2026-08-31 – 2026-09-01 edition)

Each image was chosen for topical relevance to its story and license-verified via the Wikimedia Commons API (`imageinfo`/`extmetadata`) before download. None depict the exact 2026 event unless stated; several are older or generic contextual photographs of the same real subject (e.g. an Afghan refugee camp, a US Navy presence in the Strait of Hormuz) — this is reflected honestly in each story's `imageAlt` text in `mock-news-stories.ts`. One (the Nepal-Tibet satellite image) does depict the actual 2026 event.

---

**Note on images 7-12:** Downloaded via Wikimedia's `Special:FilePath` redirect at reduced width (1200px) where possible; `congo-ebola-awareness-monusco.jpg` and `nepal-tibet-flood-satellite.jpg` are stored at their original resolution because the reduced-width thumbnail redirect returned an error for those two files at download time — Next.js's built-in image optimizer resizes them for display regardless, so this has no functional effect, only a larger source file in the repo. All CC BY-SA entries require attribution and ShareAlike redistribution; the CC BY entry requires attribution only; the Public Domain entry requires none (credited here as a courtesy).

## Second edition (2026-09-04, August 31 – September 2, 2026)

Each image was chosen for topical relevance per `IMAGE_POLICY.md`'s priority order (real event image → real contextual image → AI-generated illustration → placeholder), license-verified via the Wikimedia Commons API (`imageinfo`/`extmetadata`) before download. None depict the exact 2026 event described in their story — no freely reusable actual-event photograph existed for any of these six current-week stories at sourcing time — so all six are `licensed-contextual`. This is reflected honestly in each story's `imageAlt` text in `src/data/editions/2026-09-04.ts`.

---

**Note on images 13-18:** Downloaded via Wikimedia's `Special:FilePath` redirect at reduced width (1200px). Two (13, 16) are Public Domain U.S. federal government works requiring no attribution (credited here as a courtesy); two (14, 17) are CC BY 2.0, requiring attribution only; one (15) is CC BY-SA 4.0, requiring attribution and ShareAlike redistribution; one (18) is under the Free Art License, requiring attribution as specified on its file page.

## August 29, 2026 – September 2, 2026 edition (2026-09-03)

---

## September 9, 2026 – September 10, 2026 edition (2026-09-11)

---

## September 11, 2026 – September 13, 2026 edition (2026-09-18)

---

## September 23, 2026 – September 24, 2026 edition (2026-09-25)

---

## September 29, 2026 – October 1, 2026 edition (2026-10-02)

### 43. `story-2026-10-01-supreme-court.jpg`
- **Story:** Supreme court to hear case challenging Trump immigration detention policy | US immigration (The Guardian)
- **Subject:** Panorama of United States Supreme Court Building at Dusk
- **Photographer / creator:** Joe Ravi
- **Original file page:** https://commons.wikimedia.org/wiki/File:Panorama_of_United_States_Supreme_Court_Building_at_Dusk.jpg
- **License:** Creative Commons Attribution-Share Alike 3.0
- **Attribution wording required:** "Joe Ravi / Wikimedia Commons / CC BY-SA 3.0"

### 44. `story-2026-10-01-gas-vehicles.png`
- **Story:** Gas vehicles fall under 50% of global new-auto sales for first time (Nikkei Asia)
- **Subject:** Electric car sales share in the Stated Policies Scenario, 2030
- **Photographer / creator:** International Energy Agency
- **Original file page:** https://commons.wikimedia.org/wiki/File:Electric_car_sales_share_in_the_Stated_Policies_Scenario,_2030.png
- **License:** Creative Commons Attribution 4.0
- **Attribution wording required:** "International Energy Agency / Wikimedia Commons / CC BY 4.0"

### 45. `story-2026-09-30-japan-court.jpg`
- **Story:** Japan court rules voice is protected as publicity right in AI cloning case (Nikkei Asia)
- **Subject:** 2023 Dyktafon Olympus VN-541PC
- **Photographer / creator:** Jacek Halicki
- **Original file page:** https://commons.wikimedia.org/wiki/File:2023_Dyktafon_Olympus_VN-541PC.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Jacek Halicki / Wikimedia Commons / CC BY-SA 4.0"

### 46. `story-2026-09-30-taiwan-taps.png`
- **Story:** Taiwan taps US tech for sea drones to fend off China vast maritime fleet (Nikkei Asia)
- **Subject:** Task force 59 USV
- **Photographer / creator:** Photo by Specialist Natianna Strachen
- **Original file page:** https://commons.wikimedia.org/wiki/File:Task_force_59_USV.png
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "Photo by Specialist Natianna Strachen".

### 47. `story-2026-09-29-malaysia-begins.jpg`
- **Story:** Malaysia begins sending home Myanmar refugees despite safety concerns (Nikkei Asia)
- **Subject:** Rohingya Refugee Camp 26
- **Photographer / creator:** Rocky Masum
- **Original file page:** https://commons.wikimedia.org/wiki/File:Rohingya_Refugee_Camp_26.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Rocky Masum / Wikimedia Commons / CC BY-SA 4.0"

### 48. `story-2026-10-01-swiss-glaciers.jpg`
- **Story:** Swiss glaciers lose more than 5% of ice after record heatwave (Channel News Asia)
- **Subject:** Aletschgletscher-Eggishorn
- **Photographer / creator:** Tobias Alt, Tobi 87
- **Original file page:** https://commons.wikimedia.org/wiki/File:Aletschgletscher-Eggishorn.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Tobias Alt, Tobi 87 / Wikimedia Commons / CC BY-SA 4.0"

---

## October 2, 2026 edition (2026-10-09)

### 49. `story-2026-10-02-us-sends.jpg`
- **Story:** US sends third aircraft carrier to Middle East amid stalemate in Iran war (The Guardian)
- **Subject:** An F-A-18C Hornet launches from the flight deck of the conventionally powered aircraft carrier
- **Photographer / creator:** U.S. Navy photo by Photographer's Mate 3rd Class Jonathan Chandler
- **Original file page:** https://commons.wikimedia.org/wiki/File:An_F-A-18C_Hornet_launches_from_the_flight_deck_of_the_conventionally_powered_aircraft_carrier.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "U.S. Navy photo by Photographer's Mate 3rd Class Jonathan Chandler".

### 50. `story-2026-10-02-how-the.jpg`
- **Story:** How the fighting in Ethiopia spread beyond Tigray, in maps and charts (Al Jazeera English)
- **Subject:** Administrative map of Tigray
- **Photographer / creator:** Sofie Annys
- **Original file page:** https://commons.wikimedia.org/wiki/File:Administrative_map_of_Tigray.jpg
- **License:** Creative Commons Attribution 4.0
- **Attribution wording required:** "Sofie Annys / Wikimedia Commons / CC BY 4.0"

### 51. `story-2026-10-02-miami-judge.jpg`
- **Story:** Miami judge rules federal noncitizen voting law violates US Constitution (Al Jazeera English)
- **Subject:** Courtroom, Hannibal Federal Building and U.S. Courthouse (2013)
- **Photographer / creator:** United States District Court for the Eastern District of Missouri
- **Original file page:** https://commons.wikimedia.org/wiki/File:Courtroom,_Hannibal_Federal_Building_and_U.S._Courthouse_(2013).jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "United States District Court for the Eastern District of Missouri".

### 52. `story-2026-10-02-greece-pushes.jpg`
- **Story:** Greece pushes EU to suspend asylum during mass migration surges (Al Jazeera English)
- **Subject:** 20151029 5boats with refugees arriving to Skala Sykamias Lesvos Greece
- **Photographer / creator:** Ggia
- **Original file page:** https://commons.wikimedia.org/wiki/File:20151029_5boats_with_refugees_arriving_to_Skala_Sykamias_Lesvos_Greece.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Ggia / Wikimedia Commons / CC BY-SA 4.0"

### 53. `story-2026-10-02-tokyo-core.jpg`
- **Story:** Tokyo core inflation rate jumps, bolsters case for more BOJ hikes (Nikkei Asia)
- **Subject:** Bank of Japan headquarters in Tokyo, Japan
- **Photographer / creator:** Unknown
- **Original file page:** https://commons.wikimedia.org/wiki/File:Bank_of_Japan_headquarters_in_Tokyo,_Japan.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "Unknown".

### 54. `story-2026-10-02-el-nino.jpg`
- **Story:** El Nino dries Kalimantan rivers, hits coal shipments in Indonesia (Nikkei Asia)
- **Subject:** Banks of Martapura River, South Kalimantan, 2018-07-28 01
- **Photographer / creator:** Crisco 1492
- **Original file page:** https://commons.wikimedia.org/wiki/File:Banks_of_Martapura_River,_South_Kalimantan,_2018-07-28_01.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Crisco 1492 / Wikimedia Commons / CC BY-SA 4.0"

---

## October 15, 2026 edition (2026-10-16)

### 55. `story-2026-10-15-white-house.jpg`
- **Story:** White House prepares plans to use weapon dubbed mother of all bombs on Iran, sources say (CBS News)
- **Subject:** MOAB bomb
- **Photographer / creator:** U.S. Department of Defense photograph
- **Original file page:** https://commons.wikimedia.org/wiki/File:MOAB_bomb.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "U.S. Department of Defense photograph".

### 56. `story-2026-10-15-eight-crew.jpg`
- **Story:** Eight crew missing after drone attack leaves tanker ablaze off Romania coast (BBC)
- **Subject:** Brand op tanker Diana bij Mobil Oil de brand, Bestanddeelnr 921-9354
- **Photographer / creator:** Ron Kroon / Anefo
- **Original file page:** https://commons.wikimedia.org/wiki/File:Brand_op_tanker_Diana_bij_Mobil_Oil_de_brand,_Bestanddeelnr_921-9354.jpg
- **License:** Creative Commons Zero, Public Domain Dedication
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "Ron Kroon / Anefo".

### 57. `story-2026-10-15-justice-department.jpg`
- **Story:** Justice Department sues California, claiming it mailing ballots to more than 20,000 noncitizens (CBS News)
- **Subject:** US Department of Justice building with road
- **Photographer / creator:** VOA
- **Original file page:** https://commons.wikimedia.org/wiki/File:US_Department_of_Justice_building_with_road.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "VOA".

### 58. `story-2026-10-15-ftc-issues.jpg`
- **Story:** FTC issues subpoenas to Anthropic and OpenAI over safety incidents (CBS News)
- **Type:** AI-generated editorial illustration (not a real photograph)
- **Generated:** 2026-10-15T23:43:15.462Z
- **Model:** gpt-image-1
- **Purpose:** Generated because no suitable licensed real/contextual photograph was available for: "FTC issues subpoenas to Anthropic and OpenAI over safety incidents". Standard contextual editorial imagery guidance applied for this category.
- **Alt text:** AI-generated editorial illustration for this Technology & AI story — not a photograph of the actual event.

### 59. `story-2026-10-15-emerging-market.jpg`
- **Story:** Emerging market job shortage a ticking time bomb: UN development chief (Nikkei Asia)
- **Subject:** Construction workers in Mexico
- **Photographer / creator:** Tomascastelazo
- **Original file page:** https://commons.wikimedia.org/wiki/File:Construction_workers_in_Mexico.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Tomascastelazo / Wikimedia Commons / CC BY-SA 4.0"

### 60. `story-2026-10-15-north-korea.jpg`
- **Story:** North Korea pact with Russia built to outlast Ukraine war (Nikkei Asia)
- **Subject:** 2011 Russian Embassy in DPRK
- **Photographer / creator:** Lazyhawk
- **Original file page:** https://commons.wikimedia.org/wiki/File:2011_Russian_Embassy_in_DPRK.jpg
- **License:** Creative Commons Attribution-Share Alike 3.0
- **Attribution wording required:** "Lazyhawk / Wikimedia Commons / CC BY-SA 3.0"

---

## October 21, 2026 – October 22, 2026 edition (2026-10-23)

### 61. `story-2026-10-22-supreme-court.jpg`
- **Story:** Supreme Court says New Hampshire student IDs can't be used to vote in November (NBC News)
- **Subject:** New Hampshire State House, Concord, NH (2004)
- **Photographer / creator:** Ken Lund from Reno, Nevada, USA
- **Original file page:** https://commons.wikimedia.org/wiki/File:New_Hampshire_State_House,_Concord,_NH_(2004).jpg
- **License:** Creative Commons Attribution-Share Alike 2.0
- **Attribution wording required:** "Ken Lund from Reno, Nevada, USA / Wikimedia Commons / CC BY-SA 2.0"

### 62. `story-2026-10-22-iran-says.jpg`
- **Story:** Iran says 7 oil tankers attacked in the Strait of Hormuz as fears grow of a return to war (NBC News)
- **Subject:** STS004-37-716 - Strait of Hormuz
- **Photographer / creator:** NASA
- **Original file page:** https://commons.wikimedia.org/wiki/File:STS004-37-716_-_Strait_of_Hormuz.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "NASA".

### 63. `story-2026-10-21-meta-ordered.jpg`
- **Story:** Meta ordered to pay $25 billion to New Mexico after jury finds company misled consumers about data privacy (NBC News)
- **Subject:** Meta Platforms Headquarters Menlo Park California
- **Photographer / creator:** LPS.1
- **Original file page:** https://commons.wikimedia.org/wiki/File:Meta_Platforms_Headquarters_Menlo_Park_California.jpg
- **License:** Creative Commons Zero, Public Domain Dedication
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "LPS.1".

### 64. `story-2026-10-22-nasdaq-dives.jpg`
- **Story:** Nasdaq dives more than 750 points as investors worry massive AI spending won't pay off (CBS News)
- **Subject:** Facebook on Nasdaq
- **Photographer / creator:** ProducerMatthew
- **Original file page:** https://commons.wikimedia.org/wiki/File:Facebook_on_Nasdaq.jpeg
- **License:** Creative Commons Attribution-Share Alike 3.0
- **Attribution wording required:** "ProducerMatthew / Wikimedia Commons / CC BY-SA 3.0"

### 65. `story-2026-10-22-96-of.jpg`
- **Story:** 96% of world coral reefs face critical risk of collapse (DW)
- **Subject:** Bleached Staghorn Coral
- **Photographer / creator:** Matt Kieffer
- **Original file page:** https://commons.wikimedia.org/wiki/File:Bleached_Staghorn_Coral.jpg
- **License:** Creative Commons Attribution-Share Alike 2.0
- **Attribution wording required:** "Matt Kieffer / Wikimedia Commons / CC BY-SA 2.0"

### 66. `story-2026-10-21-small-base.jpg`
- **Story:** Small base, long shadow: China's new military outpost in Laos (The Straits Times)
- **Subject:** 2021-12-03 China-Laos-Eisenbahn
- **Photographer / creator:** Embassy of Timor-Leste in Vientiane
- **Original file page:** https://commons.wikimedia.org/wiki/File:2021-12-03_China-Laos-Eisenbahn.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "Embassy of Timor-Leste in Vientiane".

---

## October 24, 2026 – October 27, 2026 edition (2026-10-30)

### 67. `story-2026-10-27-chinese-markets.jpg`
- **Story:** Chinese markets lose trillions as race for AI supremacy with US takes its toll (The Guardian)
- **Subject:** Shanghai Stock Exchange 2
- **Photographer / creator:** 钉钉
- **Original file page:** https://commons.wikimedia.org/wiki/File:Shanghai_Stock_Exchange_2.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "钉钉 / Wikimedia Commons / CC BY-SA 4.0"

### 68. `story-2026-10-25-us-military.jpg`
- **Story:** US military gives Elon Musk SpaceX access to sensitive tracking data | SpaceX (The Guardian)
- **Subject:** Iridium-1 Launch (32312419215)
- **Photographer / creator:** SpaceX
- **Original file page:** https://commons.wikimedia.org/wiki/File:Iridium-1_Launch_(32312419215).jpg
- **License:** Creative Commons Zero, Public Domain Dedication
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "SpaceX".

### 69. `story-2026-10-24-iranian-plots.jpg`
- **Story:** Iranian plots to kill U.S. officials in Middle East have reached advanced stages, intel memo warns (NBC News)
- **Subject:** AH-64 Apache helicopters, 1st Battalion, 227th Aviation Regiment, conduct overflights of the U.S. Embassy in Baghdad, Dec. 31, 2019
- **Photographer / creator:** Army Spc. Khalil Jenkins
- **Original file page:** https://commons.wikimedia.org/wiki/File:AH-64_Apache_helicopters,_1st_Battalion,_227th_Aviation_Regiment,_conduct_overflights_of_the_U.S._Embassy_in_Baghdad,_Dec._31,_2019.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "Army Spc. Khalil Jenkins".

### 70. `story-2026-10-25-serbia-votes.png`
- **Story:** Serbia votes as students seek to unseat Aleksandar Vucic in snap election (NBC News)
- **Subject:** 2023 Serbian election protests, 24 December (1)
- **Photographer / creator:** СРБИН.инфо
- **Original file page:** https://commons.wikimedia.org/wiki/File:2023_Serbian_election_protests,_24_December_(1).png
- **License:** Creative Commons Attribution 3.0
- **Attribution wording required:** "СРБИН.инфо / Wikimedia Commons / CC BY 3.0"

### 71. `story-2026-10-25-brazil-election.jpg`
- **Story:** Brazil election: Lula and Bolsonaro face off in second round (DW)
- **Subject:** Brasilia National Congress Buildings
- **Photographer / creator:** Cayambe
- **Original file page:** https://commons.wikimedia.org/wiki/File:Brasilia_National_Congress_Buildings.jpg
- **License:** Creative Commons Attribution-Share Alike 3.0
- **Attribution wording required:** "Cayambe / Wikimedia Commons / CC BY-SA 3.0"

### 72. `story-2026-10-24-india-news.jpg`
- **Story:** India news: China border tension back in focus despite talks (DW)
- **Subject:** China India CIA map border disputes
- **Photographer / creator:** United States. Central Intelligence Agency.
- **Original file page:** https://commons.wikimedia.org/wiki/File:China_India_CIA_map_border_disputes.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "United States. Central Intelligence Agency.".

---

## November 8, 2026 – November 12, 2026 edition (2026-11-13)

### 73. `story-2026-11-12-democrat-scott.jpg`
- **Story:** Democrat Scott Colom wins Mississippi 2026 Senate race, flipping seat in upset (CBS News)
- **Subject:** Jackson December 2018 02 (Mississippi State Capitol) (cropped)
- **Photographer / creator:** Michael Barera
- **Original file page:** https://commons.wikimedia.org/wiki/File:Jackson_December_2018_02_(Mississippi_State_Capitol)_(cropped).jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Michael Barera / Wikimedia Commons / CC BY-SA 4.0"

### 74. `story-2026-11-10-ukraine-peace.jpg`
- **Story:** Ukraine peace talks resume in Abu Dhabi after months-long pause (BBC)
- **Subject:** Embassy of Ukraine in Sweden
- **Photographer / creator:** Irina Butiaha - Ірина Бутяга
- **Original file page:** https://commons.wikimedia.org/wiki/File:Embassy_of_Ukraine_in_Sweden.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "Irina Butiaha - Ірина Бутяга".

### 75. `story-2026-11-09-aramco-tower.jpg`
- **Story:** Aramco Tower hit in heart of Saudi capital as Houthis launch fresh strikes (BBC)
- **Subject:** Riyadh Skyline showing the King Abdullah Financial District (KAFD) and the famous Kingdom Tower 
- **Photographer / creator:** B.alotaby
- **Original file page:** https://commons.wikimedia.org/wiki/File:Riyadh_Skyline_showing_the_King_Abdullah_Financial_District_(KAFD)_and_the_famous_Kingdom_Tower_.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "B.alotaby / Wikimedia Commons / CC BY-SA 4.0"

### 76. `story-2026-11-12-nvidia-board.jpg`
- **Story:** Nvidia board meets to decide CEO Huang future as leadership crisis deepens (Channel News Asia)
- **Subject:** Director Lê Nguyễn Thiên Nga and NVIDIA Founder and CEO Jensen Huang
- **Photographer / creator:** VQTCS
- **Original file page:** https://commons.wikimedia.org/wiki/File:Director_L%C3%AA_Nguy%E1%BB%85n_Thi%C3%AAn_Nga_and_NVIDIA_Founder_and_CEO_Jensen_Huang.jpg
- **License:** Creative Commons Attribution 4.0
- **Attribution wording required:** "VQTCS / Wikimedia Commons / CC BY 4.0"

### 77. `story-2026-11-11-how-hacking.jpg`
- **Story:** How hacking became a key weapon for sanctions-hit North Korea (Channel News Asia)
- **Subject:** Hackers working on Linux laptop with computer disks and repair kits - Milano 2022
- **Photographer / creator:** User:Kowalski7cc
- **Original file page:** https://commons.wikimedia.org/wiki/File:Hackers_working_on_Linux_laptop_with_computer_disks_and_repair_kits_-_Milano_2022.jpg
- **License:** Creative Commons Zero, Public Domain Dedication
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "User:Kowalski7cc".

### 78. `story-2026-11-08-south-africa.jpg`
- **Story:** South Africa ANC records worst-ever results in local elections (BBC)
- **Subject:** Sea Point ANC office Annelize van Wyk MP
- **Photographer / creator:** Kaihsu Tai
- **Original file page:** https://commons.wikimedia.org/wiki/File:Sea_Point_ANC_office_Annelize_van_Wyk_MP.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "Kaihsu Tai".

---

## November 14, 2026 – November 20, 2026 edition (2026-11-20)

### 79. `story-2026-11-20-japan-core.jpg`
- **Story:** Japan core inflation soars to highest this year as energy subsidy expiry pushes up consumer prices (CNBC)
- **Subject:** Bank of Japan 20190223
- **Photographer / creator:** Suicasmo
- **Original file page:** https://commons.wikimedia.org/wiki/File:Bank_of_Japan_20190223.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Suicasmo / Wikimedia Commons / CC BY-SA 4.0"

### 80. `story-2026-11-20-classified-nsa.jpg`
- **Story:** Classified NSA network is still down, leaving some staff working from home (NBC News)
- **Subject:** National Security Agency headquarters, Fort Meade, Maryland
- **Photographer / creator:** National Security Agency
- **Original file page:** https://commons.wikimedia.org/wiki/File:National_Security_Agency_headquarters,_Fort_Meade,_Maryland.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "National Security Agency".

### 81. `story-2026-11-20-price-tag.jpg`
- **Story:** Price tag for US war in Iran barrels past $48 billion (DW)
- **Subject:** The Pentagon January 2008
- **Photographer / creator:** David B. Gleason from Chicago, IL
- **Original file page:** https://commons.wikimedia.org/wiki/File:The_Pentagon_January_2008.jpg
- **License:** Creative Commons Attribution-Share Alike 2.0
- **Attribution wording required:** "David B. Gleason from Chicago, IL / Wikimedia Commons / CC BY-SA 2.0"

### 82. `story-2026-11-19-iraq-risky.jpg`
- **Story:** Iraq risky standoff: The state vs. Iran-allied militias (DW)
- **Subject:** Government building, Baghdad 2006
- **Photographer / creator:** Unknown
- **Original file page:** https://commons.wikimedia.org/wiki/File:Government_building,_Baghdad_2006.jpg
- **License:** Creative Commons Attribution-Share Alike 2.0
- **Attribution wording required:** "Unknown / Wikimedia Commons / CC BY-SA 2.0"

### 83. `story-2026-11-19-cop31-can.jpg`
- **Story:** COP31: Can Africa win the climate funding it needs? (DW)
- **Subject:** African Union Headquarters Addis Ababa
- **Photographer / creator:** Wang Guansen for Xinhua
- **Original file page:** https://commons.wikimedia.org/wiki/File:African_Union_Headquarters_Addis_Ababa.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "Wang Guansen for Xinhua".

### 84. `story-2026-11-14-fact-check.jpg`
- **Story:** Fact check: Iranian content farms reach millions (DW)
- **Subject:** Social media apps
- **Photographer / creator:** Theresepersonne
- **Original file page:** https://commons.wikimedia.org/wiki/File:Social_media_apps.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Theresepersonne / Wikimedia Commons / CC BY-SA 4.0"

---

## November 24, 2026 – November 26, 2026 edition (2026-11-27)

### 85. `story-2026-11-26-faulty-electrical.jpg`
- **Story:** Faulty electrical goods returned to United Kingdom supermarkets ending up on Ghana megadump (The Guardian)
- **Subject:** Agbogbloshie, Ghana - September 2019
- **Photographer / creator:** Muntaka Chasant
- **Original file page:** https://commons.wikimedia.org/wiki/File:Agbogbloshie,_Ghana_-_September_2019.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Muntaka Chasant / Wikimedia Commons / CC BY-SA 4.0"

### 86. `story-2026-11-26-judge-blocks.jpg`
- **Story:** Judge blocks Brendan Carr-led FCC from taking any further action against ABC licenses (The Guardian)
- **Subject:** FCC HQ
- **Photographer / creator:** The original uploader was Ser Amantio di Nicolao at English Wikipedia.
- **Original file page:** https://commons.wikimedia.org/wiki/File:FCC_HQ.jpg
- **License:** Creative Commons Attribution 3.0
- **Attribution wording required:** "The original uploader was Ser Amantio di Nicolao at English Wikipedia. / Wikimedia Commons / CC BY 3.0"

### 87. `story-2026-11-25-australia-security.jpg`
- **Story:** Australia security pact with Solomon Islands a blow to China influence in the Pacific (The Guardian)
- **Subject:** Long shot of the Solomon Islands Parliament House. (10708895683)
- **Photographer / creator:** Department of Foreign Affairs and Trade
- **Original file page:** https://commons.wikimedia.org/wiki/File:Long_shot_of_the_Solomon_Islands_Parliament_House._(10708895683).jpg
- **License:** Creative Commons Attribution 2.0
- **Attribution wording required:** "Department of Foreign Affairs and Trade / Wikimedia Commons / CC BY 2.0"

### 88. `story-2026-11-25-inflation-rate.jpg`
- **Story:** Inflation rate jumps to 4.9% as Australia cost-of-living crisis intensifies (The Guardian)
- **Subject:** 2021-06-28 E-ink price tag in Sydney supermarket
- **Photographer / creator:** Maksym Kozlenko
- **Original file page:** https://commons.wikimedia.org/wiki/File:2021-06-28_E-ink_price_tag_in_Sydney_supermarket.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Maksym Kozlenko / Wikimedia Commons / CC BY-SA 4.0"

### 89. `story-2026-11-24-china-huawei.jpg`
- **Story:** China Huawei convicted of deceiving banks about business in Iran and stealing US trade secrets (The Guardian)
- **Subject:** Sidejo de Huawei en Ŝenĵeno 04
- **Photographer / creator:** RG72
- **Original file page:** https://commons.wikimedia.org/wiki/File:Sidejo_de_Huawei_en_%C5%9Cen%C4%B5eno_04.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "RG72 / Wikimedia Commons / CC BY-SA 4.0"

### 90. `story-2026-11-24-us-defense.jpg`
- **Story:** US defense chief has yet to approve Patriot missiles already allocated to Ukraine, FT reports (The Straits Times)
- **Subject:** 210519-A-SO154-943 - Patriot Missile System operates in Croatia
- **Photographer / creator:** Sgt. Alexandra Shea
- **Original file page:** https://commons.wikimedia.org/wiki/File:210519-A-SO154-943_-_Patriot_Missile_System_operates_in_Croatia.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "Sgt. Alexandra Shea".

---
