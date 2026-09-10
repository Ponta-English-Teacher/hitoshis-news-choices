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

### 7. `afghan-refugee-camp-pakistan.jpg`
- **Story:** "I've never been to Afghanistan": Six million deportees forced to start over under the Taliban (BBC)
- **Commons filename:** `File:Afghan Refugee Camp, Pakistan - panoramio.jpg`
- **Subject:** An Afghan refugee camp in Pakistan (contextual — not a photo of the 2026 deportations specifically)
- **Photographer / creator:** m.mohammadfawad
- **Original file page:** https://commons.wikimedia.org/wiki/File:Afghan_Refugee_Camp,_Pakistan_-_panoramio.jpg
- **License:** CC BY-SA 3.0 (Creative Commons Attribution-Share Alike 3.0)
- **Attribution wording required:** "m.mohammadfawad / Wikimedia Commons / CC BY-SA 3.0"

### 8. `nepal-tibet-flood-satellite.jpg`
- **Story:** Nepal-Tibet toll tops 1,000 as tunnel rescue offers last hope (Channel News Asia)
- **Commons filename:** `File:Nepal glacier collapse and flood 24 August 2026.jpg`
- **Subject:** Copernicus Sentinel-2 satellite image of the actual Nepal flash flood, captured 24 August 2026 — this one genuinely depicts the real 2026 event
- **Photographer / creator:** ESA (European Space Agency)
- **Original file page:** https://commons.wikimedia.org/wiki/File:Nepal_glacier_collapse_and_flood_24_August_2026.jpg
- **License:** CC BY-SA 3.0 IGO (Creative Commons Attribution-Share Alike 3.0 IGO)
- **Attribution wording required:** "ESA / Wikimedia Commons / CC BY-SA 3.0 IGO"

### 9. `us-navy-strait-of-hormuz.jpg`
- **Story:** US and Iran exchange fire for first time in a month (Channel News Asia)
- **Commons filename:** `File:The Eisenhower Carrier Strike Group Transits the Strait of Hormuz (8170044).jpg`
- **Subject:** A US Navy carrier strike group transiting the Strait of Hormuz — a 2023 file photo of the same location/regional context, NOT a photo of the 2026 incident
- **Photographer / creator:** U.S. Navy photo by Mass Communication Specialist 3rd Class Janae Chambers
- **Original file page:** https://commons.wikimedia.org/wiki/File:The_Eisenhower_Carrier_Strike_Group_Transits_the_Strait_of_Hormuz_(8170044).jpg
- **License:** Public Domain (U.S. federal government work)
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "U.S. Navy photo by Janae Chambers".

### 10. `amazon-fulfillment-center.jpg`
- **Story:** US trade regulator and 22 states accuse Amazon of taking $20bn with secret surcharges (The Guardian)
- **Commons filename:** `File:Amazon Fulfillment Center MSP1 (48609899896).jpg`
- **Subject:** An Amazon fulfillment center in Shakopee, Minnesota
- **Photographer / creator:** Tony Webster
- **Original file page:** https://commons.wikimedia.org/wiki/File:Amazon_Fulfillment_Center_MSP1_(48609899896).jpg
- **License:** CC BY 2.0 (Creative Commons Attribution 2.0)
- **Attribution wording required:** "Tony Webster / Wikimedia Commons / CC BY 2.0"

### 11. `eu-berlaymont-building.jpg`
- **Story:** ChatGPT becomes first AI chatbot to face tougher EU rules (Channel News Asia)
- **Commons filename:** `File:Berlaymont building 2022.jpg`
- **Subject:** The Berlaymont building in Brussels, headquarters of the European Commission
- **Photographer / creator:** Euro Pictures
- **Original file page:** https://commons.wikimedia.org/wiki/File:Berlaymont_building_2022.jpg
- **License:** CC BY 2.0 (Creative Commons Attribution 2.0)
- **Attribution wording required:** "Euro Pictures / Wikimedia Commons / CC BY 2.0"

### 12. `congo-ebola-awareness-monusco.jpg`
- **Story:** Congo authorities report more than 6,000 confirmed Ebola cases and nearly 3,000 deaths (The Associated Press, via NBC News)
- **Commons filename:** `File:Lutte contre Ebola en RD Congo - Un Casque bleu ghanéen de la MONUSCO montrant à une jeune fille comment bien se laver les mains (15412174515).jpg`
- **Subject:** A UN (MONUSCO) peacekeeper taking part in an Ebola-awareness hand-washing campaign in Kinshasa, DRC — a 2014 file photo of an earlier outbreak-response campaign, NOT a photo of the 2026 outbreak
- **Photographer / creator:** MONUSCO Photos / Jesus Nzambi
- **Original file page:** https://commons.wikimedia.org/wiki/File:Lutte_contre_Ebola_en_RD_Congo_-_Un_Casque_bleu_ghan%C3%A9en_de_la_MONUSCO_montrant_%C3%A0_une_jeune_fille_comment_bien_se_laver_les_mains_(15412174515).jpg
- **License:** CC BY-SA 2.0 (Creative Commons Attribution-Share Alike 2.0)
- **Attribution wording required:** "MONUSCO Photos / Jesus Nzambi / Wikimedia Commons / CC BY-SA 2.0"

---

**Note on images 7-12:** Downloaded via Wikimedia's `Special:FilePath` redirect at reduced width (1200px) where possible; `congo-ebola-awareness-monusco.jpg` and `nepal-tibet-flood-satellite.jpg` are stored at their original resolution because the reduced-width thumbnail redirect returned an error for those two files at download time — Next.js's built-in image optimizer resizes them for display regardless, so this has no functional effect, only a larger source file in the repo. All CC BY-SA entries require attribution and ShareAlike redistribution; the CC BY entry requires attribution only; the Public Domain entry requires none (credited here as a courtesy).

## Second edition (2026-09-04, August 31 – September 2, 2026)

Each image was chosen for topical relevance per `IMAGE_POLICY.md`'s priority order (real event image → real contextual image → AI-generated illustration → placeholder), license-verified via the Wikimedia Commons API (`imageinfo`/`extmetadata`) before download. None depict the exact 2026 event described in their story — no freely reusable actual-event photograph existed for any of these six current-week stories at sourcing time — so all six are `licensed-contextual`. This is reflected honestly in each story's `imageAlt` text in `src/data/editions/2026-09-04.ts`.

### 13. `iran-strait-us-navy-patrol.jpg`
- **Story:** US launches strikes on Iran following attempted attacks in Strait (BBC)
- **Commons filename:** `File:USS Tempest (PC 2) transits the Strait of Hormuz. (50679762106).jpg`
- **Subject:** The U.S. Navy coastal patrol ship USS Tempest transiting the Strait of Hormuz (contextual — a December 2020 file photo, not a photo of the 2026 strikes)
- **Photographer / creator:** U.S. Navy photo by Mass Communication Specialist 2nd Class Indra Beaufort
- **Original file page:** https://commons.wikimedia.org/wiki/File:USS_Tempest_(PC_2)_transits_the_Strait_of_Hormuz._(50679762106).jpg
- **License:** Public Domain (U.S. federal government work)
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "U.S. Navy photo by Indra Beaufort".

### 14. `pyongyang-kim-il-sung-square.jpg`
- **Story:** North Korea next ruler? Kim Jong-un daughter, Seoul spies say (South China Morning Post)
- **Commons filename:** `File:Kim Il Sung Square, Pyongyang, North Korea.jpg`
- **Subject:** Kim Il-sung Square, Pyongyang — the ceremonial center of North Korea's political leadership (contextual — deliberately NOT a photograph of Kim Jong-un's daughter, since no freely reusable image of her exists; a copyrighted press photo was not used, per IMAGE_POLICY.md and the quality bar for this story)
- **Photographer / creator:** Kok Leng Yeo
- **Original file page:** https://commons.wikimedia.org/wiki/File:Kim_Il_Sung_Square,_Pyongyang,_North_Korea.jpg
- **License:** CC BY 2.0 (Creative Commons Attribution 2.0 Generic)
- **Attribution wording required:** "Kok Leng Yeo / Wikimedia Commons / CC BY 2.0"

### 15. `climate-drought-cracked-earth.jpg`
- **Story:** Global heating will hit at least 1.8C, UN warns, and there are no good outcome | Climate crisis (The Guardian)
- **Commons filename:** `File:Drought in Morocco.jpg`
- **Subject:** Cracked, drought-stricken earth in Morocco (contextual — illustrates the extreme heat/water stress linked to global heating described in the story, not a photo tied to the specific UN report)
- **Photographer / creator:** Houssain tork
- **Original file page:** https://commons.wikimedia.org/wiki/File:Drought_in_Morocco.jpg
- **License:** CC BY-SA 4.0 (Creative Commons Attribution-Share Alike 4.0)
- **Attribution wording required:** "Houssain tork / Wikimedia Commons / CC BY-SA 4.0"

### 16. `pentagon-building-aerial.jpg`
- **Story:** Dan Driscoll: US Army secretary resigns after months of tension (BBC)
- **Commons filename:** `File:The Pentagon US Department of Defense building.jpg`
- **Subject:** Aerial view of the Pentagon, headquarters of the U.S. Department of Defense (contextual — a 1998 file photo, not a photo of Dan Driscoll; no freely reusable photo of Driscoll was found, so a relevant U.S. Army/Pentagon contextual image was used instead of a questionable press photo, per the quality bar for this story)
- **Photographer / creator:** DoD photo by Master Sgt. Ken Hammond, U.S. Air Force
- **Original file page:** https://commons.wikimedia.org/wiki/File:The_Pentagon_US_Department_of_Defense_building.jpg
- **License:** Public Domain (U.S. federal government work)
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "DoD photo by Ken Hammond".

### 17. `ai-cloud-datacenter-racks.jpg`
- **Story:** Anthropic signs US$35 billion cloud deal with Nvidia-backed Lambda, source says (Channel News Asia)
- **Commons filename:** `File:Datacenter Server Racks (22370909788).jpg`
- **Subject:** Rows of server racks inside a data center (contextual — genuinely relevant to the cloud/AI-infrastructure subject matter of the story, chosen instead of a generic robot illustration per the quality bar for this story)
- **Photographer / creator:** Carl Lender
- **Original file page:** https://commons.wikimedia.org/wiki/File:Datacenter_Server_Racks_(22370909788).jpg
- **License:** CC BY 2.0 (Creative Commons Attribution 2.0 Generic)
- **Attribution wording required:** "Carl Lender / Wikimedia Commons / CC BY 2.0"

### 18. `germany-drone-quadcopter.jpg`
- **Story:** Germany blames Russia for airport drone plot, shuts down consulate (NBC News)
- **Commons filename:** `File:DJI Phantom 4Pro 04-2017 img3 in flight.jpg`
- **Subject:** A consumer quadcopter drone in flight, photographed in Berlin, Germany (contextual — genuinely relevant to both the "drone" and "Germany" elements of the story, chosen over generic war imagery per the quality bar for this story)
- **Photographer / creator:** A.Savin
- **Original file page:** https://commons.wikimedia.org/wiki/File:DJI_Phantom_4Pro_04-2017_img3_in_flight.jpg
- **License:** Free Art License (FAL)
- **Attribution wording required:** "A.Savin, Wikipedia"

---

**Note on images 13-18:** Downloaded via Wikimedia's `Special:FilePath` redirect at reduced width (1200px). Two (13, 16) are Public Domain U.S. federal government works requiring no attribution (credited here as a courtesy); two (14, 17) are CC BY 2.0, requiring attribution only; one (15) is CC BY-SA 4.0, requiring attribution and ShareAlike redistribution; one (18) is under the Free Art License, requiring attribution as specified on its file page.

## August 29, 2026 – September 2, 2026 edition (2026-09-03)

### 19. `story-2026-09-02-federal-judge.jpg`
- **Story:** Federal judge blocks Trump's newest attempt to crack down on birthright citizenship (CNN)
- **Subject:** US Supreme Court
- **Photographer / creator:** Photo by Mr. Kjetil Ree.
- **Original file page:** https://commons.wikimedia.org/wiki/File:US_Supreme_Court.JPG
- **License:** Creative Commons Attribution-Share Alike 3.0
- **Attribution wording required:** "Photo by Mr. Kjetil Ree. / Wikimedia Commons / CC BY-SA 3.0"

### 20. `story-2026-09-02-google-defeats.jpg`
- **Story:** Google defeats U.S. bid to force ad tech sale (CNBC)
- **Subject:** El car on the roof of the Google office in Chicago
- **Photographer / creator:** Grendelkhan
- **Original file page:** https://commons.wikimedia.org/wiki/File:El_car_on_the_roof_of_the_Google_office_in_Chicago.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Grendelkhan / Wikimedia Commons / CC BY-SA 4.0"

### 21. `story-2026-09-02-global-bond.jpg`
- **Story:** Global bond rout gathers pace as inflation fears mount (CNBC)
- **Subject:** New York Stock Exchange August 2017 04
- **Photographer / creator:** Arild Vågen
- **Original file page:** https://commons.wikimedia.org/wiki/File:New_York_Stock_Exchange_August_2017_04.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Arild Vågen / Wikimedia Commons / CC BY-SA 4.0"

### 22. `story-2026-09-01-u-n.jpg`
- **Story:** U.N. World Food Programme slashes West Bank aid, Gaza faces new cuts (NBC News)
- **Subject:** WFP World Food Programme sack Gaza strip
- **Photographer / creator:** Eliran t
- **Original file page:** https://commons.wikimedia.org/wiki/File:WFP_World_Food_Programme_sack_Gaza_strip.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Eliran t / Wikimedia Commons / CC BY-SA 4.0"

### 23. `story-2026-08-29-trump-says.jpg`
- **Story:** Trump says U.S. has entered deal with Venezuela to take control of 65 billion barrels of oil reserves (NPR)
- **Subject:** Anacortes Refinery 31911
- **Photographer / creator:** Walter Siegmund (talk)
- **Original file page:** https://commons.wikimedia.org/wiki/File:Anacortes_Refinery_31911.JPG
- **License:** Creative Commons Attribution 2.5
- **Attribution wording required:** "Walter Siegmund (talk) / Wikimedia Commons / CC BY 2.5"

### 24. `story-2026-09-02-hong-kong.jpg`
- **Story:** Hong Kong activist Joshua Wong pleads guilty to collusion (DW)
- **Subject:** HK NothKowloonMagistracy
- **Photographer / creator:** Chong Fat
- **Original file page:** https://commons.wikimedia.org/wiki/File:HK_NothKowloonMagistracy.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "Chong Fat".

---

## September 9, 2026 – September 10, 2026 edition (2026-09-11)

### 25. `story-2026-09-10-yemen-houthis.jpg`
- **Story:** Yemen Houthis seize port city Mocha, closing in on control of Bab el-Mandeb Strait (South China Morning Post)
- **Subject:** Bab-el-Mandeb Strait, Africa-Arabia (ASTER)
- **Photographer / creator:** NASA/METI/AIST/Japan Space Systems, and U.S./Japan ASTER Science Team
- **Original file page:** https://commons.wikimedia.org/wiki/File:Bab-el-Mandeb_Strait,_Africa-Arabia_(ASTER).jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "NASA/METI/AIST/Japan Space Systems, and U.S./Japan ASTER Science Team".

### 26. `story-2026-09-10-supreme-court.jpg`
- **Story:** Supreme Court blocks Missouri attempt to use newly drawn Republican congressional map (NBC News)
- **Subject:** US Supreme Court - corrected
- **Photographer / creator:** Jarek Tuszyński
- **Original file page:** https://commons.wikimedia.org/wiki/File:US_Supreme_Court_-_corrected.jpg
- **License:** Creative Commons Attribution-Share Alike 3.0
- **Attribution wording required:** "Jarek Tuszyński / Wikimedia Commons / CC BY-SA 3.0"

### 27. `story-2026-09-10-anthropic-state.jpg`
- **Story:** Anthropic: state-linked scientists from banned regions used Claude for virus research (NBC News)
- **Subject:** V20230504LJ-0199-2
- **Photographer / creator:** The White House
- **Original file page:** https://commons.wikimedia.org/wiki/File:V20230504LJ-0199-2.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "The White House".

### 28. `story-2026-09-10-suspected-measles.jpg`
- **Story:** Suspected measles cases kill nearly 1,000 as Bangladesh struggles to contain outbreak (NBC News)
- **Subject:** Infectious Diseases Hospital, Rajshahi 18
- **Photographer / creator:** Nahid Hossain
- **Original file page:** https://commons.wikimedia.org/wiki/File:Infectious_Diseases_Hospital,_Rajshahi_18.jpg
- **License:** Creative Commons Attribution-Share Alike 4.0
- **Attribution wording required:** "Nahid Hossain / Wikimedia Commons / CC BY-SA 4.0"

### 29. `story-2026-09-09-trump-hits.jpg`
- **Story:** Trump hits Canada with import bans, 50% tariffs (DW)
- **Subject:** Wild Horse Border Crossing
- **Photographer / creator:** Qwexcxewq
- **Original file page:** https://commons.wikimedia.org/wiki/File:Wild_Horse_Border_Crossing.jpg
- **License:** Creative Commons Attribution 4.0
- **Attribution wording required:** "Qwexcxewq / Wikimedia Commons / CC BY 4.0"

### 30. `story-2026-09-10-global-heat.jpg`
- **Story:** Global heat stuck on high: August was Earth hottest month on record, scientists say (NBC News)
- **Subject:** Weather Station USDA
- **Photographer / creator:** USDA photo by Scott Bauer. Image Number K7688-7
- **Original file page:** https://commons.wikimedia.org/wiki/File:Weather_Station_USDA.jpg
- **License:** Public domain
- **Attribution wording required:** None (public domain). Credited here as a courtesy: "USDA photo by Scott Bauer. Image Number K7688-7".

---
