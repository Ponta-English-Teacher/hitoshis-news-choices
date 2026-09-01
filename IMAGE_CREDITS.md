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
