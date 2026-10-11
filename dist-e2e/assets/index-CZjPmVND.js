(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=e.rng=e.rng+1831565813>>>0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function t(t,n,r){return n+(r-n)*e(t)}function n(){return Math.random()*4294967295>>>0}var r=(e,t,n)=>e<t?t:e>n?n:e,i=1e300;function a(e){return Number.isFinite(e)?e<0?0:e>1e300?i:e:e>0?i:0}function o(e,t=2){if(e<=0||!Number.isFinite(e))return e;let n=10**(Math.floor(Math.log10(e))-t+1);return Math.round(e/n)*n}var s=[{id:`primitive`,numeral:`I`,name:`The Stone Age of Poking`,tagline:`Ooga. Booga. Boop.`,threshold:0,boss:null},{id:`medieval`,numeral:`II`,name:`The Middle Ages of Mild Peril`,tagline:`Thou hast startled the orb.`,threshold:15e3,boss:{name:`Stoic Stoneface`,hp:3e3,duration:30,taunt:`It has turned to stone out of sheer stubbornness.`,shell:`stone`}},{id:`industrial`,numeral:`III`,name:`The Freakdustrial Revolution`,tagline:`Gasps, now mass-produced.`,threshold:6e5,boss:{name:`Sir Composure the Unflinching`,hp:12e4,duration:30,taunt:`Full plate armour. Fuller denial.`,shell:`iron`}},{id:`modern`,numeral:`IV`,name:`Shock & Awe`,tagline:`Now with surround-sound peril.`,threshold:2e8,boss:{name:`The Clockwork Calm`,hp:4e7,duration:30,taunt:`A brass exoskeleton of total serenity. Tick. Tock.`,shell:`brass`}},{id:`future`,numeral:`V`,name:`Neon Overdrive`,tagline:`The future is bright and deeply alarming.`,threshold:8e10,boss:{name:`Poker Face Prime`,hp:16e9,duration:30,taunt:`Riot shield. Sunglasses. Zero reaction.`,shell:`kevlar`}},{id:`cosmic`,numeral:`VI`,name:`Space Is Freaking Out`,tagline:`In space, everyone can hear you gasp.`,threshold:5e13,boss:{name:`Z.E.N. Mainframe`,hp:7e12,duration:30,taunt:`A hard-light shield running meditation.exe.`,shell:`energy`}},{id:`reality`,numeral:`VII`,name:`Reality Has Left the Chat`,tagline:`Physics was a suggestion.`,threshold:0x8e1bc9bf040000,boss:{name:`The Unbothered Void`,hp:6e15,duration:30,taunt:`It has achieved the calm of deep space. Ruin it.`,shell:`void`}}],c={name:`The Composed One`,threshold:0x22b1c8c1227a00000,hp:0x6f05b59d3b200000,duration:40,taunt:`Perfect zen. Total serenity. Absolutely unacceptable.`,shell:`zen`};s.length;var l=1.15,u=[{id:`monkey`,name:`Poke Monkey`,emoji:`🐒`,era:0,baseCost:15,baseGps:.2,flavor:`Has a stick. Has no other hobbies.`,tierNames:[`Longer Sticks`,`Banana Incentives`,`Opposable Thumbs Seminar`,`Monkey Union Contract`,`Infinite Monkey Theorem`,`Primate Poking Academy`,`Simian Singularity`,`Monkey Business Class`]},{id:`gorilla`,name:`Rock Gorilla`,emoji:`🦍`,era:0,baseCost:120,baseGps:1.5,flavor:`Throws rocks. Feelings unclear.`,tierNames:[`Pointier Rocks`,`Throwing Lessons`,`Boulder Budget`,`Silverback Squats`,`Avalanche Doctrine`,`Tectonic Pitchers`,`Planetary Pebbles`,`Igneous Intent`]},{id:`trebuchet`,name:`Trebuchet`,emoji:`🏰`,era:1,baseCost:1300,baseGps:9,flavor:`Hurls a 90 kg projectile over 300 metres. Always at the same emoji.`,tierNames:[`Counterweight Cardio`,`Flaming Payloads`,`Siege Engineering Guild`,`Cow Ammunition`,`Double-Arm Design`,`Trebuchet Supremacy`,`Orbital Counterweight`,`Siege of Ages`]},{id:`knight`,name:`Jousting Knight`,emoji:`🏇`,era:1,baseCost:14e3,baseGps:50,flavor:`Charges at full gallop. Apologises afterwards.`,tierNames:[`Pointier Lances`,`Faster Horses`,`Chivalry Is Dead`,`Holy Grail Subscription`,`Round Table Roundhouse`,`Excalibur Prime`,`Knights Who Say “Boo”`,`Eternal Crusade`]},{id:`steam`,name:`Steam Prodder`,emoji:`⚙️`,era:2,baseCost:15e4,baseGps:280,flavor:`A piston on a stick. Whistles when it’s happy.`,tierNames:[`Brass Fittings`,`High-Pressure Boilers`,`Coal Overtime`,`Pneumatic Panic`,`Clockwork Precision`,`Steampunk Aesthetic`,`Perpetual Piston`,`Victorian Overdrive`]},{id:`factory`,name:`Slap Factory`,emoji:`🏭`,era:2,baseCost:17e5,baseGps:1500,flavor:`Mass-produced slaps. Union-made.`,tierNames:[`Assembly Line`,`Slap Quotas`,`Six Sigma Slapping`,`Lean Manufacturing`,`Robotic Palms`,`Slap Automation 4.0`,`Megaslap Complex`,`Industrial Hand Revolution`]},{id:`turret`,name:`Auto-Turret`,emoji:`🎯`,era:3,baseCost:22e6,baseGps:8500,flavor:`Never sleeps. Never misses. Never asks why.`,tierNames:[`Laser Sights`,`Belt-Fed Ammo`,`Target Acquisition AI`,`Ricochet Rounds`,`Sentry Swarm`,`Smart Bullets`,`Turret Mesh Network`,`Omni-Directional Annoyance`]},{id:`jet`,name:`Strafing Jet`,emoji:`✈️`,era:3,baseCost:35e7,baseGps:48e3,flavor:`Flybys hourly, on the hour. And every other second.`,tierNames:[`Afterburners`,`Top Gun Training`,`Sonic Boom Etiquette`,`Stealth Coating`,`Air Superiority`,`Hypersonic Wings`,`Skywriting Insults`,`Mach Freak`]},{id:`drone`,name:`Drone Swarm`,emoji:`🛸`,era:4,baseCost:55e8,baseGps:28e4,flavor:`Ten thousand tiny propellers of judgement.`,tierNames:[`Hive Mind Firmware`,`Quadcopter Quorum`,`Swarm Logic`,`Micro-Drones`,`Self-Replicating Units`,`Drone Rights Act`,`Cloud of Buzzing`,`The Buzz Eternal`]},{id:`orbital`,name:`Orbital Laser`,emoji:`🛰️`,era:4,baseCost:8e10,baseGps:17e5,flavor:`The gasps are visible from space.`,tierNames:[`Focusing Lenses`,`Solar Sails`,`Low Orbit Insertion`,`Space Force Funding`,`Death Star Lite`,`Constellation Array`,`Orbital Bombard-moji`,`Kessler Syndrome`]},{id:`moon`,name:`Moon Cannon`,emoji:`🌕`,era:5,baseCost:11e11,baseGps:105e5,flavor:`We hollowed out the moon. For this.`,tierNames:[`Lunar Gunpowder`,`Crater Barrels`,`Tidal Recoil`,`Dark Side Arsenal`,`Moon Moon`,`Werewolf Ammunition`,`Second Moon`,`Lunacy`]},{id:`blackhole`,name:`Black Hole Engine`,emoji:`🕳️`,era:5,baseCost:0xda475abf000,baseGps:7e7,flavor:`Spaghettifies doubt. And everything else.`,tierNames:[`Event Horizon Glasses`,`Hawking Radiation`,`Accretion Disk Polish`,`Spaghettification`,`Wormhole Shortcuts`,`Supermassive Upgrade`,`Information Paradox`,`Gravity Well-Being`]},{id:`printer`,name:`Reality Printer`,emoji:`🖨️`,era:6,baseCost:0xaccdd281e000,baseGps:45e7,flavor:`Prints fresh realities in which the Freakmoji is even more surprised.`,tierNames:[`Infinite Toner`,`PC LOAD REALITY`,`Duplex Universes`,`Paper Jam Paradox`,`Ink of Creation`,`Print Preview of God`,`Wireless Existence`,`Out of Cyan, Into Chaos`]},{id:`paradox`,name:`Paradox Engine`,emoji:`♾️`,era:6,baseCost:0x8e1bc9bf04000,baseGps:3e9,flavor:`Shocks the Freakmoji yesterday, tomorrow, and in the timeline where it’s a cat.`,tierNames:[`Grandfather Clause`,`Bootstrap Loop`,`Closed Timelike Curves`,`Butterfly Farms`,`Retrocausal Pokes`,`Schrödinger’s Gasp`,`The Ouroboros`,`Before the Beginning`]}],d=Object.fromEntries(u.map((e,t)=>[e.id,t])),f=[[`Bare Fists`,`👊`,0,`blunt`,`Classic. Organic. Knuckly.`],[`Wooden Stick`,`🪵`,0,`blunt`,`Found it. Poked it. History was made.`],[`Sharp Rock`,`🪨`,0,`blunt`,`Like a rock, but with ambition.`],[`Bone Club`,`🦴`,0,`blunt`,`Previously owned by a mammoth.`],[`Stone Axe`,`🪓`,0,`blade`,`The first tool with a warranty (void if used).`],[`Bronze Dagger`,`🗡️`,1,`blade`,`Pointy end goes toward the emoji.`],[`Iron Sword`,`⚔️`,1,`blade`,`Forged in fire. Swung in mild confusion.`],[`Longbow`,`🏹`,1,`arrow`,`Range: yes.`],[`Crossbow`,`🎯`,1,`arrow`,`A longbow that went to engineering school.`],[`Flintlock Pistol`,`🔫`,2,`bullet`,`Reload time: one (1) brisk walk.`],[`Musket`,`💨`,2,`bullet`,`Mostly smoke. Partly bullet.`],[`Revolver`,`🤠`,2,`bullet`,`Six shots. Six gasps.`],[`Gatling Gun`,`⚙️`,2,`bullet`,`Crank it like you mean it.`],[`Dynamite`,`🧨`,2,`explosive`,`Mr. Nobel would like a word.`],[`Hand Grenade`,`💣`,3,`explosive`,`Count to three. Not five. Three.`],[`Machine Gun`,`🔩`,3,`bullet`,`Brrrrrrrrrrrrrrrrrt.`],[`Flamethrower`,`🔥`,3,`fire`,`Toasty.`],[`Bazooka`,`🎺`,3,`explosive`,`Shoulder-mounted surprise delivery.`],[`Land Mine`,`💥`,3,`explosive`,`The Freakmoji does not walk. It still works.`],[`Tank`,`🛡️`,3,`explosive`,`Sixty tons of “boo!”.`],[`Fighter Plane`,`✈️`,3,`bullet`,`Strafes the emoji at Mach 2.`],[`Bomber Aircraft`,`🛩️`,3,`explosive`,`Carpet-gasping.`],[`Guided Missile`,`🚀`,3,`explosive`,`It knows where the emoji is. Because it knows where it isn’t.`],[`Nuclear Warhead`,`☢️`,4,`explosive`,`Splits atoms. Splits sides.`],[`Hydrogen Bomb`,`🎇`,4,`explosive`,`The nuke’s louder sibling.`],[`Orbital Satellite`,`🛰️`,4,`energy`,`Pokes from orbit. Very passive-aggressive.`],[`Laser Cannon`,`🔴`,4,`energy`,`Pew, but industrial.`],[`Plasma Rifle`,`🟣`,4,`energy`,`The fourth state of matter: alarming.`],[`Railgun`,`⚡`,4,`energy`,`Magnets. Lots of magnets.`],[`Particle Beam`,`✨`,4,`energy`,`Sparkly. Also catastrophic.`],[`Antimatter Bomb`,`⚛️`,5,`cosmic`,`Matter’s evil twin, now in bomb form.`],[`Gravity Manipulator`,`🧲`,5,`cosmic`,`Makes the emoji fall in every direction.`],[`Time Distortion Field`,`⏳`,5,`cosmic`,`Pokes it last Tuesday.`],[`Nanite Swarm`,`🦠`,5,`cosmic`,`A billion microscopic pokes.`],[`Quantum Disruptor`,`🎲`,5,`cosmic`,`The emoji is both shocked and shocked.`],[`Dark Matter Projector`,`🌑`,5,`cosmic`,`You can’t see it. The Freakmoji can.`],[`Singularity Generator`,`🕳️`,6,`reality`,`A pocket black hole, conveniently aimed.`],[`Supernova Inducer`,`🌟`,6,`reality`,`Explodes a star. For the reaction.`],[`Reality Warper`,`🌀`,6,`reality`,`Rewrites the rules so the emoji gasps harder.`],[`Galaxy Destroyer`,`🌌`,6,`reality`,`The final poke. Probably.`]],p=1.3;function m(e){return[e===0?25:s[e].threshold*1.5,e+1<s.length?s[e+1].threshold*.9:c.threshold*.6]}var h=[800,1e4,15e4,25e4,2e6,12e6,2e8];function g(){let e=new Map;for(let t of f)e.set(t[2],(e.get(t[2])??0)+1);let t=new Map,n=1;return f.map(([r,i,a,s,c],l)=>{let u=t.get(a)??0;t.set(a,u+1);let d=e.get(a),[f,g]=m(a),_=d===1?0:u/(d-1),v=o(f*(g/f)**+_,2),y=n<20?Math.max(n+1,Math.ceil(n*p)):n*p,b=o(Math.max(y,v/h[a]),2);return n=b,{index:l,name:r,emoji:i,era:a,family:s,flavor:c,cost:v,damage:b}})}var _=g();function v(e){return e<0?1:_[Math.min(e,_.length-1)].damage}function y(e){return e<0?`blunt`:_[Math.min(e,_.length-1)].family}var b=2.6,x=e=>[20,30,45,65,90][Math.min(e,5)-1],S=e=>3+e,C=e=>20+4*(e-1),w=e=>12+4*(e-1),T=e=>10+2*(e-1),E=e=>10+5*(e-1),D=e=>10+5*(e-1),O=e=>15+3*(e-1),k=[{id:`haymaker`,name:`Haymaker`,icon:`🥊`,key:`1`,unlockEra:1,baseCooldown:30,describe:e=>`Hold to wind up, release for one colossal poke worth up to ×${x(e)} a click. Let go in the gold zone for a PERFECT: ×3 on top.`},{id:`rally`,name:`Minion Rally`,icon:`📣`,key:`2`,unlockEra:2,baseCooldown:120,describe:e=>`Your minions lose their minds: production ×${S(e)} for ${C(e)}s.`},{id:`flurry`,name:`Flurry`,icon:`🌪️`,key:`3`,unlockEra:3,baseCooldown:90,describe:e=>`Unleash ${w(e)} automatic pokes per second for ${T(e)}s. They crit, combo and fill the Freak-O-Meter.`},{id:`timewarp`,name:`Time Warp`,icon:`⏩`,key:`4`,unlockEra:4,baseCooldown:600,describe:e=>`Skip ahead: instantly collect ${E(e)} minutes of production.`},{id:`singularity`,name:`Singularity`,icon:`🌀`,key:`5`,unlockEra:5,baseCooldown:900,describe:e=>`Collapse space around the Freakmoji: ALL gains ×${D(e)} for ${O(e)}s.`}],A=Object.fromEntries(k.map(e=>[e.id,e])),j=(e,t)=>e.producers[t]??0,ee=[1,5,25,50,100,150,200,250],M=[10,50,500,5e4,5e6,5e8,5e10,5e12],te=u.flatMap((e,t)=>ee.map((n,r)=>({id:`m_${e.id}_${r}`,name:e.tierNames[r],icon:e.emoji,kind:`minion`,cost:e.baseCost*M[r],desc:`${e.name} output doubled. (Requires ${n} owned.)`,req:t=>j(t,e.id)>=n,apply:e=>{e.producerMult[t]*=e.milestoneMult}}))),ne=[{id:`c_knuckles`,name:`Knuckle Crackers`,icon:`🤜`,kind:`click`,cost:100,desc:`Pokes are twice as strong.`,req:e=>e.runClicks>=20,apply:e=>{e.clickMult*=2}},{id:`c_finger`,name:`Pointier Finger`,icon:`☝️`,kind:`click`,cost:2500,desc:`Pokes are twice as strong again.`,req:e=>e.weapon>=2,apply:e=>{e.clickMult*=2}},{id:`c_waiver`,name:`Carpal Tunnel Waiver`,icon:`📝`,kind:`click`,cost:2e4,desc:`Each poke also adds 1% of your production.`,req:e=>e.era>=1,apply:e=>{e.clickGpsFrac+=.01}},{id:`c_brass`,name:`Ergonomic Brass Knuckles`,icon:`🥊`,kind:`click`,cost:4e6,desc:`Each poke adds another 1% of production. Pokes ×2.`,req:e=>e.era>=2,apply:e=>{e.clickGpsFrac+=.01,e.clickMult*=2}},{id:`c_strain`,name:`Repetitive Strain Mastery`,icon:`💪`,kind:`click`,cost:3e9,desc:`Each poke adds another 1% of production.`,req:e=>e.era>=3,apply:e=>{e.clickGpsFrac+=.01}},{id:`c_haptic`,name:`Haptic Overdrive`,icon:`📳`,kind:`click`,cost:15e11,desc:`Each poke adds another 1% of production. Pokes ×2.`,req:e=>e.era>=4,apply:e=>{e.clickGpsFrac+=.01,e.clickMult*=2}},{id:`c_cosmic`,name:`Cosmic Fingertips`,icon:`🌠`,kind:`click`,cost:6e14,desc:`Each poke adds another 1% of production.`,req:e=>e.era>=5,apply:e=>{e.clickGpsFrac+=.01}},{id:`c_god`,name:`The Finger of God`,icon:`👆`,kind:`click`,cost:0x58d15e176280000,desc:`Each poke adds another 2% of production. Pokes ×2.`,req:e=>e.era>=6,apply:e=>{e.clickGpsFrac+=.02,e.clickMult*=2}},{id:`k_rabbit`,name:`Lucky Rabbit’s Foot`,icon:`🐇`,kind:`crit`,cost:600,desc:`+3% critical poke chance.`,req:e=>e.stats.crits>=3,apply:e=>{e.critChance+=.03}},{id:`k_pressure`,name:`Pressure Points`,icon:`📍`,kind:`crit`,cost:4e5,desc:`Critical pokes hit for ×12 instead of ×8.`,req:e=>e.era>=1&&e.stats.crits>=25,apply:e=>{e.critMult+=4}},{id:`k_glassjaw`,name:`Glass Jaw Theory`,icon:`🥃`,kind:`crit`,cost:6e8,desc:`+4% critical poke chance.`,req:e=>e.era>=3,apply:e=>{e.critChance+=.04}},{id:`k_mass`,name:`Critical Mass`,icon:`☄️`,kind:`crit`,cost:2e13,desc:`Critical pokes hit ×6 harder.`,req:e=>e.era>=5,apply:e=>{e.critMult+=6}},{id:`o_rhythm`,name:`Rhythm Game Brain`,icon:`🥁`,kind:`combo`,cost:1500,desc:`A full combo now multiplies pokes by ×2.5 instead of ×2.`,req:e=>e.stats.bestCombo>=30,apply:e=>{e.comboBonus+=.5}},{id:`o_metronome`,name:`Metronome Implant`,icon:`⏱️`,kind:`combo`,cost:2e6,desc:`Combo window +0.4s. Keep the rhythm going.`,req:e=>e.era>=2,apply:e=>{e.comboWindow+=.4}},{id:`o_drumline`,name:`Marching Drumline`,icon:`🎺`,kind:`combo`,cost:8e9,desc:`Full-combo bonus +0.5, but the combo now takes 150 pokes to fill.`,req:e=>e.era>=3&&e.stats.bestCombo>=100,apply:e=>{e.comboCap+=50,e.comboBonus+=.5}},{id:`o_flow`,name:`Flow State`,icon:`🌊`,kind:`combo`,cost:3e14,desc:`Full-combo bonus +1.`,req:e=>e.era>=5,apply:e=>{e.comboBonus+=1}},{id:`f_espresso`,name:`Espresso IV Drip`,icon:`☕`,kind:`meter`,cost:3e3,desc:`The Freak-O-Meter fills 30% faster.`,req:e=>e.stats.freakOuts>=1,apply:e=>{e.meterFill*=1.3}},{id:`f_panic`,name:`Panic Room Subwoofer`,icon:`🔊`,kind:`meter`,cost:5e7,desc:`Freak Outs last 5 seconds longer.`,req:e=>e.era>=2&&e.stats.freakOuts>=5,apply:e=>{e.freakOutDuration+=5}},{id:`f_adrenal`,name:`Adrenal Overclock`,icon:`💉`,kind:`meter`,cost:6e11,desc:`Freak Outs multiply pokes by ×4 instead of ×3, and production by ×3 instead of ×2.`,req:e=>e.era>=4,apply:e=>{e.freakOutClickMult+=1,e.freakOutGpsMult+=1}},{id:`w_anatomy`,name:`Anatomy Textbook`,icon:`📖`,kind:`weak`,cost:300,desc:`Reveals glowing weak spots on the Freakmoji. Poke them for a guaranteed crit at ×2.`,req:e=>e.runClicks>=60,apply:e=>{e.weakSpots=!0}},{id:`w_phd`,name:`Freakology PhD`,icon:`🎓`,kind:`weak`,cost:8e5,desc:`Weak spots are worth ×4 instead of ×2 and appear more often.`,req:e=>e.stats.weakHits>=20,apply:e=>{e.weakSpotMult*=2,e.weakSpotInterval*=.75}},{id:`w_xray`,name:`X-Ray Goggles`,icon:`🥽`,kind:`weak`,cost:5e10,desc:`Weak spots are worth twice as much again.`,req:e=>e.era>=4&&e.stats.weakHits>=100,apply:e=>{e.weakSpotMult*=2}},{id:`g_lure`,name:`Shiny Lure`,icon:`🪝`,kind:`golden`,cost:5e4,desc:`Golden Freakmojis appear 25% more often.`,req:e=>e.stats.goldenCaught>=1,apply:e=>{e.goldenFreq*=1.25}},{id:`g_leaf`,name:`Gold Leaf Gloves`,icon:`🧤`,kind:`golden`,cost:2e8,desc:`Golden Freakmojis linger twice as long.`,req:e=>e.stats.goldenCaught>=5,apply:e=>{e.goldenDuration*=2}},{id:`g_midas`,name:`Midas Complex`,icon:`👑`,kind:`golden`,cost:4e12,desc:`Golden Freakmoji effects are 50% stronger.`,req:e=>e.stats.goldenCaught>=15,apply:e=>{e.goldenPower*=1.5}},{id:`s_monkeyrock`,name:`Monkey See, Monkey Throw`,icon:`🐒`,kind:`synergy`,cost:25e3,desc:`Poke Monkeys +4% for each Rock Gorilla.`,req:e=>j(e,`monkey`)>=15&&j(e,`gorilla`)>=15,apply:(e,t)=>{e.producerMult[d.monkey]*=1+.04*j(t,`gorilla`)}},{id:`s_steamsiege`,name:`Steam-Powered Siege`,icon:`♨️`,kind:`synergy`,cost:4e6,desc:`Trebuchets +3% for each Steam Prodder; Steam Prodders +1% per Trebuchet.`,req:e=>j(e,`trebuchet`)>=15&&j(e,`steam`)>=15,apply:(e,t)=>{e.producerMult[d.trebuchet]*=1+.03*j(t,`steam`),e.producerMult[d.steam]*=1+.01*j(t,`trebuchet`)}},{id:`s_mechknights`,name:`Mecha-Knights`,icon:`🤖`,kind:`synergy`,cost:6e8,desc:`Jousting Knights +3% for each Slap Factory; Slap Factories +1% per Knight.`,req:e=>j(e,`knight`)>=15&&j(e,`factory`)>=15,apply:(e,t)=>{e.producerMult[d.knight]*=1+.03*j(t,`factory`),e.producerMult[d.factory]*=1+.01*j(t,`knight`)}},{id:`s_airsupport`,name:`Close Air Support`,icon:`🛫`,kind:`synergy`,cost:4e10,desc:`Auto-Turrets +3% for each Strafing Jet; Jets +1% per Turret.`,req:e=>j(e,`turret`)>=15&&j(e,`jet`)>=15,apply:(e,t)=>{e.producerMult[d.turret]*=1+.03*j(t,`jet`),e.producerMult[d.jet]*=1+.01*j(t,`turret`)}},{id:`s_skynet`,name:`Skynet, But Polite`,icon:`📡`,kind:`synergy`,cost:6e12,desc:`Drone Swarms +3% per Orbital Laser; Orbital Lasers +1% per Drone Swarm.`,req:e=>j(e,`drone`)>=15&&j(e,`orbital`)>=15,apply:(e,t)=>{e.producerMult[d.drone]*=1+.03*j(t,`orbital`),e.producerMult[d.orbital]*=1+.01*j(t,`drone`)}},{id:`s_tides`,name:`Tidal Spaghettification`,icon:`🌊`,kind:`synergy`,cost:0x38d7ea4c68000,desc:`Moon Cannons +3% per Black Hole Engine; Black Holes +1% per Moon Cannon.`,req:e=>j(e,`moon`)>=15&&j(e,`blackhole`)>=15,apply:(e,t)=>{e.producerMult[d.moon]*=1+.03*j(t,`blackhole`),e.producerMult[d.blackhole]*=1+.01*j(t,`moon`)}},{id:`s_ouroboros`,name:`Print the Paradox`,icon:`🔁`,kind:`synergy`,cost:0x2c68af0bb140000,desc:`Reality Printers +3% per Paradox Engine; Paradox Engines +1% per Printer.`,req:e=>j(e,`printer`)>=15&&j(e,`paradox`)>=15,apply:(e,t)=>{e.producerMult[d.printer]*=1+.03*j(t,`paradox`),e.producerMult[d.paradox]*=1+.01*j(t,`printer`)}},{id:`s_oldguard`,name:`The Old Guard`,icon:`🎖️`,kind:`synergy`,cost:2e11,desc:`Poke Monkeys and Rock Gorillas gain +1% for every minion you own.`,req:e=>e.era>=4&&j(e,`monkey`)>=100,apply:(e,t)=>{let n=u.reduce((e,n)=>e+j(t,n.id),0);e.producerMult[d.monkey]*=1+.01*n,e.producerMult[d.gorilla]*=1+.01*n}},...s.slice(1).map((e,t)=>({id:`e_${e.id}`,name:[`Bronze Age Bravado`,`Steam & Screaming`,`Military-Industrial Complex`,`Cyber Psychosis`,`Cosmic Horror Grant`,`Post-Physics Funding`][t],icon:[`🛡️`,`🚂`,`🏢`,`💾`,`🔭`,`🧿`][t],kind:`global`,cost:e.threshold*4,desc:`All gasps +25%. A gift from Era ${e.numeral}.`,req:e=>e.era>=t+1,apply:e=>{e.globalMult*=1.25}}))],re=k.flatMap(e=>Array.from({length:4},(t,n)=>{let r=n+2,i=s[e.unlockEra].threshold;return{id:`a_${e.id}_${r}`,name:`${e.name} ${[`II`,`III`,`IV`,`V`][n]}`,icon:e.icon,kind:`ability`,cost:i*5*40**n,desc:e.describe(r),req:t=>t.era>=e.unlockEra&&(r===2||t.upgrades[`a_${e.id}_${r-1}`]===!0),apply:t=>{t.abilityLevels[e.id]=Math.max(t.abilityLevels[e.id]??1,r)}}})),ie=[...ne,...te,...re],ae=Object.fromEntries(ie.map(e=>[e.id,e])),oe=.03;function se(e){return e<=250?oe*e:oe*250*Math.sqrt(e/250)}var N=1e8,ce=[{id:`dejavu`,name:`Déjà Vu`,icon:`👁️`,branch:`root`,tier:0,cost:1,requires:[],desc:`Start every timeline with Bare Fists and 10 Poke Monkeys. Golden Freakmojis +10% frequency.`,apply:e=>{e.startKit=!0,e.goldenFreq*=1.1}},{id:`t_trigger`,name:`Itchy Trigger Finger`,icon:`👆`,branch:`twitchy`,tier:1,cost:2,requires:[`dejavu`],desc:`Combo window +0.5s. Full-combo bonus +0.5.`,apply:e=>{e.comboWindow+=.5,e.comboBonus+=.5}},{id:`t_tic`,name:`Nervous Tic`,icon:`⚡`,branch:`twitchy`,tier:2,cost:5,requires:[`t_trigger`],desc:`+5% critical chance. Crits ×4 harder.`,apply:e=>{e.critChance+=.05,e.critMult+=4}},{id:`t_vigil`,name:`Hypervigilance`,icon:`🎯`,branch:`twitchy`,tier:3,cost:15,requires:[`t_tic`],desc:`Weak spots appear twice as often and are worth twice as much. Unlocks them from the start.`,apply:e=>{e.weakSpots=!0,e.weakSpotInterval*=.5,e.weakSpotMult*=2}},{id:`t_flight`,name:`Fight or Flight`,icon:`💓`,branch:`twitchy`,tier:4,cost:40,requires:[`t_vigil`],desc:`The Freak-O-Meter fills 40% faster and Freak Outs last 50% longer.`,apply:e=>{e.meterFill*=1.4,e.freakOutDuration*=1.5}},{id:`t_hair`,name:`Hair Trigger`,icon:`🧨`,branch:`twitchy`,tier:5,cost:100,requires:[`t_flight`],desc:`Full-combo bonus +1 and pokes add +3% of production.`,apply:e=>{e.comboBonus+=1,e.clickGpsFrac+=.03}},{id:`b_sweats`,name:`Night Sweats`,icon:`🌙`,branch:`brooding`,tier:1,cost:2,requires:[`dejavu`],desc:`Offline progress 25% → 60% efficient, cap 2h → 8h.`,apply:e=>{e.offlineEff=Math.max(e.offlineEff,.6),e.offlineCap=Math.max(e.offlineCap,28800)}},{id:`b_memory`,name:`Muscle Memory`,icon:`🧠`,branch:`brooding`,tier:2,cost:5,requires:[`b_sweats`],desc:`Minions cost 12% less.`,apply:e=>{e.producerCostMult*=.88}},{id:`b_overthink`,name:`Overthinking`,icon:`🌀`,branch:`brooding`,tier:3,cost:15,requires:[`b_memory`],desc:`Production +2% for every 10 seconds since your last poke (up to +300%). Poking resets it.`,apply:e=>{e.overthinking=!0}},{id:`b_insomnia`,name:`Insomnia`,icon:`🦉`,branch:`brooding`,tier:4,cost:40,requires:[`b_overthink`],desc:`Offline progress is 100% efficient for up to 24 hours. Production ×1.5.`,apply:e=>{e.offlineEff=1,e.offlineCap=86400,e.gpsMult*=1.5}},{id:`b_delegate`,name:`Delegation`,icon:`📋`,branch:`brooding`,tier:5,cost:100,requires:[`b_insomnia`],desc:`Minion milestone upgrades triple output instead of doubling it.`,apply:e=>{e.milestoneMult=3}},{id:`u_charm`,name:`Lucky Charm`,icon:`🍀`,branch:`unhinged`,tier:1,cost:2,requires:[`dejavu`],desc:`Golden Freakmojis appear 35% more often and linger 50% longer.`,apply:e=>{e.goldenFreq*=1.35,e.goldenDuration*=1.5}},{id:`u_fuse`,name:`Short Fuse`,icon:`⏲️`,branch:`unhinged`,tier:2,cost:5,requires:[`u_charm`],desc:`Ability cooldowns −25%.`,apply:e=>{e.abilityCooldown*=.75}},{id:`u_bleed`,name:`Timeline Bleed`,icon:`🩸`,branch:`unhinged`,tier:3,cost:15,requires:[`u_fuse`],desc:`Start every timeline in Era II, skipping the Stone Age.`,apply:e=>{e.startEra=Math.max(e.startEra,1)}},{id:`u_midas`,name:`Golden Touch`,icon:`✨`,branch:`unhinged`,tier:4,cost:40,requires:[`u_bleed`],desc:`Golden Freakmoji effects ×2. Time Warp collects double.`,apply:e=>{e.goldenPower*=2,e.timeWarpMult*=2}},{id:`u_slip`,name:`Reality Slip`,icon:`🕳️`,branch:`unhinged`,tier:5,cost:100,requires:[`u_midas`],desc:`Start every timeline in Era III. Ability cooldowns −25% more.`,apply:e=>{e.startEra=Math.max(e.startEra,2),e.abilityCooldown*=.75}},{id:`cap_dread`,name:`Transcendent Dread`,icon:`😱`,branch:`capstone`,tier:6,cost:400,requires:[`t_hair`,`b_delegate`,`u_slip`],desc:`Master every fear. All gasps ×4.`,apply:e=>{e.globalMult*=4}}],le=Object.fromEntries(ce.map(e=>[e.id,e])),ue=.01,de=e=>u.reduce((t,n)=>t+(e.producers[n.id]??0),0),fe=(e,t,n,r,i,a)=>n.map((n,o)=>({id:`${e}${o}`,name:r[o],icon:t,desc:i(n),check:(e,t)=>a(e,t)>=n})),pe=e=>{for(let[t,n]of[[1e24,`septillion`],[1e21,`sextillion`],[0xde0b6b3a7640000,`quintillion`],[0x38d7ea4c68000,`quadrillion`],[0xe8d4a51000,`trillion`],[1e9,`billion`],[1e6,`million`],[1e3,`thousand`]])if(e>=t)return`${e/t} ${n}`;return String(e)},me=[...fe(`clk`,`👆`,[1,100,1e3,1e4,5e4],[`First Contact`,`Poke Enthusiast`,`Clickaholic`,`Repetitive Strain`,`Carpal Tunnel Champion`],e=>`Poke the Freakmoji ${e.toLocaleString(`en-US`)} time${e===1?``:`s`}.`,e=>e.stats.clicks),...fe(`gsp`,`😮`,[1e3,1e6,1e9,0xe8d4a51000,0x38d7ea4c68000,0xde0b6b3a7640000,1e21,1e24],[`Mild Surprise`,`Genuine Alarm`,`Existential Shock`,`Trillion-Gasp Tantrum`,`Quadrillion Quiver`,`Quintillion Quake`,`Sextillion Scream`,`The Heat Death Gasp`],e=>`Earn ${pe(e)} gasps in total.`,e=>e.lifetimeGasps),...fe(`gps`,`⏲️`,[10,1e3,1e6,1e9,0xe8d4a51000],[`Idle Hands`,`Gasp Engine`,`Assembly of Agony`,`Industrial Dread`,`Perpetual Panic`],e=>`Produce ${pe(e)} gasps per second.`,(e,t)=>t),...fe(`cmb`,`🔥`,[25,100,250],[`On a Roll`,`Combo Breaker Breaker`,`Unbroken`],e=>`Reach a ${e}-poke combo.`,e=>e.stats.bestCombo),...fe(`crt`,`💥`,[1,100,1e3],[`Critical Thinking`,`Critical Condition`,`Critical Mass Hysteria`],e=>`Land ${e.toLocaleString(`en-US`)} critical poke${e===1?``:`s`}.`,e=>e.stats.crits),...fe(`wk`,`🎯`,[1,50,500],[`Found a Soft Spot`,`Pressure Point Pro`,`Acupuncturist of Doom`],e=>`Hit ${e} weak spot${e===1?``:`s`}.`,e=>e.stats.weakHits),...fe(`gld`,`🌟`,[1,10,77],[`Fool’s Gold`,`Gold Rush`,`Seventy-Seven Shiny Shocks`],e=>`Catch ${e} Golden Freakmoji${e===1?``:`s`}.`,e=>e.stats.goldenCaught),...fe(`fo`,`😱`,[1,25,100],[`Freaking Out`,`Chronic Panic`,`Permanent Meltdown`],e=>`Trigger ${e} Freak Out${e===1?``:`s`}.`,e=>e.stats.freakOuts),...s.slice(1).map((e,t)=>({id:`era${t+1}`,name:`Era ${e.numeral}: ${e.name}`,icon:`🏛️`,desc:`Shatter ${e.boss.name}'s composure and enter Era ${e.numeral}.`,check:e=>e.era>=t+1})),{id:`victory`,name:`Reality: Broken`,icon:`🌌`,desc:`Defeat The Composed One and break reality itself.`,check:e=>e.stats.victories>=1},{id:`allweapons`,name:`Fully Armed and Operational`,icon:`⚔️`,desc:`Own all ${_.length} weapons in one timeline.`,check:e=>e.weapon>=_.length-1},{id:`min100`,name:`Middle Management`,icon:`📈`,desc:`Own 100 minions in one timeline.`,check:e=>de(e)>=100},{id:`min500`,name:`Minion Megacorp`,icon:`🏢`,desc:`Own 500 minions in one timeline.`,check:e=>de(e)>=500},{id:`allminions`,name:`Diverse Portfolio`,icon:`🗂️`,desc:`Own at least one of every minion.`,check:e=>u.every(t=>(e.producers[t.id]??0)>0)},{id:`perfect`,name:`Frame Perfect`,icon:`🥊`,desc:`Land a PERFECT Haymaker.`,check:e=>e.stats.perfectHaymakers>=1},{id:`abil50`,name:`Ability Spammer`,icon:`🎛️`,desc:`Use abilities 50 times.`,check:e=>e.stats.abilitiesUsed>=50},...fe(`tl`,`🔄`,[1,5,25],[`It Was All a Dream`,`Groundhog Gasp`,`Timeline Tourist`],e=>`Collapse ${e} timeline${e===1?``:`s`}.`,e=>e.timelines),{id:`para100`,name:`Clinically Paranoid`,icon:`🫣`,desc:`Earn 100 Paranoia in total.`,check:e=>e.paranoiaEarned>=100},{id:`hands`,name:`Talk to the Hand`,icon:`✋`,secret:!0,desc:`Poke the Freakmoji’s gloves 50 times. They are VERY clean gloves.`,check:e=>e.stats.handPokes>=50},{id:`eyes`,name:`Eye Contact`,icon:`👀`,secret:!0,desc:`Poke the Freakmoji right in the eye 25 times. Rude.`,check:e=>e.stats.eyePokes>=25},{id:`patience`,name:`Thousand-Yard Stare`,icon:`🧘`,secret:!0,desc:`Leave the Freakmoji alone for 10 minutes. It appreciates the space.`,check:e=>e.runClicks>0&&e.time-e.lastManualAt>=600},{id:`bighit`,name:`One Punch`,icon:`👊`,secret:!0,desc:`Deal a single hit worth more than an hour of production.`,check:(e,t)=>t>0&&e.stats.biggestHit>=t*3600}],he=Object.fromEntries(me.map(e=>[e.id,e]));function ge(){return{globalMult:1,gpsMult:1,clickMult:1,clickGpsFrac:0,producerMult:u.map(()=>1),milestoneMult:2,producerCostMult:1,weaponCostMult:1,critChance:.04,critMult:8,comboCap:100,comboBonus:1,comboWindow:1,meterFill:1,freakOutDuration:10,freakOutClickMult:3,freakOutGpsMult:2,weakSpots:!1,weakSpotInterval:1,weakSpotMult:2,goldenFreq:1,goldenDuration:1,goldenPower:1,abilityCooldown:1,abilityLevels:{},timeWarpMult:1,offlineEff:.25,offlineCap:7200,overthinking:!1,startEra:0,startKit:!1}}function _e(e){let t=ge();for(let n of ce)e.nodes[n.id]&&n.apply(t);for(let n of ie)e.upgrades[n.id]&&n.apply(t,e);return t.globalMult*=1+ue*Object.keys(e.achievements).length,t.globalMult*=1+se(e.paranoia),t}function ve(e,t,n){return Math.ceil(e.baseCost*n.producerCostMult*l**+t)}function ye(e,t,n,r=1){let i=l,o=0,s=0;for(;s<r;s++){let r=ve(e,t+s,n);if(r>0xe8d4a51000)break;o+=r}if(s<r){let a=e.baseCost*n.producerCostMult*i**+(t+s);o+=a*(i**+(r-s)-1)/(i-1)}return a(o)}function be(e,t,n,r){let i=l,a=e.baseCost*n.producerCostMult*i**+t;if(!(r>=a))return 0;let o=Math.floor(Math.log(r*(i-1)/a+1)/Math.log(i));for(;o>0&&ye(e,t,n,o)>r;)o--;for(;ye(e,t,n,o+1)<=r;)o++;return Math.max(0,Math.min(o,1e5))}function xe(e,t){return a(_[e].cost*t.weaponCostMult)}function Se(e,t,n){let r=u[n];return a((e.producers[r.id]??0)*r.baseGps*t.producerMult[n]*t.gpsMult*t.globalMult)}function Ce(e,t){let n=0;for(let r=0;r<u.length;r++)n+=Se(e,t,r);return a(n)}function P(e,t,n){return a(v(e.weapon)*t.clickMult*t.globalMult+n*t.clickGpsFrac)}function we(e,t){return 1+t.comboBonus*Math.min(e,t.comboCap)/t.comboCap}function Te(e,t){if(!t.overthinking)return 1;let n=Math.max(0,e.time-e.lastManualAt);return 1+Math.min(3,.02*Math.floor(n/10))}function Ee(e){return e.time<e.freakOutEnd}function F(e,t){let n=1;for(let t of e.buffs)t.end>e.time&&(n*=t.gps);return Ee(e)&&(n*=t.freakOutGpsMult),n*Te(e,t)}function De(e,t){let n=1;for(let t of e.buffs)t.end>e.time&&(n*=t.click);return Ee(e)&&(n*=t.freakOutClickMult),n}function I(e){return e>0?Math.floor(Math.cbrt(e/N)):0}function L(e){return Math.max(0,I(e.lifetimeGasps)-e.paranoiaEarned)}function Oe(e){return(Math.max(I(e.lifetimeGasps),e.paranoiaEarned)+1)**3*N}function ke(e,t){let n=le[t];return!n||e.nodes[t]?!1:n.requires.every(t=>e.nodes[t])}function Ae(){return{clicks:0,crits:0,weakHits:0,goldenCaught:0,freakOuts:0,bestCombo:0,bossesBeaten:0,abilitiesUsed:0,perfectHaymakers:0,handPokes:0,eyePokes:0,biggestHit:0,victories:0}}function je(e=n(),t=Date.now()){return{version:2,rng:e>>>0,time:0,totalTime:0,gasps:0,runGasps:0,lifetimeGasps:0,era:0,weapon:-1,producers:Object.fromEntries(u.map(e=>[e.id,0])),upgrades:{},buffs:[],abilityCooldowns:{},streak:0,lastClickAt:-10,lastManualAt:-10,runClicks:0,freakMeter:0,freakOutEnd:0,weakSpot:null,nextWeakSpotAt:6,golden:null,nextGoldenAt:50,boss:null,bossRetryAt:0,victory:!1,charge:null,flurryCarry:0,paranoia:0,paranoiaEarned:0,nodes:{},timelines:0,achievements:{},stats:Ae(),runStats:{clicks:0,startedAt:t},records:[],legacyScores:[],lastSeen:t}}var Me=.004,Ne=.06,Pe=3.5,Fe=Math.cos(.36),Ie=12,Le=15,Re=1,ze=class{state;mods;gpsBase=0;events=[];manualTimes=[];nextAchievementCheck=0;gateAnnounced=-1;constructor(e=je()){this.state=e,this.refresh()}refresh(){this.mods=_e(this.state),this.gpsBase=Ce(this.state,this.mods)}get gps(){return a(this.gpsBase*F(this.state,this.mods))}get pokeValue(){let e=this.state;return a(P(e,this.mods,this.gpsBase)*De(e,this.mods)*we(this.liveStreak,this.mods))}get liveStreak(){let e=this.state;return Ee(e)||e.time-e.lastClickAt<=this.mods.comboWindow?e.streak:0}drainEvents(){if(this.events.length===0)return this.events;let e=this.events;return this.events=[],e}emit(e){this.events.push(e),this.events.length>2e3&&this.events.splice(0,this.events.length-2e3)}rand(){return e(this.state)}earn(e){let t=a(e);if(t<=0)return;let n=this.state;n.gasps=a(n.gasps+t),n.runGasps=a(n.runGasps+t),n.lifetimeGasps=a(n.lifetimeGasps+t),n.boss&&(n.boss.hp-=t,n.boss.hp<=0&&this.winBoss())}update(e){if(!(e>0))return;let t=Math.min(e,604800),n=0;for(;t>1e-9&&n++<1e5;){let e=this.state.buffs.some(e=>e.id===`flurry`),n=Math.min(t,this.nextBoundary()-this.state.time,e?.25:5),r=Math.max(n,1e-6);this.advance(r),t-=r,this.processTimers()}}nextBoundary(){let e=this.state,t=1/0;for(let n of e.buffs)t=Math.min(t,n.end);return e.freakOutEnd>e.time&&(t=Math.min(t,e.freakOutEnd)),e.boss&&(t=Math.min(t,e.boss.end)),t=e.golden?Math.min(t,e.golden.end):Math.min(t,e.nextGoldenAt),e.weakSpot?t=Math.min(t,e.weakSpot.end):this.mods.weakSpots&&(t=Math.min(t,e.nextWeakSpotAt)),e.charge&&(t=Math.min(t,e.charge.startedAt+b)),Math.max(t,e.time+1e-6)}advance(e){let t=this.state,n=this.gps,r=t.buffs.find(e=>e.id===`flurry`&&e.end>t.time);if(t.time+=e,t.totalTime+=e,this.earn(n*e),r){let n=this.mods.abilityLevels.flurry??1;t.flurryCarry+=w(n)*e;let r=Math.floor(t.flurryCarry);t.flurryCarry-=r,r=Math.min(r,200);for(let e=0;e<r;e++)this.poke({source:`auto`,region:`face`,dir:null})}!Ee(t)&&t.time-t.lastClickAt>2&&(t.freakMeter=Math.max(0,t.freakMeter-Ne*e)),!Ee(t)&&t.time-t.lastClickAt>this.mods.comboWindow&&(t.streak=0)}processTimers(){let e=this.state,n=e.time;if(e.buffs.length){let t=[],r=!1;for(let i of e.buffs)i.end>n?t.push(i):(r=!0,(i.id===`rally`||i.id===`singularity`||i.id===`flurry`)&&this.emit({type:`abilityEnd`,id:i.id}));r&&(e.buffs=t)}if(e.freakOutEnd>0&&n>=e.freakOutEnd&&(e.freakOutEnd=0,this.emit({type:`freakOutEnd`})),e.charge&&n-e.charge.startedAt>=2.6&&this.releaseCharge(),e.boss&&n>=e.boss.end){let{era:t,final:r}=e.boss;e.boss=null,e.bossRetryAt=n+Le,this.gateAnnounced=-1,this.emit({type:`bossFail`,era:t,final:r})}if(e.golden&&n>=e.golden.end)e.golden=null,e.nextGoldenAt=n+this.goldenDelay(),this.emit({type:`goldenMissed`});else if(!e.golden&&n>=e.nextGoldenAt){let t=Ie*this.mods.goldenDuration;e.golden={end:n+t,seed:this.rand()*4294967295>>>0},this.emit({type:`goldenSpawn`,seed:e.golden.seed,duration:t})}e.weakSpot&&n>=e.weakSpot.end?(e.weakSpot=null,e.nextWeakSpotAt=n+this.weakSpotDelay(),this.emit({type:`weakSpotEnd`,hit:!1})):!e.weakSpot&&this.mods.weakSpots&&n>=e.nextWeakSpotAt&&(n-e.lastManualAt<8?(e.weakSpot={yaw:t(e,-.75,.75),pitch:t(e,-.3,.55),end:n+Pe},this.emit({type:`weakSpot`,yaw:e.weakSpot.yaw,pitch:e.weakSpot.pitch})):e.nextWeakSpotAt=n+2);let r=this.gateBoss();r&&this.gateAnnounced!==e.era+ +(e.era===s.length-1)&&(this.gateAnnounced=e.era+ +(e.era===s.length-1),this.emit({type:`gateReady`,era:e.era+1,final:r.final})),n>=this.nextAchievementCheck&&(this.nextAchievementCheck=n+Re,this.checkAchievements())}goldenDelay(){return t(this.state,80,200)/this.mods.goldenFreq}weakSpotDelay(){return t(this.state,4,9)*this.mods.weakSpotInterval}poke(e={}){let t=this.state,n=this.mods,r=e.source??`pointer`,i=e.region??`face`;if(r!==`auto`){let e=this.manualTimes;if(e.length>=25&&t.time-e[0]<1)return 0;e.push(t.time),e.length>25&&e.shift(),t.lastManualAt=t.time,i===`hand`&&t.stats.handPokes++,i===`eye`&&t.stats.eyePokes++}Ee(t)||t.time-t.lastClickAt<=n.comboWindow?t.streak++:t.streak=1,t.lastClickAt=t.time,t.streak>t.stats.bestCombo&&(t.stats.bestCombo=t.streak);let o=!1;if(t.weakSpot&&e.dir){let{yaw:n,pitch:r}=t.weakSpot,i=Math.sin(n)*Math.cos(r),a=Math.sin(r),s=Math.cos(n)*Math.cos(r),[c,l,u]=e.dir;c*i+l*a+u*s>=Fe&&(o=!0,t.weakSpot=null,t.nextWeakSpotAt=t.time+this.weakSpotDelay(),t.stats.weakHits++,this.emit({type:`weakSpotEnd`,hit:!0}))}let s=o||this.rand()<n.critChance,c=P(t,n,this.gpsBase)*De(t,n)*we(t.streak,n);return s&&(c*=n.critMult),o&&(c*=n.weakSpotMult),c=a(c),t.stats.clicks++,t.runClicks++,s&&t.stats.crits++,c>t.stats.biggestHit&&(t.stats.biggestHit=c),Ee(t)||(t.freakMeter+=Me*n.meterFill*(o?5:s?2:1),t.freakMeter>=1&&this.startFreakOut()),this.earn(c),this.emit({type:`poke`,value:c,crit:s,weak:o,streak:t.streak,dir:e.dir??null,region:i,source:r}),c}startFreakOut(){let e=this.state;e.freakMeter=0,e.freakOutEnd=e.time+this.mods.freakOutDuration,e.stats.freakOuts++,this.emit({type:`freakOutStart`,duration:this.mods.freakOutDuration})}nextWeapon(){let e=this.state.weapon+1;return e<_.length?e:-1}weaponUnlocked(e){return e>=0&&e<_.length&&_[e].era<=this.state.era}buyWeapon(){let e=this.state,t=this.nextWeapon();if(t<0||!this.weaponUnlocked(t))return!1;let n=xe(t,this.mods);return e.gasps<n?(this.emit({type:`denied`,reason:`weapon`}),!1):(e.gasps-=n,e.weapon=t,this.refresh(),this.emit({type:`buyWeapon`,index:t}),this.checkAchievements(),!0)}producerUnlocked(e){let t=d[e];return t!==void 0&&u[t].era<=this.state.era}producerPrice(e,t){let n=u[d[e]];return ye(n,this.state.producers[e]??0,this.mods,Math.max(1,t))}buyProducer(e,t=1){let n=this.state,r=d[e];if(r===void 0||!this.producerUnlocked(e))return 0;let i=u[r],a=n.producers[e]??0,o=t===`max`?be(i,a,this.mods,n.gasps):Math.floor(t);if(o<=0)return this.emit({type:`denied`,reason:`producer`}),0;let s=ye(i,a,this.mods,o);return n.gasps<s?(this.emit({type:`denied`,reason:`producer`}),0):(n.gasps-=s,n.producers[e]=a+o,this.refresh(),this.emit({type:`buyProducer`,id:e,amount:o}),this.checkAchievements(),o)}upgradeVisible(e){let t=ae[e];return!!t&&!this.state.upgrades[e]&&t.req(this.state)}buyUpgrade(e){let t=this.state,n=ae[e];return!n||t.upgrades[e]||!n.req(t)?!1:t.gasps<n.cost?(this.emit({type:`denied`,reason:`upgrade`}),!1):(t.gasps-=n.cost,t.upgrades[e]=!0,this.refresh(),this.emit({type:`buyUpgrade`,id:e}),!0)}abilityLevel(e){return this.mods.abilityLevels[e]??1}abilityUnlocked(e){return this.state.era>=A[e].unlockEra}abilityCooldownLeft(e){return Math.max(0,(this.state.abilityCooldowns[e]??0)-this.state.time)}abilityCooldownTotal(e){return A[e].baseCooldown*this.mods.abilityCooldown}abilityActiveLeft(e){let t=this.state.buffs.find(t=>t.id===e);return t?Math.max(0,t.end-this.state.time):0}abilityReady(e){return this.abilityUnlocked(e)&&this.abilityCooldownLeft(e)<=0&&!(e===`haymaker`&&this.state.charge)}addBuff(e,t,n,r){let i=this.state;i.buffs=i.buffs.filter(t=>t.id!==e),i.buffs.push({id:e,end:i.time+t,gps:n,click:r})}startCooldown(e){this.state.abilityCooldowns[e]=this.state.time+this.abilityCooldownTotal(e),this.state.stats.abilitiesUsed++}activate(e){if(e===`haymaker`)return this.startCharge();if(!this.abilityReady(e))return!1;let t=this.abilityLevel(e);switch(e){case`rally`:this.addBuff(`rally`,C(t),S(t),1);break;case`flurry`:this.addBuff(`flurry`,T(t),1,1);break;case`timewarp`:this.earn(this.gpsBase*60*E(t)*this.mods.timeWarpMult);break;case`singularity`:{let e=D(t);this.addBuff(`singularity`,O(t),e,e);break}}return this.startCooldown(e),this.emit({type:`ability`,id:e}),!0}startCharge(){return this.abilityReady(`haymaker`)?(this.state.charge={startedAt:this.state.time},this.emit({type:`chargeStart`}),!0):!1}chargeLevel(){let e=this.state.charge;return e?r((this.state.time-e.startedAt)/2,0,1):0}releaseCharge(e){let t=this.state;if(!t.charge)return 0;let n=t.time-t.charge.startedAt,i=r(e??n,0,b);t.charge=null;let o=r(i/2,0,1),s=i>=1.7&&i<=2,c=this.mods,l=P(t,c,this.gpsBase)*De(t,c)*we(this.liveStreak,c)*x(this.abilityLevel(`haymaker`))*Math.max(.05,o*o);return s&&(l*=3,t.stats.perfectHaymakers++),l=a(l),l>t.stats.biggestHit&&(t.stats.biggestHit=l),this.startCooldown(`haymaker`),this.earn(l),this.emit({type:`haymaker`,value:l,perfect:s,charge:o}),Ee(t)||(t.freakMeter+=.15*c.meterFill*(s?2:1),t.freakMeter>=1&&this.startFreakOut()),l}catchGolden(){let e=this.state;if(!e.golden||e.time>=e.golden.end)return null;e.golden=null,e.nextGoldenAt=e.time+this.goldenDelay(),e.stats.goldenCaught++;let t=this.mods.goldenPower,n=this.rand(),r,i=0;return n<.45?(r=`lucky`,i=Math.min(e.gasps*.15,this.gpsBase*900)*t+13,this.earn(i)):n<.8?(r=`frenzy`,this.addBuff(`goldenFrenzy`,77*t,7,1)):n<.92?(r=`storm`,this.addBuff(`clickStorm`,12*t,1,10)):(r=`freakout`,e.streak=Math.max(e.streak,this.mods.comboCap),e.lastClickAt=e.time,Ee(e)||this.startFreakOut()),this.emit({type:`goldenCaught`,effect:r,value:i}),r}gateBoss(){let e=this.state;if(e.boss||e.time<e.bossRetryAt)return null;if(e.era<s.length-1){let t=s[e.era+1];return e.runGasps>=t.threshold&&t.boss?{...t.boss,final:!1}:null}return!e.victory&&e.runGasps>=c.threshold?{...c,final:!0}:null}nextGateThreshold(){let e=this.state;return e.era<s.length-1?s[e.era+1].threshold:e.victory?null:c.threshold}startBoss(){let e=this.state,t=this.gateBoss();if(!t)return!1;let n=t.final?e.era:e.era+1;return e.boss={era:n,hp:t.hp,maxHp:t.hp,end:e.time+t.duration,final:t.final},this.emit({type:`bossStart`,era:n,final:t.final}),!0}winBoss(){let e=this.state;if(!e.boss)return;let{era:t,final:n}=e.boss;if(e.boss=null,e.bossRetryAt=0,e.stats.bossesBeaten++,this.emit({type:`bossWin`,era:t,final:n}),n)e.victory=!0,e.stats.victories++;else{let n=e.era;e.era=t,this.emit({type:`eraChange`,from:n,to:t})}this.refresh(),this.checkAchievements()}canCollapse(){return(this.state.era>=3||this.state.victory)&&L(this.state)>=1}collapse(e=!1,t=Date.now()){let n=this.state;if(!this.canCollapse())return 0;let r=L(n);if(n.records.unshift({timeline:n.timelines+1,gasps:n.runGasps,era:n.era,victory:n.victory,duration:n.time,endedAt:t}),n.records=n.records.sort((e,t)=>t.gasps-e.gasps).slice(0,10),n.paranoia+=r,n.paranoiaEarned+=r,e){for(let e of ce)n.nodes[e.id]&&(n.paranoia+=e.cost);n.nodes={}}return n.timelines++,this.resetRun(t),this.emit({type:`collapse`,gained:r,timeline:n.timelines}),this.checkAchievements(),r}resetRun(e){let t=this.state,n=je(t.rng,e);t.time=0,t.gasps=0,t.runGasps=0,t.weapon=-1,t.producers=n.producers,t.upgrades={},t.buffs=[],t.abilityCooldowns={},t.streak=0,t.lastClickAt=-10,t.lastManualAt=-10,t.runClicks=0,t.freakMeter=0,t.freakOutEnd=0,t.weakSpot=null,t.nextWeakSpotAt=6,t.golden=null,t.nextGoldenAt=40,t.boss=null,t.bossRetryAt=0,t.victory=!1,t.charge=null,t.flurryCarry=0,t.runStats={clicks:0,startedAt:e},this.gateAnnounced=-1,this.manualTimes=[],this.nextAchievementCheck=0,this.refresh(),t.era=this.mods.startEra,this.mods.startKit&&(t.weapon=0,t.producers.monkey=10),this.refresh()}buyNode(e){let t=this.state,n=le[e];return!n||!ke(t,e)||t.paranoia<n.cost?!1:(t.paranoia-=n.cost,t.nodes[e]=!0,this.refresh(),this.emit({type:`buyNode`,id:e}),!0)}checkAchievements(){let e=this.state,t=this.gpsBase,n=!1;for(let r of me)!e.achievements[r.id]&&r.check(e,t)&&(e.achievements[r.id]=!0,n=!0,this.emit({type:`achievement`,id:r.id}));n&&this.refresh()}applyOffline(e){let t=this.state,n={elapsed:0,credited:0,efficiency:this.mods.offlineEff,gained:0};if(!(e>1))return n;let r=Math.min(e,31536e3);if(t.boss){let{era:e,final:n}=t.boss;t.boss=null,this.emit({type:`bossFail`,era:e,final:n})}t.buffs=[],t.freakOutEnd=0,t.charge=null,t.golden=null,t.weakSpot=null,t.streak=0,t.freakMeter=0,t.time+=r,t.totalTime+=r,t.nextGoldenAt=t.time+30,t.nextWeakSpotAt=t.time+5,t.bossRetryAt=0;let i=Math.min(r,this.mods.offlineCap),o=a(this.gpsBase*i*this.mods.offlineEff);return this.earn(o),this.checkAchievements(),{elapsed:r,credited:i,efficiency:this.mods.offlineEff,gained:o}}},Be=`freakmoji.save`,Ve=`freakmoji.save.bak`,He=`highScores`;function Ue(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return(t>>>0).toString(36)}function We(e,t=Date.now()){let n=JSON.stringify(e);return`{"v":2,"t":${t},"sum":"${Ue(n)}","data":${n}}`}var Ge=e=>typeof e==`object`&&!!e&&!Array.isArray(e),Ke=(e,t=0)=>typeof e==`number`&&Number.isFinite(e)?e:t,qe=(e,t=0)=>a(Ke(e,t)),Je=(e,t,n,r)=>{let i=Math.floor(Ke(e,r));return i<t?t:i>n?n:i},Ye=(e,t)=>{let n={};if(Ge(e))for(let r of Object.keys(e))e[r]===!0&&r in t&&(n[r]=!0);return n};function Xe(e,t){return{...e}}function Ze(e,t=Date.now()){let n=je(void 0,t);if(!Ge(e))return n;let r=n;if(r.rng=Ke(e.rng,r.rng)>>>0||r.rng,r.time=qe(e.time),r.totalTime=qe(e.totalTime,r.time),r.gasps=qe(e.gasps),r.runGasps=Math.max(qe(e.runGasps),0),r.lifetimeGasps=Math.max(qe(e.lifetimeGasps),r.runGasps),r.era=Je(e.era,0,s.length-1,0),r.weapon=Je(e.weapon,-1,_.length-1,-1),Ge(e.producers))for(let t of u)r.producers[t.id]=Je(e.producers[t.id],0,1e6,0);if(r.upgrades=Ye(e.upgrades,ae),r.nodes=Ye(e.nodes,le),r.achievements=Ye(e.achievements,he),Ge(e.abilityCooldowns))for(let[t,n]of Object.entries(e.abilityCooldowns))[`haymaker`,`rally`,`flurry`,`timewarp`,`singularity`].includes(t)&&(r.abilityCooldowns[t]=Math.min(qe(n),r.time+3600));r.buffs=[],r.boss=null,r.charge=null,r.golden=null,r.weakSpot=null,r.freakOutEnd=0,r.streak=0,r.lastClickAt=r.time-10,r.lastManualAt=Math.min(Ke(e.lastManualAt,r.time-10),r.time),r.nextGoldenAt=r.time+30,r.nextWeakSpotAt=r.time+5,r.bossRetryAt=0,r.freakMeter=Math.min(1,qe(e.freakMeter)),r.runClicks=Je(e.runClicks,0,0xe8d4a51000,0),r.victory=e.victory===!0,r.paranoia=Je(e.paranoia,0,0x38d7ea4c68000,0),r.paranoiaEarned=Math.max(Je(e.paranoiaEarned,0,0x38d7ea4c68000,0),r.paranoia),r.timelines=Je(e.timelines,0,1e9,0);let i=Ae();if(Ge(e.stats))for(let t of Object.keys(i))i[t]=qe(e.stats[t]);return r.stats=i,Ge(e.runStats)&&(r.runStats={clicks:qe(e.runStats.clicks),startedAt:Ke(e.runStats.startedAt,t)}),Array.isArray(e.records)&&(r.records=e.records.filter(Ge).slice(0,10).map(e=>({timeline:Je(e.timeline,0,1e9,0),gasps:qe(e.gasps),era:Je(e.era,0,s.length-1,0),victory:e.victory===!0,duration:qe(e.duration),endedAt:Ke(e.endedAt,t)}))),r.legacyScores=Qe(e.legacyScores),r.lastSeen=Ke(e.lastSeen,t),r.version=2,r}function Qe(e){return Array.isArray(e)?e.filter(Ge).slice(0,10).map(e=>({name:String(e.name??`Anonymous`).slice(0,16),score:qe(e.score),clicks:Je(e.clicks,0,0xe8d4a51000,0)})):[]}function $e(e,t=Date.now()){if(!e)return null;let n;try{n=JSON.parse(e)}catch{return null}if(!Ge(n)||!Ge(n.data))return null;let r=n,i=Ke(r.v,0);if(i>2)return null;let a=typeof r.sum==`string`&&Ue(JSON.stringify(r.data))===r.sum,o=Ze(Xe(r.data,i),t);return{state:o,savedAt:Ke(r.t,o.lastSeen),intact:a}}function et(e,t=Date.now()){let n=null,r=null;try{n=$e(e.getItem(Be),t),(!n||!n.intact)&&(r=$e(e.getItem(Ve),t))}catch{}let i;if(n&&n.intact)i={state:n.state,source:`save`,warning:null};else if(r&&r.intact)i={state:r.state,source:`backup`,warning:`Your save looked damaged, so the backup was restored.`};else if(n)i={state:n.state,source:`save`,warning:`Your save failed its integrity check; it was repaired as best as possible.`};else{let n=tt(e,Be)!==null;i={state:je(void 0,t),source:`new`,warning:n?`Your save could not be read, so a new game was started.`:null}}if(i.state.legacyScores.length===0)try{let t=e.getItem(He);t&&(i.state.legacyScores=Qe(JSON.parse(t)))}catch{}return i}function tt(e,t){try{return e.getItem(t)}catch{return null}}function nt(e,t,n=Date.now()){try{t.lastSeen=n;let r=We(t,n),i=e.getItem(Be);return i&&i!==r&&e.setItem(Ve,i),e.setItem(Be,r),!0}catch{return!1}}function rt(e){try{e.removeItem(Be),e.removeItem(Ve)}catch{}}function it(e,t=Date.now()){let n=new TextEncoder().encode(We(e,t)),r=``;for(let e of n)r+=String.fromCharCode(e);return`FREAK2:`+btoa(r)}function at(e,t=Date.now()){let n=e.trim();if(!n.startsWith(`FREAK2:`))return null;try{let e=atob(n.slice(7)),r=Uint8Array.from(e,e=>e.charCodeAt(0)),i=$e(new TextDecoder().decode(r),t);return i?i.state:null}catch{return null}}function ot(e,t=Date.now()){let n=(t-e)/1e3;return Number.isFinite(n)&&n>0?n:0}var st=`freakmoji.settings`;function ct(){let e=typeof matchMedia==`function`&&matchMedia(`(prefers-reduced-motion: reduce)`).matches;return{master:.8,sfx:.8,music:.5,muted:!1,quality:`auto`,reducedMotion:e,flashes:!e,shake:+!e,notation:`suffix`,floaters:!0}}var lt=(e,t)=>typeof e==`number`&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t;function ut(){let e=ct();try{let t=JSON.parse(localStorage.getItem(st)??`null`);return!t||typeof t!=`object`?e:{master:lt(t.master,e.master),sfx:lt(t.sfx,e.sfx),music:lt(t.music,e.music),muted:typeof t.muted==`boolean`?t.muted:e.muted,quality:[`auto`,`low`,`medium`,`high`].includes(t.quality)?t.quality:e.quality,reducedMotion:typeof t.reducedMotion==`boolean`?t.reducedMotion:e.reducedMotion,flashes:typeof t.flashes==`boolean`?t.flashes:e.flashes,shake:lt(t.shake,e.shake),notation:t.notation===`scientific`?`scientific`:`suffix`,floaters:typeof t.floaters==`boolean`?t.floaters:e.floaters}}catch{return e}}function dt(e){try{localStorage.setItem(st,JSON.stringify(e))}catch{}}var ft=[``,`K`,`M`,`B`,`T`,`Qa`,`Qi`,`Sx`,`Sp`,`Oc`,`No`,`Dc`,`UDc`,`DDc`,`TDc`,`QaDc`,`QiDc`,`SxDc`,`SpDc`,`OcDc`,`NoDc`,`Vg`],pt=`suffix`;function mt(e){pt=e}function ht(e,t){return e.toFixed(t).replace(/\.?0+$/,``)}function R(e,t=!1){if(!Number.isFinite(e))return e>0?`∞`:`0`;if(e<0)return`-`+R(-e,t);if(e<1e3)return t&&e<100&&e%1!=0?ht(e,e<10?2:1):Math.floor(e).toLocaleString(`en-US`);let n=Math.floor(Math.log10(e));if(pt===`scientific`||n>=ft.length*3)return`${(e/10**n).toFixed(2)}e${n}`;let r=Math.floor(n/3),i=e/10**(r*3);return`${ht(i,i>=100?1:2)}${ft[r]}`}function gt(e){return R(e,!0)}function _t(e){if(!Number.isFinite(e)||e<0)return`—`;if(e<1)return`<1s`;let t=Math.floor(e%60),n=Math.floor(e/60%60),r=Math.floor(e/3600%24),i=Math.floor(e/86400);return i>0?`${i}d ${r}h`:r>0?`${r}h ${n}m`:n>0?`${n}m ${t}s`:`${t}s`}function vt(e){return`${ht(e*100,+(e*100<10))}%`}var yt=1e3,bt=1001,xt=1002,St=1003,Ct=1004,wt=1005,Tt=1006,Et=1007,Dt=1008,Ot=1009,kt=1010,At=1011,jt=1012,Mt=1013,Nt=1014,Pt=1015,Ft=1016,It=1017,Lt=1018,Rt=1020,zt=35902,Bt=35899,Vt=1021,Ht=1022,Ut=1023,Wt=1026,Gt=1027,Kt=1028,qt=1029,Jt=1030,Yt=1031,Xt=1033,Zt=33776,Qt=33777,$t=33778,en=33779,tn=35840,nn=35841,rn=35842,an=35843,on=36196,sn=37492,cn=37496,ln=37488,un=37489,dn=37490,fn=37491,pn=37808,mn=37809,hn=37810,gn=37811,_n=37812,vn=37813,yn=37814,bn=37815,xn=37816,Sn=37817,Cn=37818,wn=37819,Tn=37820,En=37821,Dn=36492,On=36494,kn=36495,An=36283,jn=36284,Mn=36285,Nn=36286,Pn=2300,Fn=2301,In=2302,Ln=2303,Rn=2400,zn=2401,Bn=2402,Vn=3200,Hn=`srgb`,Un=`srgb-linear`,Wn=`linear`,Gn=`srgb`,Kn=7680,qn=35044,Jn=35048,Yn=2e3;function Xn(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Zn(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Qn(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function $n(){let e=Qn(`canvas`);return e.style.display=`block`,e}var er={};function tr(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function nr(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function z(...e){e=nr(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function B(...e){e=nr(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function rr(...e){let t=e.join(` `);t in er||(er[t]=!0,z(...e))}function ir(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var ar={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},or=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},sr=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),cr=1234567,lr=Math.PI/180,ur=180/Math.PI;function dr(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(sr[e&255]+sr[e>>8&255]+sr[e>>16&255]+sr[e>>24&255]+`-`+sr[t&255]+sr[t>>8&255]+`-`+sr[t>>16&15|64]+sr[t>>24&255]+`-`+sr[n&63|128]+sr[n>>8&255]+`-`+sr[n>>16&255]+sr[n>>24&255]+sr[r&255]+sr[r>>8&255]+sr[r>>16&255]+sr[r>>24&255]).toLowerCase()}function V(e,t,n){return Math.max(t,Math.min(n,e))}function fr(e,t){return(e%t+t)%t}function pr(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function mr(e,t,n){return e===t?0:(n-e)/(t-e)}function hr(e,t,n){return(1-n)*e+n*t}function gr(e,t,n,r){return hr(e,t,1-Math.exp(-n*r))}function _r(e,t=1){return t-Math.abs(fr(e,t*2)-t)}function vr(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function yr(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function br(e,t){return e+Math.floor(Math.random()*(t-e+1))}function xr(e,t){return e+Math.random()*(t-e)}function Sr(e){return e*(.5-Math.random())}function Cr(e){e!==void 0&&(cr=e);let t=cr+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function wr(e){return e*lr}function Tr(e){return e*ur}function Er(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Dr(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Or(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function kr(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:z(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Ar(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function jr(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Mr={DEG2RAD:lr,RAD2DEG:ur,generateUUID:dr,clamp:V,euclideanModulo:fr,mapLinear:pr,inverseLerp:mr,lerp:hr,damp:gr,pingpong:_r,smoothstep:vr,smootherstep:yr,randInt:br,randFloat:xr,randFloatSpread:Sr,seededRandom:Cr,degToRad:wr,radToDeg:Tr,isPowerOfTwo:Er,ceilPowerOfTwo:Dr,floorPowerOfTwo:Or,setQuaternionFromProperEuler:kr,normalize:jr,denormalize:Ar},H=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Nr=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:z(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(V(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fr.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fr.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Pr.copy(this).projectOnVector(e),this.sub(Pr)}reflect(e){return this.sub(Pr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Pr=new U,Fr=new Nr,W=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return rr(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Ir.makeScale(e,t)),this}rotate(e){return rr(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Ir.makeRotation(-e)),this}translate(e,t){return rr(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Ir.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ir=new W,Lr=new W().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rr=new W().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zr(){let e={enabled:!0,workingColorSpace:Un,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Vr(e.r),e.g=Vr(e.g),e.b=Vr(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Hr(e.r),e.g=Hr(e.g),e.b=Hr(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Wn:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return rr(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return rr(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Un]:{primaries:t,whitePoint:r,transfer:Wn,toXYZ:Lr,fromXYZ:Rr,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Hn},outputColorSpaceConfig:{drawingBufferColorSpace:Hn}},[Hn]:{primaries:t,whitePoint:r,transfer:Gn,toXYZ:Lr,fromXYZ:Rr,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Hn}}}),e}var Br=zr();function Vr(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Hr(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Ur,Wr=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ur===void 0&&(Ur=Qn(`canvas`)),Ur.width=e.width,Ur.height=e.height;let t=Ur.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Ur}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Qn(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Vr(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Vr(t[e]/255)*255):t[e]=Vr(t[e]);return{data:t,width:e.width,height:e.height}}return z(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Gr=0,Kr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Gr++}),this.uuid=dr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(qr(r[t].image)):e.push(qr(r[t]))}else e=qr(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function qr(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Wr.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(z(`Texture: Unable to serialize Texture.`),{})}var Jr=0,Yr=new U,Xr=class e extends or{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=bt,i=bt,a=Tt,o=Dt,s=Ut,c=Ot,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jr++}),this.uuid=dr(),this.name=``,this.source=new Kr(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new H(0,0),this.repeat=new H(1,1),this.center=new H(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new W,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Yr).x}get height(){return this.source.getSize(Yr).y}get depth(){return this.source.getSize(Yr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){z(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?z(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case yt:e.x-=Math.floor(e.x);break;case bt:e.x=e.x<0?0:1;break;case xt:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case yt:e.y-=Math.floor(e.y);break;case bt:e.y=e.y<0?0:1;break;case xt:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Xr.DEFAULT_IMAGE=null,Xr.DEFAULT_MAPPING=300,Xr.DEFAULT_ANISOTROPY=1;var Zr=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this.w=V(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this.w=V(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Qr=class extends or{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Zr(0,0,e,t),this.scissorTest=!1,this.viewport=new Zr(0,0,e,t),this.textures=[];let r=new Xr({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Tt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Kr(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},$r=class extends Qr{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ei=class extends Xr{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=St,this.minFilter=St,this.wrapR=bt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},ti=class extends Xr{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=St,this.minFilter=St,this.wrapR=bt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},ni=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/ri.setFromMatrixColumn(e,0).length(),i=1/ri.setFromMatrixColumn(e,1).length(),a=1/ri.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ai,e,oi)}lookAt(e,t,n){let r=this.elements;return li.subVectors(e,t),li.lengthSq()===0&&(li.z=1),li.normalize(),si.crossVectors(n,li),si.lengthSq()===0&&(Math.abs(n.z)===1?li.x+=1e-4:li.z+=1e-4,li.normalize(),si.crossVectors(n,li)),si.normalize(),ci.crossVectors(li,si),r[0]=si.x,r[4]=ci.x,r[8]=li.x,r[1]=si.y,r[5]=ci.y,r[9]=li.y,r[2]=si.z,r[6]=ci.z,r[10]=li.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],te=r[7],ne=r[11],re=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*te,i[8]=a*C+o*D+s*j+c*ne,i[12]=a*w+o*O+s*ee+c*re,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*te,i[9]=l*C+u*D+d*j+f*ne,i[13]=l*w+u*O+d*ee+f*re,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*te,i[10]=p*C+m*D+h*j+g*ne,i[14]=p*w+m*O+h*ee+g*re,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*te,i[11]=_*C+v*D+y*j+b*ne,i[15]=_*w+v*O+y*ee+b*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=ri.set(r[0],r[1],r[2]).length(),o=ri.set(r[4],r[5],r[6]).length(),s=ri.set(r[8],r[9],r[10]).length();i<0&&(a=-a),ii.copy(this);let c=1/a,l=1/o,u=1/s;return ii.elements[0]*=c,ii.elements[1]*=c,ii.elements[2]*=c,ii.elements[4]*=l,ii.elements[5]*=l,ii.elements[6]*=l,ii.elements[8]*=u,ii.elements[9]*=u,ii.elements[10]*=u,t.setFromRotationMatrix(ii),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Yn,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Yn,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ri=new U,ii=new ni,ai=new U(0,0,0),oi=new U(1,1,1),si=new U,ci=new U,li=new U,ui=new ni,di=new Nr,fi=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(V(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-V(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(V(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-V(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(V(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-V(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:z(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ui.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ui,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return di.setFromEuler(this),this.setFromQuaternion(di,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};fi.DEFAULT_ORDER=`XYZ`;var pi=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},mi=0,hi=new U,gi=new Nr,_i=new ni,vi=new U,yi=new U,bi=new U,xi=new Nr,Si=new U(1,0,0),Ci=new U(0,1,0),wi=new U(0,0,1),Ti={type:`added`},Ei={type:`removed`},Di={type:`childadded`,child:null},Oi={type:`childremoved`,child:null},ki=class e extends or{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mi++}),this.uuid=dr(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new U,n=new fi,r=new Nr,i=new U(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ni},normalMatrix:{value:new W}}),this.matrix=new ni,this.matrixWorld=new ni,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pi,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return gi.setFromAxisAngle(e,t),this.quaternion.multiply(gi),this}rotateOnWorldAxis(e,t){return gi.setFromAxisAngle(e,t),this.quaternion.premultiply(gi),this}rotateX(e){return this.rotateOnAxis(Si,e)}rotateY(e){return this.rotateOnAxis(Ci,e)}rotateZ(e){return this.rotateOnAxis(wi,e)}translateOnAxis(e,t){return hi.copy(e).applyQuaternion(this.quaternion),this.position.add(hi.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Si,e)}translateY(e){return this.translateOnAxis(Ci,e)}translateZ(e){return this.translateOnAxis(wi,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?vi.copy(e):vi.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),yi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(yi,vi,this.up):_i.lookAt(vi,yi,this.up),this.quaternion.setFromRotationMatrix(_i),r&&(_i.extractRotation(r.matrixWorld),gi.setFromRotationMatrix(_i),this.quaternion.premultiply(gi.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(B(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ti),Di.child=e,this.dispatchEvent(Di),Di.child=null):B(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ei),Oi.child=e,this.dispatchEvent(Oi),Oi.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_i.multiply(e.parent.matrixWorld)),e.applyMatrix4(_i),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ti),Di.child=e,this.dispatchEvent(Di),Di.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yi,e,bi),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yi,xi,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};ki.DEFAULT_UP=new U(0,1,0),ki.DEFAULT_MATRIX_AUTO_UPDATE=!0,ki.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ai=class extends ki{constructor(){super(),this.isGroup=!0,this.type=`Group`}},ji={type:`move`},Mi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ai,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ai,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ai,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ji)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ai;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Ni={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},Fi={h:0,s:0,l:0};function Ii(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var G=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Br.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Br.workingColorSpace){return this.r=e,this.g=t,this.b=n,Br.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Br.workingColorSpace){if(e=fr(e,1),t=V(t,0,1),n=V(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Ii(i,r,e+1/3),this.g=Ii(i,r,e),this.b=Ii(i,r,e-1/3)}return Br.colorSpaceToWorking(this,r),this}setStyle(e,t=Hn){function n(t){t!==void 0&&parseFloat(t)<1&&z(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:z(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);z(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Hn){let n=Ni[e.toLowerCase()];return n===void 0?z(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vr(e.r),this.g=Vr(e.g),this.b=Vr(e.b),this}copyLinearToSRGB(e){return this.r=Hr(e.r),this.g=Hr(e.g),this.b=Hr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Hn){return Br.workingToColorSpace(Li.copy(this),e),Math.round(V(Li.r*255,0,255))*65536+Math.round(V(Li.g*255,0,255))*256+Math.round(V(Li.b*255,0,255))}getHexString(e=Hn){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Br.workingColorSpace){Br.workingToColorSpace(Li.copy(this),t);let n=Li.r,r=Li.g,i=Li.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Br.workingColorSpace){return Br.workingToColorSpace(Li.copy(this),t),e.r=Li.r,e.g=Li.g,e.b=Li.b,e}getStyle(e=Hn){Br.workingToColorSpace(Li.copy(this),e);let t=Li.r,n=Li.g,r=Li.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Pi),this.setHSL(Pi.h+e,Pi.s+t,Pi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Pi),e.getHSL(Fi);let n=hr(Pi.h,Fi.h,t),r=hr(Pi.s,Fi.s,t),i=hr(Pi.l,Fi.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Li=new G;G.NAMES=Ni;var Ri=class extends ki{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fi,this.environmentIntensity=1,this.environmentRotation=new fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},zi=new U,Bi=new U,Vi=new U,Hi=new U,Ui=new U,Wi=new U,Gi=new U,Ki=new U,qi=new U,Ji=new U,Yi=new Zr,Xi=new Zr,Zi=new Zr,Qi=class e{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),zi.subVectors(e,t),r.cross(zi);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){zi.subVectors(r,t),Bi.subVectors(n,t),Vi.subVectors(e,t);let a=zi.dot(zi),o=zi.dot(Bi),s=zi.dot(Vi),c=Bi.dot(Bi),l=Bi.dot(Vi),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Hi)!==null&&Hi.x>=0&&Hi.y>=0&&Hi.x+Hi.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Hi)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Hi.x),s.addScaledVector(a,Hi.y),s.addScaledVector(o,Hi.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Yi.setScalar(0),Xi.setScalar(0),Zi.setScalar(0),Yi.fromBufferAttribute(e,t),Xi.fromBufferAttribute(e,n),Zi.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Yi,i.x),a.addScaledVector(Xi,i.y),a.addScaledVector(Zi,i.z),a}static isFrontFacing(e,t,n,r){return zi.subVectors(n,t),Bi.subVectors(e,t),zi.cross(Bi).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zi.subVectors(this.c,this.b),Bi.subVectors(this.a,this.b),zi.cross(Bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Ui.subVectors(r,n),Wi.subVectors(i,n),Ki.subVectors(e,n);let s=Ui.dot(Ki),c=Wi.dot(Ki);if(s<=0&&c<=0)return t.copy(n);qi.subVectors(e,r);let l=Ui.dot(qi),u=Wi.dot(qi);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Ui,a);Ji.subVectors(e,i);let f=Ui.dot(Ji),p=Wi.dot(Ji);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Wi,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Gi.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Gi,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Ui,a).addScaledVector(Wi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},$i=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ta.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ta.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ta.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,ta):ta.fromBufferAttribute(r,t),ta.applyMatrix4(e.matrixWorld),this.expandByPoint(ta);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),na.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),na.copy(e.boundingBox)),na.applyMatrix4(e.matrixWorld),this.union(na)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ta),ta.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(la),ua.subVectors(this.max,la),ra.subVectors(e.a,la),ia.subVectors(e.b,la),aa.subVectors(e.c,la),oa.subVectors(ia,ra),sa.subVectors(aa,ia),ca.subVectors(ra,aa);let t=[0,-oa.z,oa.y,0,-sa.z,sa.y,0,-ca.z,ca.y,oa.z,0,-oa.x,sa.z,0,-sa.x,ca.z,0,-ca.x,-oa.y,oa.x,0,-sa.y,sa.x,0,-ca.y,ca.x,0];return!pa(t,ra,ia,aa,ua)||(t=[1,0,0,0,1,0,0,0,1],!pa(t,ra,ia,aa,ua))?!1:(da.crossVectors(oa,sa),t=[da.x,da.y,da.z],pa(t,ra,ia,aa,ua))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ta).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ta).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(ea[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ea[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ea[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ea[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ea[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ea[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ea[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ea[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ea)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ea=[new U,new U,new U,new U,new U,new U,new U,new U],ta=new U,na=new $i,ra=new U,ia=new U,aa=new U,oa=new U,sa=new U,ca=new U,la=new U,ua=new U,da=new U,fa=new U;function pa(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){fa.fromArray(e,a);let o=i.x*Math.abs(fa.x)+i.y*Math.abs(fa.y)+i.z*Math.abs(fa.z),s=t.dot(fa),c=n.dot(fa),l=r.dot(fa);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var ma=new U,ha=new H,ga=0,_a=class extends or{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ga++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=qn,this.updateRanges=[],this.gpuType=Pt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ha.fromBufferAttribute(this,t),ha.applyMatrix3(e),this.setXY(t,ha.x,ha.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ma.fromBufferAttribute(this,t),ma.applyMatrix3(e),this.setXYZ(t,ma.x,ma.y,ma.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ma.fromBufferAttribute(this,t),ma.applyMatrix4(e),this.setXYZ(t,ma.x,ma.y,ma.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ma.fromBufferAttribute(this,t),ma.applyNormalMatrix(e),this.setXYZ(t,ma.x,ma.y,ma.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ma.fromBufferAttribute(this,t),ma.transformDirection(e),this.setXYZ(t,ma.x,ma.y,ma.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ar(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=jr(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ar(t,this.array)),t}setX(e,t){return this.normalized&&(t=jr(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ar(t,this.array)),t}setY(e,t){return this.normalized&&(t=jr(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ar(t,this.array)),t}setZ(e,t){return this.normalized&&(t=jr(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ar(t,this.array)),t}setW(e,t){return this.normalized&&(t=jr(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=jr(t,this.array),n=jr(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=jr(t,this.array),n=jr(n,this.array),r=jr(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=jr(t,this.array),n=jr(n,this.array),r=jr(r,this.array),i=jr(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},va=class extends _a{constructor(e,t,n){super(new Uint16Array(e),t,n)}},ya=class extends _a{constructor(e,t,n){super(new Uint32Array(e),t,n)}},K=class extends _a{constructor(e,t,n){super(new Float32Array(e),t,n)}},ba=new $i,xa=new U,Sa=new U,Ca=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?ba.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xa.subVectors(e,this.center);let t=xa.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(xa,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xa.copy(e.center).add(Sa)),this.expandByPoint(xa.copy(e.center).sub(Sa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},wa=0,Ta=new ni,Ea=new ki,Da=new U,Oa=new $i,ka=new $i,Aa=new U,ja=class e extends or{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wa++}),this.uuid=dr(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Xn(e)?ya:va)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new W().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ta.makeRotationFromQuaternion(e),this.applyMatrix4(Ta),this}rotateX(e){return Ta.makeRotationX(e),this.applyMatrix4(Ta),this}rotateY(e){return Ta.makeRotationY(e),this.applyMatrix4(Ta),this}rotateZ(e){return Ta.makeRotationZ(e),this.applyMatrix4(Ta),this}translate(e,t,n){return Ta.makeTranslation(e,t,n),this.applyMatrix4(Ta),this}scale(e,t,n){return Ta.makeScale(e,t,n),this.applyMatrix4(Ta),this}lookAt(e){return Ea.lookAt(e),Ea.updateMatrix(),this.applyMatrix4(Ea.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Da).negate(),this.translate(Da.x,Da.y,Da.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new K(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&z(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $i);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)B(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Oa.setFromBufferAttribute(n),this.morphTargetsRelative?(Aa.addVectors(this.boundingBox.min,Oa.min),this.boundingBox.expandByPoint(Aa),Aa.addVectors(this.boundingBox.max,Oa.max),this.boundingBox.expandByPoint(Aa)):(this.boundingBox.expandByPoint(Oa.min),this.boundingBox.expandByPoint(Oa.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&B(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ca);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)B(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new U,1/0);else if(e){let n=this.boundingSphere.center;if(Oa.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];ka.setFromBufferAttribute(n),this.morphTargetsRelative?(Aa.addVectors(Oa.min,ka.min),Oa.expandByPoint(Aa),Aa.addVectors(Oa.max,ka.max),Oa.expandByPoint(Aa)):(Oa.expandByPoint(ka.min),Oa.expandByPoint(ka.max))}Oa.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Aa.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Aa));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Aa.fromBufferAttribute(a,t),o&&(Da.fromBufferAttribute(e,t),Aa.add(Da)),r=Math.max(r,n.distanceToSquared(Aa))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&B(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){B(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new _a(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new U,s[e]=new U;let c=new U,l=new U,u=new U,d=new H,f=new H,p=new H,m=new U,h=new U;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new U,y=new U,b=new U,x=new U;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new _a(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new U,i=new U,a=new U,o=new U,s=new U,c=new U,l=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Aa.fromBufferAttribute(e,t),Aa.normalize(),e.setXYZ(t,Aa.x,Aa.y,Aa.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new _a(a,r,i)}if(this.index===null)return z(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ma=new U,Na=new U,Pa=new W,Fa=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ma.subVectors(n,t).cross(Na.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Ma),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Pa.getNormalMatrix(e),r=this.coplanarPoint(Ma).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Ia=0,La=class extends or{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ia++}),this.uuid=dr(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new G(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kn,this.stencilZFail=Kn,this.stencilZPass=Kn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){z(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?z(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new G().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Fa().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new H().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new H().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Ra=new U,za=new U,Ba=new U,Va=new U,Ha=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ra)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ra.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ra.copy(this.origin).addScaledVector(this.direction,t),Ra.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){za.copy(e).add(t).multiplyScalar(.5),Ba.copy(t).sub(e).normalize(),Va.copy(this.origin).sub(za);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Ba),o=Va.dot(this.direction),s=-Va.dot(Ba),c=Va.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(za).addScaledVector(Ba,d),f}intersectSphere(e,t){if(e.radius<0)return null;Ra.subVectors(e.center,this.origin);let n=Ra.dot(this.direction),r=Ra.dot(Ra)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Ra)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,ee,M;if(y>=b&&y>=x?(w=s,D=u,A=p,M=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,ee=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,ee=_)):b>=x?(w=c,D=d,A=m,M=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,ee=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,ee=v)):(w=l,D=f,A=h,M=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,ee=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,ee=g)),w===0)return null;let te=S/w,ne=C/w,re=1/w,ie=T-te*D,ae=E-ne*D,oe=O-te*A,se=k-ne*A,N=j-te*M,ce=ee-ne*M,le=N*se-ce*oe,ue=ie*ce-ae*N,de=oe*ae-se*ie;if(r){if(le<0||ue<0||de<0)return null}else if((le<0||ue<0||de<0)&&(le>0||ue>0||de>0))return null;let fe=le+ue+de;if(fe===0)return null;let pe=re*(le*D+ue*A+de*M);return(fe>0?pe<0:pe>0)?null:this.at(pe/fe,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ua=class extends La{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new G(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Wa=new ni,Ga=new Ha,Ka=new Ca,qa=new U,Ja=new U,Ya=new U,Xa=new U,Za=new U,Qa=new U,$a=new U,eo=new U,q=class extends ki{constructor(e=new ja,t=new Ua){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Qa.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Za.fromBufferAttribute(s,e),a?Qa.addScaledVector(Za,r):Qa.addScaledVector(Za.sub(t),r))}t.add(Qa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ka.copy(n.boundingSphere),Ka.applyMatrix4(i),Ga.copy(e.ray).recast(e.near),!(Ka.containsPoint(Ga.origin)===!1&&(Ga.intersectSphere(Ka,qa)===null||Ga.origin.distanceToSquared(qa)>(e.far-e.near)**2))&&(Wa.copy(i).invert(),Ga.copy(e.ray).applyMatrix4(Wa),(n.boundingBox===null||Ga.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Ga)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=no(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=no(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=no(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=no(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function to(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;eo.copy(s),eo.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(eo);return l<n.near||l>n.far?null:{distance:l,point:eo.clone(),object:e}}function no(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Ja),e.getVertexPosition(c,Ya),e.getVertexPosition(l,Xa);let u=to(e,t,n,r,Ja,Ya,Xa,$a);if(u){let e=new U;Qi.getBarycoord($a,Ja,Ya,Xa,e),i&&(u.uv=Qi.getInterpolatedAttribute(i,s,c,l,e,new H)),a&&(u.uv1=Qi.getInterpolatedAttribute(a,s,c,l,e,new H)),o&&(u.normal=Qi.getInterpolatedAttribute(o,s,c,l,e,new U),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new U,materialIndex:0};Qi.getNormal(Ja,Ya,Xa,t.normal),u.face=t,u.barycoord=e}return u}var ro=class extends Xr{constructor(e=null,t=1,n=1,r,i,a,o,s,c=St,l=St,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},io=class extends _a{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ao=new ni,oo=new ni,so=[],co=new $i,lo=new ni,uo=new q,fo=new Ca,po=class extends q{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new io(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,lo)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new $i),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ao),co.copy(e.boundingBox).applyMatrix4(ao),this.boundingBox.union(co)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ca),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ao),fo.copy(e.boundingSphere).applyMatrix4(ao),this.boundingSphere.union(fo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(uo.geometry=this.geometry,uo.material=this.material,uo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fo.copy(this.boundingSphere),fo.applyMatrix4(n),e.ray.intersectsSphere(fo)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,ao),oo.multiplyMatrices(n,ao),uo.matrixWorld=oo,uo.raycast(e,so);for(let e=0,n=so.length;e<n;e++){let n=so[e];n.instanceId=i,n.object=this,t.push(n)}so.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new io(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ro(new Float32Array(r*this.count),r,this.count,Kt,Pt));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},mo=new Ca,ho=new H(.5,.5),go=new U,_o=class{constructor(e=new Fa,t=new Fa,n=new Fa,r=new Fa,i=new Fa,a=new Fa){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Yn,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),mo.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),mo.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(mo)}intersectsSprite(e){return mo.center.set(0,0,0),mo.radius=.7071067811865476+ho.distanceTo(e.center),mo.applyMatrix4(e.matrixWorld),this.intersectsSphere(mo)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(go.x=r.normal.x>0?e.max.x:e.min.x,go.y=r.normal.y>0?e.max.y:e.min.y,go.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(go)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},vo=class extends La{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new G(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},yo=new U,bo=new U,xo=new ni,So=new Ha,Co=new Ca,wo=new U,To=new U,Eo=class extends ki{constructor(e=new ja,t=new vo){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)yo.fromBufferAttribute(t,e-1),bo.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=yo.distanceTo(bo);e.setAttribute(`lineDistance`,new K(n,1))}else z(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Co.copy(n.boundingSphere),Co.applyMatrix4(r),Co.radius+=i,e.ray.intersectsSphere(Co)===!1)return;xo.copy(r).invert(),So.copy(e.ray).applyMatrix4(xo);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Do(this,e,So,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Do(this,e,So,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Do(this,e,So,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Do(this,e,So,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Do(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(yo.fromBufferAttribute(s,i),bo.fromBufferAttribute(s,a),n.distanceSqToSegment(yo,bo,wo,To)>r)return;wo.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(wo);if(!(c<t.near||c>t.far))return{distance:c,point:To.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Oo=new U,ko=new U,Ao=class extends Eo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Oo.fromBufferAttribute(t,e),ko.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Oo.distanceTo(ko);e.setAttribute(`lineDistance`,new K(n,1))}else z(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},jo=class extends Xr{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Mo=class extends Xr{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},No=class extends Xr{constructor(e,t,n=Nt,r,i,a,o=St,s=St,c,l=Wt,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Kr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Po=class extends No{constructor(e,t=Nt,n=301,r,i,a=St,o=St,s,c=Wt){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Fo=class extends Xr{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Io=class e extends ja{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new K(c,3)),this.setAttribute(`normal`,new K(l,3)),this.setAttribute(`uv`,new K(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new U;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Lo=class e extends ja{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new U,g=new U;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new K(o,3)),this.setAttribute(`normal`,new K(s,3)),this.setAttribute(`uv`,new K(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},Ro=class e extends ja{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new U,l=new H;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new K(a,3)),this.setAttribute(`normal`,new K(o,3)),this.setAttribute(`uv`,new K(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},zo=class e extends ja{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new K(u,3)),this.setAttribute(`normal`,new K(d,3)),this.setAttribute(`uv`,new K(f,2));function _(){let a=new U,_=new U,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new H,m=new U,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Bo=class e extends zo{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Vo=class e extends ja{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new K(i,3)),this.setAttribute(`normal`,new K(i.slice(),3)),this.setAttribute(`uv`,new K(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new U,r=new U,i=new U;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new U;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new U;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new U,t=new U,n=new U,r=new U,o=new H,s=new H,c=new H;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Ho=class e extends Vo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Uo=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){z(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new H:new U);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new U,r=[],i=[],a=[],o=new U,s=new ni;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new U)}i[0]=new U,a[0]=new U;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(V(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(V(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Wo=class extends Uo{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new H){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Go=class extends Wo{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Ko(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var qo=new U,Jo=new U,Yo=new Ko,Xo=new Ko,Zo=new Ko,Qo=class extends Uo{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new U){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Jo.subVectors(r[0],r[1]).add(r[0]),c=Jo);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(qo.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=qo),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Yo.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Xo.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Zo.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Yo.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Xo.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Zo.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Yo.calc(s),Xo.calc(s),Zo.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new U().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function $o(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function es(e,t){let n=1-e;return n*n*t}function ts(e,t){return 2*(1-e)*e*t}function ns(e,t){return e*e*t}function rs(e,t,n,r){return es(e,t)+ts(e,n)+ns(e,r)}function is(e,t){let n=1-e;return n*n*n*t}function as(e,t){let n=1-e;return 3*n*n*e*t}function os(e,t){return 3*(1-e)*e*e*t}function ss(e,t){return e*e*e*t}function cs(e,t,n,r,i){return is(e,t)+as(e,n)+os(e,r)+ss(e,i)}var ls=class extends Uo{constructor(e=new H,t=new H,n=new H,r=new H){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(cs(e,r.x,i.x,a.x,o.x),cs(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},us=class extends Uo{constructor(e=new U,t=new U,n=new U,r=new U){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(cs(e,r.x,i.x,a.x,o.x),cs(e,r.y,i.y,a.y,o.y),cs(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ds=class extends Uo{constructor(e=new H,t=new H){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new H){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new H){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fs=class extends Uo{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ps=class extends Uo{constructor(e=new H,t=new H,n=new H){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(rs(e,r.x,i.x,a.x),rs(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ms=class extends Uo{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(rs(e,r.x,i.x,a.x),rs(e,r.y,i.y,a.y),rs(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},hs=class extends Uo{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new H){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set($o(o,s.x,c.x,l.x,u.x),$o(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new H().fromArray(n))}return this}},gs=Object.freeze({__proto__:null,ArcCurve:Go,CatmullRomCurve3:Qo,CubicBezierCurve:ls,CubicBezierCurve3:us,EllipseCurve:Wo,LineCurve:ds,LineCurve3:fs,QuadraticBezierCurve:ps,QuadraticBezierCurve3:ms,SplineCurve:hs}),_s=class extends Uo{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new gs[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new gs[n.type]().fromJSON(n))}return this}},vs=class extends _s{constructor(e){super(),this.type=`Path`,this.currentPoint=new H,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ds(this.currentPoint.clone(),new H(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new ps(this.currentPoint.clone(),new H(e,t),new H(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new ls(this.currentPoint.clone(),new H(e,t),new H(n,r),new H(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new hs([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Wo(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ys=class extends vs{constructor(e){super(e),this.uuid=dr(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new vs().fromJSON(n))}return this}};function bs(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=xs(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=Os(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return Cs(a,o,n,s,c,l,0),o}function xs(e,t,n,r,i){let a;if(i===Qs(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=Ys(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=Ys(i/r|0,e[i],e[i+1],a);return a&&Vs(a,a.next)&&(Xs(a),a=a.next),a}function Ss(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Vs(n,n.next)||Bs(n.prev,n,n.next)===0)){if(Xs(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Cs(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Ns(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?Ts(e,r,i,a):ws(e))t.push(c.i,e.i,l.i),Xs(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=Es(Ss(e),t),Cs(e,t,n,r,i,a,2)):o===2&&Ds(e,t,n,r,i,a):Cs(Ss(e),t,n,r,i,a,1);break}}}function ws(e){let t=e.prev,n=e,r=e.next;if(Bs(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Rs(i,s,a,c,o,l,m.x,m.y)&&Bs(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Ts(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Bs(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Fs(p,m,t,n,r),v=Fs(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Rs(s,u,c,d,l,f,y.x,y.y)&&Bs(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Rs(s,u,c,d,l,f,b.x,b.y)&&Bs(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Rs(s,u,c,d,l,f,y.x,y.y)&&Bs(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Rs(s,u,c,d,l,f,b.x,b.y)&&Bs(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Es(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Vs(r,i)&&Hs(r,n,n.next,i)&&Ks(r,i)&&Ks(i,r)&&(t.push(r.i,n.i,i.i),Xs(n),Xs(n.next),n=e=i),n=n.next}while(n!==e);return Ss(n)}function Ds(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&zs(o,e)){let s=Js(o,e);o=Ss(o,o.next),s=Ss(s,s.next),Cs(o,t,n,r,i,a,0),Cs(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function Os(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=xs(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(Is(o))}i.sort(ks);for(let e=0;e<i.length;e++)n=As(i[e],n);return n}function ks(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function As(e,t){let n=js(e,t);if(!n)return t;let r=Js(n,e);return Ss(r,r.next),Ss(n,n.next)}function js(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Vs(e,n))return n;do{if(Vs(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&Ls(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Ks(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&Ms(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function Ms(e,t){return Bs(e.prev,e,t.prev)<0&&Bs(t.next,e,e.next)<0}function Ns(e,t,n,r){let i=e;do i.z===0&&(i.z=Fs(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,Ps(i)}function Ps(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function Fs(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Is(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Ls(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Rs(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&Ls(e,t,n,r,i,a,o,s)}function zs(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Gs(e,t)&&(Ks(e,t)&&Ks(t,e)&&qs(e,t)&&(Bs(e.prev,e,t.prev)||Bs(e,t.prev,t))||Vs(e,t)&&Bs(e.prev,e,e.next)>0&&Bs(t.prev,t,t.next)>0)}function Bs(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Vs(e,t){return e.x===t.x&&e.y===t.y}function Hs(e,t,n,r){let i=Ws(Bs(e,t,n)),a=Ws(Bs(e,t,r)),o=Ws(Bs(n,r,e)),s=Ws(Bs(n,r,t));return!!(i!==a&&o!==s||i===0&&Us(e,n,t)||a===0&&Us(e,r,t)||o===0&&Us(n,e,r)||s===0&&Us(n,t,r))}function Us(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Ws(e){return e>0?1:e<0?-1:0}function Gs(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&Hs(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Ks(e,t){return Bs(e.prev,e,e.next)<0?Bs(e,t,e.next)>=0&&Bs(e,e.prev,t)>=0:Bs(e,t,e.prev)<0||Bs(e,e.next,t)<0}function qs(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Js(e,t){let n=Zs(e.i,e.x,e.y),r=Zs(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Ys(e,t,n,r){let i=Zs(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Xs(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Zs(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Qs(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var $s=class{static triangulate(e,t,n=2){return bs(e,t,n)}},ec=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];tc(e),nc(n,e);let a=e.length;t.forEach(tc);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,nc(n,t[e]);let o=$s.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function tc(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function nc(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var rc=class e extends ja{constructor(e=new ys([new H(.5,.5),new H(-.5,.5),new H(-.5,-.5),new H(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new K(r,3)),this.setAttribute(`uv`,new K(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?ic:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new U,b=new U,x=new U}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!ec.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];ec.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));s<=10000000000000001e-36*c*c?(e.splice(r,1),n--):t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||B(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new H(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new H(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let ee=[],M,te=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];M=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),M[e]=A(t[e],t[r],t[i]);ee.push(M),te=te.concat(M)}let ne;if(p===0)ne=ec.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);N(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];M=ee[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],M[e],a);N(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}ne=ec.triangulateShape(e,t)}let re=ne.length,ie=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],te[e],ie):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),N(x.x,x.y,x.z)):N(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],te[t],ie):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),N(x.x,x.y,x.z)):N(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);N(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];M=ee[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],M[e],r);_?N(i.x,i.y+g[s-1].y,g[s-1].x+n):N(i.x,i.y,c+n)}}}ae(),oe();function ae(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<re;e++){let n=ne[e];ce(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<re;e++){let n=ne[e];ce(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<re;e++){let t=ne[e];ce(t[2],t[1],t[0])}for(let e=0;e<re;e++){let t=ne[e];ce(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function oe(){let e=r.length/3,t=0;se(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];se(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function se(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);le(t+r+n,t+i+n,t+i+a,t+r+a)}}}function N(e,t,n){a.push(e),a.push(t),a.push(n)}function ce(e,t,i){ue(e),ue(t),ue(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);de(o[0]),de(o[1]),de(o[2])}function le(e,t,i,a){ue(e),ue(t),ue(a),ue(t),ue(i),ue(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);de(s[0]),de(s[1]),de(s[3]),de(s[1]),de(s[2]),de(s[3])}function ue(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function de(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return ac(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new gs[i.type]().fromJSON(i)),new e(r,t.options)}},ic={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new H(a,o),new H(s,c),new H(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new H(o,1-c),new H(l,1-d),new H(f,1-m),new H(h,1-_)]:[new H(s,1-c),new H(u,1-d),new H(p,1-m),new H(g,1-_)]}};function ac(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var oc=class e extends Vo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},sc=class e extends Vo{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},cc=class e extends ja{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new K(p,3)),this.setAttribute(`normal`,new K(m,3)),this.setAttribute(`uv`,new K(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},lc=class e extends ja{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new U,p=new H;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new K(s,3)),this.setAttribute(`normal`,new K(c,3)),this.setAttribute(`uv`,new K(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},uc=class e extends ja{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new U,d=new U,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new K(p,3)),this.setAttribute(`normal`,new K(m,3)),this.setAttribute(`uv`,new K(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},dc=class e extends ja{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new U,f=new U,p=new U;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new K(c,3)),this.setAttribute(`normal`,new K(l,3)),this.setAttribute(`uv`,new K(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},fc=class e extends ja{constructor(e=new ms(new U(-1,-1,0),new U(-1,1,0),new U(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new U,s=new U,c=new H,l=new U,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new K(u,3)),this.setAttribute(`normal`,new K(d,3)),this.setAttribute(`uv`,new K(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new gs[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}},pc=class extends ja{constructor(e=null){if(super(),this.type=`WireframeGeometry`,this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new U,i=new U;if(e.index!==null){let a=e.attributes.position,o=e.index,s=e.groups;s.length===0&&(s=[{start:0,count:o.count,materialIndex:0}]);for(let e=0,c=s.length;e<c;++e){let c=s[e],l=c.start,u=c.count;for(let e=l,s=l+u;e<s;e+=3)for(let s=0;s<3;s++){let c=o.getX(e+s),l=o.getX(e+(s+1)%3);r.fromBufferAttribute(a,c),i.fromBufferAttribute(a,l),mc(r,i,n)===!0&&(t.push(r.x,r.y,r.z),t.push(i.x,i.y,i.z))}}}else{let a=e.attributes.position;for(let e=0,o=a.count/3;e<o;e++)for(let o=0;o<3;o++){let s=3*e+o,c=3*e+(o+1)%3;r.fromBufferAttribute(a,s),i.fromBufferAttribute(a,c),mc(r,i,n)===!0&&(t.push(r.x,r.y,r.z),t.push(i.x,i.y,i.z))}}this.setAttribute(`position`,new K(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function mc(e,t,n){let r=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;return n.has(r)===!0||n.has(i)===!0?!1:(n.add(r),n.add(i),!0)}function hc(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(_c(i))i.isRenderTargetTexture?(z(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(_c(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function gc(e){let t={};for(let n=0;n<e.length;n++){let r=hc(e[n]);for(let e in r)t[e]=r[e]}return t}function _c(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function vc(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function yc(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Br.workingColorSpace}var bc={clone:hc,merge:gc},xc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Cc=class extends La{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xc,this.fragmentShader=Sc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hc(e.uniforms),this.uniformsGroups=vc(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new G().setHex(r.value);break;case`v2`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Zr().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new ni().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},wc=class extends Cc{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Tc=class extends La{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new G(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ec=class extends Tc{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new H(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return V(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new G(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new G(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new G(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Dc=class extends La{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new G(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Oc=class extends La{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Vn,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},kc=class extends La{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ac(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function jc(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Mc=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Nc=class extends Mc{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Rn,endingEnd:Rn}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case zn:i=e,o=2*t-n;break;case Bn:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case zn:a=e,s=2*n-t;break;case Bn:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Pc=class extends Mc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Fc=class extends Mc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ic=class extends Mc{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=zc(n,t,g,y,r);i[p]=Lc(x,o,_,b,m)}return i}};function Lc(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Rc(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function zc(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Lc(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Rc(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Bc=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Ac(t,this.TimeBufferType),this.values=Ac(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ac(e.times,Array),values:Ac(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),jc(e.settings)&&(n.settings={inTangents:Ac(e.settings.inTangents,Array),outTangents:Ac(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Fc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Pc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Nc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ic(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Pn:t=this.InterpolantFactoryMethodDiscrete;break;case Fn:t=this.InterpolantFactoryMethodLinear;break;case In:t=this.InterpolantFactoryMethodSmooth;break;case Ln:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return z(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Pn;case this.InterpolantFactoryMethodLinear:return Fn;case this.InterpolantFactoryMethodSmooth:return In;case this.InterpolantFactoryMethodBezier:return Ln}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;jc(this.settings)&&(Vc(this.settings.inTangents,e),Vc(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(B(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(B(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){B(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){B(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Zn(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){B(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===In,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,jc(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Vc(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Bc.prototype.ValueTypeName=``,Bc.prototype.TimeBufferType=Float32Array,Bc.prototype.ValueBufferType=Float32Array,Bc.prototype.DefaultInterpolation=Fn;var Hc=class extends Bc{constructor(e,t,n){super(e,t,n)}};Hc.prototype.ValueTypeName=`bool`,Hc.prototype.ValueBufferType=Array,Hc.prototype.DefaultInterpolation=Pn,Hc.prototype.InterpolantFactoryMethodLinear=void 0,Hc.prototype.InterpolantFactoryMethodSmooth=void 0;var Uc=class extends Bc{constructor(e,t,n,r){super(e,t,n,r)}};Uc.prototype.ValueTypeName=`color`;var Wc=class extends Bc{constructor(e,t,n,r){super(e,t,n,r)}};Wc.prototype.ValueTypeName=`number`;var Gc=class extends Mc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Nr.slerpFlat(i,0,a,c-o,a,c,s);return i}},Kc=class extends Bc{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Gc(this.times,this.values,this.getValueSize(),e)}};Kc.prototype.ValueTypeName=`quaternion`,Kc.prototype.InterpolantFactoryMethodSmooth=void 0;var qc=class extends Bc{constructor(e,t,n){super(e,t,n)}};qc.prototype.ValueTypeName=`string`,qc.prototype.ValueBufferType=Array,qc.prototype.DefaultInterpolation=Pn,qc.prototype.InterpolantFactoryMethodLinear=void 0,qc.prototype.InterpolantFactoryMethodSmooth=void 0;var Jc=class extends Bc{constructor(e,t,n,r){super(e,t,n,r)}};Jc.prototype.ValueTypeName=`vector`;var Yc=class extends ki{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new G(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Xc=class extends Yc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(ki.DEFAULT_UP),this.updateMatrix(),this.groundColor=new G(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Zc=new ni,Qc=new U,$c=new U,el=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new H(512,512),this.mapType=Ot,this.map=null,this.mapPass=null,this.matrix=new ni,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _o,this._frameExtents=new H(1,1),this._viewportCount=1,this._viewports=[new Zr(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Qc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Qc),$c.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($c),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Zc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Zc,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Zc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},tl=new U,nl=new Nr,rl=new U,il=class extends ki{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new ni,this.projectionMatrix=new ni,this.projectionMatrixInverse=new ni,this.coordinateSystem=Yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(tl,nl,rl),rl.x===1&&rl.y===1&&rl.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(tl,nl,rl.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(tl,nl,rl),rl.x===1&&rl.y===1&&rl.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(tl,nl,rl.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},al=new U,ol=new H,sl=new H,cl=class extends il{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ur*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(lr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ur*2*Math.atan(Math.tan(lr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){al.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(al.x,al.y).multiplyScalar(-e/al.z),al.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(al.x,al.y).multiplyScalar(-e/al.z)}getViewSize(e,t){return this.getViewBounds(e,ol,sl),t.subVectors(sl,ol)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(lr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ll=class extends el{constructor(){super(new cl(90,1,.5,500)),this.isPointLightShadow=!0}},ul=class extends Yc{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new ll}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},dl=class extends il{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},fl=class extends el{constructor(){super(new dl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},pl=class extends Yc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(ki.DEFAULT_UP),this.updateMatrix(),this.target=new ki,this.shadow=new fl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ml=class extends ja{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},hl=-90,gl=1,_l=class extends ki{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new cl(hl,gl,e,t);r.layers=this.layers,this.add(r);let i=new cl(hl,gl,e,t);i.layers=this.layers,this.add(i);let a=new cl(hl,gl,e,t);a.layers=this.layers,this.add(a);let o=new cl(hl,gl,e,t);o.layers=this.layers,this.add(o);let s=new cl(hl,gl,e,t);s.layers=this.layers,this.add(s);let c=new cl(hl,gl,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},vl=class extends cl{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},yl=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=bl.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function bl(){this._document.hidden===!1&&this.reset()}var xl=`\\[\\]\\.:\\/`,Sl=RegExp(`[\\[\\]\\.:\\/]`,`g`),Cl=`[^\\[\\]\\.:\\/]`,wl=`[^`+xl.replace(`\\.`,``)+`]`,Tl=`((?:WC+[\\/:])*)`.replace(`WC`,Cl),El=`(WCOD+)?`.replace(`WCOD`,wl),Dl=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Cl),Ol=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Cl),kl=RegExp(`^`+Tl+El+Dl+Ol+`$`),Al=[`material`,`materials`,`bones`,`map`],jl=class{constructor(e,t,n){let r=n||Ml.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ml=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Sl,``)}static parseTrackName(e){let t=kl.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Al.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){z(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){B(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){B(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){B(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){B(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){B(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;B(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ml.Composite=jl,Ml.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Ml.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Ml.prototype.GetterByBindingType=[Ml.prototype._getValue_direct,Ml.prototype._getValue_array,Ml.prototype._getValue_arrayElement,Ml.prototype._getValue_toArray],Ml.prototype.SetterByBindingTypeAndVersioning=[[Ml.prototype._setValue_direct,Ml.prototype._setValue_direct_setNeedsUpdate,Ml.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ml.prototype._setValue_array,Ml.prototype._setValue_array_setNeedsUpdate,Ml.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ml.prototype._setValue_arrayElement,Ml.prototype._setValue_arrayElement_setNeedsUpdate,Ml.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ml.prototype._setValue_fromArray,Ml.prototype._setValue_fromArray_setNeedsUpdate,Ml.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Nl=new ni,Pl=class{constructor(e,t,n=0,r=1/0){this.ray=new Ha(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new pi,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):B(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return Nl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Nl),this}intersectObject(e,t=!0,n=[]){return Il(e,this,n,t),n.sort(Fl),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Il(e[r],this,n,t);return n.sort(Fl),n}};function Fl(e,t){return e.distance-t.distance}function Il(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Il(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function Ll(e,t,n,r){let i=Rl(r);switch(n){case Vt:return e*t;case Kt:return e*t/i.components*i.byteLength;case qt:return e*t/i.components*i.byteLength;case Jt:return e*t*2/i.components*i.byteLength;case Yt:return e*t*2/i.components*i.byteLength;case Ht:return e*t*3/i.components*i.byteLength;case Ut:return e*t*4/i.components*i.byteLength;case Xt:return e*t*4/i.components*i.byteLength;case Zt:case Qt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case $t:case en:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case nn:case an:return Math.max(e,16)*Math.max(t,8)/4;case tn:case rn:return Math.max(e,8)*Math.max(t,8)/2;case on:case sn:case ln:case un:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case cn:case dn:case fn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case pn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case mn:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case hn:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case gn:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case _n:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case vn:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case yn:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case bn:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case xn:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Sn:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Cn:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case wn:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Tn:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case En:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Dn:case On:case kn:return Math.ceil(e/4)*Math.ceil(t/4)*16;case An:case jn:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Mn:case Nn:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Rl(e){switch(e){case Ot:case kt:return{byteLength:1,components:1};case jt:case At:case Ft:return{byteLength:2,components:1};case It:case Lt:return{byteLength:2,components:4};case Nt:case Mt:case Pt:return{byteLength:4,components:1};case zt:case Bt:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?z(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function zl(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Bl(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var J={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Y={common:{diffuse:{value:new G(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new W}},envmap:{envMap:{value:null},envMapRotation:{value:new W},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new W}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new W}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new W},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new W},normalScale:{value:new H(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new W},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new W}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new W}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new W}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new G(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new G(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0},uvTransform:{value:new W}},sprite:{diffuse:{value:new G(16777215)},opacity:{value:1},center:{value:new H(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}}},Vl={basic:{uniforms:gc([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.fog]),vertexShader:J.meshbasic_vert,fragmentShader:J.meshbasic_frag},lambert:{uniforms:gc([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new G(0)},envMapIntensity:{value:1}}]),vertexShader:J.meshlambert_vert,fragmentShader:J.meshlambert_frag},phong:{uniforms:gc([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new G(0)},specular:{value:new G(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:J.meshphong_vert,fragmentShader:J.meshphong_frag},standard:{uniforms:gc([Y.common,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.roughnessmap,Y.metalnessmap,Y.fog,Y.lights,{emissive:{value:new G(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:J.meshphysical_vert,fragmentShader:J.meshphysical_frag},toon:{uniforms:gc([Y.common,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.gradientmap,Y.fog,Y.lights,{emissive:{value:new G(0)}}]),vertexShader:J.meshtoon_vert,fragmentShader:J.meshtoon_frag},matcap:{uniforms:gc([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,{matcap:{value:null}}]),vertexShader:J.meshmatcap_vert,fragmentShader:J.meshmatcap_frag},points:{uniforms:gc([Y.points,Y.fog]),vertexShader:J.points_vert,fragmentShader:J.points_frag},dashed:{uniforms:gc([Y.common,Y.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:J.linedashed_vert,fragmentShader:J.linedashed_frag},depth:{uniforms:gc([Y.common,Y.displacementmap]),vertexShader:J.depth_vert,fragmentShader:J.depth_frag},normal:{uniforms:gc([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,{opacity:{value:1}}]),vertexShader:J.meshnormal_vert,fragmentShader:J.meshnormal_frag},sprite:{uniforms:gc([Y.sprite,Y.fog]),vertexShader:J.sprite_vert,fragmentShader:J.sprite_frag},background:{uniforms:{uvTransform:{value:new W},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:J.background_vert,fragmentShader:J.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new W}},vertexShader:J.backgroundCube_vert,fragmentShader:J.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:J.cube_vert,fragmentShader:J.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:J.equirect_vert,fragmentShader:J.equirect_frag},distance:{uniforms:gc([Y.common,Y.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:J.distance_vert,fragmentShader:J.distance_frag},shadow:{uniforms:gc([Y.lights,Y.fog,{color:{value:new G(0)},opacity:{value:1}}]),vertexShader:J.shadow_vert,fragmentShader:J.shadow_frag}};Vl.physical={uniforms:gc([Vl.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new W},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new W},clearcoatNormalScale:{value:new H(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new W},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new W},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new W},sheen:{value:0},sheenColor:{value:new G(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new W},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new W},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new W},transmissionSamplerSize:{value:new H},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new W},attenuationDistance:{value:0},attenuationColor:{value:new G(0)},specularColor:{value:new G(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new W},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new W},anisotropyVector:{value:new H},anisotropyMap:{value:null},anisotropyMapTransform:{value:new W}}]),vertexShader:J.meshphysical_vert,fragmentShader:J.meshphysical_frag};var Hl={r:0,b:0,g:0},Ul=new ni,Wl=new W;Wl.set(-1,0,0,0,1,0,0,0,1);function Gl(e,t,n,r,i,a){let o=new G(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new q(new Io(1,1,1),new Cc({name:`BackgroundCubeMaterial`,uniforms:hc(Vl.backgroundCube.uniforms),vertexShader:Vl.backgroundCube.vertexShader,fragmentShader:Vl.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ul.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Wl),l.material.toneMapped=Br.getTransfer(i.colorSpace)!==Gn,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new q(new cc(2,2),new Cc({name:`BackgroundMaterial`,uniforms:hc(Vl.background.uniforms),vertexShader:Vl.background.vertexShader,fragmentShader:Vl.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Br.getTransfer(i.colorSpace)!==Gn,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Hl,yc(e)),n.buffers.color.setClear(Hl.r,Hl.g,Hl.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Kl(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function ql(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Jl(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(z(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&z(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Yl(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Fa,s=new W,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Xl=4,Zl=6,Ql=20,$l=256,eu=new dl,tu=new G,nu=null,ru=0,iu=0,au=!1,ou=new U,su=new U,cu=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=ou}=i;nu=this._renderer.getRenderTarget(),ru=this._renderer.getActiveCubeFace(),iu=this._renderer.getActiveMipmapLevel(),au=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(nu,ru,iu),this._renderer.xr.enabled=au,e.scissorTest=!1,du(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),nu=this._renderer.getRenderTarget(),ru=this._renderer.getActiveCubeFace(),iu=this._renderer.getActiveMipmapLevel(),au=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Tt,minFilter:Tt,generateMipmaps:!1,type:Ft,format:Ut,colorSpace:Un,depthBuffer:!1},r=uu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uu(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=lu(r)),this._blurMaterial=pu(r,e,t),this._ggxMaterial=fu(r,e,t)}return r}_compileMaterial(e){let t=new q(new ja,e);this._renderer.compile(t,eu)}_sceneToCubeUV(e,t,n,r,i){let a=new cl(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(tu),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new q(new Io,new Ua({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(tu),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;du(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=hu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mu());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;du(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,eu)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Xl?n-d+Xl:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,du(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,eu),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,du(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,eu)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];du(t,3*l*(r>this._lodMax-Xl?r-this._lodMax+Xl:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,eu)}};function lu(e){let t=[],n=[],r=e,i=e-Xl+1+Zl;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?su.set(1,r,n):e===1?su.set(-n,1,-r):e===2?su.set(-n,r,1):e===3?su.set(-1,r,-n):e===4?su.set(-n,-1,r):su.set(n,r,-1),su.toArray(l,(e*6+t)*3)}}let u=new ja;u.setAttribute(`position`,new _a(c,3)),u.setAttribute(`outputDirection`,new _a(l,3)),n.push(new q(u,null)),r>Xl&&r--}return{lodMeshes:n,sizeLods:t}}function uu(e,t,n){let r=new $r(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function du(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function fu(e,t,n){return new Cc({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:$l,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:gu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function pu(e,t,n){return new Cc({name:`SphericalGaussianBlur`,defines:{SAMPLES:Ql,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:gu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function mu(){return new Cc({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:gu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function hu(){return new Cc({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function gu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var _u=class extends $r{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new jo(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Io(5,5,5),i=new Cc({name:`CubemapFromEquirect`,uniforms:hc(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new q(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Tt),new _l(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function vu(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new _u(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new cu(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new cu(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function yu(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&rr(`WebGLRenderer: `+e+` extension not supported.`),t}}}function bu(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?ya:va)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function xu(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Su(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:B(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Cu(e,t,n){let r=new WeakMap,i=new Zr;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new ei(h,p,m,u);g.type=Pt,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new H(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function wu(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Tu={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Eu(e,t,n,r,i,a){let o=new $r(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new ja;l.setAttribute(`position`,new K([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new K([0,2,0,0,2,0],2));let u=new wc({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new q(l,u),f=new dl(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new $r(t,n,{type:Ft,depthBuffer:!1,stencilBuffer:!1}),c=new $r(t,n,{type:Ft,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Br.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Tu[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Du=new Xr,Ou=new No(1,1),ku=new ei,Au=new ti,ju=new jo,Mu=[],Nu=[],Pu=new Float32Array(16),Fu=new Float32Array(9),Iu=new Float32Array(4);function Lu(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Mu[i];if(a===void 0&&(a=new Float32Array(i),Mu[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Ru(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function zu(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Bu(e,t){let n=Nu[t];n===void 0&&(n=new Int32Array(t),Nu[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Vu(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Hu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ru(n,t))return;e.uniform2fv(this.addr,t),zu(n,t)}}function Uu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ru(n,t))return;e.uniform3fv(this.addr,t),zu(n,t)}}function Wu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ru(n,t))return;e.uniform4fv(this.addr,t),zu(n,t)}}function Gu(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ru(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),zu(n,t)}else{if(Ru(n,r))return;Iu.set(r),e.uniformMatrix2fv(this.addr,!1,Iu),zu(n,r)}}function Ku(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ru(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),zu(n,t)}else{if(Ru(n,r))return;Fu.set(r),e.uniformMatrix3fv(this.addr,!1,Fu),zu(n,r)}}function qu(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ru(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),zu(n,t)}else{if(Ru(n,r))return;Pu.set(r),e.uniformMatrix4fv(this.addr,!1,Pu),zu(n,r)}}function Ju(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Yu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ru(n,t))return;e.uniform2iv(this.addr,t),zu(n,t)}}function Xu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ru(n,t))return;e.uniform3iv(this.addr,t),zu(n,t)}}function Zu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ru(n,t))return;e.uniform4iv(this.addr,t),zu(n,t)}}function Qu(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function $u(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ru(n,t))return;e.uniform2uiv(this.addr,t),zu(n,t)}}function ed(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ru(n,t))return;e.uniform3uiv(this.addr,t),zu(n,t)}}function td(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ru(n,t))return;e.uniform4uiv(this.addr,t),zu(n,t)}}function nd(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Ou.compareFunction=n.isReversedDepthBuffer()?518:515,a=Ou):a=Du,n.setTexture2D(t||a,i)}function rd(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Au,i)}function id(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||ju,i)}function ad(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||ku,i)}function od(e){switch(e){case 5126:return Vu;case 35664:return Hu;case 35665:return Uu;case 35666:return Wu;case 35674:return Gu;case 35675:return Ku;case 35676:return qu;case 5124:case 35670:return Ju;case 35667:case 35671:return Yu;case 35668:case 35672:return Xu;case 35669:case 35673:return Zu;case 5125:return Qu;case 36294:return $u;case 36295:return ed;case 36296:return td;case 35678:case 36198:case 36298:case 36306:case 35682:return nd;case 35679:case 36299:case 36307:return rd;case 35680:case 36300:case 36308:case 36293:return id;case 36289:case 36303:case 36311:case 36292:return ad}}function sd(e,t){e.uniform1fv(this.addr,t)}function cd(e,t){let n=Lu(t,this.size,2);e.uniform2fv(this.addr,n)}function ld(e,t){let n=Lu(t,this.size,3);e.uniform3fv(this.addr,n)}function ud(e,t){let n=Lu(t,this.size,4);e.uniform4fv(this.addr,n)}function dd(e,t){let n=Lu(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function fd(e,t){let n=Lu(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function pd(e,t){let n=Lu(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function md(e,t){e.uniform1iv(this.addr,t)}function hd(e,t){e.uniform2iv(this.addr,t)}function gd(e,t){e.uniform3iv(this.addr,t)}function _d(e,t){e.uniform4iv(this.addr,t)}function vd(e,t){e.uniform1uiv(this.addr,t)}function yd(e,t){e.uniform2uiv(this.addr,t)}function bd(e,t){e.uniform3uiv(this.addr,t)}function xd(e,t){e.uniform4uiv(this.addr,t)}function Sd(e,t,n){let r=this.cache,i=t.length,a=Bu(n,i);Ru(r,a)||(e.uniform1iv(this.addr,a),zu(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Ou:Du;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Cd(e,t,n){let r=this.cache,i=t.length,a=Bu(n,i);Ru(r,a)||(e.uniform1iv(this.addr,a),zu(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Au,a[e])}function wd(e,t,n){let r=this.cache,i=t.length,a=Bu(n,i);Ru(r,a)||(e.uniform1iv(this.addr,a),zu(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||ju,a[e])}function Td(e,t,n){let r=this.cache,i=t.length,a=Bu(n,i);Ru(r,a)||(e.uniform1iv(this.addr,a),zu(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||ku,a[e])}function Ed(e){switch(e){case 5126:return sd;case 35664:return cd;case 35665:return ld;case 35666:return ud;case 35674:return dd;case 35675:return fd;case 35676:return pd;case 5124:case 35670:return md;case 35667:case 35671:return hd;case 35668:case 35672:return gd;case 35669:case 35673:return _d;case 5125:return vd;case 36294:return yd;case 36295:return bd;case 36296:return xd;case 35678:case 36198:case 36298:case 36306:case 35682:return Sd;case 35679:case 36299:case 36307:return Cd;case 35680:case 36300:case 36308:case 36293:return wd;case 36289:case 36303:case 36311:case 36292:return Td}}var Dd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=od(t.type)}},Od=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ed(t.type)}},kd=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Ad=/(\w+)(\])?(\[|\.)?/g;function jd(e,t){e.seq.push(t),e.map[t.id]=t}function Md(e,t,n){let r=e.name,i=r.length;for(Ad.lastIndex=0;;){let a=Ad.exec(r),o=Ad.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){jd(n,l===void 0?new Dd(s,e,t):new Od(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new kd(s),jd(n,e)),n=e}}}var Nd=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Md(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Pd(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Fd=37297,Id=0;function Ld(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Rd=new W;function zd(e){Br._getMatrix(Rd,Br.workingColorSpace,e);let t=`mat3( ${Rd.elements.map(e=>e.toFixed(4))} )`;switch(Br.getTransfer(e)){case Wn:return[t,`LinearTransferOETF`];case Gn:return[t,`sRGBTransferOETF`];default:return z(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Bd(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Ld(e.getShaderSource(t),r)}return i}function Vd(e,t){let n=zd(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Hd={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Ud(e,t){let n=Hd[t];return n===void 0?(z(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Wd=new U;function Gd(){return Br.getLuminanceCoefficients(Wd),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Wd.x.toFixed(4)}, ${Wd.y.toFixed(4)}, ${Wd.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Kd(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Yd).join(`
`)}function qd(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Jd(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Yd(e){return e!==``}function Xd(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Zd(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Qd=/^[ \t]*#include +<([\w\d./]+)>/gm;function $d(e){return e.replace(Qd,tf)}var ef=new Map;function tf(e,t){let n=J[t];if(n===void 0){let e=ef.get(t);if(e!==void 0)n=J[e],z(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return $d(n)}var nf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rf(e){return e.replace(nf,af)}function af(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function of(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var sf={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function cf(e){return sf[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var lf={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function uf(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:lf[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var df={302:`ENVMAP_MODE_REFRACTION`};function ff(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:df[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var pf={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function mf(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:pf[e.combine]||`ENVMAP_BLENDING_NONE`}function hf(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function gf(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=cf(n),l=uf(n),u=ff(n),d=mf(n),f=hf(n),p=Kd(n),m=qd(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Yd).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Yd).join(`
`),_.length>0&&(_+=`
`)):(g=[of(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Yd).join(`
`),_=[of(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:J.tonemapping_pars_fragment,n.toneMapping===0?``:Ud(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,J.colorspace_pars_fragment,Vd(`linearToOutputTexel`,n.outputColorSpace),Gd(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Yd).join(`
`)),o=$d(o),o=Xd(o,n),o=Zd(o,n),s=$d(s),s=Xd(s,n),s=Zd(s,n),o=rf(o),s=rf(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Pd(i,i.VERTEX_SHADER,y),S=Pd(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Bd(i,x,`vertex`),n=Bd(i,S,`fragment`);B(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):z(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Nd(i,h),T=Jd(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Fd)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Id++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var _f=0,vf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new yf(e),t.set(e,n)),n}},yf=class{constructor(e){this.id=_f++,this.code=e,this.usedTimes=0}};function bf(e){return e===1030||e===37490||e===36285}function xf(e,t,n,r,i,a){let o=new pi,s=new vf,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&z(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Vl[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),ee=e.state.buffers.depth.getReversed(),M=h.isInstancedMesh===!0,te=h.isBatchedMesh===!0,ne=!!i.map,re=!!i.matcap,ie=!!x,ae=!!i.aoMap,oe=!!i.lightMap,se=!!i.bumpMap&&i.wireframe===!1,N=!!i.normalMap,ce=!!i.displacementMap,le=!!i.emissiveMap,ue=!!i.metalnessMap,de=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.dispersion>0,he=i.retroreflectivity>0,ge=i.iridescence>0,_e=i.sheen>0,ve=i.transmission>0,ye=fe&&!!i.anisotropyMap,be=pe&&!!i.clearcoatMap,xe=pe&&!!i.clearcoatNormalMap,Se=pe&&!!i.clearcoatRoughnessMap,Ce=ge&&!!i.iridescenceMap,P=ge&&!!i.iridescenceThicknessMap,we=_e&&!!i.sheenColorMap,Te=_e&&!!i.sheenRoughnessMap,Ee=!!i.specularMap,F=!!i.specularColorMap,De=!!i.specularIntensityMap,I=ve&&!!i.transmissionMap,L=ve&&!!i.thicknessMap,Oe=!!i.gradientMap,ke=!!i.alphaMap,Ae=i.alphaTest>0,je=!!i.alphaHash,Me=!!i.extensions,Ne=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ne=e.toneMapping);let Pe={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:te,batchingColor:te&&h._colorsTexture!==null,instancing:M,instancingColor:M&&h.instanceColor!==null,instancingMorph:M&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Br.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ne,matcap:re,envMap:ie,envMapMode:ie&&x.mapping,envMapCubeUVHeight:S,aoMap:ae,lightMap:oe,bumpMap:se,normalMap:N,displacementMap:ce,emissiveMap:le,normalMapObjectSpace:N&&i.normalMapType===1,normalMapTangentSpace:N&&i.normalMapType===0,packedNormalMap:N&&i.normalMapType===0&&bf(i.normalMap.format),metalnessMap:ue,roughnessMap:de,anisotropy:fe,anisotropyMap:ye,clearcoat:pe,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,dispersion:me,retroreflection:he,iridescence:ge,iridescenceMap:Ce,iridescenceThicknessMap:P,sheen:_e,sheenColorMap:we,sheenRoughnessMap:Te,specularMap:Ee,specularColorMap:F,specularIntensityMap:De,transmission:ve,transmissionMap:I,thicknessMap:L,gradientMap:Oe,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:ke,alphaTest:Ae,alphaHash:je,combine:i.combine,mapUv:ne&&m(i.map.channel),aoMapUv:ae&&m(i.aoMap.channel),lightMapUv:oe&&m(i.lightMap.channel),bumpMapUv:se&&m(i.bumpMap.channel),normalMapUv:N&&m(i.normalMap.channel),displacementMapUv:ce&&m(i.displacementMap.channel),emissiveMapUv:le&&m(i.emissiveMap.channel),metalnessMapUv:ue&&m(i.metalnessMap.channel),roughnessMapUv:de&&m(i.roughnessMap.channel),anisotropyMapUv:ye&&m(i.anisotropyMap.channel),clearcoatMapUv:be&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:P&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:we&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Te&&m(i.sheenRoughnessMap.channel),specularMapUv:Ee&&m(i.specularMap.channel),specularColorMapUv:F&&m(i.specularColorMap.channel),specularIntensityMapUv:De&&m(i.specularIntensityMap.channel),transmissionMapUv:I&&m(i.transmissionMap.channel),thicknessMapUv:L&&m(i.thicknessMap.channel),alphaMapUv:ke&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(N||fe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ne||ke),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&N===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ne,decodeVideoTexture:ne&&i.map.isVideoTexture===!0&&Br.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:le&&i.emissiveMap.isVideoTexture===!0&&Br.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Me&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Me&&i.extensions.multiDraw===!0||te)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Vl[t];n=bc.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new gf(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Sf(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Cf(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function wf(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Tf(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Cf),r.length>1&&r.sort(t||wf),i.length>1&&i.sort(t||wf)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Ef(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Tf,e.set(t,[i])):n>=r.length?(i=new Tf,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Df(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new U,color:new G};break;case`SpotLight`:n={position:new U,direction:new U,color:new G,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new U,color:new G,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new U,skyColor:new G,groundColor:new G};break;case`RectAreaLight`:n={color:new G,position:new U,halfWidth:new U,halfHeight:new U}}return e[t.id]=n,n}}}function Of(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var kf=0;function Af(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function jf(e){let t=new Df,n=Of(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new U);let i=new U,a=new ni,o=new ni;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Af);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Y.LTC_FLOAT_1,r.rectAreaLTC2=Y.LTC_FLOAT_2):(r.rectAreaLTC1=Y.LTC_HALF_1,r.rectAreaLTC2=Y.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=kf++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Mf(e){let t=new jf(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Nf(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Mf(e),t.set(n,[a])):r>=i.length?(a=new Mf(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Pf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ff=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,If=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],Lf=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Rf=new ni,zf=new U,Bf=new U;function Vf(e,t,n){let r=new _o,i=new H,a=new H,o=new Zr,s=new Oc,c=new kc,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new Cc({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H},radius:{value:4}},vertexShader:Pf,fragmentShader:Ff}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new ja;m.setAttribute(`position`,new _a(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new q(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(z(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){z(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){z(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new $r(i.x,i.y,{format:Jt,type:Ft,minFilter:Tt,magFilter:Tt,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new No(i.x,i.y,Pt),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Wt,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=St,d.map.depthTexture.magFilter=St}else l.isPointLight?(d.map=new _u(i.x),d.map.depthTexture=new Po(i.x,Nt)):(d.map=new $r(i.x,i.y),d.map.depthTexture=new No(i.x,i.y,Nt)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Wt,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=Tt,d.map.depthTexture.magFilter=Tt):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=St,d.map.depthTexture.magFilter=St);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),zf.setFromMatrixPosition(l.matrixWorld),e.position.copy(zf),Bf.copy(e.position),Bf.add(If[t]),e.up.copy(Lf[t]),e.lookAt(Bf),e.updateMatrixWorld(),n.makeTranslation(-zf.x,-zf.y,-zf.z),Rf.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Rf,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new $r(i.x,i.y,{format:Jt,type:Ft}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Hf(e,t){function n(){let t=!1,n=new Zr,r=null,i=new Zr(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ue(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=ar[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ue(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new G(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,te=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),M=te>=2):(te=parseFloat(/^WebGL (\d)/.exec(ne)[1]),M=te>=1);let re=null,ie={},ae=e.getParameter(e.SCISSOR_BOX),oe=e.getParameter(e.VIEWPORT),se=new Zr().fromArray(ae),N=new Zr().fromArray(oe);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ue(e.DEPTH_TEST),o.setFunc(3),ye(!1),be(1),ue(e.CULL_FACE),_e(0);function ue(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function de(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function fe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function pe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h!==t&&(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(de(e.BLEND),g=!1);else if(g===!1&&(ue(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:B(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:B(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:B(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:B(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ve(t,n){t.side===2?de(e.CULL_FACE):ue(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ye(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ue(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function ye(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function be(t){t===0?de(e.CULL_FACE):(ue(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function xe(t){t!==k&&(M&&e.lineWidth(t),k=t)}function Se(t,n,r){t?(ue(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):de(e.POLYGON_OFFSET_FILL)}function Ce(t){t?ue(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function P(t){t===void 0&&(t=e.TEXTURE0+ee-1),re!==t&&(e.activeTexture(t),re=t)}function we(t,n,r){r===void 0&&(r=re===null?e.TEXTURE0+ee-1:re);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(re!==r&&(e.activeTexture(r),re=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function Te(){let t=ie[re];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ee(){try{e.compressedTexImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function F(){try{e.compressedTexImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function De(){try{e.texSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function I(){try{e.texSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function L(){try{e.compressedTexSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Oe(){try{e.compressedTexSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function ke(){try{e.texStorage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ae(){try{e.texStorage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function je(){try{e.texImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Me(){try{e.texImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ne(t){return d[t]===void 0?e.getParameter(t):d[t]}function Pe(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Fe(t){se.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),se.copy(t))}function Ie(t){N.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),N.copy(t))}function Le(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Re(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function ze(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},re=null,ie={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new G(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,se.set(0,0,e.canvas.width,e.canvas.height),N.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ue,disable:de,bindFramebuffer:fe,drawBuffers:pe,useProgram:me,setBlending:_e,setMaterial:ve,setFlipSided:ye,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:P,bindTexture:we,unbindTexture:Te,compressedTexImage2D:Ee,compressedTexImage3D:F,texImage2D:je,texImage3D:Me,pixelStorei:Pe,getParameter:Ne,updateUBOMapping:Le,uniformBlockBinding:Re,texStorage2D:ke,texStorage3D:Ae,texSubImage2D:De,texSubImage3D:I,compressedTexSubImage2D:L,compressedTexSubImage3D:Oe,scissor:Fe,viewport:Ie,reset:ze}}function Uf(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new H,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):Qn(`canvas`)}function g(e,t,n){let r=1,i=Ee(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),z(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&z(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];z(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||z(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Wn:Br.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,z(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function ee(){let e=O;return e>=i.maxTextures&&z(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function M(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function te(t,i){let a=r.get(t);if(t.isVideoTexture&&we(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)z(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)z(`WebGLRenderer: Texture marked for update but image is incomplete`);else{de(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?de(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function re(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?de(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ie(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?fe(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ae={[yt]:e.REPEAT,[bt]:e.CLAMP_TO_EDGE,[xt]:e.MIRRORED_REPEAT},oe={[St]:e.NEAREST,[Ct]:e.NEAREST_MIPMAP_NEAREST,[wt]:e.NEAREST_MIPMAP_LINEAR,[Tt]:e.LINEAR,[Et]:e.LINEAR_MIPMAP_NEAREST,[Dt]:e.LINEAR_MIPMAP_LINEAR},se={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function N(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&z(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ae[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ae[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ae[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,oe[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,oe[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,se[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ce(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=M(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function le(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ue(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=le(n.start,r.width,4),c=le(t.start,r.width,4);n.start<=i+1&&a===c&&le(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function de(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ce(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Br.getPrimaries(Br.workingColorSpace),r=o.colorSpace===``?null:Br.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Te(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);N(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===Gt,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&ue(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=Ll(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=Ll(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Ee(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Ee(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function fe(t,o,s){if(o.image.length!==6)return;let c=ce(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Br.getPrimaries(Br.workingColorSpace),r=o.colorSpace===``?null:Br.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Te(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);N(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Ee(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function pe(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),P(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ce(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function me(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;P(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ce(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ce(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);P(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ce(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ce(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function he(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),N(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else te(i.depthTexture,0);let u=l.__webglTexture,d=Ce(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)P(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)P(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ge(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)he(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?he(i.__webglFramebuffer[0],t,0):he(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),me(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),me(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function _e(t,n,i){let a=r.get(t);n!==void 0&&pe(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&ge(t)}function ve(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&P(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ce(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),me(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),N(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)pe(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else pe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),N(c,a),pe(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),N(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)pe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else pe(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&ge(t)}function ye(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let be=[],xe=[];function Se(t){if(t.samples>0){if(P(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(be.length=0,xe.length=0,be.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(be.push(l),xe.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,xe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,be))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ce(e){return Math.min(i.maxSamples,e.samples)}function P(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function we(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Te(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Br.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&z(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):B(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ee(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=ee,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=te,this.setTexture2DArray=ne,this.setTexture3D=re,this.setTextureCube=ie,this.rebindTextures=_e,this.setupRenderTarget=ve,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=P,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Wf(e,t){function n(n,r=``){let i,a=Br.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Gf=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Kf=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,qf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Fo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Cc({vertexShader:Gf,fragmentShader:Kf,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new q(new cc(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Jf=class extends or{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new qf,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new H,C=null,w=null,T=new cl;T.viewport=new Zr;let E=new cl;E.viewport=new Zr;let D=[T,E],O=new vl,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Mi,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Mi,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Mi,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,M);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,N.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,M),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Gt:Wt,a=_.stencil?Rt:Nt);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new $r(d.textureWidth,d.textureHeight,{format:Ut,type:Ot,depthTexture:new No(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new $r(f.framebufferWidth,f.framebufferHeight,{format:Ut,type:Ot,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),N.setContext(r),N.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function M(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let te=new U,ne=new U;function re(e,t,n){te.setFromMatrixPosition(t.matrixWorld),ne.setFromMatrixPosition(n.matrixWorld);let r=te.distanceTo(ne),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ie(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;ie(O,i);for(let e=0;e<a.length;e++)ie(a[e],i);a.length===2?re(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),ae(e,O,i)};function ae(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ur*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let oe=null;function se(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new cl,o.layers.enable(n),o.viewport=new Zr,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Fo,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}oe&&oe(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let N=new zl;N.setAnimationLoop(se),this.setAnimationLoop=function(e){oe=e},this.dispose=function(){}}},Yf=new ni,Xf=new W;Xf.set(-1,0,0,0,1,0,0,0,1);function Zf(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,yc(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Yf.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Xf),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Qf(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return B(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?z(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):z(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var $f=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ep=null;function tp(){return ep===null&&(ep=new ro($f,16,16,Jt,Ft),ep.name=`DFG_LUT`,ep.minFilter=Tt,ep.magFilter=Tt,ep.wrapS=bt,ep.wrapT=bt,ep.generateMipmaps=!1,ep.needsUpdate=!0),ep}var np=class{constructor(e={}){let{canvas:t=$n(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Ot}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Xt,Yt,qt]),g=new Set([Ot,Nt,jt,Rt,It,Lt]),_=new Uint32Array(4),v=new Int32Array(4),y=new U,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Hn;let j=0,ee=0,M=null,te=-1,ne=null,re=new Zr,ie=new Zr,ae=null,oe=new G(0),se=0,N=t.width,ce=t.height,le=1,ue=null,de=null,fe=new Zr(0,0,N,ce),pe=new Zr(0,0,N,ce),me=!1,he=new _o,ge=!1,_e=!1,ve=new ni,ye=new U,be=new Zr,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Se=!1;function Ce(){return M===null?le:1}let P=n;function we(e,n){return t.getContext(e,n)}let Te,Ee,F,De,I,L,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,qe,!1),t.addEventListener(`webglcontextrestored`,Je,!1),t.addEventListener(`webglcontextcreationerror`,Ye,!1),P===null){let t=`webgl2`;if(P=we(t,e),P===null)throw we(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Ge()}catch(e){throw t.removeEventListener(`webglcontextlost`,qe,!1),t.removeEventListener(`webglcontextrestored`,Je,!1),t.removeEventListener(`webglcontextcreationerror`,Ye,!1),B(`WebGLRenderer: `+e.message),e}function Ge(){Te=new yu(P),Te.init(),He=new Wf(P,Te),Ee=new Jl(P,Te,e,He),F=new Hf(P,Te),Ee.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),O=P.createFramebuffer(),k=P.createFramebuffer(),A=P.createFramebuffer(),De=new Su(P),I=new Sf,L=new Uf(P,Te,F,I,Ee,He,De),Oe=new vu(T),ke=new Bl(P),Ue=new Kl(P,ke),Ae=new bu(P,ke,De,Ue),je=new wu(P,Ae,ke,Ue,De),ze=new Cu(P,Ee,L),Ie=new Yl(I),Me=new xf(T,Oe,Te,Ee,Ue,Ie),Ne=new Zf(T,I),Pe=new Ef,Fe=new Nf(Te),Re=new Gl(T,Oe,F,je,p,s),Le=new Vf(T,je,Ee),We=new Qf(P,De,Ee,F),Be=new ql(P,Te,De),Ve=new xu(P,Te,De),De.programs=Me.programs,T.capabilities=Ee,T.extensions=Te,T.properties=I,T.renderLists=Pe,T.shadowMap=Le,T.state=F,T.info=De}m!==1009&&(w=new Eu(m,t.width,t.height,o,r,i));let Ke=new Jf(T,P);this.xr=Ke,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=Te.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Te.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(e){e!==void 0&&(le=e,this.setSize(N,ce,!1))},this.getSize=function(e){return e.set(N,ce)},this.setSize=function(e,n,r=!0){Ke.isPresenting?z(`WebGLRenderer: Can't change size while VR device is presenting.`):(N=e,ce=n,t.width=Math.floor(e*le),t.height=Math.floor(n*le),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(N*le,ce*le).floor()},this.setDrawingBufferSize=function(e,n,r){N=e,ce=n,le=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)B(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){z(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(re)},this.getViewport=function(e){return e.copy(fe)},this.setViewport=function(e,t,n,r){e.isVector4?fe.set(e.x,e.y,e.z,e.w):fe.set(e,t,n,r),F.viewport(re.copy(fe).multiplyScalar(le).round())},this.getScissor=function(e){return e.copy(pe)},this.setScissor=function(e,t,n,r){e.isVector4?pe.set(e.x,e.y,e.z,e.w):pe.set(e,t,n,r),F.scissor(ie.copy(pe).multiplyScalar(le).round())},this.getScissorTest=function(){return me},this.setScissorTest=function(e){F.setScissorTest(me=e)},this.setOpaqueSort=function(e){ue=e},this.setTransparentSort=function(e){de=e},this.getClearColor=function(e){return e.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=h.has(t)}if(e){let e=M.texture.type,t=g.has(e),n=Re.getClearColor(),r=Re.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,P.clearBufferuiv(P.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,P.clearBufferiv(P.COLOR,0,v))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,qe,!1),t.removeEventListener(`webglcontextrestored`,Je,!1),t.removeEventListener(`webglcontextcreationerror`,Ye,!1),Re.dispose(),Pe.dispose(),Fe.dispose(),I.dispose(),Oe.dispose(),je.dispose(),Ue.dispose(),We.dispose(),Me.dispose(),Ke.dispose(),Ke.removeEventListener(`sessionstart`,nt),Ke.removeEventListener(`sessionend`,rt),it.stop()};function qe(e){e.preventDefault(),tr(`WebGLRenderer: Context Lost.`),E=!0}function Je(){tr(`WebGLRenderer: Context Restored.`),E=!1;let e=De.autoReset,t=Le.enabled,n=Le.autoUpdate,r=Le.needsUpdate,i=Le.type;Ge(),De.autoReset=e,Le.enabled=t,Le.autoUpdate=n,Le.needsUpdate=r,Le.type=i}function Ye(e){B(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Xe(e){let t=e.target;t.removeEventListener(`dispose`,Xe),Ze(t)}function Ze(e){Qe(e),I.remove(e)}function Qe(e){let t=I.get(e).programs;t!==void 0&&(t.forEach(function(e){Me.releaseProgram(e)}),e.isShaderMaterial&&Me.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=xe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=mt(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ae.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ue.setup(i,r,s,n,c);let h,g=Be;if(c!==null&&(h=ke.get(c),g=Ve,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*Ce()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*Ce()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh){if(Te.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ke.get(c).bytesPerElement:1,o=I.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function $e(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),ge===!0&&Ie.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ut(e,t,r),e.side=0,e.needsUpdate=!0,ut(e,t,r),e.side=2):ut(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Fe.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),_e=this.localClippingEnabled,ge=Ie.init(this.clippingPlanes,_e),ge===!0&&Ie.setGlobalState(this.clippingPlanes,t),D!==null&&Le.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];$e(o,n,t,e),r.add(o)}else $e(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=I.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Te.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let et=null;function tt(e){et&&et(e)}function nt(){it.stop()}function rt(){it.start()}let it=new zl;it.setAnimationLoop(tt),typeof self<`u`&&it.setContext(self),this.setAnimationLoop=function(e){et=e,Ke.setAnimationLoop(e),e===null?it.stop():it.start()},Ke.addEventListener(`sessionstart`,nt),Ke.addEventListener(`sessionend`,rt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){B(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ke.enabled===!0&&Ke.isPresenting===!0,r=w!==null&&(M===null||n)&&w.begin(T,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ke.enabled===!0&&Ke.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ke.cameraAutoUpdate===!0&&Ke.updateCamera(t),t=Ke.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,M),x=Fe.get(e,C.length),x.init(t),x.state.textureUnits=L.getTextureUnits(),C.push(x),ve.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),he.setFromProjectionMatrix(ve,Yn,t.reversedDepth),_e=this.localClippingEnabled,ge=Ie.init(this.clippingPlanes,_e),b=Pe.get(e,S.length),b.init(),S.push(b),Ke.enabled===!0&&Ke.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&at(e,t,-1/0,T.sortObjects)}at(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(ue,de),Se=Ke.enabled===!1||Ke.isPresenting===!1||Ke.hasDepthSensing()===!1,Se&&Re.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ge===!0&&Ie.beginShadows();let i=x.state.shadowsArray;if(Le.render(i,e,t),ge===!0&&Ie.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];st(n,r,e,a)}Se&&Re.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ot(b,e,n,n.viewport)}}else r.length>0&&st(n,r,e,t),Se&&Re.render(e),ot(b,e,t)}M!==null&&ee===0&&(L.updateMultisampleRenderTarget(M),L.updateRenderTargetMipmap(M)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ue.resetDefaultState(),te=-1,ne=null,C.pop(),C.length>0?(x=C[C.length-1],L.setTextureUnits(x.state.textureUnits),ge===!0&&Ie.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function at(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(he)){r&&be.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ve);let i=je.update(e),a=e.material;a.visible&&b.push(e,i,a,n,be.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(he))){let i=je.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),be.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),be.copy(e.boundingSphere.center)),be.applyMatrix4(e.matrixWorld).applyMatrix4(ve)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,be.z,s,t)}}else a.visible&&b.push(e,i,a,n,be.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)at(i[e],t,n,r)}function ot(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),ge===!0&&Ie.setGlobalState(T.clippingPlanes,n),r&&F.viewport(re.copy(r)),i.length>0&&ct(i,t,n),a.length>0&&ct(a,t,n),o.length>0&&ct(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function st(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Te.has(`EXT_color_buffer_half_float`)||Te.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new $r(1,1,{generateMipmaps:!0,type:e?Ft:Ot,minFilter:Dt,samples:Math.max(4,Ee.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Br.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||re;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(oe),se=T.getClearAlpha(),se<1&&T.setClearColor(16777215,.5),T.clear(),Se&&Re.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),ge===!0&&Ie.setGlobalState(T.clippingPlanes,r),ct(e,n,r),L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a),Te.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,lt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(oe,se),d!==void 0&&(r.viewport=d),T.toneMapping=u}function ct(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&lt(o,t,n,s,l,c)}}function lt(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function ut(e,t,n){t.isScene!==!0&&(t=xe);let r=I.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Me.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Me.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Oe.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Xe),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return ft(e,s),d}else s.uniforms=Me.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Me.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ie.uniform),ft(e,s),r.needsLights=R(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function dt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Nd.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ft(e,t){let n=I.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function pt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function mt(e,t,n,r,i){t.isScene!==!0&&(t=xe),L.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?T.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Br.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Oe.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=I.get(r),y=x.state.lights;if(ge===!0&&(_e===!0||e!==ne)){let t=e===ne&&r.id===te;Ie.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ie.numPlanes||v.numIntersection!==Ie.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=ut(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(F.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==te&&(te=r.id,w=!0),v.needsLights){let e=pt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||ne!==e){F.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(P,`projectionMatrix`,e.projectionMatrix),O.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(P,ye.setFromMatrixPosition(e.matrixWorld)),Ee.logarithmicDepthBuffer&&O.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),ne!==e&&(ne=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(P,`sunShadowMap`,y.state.sunShadowMap,L),y.state.directionalShadowMap.length>0&&O.setValue(P,`directionalShadowMap`,y.state.directionalShadowMap,L),y.state.spotShadowMap.length>0&&O.setValue(P,`spotShadowMap`,y.state.spotShadowMap,L),y.state.pointShadowMap.length>0&&O.setValue(P,`pointShadowMap`,y.state.pointShadowMap,L)),i.isSkinnedMesh){O.setOptional(P,i,`bindMatrix`),O.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(P,`boneTexture`,e.boneTexture,L))}i.isBatchedMesh&&(O.setOptional(P,i,`batchingTexture`),O.setValue(P,`batchingTexture`,i._matricesTexture,L),O.setOptional(P,i,`batchingIdTexture`),O.setValue(P,`batchingIdTexture`,i._indirectTexture,L),O.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(P,`batchingColorTexture`,i._colorsTexture,L));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&ze.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=tp()),w){if(O.setValue(P,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&ht(k,E),a&&r.fog===!0&&Ne.refreshFogUniforms(k,a),Ne.refreshMaterialUniforms(k,r,le,ce,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}Nd.upload(P,dt(v),k,L)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Nd.upload(P,dt(v),k,L),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(P,`center`,i.center),O.setValue(P,`modelViewMatrix`,i.modelViewMatrix),O.setValue(P,`normalMatrix`,i.normalMatrix),O.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];We.update(n,S),We.bind(n,S)}}return S}function ht(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function R(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=I.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),I.get(e.texture).__webglTexture=t,I.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=I.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,j=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=I.get(e);if(o.__useDefaultFramebuffer!==void 0){F.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),re.copy(e.viewport),ie.copy(e.scissor),ae=e.scissorTest,F.viewport(re),F.scissor(ie),F.setScissorTest(ae),te=-1;return}if(o.__webglFramebuffer===void 0)L.setupRenderTarget(e);else if(o.__hasExternalTextures)L.rebindTextures(e,I.get(e.texture).__webglTexture,I.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&I.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);L.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=I.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&L.useMultisampledRTT(e)===!1?I.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,re.copy(e.viewport),ie.copy(e.scissor),ae=e.scissorTest}else re.copy(fe).multiplyScalar(le).floor(),ie.copy(pe).multiplyScalar(le).floor(),ae=me;if(n!==0&&(r=O),F.bindFramebuffer(P.FRAMEBUFFER,r)&&F.drawBuffers(e,r),F.viewport(re),F.scissor(ie),F.setScissorTest(ae),i){let r=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=I.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}te=-1};function gt(e){let t=I.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ee.textureFormatReadable(e.format),t.__typeReadable=Ee.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){F.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let u=gt(o);if(u.__formatReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,He.convert(c),He.convert(l),a)}finally{let e=M===null?null:I.get(M).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){F.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let d=gt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,He.convert(l),He.convert(u),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let p=M===null?null:I.get(M).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,p);let m=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await ir(P,m,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(f),P.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;L.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=He.convert(t.format),_=He.convert(t.type),v;t.isData3DTexture?(L.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(L.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(L.setTexture2D(t,0),v=P.TEXTURE_2D),F.activeTexture(P.TEXTURE0),F.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(P.UNPACK_ROW_LENGTH),b=F.getParameter(P.UNPACK_IMAGE_HEIGHT),x=F.getParameter(P.UNPACK_SKIP_PIXELS),S=F.getParameter(P.UNPACK_SKIP_ROWS),C=F.getParameter(P.UNPACK_SKIP_IMAGES);F.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(P.UNPACK_SKIP_PIXELS,l),F.pixelStorei(P.UNPACK_SKIP_ROWS,u),F.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=I.get(e),r=I.get(t),h=I.get(n.__renderTarget),g=I.get(r.__renderTarget);F.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,o,s,f,p,o,s,P.DEPTH_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||I.has(e)){let n=I.get(e),r=I.get(t);F.bindFramebuffer(P.READ_FRAMEBUFFER,k),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,o,s,f,p,o,s,P.COLOR_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(P.UNPACK_ROW_LENGTH,y),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(P.UNPACK_SKIP_PIXELS,x),F.pixelStorei(P.UNPACK_SKIP_ROWS,S),F.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&P.generateMipmap(v),F.unbindTexture()},this.initRenderTarget=function(e){I.get(e).__webglFramebuffer===void 0&&L.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?L.setTextureCube(e,0):e.isData3DTexture?L.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?L.setTexture2DArray(e,0):L.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){j=0,ee=0,M=null,F.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Br._getDrawingBufferColorSpace(e),t.unpackColorSpace=Br._getUnpackColorSpace()}},rp={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},ip=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},ap=new dl(-1,1,1,-1,0,1),op=new class extends ja{constructor(){super(),this.setAttribute(`position`,new K([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new K([0,2,0,0,2,0],2))}},sp=class{constructor(e){this._mesh=new q(op,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ap)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},cp=class extends ip{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Cc?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=bc.clone(e.uniforms),this.material=new Cc({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new sp(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},lp=class extends ip{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},up=class extends ip{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},dp=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new H);this._width=n.width,this._height=n.height,t=new $r(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ft}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new cp(rp),this.copyPass.material.blending=0,this.timer=new yl}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}lp!==void 0&&(r instanceof lp?n=!0:r instanceof up&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new H);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},fp=class extends ip{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new G}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},pp={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new G(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},mp=class e extends ip{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new H(256,256):new H(e.x,e.y),this.clearColor=new G(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new $r(i,a,{type:Ft,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new $r(i,a,{type:Ft,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new $r(i,a,{type:Ft,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=pp;this.highPassUniforms=bc.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Cc({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new H(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=bc.clone(rp.uniforms),this.blendMaterial=new Cc({uniforms:this.copyUniforms,vertexShader:rp.vertexShader,fragmentShader:rp.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new G,this._oldClearAlpha=1,this._basic=new Ua,this._fsQuad=new sp(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new H(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new Cc({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new H(.5,.5)},direction:{value:new H(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Cc({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};mp.BlurDirectionX=new H(1,0),mp.BlurDirectionY=new H(0,1);var hp={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},gp=class extends ip{constructor(){super(),this.isOutputPass=!0,this.uniforms=bc.clone(hp.uniforms),this.material=new wc({name:hp.name,uniforms:this.uniforms,vertexShader:hp.vertexShader,fragmentShader:hp.fragmentShader}),this._fsQuad=new sp(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Br.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},_p=class extends Ri{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new Io;e.deleteAttribute(`uv`);let t=new Tc({side:1}),n=new Tc,r=new ul(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new q(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new po(e,n,6),o=new ki;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let s=new q(e,vp(50));s.position.set(-16.116,14.37,8.208),s.scale.set(.1,2.428,2.739),this.add(s);let c=new q(e,vp(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let l=new q(e,vp(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);let u=new q(e,vp(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new q(e,vp(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new q(e,vp(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function vp(e){return new Dc({color:0,emissive:16777215,emissiveIntensity:e})}var yp={name:`FreakFinal`,uniforms:{tDiffuse:{value:null},uTime:{value:0},uAspect:{value:1},uWaves:{value:Array.from({length:4},()=>new Zr(.5,.5,-1,0))},uAberration:{value:.004},uFlash:{value:new Zr(1,1,1,0)},uVignette:{value:.35},uGlitch:{value:0},uGrain:{value:.035},uSaturation:{value:1},uTint:{value:new Zr(1,1,1,0)},uLens:{value:new Zr(.5,.5,0,.15)}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime, uAspect, uAberration, uVignette, uGlitch, uGrain, uSaturation;
    uniform vec4 uWaves[4];
    uniform vec4 uFlash, uTint, uLens;
    varying vec2 vUv;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

    void main() {
      vec2 uv = vUv;

      // Glitch: horizontal slice offsets.
      if (uGlitch > 0.0) {
        float band = floor(uv.y * 24.0 + floor(uTime * 18.0) * 7.0);
        float r = hash(vec2(band, floor(uTime * 18.0)));
        if (r < uGlitch * 0.5) uv.x += (hash(vec2(band, 3.0)) - 0.5) * 0.12 * uGlitch;
      }

      // Gravitational lens (black holes, singularities): pull pixels toward a point.
      if (uLens.z > 0.0) {
        vec2 d = uv - uLens.xy; d.x *= uAspect;
        float r = length(d);
        float pull = uLens.z * uLens.w * uLens.w / max(r * r, 0.0004);
        uv -= normalize(d + 1e-5) * vec2(1.0 / uAspect, 1.0) * min(pull, 0.25) * 0.08;
      }

      // Shockwaves: xy = centre (uv), z = age (s, <0 inactive), w = strength.
      for (int i = 0; i < 4; i++) {
        vec4 w = uWaves[i];
        if (w.z < 0.0) continue;
        vec2 d = uv - w.xy; d.x *= uAspect;
        float dist = length(d);
        float radius = w.z * 1.25;
        float ring = smoothstep(0.12, 0.0, abs(dist - radius));
        float fade = exp(-w.z * 2.6);
        uv -= normalize(d + 1e-5) * vec2(1.0 / uAspect, 1.0) * ring * fade * w.w * 0.035;
      }

      vec2 c = uv - 0.5;
      // Lateral chromatic aberration, growing toward the edges.
      vec2 off = c * uAberration * (0.6 + dot(c, c) * 2.0);
      vec3 col;
      col.r = texture2D(tDiffuse, uv + off).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - off).b;

      float l = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(vec3(l), col, uSaturation);
      col = mix(col, col * uTint.rgb, uTint.a);

      col = mix(col, uFlash.rgb, clamp(uFlash.a, 0.0, 1.0));

      float v = smoothstep(0.95, 0.25, length(c * vec2(uAspect * 0.85, 1.0)));
      col *= mix(1.0, v, uVignette);

      col += (hash(vUv * 731.0 + fract(uTime)) - 0.5) * uGrain;
      gl_FragColor = vec4(col, 1.0);
    }
  `},bp=class{renderer;scene=new Ri;camera;key;rim;hemi;final;bloom;composer;tier=`medium`;width=1;height=1;viewShift=0;constructor(e){this.renderer=new np({canvas:e,antialias:!0,powerPreference:`high-performance`}),this.renderer.outputColorSpace=Hn,this.renderer.toneMapping=7,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.type=1,this.camera=new cl(36,1,.1,400),this.camera.position.set(0,1.6,7.2);let t=new cu(this.renderer);this.scene.environment=t.fromScene(new _p,.04).texture,this.scene.environmentIntensity=.32,t.dispose(),this.hemi=new Xc(16773853,4206682,.7),this.key=new pl(16774368,2.1),this.key.position.set(-3.5,6,5),this.key.castShadow=!0,this.key.shadow.mapSize.set(1024,1024),this.key.shadow.camera.left=-4,this.key.shadow.camera.right=4,this.key.shadow.camera.top=4,this.key.shadow.camera.bottom=-4,this.key.shadow.camera.near=1,this.key.shadow.camera.far=20,this.key.shadow.bias=-5e-4,this.key.shadow.radius=4,this.rim=new pl(16751164,1.5),this.rim.position.set(4,2.5,-6);let n=new pl(12572415,.5);n.position.set(3,1,6),this.scene.add(this.hemi,this.key,this.rim,n),this.composer=new dp(this.renderer),this.composer.addPass(new fp(this.scene,this.camera)),this.bloom=new mp(new H(256,256),.7,.5,2.4),this.composer.addPass(this.bloom),this.final=new cp(yp),this.composer.addPass(this.final),this.composer.addPass(new gp)}setTier(e){this.tier=e,this.renderer.shadowMap.enabled=e!==`low`,this.key.castShadow=e!==`low`,this.resize(this.width,this.height)}get pixelRatio(){let e=typeof devicePixelRatio==`number`?devicePixelRatio:1;return this.tier===`high`?Math.min(e,2):this.tier===`medium`?Math.min(e,1.5):1}resize(e,t){this.width=Math.max(1,Math.floor(e)),this.height=Math.max(1,Math.floor(t));let n=this.pixelRatio;this.renderer.setPixelRatio(n),this.renderer.setSize(this.width,this.height,!1),this.composer.setPixelRatio(n),this.composer.setSize(this.width,this.height);let r=this.tier===`high`?.5:.35;this.bloom.resolution.set(this.width*n*r,this.height*n*r),this.camera.aspect=this.width/this.height;let i=Math.atan(Math.tan(Mr.degToRad(18))*1.5),a=Math.atan(Math.tan(i)/Math.min(1.5,this.camera.aspect));this.camera.fov=Math.min(64,Mr.radToDeg(a*2)),this.viewShift===0?this.camera.clearViewOffset():this.camera.setViewOffset(this.width,this.height,-this.viewShift,0,this.width,this.height),this.camera.updateProjectionMatrix(),this.final.uniforms.uAspect.value=this.width/this.height}render(){this.tier===`low`?this.renderer.render(this.scene,this.camera):this.composer.render()}dispose(){this.composer.dispose(),this.renderer.dispose()}},xp=class{x;v=0;target;k;d;constructor(e=0,t=160,n=14){this.x=e,this.target=e,this.k=t,this.d=n}update(e){let t=Math.ceil(e/(1/120)),n=e/t;for(let e=0;e<t;e++){let e=-this.k*(this.x-this.target)-this.d*this.v;this.v+=e*n,this.x+=this.v*n}return this.x}kick(e){this.v+=e}};function Sp(e,t,n,r){return t+(e-t)*Math.exp(-n*r)}var Cp=6,wp=1,Tp=new U(0,1,0);function Ep(e,t,n,r,i,a){let o=new U(e,t,Math.sqrt(Math.max(0,1-e*e-t*t))).normalize(),s=Tp.clone().addScaledVector(o,-Tp.dot(o)).normalize();s.applyAxisAngle(o,r);let c=new U().crossVectors(s,o),l=new ni().makeBasis(c,s,o);return{pos:o.multiplyScalar(n),quat:new Nr().setFromRotationMatrix(l),spread:i,curl:a}}function Dp(e,t,n,r,i,a,o,s){return{pos:new U(e,t,n),quat:new Nr().setFromEuler(new fi(r,i,a)),spread:o,curl:s}}var Op={cover:[Ep(-.34,-.27,1.06,-.32,.12,-.45),Ep(.1,-.5,1.1,1.75,.05,-.5)],flinch:[Dp(-1.45,.15,.3,.1,.5,.45,1,.1),Dp(1.45,.15,.3,.1,-.5,-.45,1,.1)],calm:[Dp(-.9,-.95,.3,.5,.3,2.8,.15,-.5),Dp(.9,-.95,.3,.5,-.3,-2.8,.15,-.5)],worried:[Ep(-.8,-.32,1.08,.25,.3,-.3),Ep(.8,-.32,1.08,-.25,.3,-.3)]};function kp(e){let t=new Ec({color:16762394,roughness:.34,metalness:0,clearcoat:.7,clearcoatRoughness:.22}),n={uDents:{value:e},uRim:{value:new G(15231488)},uCore:{value:new G(16764703)},uTint:{value:new G(1,1,1)},uTintAmt:{value:0}};return t.userData.uniforms=n,t.onBeforeCompile=e=>{Object.assign(e.uniforms,n),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform vec4 uDents[${Cp}];
varying vec3 vObjNormal;
float dentShape(float d) { return smoothstep(0.80, 1.0, d); }
float dentSlope(float d) { float t = clamp((d - 0.80) / 0.20, 0.0, 1.0); return 6.0 * t * (1.0 - t) / 0.20; }`).replace(`#include <beginnormal_vertex>`,`#include <beginnormal_vertex>
vec3 nrm0 = normalize(position);
vObjNormal = nrm0;
vec3 tilt = vec3(0.0);
for (int i = 0; i < ${Cp}; i++) {
  float dd = dot(nrm0, uDents[i].xyz);
  tilt += uDents[i].w * dentSlope(dd) * (uDents[i].xyz - dd * nrm0);
}
objectNormal = normalize(objectNormal + tilt * 1.4);`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
float dent = 0.0;
for (int i = 0; i < ${Cp}; i++) dent += uDents[i].w * dentShape(dot(nrm0, uDents[i].xyz));
transformed -= nrm0 * dent;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform vec3 uRim; uniform vec3 uCore; uniform vec3 uTint; uniform float uTintAmt;
varying vec3 vObjNormal;`).replace(`#include <color_fragment>`,`#include <color_fragment>
// Emoji gradient: hot yellow core, deep orange rim and underside.
float facing = clamp(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0, 1.0);
float under = smoothstep(0.2, -0.9, vObjNormal.y);
vec3 grad = mix(uRim, uCore, pow(facing, 0.75));
grad = mix(grad, uRim * 0.85, under * 0.55);
diffuseColor.rgb = mix(grad, uTint, uTintAmt);`)},t}function Ap(e){let t=new Ai,n=new q(new uc(1,24,16),e);n.scale.set(.24,.26,.11),t.add(n);let r=[],i=[.16,.2,.19,.14],a=[-.15,-.05,.055,.155];for(let n=0;n<4;n++){let o=new ki;o.position.set(a[n],.17,0);let s=new q(new Lo(.062,i[n],6,12),e);s.position.y=i[n]/2+.04,o.add(s),o.userData.baseZ=(n-1.5)*-.07,t.add(o),r.push(o)}let o=new ki;o.position.set(.2,-.05,.02);let s=new q(new Lo(.062,.13,6,12),e);return s.position.y=.1,o.add(s),o.rotation.z=-1,t.add(o),{group:t,fingers:r,thumb:o}}var jp=class{root=new Ai;recoil=new Ai;squashFrame=new Ai;body=new Ai;head;hitSphere;eyes=[];hands=[];brows=[];pupils=[];lids=[];eyeCenters=[];handParts=[];mouth;mouthOuter;sweat=[];headMat;gloveMat;dents=Array.from({length:Cp},()=>new Zr(0,0,1,0));dentSprings=Array.from({length:Cp},()=>new xp(0,260,9));nextDent=0;squash=new xp(0,220,11);recoilX=new xp(0,140,12);recoilY=new xp(0,140,12);recoilZ=new xp(0,140,12);tiltX=new xp(0,90,9);tiltZ=new xp(0,90,9);browLift=new xp(0,200,10);eyeScale=new xp(1,220,12);flinch=new xp(0,70,11);gasp=new xp(0,120,12);poseW={cover:1,flinch:0,calm:0,worried:0};mood=`shocked`;tremble=0;lookTarget=new U(0,1.4,6);lookCurrent=new U(0,1.4,6);blinkTimer=2.5;blink=0;time=0;flinchHold=0;squashQuat=new Nr;tmpV=new U;tmpQ=new Nr;constructor(){this.headMat=kp(this.dents),this.head=new q(new uc(wp,96,64),this.headMat),this.head.name=`face`,this.root.add(this.recoil),this.recoil.add(this.squashFrame),this.squashFrame.add(this.body),this.body.add(this.head),this.hitSphere=new q(new uc(1.22,24,16),new Ua({visible:!1})),this.root.add(this.hitSphere);let e=new Ec({color:16777215,roughness:.18,clearcoat:1,clearcoatRoughness:.08}),t=new Ua({color:328967}),n=new Ua({color:16777215}),r=new Ec({color:16760338,roughness:.36,clearcoat:.8,clearcoatRoughness:.2,side:2});for(let i of[-1,1]){let a=new U(i*.33,.27,0);a.z=Math.sqrt(1-a.x*a.x-a.y*a.y)*.93,this.eyeCenters.push(a.clone());let o=new Ai;o.position.copy(a),o.lookAt(a.clone().multiplyScalar(2));let s=new q(new uc(1,40,28),e);s.scale.set(.29,.345,.2),s.name=`eye`,o.add(s),this.eyes.push(s);let c=new Ai,l=new q(new uc(1,20,14),t);l.scale.set(.088,.088,.02),c.add(l);let u=new q(new uc(1,10,8),n);u.scale.set(.026,.026,.01),u.position.set(.032,.032,.016),c.add(u),o.add(c),this.pupils.push(c);let d=new q(new uc(1,32,16,0,Math.PI*2,0,Math.PI/2),r);d.scale.set(.305,.36,.215),d.rotation.x=-1.62,o.add(d),this.lids.push(d),this.body.add(o)}let i=new Tc({color:2894896,roughness:.45});for(let e of[-1,1]){let t=new ms(new U(-.23,-.035,0),new U(0,.06,.03),new U(.23,-.035,0)),n=new q(new fc(t,24,.058,12,!1),i),r=new q(new uc(.058,12,10),i);r.position.copy(t.getPoint(0));let a=r.clone();a.position.copy(t.getPoint(1)),n.add(r,a),n.position.set(e*.43,1.02,.46),n.rotation.set(-.35,e*-.25,e*-.24),n.name=`brow`,this.body.add(n),this.brows.push(n)}this.mouth=new Ai;let a=new U(0,-.46,0);a.z=Math.sqrt(1-a.y*a.y)*.955,this.mouth.position.copy(a),this.mouth.lookAt(a.clone().multiplyScalar(2)),this.mouthOuter=new q(new uc(1,32,20),new Tc({color:4854284,roughness:.55})),this.mouthOuter.scale.set(.2,.26,.06);let o=new q(new uc(1,20,12),new Tc({color:14702170,roughness:.5}));o.scale.set(.13,.08,.04),o.position.set(0,-.15,.03),this.mouthOuter.add(o),o.scale.divide(this.mouthOuter.scale),o.position.divide(this.mouthOuter.scale),this.mouth.add(this.mouthOuter),this.body.add(this.mouth),this.gloveMat=new Tc({color:15526886,roughness:.7});for(let e=0;e<2;e++){let{group:t,fingers:n,thumb:r}=Ap(this.gloveMat);t.name=`hand`,t.traverse(e=>e.name=`hand`),e===1&&(n.forEach(e=>{e.position.x*=-1,e.userData.baseZ=-e.userData.baseZ}),r.position.x*=-1,r.scale.x=-1),this.body.add(t),this.hands.push(t),this.handParts.push({fingers:n,thumb:r})}let s=new Ec({color:10475775,roughness:.05,transmission:.2,clearcoat:1,transparent:!0,opacity:.9});for(let e=0;e<3;e++){let e=new q(new uc(.06,12,10),s);e.scale.y=1.5,e.visible=!1,this.body.add(e),this.sweat.push(e)}this.root.traverse(e=>{e.isMesh&&e!==this.hitSphere&&(e.castShadow=!0)}),this.applyPose(1/60)}lookAt(e){this.lookTarget.copy(e)}hit(e,t,n={}){let r=e??this.tmpV.set((Math.random()-.5)*.4,(Math.random()-.3)*.4,1).normalize(),i=Math.min(t,2.5),a=this.nextDent;this.nextDent=(this.nextDent+1)%Cp,this.dents[a].set(r.x,r.y,r.z,this.dents[a].w),this.dentSprings[a].kick(1.6*i),this.squashQuat.setFromUnitVectors(new U(0,1,0),r),this.squash.kick(4.5*i),this.recoilX.kick(-r.x*2.4*i),this.recoilY.kick(-r.y*2*i),this.recoilZ.kick(-r.z*2.8*i),this.tiltX.kick(r.y*3*i),this.tiltZ.kick(-r.x*3*i),this.browLift.kick(5*i),this.eyeScale.kick(2.2*i),this.blink=0,(n.flinch||n.crit)&&(this.flinchHold=n.crit?.55:.32,this.gasp.kick(n.crit?9:5))}setSkinTint(e,t){let n=this.headMat.userData.uniforms;n.uTint.value.copy(e),n.uTintAmt.value=t}mouthWorld(e){return this.mouth.getWorldPosition(e)}update(e){this.time+=e;let t=this.time;for(let t=0;t<Cp;t++){let n=this.dentSprings[t];n.update(e),this.dents[t].w=Math.max(-.05,Math.min(.28,n.x))}let n=this.squash.update(e);this.squashFrame.quaternion.copy(this.squashQuat),this.body.quaternion.copy(this.tmpQ.copy(this.squashQuat).invert());let r=Math.max(-.35,Math.min(.35,n*.12));this.squashFrame.scale.set(1+r*.55,1-r,1+r*.55);let i=this.tremble,a=i>0?i*.025:0;this.recoil.position.set(this.recoilX.update(e)*.06+(Math.random()-.5)*a,this.recoilY.update(e)*.06+Math.sin(t*1.7)*.035+(Math.random()-.5)*a,this.recoilZ.update(e)*.06),this.recoil.rotation.set(this.tiltX.update(e)*.05+Math.sin(t*.9)*.03,Math.sin(t*.6)*.06,this.tiltZ.update(e)*.05+Math.sin(t*1.1)*.02);let o=this.mood;this.flinchHold=Math.max(0,this.flinchHold-e);let s=+(o===`freakout`||this.flinchHold>0);this.flinch.target=s;let c=Math.max(0,Math.min(1.15,this.flinch.update(e))),l=+(o===`calm`),u=+(o===`worried`);this.poseW.calm=Sp(this.poseW.calm,l*(1-c),6,e),this.poseW.worried=Sp(this.poseW.worried,u*(1-c),6,e),this.poseW.flinch=c,this.poseW.cover=Math.max(0,1-c-this.poseW.calm-this.poseW.worried),this.applyPose(e),this.gasp.target=o===`calm`?.1:Math.max(c,u*.45);let d=Math.max(0,this.gasp.update(e)),f=o===`calm`?.12:Math.min(1.3,d);this.mouthOuter.scale.set(.2*(.7+f*.3),.26*Math.max(.08,f),.06),this.mouth.visible=f>.03;let p=o===`calm`?-.1:o===`worried`?.08:0;this.browLift.target=p+c*.12;let m=this.browLift.update(e);for(let e=0;e<2;e++){let n=e===0?-1:1,r=this.brows[e];r.position.y=1.02+m*.08+Math.sin(t*2+e)*.006,r.rotation.z=-n*(.24+(o===`calm`?-.38:o===`worried`?.2:0)+c*.14)}this.eyeScale.target=o===`freakout`?1.12:1;let h=this.eyeScale.update(e);this.blinkTimer-=e,this.blinkTimer<=0&&(this.blink=1,this.blinkTimer=2+Math.random()*4),this.blink=Math.max(0,this.blink-e*7);let g=Math.sin(Math.min(1,this.blink)*Math.PI),_=Math.max(o===`calm`?.55:o===`worried`?.08:0,g)*(1-c*.8);this.lookCurrent.lerp(this.lookTarget,1-Math.exp(-12*e));for(let e=0;e<2;e++){let t=this.eyes[e];t.scale.set(.29*h,.345*h,.2),this.lids[e].rotation.x=-1.62+_*3,this.lids[e].scale.set(.305*h,.36*h,.215);let n=t.parent.worldToLocal(this.tmpV.copy(this.lookCurrent));n.normalize();let r=Math.max(-.55,Math.min(.55,n.x))*.16*h,i=Math.max(-.55,Math.min(.55,n.y))*.19*h,a=o===`freakout`?.025:0,s=this.pupils[e];s.position.set(r+(Math.random()-.5)*a,i+(Math.random()-.5)*a,.2*Math.sqrt(Math.max(.05,1-(r/.29)**2-(i/.345)**2))+.004);let c=o===`freakout`?.55:1-Math.min(.35,(h-1)*2);s.scale.setScalar(c)}for(let e=0;e<this.sweat.length;e++){let n=this.sweat[e],r=u>0||i>.6;if(n.visible=r,r){let r=(t*.7+e*.33)%1,i=e%2==0?1:-1;n.position.set(i*(.78+e*.05),.55-r*.9,.62-r*.1),n.scale.setScalar(1-r*.4).setY((1-r*.4)*1.5)}}}applyPose(e){let t=this.poseW,n=this.time;for(let e=0;e<2;e++){let r=this.tmpV.set(0,0,0),i=this.tmpQ.set(0,0,0,0),a=0,o=0,s=0;for(let n of[`cover`,`flinch`,`calm`,`worried`]){let c=t[n];if(c<=1e-4)continue;let l=Op[n][e];r.addScaledVector(l.pos,c);let u=i.x*l.quat.x+i.y*l.quat.y+i.z*l.quat.z+i.w*l.quat.w<0?-1:1;i.x+=l.quat.x*c*u,i.y+=l.quat.y*c*u,i.z+=l.quat.z*c*u,i.w+=l.quat.w*c*u,a+=l.spread*c,o+=l.curl*c,s+=c}if(s<=0)continue;r.multiplyScalar(1/s),i.normalize(),a/=s,o/=s;let c=this.hands[e];c.position.copy(r),c.position.y+=this.tremble*Math.sin(n*40+e)*.03,c.quaternion.copy(i),c.rotateZ(t.flinch*Math.sin(n*22+e*2)*.14);let l=this.handParts[e];l.fingers.forEach((e,t)=>{e.rotation.z=e.userData.baseZ*(.4+a*2.4),e.rotation.x=o+Math.sin(n*3+t)*.02}),l.thumb.rotation.z=(e===0?-1:1)*(.8+a*.6)}}},Mp=[{skyTop:2759498,skyHorizon:16747084,skyBottom:3875891,sunDir:[-.55,.12,-.83],sunColor:16756832,sunSize:.1,sunStripes:0,stars:.25,nebula:0,nebA:0,nebB:0,clouds:.35,cloudColor:16752250,ridge:1,ridgeColor:2824240,skyline:0,warp:0,groundA4:[1,0,0,0],groundB4:[0,0,0,0],groundA:5925676,groundB:8018482,gridColor:16777215,fog:9062986,hemiSky:16765608,hemiGround:4860986,hemiInt:.64,keyColor:16769208,keyInt:1.68,rimColor:16742972,rimInt:1.6,platform:8020552,platformRim:16751434,bloom:.7,accent:`#ff9b4a`},{skyTop:3955338,skyHorizon:13161180,skyBottom:4871520,sunDir:[.4,.45,-.8],sunColor:16773840,sunSize:.07,sunStripes:0,stars:0,nebula:0,nebA:0,nebB:0,clouds:.8,cloudColor:15921902,ridge:.6,ridgeColor:5003882,skyline:0,warp:0,groundA4:[.15,.85,0,0],groundB4:[0,0,0,0],groundA:7105124,groundB:4868164,gridColor:16777215,fog:10135734,hemiSky:14674162,hemiGround:4868690,hemiInt:.72,keyColor:16774886,keyInt:1.6,rimColor:10274047,rimInt:1.4,platform:9078400,platformRim:8368895,bloom:.6,accent:`#7fb2ff`},{skyTop:4864554,skyHorizon:13668432,skyBottom:3811872,sunDir:[.2,.25,-.95],sunColor:16751168,sunSize:.09,sunStripes:0,stars:0,nebula:0,nebA:0,nebB:0,clouds:.9,cloudColor:9071184,ridge:.2,ridgeColor:3811874,skyline:.35,warp:0,groundA4:[0,0,1,0],groundB4:[0,0,0,0],groundA:5918792,groundB:3814446,gridColor:16755285,fog:6967360,hemiSky:16767136,hemiGround:3811872,hemiInt:.68,keyColor:16765072,keyInt:1.6,rimColor:16755264,rimInt:1.7,platform:6969920,platformRim:16757575,bloom:.75,accent:`#ffb347`},{skyTop:396322,skyHorizon:2767466,skyBottom:526868,sunDir:[-.3,.6,-.75],sunColor:14214399,sunSize:.035,sunStripes:0,stars:.5,nebula:.1,nebA:1714794,nebB:6957674,clouds:.25,cloudColor:3816026,ridge:0,ridgeColor:0,skyline:1,warp:0,groundA4:[0,0,0,1],groundB4:[0,0,0,0],groundA:2763828,groundB:1711138,gridColor:16765503,fog:1317428,hemiSky:10138879,hemiGround:1710634,hemiInt:.55,keyColor:14674175,keyInt:1.76,rimColor:4894975,rimInt:2.2,platform:3816516,platformRim:4894975,bloom:.9,accent:`#4ab0ff`},{skyTop:1179690,skyHorizon:16722570,skyBottom:655384,sunDir:[0,.16,-1],sunColor:16761402,sunSize:.22,sunStripes:1,stars:.7,nebula:.2,nebA:4849834,nebB:16711816,clouds:0,cloudColor:0,ridge:.5,ridgeColor:1703984,skyline:0,warp:0,groundA4:[0,0,0,0],groundB4:[1,0,0,0],groundA:655384,groundB:1179690,gridColor:16726736,fog:3801168,hemiSky:16747232,hemiGround:2752592,hemiInt:.59,keyColor:16769268,keyInt:1.6,rimColor:3862783,rimInt:2.6,platform:1708080,platformRim:3862783,bloom:1.15,accent:`#ff3ad0`},{skyTop:131594,skyHorizon:657956,skyBottom:131594,sunDir:[.7,.3,-.65],sunColor:16773328,sunSize:.03,sunStripes:0,stars:1,nebula:1,nebA:2755178,nebB:682634,clouds:0,cloudColor:0,ridge:0,ridgeColor:0,skyline:0,warp:0,groundA4:[0,0,0,0],groundB4:[0,1,0,0],groundA:0,groundB:0,gridColor:8030975,fog:328986,hemiSky:10532095,hemiGround:1706538,hemiInt:.51,keyColor:16773856,keyInt:1.92,rimColor:10119935,rimInt:2.6,platform:4866640,platformRim:10119935,bloom:1.1,accent:`#9a6aff`},{skyTop:266780,skyHorizon:5905064,skyBottom:1703984,sunDir:[0,.5,-.85],sunColor:16777215,sunSize:.05,sunStripes:0,stars:.8,nebula:.4,nebA:51344,nebB:13107338,clouds:0,cloudColor:0,ridge:0,ridgeColor:0,skyline:0,warp:1,groundA4:[0,0,0,0],groundB4:[0,.35,1,0],groundA:657940,groundB:1315882,gridColor:7012312,fog:1710650,hemiSky:13697008,hemiGround:3803722,hemiInt:.64,keyColor:16777215,keyInt:1.76,rimColor:16726752,rimInt:2.6,platform:2763322,platformRim:7012312,bloom:1.2,accent:`#6affd8`}],Np=class e{c={};n={};v={};v4={};accent=`#ff9b4a`;static colorKeys=[`skyTop`,`skyHorizon`,`skyBottom`,`sunColor`,`nebA`,`nebB`,`cloudColor`,`ridgeColor`,`groundA`,`groundB`,`gridColor`,`fog`,`hemiSky`,`hemiGround`,`keyColor`,`rimColor`,`platform`,`platformRim`];static numKeys=[`sunSize`,`sunStripes`,`stars`,`nebula`,`clouds`,`ridge`,`skyline`,`warp`,`hemiInt`,`keyInt`,`rimInt`,`bloom`];constructor(t){for(let t of e.colorKeys)this.c[t]=new G;for(let t of e.numKeys)this.n[t]=0;this.v.sunDir=new U,this.v4.groundA4=new Zr,this.v4.groundB4=new Zr,this.set(t,t,0)}set(t,n,r){let i=new G;for(let a of e.colorKeys)this.c[a].set(t[a]).lerp(i.set(n[a]),r);for(let i of e.numKeys)this.n[i]=t[i]+(n[i]-t[i])*r;this.v.sunDir.set(...t.sunDir).lerp(new U(...n.sunDir),r).normalize(),this.v4.groundA4.set(...t.groundA4).lerp(new Zr(...n.groundA4),r),this.v4.groundB4.set(...t.groundB4).lerp(new Zr(...n.groundB4),r),this.accent=r<.5?t.accent:n.accent}},Pp={Glow:0,Spark:1,Chunk:2,Smoke:3,Ring:4,Beam:5,Star:6},Fp=`
attribute vec3 aPos0;
attribute vec3 aVel;
attribute vec2 aTime;
attribute vec2 aSize;
attribute vec4 aColor;
attribute vec4 aPhys;
uniform float uTime;
varying vec2 vUv;
varying vec4 vColor;
varying float vShape;
varying float vT;
void main() {
  float age = uTime - aTime.x;
  float t = age / aTime.y;
  if (t < 0.0 || t > 1.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float shape = aPhys.w;
  float size = mix(aSize.x, aSize.y, t);
  vec2 corner = position.xy;
  vec4 mv;
  if (shape > 4.5 && shape < 5.5) {
    // Beam: aPos0 is the midpoint, aVel the full segment.
    vec4 a = modelViewMatrix * vec4(aPos0 - aVel * 0.5, 1.0);
    vec4 b = modelViewMatrix * vec4(aPos0 + aVel * 0.5, 1.0);
    vec2 dir = normalize(b.xy - a.xy + 1e-5);
    vec2 perp = vec2(-dir.y, dir.x);
    mv = mix(a, b, corner.y + 0.5);
    mv.xy += perp * corner.x * size;
  } else {
    float drag = aPhys.y;
    float decay = drag > 0.0 ? exp(-drag * age) : 1.0;
    float k = drag > 0.0 ? (1.0 - decay) / drag : age;
    vec3 p = aPos0 + aVel * k + vec3(0.0, -0.5 * aPhys.x * age * age, 0.0);
    vec3 vel = aVel * decay + vec3(0.0, -aPhys.x * age, 0.0);
    mv = modelViewMatrix * vec4(p, 1.0);
    if (aPhys.z > 0.0) {
      vec3 vv = (modelViewMatrix * vec4(vel, 0.0)).xyz;
      vec2 dir = normalize(vv.xy + 1e-5);
      float len = size + length(vv.xy) * aPhys.z;
      vec2 perp = vec2(-dir.y, dir.x);
      mv.xy += dir * corner.y * len + perp * corner.x * size;
    } else {
      float ang = (shape > 1.5 && shape < 2.5) || shape > 5.5 ? age * 7.0 + aTime.x * 17.0 : 0.0;
      float c = cos(ang), s = sin(ang);
      mv.xy += mat2(c, -s, s, c) * corner * size;
    }
  }
  gl_Position = projectionMatrix * mv;
  vUv = position.xy + 0.5;
  vColor = aColor;
  vColor.a *= (1.0 - smoothstep(0.55, 1.0, t)) * smoothstep(0.0, 0.04, t);
  vShape = shape;
  vT = t;
}
`,Ip=`
varying vec2 vUv;
varying vec4 vColor;
varying float vShape;
varying float vT;
void main() {
  vec2 c = vUv - 0.5;
  float d = length(c) * 2.0;
  float a;
  if (vShape < 0.5) a = pow(max(0.0, 1.0 - d), 2.2);
  else if (vShape < 1.5) a = smoothstep(1.0, 0.15, d);
  else if (vShape < 2.5) a = step(max(abs(c.x), abs(c.y) * 1.4), 0.45);
  else if (vShape < 3.5) a = smoothstep(1.0, 0.0, d) * 0.55;
  else if (vShape < 4.5) a = smoothstep(0.16, 0.0, abs(d - 0.82)) * (1.0 - vT * 0.5);
  else if (vShape < 5.5) a = smoothstep(0.5, 0.0, abs(c.x)) * (0.6 + 0.4 * smoothstep(0.5, 0.3, abs(c.y)));
  else {
    // Four-point star twinkle.
    float star = max(1.0 - abs(c.x) * 9.0 - abs(c.y) * 2.0, 1.0 - abs(c.y) * 9.0 - abs(c.x) * 2.0);
    a = clamp(star, 0.0, 1.0) + pow(max(0.0, 1.0 - d), 3.0);
  }
  if (a <= 0.002) discard;
  gl_FragColor = vec4(vColor.rgb, vColor.a * a);
}
`,Lp=class{mesh;geo;attrs;cursor=0;dirtyMin=1/0;dirtyMax=-1;uniforms={uTime:{value:0}};capacity;density=1;skip=0;constructor(e,t){this.capacity=e;let n=new cc(1,1);this.geo=new ml,this.geo.index=n.index,this.geo.setAttribute(`position`,n.getAttribute(`position`));let r=t=>{let n=new io(new Float32Array(e*t),t);return n.setUsage(Jn),n};this.attrs={aPos0:r(3),aVel:r(3),aTime:r(2),aSize:r(2),aColor:r(4),aPhys:r(4)};let i=this.attrs.aTime.array;for(let t=0;t<e;t++)i[t*2]=-1e3,i[t*2+1]=1;for(let[e,t]of Object.entries(this.attrs))this.geo.setAttribute(e,t);this.geo.instanceCount=e;let a=new Cc({uniforms:this.uniforms,vertexShader:Fp,fragmentShader:Ip,transparent:!0,depthWrite:!1,blending:t?2:1});this.mesh=new q(this.geo,a),this.mesh.frustumCulled=!1,this.mesh.renderOrder=t?20:10}get time(){return this.uniforms.uTime.value}spawn(e){if(this.density<1&&(this.skip+=1-this.density,this.skip>=1)){--this.skip;return}let t=this.cursor;this.cursor=(this.cursor+1)%this.capacity;let n=this.attrs,r=n.aPos0.array,i=n.aVel.array,a=n.aTime.array,o=n.aSize.array,s=n.aColor.array,c=n.aPhys.array;r[t*3]=e.x,r[t*3+1]=e.y,r[t*3+2]=e.z,i[t*3]=e.vx??0,i[t*3+1]=e.vy??0,i[t*3+2]=e.vz??0,a[t*2]=this.uniforms.uTime.value+(e.delay??0),a[t*2+1]=Math.max(.01,e.life),o[t*2]=e.size,o[t*2+1]=e.sizeEnd??e.size,s[t*4]=e.r,s[t*4+1]=e.g,s[t*4+2]=e.b,s[t*4+3]=e.a??1,c[t*4]=e.gravity??0,c[t*4+1]=e.drag??0,c[t*4+2]=e.stretch??0,c[t*4+3]=e.shape??Pp.Glow,t<this.dirtyMin&&(this.dirtyMin=t),t>this.dirtyMax&&(this.dirtyMax=t)}update(e){if(this.uniforms.uTime.value=e,this.dirtyMax<0)return;let t=this.dirtyMin,n=this.dirtyMax-this.dirtyMin+1;for(let e of Object.values(this.attrs))e.clearUpdateRanges(),e.addUpdateRange(t*e.itemSize,n*e.itemSize),e.needsUpdate=!0;this.dirtyMin=1/0,this.dirtyMax=-1}dispose(){this.geo.dispose(),this.mesh.material.dispose()}},Rp=class{glow;matter;group=new Ai;constructor(e=6e3,t=2500){this.glow=new Lp(e,!0),this.matter=new Lp(t,!1),this.group.add(this.matter.mesh,this.glow.mesh)}setDensity(e){this.glow.density=e,this.matter.density=e}update(e){this.glow.update(e),this.matter.update(e)}sparks(e,t,n,r=4,i={}){for(let a=0;a<t;a++){let t=Math.random()*2-1,a=Math.random()*Math.PI*2,o=Math.sqrt(1-t*t),s=r*(.4+Math.random()*.8);this.glow.spawn({x:e.x,y:e.y,z:e.z,vx:o*Math.cos(a)*s,vy:t*s+r*.25,vz:o*Math.sin(a)*s,life:.35+Math.random()*.4,size:.05+Math.random()*.05,sizeEnd:.01,r:n.r*4,g:n.g*4,b:n.b*4,gravity:6,drag:2.5,stretch:.045,shape:Pp.Spark,...i})}}ring(e,t,n=3,r=.45,i=2.5){this.glow.spawn({x:e.x,y:e.y,z:e.z,life:r,size:.2,sizeEnd:n,r:t.r*i,g:t.g*i,b:t.b*i,shape:Pp.Ring})}flash(e,t,n=1.2,r=.18,i=5){this.glow.spawn({x:e.x,y:e.y,z:e.z,life:r,size:n,sizeEnd:n*1.6,r:t.r*i,g:t.g*i,b:t.b*i,shape:Pp.Glow})}smoke(e,t,n,r={}){for(let i=0;i<t;i++)this.matter.spawn({x:e.x+(Math.random()-.5)*.3,y:e.y+(Math.random()-.5)*.3,z:e.z+(Math.random()-.5)*.3,vx:(Math.random()-.5)*1.2,vy:.4+Math.random()*.8,vz:(Math.random()-.5)*1.2,life:.9+Math.random()*.7,size:.25,sizeEnd:.9+Math.random()*.5,r:n.r,g:n.g,b:n.b,a:.55,drag:1.5,gravity:-.4,shape:Pp.Smoke,...r})}debris(e,t,n,r=4){for(let i=0;i<t;i++){let t=Math.random()*Math.PI*2,i=r*(.5+Math.random()*.7),a=.7+Math.random()*.5;this.matter.spawn({x:e.x,y:e.y,z:e.z,vx:Math.cos(t)*i,vy:1.5+Math.random()*r,vz:Math.sin(t)*i*.6+1,life:.8+Math.random()*.6,size:.06+Math.random()*.08,r:n.r*a,g:n.g*a,b:n.b*a,gravity:12,drag:.6,shape:Pp.Chunk})}}beam(e,t,n,r=.12,i=.18,a=5){this.glow.spawn({x:(e.x+t.x)/2,y:(e.y+t.y)/2,z:(e.z+t.z)/2,vx:t.x-e.x,vy:t.y-e.y,vz:t.z-e.z,life:i,size:r,sizeEnd:r*.2,r:n.r*a,g:n.g*a,b:n.b*a,shape:Pp.Beam})}dispose(){this.glow.dispose(),this.matter.dispose()}},zp=`💥.✨.⭐.💫.🔥.💨.💧.🪨.🔩.⚡.🌟.💢.❗.❓.🍌.🪶.🧱.🛞.⚙️.📄.🦴.🌀.🕳️.🌕.🪐.☄️.🛡️.💀.🎈.🫧.😱.😳.🖐️.👋.🏹.🗡️.🔫.💣.🚀.🛰️.🌑.🔮.🧲.⏳.🦠.🎲.🧨.🌌.🐒.🦍.🏰.🏇.🏭.🎯.✈️.🛸.🖨️.♾️.🌲.🌴.🗿.🦣.🏛️.🌋.🐉.🚂.🚁.🌆.🫥.👁️.🪵.🥊.🌠.😵.🤯.🫨.🌈.🍀.👑.🏆`.split(`.`),Bp=class{texture;index=new Map;cols;rows;cell=128;constructor(){let e=[...new Set([..._.map(e=>e.emoji),...u.map(e=>e.emoji),...zp])];this.cols=Math.ceil(Math.sqrt(e.length)),this.rows=Math.ceil(e.length/this.cols);let t=document.createElement(`canvas`);t.width=this.cols*this.cell,t.height=this.rows*this.cell;let n=t.getContext(`2d`);n.textAlign=`center`,n.textBaseline=`middle`,n.font=`${this.cell*.78}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Twemoji Mozilla",sans-serif`,e.forEach((e,t)=>{this.index.set(e,t);let r=t%this.cols*this.cell+this.cell/2,i=Math.floor(t/this.cols)*this.cell+this.cell/2+this.cell*.04;n.fillText(e,r,i)}),this.texture=new Mo(t),this.texture.colorSpace=Hn,this.texture.anisotropy=4,this.texture.generateMipmaps=!0,this.texture.minFilter=Dt}rect(e,t=[0,0,0,0]){let n=this.index.get(e)??this.index.get(`💥`)??0,r=1/this.cols,i=1/this.rows;return t[0]=n%this.cols*r,t[1]=1-(Math.floor(n/this.cols)+1)*i,t[2]=r,t[3]=i,t}},Vp=`
attribute vec3 aOffset;
attribute vec3 aScaleRot; // x scale, y rotation, z flipX
attribute vec4 aUv;
attribute vec4 aTint;     // rgb multiplier, a alpha
varying vec2 vUv;
varying vec4 vTint;
void main() {
  vec4 mv = modelViewMatrix * vec4(aOffset, 1.0);
  float c = cos(aScaleRot.y), s = sin(aScaleRot.y);
  vec2 corner = position.xy * aScaleRot.x;
  mv.xy += mat2(c, -s, s, c) * corner;
  gl_Position = projectionMatrix * mv;
  vec2 uv = position.xy + 0.5;
  if (aScaleRot.z > 0.5) uv.x = 1.0 - uv.x;
  vUv = aUv.xy + uv * aUv.zw;
  vTint = aTint;
}
`,Hp=`
uniform sampler2D uMap;
varying vec2 vUv;
varying vec4 vTint;
void main() {
  vec4 c = texture2D(uMap, vUv);
  c.rgb *= vTint.rgb;
  c.a *= vTint.a;
  if (c.a < 0.02) discard;
  gl_FragColor = c;
}
`,Up=class{mesh;slots=[];geo;aOffset;aScaleRot;aUv;aTint;atlas;rect=[0,0,0,0];constructor(e,t,n={}){this.atlas=e;let r=new cc(1,1);this.geo=new ml,this.geo.index=r.index,this.geo.setAttribute(`position`,r.getAttribute(`position`));let i=e=>{let n=new io(new Float32Array(t*e),e);return n.setUsage(Jn),n};this.aOffset=i(3),this.aScaleRot=i(3),this.aUv=i(4),this.aTint=i(4),this.geo.setAttribute(`aOffset`,this.aOffset),this.geo.setAttribute(`aScaleRot`,this.aScaleRot),this.geo.setAttribute(`aUv`,this.aUv),this.geo.setAttribute(`aTint`,this.aTint),this.geo.instanceCount=0;for(let e=0;e<t;e++)this.slots.push({x:0,y:0,z:0,scale:1,rot:0,flip:!1,alpha:1,tint:1,emoji:`💥`,visible:!1});let a=new Cc({uniforms:{uMap:{value:e.texture}},vertexShader:Vp,fragmentShader:Hp,transparent:!0,depthWrite:!1,depthTest:n.depthTest??!0});this.mesh=new q(this.geo,a),this.mesh.frustumCulled=!1,this.mesh.renderOrder=n.renderOrder??5}flush(){let e=this.aOffset.array,t=this.aScaleRot.array,n=this.aUv.array,r=this.aTint.array,i=0;for(let a of this.slots)!a.visible||a.alpha<=.01||(e[i*3]=a.x,e[i*3+1]=a.y,e[i*3+2]=a.z,t[i*3]=a.scale,t[i*3+1]=a.rot,t[i*3+2]=+!!a.flip,this.atlas.rect(a.emoji,this.rect),n.set(this.rect,i*4),r[i*4]=a.tint,r[i*4+1]=a.tint,r[i*4+2]=a.tint,r[i*4+3]=a.alpha,i++);this.geo.instanceCount=i;for(let e of[this.aOffset,this.aScaleRot,this.aUv,this.aTint])e.clearUpdateRanges(),e.addUpdateRange(0,i*e.itemSize),e.needsUpdate=!0}dispose(){this.geo.dispose(),this.mesh.material.dispose()}},Wp=class{batch;flyers=[];free;constructor(e,t=96){this.batch=new Up(e,t,{renderOrder:15}),this.free=[...this.batch.slots]}take(){let e=this.free.pop();return e&&(e.visible=!0),e??null}toss(e,t,n,r,i,a,o,s={}){let c=this.take();c&&(Object.assign(c,{x:t,y:n,z:r,emoji:e,alpha:1,rot:Math.random()*6,flip:Math.random()<.5,tint:1}),this.flyers.push({slot:c,vx:i,vy:a,vz:o,spin:(Math.random()-.5)*14,gravity:9,life:1.2,age:0,scale0:.5,scale1:.5,...s}))}strike(e,t,n,r,i,a,o=!1){let s=this.take();s&&(Object.assign(s,{x:t.x,y:t.y,z:t.z,emoji:e,alpha:1,rot:0,flip:o,tint:1,scale:i}),this.flyers.push({slot:s,vx:0,vy:0,vz:0,spin:0,gravity:0,life:r+.6,age:0,scale0:i,scale1:i*.8,sx:t.x,sy:t.y,sz:t.z,tx:n.x,ty:n.y,tz:n.z,travel:r,onArrive:a}))}update(e){for(let t=this.flyers.length-1;t>=0;t--){let n=this.flyers[t];n.age+=e;let r=n.slot;if(n.travel!==void 0&&n.age<=n.travel){let t=n.age/n.travel,i=t*t;r.x=n.sx+(n.tx-n.sx)*i,r.y=n.sy+(n.ty-n.sy)*i+Math.sin(t*Math.PI)*.4,r.z=n.sz+(n.tz-n.sz)*i,r.rot=(r.flip?1:-1)*(.9-t*1.6),n.age+e>n.travel&&(n.onArrive?.(),n.vx=(n.sx-n.tx)*.9+(Math.random()-.5)*2,n.vy=3+Math.random()*2,n.vz=1.5,n.spin=(r.flip?-1:1)*12,n.gravity=14)}else n.vx*=Math.exp(-.4*e),n.vz*=Math.exp(-.4*e),n.vy-=n.gravity*e,r.x+=n.vx*e,r.y+=n.vy*e,r.z+=n.vz*e,r.rot+=n.spin*e;let i=Math.min(1,n.age/n.life);r.scale=n.scale0+(n.scale1-n.scale0)*i,r.alpha=i>.75?1-(i-.75)/.25:1,n.age>=n.life&&(r.visible=!1,this.free.push(r),this.flyers[t]=this.flyers[this.flyers.length-1],this.flyers.pop())}this.batch.flush()}},Gp=e=>1+2.4*(e-1)**3+1.4*(e-1)**2,Kp=class{group=new Ai;presence=0;tracked=[];updaters=[];sprites=null;add(e,t=8,n){let r=n??Math.min(.45,Math.hypot(e.position.x,e.position.z)/60);return this.tracked.push({obj:e,baseY:e.position.y,sink:t,delay:r}),this.group.add(e),e}onUpdate(e){this.updaters.push(e)}setPresence(e){this.presence=e,this.group.visible=e>.001;for(let t of this.tracked){let n=Math.min(1,Math.max(0,(e*1.45-t.delay)/1)),r=n<=0?0:Gp(n);t.obj.position.y=t.baseY-(1-r)*t.sink,t.obj.visible=n>.001}}update(e,t){for(let n of this.updaters)n(e,t);if(this.sprites){for(let e of this.sprites.slots)e.visible&&(e.alpha=Math.min(1,this.presence*1.5));this.sprites.flush()}}};function qp(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Jp(e,t,n,r=.7){for(let i=0;i<20;i++){let i=e()*Math.PI*2,a=t+e()*(n-t),o=new U(Math.sin(i)*a,0,Math.cos(i)*a);if(Math.cos(i)<r||a>14)return o}return new U(0,0,-t)}function Yp(e,t,n,r){let i=new po(e,t,n.length);return n.forEach((e,t)=>i.setMatrixAt(t,e)),r&&r.forEach((e,t)=>i.setColorAt(t,e)),i.instanceMatrix.needsUpdate=!0,i}var Xp=new ni,Zp=new Nr,Qp=new fi,$p=new U,em=new U,tm=(e,t,n,r,i,a,o=0,s=0,c=0)=>new ni().compose(new U(e,t,n),new Nr().setFromEuler(new fi(o,s,c)),new U(r,i,a));function nm(e,t,n,r,i,a,o){e.sprites||(e.sprites=new Up(t.atlas,16,{renderOrder:2}),e.group.add(e.sprites.mesh));let s=e.sprites.slots.find(e=>!e.visible);return Object.assign(s,{x:r,y:i,z:a,scale:o,emoji:n,visible:!0,alpha:1,rot:0,flip:!1,tint:1}),s}function rm(e,t){let n=Math.random();return r=>{for(n+=r*e;n>=1;)--n,t()}}function im(e,t,n,r,i=1){e.particles.glow.spawn({x:t+(Math.random()-.5)*.15*i,y:n,z:r+(Math.random()-.5)*.15*i,vx:(Math.random()-.5)*.3,vy:1.4*i+Math.random()*.6,vz:(Math.random()-.5)*.3,life:.5+Math.random()*.3,size:.28*i,sizeEnd:.04,r:3.2,g:1.2+Math.random()*.6,b:.25,drag:1.2,gravity:-1.2,shape:Pp.Glow})}function am(e){let t=new Kp,n=qp(11),r=new Tc({color:9075306,roughness:.95,flatShading:!0}),i=new Tc({color:6965834,roughness:1,flatShading:!0}),a=[];for(let e=0;e<8;e++){let t=Math.PI+(e-3.5)*.38+(n()-.5)*.2,r=32+n()*14;a.push(tm(Math.sin(t)*r,0,Math.cos(t)*r,5+n()*5,5+n()*8,5+n()*5,0,n()*3,0))}t.add(Yp(new zo(.55,1,1,7,1).translate(0,.5,0),i,a),16);let o=[];for(let t=0;t<(e.lite?12:26);t++){let e=Jp(n,2.8,12),t=.2+n()*.6;o.push(tm(e.x,t*.4,e.z,t,t*(.6+n()*.5),t,n()*3,n()*3,n()*3))}t.add(Yp(new Ho(1,0),r,o),4);let s=new Tc({color:3103274,roughness:.9,flatShading:!0}),c=new Tc({color:4861984,roughness:1}),l=[],u=[];for(let e=0;e<14;e++){let e=Jp(n,9,22,.5),t=2.5+n()*3;u.push(tm(e.x,t*.2,e.z,.25,t*.4,.25)),l.push(tm(e.x,t*.4+t*.4,e.z,t*.35,t*.8,t*.35,0,n()*3,0))}t.add(Yp(new zo(.5,.6,1,6),c,u),8),t.add(Yp(new Bo(1,1,7),s,l),10);let d=new Ai;d.position.set(-3.1,0,.9);let f=new Tc({color:5913122,roughness:1});for(let e=0;e<3;e++){let t=new q(new zo(.07,.08,.8,6),f);t.rotation.set(Math.PI/2-.35,e/3*Math.PI*2,0),t.position.y=.12,d.add(t)}let p=new q(new dc(.42,.1,5,9),r);p.rotation.x=Math.PI/2,p.position.y=.06,d.add(p);let m=new ul(16747066,6,9,1.6);m.position.y=.6,d.add(m),t.add(d,3);let h=rm(e.lite?18:40,()=>im(e,-3.1,.18+d.position.y,.9));t.onUpdate((e,n)=>{d.visible&&h(e),m.intensity=(5+Math.sin(n*13)*1.2+Math.sin(n*29)*.8)*t.presence});let g=nm(t,e,`🦣`,-18,1.4,-24,3.2),_=nm(t,e,`🦣`,14,1.1,-30,2.4);nm(t,e,`🌋`,14,4.2,-44,11),t.onUpdate((e,t)=>{g.x=-22+t*.6%44,g.flip=!1,g.y=1.4+Math.abs(Math.sin(t*2.5))*.15,_.x=20-t*.4%40,_.flip=!0,_.y=1.1+Math.abs(Math.sin(t*2.2+1))*.1});let v=rm(3,()=>e.particles.smoke($p.set(14+(Math.random()-.5),9,-44),1,new G(3811888),{size:2,sizeEnd:6,life:4,vy:2}));return t.onUpdate(e=>t.presence>.5&&v(e)),t}function om(e){let t=new Kp;qp(22);let n=new Tc({color:10131086,roughness:.92}),r=new Tc({color:10103338,roughness:.7}),i=[],a=[];for(let e=0;e<=22;e++){let t=Math.PI-1.15+e/22*2.3,n=Math.sin(t)*12,r=Math.cos(t)*12;i.push(tm(n,1.6,r,1.75,3.2,.9,0,t,0)),e%1==0&&a.push(tm(n,3.45,r,.55,.6,.95,0,t,0))}t.add(Yp(new Io(1,1,1),n,i),6),t.add(Yp(new Io(1,1,1),n,a),7);for(let e of[Math.PI-1.2,Math.PI,Math.PI+1.2]){let i=new Ai;i.position.set(Math.sin(e)*12,0,Math.cos(e)*12);let a=new q(new zo(1.3,1.45,5.6,16),n);a.position.y=2.8;let o=new q(new Bo(1.7,2.4,16),r);o.position.y=6.8,i.add(a,o),t.add(i,9,.1)}let o=[],s=[13777466,3828434,13804090,3828434],c=new Tc({color:4864554});[-1,1].forEach((e,n)=>{[0,1].forEach(r=>{let i=new Ai,a=e*(.9+r*.55);i.position.set(Math.sin(a+Math.PI)*5.2*-1,0,Math.cos(a+Math.PI)*5.2);let l=new q(new zo(.05,.05,4,6),c);l.position.y=2;let u=new cc(1.1,1.8,10,6),d=new q(u,new Tc({color:s[n*2+r],side:2,roughness:.8}));d.position.set(.58,2.9,0),i.add(l,d),i.lookAt(0,0,0),i.rotateY(Math.PI/2),o.push({geo:u,base:u.attributes.position.array.slice()}),t.add(i,5)})}),t.onUpdate((e,n)=>{t.presence<=0||o.forEach((e,t)=>{let r=e.geo.attributes.position.array;for(let i=0;i<r.length;i+=3){let a=e.base[i]+.55;r[i+2]=Math.sin(a*4-n*5+t)*.12*a}e.geo.attributes.position.needsUpdate=!0})});let l=new Tc({color:3811866}),u=[new U(-2.7,0,1.4),new U(2.7,0,1.4)];for(let e of u){let n=new q(new zo(.06,.04,1.6,6),l);n.position.set(e.x,.8,e.z),t.add(n,3)}let d=new ul(16752714,4,10,1.5);d.position.set(0,2,1.6),t.add(d,3);let f=rm(e.lite?14:30,()=>{let t=u[Math.random()<.5?0:1];im(e,t.x,1.62,t.z,.6)});t.onUpdate((e,n)=>{t.presence>.6&&f(e),d.intensity=(3.5+Math.sin(n*11)*.8)*t.presence});let p=nm(t,e,`🐉`,-60,14,-40,7);return nm(t,e,`🏰`,-26,3,-46,9),t.onUpdate((e,t)=>{let n=t%40/40;p.x=-70+n*140,p.y=14+Math.sin(t*1.5)*1.5,p.flip=!0,p.rot=Math.sin(t*1.5)*.08}),t}function sm(e,t,n){let r=new ys,i=e*.82;for(let n=0;n<t*2;n++){let a=n/(t*2)*Math.PI*2,o=(n+1)/(t*2)*Math.PI*2,s=n%2==0?e:i;n===0?r.moveTo(Math.cos(a)*s,Math.sin(a)*s):r.lineTo(Math.cos(a)*s,Math.sin(a)*s),r.lineTo(Math.cos(o)*s,Math.sin(o)*s)}let a=new vs;return a.absarc(0,0,e*.25,0,Math.PI*2,!0),r.holes.push(a),new rc(r,{depth:n,bevelEnabled:!0,bevelThickness:.05,bevelSize:.05,bevelSegments:1,curveSegments:6})}function cm(e){let t=new Kp,n=qp(33),r=new Tc({color:9058858,roughness:.9}),i=new Tc({color:13146698,roughness:.35,metalness:.85}),a=new Tc({color:4868688,roughness:.6,metalness:.6}),o=[];for(let e=0;e<6;e++){let i=Math.PI+(e-2.5)*.42+(n()-.5)*.15,s=18+n()*10,c=9+n()*7,l=new q(new zo(.75,1.05,c,12),r);l.position.set(Math.sin(i)*s,c/2,Math.cos(i)*s);let u=new q(new zo(.85,.85,.4,12),a);u.position.y=c/2-.3,l.add(u),t.add(l,c+2),o.push(new U(l.position.x,c,l.position.z))}let s=new G(2761760),c=rm(e.lite?6:14,()=>{let t=o[Math.floor(Math.random()*o.length)];e.particles.smoke($p.set(t.x,t.y+.5,t.z),1,s,{size:1.2,sizeEnd:5,life:5,vy:1.6,vx:.8,a:.7})});t.onUpdate(e=>t.presence>.7&&c(e));let l=[];for(let[e,n,r,a,o]of[[-6.5,4.2,-10,2.6,.25],[-1,6.4,-13,3.4,-.19],[5.5,3.6,-10,2.2,.3],[9.5,7.5,-14,2.8,-.22]]){let s=new q(sm(a,Math.round(a*6),.5),i);s.position.set(e,n,r),t.add(s,n+a+2),l.push({m:s,speed:o})}t.onUpdate(e=>l.forEach(t=>t.m.rotation.z+=t.speed*e));let u=[],d=[];for(let e=0;e<5;e++){let t=Math.PI+(e-2)*.5,n=5.5,r=Math.sin(t)*n,i=Math.cos(t)*n;u.push(tm(r,.35,i,.3,3,.3,Math.PI/2,t,0)),d.push(new U(r,.7,i))}t.add(Yp(new zo(1,1,1,10),a,u),3);let f=0;t.onUpdate(n=>{if(f-=n,f<=0&&t.presence>.8){f=.6+Math.random()*1.2;let t=d[Math.floor(Math.random()*d.length)];for(let n=0;n<8;n++)e.particles.matter.spawn({x:t.x,y:t.y,z:t.z,vx:(Math.random()-.5)*.8,vy:3+Math.random()*2,vz:(Math.random()-.5)*.8,life:1.2,size:.3,sizeEnd:1.4,r:.92,g:.92,b:.95,a:.5,drag:2,shape:Pp.Smoke})}});let p=nm(t,e,`🚂`,-50,1.6,-26,4);return nm(t,e,`🏭`,22,3.5,-40,9),t.onUpdate((n,r)=>{p.x=50-r*5%100,t.presence>.8&&Math.random()<.15&&e.particles.smoke($p.set(p.x-1,3.4,-26),1,new G(14540253),{size:.6,sizeEnd:2.4,life:2})}),t}function lm(){let e=document.createElement(`canvas`);e.width=64,e.height=128;let t=e.getContext(`2d`);t.fillStyle=`#000`,t.fillRect(0,0,64,128);for(let e=4;e<128;e+=8)for(let n=4;n<64;n+=8)Math.random()<.45&&(t.fillStyle=Math.random()<.8?`#ffd890`:`#9ad0ff`,t.fillRect(n,e,4,4));let n=new Mo(e);return n.colorSpace=Hn,n.magFilter=St,n}function um(e){let t=new Kp,n=qp(44),r=new Tc({color:1711658,roughness:.6,metalness:.3,emissive:16777215,emissiveMap:lm(),emissiveIntensity:1.3}),i=[];for(let t=0;t<(e.lite?26:46);t++){let e=Math.PI+(n()-.5)*3.4,t=22+n()*22,r=6+n()*18,a=2.5+n()*3;i.push(tm(Math.sin(e)*t,r/2,Math.cos(e)*t,a,r,a,0,n()*3,0))}t.add(Yp(new Io(1,1,1),r,i),26);let a=new Cc({transparent:!0,depthWrite:!1,blending:2,side:2,uniforms:{uColor:{value:new G(.5,.65,1)}},vertexShader:`varying float vY; void main(){ vY = uv.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`uniform vec3 uColor; varying float vY; void main(){ gl_FragColor = vec4(uColor * pow(vY, 1.5) * 0.35, 1.0); }`}),o=[];for(let e=0;e<3;e++){let n=new q(new zo(.15,2.6,34,16,1,!0).translate(0,17,0),a),r=new Ai;r.position.set((e-1)*11,0,-18-e*2),n.rotation.x=Math.PI,n.position.y=34;let i=new Ai;i.add(n),r.add(i),t.add(r,4),o.push(i)}t.onUpdate((e,t)=>o.forEach((e,n)=>e.rotation.set(Math.sin(t*.4+n*2)*.5,0,Math.sin(t*.3+n)*.6)));let s=document.createElement(`canvas`);s.width=s.height=256;let c=s.getContext(`2d`);c.strokeStyle=`#ffd23f`,c.lineWidth=10,c.beginPath(),c.arc(128,128,112,0,Math.PI*2),c.stroke(),c.fillStyle=`#f2f2f2`,c.font=`bold 150px sans-serif`,c.textAlign=`center`,c.textBaseline=`middle`,c.fillText(`H`,128,136);let l=new q(new cc(3.2,3.2),new Ua({map:new Mo(s),transparent:!0,depthWrite:!1,opacity:.85}));l.rotation.x=-Math.PI/2,l.position.y=.207,t.add(l,.3,0);let u=nm(t,e,`🚁`,0,12,-20,3);return t.onUpdate((e,t)=>{u.x=Math.sin(t*.25)*16,u.z=-22+Math.cos(t*.25)*6,u.flip=Math.cos(t*.25)<0,u.y=12+Math.sin(t*1.3)*.5}),t}function dm(e){let t=new Kp,n=[];for(let e=0;e<12;e++){let r=e/12*Math.PI*2+.26;if(Math.abs(Math.sin(r))<.35)continue;let i=e%2==0?new G(.2,2.6,3):new G(3,.4,2.4),a=new q(new Io(.22,7,.22),new Ua({color:i}));a.position.set(Math.sin(r)*10,3.5,Math.cos(r)*10);let o=new q(new sc(.45),new Ua({color:i}));o.position.y=4,a.add(o),t.add(a,9),n.push(a)}let r=new Ua({color:new G(.3,2.4,3.2),transparent:!0,opacity:.85}),i=new Ua({color:new G(3.2,.5,2.6),transparent:!0,opacity:.85}),a=[];[2,2.35,2.7].forEach((e,n)=>{let o=new Ai;o.position.y=1+n*.14;let s=new q(new dc(e,.018,6,128),n===1?i:r);o.add(s),t.add(o,6,.2+n*.05),a.push(s)}),t.onUpdate((e,t)=>{a.forEach((e,n)=>{e.rotation.set(Math.PI/2+.18*Math.sin(t*.5+n),0,t*(.25+n*.12)),e.position.y=Math.sin(t*.8+n)*.05}),n.forEach((e,n)=>e.children[0].rotation.set(t,t*1.3+n,0))});let o=nm(t,e,`🛸`,0,9,-18,2.4);return t.onUpdate((e,t)=>{o.x=Math.sin(t*.7)*12,o.y=9+Math.sin(t*2.1)*1.2}),t}function fm(){let e=document.createElement(`canvas`);e.width=4,e.height=256;let t=e.getContext(`2d`);for(let e=0;e<256;e++){let n=.5+.5*Math.sin(e*.15)*Math.sin(e*.031+1);t.fillStyle=`rgb(${200+n*50},${130+n*60},${90+n*40})`,t.fillRect(0,e,4,1)}let n=new Mo(e);return n.colorSpace=Hn,n}function pm(e){let t=new Kp,n=qp(66),r=new oc(1.9,3),i=r.attributes.position;for(let e=0;e<i.count;e++){$p.fromBufferAttribute(i,e);let t=1+Math.sin($p.x*3.1)*Math.sin($p.y*2.7)*Math.sin($p.z*3.3)*.12+(n()-.5)*.06;$p.multiplyScalar(t),$p.y>.9&&($p.y=.9+($p.y-.9)*.15),i.setXYZ(e,$p.x,$p.y,$p.z)}r.computeVertexNormals();let a=new Tc({color:6971504,roughness:.95,flatShading:!0}),o=new q(r,a);o.position.y=-.8,o.scale.set(1,.5,1),t.add(o,10,0);let s=new Ai;s.position.set(-34,16,-70);let c=new q(new uc(13,48,32),new Tc({map:fm(),roughness:.9}));c.rotation.z=.3;let l=new q(new lc(16,25,96,1),new Ua({color:14205088,transparent:!0,opacity:.55,side:2}));l.rotation.set(1.2,.2,.3),s.add(c,l),t.add(s,40,0);let u=new Ai;u.position.set(26,12,-58);let d=new q(new lc(2.6,9,96,1),new Cc({transparent:!0,depthWrite:!1,blending:2,side:2,uniforms:{uTime:{value:0}},vertexShader:`varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`uniform float uTime; varying vec2 vP;
        void main(){ float r = length(vP); float a = atan(vP.y, vP.x);
          float swirl = 0.5 + 0.5 * sin(a * 6.0 - r * 1.8 + uTime * 2.0) * sin(a * 3.0 + uTime);
          float fall = smoothstep(9.0, 3.0, r) * smoothstep(2.6, 3.4, r);
          vec3 col = mix(vec3(3.0, 0.9, 0.3), vec3(3.5, 2.6, 1.6), smoothstep(6.0, 3.0, r));
          gl_FragColor = vec4(col * fall * (0.4 + 0.8 * swirl), 1.0); }`}));d.rotation.set(1.25,0,.25);let f=new q(new uc(2.5,32,24),new Ua({color:0}));u.add(d,f),t.add(u,40,0),t.onUpdate((e,t)=>{d.material.uniforms.uTime.value=t,s.rotation.y+=e*.01});let p=new po(new Ho(1,0),a,e.lite?30:70),m=Array.from({length:p.count},()=>({r:5+n()*6,a:n()*Math.PI*2,y:(n()-.5)*3+1.2,s:.1+n()*.35,sp:.05+n()*.08,spin:n()*3}));t.add(p,12,.1),t.onUpdate((e,t)=>{m.forEach((e,n)=>{let r=e.a+t*e.sp;$p.set(Math.sin(r)*e.r,e.y+p.position.y,Math.cos(r)*e.r),Zp.setFromEuler(Qp.set(t*.3+e.spin,t*.2,0)),em.setScalar(e.s),p.setMatrixAt(n,Xp.compose($p.setY(e.y),Zp,em))}),p.instanceMatrix.needsUpdate=!0});let h=2;return t.onUpdate(n=>{if(h-=n,h<=0&&t.presence>.8){h=1.5+Math.random()*3;let t=(Math.random()-.5)*80;e.particles.glow.spawn({x:t,y:25+Math.random()*15,z:-60,vx:-30-Math.random()*20,vy:-10,vz:0,life:1.2,size:.4,sizeEnd:.1,r:3,g:3,b:4,stretch:.12,shape:Pp.Spark})}}),nm(t,e,`🛰️`,12,8,-16,1.8),t}function mm(e){let t=new Kp,n=qp(77),r=new Ec({color:16777215,metalness:.3,roughness:.15,iridescence:1,iridescenceIOR:1.6,clearcoat:1,flatShading:!0}),i=e.lite?30:64,a=new po(new sc(1,0),r,i),o=Array.from({length:i},()=>({r:3.5+n()*12,a:n()*Math.PI*2,y:n()*9-1,s:.15+n()*.6,sp:(n()-.5)*.4,bob:n()*6,tilt:n()}));t.add(a,14,.05);let s=new po(new Io(1,.12,1),new Ec({color:10158058,metalness:.1,roughness:.05,transmission:0,clearcoat:1,transparent:!0,opacity:.6}),19),c=[],l=0;for(let e=-2;e<=2;e++)for(let t=-2;t<=2;t++)Math.abs(e)+Math.abs(t)>3||l>=19||(c.push({x:e*1.05,z:t*1.05,ph:n()*6}),l++);t.add(s,6,0);let u=new Cc({transparent:!0,depthWrite:!1,side:2,blending:2,uniforms:{uTime:{value:0}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`uniform float uTime; varying vec2 vUv;
      void main(){ vec2 c = vUv - 0.5; float r = length(c) * 2.0; float a = atan(c.y, c.x);
        float s = 0.5 + 0.5 * sin(a * 5.0 + r * 12.0 - uTime * 4.0);
        float edge = smoothstep(1.0, 0.85, r);
        vec3 col = mix(vec3(0.0, 2.2, 1.6), vec3(2.4, 0.0, 2.0), s) * (0.15 + 0.85 * pow(r, 2.0));
        gl_FragColor = vec4(col * edge, 1.0); }`}),d=[];for(let e=0;e<4;e++){let n=Math.PI+(e-1.5)*.75,r=new q(new Ro(1.6,48),u);r.position.set(Math.sin(n)*7.5,2.4+e%2*1.6,Math.cos(n)*7.5),r.lookAt(0,1.5,0);let i=new q(new dc(1.6,.06,8,64),new Ua({color:new G(2.5,2.5,3)}));r.add(i),t.add(r,10),d.push(r)}let f=new Ao(new pc(new oc(22,2)),new vo({color:new G(.6,1.6,1.4),transparent:!0,opacity:.35}));return f.position.y=2,t.add(f,30,0),t.onUpdate((e,t)=>{u.uniforms.uTime.value=t,d.forEach((e,n)=>e.rotation.z=t*(.4+n*.1)),f.rotation.set(t*.03,t*.05,0),f.scale.setScalar(1+Math.sin(t*.7)*.04),f.material.color.setHSL(t*.05%1,.8,.6).multiplyScalar(2),o.forEach((e,n)=>{let r=e.a+t*e.sp;$p.set(Math.sin(r)*e.r,e.y+Math.sin(t*.8+e.bob)*.8,Math.cos(r)*e.r),Zp.setFromEuler(Qp.set(t*e.tilt,t*.5+e.bob,t*.3)),a.setMatrixAt(n,Xp.compose($p,Zp,em.setScalar(e.s)))}),a.instanceMatrix.needsUpdate=!0,c.forEach((e,n)=>{$p.set(e.x,.1+Math.sin(t*.9+e.ph)*.08,e.z),Zp.setFromEuler(Qp.set(Math.sin(t+e.ph)*.06,t*.02,Math.cos(t*.7+e.ph)*.06)),s.setMatrixAt(n,Xp.compose($p,Zp,em.set(.98,1,.98)))}),s.instanceMatrix.needsUpdate=!0}),nm(t,e,`👁️`,-14,14,-30,6),nm(t,e,`🫥`,16,16,-34,7),t}var hm=[am,om,cm,um,dm,pm,mm];function gm(e,t){let n=hm[Math.min(e,hm.length-1)](t);return n.setPresence(0),n}var _m=`
float hash13(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vnoise3(vec3 p) {
  vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash13(i), hash13(i + vec3(1,0,0)), f.x), mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x), mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float vnoise2(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1,0)), f.x), mix(hash12(i + vec2(0,1)), hash12(i + vec2(1,1)), f.x), f.y);
}
float fbm3(vec3 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 5; i++) { s += a * vnoise3(p); p *= 2.03; a *= 0.5; } return s; }
float fbm2(vec2 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++) { s += a * vnoise2(p); p *= 2.07; a *= 0.5; } return s; }
vec2 voronoi(vec2 x) {
  vec2 n = floor(x), f = fract(x); float md = 8.0, md2 = 8.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 g = vec2(float(i), float(j));
    vec2 o = vec2(hash12(n + g), hash12(n + g + 17.0));
    float d = length(g + o - f);
    if (d < md) { md2 = md; md = d; } else if (d < md2) md2 = d;
  }
  return vec2(md, md2 - md);
}
`,vm=`
uniform vec3 uTop, uHorizon, uBottom, uSunDir, uSunColor, uNebA, uNebB, uCloudColor, uRidgeColor;
uniform float uSunSize, uSunStripes, uStars, uNebula, uClouds, uRidge, uSkyline, uWarp, uTime;
varying vec3 vDir;
${_m}
void main() {
  vec3 d = normalize(vDir);
  if (uWarp > 0.0) {
    float a = atan(d.x, d.z);
    float seg = 6.2831 / 8.0;
    float k = abs(mod(a + uTime * 0.05, seg) - seg * 0.5);
    vec3 kd = normalize(vec3(sin(k) * length(d.xz), d.y, cos(k) * length(d.xz)));
    d = normalize(mix(d, kd, uWarp * 0.7));
    d.y += sin(a * 3.0 + uTime * 0.4) * 0.05 * uWarp;
    d = normalize(d);
  }
  float e = d.y;
  float az = atan(d.x, d.z);
  vec3 col = e > 0.0 ? mix(uHorizon, uTop, pow(clamp(e, 0.0, 1.0), 0.55)) : mix(uHorizon, uBottom, pow(clamp(-e, 0.0, 1.0), 0.4));

  // Nebula
  if (uNebula > 0.0) {
    float n = fbm3(d * 2.6 + vec3(uTime * 0.004, 0.0, 0.0));
    float n2 = fbm3(d * 5.0 - 3.0);
    vec3 neb = mix(uNebA, uNebB, smoothstep(0.35, 0.75, n2));
    col += neb * pow(smoothstep(0.38, 0.85, n), 1.6) * uNebula * 1.6;
  }

  // Stars
  if (uStars > 0.0) {
    vec3 sp = d * 180.0;
    vec3 cell = floor(sp);
    float h = hash13(cell);
    float tw = 0.65 + 0.35 * sin(uTime * (1.0 + h * 3.0) + h * 40.0);
    float star = step(0.9965, h) * smoothstep(0.42, 0.0, length(fract(sp) - 0.5));
    col += vec3(star * tw * 2.4 * uStars) * smoothstep(-0.1, 0.15, e + uNebula);
  }

  // Sun (optionally synthwave-striped)
  vec3 sd3 = normalize(uSunDir);
  float sd = dot(d, sd3);
  float disc = smoothstep(cos(uSunSize), cos(uSunSize * 0.92), sd);
  if (uSunStripes > 0.0) {
    float local = (d.y - sd3.y) / uSunSize;
    float band = step(0.5, fract(local * 7.0 - uTime * 0.3)) + step(0.15, local);
    disc *= mix(1.0, clamp(band, 0.0, 1.0), uSunStripes);
    col += mix(uSunColor, vec3(1.0, 0.2, 0.6), clamp(-local * 0.8 + 0.5, 0.0, 1.0)) * disc * 1.6 * uSunStripes;
    disc *= 1.0 - uSunStripes;
  }
  col += uSunColor * (disc * 2.2 + pow(max(sd, 0.0), 10.0) * 0.45 + pow(max(sd, 0.0), 80.0) * 0.6);

  // Clouds: drifting fbm bands above the horizon
  if (uClouds > 0.0 && e > -0.05) {
    vec2 cp = d.xz / (d.y + 0.25) * 1.6 + vec2(uTime * 0.02, 0.0);
    float c = fbm2(cp);
    float m = smoothstep(0.45, 0.8, c) * smoothstep(-0.05, 0.12, e) * (1.0 - smoothstep(0.5, 0.95, e));
    col = mix(col, uCloudColor * (0.75 + 0.35 * fbm2(cp * 2.0)), m * uClouds);
  }

  // Mountain ridge silhouette
  if (uRidge > 0.0) {
    float h = 0.04 + 0.05 * (0.5 + 0.5 * sin(az * 3.0 + 1.3)) + 0.03 * sin(az * 7.0 + 0.4) + 0.025 * vnoise2(vec2(az * 9.0, 0.0));
    h *= uRidge;
    float far = 0.03 + 0.03 * vnoise2(vec2(az * 5.0 + 9.0, 1.0));
    col = mix(col, mix(uRidgeColor, uHorizon, 0.45), step(e, far * uRidge) * 0.8);
    col = mix(col, uRidgeColor, step(e, h));
  }

  // City skyline with lit windows
  if (uSkyline > 0.0 && e < 0.2) {
    float cols = 70.0;
    float bi = floor((az + 3.1416) / 6.2832 * cols);
    float bh = (0.02 + 0.1 * pow(hash12(vec2(bi, 3.0)), 2.0)) * uSkyline;
    if (e < bh && e > -0.02) {
      vec3 b = mix(vec3(0.02, 0.025, 0.05), uRidgeColor, 0.3);
      vec2 w = vec2(fract((az + 3.1416) / 6.2832 * cols * 6.0), fract(e * 160.0));
      float lit = step(0.55, hash12(floor(vec2((az + 3.1416) / 6.2832 * cols * 6.0, e * 160.0))));
      float win = step(0.3, w.x) * step(w.x, 0.75) * step(0.35, w.y) * step(w.y, 0.8) * lit;
      col = b + vec3(1.0, 0.8, 0.45) * win * 1.4;
    }
  }

  gl_FragColor = vec4(col, 1.0);
}
`,ym=`
uniform vec3 uA, uB, uGrid, uFog, uKey;
uniform vec4 uPatA, uPatB;
uniform float uTime;
varying vec3 vWorld;
${_m}
void main() {
  vec2 p = vWorld.xz;
  float dist = length(p);
  vec3 col = vec3(0.0);
  float glow = 0.0;

  // Grass / dirt
  if (uPatA.x > 0.0) {
    float n = fbm2(p * 0.35);
    float blades = vnoise2(p * 9.0);
    vec3 g = mix(uA, uB, smoothstep(0.35, 0.75, n)) * (0.8 + 0.3 * blades);
    col += g * uPatA.x;
  }
  // Cobblestone
  if (uPatA.y > 0.0) {
    vec2 v = voronoi(p * 1.6);
    float stone = smoothstep(0.02, 0.12, v.y);
    vec3 c = mix(uB * 0.5, uA * (0.85 + 0.3 * hash12(floor(p * 1.6))), stone);
    col += c * uPatA.y;
  }
  // Riveted metal plates
  if (uPatA.z > 0.0) {
    vec2 g = fract(p / 2.2);
    vec2 e = min(g, 1.0 - g);
    float seam = smoothstep(0.0, 0.03, min(e.x, e.y));
    vec2 rv = abs(fract(p / 2.2 + 0.5) - 0.5);
    float rivet = smoothstep(0.06, 0.04, length(min(e, vec2(0.08)) - 0.08) );
    vec3 c = mix(uB * 0.6, uA * (0.85 + 0.25 * vnoise2(p * 3.0)), seam) + rivet * 0.12;
    col += c * uPatA.z;
    glow += 0.0 * rv.x;
  }
  // Asphalt with road markings
  if (uPatA.w > 0.0) {
    vec3 c = mix(uB, uA, vnoise2(p * 6.0) * 0.6 + 0.3);
    float ang = atan(p.y, p.x);
    float spoke = smoothstep(0.03, 0.0, abs(fract(ang / 6.2832 * 8.0) - 0.5) * dist * 0.6 - 0.02);
    float dash = step(0.5, fract(dist * 0.5));
    c += uGrid * spoke * dash * step(3.0, dist) * 0.35;
    col += c * uPatA.w;
  }
  // Neon grid (scrolling)
  if (uPatB.x > 0.0) {
    vec2 g = abs(fract(vec2(p.x, p.y + uTime * 1.2) / 1.6) - 0.5);
    float line = smoothstep(0.035, 0.0, min(g.x, g.y) * 1.6 / max(1.0, dist * 0.08));
    vec3 c = uA + uGrid * line * 2.2;
    col += c * uPatB.x;
  }
  // Glowing cracks
  if (uPatB.z > 0.0) {
    vec2 v = voronoi(p * 0.9 + vec2(0.0, uTime * 0.05));
    float crack = smoothstep(0.06, 0.0, v.y);
    vec3 c = mix(uA, uB, v.x) + uGrid * crack * (1.6 + 0.8 * sin(uTime * 2.0 + v.x * 10.0));
    col += c * uPatB.z;
  }

  // Key-light pool and ambient occlusion around the platform.
  col *= 0.75 + 0.45 * smoothstep(9.0, 1.5, dist) ;
  col *= mix(0.55, 1.0, smoothstep(1.6, 3.2, dist));

  // Fade to the horizon.
  float fog = smoothstep(8.0, 60.0, dist);
  col = mix(col, uFog, fog);
  float alpha = 1.0 - uPatB.y * (1.0 - smoothstep(60.0, 90.0, dist) * 0.0);
  alpha *= 1.0 - smoothstep(70.0, 90.0, dist);
  gl_FragColor = vec4(col, alpha);
}
`,bm=class{group=new Ai;theme;sky;skyU;ground;groundU;platform;platformMat;rimMat;platformRim;shadow;props=[];ctx;era=0;fromEra=0;transition=1;transitionDur=3.2;time=0;constructor(e,t){this.ctx=e,this.era=t,this.fromEra=t,this.theme=new Np(Mp[t]),this.skyU={uTop:{value:new G},uHorizon:{value:new G},uBottom:{value:new G},uSunDir:{value:new U},uSunColor:{value:new G},uNebA:{value:new G},uNebB:{value:new G},uCloudColor:{value:new G},uRidgeColor:{value:new G},uSunSize:{value:.1},uSunStripes:{value:0},uStars:{value:0},uNebula:{value:0},uClouds:{value:0},uRidge:{value:0},uSkyline:{value:0},uWarp:{value:0},uTime:{value:0}},this.sky=new q(new uc(180,48,24),new Cc({uniforms:this.skyU,vertexShader:`varying vec3 vDir; void main(){ vDir = position; vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }`,fragmentShader:vm,side:1,depthWrite:!1})),this.sky.renderOrder=-10,this.sky.frustumCulled=!1,this.groundU={uA:{value:new G},uB:{value:new G},uGrid:{value:new G},uFog:{value:new G},uKey:{value:new G},uPatA:{value:new Zr},uPatB:{value:new Zr},uTime:{value:0}},this.ground=new q(new Ro(90,72),new Cc({uniforms:this.groundU,vertexShader:`varying vec3 vWorld; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:ym,transparent:!0,depthWrite:!0})),this.ground.rotation.x=-Math.PI/2,this.ground.renderOrder=-5,this.platform=new Ai,this.platformMat=new Tc({color:8020552,roughness:.8,metalness:.1});let n=new q(new zo(1.75,1.95,.34,64,1),this.platformMat);n.position.y=.03;let r=new q(new zo(2.25,2.4,.16,64,1),this.platformMat);r.position.y=-.1,this.rimMat=new Ua({color:16751434}),this.platformRim=new q(new dc(1.76,.025,8,96),this.rimMat),this.platformRim.rotation.x=Math.PI/2,this.platformRim.position.y=.2,this.platform.add(n,r,this.platformRim);let i=document.createElement(`canvas`);i.width=i.height=128;let a=i.getContext(`2d`),o=a.createRadialGradient(64,64,4,64,64,64);o.addColorStop(0,`rgba(0,0,0,0.55)`),o.addColorStop(.5,`rgba(0,0,0,0.25)`),o.addColorStop(1,`rgba(0,0,0,0)`),a.fillStyle=o,a.fillRect(0,0,128,128),this.shadow=new q(new cc(2.6,2.6),new Ua({map:new Mo(i),transparent:!0,depthWrite:!1})),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=.205,this.shadow.renderOrder=1,this.group.add(this.sky,this.ground,this.platform,this.shadow),this.props=Array.from({length:Mp.length},()=>null),this.ensureProps(t).setPresence(1),this.applyTheme()}ensureProps(e){let t=this.props[e];return t||(t=gm(e,this.ctx),this.props[e]=t,this.group.add(t.group)),t}setEra(e,t=!1){e===this.era&&this.transition>=1||(this.fromEra=t?e:this.era,this.era=e,this.transition=+!!t,this.ensureProps(e),t&&(this.props.forEach((t,n)=>t?.setPresence(+(n===e))),this.applyTheme()))}get transitioning(){return this.transition<1}platformPresence(e){return e>=5?0:1}applyTheme(){let e=this.transition,t=e*e*(3-2*e);this.theme.set(Mp[this.fromEra],Mp[this.era],t);let n=this.theme,r=this.skyU;r.uTop.value.copy(n.c.skyTop),r.uHorizon.value.copy(n.c.skyHorizon),r.uBottom.value.copy(n.c.skyBottom),r.uSunDir.value.copy(n.v.sunDir),r.uSunColor.value.copy(n.c.sunColor),r.uNebA.value.copy(n.c.nebA),r.uNebB.value.copy(n.c.nebB),r.uCloudColor.value.copy(n.c.cloudColor),r.uRidgeColor.value.copy(n.c.ridgeColor),r.uSunSize.value=n.n.sunSize,r.uSunStripes.value=n.n.sunStripes,r.uStars.value=n.n.stars,r.uNebula.value=n.n.nebula,r.uClouds.value=n.n.clouds,r.uRidge.value=n.n.ridge,r.uSkyline.value=n.n.skyline,r.uWarp.value=n.n.warp;let i=this.groundU;i.uA.value.copy(n.c.groundA),i.uB.value.copy(n.c.groundB),i.uGrid.value.copy(n.c.gridColor),i.uFog.value.copy(n.c.fog),i.uPatA.value.copy(n.v4.groundA4),i.uPatB.value.copy(n.v4.groundB4),this.platformMat.color.copy(n.c.platform),this.rimMat.color.copy(n.c.platformRim).multiplyScalar(3)}update(e){if(this.time+=e,this.transition<1){this.transition=Math.min(1,this.transition+e/this.transitionDur);let t=this.transition;this.props.forEach((e,n)=>{e&&(n===this.era?e.setPresence(Math.max(0,(t-.35)/.65)):n===this.fromEra?e.setPresence(Math.max(0,1-t/.45)):e.setPresence(0))}),this.applyTheme()}let t=this.platformPresence(this.fromEra)+(this.platformPresence(this.era)-this.platformPresence(this.fromEra))*this.transition;this.platform.visible=t>.01,this.platform.position.y=(t-1)*3,this.platform.scale.setScalar(.6+.4*t),this.skyU.uTime.value=this.time,this.groundU.uTime.value=this.time;for(let t of this.props)t&&t.presence>0&&t.update(e,this.time)}},xm={monkey:{emoji:`🐒`,attack:`lunge`,max:8,radius:[2.35,2.6],height:.55,scale:.75,rate:1.2,color:16769184},gorilla:{emoji:`🦍`,attack:`throw`,max:6,radius:[3.3,4.2],height:.65,scale:1.1,rate:.8,color:13154472},trebuchet:{emoji:`🏰`,attack:`catapult`,max:3,radius:[8,9.5],height:1.3,scale:2.4,rate:.35,color:16756848},knight:{emoji:`🏇`,attack:`charge`,max:4,radius:[4.6,5.4],height:.8,scale:1.4,rate:.5,color:14214399},steam:{emoji:`⚙️`,attack:`steam`,max:6,radius:[2.9,3.2],height:1.3,scale:.7,rate:.8,color:16777215},factory:{emoji:`🏭`,attack:`slap`,max:2,radius:[7,8],height:1.6,scale:3,rate:.6,color:16765088},turret:{emoji:`🎯`,attack:`tracer`,max:6,radius:[3.6,4.4],height:.5,scale:.8,rate:2.2,color:16765024},jet:{emoji:`✈️`,attack:`strafe`,max:3,radius:[9,12],height:6,scale:1.4,rate:.25,color:16769152},drone:{emoji:`🛸`,attack:`drone`,max:10,radius:[2.6,3.3],height:1.9,scale:.5,rate:2,color:6356960},orbital:{emoji:`🛰️`,attack:`orbital`,max:4,radius:[5,7],height:11,scale:1.4,rate:.5,color:16728160},moon:{emoji:`🌕`,attack:`moon`,max:1,radius:[16,16],height:13,scale:6,rate:.45,color:16773296},blackhole:{emoji:`🕳️`,attack:`pull`,max:1,radius:[11,11],height:4.5,scale:4.5,rate:2.5,color:10510591},printer:{emoji:`🖨️`,attack:`paper`,max:3,radius:[4.8,5.4],height:1,scale:1.1,rate:1.2,color:16777215},paradox:{emoji:`♾️`,attack:`clone`,max:4,radius:[6,7],height:3.2,scale:1.2,rate:1,color:8454096}},Sm=new U(0,1.25,0),Cm=class{batch;groups=[];free;fly;particles;onImpact;time=0;tmp=new U;tmp2=new U;frenzy=1;activity=1;pending=[];later(e,t){this.pending.length<200&&this.pending.push({at:this.time+e,fn:t})}constructor(e,t,n,r){this.batch=new Up(e,80,{renderOrder:6}),this.free=[...this.batch.slots],this.fly=t,this.particles=n,this.onImpact=r,u.forEach((e,t)=>{let n=xm[e.id];n&&this.groups.push({id:e.id,vis:n,units:[],owned:0,acc:Math.random(),color:new G(n.color)})})}sync(e){for(let t of this.groups){let n=e[t.id]??0;t.owned=n;let r=Math.min(t.vis.max,n);for(;t.units.length<r;)this.spawnUnit(t,t.units.length);for(;t.units.length>r;){let e=t.units.pop();e.slot.visible=!1,this.free.push(e.slot)}}}spawnUnit(e,t){let n=this.free.pop();if(!n)return;let r=e.vis,i=t%2==0?-1:1,a=Math.floor(t/2),o=r.attack===`drone`?Math.PI:1.25,s=r.attack===`drone`?t/r.max*Math.PI*2:Math.PI+i*(.5+a/Math.max(1,r.max/2)*o),c=r.radius[0]+t*.37%1*(r.radius[1]-r.radius[0]),l=new U(Math.sin(s)*c,r.height,Math.cos(s)*c);r.attack===`moon`&&l.set(-20,r.height,-42),r.attack===`pull`&&l.set(13,r.height,-14),Object.assign(n,{x:l.x,y:l.y,z:l.z,emoji:r.emoji,scale:0,visible:!0,alpha:1,rot:0,tint:1,flip:l.x>0}),e.units.push({slot:n,base:l,angle:s,phase:Math.random()*10,lunge:0}),this.particles.sparks(l,10,e.color,2.5)}update(e){this.time+=e;let t=this.time;for(let e=this.pending.length-1;e>=0;e--)if(this.pending[e].at<=t){let{fn:t}=this.pending[e];this.pending[e]=this.pending[this.pending.length-1],this.pending.pop(),t()}for(let n of this.groups){if(n.units.length===0)continue;let r=n.vis,i=1+Math.min(.6,Math.log10(Math.max(1,n.owned))*.18);for(let a of n.units){let n=a.slot;n.scale=Math.min(r.scale*i,n.scale+e*r.scale*4),a.lunge=Math.max(0,a.lunge-e*3.5);let o=Math.sin(Math.min(1,a.lunge)*Math.PI);switch(this.tmp.copy(Sm).sub(a.base).setY(0).normalize(),r.attack){case`drone`:{let e=a.angle+t*.8,i=r.radius[0]+Math.sin(t*1.3+a.phase)*.3;n.x=Math.sin(e)*i,n.z=Math.cos(e)*i,n.y=r.height+Math.sin(t*2.4+a.phase)*.35,n.flip=Math.cos(e)<0;break}case`strafe`:n.x=((t*.12+a.phase*.1)%1*2-1)*26,n.y=r.height+2+a.phase*.3,n.z=-8-a.phase,n.flip=!1,n.rot=-.1;break;case`orbital`:{let e=a.angle*.5+t*.15;n.x=Math.sin(e)*r.radius[0],n.z=Math.cos(e)*r.radius[0]-3,n.y=r.height+Math.sin(t+a.phase)*.4;break}default:{n.x=a.base.x+this.tmp.x*o*.7,n.z=a.base.z+this.tmp.z*o*.7;let e=r.attack===`lunge`||r.attack===`throw`?Math.abs(Math.sin(t*3+a.phase))*.08:0;n.y=a.base.y+e+Math.sin(t*1.4+a.phase)*.05+(r.attack===`clone`?Math.sin(t*2+a.phase)*.4:0),n.rot=r.attack===`steam`?t*2+a.phase:r.attack===`lunge`?-o*.6*(n.flip?-1:1):0,r.attack===`clone`&&(n.alpha=.55+Math.sin(t*3+a.phase)*.25),r.attack===`pull`&&(n.rot=t*.6)}}}let a=r.rate*(1+Math.log10(Math.max(1,n.owned)))*this.frenzy*this.activity;for(n.acc+=e*Math.min(a,9);n.acc>=1;){--n.acc;let e=n.units[Math.floor(Math.random()*n.units.length)];this.attack(n,e)}}this.batch.flush()}aimPoint(e){let t=Math.random()*Math.PI*2;return e.set(Math.cos(t)*.55,1.25+Math.sin(t)*.55,.6)}attack(e,t){let n=e.vis,r=t.slot,i=this.tmp.set(r.x,r.y,r.z),a=this.aimPoint(this.tmp2),o=e.color,s=this.particles,c=a.clone(),l=e=>this.onImpact(c,e,o);switch(n.attack){case`lunge`:case`charge`:t.lunge=1,this.later(.14,()=>l(.25));break;case`throw`:t.lunge=.6,this.fly.strike(`🪨`,i.clone().setY(i.y+.4),a.clone(),.5,.35,()=>l(.35),i.x>0);break;case`catapult`:this.fly.strike(`🪨`,i.clone().setY(i.y+1.5),a.clone(),1.1,.65,()=>{l(.6),s.smoke(a,3,new G(9075306))},i.x>0);break;case`steam`:t.lunge=.8;for(let e=0;e<4;e++)s.matter.spawn({x:i.x,y:i.y,z:i.z,vx:(a.x-i.x)*1.6+(Math.random()-.5),vy:(a.y-i.y)*1.6+Math.random(),vz:(a.z-i.z)*1.6,life:.7,size:.2,sizeEnd:.9,r:1,g:1,b:1,a:.45,drag:2.2,shape:Pp.Smoke});this.later(.28,()=>l(.2));break;case`slap`:this.fly.strike(`🖐️`,i.clone().setY(i.y+1),a.clone(),.55,.55,()=>l(.5),i.x<0);break;case`tracer`:case`strafe`:{let e=n.attack===`strafe`?6:1;for(let t=0;t<e;t++){let e=a.clone().sub(i),n=.12+e.length()*.012,r=t*.06;s.glow.spawn({x:i.x,y:i.y,z:i.z,vx:e.x/n,vy:e.y/n,vz:e.z/n,life:n,size:.05,r:4,g:3,b:1.2,stretch:.03,shape:Pp.Spark,delay:r}),this.later(n+r,()=>l(.18))}break}case`drone`:s.beam(i.clone(),a.clone(),o,.05,.12,4),l(.15);break;case`orbital`:{let e=a.clone().setY(30);s.beam(e,a.clone(),new G(1,.25,.35),.22,.3,5),s.flash(a,new G(1,.3,.4),1.2,.2,4),l(.55);break}case`moon`:{let e=a.clone().sub(i),t=1.1;s.glow.spawn({x:i.x,y:i.y,z:i.z,vx:e.x/t,vy:e.y/t+4.5*t,vz:e.z/t,life:t,size:.7,sizeEnd:.5,r:4,g:3.6,b:2.2,gravity:9,shape:Pp.Glow}),this.later(t,()=>{l(.9),s.ring(a,new G(1,.9,.6),2.4,.4,3)});break}case`pull`:for(let e=0;e<3;e++){let e=a.clone().add(new U((Math.random()-.5)*.8,(Math.random()-.5)*.8,0)),t=i.clone().sub(e);s.glow.spawn({x:e.x,y:e.y,z:e.z,vx:t.x*.9,vy:t.y*.9,vz:t.z*.9,life:1.1,size:.08,sizeEnd:.02,r:o.r*3,g:o.g*3,b:o.b*3,stretch:.06,shape:Pp.Spark})}Math.random()<.3&&l(.12);break;case`paper`:this.fly.strike(`📄`,i.clone().setY(i.y+.5),a.clone(),.45,.4,()=>l(.3),i.x>0);break;case`clone`:this.fly.strike(`😳`,i.clone(),a.clone(),.6,.6,()=>{l(.4),s.sparks(a,8,o,3)},i.x>0)}}},wm={blunt:16769704,blade:14677247,arrow:16765578,bullet:16763989,explosive:16742954,fire:16738842,energy:4251903,cosmic:11563263,reality:8060888},Tm=new G,Em=new U,Dm=new U,Om=class{p;fly;rig;screen;camera;side=1;constructor(e,t,n,r,i){this.p=e,this.fly=t,this.rig=n,this.screen=r,this.camera=i}offscreen(e,t=.6){return new U(e*4.5,1.25+t,4.5)}strike(e,t,n,r,i){let a=this.p,o=Tm.set(wm[e]),s=i.crit?1.7:1,c=(.75+i.power*.5)*s;this.side=-this.side;let l=this.side,u=Em.copy(n).addScaledVector(r,.05);switch(a.flash(u,o,i.crit?.7:.28,.12,i.crit?2.6:1.6),a.sparks(u,Math.round((i.crit?10:5)*c),o,3*c,{r:o.r*2.4,g:o.g*2.4,b:o.b*2.4}),e){case`blunt`:{let e=n.clone().addScaledVector(r,1.1).add(new U(l*.9,.5,.3));this.fly.strike(t,e,n.clone().addScaledVector(r,.25),.05,.62*c,void 0,l>0),a.smoke(u,i.crit?4:2,new G(14207152),{size:.18,sizeEnd:.6,life:.6}),i.crit&&a.debris(u,6,new G(12098160),4);break}case`blade`:{let e=n.clone().addScaledVector(r,1).add(new U(l*.8,.8,.3));this.fly.strike(t,e,n.clone().addScaledVector(r,.2),.05,.6*c,void 0,l>0);let i=n.clone().add(new U(-l*.55,.45,.4).multiplyScalar(c)),s=n.clone().add(new U(l*.55,-.45,.4).multiplyScalar(c));a.beam(i,s,new G(1,1,1),.07*c,.16,4),a.beam(i,s,o,.22*c,.2,1.5);break}case`arrow`:{let e=this.offscreen(l,.8),r=n.clone().sub(e);a.glow.spawn({x:e.x,y:e.y,z:e.z,vx:r.x/.08,vy:r.y/.08,vz:r.z/.08,life:.08,size:.05,r:3,g:2.6,b:1.6,stretch:.025,shape:Pp.Spark}),this.fly.toss(t,n.x,n.y,n.z+.3,l*.6,1.2,.5,{life:.9,scale0:.5*c,scale1:.45,gravity:8,spin:l*6});break}case`bullet`:{let e=i.crit?3:1;for(let t=0;t<e;t++){let e=this.offscreen(l,.3+t*.2),r=n.clone().sub(e);a.glow.spawn({x:e.x,y:e.y,z:e.z,vx:r.x/.06,vy:r.y/.06,vz:r.z/.06,life:.06,size:.04,r:4,g:3.2,b:1.2,stretch:.02,shape:Pp.Spark,delay:t*.04}),a.matter.spawn({x:e.x*.7,y:e.y,z:e.z*.7,vx:-l*1.5,vy:3,vz:.5,life:.8,size:.05,r:.95,g:.75,b:.3,gravity:14,shape:Pp.Chunk})}this.fly.toss(t,n.x+l*1.3,n.y+.3,n.z+.9,-l*.5,.6,0,{life:.35,scale0:.4,scale1:.45,gravity:0,spin:0}),a.flash(u,new G(1,.9,.5),.5,.08,5);break}case`explosive`:for(let e=0;e<Math.round(14*c);e++){let e=Math.random()*Math.PI*2,t=Math.random()*Math.PI,n=1.5+Math.random()*2.5*c;a.glow.spawn({x:u.x,y:u.y,z:u.z,vx:Math.cos(e)*Math.sin(t)*n,vy:Math.cos(t)*n+.5,vz:Math.sin(e)*Math.sin(t)*n+1,life:.4+Math.random()*.3,size:.28*Math.min(c,1.6),sizeEnd:.06,r:2.4,g:.9+Math.random()*.7,b:.2,drag:3.5,shape:Pp.Glow})}a.smoke(u,Math.round(5*c),new G(3813936),{size:.4,sizeEnd:1.6,life:1.2}),a.debris(u,Math.round(6*c),new G(6969930),5),a.ring(u,new G(1,.6,.2),3.2*c,.4,3),this.fly.toss(t,n.x,n.y+.3,n.z+.8,l*2.5,4,1.5,{life:.9,scale0:.55,scale1:.4,gravity:12,spin:l*12}),this.rig.addTrauma(.18*c),this.screen.shockwave(i.screen,.6*c);break;case`fire`:{let e=this.offscreen(l,.1);for(let t=0;t<Math.round(16*c);t++){let r=n.clone().sub(e).multiplyScalar(1/.28);a.glow.spawn({x:e.x,y:e.y,z:e.z,vx:r.x+(Math.random()-.5),vy:r.y+Math.random(),vz:r.z,life:.32,size:.15,sizeEnd:.6,r:3.6,g:1.2+Math.random()*.8,b:.2,delay:t*.008,shape:Pp.Glow})}for(let e=0;e<8;e++)a.glow.spawn({x:u.x,y:u.y,z:u.z,vx:(Math.random()-.5)*2,vy:1.5+Math.random()*2,vz:1,life:1.2,size:.04,r:4,g:1.6,b:.3,drag:1,gravity:-.5,shape:Pp.Glow});break}case`energy`:{let e=Dm.set(l*3.5,9,3).clone();a.beam(e,n,new G(1,1,1),.06*c,.16,5),a.beam(e,n,o,.3*c,.22,2.2);for(let e=0;e<3;e++){let e=u.clone(),t=u.clone().add(new U((Math.random()-.5)*.9,(Math.random()-.5)*.9,.2));a.beam(e,t,o,.03,.1,4)}i.crit&&this.screen.shockwave(i.screen,.5);break}case`cosmic`:for(let e=0;e<Math.round(22*c);e++){let t=e/22*Math.PI*2,n=1.1*c,r=u.clone().add(new U(Math.cos(t)*n,Math.sin(t)*n,.2)),i=u.clone().sub(r).multiplyScalar(1/.35);a.glow.spawn({x:r.x,y:r.y,z:r.z,vx:i.x-Math.sin(t)*2,vy:i.y+Math.cos(t)*2,vz:i.z,life:.35,size:.07,r:2.4,g:1.2,b:4,stretch:.05,shape:Pp.Spark})}a.glow.spawn({x:u.x,y:u.y,z:u.z,life:.6,size:.25,sizeEnd:.8,r:3,g:2.5,b:4,shape:Pp.Star}),a.ring(u,o,2.6*c,.5,2.4),this.screen.shockwave(i.screen,.45*c);break;case`reality`:for(let e=0;e<Math.round(16*c);e++){let e=Math.random(),t=new G().setHSL(e,1,.6).multiplyScalar(3);a.glow.spawn({x:u.x,y:u.y,z:u.z,vx:(Math.random()-.5)*6,vy:(Math.random()-.5)*6,vz:Math.random()*3,life:.5,size:.12,sizeEnd:.02,r:t.r,g:t.g,b:t.b,drag:3,shape:Pp.Chunk})}this.screen.glitchBurst(i.crit?.9:.35,i.crit?.18:.06),this.screen.aberration(.006)}i.crit?(a.ring(u,new G(1,.95,.6),3.2,.42,2.2),a.glow.spawn({x:u.x,y:u.y,z:u.z+.1,life:.45,size:.3,sizeEnd:.9,r:2.6,g:2.3,b:1.3,shape:Pp.Star}),this.rig.addTrauma(.22),this.rig.punch(.6),this.screen.aberration(.0015)):this.rig.addTrauma(.05+.05*i.power),i.weak&&(a.ring(u,new G(1,.25,.45),2.4,.35,2.6),a.ring(u,new G(1,.25,.45),1.4,.25,2.6)),this.camera}},km=class{camera;trauma=0;fovKick=new xp(0,120,10);zoom=new xp(0,30,10);roll=new xp(0,40,9);parallax=new H;parallaxCur=new H;time=0;cinematic=0;cinematicDur=1;baseFov=36;prefs={shake:1,reducedMotion:!1,flashes:!0};target=new U(0,1.2,0);bossFocus=0;drift=0;constructor(e){this.camera=e}addTrauma(e){this.trauma=Math.min(1,this.trauma+e)}punch(e){this.prefs.reducedMotion||this.fovKick.kick(e*30)}setPointer(e,t){this.parallax.set(e,t)}eraTransition(e=3.2){this.cinematic=e,this.cinematicDur=e}update(e){this.time+=e;let t=this.time;this.trauma=Math.max(0,this.trauma-e*1.6),this.parallaxCur.lerp(this.parallax,1-Math.exp(-3*e));let n=0;if(this.cinematic>0){this.cinematic=Math.max(0,this.cinematic-e);let t=1-this.cinematic/this.cinematicDur;n=Math.sin(t*Math.PI)}this.zoom.target=this.bossFocus*-1.2+n*3.2;let r=this.zoom.update(e),i=this.prefs.reducedMotion,a=i?0:this.parallaxCur.x*.35,o=i?0:this.parallaxCur.y*.18,s=n*.35*Math.sin(t*.5),c=7.4+r;this.camera.position.set(Math.sin(s+a*.12)*c+a,1.75+o+n*2.4+this.bossFocus*-.2,Math.cos(s+a*.12)*c),this.camera.up.set(0,1,0),this.camera.lookAt(this.target.x,this.target.y+n*.4,this.target.z);let l=this.trauma*this.trauma*this.prefs.shake*+!i;l>0&&(this.camera.position.x+=(Math.sin(t*37.1)+Math.sin(t*61.7)*.5)*.09*l,this.camera.position.y+=(Math.sin(t*43.3)+Math.sin(t*71.9)*.5)*.08*l,this.camera.rotateZ((Math.sin(t*29.3)+Math.sin(t*53.1)*.5)*.025*l)),this.roll.target=i?0:this.drift*Math.sin(t*.21)*.06,this.camera.rotateZ(this.roll.update(e));let u=this.fovKick.update(e),d=this.baseFov-u*.06;Math.abs(this.camera.fov-d)>.001&&(this.camera.fov=d,this.camera.updateProjectionMatrix())}},Am=class{u;waves;next=0;flashAmt=0;flashColor=new G(1,1,1);ab=0;glitch=0;glitchHold=0;prefs={shake:1,reducedMotion:!1,flashes:!0};baseAberration=.004;baseGlitch=0;saturation=1;tint=new Zr(1,1,1,0);constructor(e){this.u=e,this.waves=e.uWaves.value}shockwave(e,t=1){if(this.prefs.reducedMotion)return;let n=this.waves[this.next];this.next=(this.next+1)%4,n.set(e.x,e.y,0,t)}flash(e,t){let n=this.prefs.flashes?1:.12;this.flashColor.set(e),this.flashAmt=Math.min(n,Math.max(this.flashAmt,t))}aberration(e){this.prefs.reducedMotion||(this.ab=Math.min(.012,this.ab+e*1.2))}glitchBurst(e,t=.3){!this.prefs.reducedMotion&&this.prefs.flashes&&(this.glitch=Math.max(this.glitch,e),this.glitchHold=t)}lens(e,t=0,n=.12){let r=this.u.uLens.value;!e||this.prefs.reducedMotion?r.z=0:r.set(e.x,e.y,t,n)}update(e,t){for(let t of this.waves)t.z>=0&&(t.z=t.z>1.2?-1:t.z+e);this.flashAmt=Math.max(0,this.flashAmt-e*3.2),this.ab=Math.max(0,this.ab-e*.04),this.glitchHold=Math.max(0,this.glitchHold-e),this.glitchHold<=0&&(this.glitch=Math.max(0,this.glitch-e*3));let n=this.u;n.uTime.value=t,n.uAberration.value=this.prefs.reducedMotion?0:this.baseAberration+this.ab,n.uFlash.value.set(this.flashColor.r,this.flashColor.g,this.flashColor.b,this.flashAmt),n.uGlitch.value=this.prefs.reducedMotion||!this.prefs.flashes?0:Math.max(this.glitch,this.baseGlitch),n.uSaturation.value=this.saturation,n.uTint.value.copy(this.tint)}},jm=class{canvas;ctx;pool=[];dpr=1;w=1;h=1;enabled=!0;lane=0;lastSpawn=0;clock=0;font=`"Bungee", "Arial Black", system-ui, sans-serif`;constructor(e,t=70){this.canvas=e,this.ctx=e.getContext(`2d`);for(let e=0;e<t;e++)this.pool.push({active:!1,x:0,y:0,vx:0,vy:0,age:0,life:1,text:``,size:20,color:`#fff`,stroke:`#000`,pop:0,rot:0})}resize(e,t){this.dpr=Math.min(2,typeof devicePixelRatio==`number`?devicePixelRatio:1),this.w=e,this.h=t,this.canvas.width=Math.floor(e*this.dpr),this.canvas.height=Math.floor(t*this.dpr)}spawn(e,t,n,r={}){if(!this.enabled)return;let i=this.pool.find(e=>!e.active);i||=this.pool.reduce((e,t)=>e.age/e.life>t.age/t.life?e:t);let a=r.spread??90,o=0,s=0;a>0&&(this.lane=this.clock-this.lastSpawn<.25?(this.lane+1)%6:0,this.lastSpawn=this.clock,o=[0,-1,1,-2,2,0][this.lane]*a*.45,s=-Math.floor(this.lane/2)*18),Object.assign(i,{active:!0,x:t+o+(Math.random()-.5)*a*.3,y:n+s+(Math.random()-.5)*a*.2,vx:(Math.random()-.5)*70,vy:r.vy??-140,age:0,life:r.life??.95,text:e,size:r.size??22,color:r.color??`#fff6d6`,stroke:r.stroke??`rgba(40,10,40,0.85)`,pop:1,rot:(Math.random()-.5)*.12})}update(e){this.clock+=e;let t=this.ctx;t.setTransform(this.dpr,0,0,this.dpr,0,0),t.clearRect(0,0,this.w,this.h),t.textAlign=`center`,t.textBaseline=`middle`,t.lineJoin=`round`;for(let n of this.pool){if(!n.active)continue;if(n.age+=e,n.age>=n.life){n.active=!1;continue}n.x+=n.vx*e,n.y+=n.vy*e,n.vy+=40*e;let r=n.age/n.life,i=r<.12?.6+r/.12*.7:1.3-Math.min(.3,(r-.12)*1.2),a=r>.7?1-(r-.7)/.3:1,o=n.size*i;t.save(),t.globalAlpha=a,t.translate(n.x,n.y),t.rotate(n.rot),t.font=`${Math.round(o)}px ${this.font}`,t.lineWidth=Math.max(3,o*.18),t.strokeStyle=n.stroke,t.strokeText(n.text,0,0),t.fillStyle=n.color,t.fillText(n.text,0,0),t.restore()}}},Mm={stone:{a:9077368,b:5919820,pattern:0,crack:16747066,alpha:1},iron:{a:10133672,b:4870232,pattern:1,crack:16765024,alpha:1},brass:{a:14198874,b:8018474,pattern:2,crack:16773280,alpha:1},kevlar:{a:3817520,b:1711640,pattern:3,crack:4894975,alpha:1},energy:{a:4251903,b:670314,pattern:4,crack:16777215,alpha:.55},void:{a:2759242,b:328207,pattern:5,crack:11563263,alpha:.95},zen:{a:16773296,b:16756800,pattern:6,crack:16777215,alpha:.7}},Nm=`
uniform vec3 uA, uB, uCrackColor;
uniform float uPattern, uCrack, uTime, uFlash, uAlpha;
varying vec3 vObj;
varying vec3 vNormalV;
varying vec3 vViewDir;
float h13(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float n3(vec3 p) { vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(mix(h13(i), h13(i+vec3(1,0,0)), f.x), mix(h13(i+vec3(0,1,0)), h13(i+vec3(1,1,0)), f.x), f.y),
             mix(mix(h13(i+vec3(0,0,1)), h13(i+vec3(1,0,1)), f.x), mix(h13(i+vec3(0,1,1)), h13(i+vec3(1,1,1)), f.x), f.y), f.z); }
float fbm(vec3 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { s += a * n3(p); p *= 2.1; a *= 0.5; } return s; }
vec3 vor(vec3 x) { vec3 n = floor(x), f = fract(x); float md = 8.0, md2 = 8.0; vec3 id = vec3(0.0);
  for (int k = -1; k <= 1; k++) for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec3 g = vec3(float(i), float(j), float(k)); vec3 o = vec3(h13(n+g), h13(n+g+11.0), h13(n+g+23.0));
    float d = length(g + o - f); if (d < md) { md2 = md; md = d; id = n + g; } else if (d < md2) md2 = d; }
  return vec3(md2 - md, h13(id), md); }
void main() {
  vec3 n = normalize(vObj);
  float lat = asin(n.y), lon = atan(n.x, n.z);
  vec3 col;
  float p = uPattern;
  if (p < 0.5) { col = mix(uB, uA, fbm(n * 4.0)); }
  else if (p < 1.5) { vec2 g = fract(vec2(lon * 2.0, lat * 3.0)); float seam = smoothstep(0.0, 0.04, min(min(g.x, 1.0-g.x), min(g.y, 1.0-g.y)));
    col = mix(uB, uA * (0.8 + 0.3 * n3(n * 9.0)), seam); }
  else if (p < 2.5) { float ring = 0.5 + 0.5 * sin(lat * 26.0); float teeth = step(0.5, fract(lon * 6.0 + lat * 2.0));
    col = mix(uB, uA, ring * 0.7 + teeth * 0.3); }
  else if (p < 3.5) { float w = step(0.5, fract((lon + lat) * 9.0)) * 0.5 + step(0.5, fract((lon - lat) * 9.0)) * 0.5; col = mix(uB, uA, w); }
  else if (p < 4.5) { vec2 q = vec2(lon * 5.0, lat * 6.0); vec2 hx = abs(fract(q) - 0.5); float edge = smoothstep(0.42, 0.5, max(hx.x, hx.y));
    col = uB + uA * (edge * 2.5 + 0.15 + 0.1 * sin(uTime * 3.0 + lat * 10.0)); }
  else if (p < 5.5) { float s = fbm(n * 3.0 + vec3(uTime * 0.2, 0.0, 0.0)); col = mix(uB, uA, s) + vec3(step(0.97, h13(floor(n * 40.0)))) * 1.5; }
  else { float w = 0.5 + 0.5 * sin(lat * 12.0 + uTime * 2.0); col = mix(uB, uA, w) * 1.4; }

  // Simple key lighting + rim.
  vec3 L = normalize(vec3(-0.4, 0.7, 0.6));
  float diff = 0.45 + 0.55 * max(dot(normalize(vNormalV), L), 0.0);
  float rim = pow(1.0 - max(dot(normalize(vNormalV), normalize(vViewDir)), 0.0), 2.5);
  col = col * diff + uA * rim * 0.6;

  // Composure cracks: glowing fissures, then whole plates fall away.
  vec3 v = vor(n * 3.2);
  float crackW = uCrack * 0.16;
  float fissure = smoothstep(crackW, crackW * 0.3, v.x) * step(0.02, uCrack);
  if (v.y < uCrack * 0.75 - 0.25) discard;
  col = mix(col, uCrackColor * 4.0, fissure);
  col += vec3(uFlash) * 1.5;
  gl_FragColor = vec4(col, uAlpha);
}
`,Pm=class{mesh;u;crack=0;targetCrack=0;color=new G;crackColor=new G;active=!1;scaleIn=0;constructor(){this.u={uA:{value:new G},uB:{value:new G},uCrackColor:{value:new G},uPattern:{value:0},uCrack:{value:0},uTime:{value:0},uFlash:{value:0},uAlpha:{value:1}},this.mesh=new q(new oc(1.42,5),new Cc({uniforms:this.u,vertexShader:`varying vec3 vObj; varying vec3 vNormalV; varying vec3 vViewDir;
          void main(){ vObj = position; vNormalV = normalMatrix * normal; vec4 mv = modelViewMatrix * vec4(position,1.0); vViewDir = -mv.xyz; gl_Position = projectionMatrix * mv; }`,fragmentShader:Nm,transparent:!0,side:2})),this.mesh.visible=!1,this.mesh.renderOrder=3}begin(e){let t=Mm[e];this.u.uA.value.set(t.a),this.u.uB.value.set(t.b),this.u.uCrackColor.value.set(t.crack),this.u.uPattern.value=t.pattern,this.u.uAlpha.value=t.alpha,this.color.set(t.a),this.crackColor.set(t.crack),this.crack=this.targetCrack=0,this.active=!0,this.scaleIn=0,this.mesh.visible=!0}setDamage(e){this.targetCrack=Math.min(1,Math.max(0,e))}pulse(){this.u.uFlash.value=.45}end(){this.active=!1,this.mesh.visible=!1}update(e,t){if(!this.active)return;this.scaleIn=Math.min(1,this.scaleIn+e*2.5);let n=1+(1-this.scaleIn)**3*1.5;this.mesh.scale.setScalar(n),this.crack+=(this.targetCrack-this.crack)*(1-Math.exp(-10*e)),this.u.uCrack.value=this.crack,this.u.uTime.value=t,this.u.uFlash.value=Math.max(0,this.u.uFlash.value-e*4),this.mesh.rotation.y=t*.15}},Fm=new U(0,1.25,0),Im=new G(1,.82,.25),Lm=class{stage;floaters;star;world;particles;atlas;fly;minions;strikes;rig;screen;shell=new Pm;golden;goldenSeed=0;goldenAge=0;goldenLife=12;weakMarker;weakDir=new U;chargeFist;raycaster=new Pl;ndc=new H;time=0;hitStop=0;lastImpactReact=0;era=0;lastAutoFloat=0;lastQuip=-10;recentMax=1;tierAuto=!0;frameTimes=[];tierCooldown=4;tmpV=new U;tmpV2=new H;freakoutConfetti=0;w=1;h=1;constructor(e,t,n){this.stage=new bp(e),this.floaters=new jm(t),this.atlas=new Bp,this.particles=new Rp,this.fly=new Wp(this.atlas),this.era=n;let r=this.stage.scene;this.world=new bm({particles:this.particles,atlas:this.atlas,lite:!1},n),r.add(this.world.group),this.star=new jp,this.star.root.position.copy(Fm),r.add(this.star.root),this.star.root.add(this.shell.mesh);let i=document.createElement(`canvas`);i.width=i.height=128;let a=i.getContext(`2d`);a.strokeStyle=`#fff`,a.lineWidth=9,a.beginPath(),a.arc(64,64,44,0,Math.PI*2),a.stroke(),a.lineWidth=7;for(let e=0;e<4;e++){let t=e*Math.PI/2;a.beginPath(),a.moveTo(64+Math.cos(t)*30,64+Math.sin(t)*30),a.lineTo(64+Math.cos(t)*60,64+Math.sin(t)*60),a.stroke()}a.fillStyle=`#fff`,a.beginPath(),a.arc(64,64,10,0,Math.PI*2),a.fill(),this.weakMarker=new q(new cc(.5,.5),new Ua({map:new Mo(i),color:new G(3,.6,1.2),transparent:!0,depthTest:!1,depthWrite:!1})),this.weakMarker.visible=!1,this.weakMarker.renderOrder=30,this.star.root.add(this.weakMarker),this.golden=new jp,this.golden.setSkinTint(new G(1,.78,.15),.85),this.golden.root.scale.setScalar(.36),this.golden.root.visible=!1,this.golden.mood=`freakout`,r.add(this.golden.root),this.chargeFist=new Ai,this.chargeFist.visible=!1,r.add(this.chargeFist),r.add(this.particles.group,this.fly.batch.mesh),this.minions=new Cm(this.atlas,this.fly,this.particles,(e,t,n)=>this.minionImpact(e,t,n)),r.add(this.minions.batch.mesh),this.rig=new km(this.stage.camera),this.screen=new Am(this.stage.final.uniforms),this.strikes=new Om(this.particles,this.fly,this.rig,this.screen,this.stage.camera),this.applyEraLook(n,!0)}setQuality(e){this.tierAuto=e===`auto`;let t=e===`auto`?this.isMobile()?`medium`:`high`:e;this.applyTier(t)}isMobile(){return typeof matchMedia==`function`&&matchMedia(`(pointer: coarse)`).matches}applyTier(e){this.stage.setTier(e),this.particles.setDensity(e===`low`?.4:e===`medium`?.75:1),this.minions.activity=e===`low`?.5:1,this.stage.renderer.shadowMap.enabled=!1}setPrefs(e){this.rig.prefs=e,this.screen.prefs=e}resize(e,t,n){this.w=e,this.h=t,this.stage.viewShift=n,this.stage.resize(e,t),this.rig.baseFov=this.stage.camera.fov,this.floaters.resize(e,t)}setRay(e,t){let n=this.stage.renderer.domElement.getBoundingClientRect();this.ndc.set((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),this.raycaster.setFromCamera(this.ndc,this.stage.camera)}pointerMove(e,t){this.setRay(e,t),this.star.lookAt(this.raycaster.ray.at(5,this.tmpV)),this.rig.setPointer(this.ndc.x,this.ndc.y)}pick(e,t){if(this.setRay(e,t),this.golden.root.visible&&this.raycaster.intersectObject(this.golden.hitSphere)[0])return{kind:`golden`};let n=this.raycaster.intersectObject(this.star.hitSphere)[0];if(!n)return null;let r=`face`,i=this.raycaster.intersectObjects([this.star.head,...this.star.eyes,...this.star.hands,...this.star.brows],!0)[0];if(i){let e=i.object.name;(e===`eye`||e===`hand`||e===`brow`)&&(r=e)}let a=i?.point??n.point,o=this.star.root.worldToLocal(a.clone()).normalize();return{kind:`freakmoji`,dir:[o.x,o.y,o.z],region:r}}project(e,t=new H){let n=this.tmpV.copy(e).project(this.stage.camera);return t.set((n.x*.5+.5)*this.w,(-n.y*.5+.5)*this.h)}screenUv(e){let t=this.tmpV.copy(e).project(this.stage.camera);return this.tmpV2.set(t.x*.5+.5,t.y*.5+.5).clone()}handle(e,t){for(let n of e)switch(n.type){case`poke`:this.onPoke(n,t);break;case`haymaker`:this.onHaymaker(n.value,n.perfect,n.charge,t);break;case`freakOutStart`:this.screen.flash(`#ff3a8a`,.35),this.rig.addTrauma(.4),this.particles.ring(Fm,new G(1,.3,.6),6,.6,3),this.screen.shockwave(this.screenUv(Fm),1.2),this.floatAt(Fm,`FREAK OUT!`,{size:54,color:`#ff4fa3`,life:1.6,vy:-40,spread:0});break;case`weakSpot`:this.weakDir.set(Math.sin(n.yaw)*Math.cos(n.pitch),Math.sin(n.pitch),Math.cos(n.yaw)*Math.cos(n.pitch));break;case`goldenSpawn`:this.goldenSeed=n.seed,this.goldenAge=0,this.goldenLife=n.duration,this.golden.root.visible=!0;break;case`goldenCaught`:{let e=this.golden.root.position.clone();this.golden.root.visible=!1,this.particles.sparks(e,40,Im,6),this.particles.ring(e,Im,4,.5,4),this.screen.flash(`#ffe08a`,.4);for(let t=0;t<12;t++)this.fly.toss(`🌟`,e.x,e.y,e.z,(Math.random()-.5)*6,3+Math.random()*4,(Math.random()-.5)*3,{life:1.4,scale0:.4,scale1:.2});let t={lucky:`LUCKY! +${R(n.value)}`,frenzy:`GASP FRENZY ×7`,storm:`CLICK STORM ×10`,freakout:`INSTANT FREAK OUT`}[n.effect];this.floatAt(e,t,{size:34,color:`#ffd23f`,life:1.8,vy:-50,spread:0});break}case`goldenMissed`:this.particles.smoke(this.golden.root.position,6,new G(16769162)),this.golden.root.visible=!1;break;case`chargeStart`:this.chargeFist.visible=!0;break;case`bossStart`:{let e=n.final?c:s[n.era].boss;this.shell.begin(e.shell),this.screen.flash(`#ffffff`,.5),this.rig.addTrauma(.5),this.screen.shockwave(this.screenUv(Fm),1.5);break}case`bossWin`:this.shatterShell();break;case`bossFail`:this.shell.end(),this.star.mood=`shocked`,this.floatAt(Fm,`IT KEPT ITS COMPOSURE…`,{size:30,color:`#c8d0ff`,life:2,vy:-30,spread:0});break;case`eraChange`:this.applyEraLook(n.to,!1);break;case`ability`:this.onAbility(n.id,t);break;case`buyProducer`:this.minions.sync(t.state.producers);break;case`buyWeapon`:{let e=_[n.index];this.fly.toss(e.emoji,0,3.4,1.2,0,1.5,0,{life:1.4,scale0:1.2,scale1:.9,gravity:3,spin:0}),this.particles.sparks(new U(0,3.2,1.2),24,new G(wm[e.family]),4);break}case`collapse`:this.onCollapse(t)}}floatAt(e,t,n){let r=this.project(e);this.floaters.spawn(t,r.x,r.y,n)}onPoke(e,t){let n=e.source===`auto`,r=e.dir?this.tmpV.set(e.dir[0],e.dir[1],e.dir[2]).clone():new U((Math.random()-.5)*.9,(Math.random()-.2)*.8,1).normalize(),i=this.star.root.localToWorld(r.clone().multiplyScalar(1));this.recentMax=Math.max(this.recentMax*.98,e.value);let a=Math.min(1,e.value/this.recentMax);if(this.star.hit(r,(e.crit?1.5:.7)*(n?.5:1),{crit:e.crit,flinch:e.weak||!n&&Math.random()<.08}),e.crit&&!n&&(this.hitStop=Math.max(this.hitStop,.07)),!n||Math.random()<.35){let n=y(t.state.weapon),o=t.state.weapon>=0?_[t.state.weapon].emoji:`💥`;this.strikes.strike(n,o,i,r,{crit:e.crit,weak:e.weak,power:a,screen:this.screenUv(i)})}if(n){this.time-this.lastAutoFloat>.12&&(this.lastAutoFloat=this.time,this.floatAt(i,`+${R(e.value)}`,{size:16,color:`#bfefff`,life:.7}));return}e.region===`eye`&&this.time-this.lastQuip>4&&Math.random()<.25&&(this.lastQuip=this.time,this.floatAt(i.clone().setY(i.y+.4),`OW, MY EYE`,{size:18,color:`#ffffff`,life:1.1,spread:0})),e.weak&&this.floatAt(i,`WEAK SPOT!`,{size:26,color:`#ff5fa8`,life:1.1,vy:-120});let o=`+${R(e.value)}`;e.crit?this.floatAt(i,o,{size:40,color:`#ffd23f`,life:1.15,vy:-110}):this.floatAt(i,o,{size:24,life:.9}),e.streak>0&&e.streak%25==0&&(this.floatAt(Fm.clone().setY(2.6),`${e.streak} COMBO!`,{size:30,color:`#7affd8`,life:1.2,vy:-60,spread:0}),this.particles.ring(i,new G(.4,1,.85),2.5,.4,3))}onHaymaker(e,t,n,r){this.chargeFist.visible=!1;let i=new U(0,.05,1).normalize(),a=this.star.root.localToWorld(i.clone());this.star.hit(i,2.5,{crit:!0}),this.hitStop=t?.16:.08;let o=y(r.state.weapon),s=r.state.weapon>=0?_[r.state.weapon].emoji:`👊`;this.strikes.strike(o,s,a,i,{crit:!0,weak:!1,power:1,screen:this.screenUv(a)}),this.strikes.strike(`explosive`,`🥊`,a,i,{crit:!0,weak:!1,power:n,screen:this.screenUv(a)}),this.particles.ring(a,t?Im:new G(1,.6,.3),7*Math.max(.4,n),.6,2.4),this.screen.shockwave(this.screenUv(a),1.6*Math.max(.5,n)),this.screen.flash(t?`#fff2b0`:`#ffffff`,t?.35:.18),this.rig.addTrauma(.5+n*.4),this.rig.punch(1.6),t&&this.floatAt(a.clone().setY(2.7),`PERFECT!`,{size:58,color:`#ffd23f`,life:1.6,vy:-50,spread:0}),this.floatAt(a,`+${R(e)}`,{size:t?52:42,color:`#ffb347`,life:1.5,vy:-90,spread:0})}onAbility(e,t){switch(e){case`rally`:this.floatAt(Fm.clone().setY(2.8),`MINION RALLY!`,{size:40,color:`#ffd23f`,life:1.6,vy:-40,spread:0}),this.particles.ring(new U(0,.3,0),new G(1,.8,.3),12,.8,3),this.rig.addTrauma(.3);break;case`flurry`:this.floatAt(Fm.clone().setY(2.8),`FLURRY!`,{size:40,color:`#9ae8ff`,life:1.4,vy:-40,spread:0});break;case`timewarp`:this.screen.flash(`#9ad0ff`,.5),this.screen.shockwave(this.screenUv(Fm),2);for(let e=0;e<80;e++){let e=Math.random()*Math.PI*2,t=2+Math.random()*4;this.particles.glow.spawn({x:Math.cos(e)*t,y:1.25+Math.sin(e)*t,z:-2,vx:-Math.cos(e)*2,vy:-Math.sin(e)*2,vz:30,life:.5,size:.05,r:2,g:3,b:4,stretch:.02,shape:Pp.Spark,delay:Math.random()*.3})}this.floatAt(Fm.clone().setY(2.8),`TIME WARP!`,{size:44,color:`#9ad0ff`,life:1.6,vy:-40,spread:0});break;case`singularity`:this.screen.flash(`#b070ff`,.6),this.rig.addTrauma(.7),this.floatAt(Fm.clone().setY(2.9),`SINGULARITY`,{size:52,color:`#d0a0ff`,life:2,vy:-30,spread:0})}}minionImpact(e,t,n){if(this.particles.sparks(e,4,n,2.5),this.time-this.lastImpactReact>.12){this.lastImpactReact=this.time;let n=this.star.root.worldToLocal(e.clone()).normalize();this.star.hit(n,.25+t*.4)}}shatterShell(){let e=this.shell.color;this.shell.end();for(let t=0;t<60;t++){let t=Math.random()*2-1,n=Math.random()*Math.PI*2,r=Math.sqrt(1-t*t),i=4+Math.random()*6;this.particles.matter.spawn({x:Fm.x+r*Math.cos(n)*1.4,y:Fm.y+t*1.4,z:Fm.z+r*Math.sin(n)*1.4,vx:r*Math.cos(n)*i,vy:t*i+3,vz:r*Math.sin(n)*i,life:1.4,size:.12+Math.random()*.18,r:e.r,g:e.g,b:e.b,gravity:12,drag:.5,shape:Pp.Chunk})}this.particles.sparks(Fm,60,this.shell.crackColor,8),this.particles.ring(Fm,this.shell.crackColor,9,.7,4),this.screen.flash(`#ffffff`,.85),this.screen.shockwave(this.screenUv(Fm),2.2),this.rig.addTrauma(.9),this.rig.punch(2),this.hitStop=.25,this.star.mood=`freakout`,this.star.hit(new U(0,0,1),2.5,{crit:!0}),this.floatAt(Fm.clone().setY(2.9),`COMPOSURE SHATTERED!`,{size:34,color:`#ffffff`,life:1.4,vy:-60,spread:0})}applyEraLook(e,t){if(this.era=e,this.world.setEra(e,t),this.rig.drift=+(e>=6),this.screen.baseAberration=e>=6?.007:e>=4?.004:.0025,this.screen.baseGlitch=0,!t){this.rig.eraTransition(3.4),this.screen.flash(`#ffffff`,.9),this.screen.shockwave(this.screenUv(Fm),2.5);for(let e=0;e<80;e++){let e=Math.random()*Math.PI*2;this.particles.glow.spawn({x:Math.cos(e)*2,y:.3,z:Math.sin(e)*2,vx:Math.cos(e)*12,vy:1+Math.random()*4,vz:Math.sin(e)*12,life:1.4,size:.12,sizeEnd:.02,r:3,g:3,b:3,drag:1.5,stretch:.03,shape:Pp.Spark})}}}onCollapse(e){this.screen.flash(`#ffffff`,1),this.screen.glitchBurst(1,.6),this.rig.addTrauma(1);for(let e=0;e<160;e++){let e=Math.random()*2-1,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e*e),r=6+Math.random()*8,i=new U(n*Math.cos(t)*r,1.25+e*r,n*Math.sin(t)*r),a=Fm.clone().sub(i).multiplyScalar(1/.8);this.particles.glow.spawn({x:i.x,y:i.y,z:i.z,vx:a.x,vy:a.y,vz:a.z,life:.8,size:.1,r:3,g:3,b:4,stretch:.04,shape:Pp.Spark})}this.shell.end(),this.golden.root.visible=!1,this.world.setEra(e.state.era,!1),this.era=e.state.era,this.rig.eraTransition(3.4),this.minions.sync(e.state.producers)}frame(e,t){let n=t.state,r=e;this.hitStop>0&&(this.hitStop-=e,r=e*.12),this.time+=e;let i=this.time;n.era!==this.era&&!this.world.transitioning&&this.applyEraLook(n.era,!0),this.minions.sync(n.producers);let a=n.time<n.freakOutEnd,o=n.boss;if(o){let e=1-Math.max(0,o.hp)/o.maxHp;this.shell.setDamage(e),this.star.mood=e>.6?`worried`:`calm`}else n.charge?this.star.mood=`worried`:this.star.mood=a?`freakout`:`shocked`;let s=t.chargeLevel();if(this.star.tremble=n.charge?s:a?.5:o?Math.max(0,1-o.hp/o.maxHp-.5):0,this.rig.bossFocus+=(+!!o-this.rig.bossFocus)*(1-Math.exp(-3*e)),n.charge){this.chargeFist.visible=!0;let e=s>=.85;if(Math.random()<.5+s){let t=Math.random()*Math.PI*2,n=2.5,r=new U(Math.cos(t)*n,1.25+Math.sin(t)*n,2.2),i=new U(0,1.25,2.2).sub(r).multiplyScalar(1/.4),a=e?Im:new G(1,.5,.2);this.particles.glow.spawn({x:r.x,y:r.y,z:r.z,vx:i.x,vy:i.y,vz:i.z,life:.4,size:.06+s*.06,r:a.r*3,g:a.g*3,b:a.b*3,stretch:.03,shape:Pp.Spark})}e&&Math.random()<.3&&this.particles.flash(new U(0,1.25,2.2),Im,.8,.1,3),this.rig.addTrauma(s*.04)}if(n.weakSpot){this.weakMarker.visible=!0,this.weakMarker.position.copy(this.weakDir).multiplyScalar(1.06),this.weakMarker.lookAt(this.star.root.localToWorld(this.weakDir.clone().multiplyScalar(3)));let e=Math.max(0,n.weakSpot.end-n.time);this.weakMarker.scale.setScalar((.9+Math.sin(i*10)*.12)*(e<1?e:1)),this.weakMarker.rotation.z=i*2}else this.weakMarker.visible=!1;if(this.golden.root.visible){this.goldenAge+=e;let t=this.goldenSeed,n=.5+(t>>>3)%100/200,i=.7+(t>>>9)%100/180,a=t%628/100,o=this.goldenAge,s=this.stage.camera,c=Math.max(3,s.position.z-1.6)*Math.tan(Mr.degToRad(s.fov/2)),l=Math.min(3,c*s.aspect*.72),u=Math.min(.85,c*.45);if(this.golden.root.position.set(Math.sin(o*n+a)*l,1.3+Math.sin(o*i+a*2)*u,1.4+Math.cos(o*n*.7+a)*.5),this.golden.root.rotation.y=Math.sin(o*2)*.4,this.golden.update(r),Math.random()<.6){let e=this.golden.root.position;this.particles.glow.spawn({x:e.x,y:e.y,z:e.z,vx:(Math.random()-.5)*.4,vy:-.4,vz:0,life:.6,size:.08,sizeEnd:.01,r:4,g:3,b:.8,shape:Pp.Star})}let d=this.goldenLife-this.goldenAge;this.golden.root.scale.setScalar(.36*(d<1?Math.max(.05,d):Math.min(1,this.goldenAge*3)))}if(a){for(this.freakoutConfetti+=e*8;this.freakoutConfetti>1;){--this.freakoutConfetti;let e=[`😱`,`😳`,`💥`,`❗`,`🫨`][Math.floor(Math.random()*5)];this.fly.toss(e,(Math.random()-.5)*4.5,3.6,.5+Math.random()*1.5,(Math.random()-.5)*2,.5,0,{life:1.8,scale0:.7,scale1:.45,gravity:2.5})}this.screen.tint.set(1.15,.85,1.05,.35+Math.sin(i*8)*.1)}else this.screen.tint.w=Math.max(0,this.screen.tint.w-e*2);let c=n.buffs.some(e=>e.id===`rally`&&e.end>n.time),l=n.buffs.some(e=>e.id===`goldenFrenzy`&&e.end>n.time),u=n.buffs.some(e=>e.id===`singularity`&&e.end>n.time);if(this.minions.frenzy=(c?3:1)*(l?2:1)*(a?1.5:1),u){if(this.screen.lens(this.screenUv(Fm),.6+Math.sin(i*3)*.2,.18),this.screen.saturation=1.3,Math.random()<.8){let e=Math.random()*Math.PI*2,t=4+Math.random()*3,n=new U(Math.cos(e)*t,1.25+(Math.random()-.5)*2,Math.sin(e)*t),r=Fm.clone().sub(n);this.particles.glow.spawn({x:n.x,y:n.y,z:n.z,vx:r.x-Math.sin(e)*4,vy:r.y,vz:r.z+Math.cos(e)*4,life:1,size:.07,r:2.5,g:1.2,b:4,stretch:.05,drag:.5,shape:Pp.Spark})}}else this.screen.lens(null),this.screen.saturation=1;o&&Math.random()<.3&&this.shell.pulse(),this.star.update(r),this.world.update(r),this.shell.update(r,i),this.minions.update(r),this.fly.update(r),this.particles.update(i),this.rig.update(e),this.screen.update(e,i),this.applyThemeLights(),this.stage.render(),this.floaters.update(e),this.adaptQuality(e)}applyThemeLights(){let e=this.world.theme,t=this.stage;t.hemi.color.copy(e.c.hemiSky),t.hemi.groundColor.copy(e.c.hemiGround),t.hemi.intensity=e.n.hemiInt,t.key.color.copy(e.c.keyColor),t.key.intensity=e.n.keyInt,t.rim.color.copy(e.c.rimColor),t.rim.intensity=e.n.rimInt,t.bloom.strength=e.n.bloom,typeof document<`u`&&document.documentElement.style.setProperty(`--era-accent`,e.accent)}adaptQuality(e){if(!this.tierAuto||(this.frameTimes.push(e),this.frameTimes.length<90))return;let t=this.frameTimes.reduce((e,t)=>e+t,0)/this.frameTimes.length;if(this.frameTimes.length=0,this.tierCooldown-=1.5,this.tierCooldown>0)return;let n=this.stage.tier;t>1/40&&n!==`low`?(this.applyTier(n===`high`?`medium`:`low`),this.tierCooldown=6):t<1/90&&n===`medium`&&!this.isMobile()&&(this.applyTier(`high`),this.tierCooldown=20)}debugEra(e){this.applyEraLook(e,!0)}get tier(){return this.stage.tier}get accent(){return Mp[this.era].accent}},Rm=`/emoji-clicker/assets/freakmoji-BgGKR3HQ.png`,zm=class{floaters;face;golden;host;squash=0;goldenAge=0;goldenSeed=0;w=1;h=1;shellRing;constructor(e,t){this.host=e,this.floaters=new jm(t),this.face=document.createElement(`img`),this.face.src=Rm,this.face.alt=``,Object.assign(this.face.style,{position:`absolute`,left:`50%`,top:`50%`,width:`min(52vmin, 420px)`,transform:`translate(-50%, -55%)`,pointerEvents:`none`,filter:`drop-shadow(0 18px 24px rgba(0,0,0,.45))`}),this.golden=this.face.cloneNode(),Object.assign(this.golden.style,{width:`90px`,filter:`sepia(1) saturate(4) hue-rotate(-10deg) brightness(1.2)`,display:`none`}),this.shellRing=document.createElement(`div`),Object.assign(this.shellRing.style,{position:`absolute`,left:`50%`,top:`50%`,width:`min(62vmin, 500px)`,aspectRatio:`1`,borderRadius:`50%`,transform:`translate(-50%, -55%)`,border:`10px solid rgba(220,220,255,.7)`,display:`none`,pointerEvents:`none`}),e.style.background=`radial-gradient(80% 70% at 50% 45%, #3a2860, #140d1f)`,e.prepend(this.face,this.golden,this.shellRing)}get tier(){return`low`}setQuality(){}setPrefs(e){}resize(e,t){this.w=e,this.h=t,this.floaters.resize(e,t)}pointerMove(){}pick(e,t){let n=this.host.getBoundingClientRect(),r=e-n.left,i=t-n.top;if(this.golden.style.display!==`none`){let n=this.golden.getBoundingClientRect();if(e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom)return{kind:`golden`}}let a=this.face.getBoundingClientRect(),o=a.left+a.width/2-n.left,s=a.top+a.height/2-n.top,c=a.width*.42,l=(r-o)/c,u=(i-s)/c;if(l*l+u*u>1.2)return null;let d=Math.sqrt(Math.max(0,1-l*l-u*u));return{kind:`freakmoji`,dir:[l,-u,d],region:`face`}}handle(e,t){for(let t of e)if(t.type===`poke`||t.type===`haymaker`){this.squash=Math.min(1,this.squash+(t.type===`haymaker`?1:.35));let e=`+${R(t.value)}`;this.floaters.spawn(e,this.w/2,this.h*.4,{size:t.type===`poke`&&t.crit?38:24,color:t.type===`poke`&&t.crit?`#ffd23f`:`#fff6d6`})}else t.type===`goldenSpawn`?(this.goldenSeed=t.seed,this.goldenAge=0,this.golden.style.display=`block`):t.type===`goldenCaught`||t.type===`goldenMissed`?this.golden.style.display=`none`:t.type===`bossStart`?this.shellRing.style.display=`block`:(t.type===`bossWin`||t.type===`bossFail`||t.type===`collapse`)&&(this.shellRing.style.display=`none`)}frame(e,t){this.squash=Math.max(0,this.squash-e*4);let n=Math.sin(this.squash*Math.PI)*.12;if(this.face.style.transform=`translate(-50%, -55%) scale(${1+n}, ${1-n})`,t.state.boss){let e=Math.max(0,t.state.boss.hp/t.state.boss.maxHp);this.shellRing.style.opacity=String(.3+e*.7)}if(this.golden.style.display!==`none`){this.goldenAge+=e;let t=this.goldenAge,n=this.goldenSeed%628/100;this.golden.style.left=`${50+Math.sin(t*.8+n)*34}%`,this.golden.style.top=`${40+Math.sin(t*1.1+n)*22}%`,this.golden.style.transform=`translate(-50%, -50%)`}this.floaters.update(e)}},Bm=1e-4,Vm=class{ctx;noise;crushCurve;constructor(e){this.ctx=e;let t=Math.floor(e.sampleRate*2);this.noise=e.createBuffer(1,t,e.sampleRate);let n=this.noise.getChannelData(0);for(let e=0;e<t;e++)n[e]=Math.random()*2-1;let r=2048;this.crushCurve=new Float32Array(r);for(let e=0;e<r;e++){let t=e/2047*2-1;this.crushCurve[e]=Math.round(t*6)/6}}crusher(e,t){let n=this.ctx.createWaveShaper();n.curve=this.crushCurve,n.oversample=`none`;let r=this.ctx.createGain();return r.gain.value=t,n.connect(r),r.connect(e),n}};function Hm(e,t=1.8){let n=e.sampleRate,r=Math.max(1,Math.floor(n*t)),i=e.createBuffer(2,r,n),a=Math.floor(n*.012);for(let e=0;e<2;e++){let t=i.getChannelData(e),n=0;for(let e=a;e<r;e++){let i=(e-a)/(r-a),o=.8-.68*i;n+=o*(Math.random()*2-1-n),t[e]=n*Math.exp(-6.5*i)}}return i}var Um=class{ctx;kit;out;end=0;nodes=[];taps=[];sources=[];live=0;dead=!1;constructor(e,t,n=0){if(this.kit=e,this.ctx=e.ctx,this.out=this.ctx.createGain(),this.nodes.push(this.out),this.taps.push(this.out),this.out.connect(t.dry),n>0&&t.wet){let e=this.ctx.createGain();e.gain.value=n,this.out.connect(e),e.connect(t.wet),this.nodes.push(e)}}tap(e){let t=this.ctx.createGain();return t.connect(e),this.nodes.push(t),this.taps.push(t),t}gain(e=1){let t=this.ctx.createGain();return t.gain.value=e,this.nodes.push(t),t}filter(e,t,n=.7){let r=this.ctx.createBiquadFilter();return r.type=e,r.frequency.value=t,r.Q.value=n,this.nodes.push(r),r}osc(e,t,n,r,i=0){let a=this.ctx.createOscillator();return a.type=e,a.frequency.setValueAtTime(t,n),i&&a.detune.setValueAtTime(i,n),this.track(a,n,r),a}noise(e,t,n=1){let r=this.ctx.createBufferSource();return r.buffer=this.kit.noise,r.loop=!0,r.playbackRate.value=n,this.track(r,e,t,Math.random()*(this.kit.noise.duration-.05)),r}track(e,t,n,r){let i=Math.max(t,0),a=Math.max(n,i+.01);r!==void 0&&e instanceof AudioBufferSourceNode?e.start(i,r):e.start(i),e.stop(a),this.end=Math.max(this.end,a),this.sources.push(e),this.live++,e.onended=()=>{this.live--,this.live<=0&&this.dispose()}}kill(e){if(!this.dead){for(let t of this.taps)try{t.gain.setValueAtTime(t.gain.value,e),t.gain.linearRampToValueAtTime(0,e+.012)}catch{}for(let t of this.sources)try{t.stop(e+.03)}catch{}this.end=Math.min(this.end,e+.03)}}dispose(){if(!this.dead){this.dead=!0;for(let e of this.sources)try{e.disconnect()}catch{}for(let e of this.nodes)try{e.disconnect()}catch{}this.sources=[],this.nodes=[],this.taps=[]}}};function Wm(e,t,n,r,i){return e.setValueAtTime(Bm,t),e.linearRampToValueAtTime(Math.max(n,Bm),t+r),e.exponentialRampToValueAtTime(Bm,t+r+i),t+r+i}function Gm(e,t,n,r,i,a){let o=Math.max(n,Bm),s=Math.max(t+r,i);return e.setValueAtTime(Bm,t),e.linearRampToValueAtTime(o,t+r),e.setValueAtTime(o,s),e.exponentialRampToValueAtTime(Bm,s+a),s+a}function X(e,t,n,r){let i=r.attack??.003,a=r.hold??0,o=n+i+a+r.decay,s=e.osc(r.type??`sine`,r.freq,n,o+.02,r.detune??0);r.to!==void 0&&s.frequency.exponentialRampToValueAtTime(Math.max(1,r.to),n+(r.glide??r.decay));let c=e.gain(0);return c.gain.setValueAtTime(Bm,n),c.gain.linearRampToValueAtTime(Math.max(r.gain,Bm),n+i),a>0&&c.gain.setValueAtTime(Math.max(r.gain,Bm),n+i+a),c.gain.exponentialRampToValueAtTime(Bm,o),s.connect(c),c.connect(t),o}function Z(e,t,n,r){let i=r.attack??.002,a=r.hold??0,o=n+i+a+r.decay,s=e.noise(n,o+.02),c=e.filter(r.type,r.freq,r.q??.8);c.frequency.setValueAtTime(r.freq,n),r.to!==void 0&&c.frequency.exponentialRampToValueAtTime(Math.max(20,r.to),n+(r.sweep??r.decay));let l=e.gain(0);if(l.gain.setValueAtTime(Bm,n),l.gain.linearRampToValueAtTime(Math.max(r.gain,Bm),n+i),a>0&&l.gain.setValueAtTime(Math.max(r.gain,Bm),n+i+a),l.gain.exponentialRampToValueAtTime(Bm,o),s.connect(c),r.lowpass){let t=e.filter(`lowpass`,r.lowpass,.7);c.connect(t),t.connect(l)}else c.connect(l);return l.connect(t),o}function Km(e,t,n,r,i,a,o=3.5,s=2.5){let c=n+a+.01,l=e.osc(`sine`,r,n,c+.02),u=e.osc(`sine`,r*o,n,c+.02),d=e.gain(0);d.gain.setValueAtTime(r*s,n),d.gain.exponentialRampToValueAtTime(Math.max(1,r*s*.04),n+a*.7),u.connect(d),d.connect(l.frequency);let f=e.gain(0);return Wm(f.gain,n,i,.002,a),l.connect(f),f.connect(t),c}function qm(e,t,n,r,i,a){let o=n+i+.35,s=e.filter(`lowpass`,500,1.4);s.frequency.setValueAtTime(450,n),s.frequency.linearRampToValueAtTime(3400,n+.035),s.frequency.exponentialRampToValueAtTime(1300,n+.3);let c=e.gain(1.6/(r.length*2));for(let t of r)for(let r of[-8,8])e.osc(`sawtooth`,440*2**((t-69)/12),n,o+.02,r).connect(c);let l=e.gain(0);return Gm(l.gain,n,a,.018,n+i,.3),c.connect(s),s.connect(l),l.connect(t),o}function Jm(e,t,n,r,i=0){let a=new Um(e,t,i);return X(a,a.out,n,r),a}function Ym(e,t,n,r,i=0){let a=new Um(e,t,i);return Z(a,a.out,n,r),a}function Xm(e,t,n,r,i,a,o=.25,s=3.5,c=2.5){let l=new Um(e,t,o);return Km(l,l.out,n,r,i,a,s,c),l}function Zm(e,t,n,r,i,a,o=.2){let s=new Um(e,t,o);return qm(s,s.out,n,r,i,a),s}var Qm=[0,2,3,5,7,8,10],$m=[0,2,3,5,7,9,10],eh=[0,1,3,5,7,8,10],th=[0,2,4,5,7,9,10],nh=[0,2,4,6,7,9,11],rh=[0,2,3,5,7,8,11],ih=[0,3,5,7,10],ah=[0,2,4,7,9],oh=[{root:57,mode:Qm,penta:ih},{root:50,mode:$m,penta:ih},{root:52,mode:eh,penta:ih},{root:48,mode:th,penta:ah},{root:53,mode:Qm,penta:ih},{root:55,mode:nh,penta:ah},{root:47,mode:rh,penta:[0,2,3,7,8]}],sh=new Map;function ch(e,t){let n=Math.max(0,Math.min(oh.length-1,Math.floor(e)||0)),r=oh[n];if(!t||n===6)return r;let i=sh.get(n);return i||(i={root:r.root,mode:eh,penta:ih},sh.set(n,i)),i}var lh=e=>440*2**((e-69)/12);function uh(e,t,n){let r=t.length,i=Math.floor(n/r);return e+i*12+t[n-i*r]}function dh(e,t,n=e.root){return[0,2,4].map(r=>uh(n,e.mode,t+r))}function fh(e,t){let n=t,r=99;for(let i=0;i<=6;i++){for(let a of[t-i,t+i]){let t=((a-e.root)%12+12)%12;e.penta.includes(t)&&i<r&&(n=a,r=i)}if(r<99)break}return n}function ph(e){let t=e.mode;for(let n of[0,2,5,4,3]){let r=(t[(n+2)%7]-t[n]+12)%12,i=(t[(n+4)%7]-t[n]+12)%12;if(r===4&&i===7)return e.root+t[n]}return e.root}var mh=[0,2,1,3,2,4,3,5];function hh(e,t){let n=Math.max(0,Math.floor(t)-1),r=Math.floor(n/8),i=r<=5?r:(r-1)%5+1,a=e.root;for(;a<55;)a+=12;for(;a>66;)a-=12;return uh(a,e.penta,i+mh[n%8])}function gh(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var _h=.15,vh=16,yh=16,bh=1.07,xh=[{bpm:96,steps:16,swing:.12,progression:[0,5,3,4],drums:[{drum:`tomLow`,pattern:`X.....x.X.....x.`,gain:.12},{drum:`log`,pattern:`....x.......x..o`,gain:.08},{drum:`shaker`,pattern:`o.x.o.x.o.x.o.x.`,gain:.03},{drum:`tomHi`,pattern:`.......o.....?..`,gain:.06}],freak:[{drum:`tomHi`,pattern:`x.oxx.ox..x.xxox`,gain:.055},{drum:`shaker`,pattern:`xoxoxoxoxoxoxoxo`,gain:.025}],bossHat:`shaker`,bass:{inst:`marimba`,oct:-1,gain:.14,layer:`base`,pattern:`R.....5.R...O...`},pad:null,lead:{inst:`marimba`,oct:1,gain:.085,layer:`base`,density:.45,penta:!0},arp:{inst:`marimba`,oct:2,gain:.035,layer:`combo`,every:2,shape:[0,1,2,1]},verb:.2,wobble:0},{bpm:100,steps:16,swing:.06,progression:[0,6,0,3],drums:[{drum:`frame`,pattern:`X......x..x.....`,gain:.12},{drum:`slap`,pattern:`....x.......x.o.`,gain:.07},{drum:`tamb`,pattern:`..x...x...x...x.`,gain:.03}],freak:[{drum:`tamb`,pattern:`xxxxxxxxxxxxxxxx`,gain:.022},{drum:`slap`,pattern:`.o.o.o.o.xoxoxox`,gain:.05}],bossHat:`tamb`,bass:{inst:`lute`,oct:-1,gain:.09,layer:`base`,pattern:`R.......5.......`},pad:{inst:`drone`,oct:-1,gain:.035,layer:`base`},lead:{inst:`lute`,oct:1,gain:.085,layer:`base`,density:.5,penta:!1},arp:{inst:`harpsi`,oct:1,gain:.035,layer:`combo`,every:1,shape:[0,1,2,3,2,1]},verb:.28,wobble:0},{bpm:110,steps:16,swing:0,progression:[0,1,0,5],drums:[{drum:`kick`,pattern:`X..x..X...X..x..`,gain:.12},{drum:`clank`,pattern:`....X.......X...`,gain:.08},{drum:`tick`,pattern:`oxoxoxoxoxoxoxox`,gain:.03},{drum:`anvil`,pattern:`.......o......o.`,gain:.04}],freak:[{drum:`anvil`,pattern:`x.x.x.x.x.x.x.x.`,gain:.03},{drum:`kick`,pattern:`..x...x...x...x.`,gain:.08}],bossHat:`tick`,bass:{inst:`chug`,oct:-1,gain:.095,layer:`base`,pattern:`RrrRrrRrRrrRrr5r`},pad:null,lead:{inst:`square`,oct:1,gain:.04,layer:`base`,density:.35,penta:!0},arp:{inst:`harpsi`,oct:1,gain:.03,layer:`combo`,every:1,shape:[0,1,2,1]},verb:.15,wobble:0},{bpm:120,steps:16,swing:0,progression:[0,6,3,0],drums:[{drum:`kick`,pattern:`X.....x.X.x.....`,gain:.12},{drum:`snare`,pattern:`....X.......X...`,gain:.09},{drum:`hat`,pattern:`x.x.x.x.x.x.x.x.`,gain:.03},{drum:`openHat`,pattern:`..............o.`,gain:.035}],freak:[{drum:`hat`,pattern:`oxoxoxoxoxoxoxox`,gain:.022},{drum:`tomHi`,pattern:`..........x.x.x.`,gain:.06},{drum:`tomLow`,pattern:`.............x.x`,gain:.07}],bossHat:`hat`,bass:{inst:`synthBass`,oct:-1,gain:.08,layer:`base`,pattern:`R.R.O.R.R.R.O.5.`},pad:{inst:`organ`,oct:0,gain:.025,layer:`base`},lead:{inst:`square`,oct:1,gain:.05,layer:`combo`,density:.45,penta:!0},arp:null,verb:.15,wobble:0},{bpm:118,steps:16,swing:0,progression:[0,5,2,6],drums:[{drum:`kick`,pattern:`X...X...X...X...`,gain:.12},{drum:`clap`,pattern:`....X.......X...`,gain:.075},{drum:`hat`,pattern:`..x...x...x...x.`,gain:.035}],freak:[{drum:`hat`,pattern:`oxoxoxoxoxoxoxox`,gain:.02},{drum:`openHat`,pattern:`..x...x...x...x.`,gain:.025},{drum:`tomLow`,pattern:`............xxxx`,gain:.06}],bossHat:`hat`,bass:{inst:`synthBass`,oct:-1,gain:.075,layer:`base`,pattern:`R.O.R.O.R.O.R.O.`},pad:{inst:`gatedPad`,oct:0,gain:.03,layer:`base`,gate:`xx.xx.x.xx.xx.x.`},lead:{inst:`saw`,oct:1,gain:.04,layer:`combo`,density:.4,penta:!0},arp:{inst:`saw`,oct:1,gain:.028,layer:`base`,every:1,shape:[0,1,2,3]},verb:.3,wobble:0},{bpm:90,steps:16,swing:0,progression:[0,1,5,4],drums:[{drum:`subKick`,pattern:`X.......x.......`,gain:.1},{drum:`tick`,pattern:`......o.......o?`,gain:.02}],freak:[{drum:`tick`,pattern:`oxoxoxoxoxoxoxox`,gain:.018},{drum:`subKick`,pattern:`....x.......x...`,gain:.07},{drum:`shaker`,pattern:`xoxoxoxoxoxoxoxo`,gain:.02}],bossHat:`tick`,bass:{inst:`sub`,oct:-1,gain:.08,layer:`base`,pattern:`R...............`},pad:{inst:`pad`,oct:0,gain:.035,layer:`base`},lead:{inst:`bell`,oct:2,gain:.035,layer:`combo`,density:.2,penta:!0},arp:{inst:`bell`,oct:1,gain:.035,layer:`base`,every:2,shape:[0,2,1,3]},verb:.45,wobble:0},{bpm:126,steps:14,swing:0,progression:[0,5,1,4],drums:[{drum:`kick`,pattern:`X...X...X..x..`,gain:.12},{drum:`glitch`,pattern:`....X.......X.`,gain:.08},{drum:`hat`,pattern:`x.?.x.?.x.?.x.`,gain:.028},{drum:`tick`,pattern:`.?..?...?..?.?`,gain:.03}],freak:[{drum:`glitch`,pattern:`?x?x?x?x?x?x?x`,gain:.03},{drum:`tomLow`,pattern:`x..x..x...x...`,gain:.07}],bossHat:`tick`,bass:{inst:`glitch`,oct:-1,gain:.048,layer:`base`,pattern:`R..R..5.R._.O.`},pad:{inst:`warpPad`,oct:0,gain:.028,layer:`base`},lead:{inst:`glitch`,oct:1,gain:.032,layer:`base`,density:.4,penta:!0},arp:{inst:`bell`,oct:1,gain:.03,layer:`combo`,every:1,shape:[0,2,1,3,4,2]},verb:.3,wobble:18}],Sh=[0,1,0,5],Ch=[0,1,0,4],wh=`RrRrRrRrRrRrRrRr`,Th=`xoxoxoxoxoxoxoxo`,Eh={kick:.36,subKick:.63,tomLow:.38,tomHi:.28,log:.19,frame:.45,slap:.1,snare:.2,clap:.21,clank:.17,anvil:.38,hat:.06,openHat:.25,shaker:.08,tamb:.14,tick:.04,glitch:.12};function Dh(e,t){switch(e){case`marimba`:return .58;case`lute`:return Math.min(.9,t+.35)+.03;case`harpsi`:return .48;case`chug`:return .14;case`square`:return t*.6+.21;case`synthBass`:return t*.7+.15;case`saw`:return t*.5+.23;case`bell`:return Math.max(.8,t)+.03;case`glitch`:return Math.min(t,.3)+.1;case`drone`:return t+.55;case`gatedPad`:return t+.25;case`pad`:return t+.75;case`organ`:return t+.3;case`sub`:return t+.4;case`warpPad`:return t+.65}}var Oh=[0,2,4,7],kh=.09,Ah=(e,t,n)=>e<t?t:e>n?n:e;function jh(e,t,n){let r=[],i=Oh[Math.floor(e()*3)];for(let a=0;a<t;a++){let t=a%4==0,o=a===0?1:t?n+.25:a%2==0?n:n*.45;e()>=o?r.push(null):(i=t?Oh[Math.floor(e()*Oh.length)]:Ah(i+(e()<.5?-1:1)*(e()<.75?1:2),-3,9),r.push(i))}return r}function Mh(e,t,n,r){let i=e.slice(),a=0;for(let e=0;e<i.length;e++){let r=i[e];e>0&&t()<n&&(r===null?e%2==0&&(i[e]=a+(t()<.5?-1:1)):e%4==0?i[e]=Oh[Math.floor(t()*Oh.length)]:i[e]=t()<.3?null:r+(t()<.5?-1:1));let o=i[e];o!==null&&(a=o)}if(r){let e=Math.floor(i.length*.75);for(let t=e;t<i.length;t++)i[t]=null;i[e]=0}return i}function Nh(e,t,n){let r=1;for(;t+r<e.length&&e[t+r]===null&&r<n;)r++;return r}var Ph=class{kit;dest;duckGain;players=[];voices=[];comboOn=!1;comboLowFor=0;combo=0;freak=0;boss=0;sing=0;bossActive=!1;constructor(e,t,n){this.kit=e,this.dest=t,this.duckGain=n}update(e,t,n,r){let i=n.state,a=n.liveStreak,o=Math.max(0,Math.min(t,.25));a>20?(this.comboOn=!0,this.comboLowFor=0):a<10?(this.comboLowFor+=o,this.comboLowFor>1.5&&(this.comboOn=!1)):this.comboLowFor=0;let s=i.time<i.freakOutEnd;this.bossActive=i.boss!==null;let c=i.buffs.some(e=>e.id===`singularity`&&e.end>i.time),l=1-Math.exp(-o/.6);this.combo+=((this.comboOn||s?1:0)-this.combo)*l,this.freak+=(+!!s-this.freak)*l,this.boss+=(+!!this.bossActive-this.boss)*l,this.sing+=(+!!c-this.sing)*l;let u=Ah(Math.floor(i.era)||0,0,xh.length-1),d=this.players[this.players.length-1];if(!d||d.era!==u){let t=d?2:1.5;d&&d.fadeOut(e,t),this.players.push(new Fh(this,u,e+.06,t))}let f=0;for(let t of this.voices)t>e&&(this.voices[f++]=t);this.voices.length=f;let p=e+_h;for(let t of this.players)t.schedule(e,p,r);this.players.length>1&&(this.players=this.players.filter((t,n)=>n===this.players.length-1||e<t.fadeEnd+.6||(t.dispose(),!1)))}claim(e,t){let n=vh-(t<=0?0:t===1?1:t===2?3:5+t-3);return this.voices.length>=n?!1:(this.voices.push(e),!0)}duck(e,t,n,r){let i=this.duckGain.gain;typeof i.cancelAndHoldAtTime==`function`?i.cancelAndHoldAtTime(e):(i.cancelScheduledValues(e),i.setValueAtTime(i.value,e)),i.linearRampToValueAtTime(1-t,e+.04),i.setValueAtTime(1-t,e+.04+n),i.linearRampToValueAtTime(1,e+.04+n+r)}},Fh=class{era;fadeEnd=1/0;music;kit;style;out;wet;dest;crush;grid;stepIndex=0;stepDur=.125;seed;motifs;line=[];chord=0;key;arpIndex=0;bar=0;barRng=Math.random;constructor(e,t,n,r){this.music=e,this.kit=e.kit,this.era=t,this.style=xh[t],this.key=ch(t,!1);let i=this.kit.ctx;this.out=i.createGain(),this.wet=i.createGain();for(let e of[this.out,this.wet])e.gain.value=0,e.gain.setValueAtTime(0,n),e.gain.linearRampToValueAtTime(1,n+r);this.out.connect(e.dest.dry),e.dest.wet&&this.wet.connect(e.dest.wet),this.dest={dry:this.out,wet:this.wet},this.crush=t===6?this.kit.crusher(this.out,kh):null,this.grid=n,this.seed=Math.random()*4294967295>>>0;let a=gh(this.seed),o=this.style.lead.density;this.motifs=[jh(a,this.style.steps,o),jh(a,this.style.steps,o*.85)]}fadeOut(e,t){for(let n of[this.out,this.wet]){let r=n.gain;typeof r.cancelAndHoldAtTime==`function`?r.cancelAndHoldAtTime(e):(r.cancelScheduledValues(e),r.setValueAtTime(r.value,e)),r.linearRampToValueAtTime(0,e+t)}this.fadeEnd=e+t}dispose(){for(let e of[this.out,this.wet,this.crush])try{e?.disconnect()}catch{}}schedule(e,t,n){this.grid<e-.02&&(this.grid=e+.03);let r=this.style,i=0;for(;this.grid<t&&i++<yh;){let e=this.music.bossActive;this.stepDur=60/(r.bpm*(e?bh:1))/4;let t=this.stepIndex%r.steps;t===0&&this.newBar(e);let i=this.grid+(t%2==1?r.swing*this.stepDur:0);n&&this.grid<this.fadeEnd&&this.playStep(t,i,e),this.grid+=this.stepDur,this.stepIndex++}}newBar(e){let t=this.style;this.bar=Math.floor(this.stepIndex/t.steps),this.key=ch(this.era,e);let n=e?this.era===6?Ch:Sh:t.progression;this.chord=n[this.bar%n.length];let r=gh(this.seed^Math.imul(this.bar+1,2654435761));this.barRng=r;let i=Math.floor(this.bar/8)%4,a=this.motifs[+(i===2)],o=this.bar%8>=4?.3:.15;this.line=Mh(a,r,o,this.bar%4==3)}chordNote(e,t){let n=this.key.root+12*t,r=uh(n,this.key.mode,this.chord+e),i=n+5;for(;r>i+10;)r-=12;for(;r<i-10;)r+=12;return r}playStep(e,t,n){let r=this.style,i=this.music,a=this.stepDur,o=this.fadeEnd<1/0,s=e=>e+ +!!o,c=e=>e===`base`?1:i.combo;for(let n of r.drums)this.drumHit(n,e,t,1,s(n.drum===`kick`||n.drum===`subKick`?0:1));let l=n?wh:r.bass.pattern,u=l[e%l.length];if(u!==`.`&&u!==`_`){let i=1;for(;e+i<r.steps&&l[(e+i)%l.length]===`.`&&i<16;)i++;let o=this.chordNote(0,r.bass.oct),c=u===`5`?this.chordNote(4,r.bass.oct):u===`O`?o+12:o,d=u===`r`?.65:1;this.note(r.bass.inst,t,c,i*a*(n?.7:.92),r.bass.gain*d*(n?.85:1),s(0))}let d=r.pad;if(d&&e===0){let e=r.steps*a,n=d.inst===`drone`?[this.key.root+12*d.oct,this.key.root+12*d.oct+7]:[0,2,4].map(e=>this.chordNote(e,d.oct));for(let r of n)this.note(d.inst,t,r,e,d.gain,s(0))}let f=c(r.lead.layer),p=this.line[e];if(f>.05&&p!=null){let n=this.chordNote(p,r.lead.oct);r.lead.penta&&(n=fh(this.key,n));let i=Nh(this.line,e,4)*a*.9;this.note(r.lead.inst,t,n,i,r.lead.gain*f,s(r.lead.layer===`base`?1:2))}if(r.arp){let n=c(r.arp.layer);if(n>.05&&e%r.arp.every===0){let e=[0,2,4,7,9][r.arp.shape[this.arpIndex++%r.arp.shape.length]],i=uh(this.key.root+12*r.arp.oct,this.key.mode,this.chord+e);this.note(r.arp.inst,t,i,r.arp.every*a*.9,r.arp.gain*n,s(r.arp.layer===`base`?1:2))}}if(i.freak>.05)for(let n of r.freak)this.drumHit(n,e,t,i.freak,s(2));if(i.boss>.05){let n=Th[e%16];this.drum(r.bossHat,t,.022*i.boss*(n===`x`?1:.5),s(3))}if(i.boss>.05&&e%4==0){let n=this.key.root+24,r=n+this.key.mode[1];this.note(`square`,t,e/4%2?r:n,a*1.5,.022*i.boss,s(2))}if(i.sing>.05&&(e===0&&this.note(`sub`,t,this.key.root-12,r.steps*a,.07*i.sing,s(2)),this.barRng()<.12)){let e=Math.floor(this.barRng()*8),n=this.key.root;for(;n<79;)n+=12;this.note(`bell`,t,uh(n,this.key.penta,e),1.2,.02*i.sing,s(3),2)}}drumHit(e,t,n,r,i){let a=e.pattern[t%e.pattern.length],o=0;a===`X`?o=1:a===`x`?o=.7:a===`o`?o=.4:a===`?`&&(o=this.barRng()<.5?.35:0),o>0&&this.drum(e.drum,n,e.gain*o*r,i)}drum(e,t,n,r){if(n<.002||!this.music.claim(t+Eh[e],r))return;let i=new Um(this.kit,this.dest,this.style.verb*.5),a=i.out;switch(e){case`kick`:X(i,a,t,{freq:155,to:45,glide:.11,gain:n,decay:.32}),Z(i,a,t,{type:`lowpass`,freq:2500,gain:n*.15,decay:.012});break;case`subKick`:X(i,a,t,{freq:85,to:40,glide:.25,gain:n,attack:.006,decay:.6});break;case`tomLow`:X(i,a,t,{freq:115,to:62,glide:.18,gain:n,decay:.35});break;case`tomHi`:X(i,a,t,{freq:200,to:125,glide:.14,gain:n,decay:.25});break;case`log`:X(i,a,t,{type:`triangle`,freq:440,to:340,glide:.03,gain:n,decay:.16}),X(i,a,t,{freq:1190,gain:n*.2,decay:.03});break;case`frame`:X(i,a,t,{freq:96,to:68,glide:.15,gain:n,decay:.42}),Z(i,a,t,{type:`bandpass`,freq:900,q:1,gain:n*.5,decay:.05});break;case`slap`:Z(i,a,t,{type:`bandpass`,freq:1700,q:1.2,gain:n,decay:.07}),X(i,a,t,{type:`triangle`,freq:270,to:200,glide:.05,gain:n*.5,decay:.08});break;case`snare`:Z(i,a,t,{type:`bandpass`,freq:1900,q:.7,gain:n,decay:.17,lowpass:7e3}),X(i,a,t,{type:`triangle`,freq:210,to:160,glide:.05,gain:n*.5,decay:.1});break;case`clap`:for(let e=0;e<3;e++)Z(i,a,t+e*.011,{type:`bandpass`,freq:1300,q:1.1,gain:n*.8,decay:.01});Z(i,a,t+.03,{type:`bandpass`,freq:1300,q:1.1,gain:n,decay:.16});break;case`clank`:{let e=i.filter(`bandpass`,2700,3);e.connect(a),X(i,e,t,{type:`square`,freq:587,gain:n*1.4,decay:.14}),X(i,e,t,{type:`square`,freq:829,gain:n*1.4,decay:.12}),Z(i,a,t,{type:`highpass`,freq:4500,gain:n*.4,decay:.03,lowpass:9e3});break}case`anvil`:Km(i,a,t,1250,n,.35,1.41,3);break;case`hat`:Z(i,a,t,{type:`highpass`,freq:7500,gain:n,decay:.04});break;case`openHat`:Z(i,a,t,{type:`highpass`,freq:7e3,gain:n,decay:.22});break;case`shaker`:Z(i,a,t,{type:`bandpass`,freq:5500,q:1.4,gain:n,attack:.012,decay:.05});break;case`tamb`:Z(i,a,t,{type:`highpass`,freq:6e3,gain:n,decay:.09}),Z(i,a,t,{type:`bandpass`,freq:9e3,q:4,gain:n*.6,decay:.12});break;case`tick`:X(i,a,t,{type:`square`,freq:3100,gain:n*.5,decay:.018}),Z(i,a,t,{type:`highpass`,freq:6e3,gain:n*.5,decay:.015});break;case`glitch`:{let e=this.crush?i.tap(this.crush):a,r=this.crush?Math.min(.95,n/kh):n;Z(i,e,t,{type:`bandpass`,freq:2500,q:.6,gain:r,decay:.05}),this.barRng()<.3&&Z(i,e,t+this.stepDur/2,{type:`bandpass`,freq:3500,q:.6,gain:r*.7,decay:.03});break}}}note(e,t,n,r,i,a,o=1){if(i<.002||!this.music.claim(t+Dh(e,r),a))return;let s=this.style,c=new Um(this.kit,this.dest,Math.min(.9,s.verb*o)),l=c.out,u=s.wobble?(Math.random()-.5)*2*s.wobble:0,d=lh(n);switch(e){case`marimba`:X(c,l,t,{freq:d,gain:i,decay:.55,detune:u}),X(c,l,t,{freq:d*4,gain:i*.22,decay:.07,detune:u});break;case`lute`:{let e=c.filter(`lowpass`,3200,1.6);e.frequency.setValueAtTime(3200,t),e.frequency.exponentialRampToValueAtTime(520,t+.28),e.connect(l),X(c,e,t,{type:`sawtooth`,freq:d,gain:i,decay:Math.min(.9,r+.35),detune:u});break}case`harpsi`:{let e=c.filter(`highpass`,250,.7),n=c.filter(`lowpass`,5200,.9);n.frequency.setValueAtTime(5200,t),n.frequency.exponentialRampToValueAtTime(1600,t+.3),e.connect(n),n.connect(l),X(c,e,t,{type:`square`,freq:d,gain:i,attack:.002,decay:.45,detune:u});break}case`drone`:{let e=c.filter(`lowpass`,650,.8);e.connect(l);let n=c.gain(0);Gm(n.gain,t,i,.4,t+r,.5),n.connect(e),c.osc(`sawtooth`,d,t,t+r+.55,u-5).connect(n);break}case`chug`:{let e=c.filter(`lowpass`,420,2);e.connect(l),X(c,e,t,{type:`square`,freq:d,gain:i,attack:.002,decay:.11,detune:u});break}case`square`:{let e=c.filter(`lowpass`,2400,.8);e.connect(l),X(c,e,t,{type:`square`,freq:d,gain:i,attack:.008,hold:r*.6,decay:.18,detune:u});break}case`synthBass`:{let e=c.filter(`lowpass`,1500,5);e.frequency.setValueAtTime(1500,t),e.frequency.exponentialRampToValueAtTime(320,t+.15),e.connect(l),X(c,e,t,{type:`sawtooth`,freq:d,gain:i,attack:.004,hold:r*.7,decay:.12,detune:u});break}case`saw`:{let e=c.filter(`lowpass`,2600,1);e.connect(l);for(let n of[-8,8])X(c,e,t,{type:`sawtooth`,freq:d,gain:i*.6,attack:.005,hold:r*.5,decay:.2,detune:u+n});break}case`gatedPad`:{let e=c.filter(`lowpass`,1500,.8);e.connect(l);let n=c.gain(0),a=s.pad?.gate??`x`;n.gain.setValueAtTime(0,t);for(let e=0;e<s.steps;e++){let r=a[e%a.length]===`x`;n.gain.setTargetAtTime(r?i:0,t+e*this.stepDur,.008)}n.gain.setTargetAtTime(0,t+r,.03),n.connect(e);for(let e of[-10,10])c.osc(`sawtooth`,d,t,t+r+.25,u+e).connect(n);break}case`pad`:{let e=c.filter(`lowpass`,1100,.7);e.connect(l);let n=c.gain(0);Gm(n.gain,t,i,.45,t+r,.7),n.connect(e),c.osc(`triangle`,d,t,t+r+.75,u).connect(n);let a=c.gain(.35);c.osc(`sawtooth`,d,t,t+r+.75,u+6).connect(a),a.connect(n);break}case`organ`:{let e=c.filter(`lowpass`,1800,.7);e.connect(l);let n=c.gain(0);Gm(n.gain,t,i,.04,t+r,.25),n.connect(e),c.osc(`triangle`,d,t,t+r+.3,u).connect(n);let a=c.gain(.35);c.osc(`triangle`,d*2,t,t+r+.3,u).connect(a),a.connect(n);break}case`bell`:Km(c,l,t,d*2**(u/1200),i,Math.max(.8,r),3.5,1.6);break;case`sub`:{let e=c.gain(0);Gm(e.gain,t,i,.08,t+r,.35),e.connect(l),c.osc(`sine`,d,t,t+r+.4).connect(e);break}case`glitch`:{let e=this.crush?c.tap(this.crush):l,n=this.crush?Math.min(.95,i/kh):i,a=t+Math.min(r,.3)+.08,o=c.osc(`square`,d,t,a+.02,u);Math.random()<.3&&o.frequency.setValueAtTime(d*(Math.random()<.5?2:.5),t+Math.min(r,.3)*.5);let s=c.gain(0);s.gain.setValueAtTime(Bm,t),s.gain.linearRampToValueAtTime(n,t+.003),s.gain.setValueAtTime(n,t+Math.min(r,.3)),s.gain.exponentialRampToValueAtTime(Bm,a),o.connect(s),s.connect(e);break}case`warpPad`:{let e=c.filter(`lowpass`,1e3,1.5);e.connect(l);let n=t+r+.65,a=c.osc(`sine`,.4+Math.random()*.5,t,n),o=c.gain(450);a.connect(o),o.connect(e.frequency);let s=c.gain(0);Gm(s.gain,t,i,.5,t+r,.6),s.connect(e);for(let e of[-22,22])c.osc(`sawtooth`,d,t,n,u+e).connect(s);break}}}},Ih=(e,t)=>e+Math.random()*(t-e),Lh=e=>2**(e/1200);function Rh(e,t,n=60){let r=e.root;for(;r<n;)r+=12;return uh(r,e.penta,t)}function zh(e,t){let n=ph(e);for(;n<t;)n+=12;return[n,n+4,n+7,n+12]}function Bh(e,t){let n=e.root;for(;n<t;)n+=12;return[...dh(e,0,n),n+12]}function Vh(e,t,n,r){let i=new Um(e,t,r.crit?.22:.07),a=i.out,o=r.gain,s=lh(r.midi)*Lh(Ih(-6,6)),c=Ih(.85,1.15);switch(r.family){case`blunt`:X(i,a,n,{freq:170*c,to:55,glide:.07,gain:.15*o,decay:.13}),Z(i,a,n,{type:`lowpass`,freq:900*c,gain:.09*o,decay:.04}),X(i,a,n,{type:`triangle`,freq:s,gain:.07*o,decay:.1});break;case`blade`:Z(i,a,n,{type:`bandpass`,freq:5200*c,to:1700,q:1.3,gain:.11*o,attack:.008,decay:.08,lowpass:6e3}),X(i,a,n,{freq:260*c,to:110,glide:.05,gain:.07*o,decay:.06}),X(i,a,n,{freq:s,gain:.065*o,decay:.24}),X(i,a,n,{freq:s*2.76,gain:.022*o,decay:.18});break;case`arrow`:Z(i,a,n,{type:`bandpass`,freq:1200*c,to:4200,q:3,gain:.2*o,attack:.004,decay:.07,lowpass:6e3}),X(i,a,n,{type:`triangle`,freq:s*1.5,to:s,glide:.03,gain:.09*o,decay:.12}),X(i,a,n,{freq:200*c,to:90,glide:.04,gain:.1*o,decay:.06});break;case`bullet`:Z(i,a,n,{type:`bandpass`,freq:3e3*c,q:.7,gain:.16*o,attack:.001,decay:.022,lowpass:6e3}),X(i,a,n,{freq:240*c,to:60,glide:.04,gain:.14*o,decay:.08}),X(i,a,n,{type:`triangle`,freq:s,gain:.06*o,decay:.07});break;case`explosive`:X(i,a,n,{freq:130*c,to:38,glide:.18,gain:.15*o,decay:.26}),Z(i,a,n,{type:`lowpass`,freq:1500*c,to:250,q:.9,gain:.09*o,decay:.22}),X(i,a,n,{type:`triangle`,freq:s/2,gain:.07*o,decay:.13});break;case`fire`:Z(i,a,n,{type:`bandpass`,freq:700*c,to:2600,q:.9,gain:.17*o,attack:.02,decay:.16}),X(i,a,n,{freq:140*c,to:70,glide:.06,gain:.1*o,decay:.09}),X(i,a,n,{type:`triangle`,freq:s,gain:.075*o,attack:.008,decay:.14});break;case`energy`:{let e=i.filter(`lowpass`,6e3,8);e.frequency.setValueAtTime(6e3*c,n),e.frequency.exponentialRampToValueAtTime(900,n+.08),e.connect(a),X(i,e,n,{type:`sawtooth`,freq:s*3,to:s,glide:.06,gain:.07*o,decay:.1}),X(i,a,n,{freq:s,gain:.065*o,decay:.12}),X(i,a,n,{freq:180*c,to:80,glide:.05,gain:.11*o,decay:.07});break}case`cosmic`:{let e=s/4;for(;e<45;)e*=2;X(i,a,n,{freq:e*1.5,to:e,glide:.05,gain:.16*o,decay:.28}),X(i,a,n,{type:`triangle`,freq:s,gain:.05*o,decay:.15}),X(i,a,n,{freq:s*2,gain:.022*o,attack:.01,decay:.35}),X(i,a,n,{freq:s*3.01,gain:.016*o,attack:.015,decay:.32}),Z(i,a,n,{type:`highpass`,freq:4e3,gain:.025*o,decay:.06,lowpass:9e3});break}case`reality`:{let e=r.crush?i.tap(r.crush):a,t=r.crush?.85:.06,l=n+.12,u=i.osc(`square`,s,n,l+.02),d=[1.5,.5,2,1.5][Math.floor(Math.random()*4)];u.frequency.setValueAtTime(s*d,n+.022),u.frequency.setValueAtTime(s,n+.045);let f=i.gain(0);Wm(f.gain,n,t*o,.002,.11),u.connect(f),f.connect(e),Z(i,e,n,{type:`bandpass`,freq:2500,q:.6,gain:(r.crush?.8:.05)*o,decay:.015}),Z(i,e,n+.03,{type:`bandpass`,freq:4e3,q:.6,gain:(r.crush?.6:.04)*o,decay:.012}),X(i,a,n,{freq:160*c,to:50,glide:.06,gain:.12*o,decay:.1}),X(i,a,n,{type:`triangle`,freq:s,gain:.04*o,decay:.09});break}}if(r.crit){let e=r.critGain,t=s*4;for(;t>3600;)t/=2;Km(i,a,n+.004,t,.06*e,.45,3.5,1.8),X(i,a,n,{freq:120,to:42,glide:.1,gain:.12*e,decay:.18})}return i}function Hh(e,t,n,r){let i=new Um(e,t,.35);return Bh(r,76).forEach((e,t)=>{X(i,i.out,n+t*.018,{freq:lh(e),gain:.04,decay:.85}),X(i,i.out,n+t*.018,{freq:lh(e)*2,gain:.01,decay:.4})}),i}function Uh(e,t,n,r){Xm(e,t,n,lh(Rh(r,2,84)),.025,.4,.3,2,1),Xm(e,t,n+.07,lh(Rh(r,4,84)),.022,.5,.3,2,1)}function Wh(e,t,n){let r=new Um(e,t,.25),i=n+1,a=r.filter(`lowpass`,2600,1),o=r.gain(.5),s=r.gain(0);Gm(s.gain,n,.08,.05,n+.72,.22);let c=r.osc(`sine`,11,n,i),l=r.gain(35);c.connect(l);for(let[e,t]of[[`sawtooth`,1],[`square`,1.006]]){let a=r.osc(e,380*t,n,i);a.frequency.exponentialRampToValueAtTime(1150*t,n+.7),l.connect(a.frequency),a.connect(o)}return o.connect(a),a.connect(s),s.connect(r.out),r}function Gh(e,t,n,r){let i=lh(Rh(r,5,66));Jm(e,t,n,{type:`triangle`,freq:i,to:i/2.5,glide:.6,gain:.06,attack:.02,decay:.65},.25),Jm(e,t,n,{type:`triangle`,freq:i/1.5,to:i/3.75,glide:.6,gain:.035,attack:.02,decay:.65},.25),Ym(e,t,n+.05,{type:`lowpass`,freq:1400,to:500,q:.6,gain:.035,attack:.08,decay:.35})}function Kh(e,t,n,r){let i=new Um(e,t,.2),a=n+3,o=lh(r.root-12),s=i.filter(`lowpass`,300,5);s.frequency.setValueAtTime(300,n),s.frequency.exponentialRampToValueAtTime(5e3,n+2);let c=i.gain(.45);for(let e of[-12,12]){let t=i.osc(`sawtooth`,o,n,a,e);t.frequency.exponentialRampToValueAtTime(o*4,n+2),t.connect(c)}let l=i.noise(n,a),u=i.filter(`bandpass`,400,2);u.frequency.setValueAtTime(400,n),u.frequency.exponentialRampToValueAtTime(6e3,n+2);let d=i.gain(.9);l.connect(u),u.connect(d),d.connect(s),c.connect(s);let f=i.gain(.6),p=i.osc(`sine`,5,n,a);p.frequency.exponentialRampToValueAtTime(16,n+2);let m=i.gain(.4);p.connect(m),m.connect(f.gain);let h=i.gain(0);return h.gain.setValueAtTime(Bm,n),h.gain.exponentialRampToValueAtTime(.1,n+2),h.gain.setValueAtTime(.1,n+2.6),h.gain.linearRampToValueAtTime(0,n+2.95),s.connect(f),f.connect(h),h.connect(i.out),{voice:i,end:a}}function qh(e,t,n,r,i,a){let o=.5+.5*Math.max(0,Math.min(1,r)),s=new Um(e,t,.35);X(s,s.out,n,{freq:120,to:28,glide:.5,gain:.26*o,decay:.75}),X(s,s.out,n,{type:`triangle`,freq:240,to:60,glide:.12,gain:.1*o,decay:.2}),Z(s,s.out,n,{type:`lowpass`,freq:4e3,to:250,sweep:.5,q:.9,gain:.17*o,decay:.65}),Z(s,s.out,n,{type:`bandpass`,freq:2500,q:1,gain:.1*o,decay:.05,lowpass:6e3}),i&&(Zm(e,t,n+.05,zh(a,55),.5,.13,.35),Jh(e,t,n+.12,a,6,.04,.03))}function Jh(e,t,n,r,i=7,a=.045,o=.04){let s=new Um(e,t,.4),c=Math.floor(Math.random()*3);for(let e=0;e<i;e++)Km(s,s.out,n+e*a,lh(Rh(r,c+e,79)),o*(1-e*.05),.35,2,1.1)}function Yh(e,t,n,r){Jh(e,t,n,r,8,.05,.055),Ym(e,t,n,{type:`bandpass`,freq:7e3,q:2,gain:.035,attack:.15,decay:.45,lowpass:9e3},.4)}function Xh(e,t,n,r){let i=new Um(e,t,.25),a=i.filter(`lowpass`,4500,.7);a.connect(i.out);let o=[0,2,3,5].map(e=>Rh(r,e,72));o.forEach((e,t)=>{let r=t===o.length-1;X(i,a,n+t*.055,{type:`square`,freq:lh(e),gain:.05,hold:r?.08:.02,decay:r?.35:.08})}),Jh(e,t,n+.2,r,6,.04,.03)}function Zh(e,t,n,r){let i=lh(Rh(r,2,67)),a=lh(Rh(r,0,67));Jm(e,t,n,{type:`triangle`,freq:i,to:i*Lh(-100),glide:.18,gain:.055,attack:.02,hold:.08,decay:.15},.2),Jm(e,t,n+.22,{type:`triangle`,freq:a,to:a*Lh(-250),glide:.4,gain:.05,attack:.02,hold:.12,decay:.3},.2)}function Qh(e,t,n,r){let i=new Um(e,t,.25);Km(i,i.out,n,880*Ih(.95,1.05),.08,.5,1.41,4),Z(i,i.out,n,{type:`bandpass`,freq:3200,q:1.2,gain:.07,decay:.03,lowpass:6e3});let a=Rh(r,0,64);X(i,i.out,n+.07,{type:`triangle`,freq:lh(a),gain:.06,decay:.14}),X(i,i.out,n+.15,{type:`triangle`,freq:lh(a+7),gain:.065,hold:.04,decay:.3})}function $h(e,t,n,r,i){let a=lh(Rh(r,Math.min(4,Math.round(Math.log10(Math.max(1,i))*2))+2,67)),o=new Um(e,t,.1);X(o,o.out,n,{freq:a*.55,to:a,glide:.03,gain:.11,decay:.09}),X(o,o.out,n+.03,{type:`triangle`,freq:a*2,gain:.02,decay:.06}),Z(o,o.out,n,{type:`bandpass`,freq:2e3,q:1,gain:.03,decay:.01})}function eg(e,t,n,r){let i=new Um(e,t,.3);[0,2,4].forEach((e,t)=>{let a=lh(Rh(r,e+5,67));X(i,i.out,n+t*.065,{type:`triangle`,freq:a,gain:.06,decay:t===2?.4:.15}),Km(i,i.out,n+t*.065,a*2,.018,.3,2,1)})}function tg(e,t,n,r){let i=r.root;Xm(e,t,n,lh(i),.07,1.6,.5,3.5,2),Xm(e,t,n+.12,lh(i+6),.05,1.8,.5,3.5,2),Jm(e,t,n,{freq:lh(i-12),gain:.06,attack:.15,decay:1.4},.2)}function ng(e,t,n){let r=new Um(e,t,0);X(r,r.out,n,{freq:190,to:110,glide:.1,gain:.1,decay:.14}),X(r,r.out,n,{type:`triangle`,freq:95,gain:.04,decay:.1})}function rg(e,t,n,r){let i=zh(r,55);Zm(e,t,n,i.slice(0,3),.08,.1,.25),Zm(e,t,n+.15,i,.55,.12,.3)}function ig(e,t,n){let r=new Um(e,t,.12),i=n;for(let e=0;e<18;e++){let t=e/17;X(r,r.out,i,{type:`triangle`,freq:1100+900*t,to:800+700*t,glide:.015,gain:.08+.03*t,decay:.03}),Z(r,r.out,i,{type:`bandpass`,freq:3500,q:2,gain:.05,decay:.012}),i+=.06-.038*t}}function ag(e,t,n){let r=new Um(e,t,.3),i=n+.9,a=r.osc(`sawtooth`,110,n,i);a.frequency.exponentialRampToValueAtTime(2400,n+.8);let o=r.osc(`sine`,6,n,i);o.frequency.exponentialRampToValueAtTime(32,n+.8);let s=r.gain(15);s.gain.setValueAtTime(15,n),s.gain.exponentialRampToValueAtTime(400,n+.8),o.connect(s),s.connect(a.frequency);let c=r.filter(`bandpass`,400,1.5);c.frequency.setValueAtTime(400,n),c.frequency.exponentialRampToValueAtTime(5e3,n+.8);let l=r.gain(0);l.gain.setValueAtTime(Bm,n),l.gain.exponentialRampToValueAtTime(.12,n+.7),l.gain.linearRampToValueAtTime(0,n+.82),a.connect(c),c.connect(l),l.connect(r.out),Z(r,r.out,n,{type:`bandpass`,freq:300,to:6e3,sweep:.8,q:1.5,gain:.09,attack:.6,decay:.2,lowpass:7e3}),Z(r,r.out,n+.8,{type:`highpass`,freq:2500,gain:.08,decay:.03,lowpass:7e3})}function og(e,t,n,r){let i=new Um(e,t,.6);X(i,i.out,n,{freq:70,to:32,glide:2.2,gain:.16,attack:.35,hold:.4,decay:1.8});let a=i.filter(`lowpass`,200,2);a.frequency.setValueAtTime(200,n),a.frequency.exponentialRampToValueAtTime(1400,n+.6),a.frequency.exponentialRampToValueAtTime(180,n+2.4),a.connect(i.out);let o=lh(r.root-12);for(let e of[-15,0,15])X(i,a,n,{type:`sawtooth`,freq:o,gain:.035,attack:.4,hold:.5,decay:1.6,detune:e});Z(i,i.out,n,{type:`lowpass`,freq:300,to:3e3,sweep:.5,q:3,gain:.05,attack:.4,decay:1.2})}function sg(e,t,n){Jm(e,t,n,{type:`triangle`,freq:700,to:280,glide:.45,gain:.04,attack:.01,decay:.45},.15),Ym(e,t,n,{type:`lowpass`,freq:1500,to:300,gain:.02,attack:.05,decay:.4})}function cg(e,t,n,r){let i=Rh(r,0,72);Xm(e,t,n,lh(i),.06,.6,.3),Xm(e,t,n+.14,lh(i+7),.07,.9,.35)}function lg(e,t,n,r){let i=new Um(e,t,.35);X(i,i.out,n,{freq:90,to:32,glide:.6,gain:.24,decay:.9}),X(i,i.out,n,{freq:140,to:70,glide:.2,gain:.1,decay:.35}),Z(i,i.out,n,{type:`lowpass`,freq:1800,to:200,q:.8,gain:.12,decay:.6});let a=new Um(e,t,.15),o=a.filter(`lowpass`,2800,1);o.connect(a.out);let s=r.root+24,c=s+r.mode[1];for(let e=0;e<6;e++)X(a,o,n+.35+e*.12,{type:`square`,freq:lh(e%2?s:c),gain:.04,attack:.005,hold:.06,decay:.04})}function ug(e,t,n,r){let i=new Um(e,t,.3),a=n;for(let e=0;e<14;e++)X(i,i.out,a,{freq:Ih(2500,7500),gain:Ih(.012,.024),attack:.001,decay:Ih(.08,.25)}),a+=.004+Math.random()*.03*(e/14);Z(i,i.out,n,{type:`highpass`,freq:5e3,gain:.06,decay:.4,lowpass:1e4});let o=new Um(e,t,.35);X(o,o.out,n,{freq:100,to:30,glide:.6,gain:.2,decay:.7}),Z(o,o.out,n,{type:`lowpass`,freq:2e3,to:200,q:.8,gain:.13,decay:.7}),Zm(e,t,n+.12,zh(r,55),1.1,.12,.35)}function dg(e,t,n,r){let i=new Um(e,t,.2),a=r.root+7;for(let e=0;e<4;e++){let t=e===3,r=n+e*.36,o=t?.95:.3,s=lh(a-e),c=i.filter(`lowpass`,400,3);c.frequency.setValueAtTime(350,r),c.frequency.linearRampToValueAtTime(1600,r+.08),c.frequency.exponentialRampToValueAtTime(450,r+o),c.connect(i.out);let l=i.osc(`sawtooth`,s,r,r+o+.1);if(t){let e=i.osc(`sine`,5.5,r,r+o+.1),t=i.gain(s*.03);e.connect(t),t.connect(l.frequency),l.frequency.setValueAtTime(s,r+.3),l.frequency.exponentialRampToValueAtTime(s*Lh(-60),r+o)}let u=i.gain(0);Gm(u.gain,r,.09,.03,r+o-.06,.08),l.connect(u),u.connect(c)}}function fg(e,t,n,r){Ym(e,t,n,{type:`bandpass`,freq:300,to:4500,sweep:.7,q:1.2,gain:.09,attack:.62,decay:.12,lowpass:7e3},.3);let i=n+.7,a=new Um(e,t,.4);X(a,a.out,i,{freq:110,to:35,glide:.5,gain:.22,decay:.7}),Z(a,a.out,i,{type:`lowpass`,freq:3e3,to:250,q:.8,gain:.13,decay:.6});let o=Bh(r,55),s=new Um(e,t,.45);qm(s,s.out,i+.02,o,1.2,.11),Jh(e,t,i+.1,r,6,.05,.03)}function pg(e,t,n,r){Xm(e,t,n,lh(Rh(r,2,72)),.05,.6,.3,2,1.2),Xm(e,t,n+.09,lh(Rh(r,4,72)),.05,.9,.35,2,1.2)}function mg(e,t,n,r){let i=n+1.6,a=new Um(e,t,.4),o=a.gain(0);o.gain.setValueAtTime(Bm,n),o.gain.exponentialRampToValueAtTime(.1,i-.02),o.gain.linearRampToValueAtTime(0,i),o.connect(a.out);let s=a.noise(n,i+.05),c=a.filter(`bandpass`,500,1);c.frequency.setValueAtTime(500,n),c.frequency.exponentialRampToValueAtTime(5e3,i),s.connect(c),c.connect(o);let l=Bh(r,55),u=a.gain(.25);for(let e of l)a.osc(`sawtooth`,lh(e),n,i+.05).connect(u);let d=a.filter(`lowpass`,2e3,1);u.connect(d),d.connect(o);let f=new Um(e,t,.5);X(f,f.out,i,{freq:140,to:25,glide:.8,gain:.25,decay:.9}),Z(f,f.out,i,{type:`bandpass`,freq:4e3,to:200,sweep:.25,q:1,gain:.14,decay:.3});let p=new Um(e,t,.55),m=i+.1,h=m+2.5,g=p.gain(0);Gm(g.gain,m,.11,.7,h,1.6);let _=p.gain(1/l.length);for(let e of l)for(let t of[-9,9])p.osc(`sawtooth`,lh(e-12),m,h+1.7,t).connect(_);let v=p.osc(`sine`,5,m,h+1.7),y=p.gain(4);v.connect(y);for(let[e,t,n]of[[800,5,1],[1150,6,.6],[2900,8,.2]]){let r=p.filter(`bandpass`,e,t),i=p.gain(n*1.8);_.connect(r),r.connect(i),i.connect(g)}g.connect(p.out)}function hg(e,t,n,r){switch(r){case`hover`:Jm(e,t,n,{freq:2300,to:2500,glide:.02,gain:.012,attack:.002,decay:.025});break;case`click`:{let r=new Um(e,t,0);X(r,r.out,n,{type:`triangle`,freq:1300,to:900,glide:.02,gain:.045,attack:.001,decay:.035}),Z(r,r.out,n,{type:`highpass`,freq:4e3,gain:.015,decay:.008,lowpass:8e3});break}case`tab`:{let r=new Um(e,t,0);X(r,r.out,n,{freq:880,gain:.03,decay:.05}),X(r,r.out,n+.035,{freq:1320,gain:.028,decay:.07});break}case`deny`:{let r=new Um(e,t,0);X(r,r.out,n,{type:`triangle`,freq:150,to:120,glide:.1,gain:.025,decay:.11}),X(r,r.out,n,{type:`triangle`,freq:158,to:126,glide:.1,gain:.02,decay:.11});break}case`toggle`:Jm(e,t,n,{type:`triangle`,freq:900,to:1400,glide:.025,gain:.035,attack:.001,decay:.035});break;case`open`:{let r=new Um(e,t,0);X(r,r.out,n,{freq:420,to:840,glide:.08,gain:.03,decay:.1}),Z(r,r.out,n,{type:`bandpass`,freq:800,to:3e3,q:1,gain:.012,attack:.02,decay:.08});break}case`close`:{let r=new Um(e,t,0);X(r,r.out,n,{freq:840,to:420,glide:.08,gain:.03,decay:.1}),Z(r,r.out,n,{type:`bandpass`,freq:3e3,to:800,q:1,gain:.012,attack:.02,decay:.08});break}}}var gg=[[800,1200,2500],[800,1200,2500],[700,1650,2500],[560,1750,2550],[570,950,2400]],_g=[7,9,11],vg=[1,.62,.3];function yg(e,t,n,r={}){let i=r.big??!1,a=r.level??1,o=new Um(e,t,i?.3:.18),s=1.12+Math.random()*.26,c=(i?270:330)*(.88+Math.random()*.3),l=gg[Math.floor(Math.random()*gg.length)],u=(i?.34:.2)*(.85+Math.random()*.3),d=n+.035,f=d+.05,p=d+u,m=p+.05,h=o.osc(`sawtooth`,c*.82,d,m);h.frequency.exponentialRampToValueAtTime(c*1.3,f),h.frequency.exponentialRampToValueAtTime(c*(Math.random()<.3?1.45:.92),p);let g=o.osc(`sine`,9+Math.random()*4,d,m),_=o.gain(c*.035);g.connect(_),_.connect(h.frequency);let v=o.gain(0);v.gain.setValueAtTime(Bm,d),v.gain.linearRampToValueAtTime(1,d+.022),v.gain.setValueAtTime(1,p-.04),v.gain.linearRampToValueAtTime(0,p),h.connect(v);let y=o.noise(n,m),b=o.gain(0);b.gain.setValueAtTime(Bm,n),b.gain.linearRampToValueAtTime(3.2,n+.012),b.gain.exponentialRampToValueAtTime(.7,d+.03),b.gain.exponentialRampToValueAtTime(Bm,p+.04),y.connect(b);let x=o.gain(i?.42:.36);for(let e=0;e<3;e++){let t=l[e]*s,r=o.filter(`bandpass`,t,_g[e]);e===0&&(r.frequency.setValueAtTime(t*.75,n),r.frequency.exponentialRampToValueAtTime(t,f));let i=o.gain(vg[e]);v.connect(r),b.connect(r),r.connect(i),i.connect(x)}let S=o.gain(a);return x.connect(S),S.connect(o.out),o}var bg=8,xg=6,Sg=.35,Cg=1,wg=1.8,Tg=e=>e**1.5,Eg=(e,t)=>typeof e==`number`&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t;function Dg(){if(typeof window>`u`)return null;let e=window;return e.AudioContext??e.webkitAudioContext??null}function Og(e,t){let n=new Vm(e),r=(t,n)=>{let r=e.createGain();return r.gain.value=t,r.connect(n),r},i=e.createDynamicsCompressor();i.threshold.value=-6,i.knee.value=6,i.ratio.value=6,i.attack.value=.003,i.release.value=.2,i.connect(e.destination);let a=r(wg,i),o=r(t.muted?0:Tg(t.master),a),s=e.createConvolver();s.normalize=!0,s.buffer=Hm(e,1.8),s.connect(r(.5,o));let c=Tg(t.sfx),l=Tg(t.music),u=r(c,o),d=r(c,s),f=r(c*.9,o),p=r(l,o),m=r(l,s),h=r(1,p);return{ctx:e,kit:n,master:o,sfxBus:u,sfxVerb:d,uiBus:f,musicBus:p,musicVerb:m,crush:n.crusher(u,.08),sfx:{dry:u,wet:d},ui:{dry:f,wet:null},music:new Ph(n,{dry:h,wet:m},h)}}var kg=class{g=null;failed=!1;hidden=!1;vol={master:.8,sfx:.8,music:.5,muted:!1};pokeVoices=[];pokeTimes=[];critTimes=[];lastPokeAt=-1;lastBigGaspAt=-1;lastCritGaspAt=-1;critGasp=null;lastHoverAt=-1;riser=null;constructor(){}get ready(){return this.g?.ctx.state===`running`}unlock(){if(!this.failed)try{if(!this.g){let e=Dg();if(!e){this.failed=!0;return}let t=new e({latencyHint:`interactive`});this.g=Og(t,this.vol);let n=t.createBufferSource();n.buffer=t.createBuffer(1,1,t.sampleRate),n.connect(t.destination),n.start(0)}let e=this.g.ctx;e.state!==`running`&&!this.hidden&&e.resume().catch(()=>void 0)}catch{this.failed=!0,this.g=null}}setVolumes(e){try{this.vol={master:Eg(e.master,this.vol.master),sfx:Eg(e.sfx,this.vol.sfx),music:Eg(e.music,this.vol.music),muted:typeof e.muted==`boolean`?e.muted:this.vol.muted};let t=this.g;if(!t)return;let n=t.ctx.currentTime,r=(e,t)=>{e.setTargetAtTime(t,n,.04)},i=Tg(this.vol.sfx),a=Tg(this.vol.music);r(t.master.gain,this.vol.muted?0:Tg(this.vol.master)),r(t.sfxBus.gain,i),r(t.sfxVerb.gain,i),r(t.uiBus.gain,i*.9),r(t.musicBus.gain,a),r(t.musicVerb.gain,a)}catch{}}handle(e,t){let n=this.g;if(!n||n.ctx.state!==`running`||e.length===0)return;let r;try{r=n.ctx.currentTime}catch{return}let i=0;for(let t of e)t.type===`poke`&&i++;let a=Math.max(0,i-xg),o=new Set,s=0;for(let i of e){if(i.type===`poke`){if(a>0){a--;continue}}else{let e=i.type===`ability`||i.type===`abilityEnd`?`${i.type}:${i.id}`:i.type;if(o.has(e))continue;o.add(e),i.type===`bossWin`&&(s=.7)}try{this.play(n,i,t,r,s)}catch{}}}play(e,t,n,r,i){let a=n.state,o=ch(a.era,a.boss!==null),s=e.kit,c=e.sfx;switch(t.type){case`poke`:this.poke(e,t,n,r);break;case`haymaker`:this.stopRiser(r),qh(s,c,r,t.charge,t.perfect,o),this.gasp(e,r,r+.06,!0),e.music.duck(r,.55,.35,.9);break;case`chargeStart`:this.stopRiser(r),this.riser=Kh(s,c,r,o);break;case`buyWeapon`:Qh(s,c,r,o);break;case`buyProducer`:$h(s,c,r,o,t.amount);break;case`buyUpgrade`:eg(s,c,r,o);break;case`buyNode`:tg(s,c,r,o);break;case`freakOutStart`:Wh(s,c,r),this.gasp(e,r,r+.02,!0),e.music.duck(r,.3,.6,.6);break;case`freakOutEnd`:Gh(s,c,r,o);break;case`weakSpot`:Uh(s,c,r,o);break;case`weakSpotEnd`:break;case`goldenSpawn`:Yh(s,c,r,o);break;case`goldenCaught`:Xh(s,c,r,o);break;case`goldenMissed`:Zh(s,c,r,o);break;case`ability`:switch(t.id){case`rally`:rg(s,c,r,o);break;case`flurry`:ig(s,c,r);break;case`timewarp`:ag(s,c,r);break;case`singularity`:og(s,c,r,o),e.music.duck(r,.4,.8,1.5)}break;case`abilityEnd`:sg(s,c,r);break;case`gateReady`:cg(s,c,r,o);break;case`bossStart`:lg(s,c,r,o),e.music.duck(r,.5,.5,.8);break;case`bossWin`:ug(s,c,r,o),this.gasp(e,r,r+.05,!0),e.music.duck(r,.6,1.2,1.2);break;case`bossFail`:dg(s,c,r,o),e.music.duck(r,.45,1.6,.8);break;case`eraChange`:fg(s,c,r+i,ch(t.to,!1)),e.music.duck(r,.6,i+1.2,1.2);break;case`achievement`:pg(s,c,r,o);break;case`collapse`:mg(s,c,r,ch(0,!1)),e.music.duck(r,.75,3,2);break;case`denied`:ng(s,c,r)}}poke(e,t,n,r){let i=t.source===`auto`,a=t.crit||t.weak,o=Math.max(r+.004,this.lastPokeAt+(i?.065:.028));if(o>r+.09){if(!a)return;o=r+.004}else this.lastPokeAt=o;let s=this.pokeTimes;for(s.push(o);s.length>0&&o-s[0]>1;)s.shift();let c=1/Math.sqrt(Math.max(1,s.length/4));i&&(c*=.4),c*=.9+Math.random()*.2;let l=0;if(a){let e=this.critTimes;for(e.push(o);e.length>0&&o-e[0]>1;)e.shift();l=(i?.5:1)*Math.max(c/(i?.4:1),.6)/Math.sqrt(Math.max(1,e.length/1.5))}for(this.pokeVoices=this.pokeVoices.filter(e=>e.end>r);this.pokeVoices.length>=bg;)this.pokeVoices.shift()?.kill(r);let u=n.state,d=ch(u.era,u.boss!==null),f=Vh(e.kit,e.sfx,o,{family:y(u.weapon),midi:hh(d,t.streak),gain:c,crit:t.crit,critGain:l,crush:e.crush});this.pokeVoices.push(f),t.weak&&Hh(e.kit,e.sfx,o+.015,d),t.crit&&Math.random()<(i?.12:.4)&&this.gasp(e,r,o+.03,!1)}gasp(e,t,n,r){if(r){if(n-this.lastBigGaspAt<Sg)return;this.lastBigGaspAt=n,this.lastCritGaspAt=n,this.critGasp&&this.critGasp.end>t&&this.critGasp.kill(t),this.critGasp=null,yg(e.kit,e.sfx,n,{big:!0})}else n-this.lastCritGaspAt<Cg||(this.lastCritGaspAt=n,this.critGasp=yg(e.kit,e.sfx,n,{big:!1}))}stopRiser(e){this.riser&&=(this.riser.voice.kill(e),null)}update(e,t){let n=this.g;if(n&&n.ctx.state===`running`)try{let r=n.ctx.currentTime;this.riser&&(!t.state.charge||r>this.riser.end)&&this.stopRiser(r);let i=!this.vol.muted&&this.vol.master>0&&this.vol.music>0;n.music.update(r,e,t,i)}catch{}}ui(e){let t=this.g;if(t&&t.ctx.state===`running`)try{let n=t.ctx.currentTime;if(e===`hover`){if(n-this.lastHoverAt<.045)return;this.lastHoverAt=n}hg(t.kit,t.ui,n,e)}catch{}}suspend(){this.hidden=!0;let e=this.g;if(e)try{e.ctx.suspend().catch(()=>void 0)}catch{}}resume(){this.hidden=!1;let e=this.g;if(e)try{e.ctx.resume().catch(()=>void 0)}catch{}}};function Q(e,t={},...n){let r=document.createElement(e);for(let[e,n]of Object.entries(t))n!=null&&n!==!1&&(e===`class`?r.className=String(n):e===`text`?r.textContent=String(n):e===`html`?r.innerHTML=String(n):e.startsWith(`on`)&&typeof n==`function`?r.addEventListener(e.slice(2).toLowerCase(),n):e===`style`&&typeof n==`object`?Object.assign(r.style,n):r.setAttribute(e,n===!0?``:String(n)));for(let e of n)e!=null&&e!==!1&&r.append(e);return r}var Ag=new WeakMap;function jg(e,t){Ag.get(e)!==t&&(Ag.set(e,t),e.textContent=t)}function Mg(e,t,n){e.classList.contains(t)!==n&&e.classList.toggle(t,n)}var Ng=new WeakMap;function Pg(e,t,n){let r=Ng.get(e);r||Ng.set(e,r=new Map),r.get(t)!==n&&(r.set(t,n),e.style.setProperty(t,n))}function Fg(e,t){e.hidden!==t&&(e.hidden=t)}var Ig=[[`Local emoji still shocked. Experts baffled.`,`Caveman invents the stick. Immediately pokes something with it.`,`Monkey union demands more bananas per poke.`,`Gorillas report “feelings unclear” about rock-throwing.`,`Mammoth spotted watching. Declines to comment.`,`Fire discovered. First use: lighting the emoji better.`],[`Kingdom declares emoji “most startled orb in the realm”.`,`Knights apologise after joust. Do it again anyway.`,`Trebuchet engineers confirm: the counterweight is the point.`,`Royal astrologer predicts “many gasps”. Promoted.`,`Dragon sighted overhead. Too embarrassed to land.`,`Peasants petition for fewer pokes. Petition poked.`],[`Factory output of slaps up 400%. Quality “acceptable”.`,`Steam prodder whistles happily. Nobody knows why.`,`Gatling gun inventor insists it is “for science”.`,`Smog so thick the emoji is now beige.`,`Workers strike. Directly. At the emoji.`,`Top hats now mandatory near the Freakmoji.`],[`Breaking: emoji remains the most shocked object in recorded history.`,`Pentagon budget now 60% Freakmoji-related.`,`Tanks deployed. Emoji gasps louder.`,`Helicopter news crew circles arena, also gasps.`,`Scientists: “It is just a ball with hands.” Scientists poked.`,`Stock market follows gasps-per-second index.`],[`Drone swarm achieves sentience, chooses to keep poking.`,`Neon now legally required within 10 metres of the emoji.`,`Railgun reviews: “Magnets. Lots of magnets. Five stars.”`,`Synthwave sun refuses to set until the gasping stops.`,`Holographic fans line the arena. Holographically shocked.`,`AI asked to calm the Freakmoji. AI also gasps.`],[`Moon hollowed out. Aimed. Nobody asked the moon.`,`Black hole engine runs on doubt. Fuel reserves infinite.`,`Astronomers: the universe is 13.8 billion years old and still surprised.`,`Aliens observe arena. Leave a one-star review.`,`Space is silent. The gasps are not.`,`Saturn requests its rings back.`],[`Reality has stopped returning our calls.`,`Physics department closed until further notice.`,`Local timeline reports déjà vu. Again.`,`Paradox engine retroactively causes this headline.`,`Gravity now optional. Gasps still mandatory.`,`The fourth wall has been poked. Please stand back.`]],Lg=[`Reminder: the Freakmoji is fine. It is just very, very surprised.`,`Study finds 9 out of 10 emojis would rather not be poked. The tenth is shocked.`,`Golden Freakmoji sightings on the rise. Experts: “Click them.”`,`Weak spots glow. Weak spots know. Hit them.`,`Tip: a full combo makes every poke count double or more.`,`Tip: hold Haymaker and let go in the gold zone for a PERFECT.`],Rg=class{root;value;unit;gpsRate;pokeRate;eraNum;eraName;goal;gateBar;meters;comboBar;comboVal;freakBar;freakVal;freakLabel;abilityEls=new Map;gate;gateName;gateTaunt;bossbar;bossName;bossTaunt;bossFill;bossTimer;ticker;muteBtn;displayed=0;lastTarget=0;bumpTimer=0;tickerTimer=0;tickerIndex=0;slowTimer=0;lastGoal=``;constructor(e){this.value=Q(`div`,{class:`counter-value`,text:`0`}),this.unit=Q(`div`,{class:`counter-unit`,text:`gasps`}),this.gpsRate=Q(`b`,{text:`0`}),this.pokeRate=Q(`b`,{text:`1`});let t=Q(`div`,{class:`counter`,"aria-live":`off`},this.value,this.unit,Q(`div`,{class:`counter-rates`},Q(`span`,{class:`rate`,title:`Gasps per second from minions`},this.gpsRate,` per second`),Q(`span`,{class:`rate`,title:`Gasps per poke`},this.pokeRate,` per poke`)));this.eraNum=Q(`span`,{class:`era-numeral`,text:`I`}),this.eraName=Q(`span`,{class:`era-name`,text:``}),this.goal=Q(`div`,{class:`goal`}),this.gateBar=Q(`i`);let n=Q(`div`,{class:`era-badge`},Q(`div`,{class:`era-line`},this.eraNum,this.eraName),Q(`div`,{class:`bar`,role:`progressbar`,"aria-label":`Progress to the next era`},this.gateBar),this.goal);this.muteBtn=Q(`button`,{class:`key icon-key`,"aria-label":`Mute sound`,title:`Mute (M)`,onclick:()=>e.toggleMute()},`🔊`);let r=Q(`div`,{class:`utility`},this.muteBtn,Q(`button`,{class:`key icon-key`,"aria-label":`Settings`,title:`Settings`,onclick:()=>e.openSettings()},`⚙️`));this.comboBar=Q(`i`),this.comboVal=Q(`span`,{class:`val`,text:`×1`}),this.freakBar=Q(`i`),this.freakVal=Q(`span`,{class:`val`,text:`0%`}),this.freakLabel=Q(`span`,{text:`Freak-O-Meter`}),this.meters=Q(`div`,{class:`meters`},Q(`div`,{class:`meter-row combo`},Q(`span`,{text:`Combo`}),Q(`div`,{class:`bar`},this.comboBar),this.comboVal),Q(`div`,{class:`meter-row freak`},this.freakLabel,Q(`div`,{class:`bar`},this.freakBar),this.freakVal));let i=Q(`div`,{class:`hotbar`,role:`toolbar`,"aria-label":`Abilities`});for(let t of k){let n=Q(`span`,{class:`cd`}),r=Q(`span`,{class:`cd-text`}),a=Q(`button`,{class:`key ability hidden`,"aria-label":`${t.name} (key ${t.key})`,title:t.name},Q(`span`,{class:`charge`}),Q(`span`,{class:`perfect-zone`}),Q(`span`,{"aria-hidden":`true`,text:t.icon}),Q(`span`,{class:`hotkey`,text:t.key}),n,r);a.addEventListener(`pointerdown`,n=>{n.preventDefault(),a.setPointerCapture(n.pointerId),e.abilityDown(t.id)}),a.addEventListener(`pointerup`,()=>e.abilityUp(t.id)),a.addEventListener(`pointercancel`,()=>e.abilityUp(t.id)),a.addEventListener(`keydown`,n=>{(n.key===`Enter`||n.key===` `)&&!n.repeat&&(n.preventDefault(),n.stopPropagation(),e.abilityDown(t.id))}),a.addEventListener(`keyup`,n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),n.stopPropagation(),e.abilityUp(t.id))}),this.abilityEls.set(t.id,{el:a,cd:n,cdText:r}),i.append(a)}this.gateName=Q(`span`),this.gateTaunt=Q(`small`),this.gate=Q(`button`,{class:`key pink gate`,hidden:!0,onclick:()=>e.challengeBoss()},this.gateName,this.gateTaunt),this.bossName=Q(`div`,{class:`boss-name`}),this.bossTaunt=Q(`div`,{class:`boss-taunt`}),this.bossFill=Q(`i`),this.bossTimer=Q(`div`,{class:`boss-timer`}),this.bossbar=Q(`div`,{class:`bossbar`,hidden:!0,role:`status`},this.bossName,this.bossTaunt,Q(`div`,{class:`bar`},this.bossFill),this.bossTimer),this.ticker=Q(`div`,{class:`ticker`,"aria-hidden":`true`}),this.root=Q(`div`,{class:`hud`},t,n,r,this.meters,this.bossbar,this.gate,i,this.ticker)}setMuted(e){jg(this.muteBtn,e?`🔇`:`🔊`),this.muteBtn.setAttribute(`aria-label`,e?`Unmute sound`:`Mute sound`)}flashAbility(e){let t=this.abilityEls.get(e);t&&(t.el.classList.add(`pressed`),setTimeout(()=>t.el.classList.remove(`pressed`),110))}update(e,t){let n=t.state,r=n.gasps;r>this.lastTarget+1e-9&&(this.bumpTimer=.09),this.lastTarget=r;let i=r-this.displayed;this.displayed=Math.abs(i)<1||i<0?r:this.displayed+i*(1-Math.exp(-14*e)),jg(this.value,R(this.displayed)),this.bumpTimer-=e,Mg(this.value,`bump`,this.bumpTimer>0);let a=t.mods,o=t.liveStreak,l=Ee(n);this.comboBar.style.width=`${Math.min(1,o/a.comboCap)*100}%`,jg(this.comboVal,`×${we(o,a).toFixed(2)}`);let u=l?Math.max(0,(n.freakOutEnd-n.time)/a.freakOutDuration):n.freakMeter;this.freakBar.style.width=`${Math.min(1,u)*100}%`,jg(this.freakVal,l?`${Math.ceil(n.freakOutEnd-n.time)}s`:`${Math.floor(n.freakMeter*100)}%`),jg(this.freakLabel,l?`FREAK OUT!`:`Freak-O-Meter`),Mg(this.meters,`freaking`,l);for(let e of k){let r=this.abilityEls.get(e.id),i=t.abilityUnlocked(e.id);if(Mg(r.el,`hidden`,!i),!i)continue;let a=t.abilityCooldownLeft(e.id),o=t.abilityCooldownTotal(e.id),s=t.abilityActiveLeft(e.id)>0,c=e.id===`haymaker`&&!!n.charge;Pg(r.cd,`--cd`,`${a>0?a/o*100:0}%`),jg(r.cdText,a>0?_t(a):``),Mg(r.el,`ready`,a<=0&&!c),Mg(r.el,`active`,s),Mg(r.el,`charging`,c),c&&Pg(r.el,`--charge`,`${Math.min(2,n.time-n.charge.startedAt)/2*100}%`)}let d=n.boss;if(Fg(this.bossbar,!d),d){let e=d.final?c:s[d.era].boss;jg(this.bossName,e.name),jg(this.bossTaunt,e.taunt),this.bossFill.style.width=`${Math.max(0,d.hp/d.maxHp)*100}%`,jg(this.bossTimer,`${R(Math.max(0,d.hp))} composure left · ${Math.max(0,d.end-n.time).toFixed(1)}s`)}this.slowTimer-=e,this.slowTimer<=0&&(this.slowTimer=.12,this.slowUpdate(t)),this.tickerTimer-=e,this.tickerTimer<=0&&this.rotateTicker(n.era)}slowUpdate(e){let t=e.state,n=e.gps>e.gpsBase*1.01;jg(this.gpsRate,gt(e.gps)),Mg(this.gpsRate.parentElement,`buffed`,n),jg(this.pokeRate,R(e.pokeValue,!0)),jg(this.unit,t.gasps===1?`gasp`:`gasps`);let r=s[t.era];jg(this.eraNum,r.numeral),jg(this.eraName,r.name);let i=e.nextGateThreshold(),a=r.threshold,o=1;i!==null&&(o=Math.min(1,Math.max(0,Math.log10(Math.max(1,t.runGasps)/Math.max(1,a))/Math.log10(i/Math.max(1,a))))),i!==null&&a<=0&&(o=Math.min(1,t.runGasps/i)),this.gateBar.style.width=`${o*100}%`;let c=this.goalText(e);c!==this.lastGoal&&(this.lastGoal=c,this.goal.innerHTML=c);let l=e.gateBoss();Fg(this.gate,!l||!!t.boss),l&&(jg(this.gateName,`Challenge ${l.name}`),jg(this.gateTaunt,`${l.taunt} Out-gasp ${R(l.hp)} in ${l.duration}s. (B)`))}goalText(e){let t=e.state;if(t.boss)return`Shatter its composure before the timer runs out!`;let n=e.gateBoss();if(n)return`<strong>${n.name}</strong> blocks the way to ${n.final?`breaking reality`:`Era ${s[t.era+1].numeral}`}.`;if(t.time<t.bossRetryAt)return`Regroup: you can retry in ${Math.ceil(t.bossRetryAt-t.time)}s. Buy upgrades meanwhile.`;if(t.victory)return`Reality is broken. Collapse the timeline to go even further.`;let r=e.nextGateThreshold();if(t.runGasps<15&&t.stats.clicks<10)return`<strong>Poke the Freakmoji</strong> to make it gasp.`;let i=e.nextWeapon();if(i>=0&&e.weaponUnlocked(i)&&t.gasps<xe(i,e.mods)&&t.runGasps<400)return`Next weapon: <strong>${_[i].emoji} ${_[i].name}</strong> at ${R(xe(i,e.mods))} gasps.`;if(r!==null){let e=t.era<s.length-1?`Era ${s[t.era+1].numeral}`:`the final boss`;return`Earn <strong>${R(Math.max(0,r-t.runGasps))}</strong> more to reach ${e}.`}return``}rotateTicker(e){this.tickerTimer=9;let t=[...Ig[e],...Lg];this.tickerIndex=(this.tickerIndex+1+Math.floor(Math.random()*(t.length-1)))%t.length,this.ticker.style.opacity=`0`,setTimeout(()=>{this.ticker.innerHTML=``,this.ticker.append(Q(`b`,{text:`FNN`}),t[this.tickerIndex]),this.ticker.style.opacity=`1`},380)}},zg=[{id:`arsenal`,icon:`⚔️`,label:`Arsenal`},{id:`minions`,icon:`🐒`,label:`Minions`},{id:`upgrades`,icon:`✨`,label:`Upgrades`},{id:`paranoia`,icon:`🫣`,label:`Paranoia`},{id:`feats`,icon:`🏆`,label:`Feats`},{id:`stats`,icon:`📊`,label:`Stats`}],Bg={minion:`#ffc61a`,click:`#ff9b4a`,crit:`#ff5a5a`,combo:`#7affd8`,meter:`#ff4fa3`,weak:`#ff7ab8`,golden:`#ffe08a`,synergy:`#7fb2ff`,global:`#c79aff`,ability:`#3af0ff`},Vg=class{el=Q(`div`,{class:`tooltip`,role:`tooltip`});name=Q(`div`,{class:`tt-name`});desc=Q(`div`);cost=Q(`div`,{class:`tt-cost`});constructor(){this.el.append(this.name,this.desc,this.cost),document.body.append(this.el)}show(e,t){jg(this.name,t.name),jg(this.desc,t.desc),jg(this.cost,t.cost??``),this.cost.hidden=!t.cost,Mg(this.cost,`no`,t.ok===!1);let n=e.getBoundingClientRect(),r=n.left+n.width/2-130;r=Math.max(8,Math.min(innerWidth-260-8,r)),this.el.style.left=`${r}px`,this.el.classList.add(`show`);let i=this.el.offsetHeight,a=n.top-i-10>8?n.top-i-10:n.bottom+10;this.el.style.top=`${a}px`}hide(){this.el.classList.remove(`show`)}},Hg=class{root;body;tabBtns=new Map;dots=new Map;active=`arsenal`;signature=``;game;cb;tooltip=new Vg;buyAmount=1;confirmCollapse=!1;respec=!1;refreshers=[];coarse=typeof matchMedia==`function`&&matchMedia(`(pointer: coarse)`).matches;armed=null;seenUpgrades=0;constructor(e,t){this.game=e,this.cb=t;let n=Q(`div`,{class:`tabs`,role:`tablist`,"aria-label":`Shop`});for(let e of zg){let t=Q(`span`,{class:`dot`,hidden:!0}),r=Q(`button`,{class:`key tab`,role:`tab`,id:`tab-${e.id}`,"aria-selected":`false`,"aria-controls":`tab-body`,onclick:()=>this.select(e.id)},Q(`span`,{class:`ti`,"aria-hidden":`true`,text:e.icon}),e.label,t);this.tabBtns.set(e.id,r),this.dots.set(e.id,t),n.append(r)}this.body=Q(`div`,{class:`tab-body`,id:`tab-body`,role:`tabpanel`}),this.root=Q(`aside`,{class:`panel`,"aria-label":`Shop and progress`},n,this.body),this.body.addEventListener(`scroll`,()=>this.tooltip.hide(),{passive:!0}),this.select(`arsenal`,!0)}select(e,t=!1){this.active=e;for(let[t,n]of this.tabBtns)n.setAttribute(`aria-selected`,String(t===e));e===`upgrades`&&(this.seenUpgrades=this.availableUpgrades().length),this.signature=``,this.confirmCollapse=!1,this.tooltip.hide(),t||this.cb.sound(`tab`),this.update()}tipHandlers(e,t,n){e.addEventListener(`pointerenter`,n=>{n.pointerType===`mouse`&&this.tooltip.show(e,t())}),e.addEventListener(`pointerleave`,()=>this.tooltip.hide()),e.addEventListener(`focus`,()=>this.tooltip.show(e,t())),e.addEventListener(`blur`,()=>this.tooltip.hide()),n&&e.addEventListener(`click`,()=>{this.coarse&&this.armed!==e?(this.armed=e,this.tooltip.show(e,t())):(this.armed=null,n(),this.tooltip.show(e,t()))})}visibleTabs(){let e=this.game.state,t=new Set([`arsenal`,`minions`,`upgrades`,`feats`,`stats`]);return(e.era>=3||e.timelines>0||e.paranoia>0)&&t.add(`paranoia`),t}availableUpgrades(){let e=this.game.state;return ie.filter(t=>!e.upgrades[t.id]&&t.req(e)).sort((e,t)=>e.cost-t.cost)}computeSignature(){let e=this.game,t=e.state;switch(this.active){case`arsenal`:return`a${t.weapon}|${t.era}`;case`minions`:return`m${t.era}|${this.buyAmount}`;case`upgrades`:return`u${this.availableUpgrades().map(e=>e.id).join(`,`)}|${Object.keys(t.upgrades).length}`;case`paranoia`:return`p${Object.keys(t.nodes).join(`,`)}|${t.timelines}|${this.confirmCollapse}|${e.canCollapse()}|${this.respec}`;case`feats`:return`f${Object.keys(t.achievements).length}`;case`stats`:return`s${t.records.length}|${t.timelines}`}}update(){let e=this.visibleTabs();for(let[t,n]of this.tabBtns)n.hidden=!e.has(t);let t=this.game.state,n=this.availableUpgrades(),r=n.some(e=>e.cost<=t.gasps);this.dots.get(`upgrades`).hidden=!(r&&this.active!==`upgrades`&&n.length>this.seenUpgrades-1),this.dots.get(`paranoia`).hidden=!(this.game.canCollapse()&&this.active!==`paranoia`),this.active===`upgrades`&&(this.seenUpgrades=n.length);let i=this.computeSignature();i!==this.signature&&(this.signature=i,this.rebuild());for(let e of this.refreshers)e()}rebuild(){let e=this.body.scrollTop;switch(this.body.innerHTML=``,this.refreshers=[],this.tooltip.hide(),this.active){case`arsenal`:this.buildArsenal();break;case`minions`:this.buildMinions();break;case`upgrades`:this.buildUpgrades();break;case`paranoia`:this.buildParanoia();break;case`feats`:this.buildFeats();break;case`stats`:this.buildStats()}this.body.scrollTop=e}buildArsenal(){let e=this.game,t=e.state,n=e.nextWeapon(),r=t.weapon>=0?_[t.weapon]:null;if(this.body.append(Q(`p`,{class:`hint`,text:r?`Equipped: ${r.emoji} ${r.name}. Each tier hits harder and changes how your pokes land.`:`You are poking with one bare finger. Buy a weapon to hit harder.`})),n>=0){let r=_[n],i=e.weaponUnlocked(n),a=Q(`span`),o=Q(`button`,{class:`key row featured`,onclick:()=>e.buyWeapon()},Q(`span`,{class:`emoji`,text:i?r.emoji:`🔒`}),Q(`span`,{},Q(`div`,{class:`name`,text:i?r.name:`???`}),Q(`div`,{class:`sub`,text:i?`Base poke ${R(t.weapon>=0?_[t.weapon].damage:1)} → ${R(r.damage)}`:`Unlocks in Era ${s[r.era].numeral}: ${s[r.era].name}`}),i?Q(`div`,{class:`flavor`,text:r.flavor}):null),Q(`div`,{class:`buyline`},Q(`span`,{text:i?`Buy and equip`:`Locked`}),a));this.body.append(o),this.refreshers.push(()=>{let r=xe(n,e.mods),s=i&&t.gasps>=r;jg(a,i?`${R(r)} gasps`:``),Mg(o,`affordable`,s),Mg(o,`unaffordable`,!s),Mg(o,`locked`,!i)})}else this.body.append(Q(`p`,{class:`hint`,text:`You own every weapon in existence. The Freakmoji is aware.`}));let i=Q(`div`,{class:`arsenal-strip`});_.forEach(e=>{let n=e.index<=t.weapon,r=n||e.era<=t.era,a=Q(`span`,{class:`${n?``:`locked`} ${e.index===t.weapon?`current`:``}`,text:r?e.emoji:`?`,tabindex:`0`,"aria-label":r?e.name:`Unknown weapon`});this.tipHandlers(a,()=>({name:r?`${e.emoji} ${e.name}`:`???`,desc:r?`${e.flavor} Base poke ${R(e.damage)}.`:`A weapon from Era ${s[e.era].numeral}.`})),i.append(a)}),this.body.append(Q(`div`,{class:`section-title`},Q(`span`,{text:`Weapons owned: ${t.weapon+1} of ${_.length}`})),i)}buildMinions(){let e=this.game,t=e.state,n=Q(`div`,{class:`seg`,role:`group`,"aria-label":`Buy amount`});for(let e of[1,10,100,`max`])n.append(Q(`button`,{class:`key`,"aria-pressed":String(this.buyAmount===e),onclick:()=>{this.buyAmount=e,this.cb.sound(`toggle`),this.update()}},e===`max`?`Max`:`×${e}`));this.body.append(Q(`div`,{class:`section-title`},Q(`span`,{text:`Minions poke for you, forever`}),n));let r=u.filter(e=>e.era<=t.era),i=u.find(e=>e.era>t.era);r.forEach(n=>{let r=u.indexOf(n),i=Q(`span`,{class:`owned`}),a=Q(`div`,{class:`sub`}),o=Q(`div`,{class:`price`}),s=Q(`button`,{class:`key row`,onclick:()=>e.buyProducer(n.id,this.buyAmount)},Q(`span`,{class:`emoji`,text:n.emoji}),Q(`span`,{},Q(`div`,{class:`name`,text:n.name}),a),Q(`span`,{},i,o));this.tipHandlers(s,()=>({name:`${n.emoji} ${n.name}`,desc:n.flavor})),this.body.append(s),this.refreshers.push(()=>{let c=t.producers[n.id]??0,l=this.buyAmount===`max`?Math.max(1,be(n,c,e.mods,t.gasps)):this.buyAmount,u=e.producerPrice(n.id,l),d=n.baseGps*e.mods.producerMult[r]*e.mods.gpsMult*e.mods.globalMult,f=Se(t,e.mods,r);jg(i,String(c)),jg(a,c>0?`${gt(d)}/s each · ${gt(f)}/s total (${vt(e.gpsBase>0?f/e.gpsBase:0)})`:`+${gt(d)}/s each`),o.innerHTML=``,o.append(`${R(u)}`,Q(`small`,{text:l>1?`for ${l}`:`gasps`}));let p=t.gasps>=u;Mg(s,`affordable`,p),Mg(s,`unaffordable`,!p),s.style.display=c>0||t.runGasps>=n.baseCost*.3||r===0?``:`none`})}),i&&this.body.append(Q(`div`,{class:`key row teaser`,"aria-disabled":`true`},Q(`span`,{class:`emoji`,text:i.emoji}),Q(`span`,{},Q(`div`,{class:`name`,text:`???`}),Q(`div`,{class:`sub`,text:`Arrives in Era ${s[i.era].numeral}`})),Q(`span`)))}buildUpgrades(){let e=this.game,t=e.state,n=this.availableUpgrades();this.body.append(Q(`div`,{class:`section-title`},Q(`span`,{text:n.length?`Available (${n.length})`:`Nothing to buy yet`}))),n.length||this.body.append(Q(`p`,{class:`hint`,text:`Upgrades appear as you poke, buy minions and reach new eras.`}));let r=Q(`div`,{class:`grid`});for(let i of n){let n=Q(`button`,{class:`key tile`,"aria-label":`${i.name}: ${i.desc}`},Q(`span`,{"aria-hidden":`true`,text:i.icon}),Q(`span`,{class:`kind`,style:{background:Bg[i.kind]}}));this.tipHandlers(n,()=>({name:i.name,desc:i.desc,cost:`${R(i.cost)} gasps`,ok:t.gasps>=i.cost}),()=>{e.buyUpgrade(i.id)&&this.tooltip.hide()}),r.append(n),this.refreshers.push(()=>Mg(n,`affordable`,t.gasps>=i.cost))}this.body.append(r);let i=ie.filter(e=>t.upgrades[e.id]);if(i.length){this.body.append(Q(`div`,{class:`section-title`},Q(`span`,{text:`Owned (${i.length})`})));let e=Q(`div`,{class:`grid`});for(let t of i){let n=Q(`button`,{class:`key tile owned`,"aria-label":`${t.name} (owned)`},Q(`span`,{"aria-hidden":`true`,text:t.icon}));this.tipHandlers(n,()=>({name:t.name,desc:t.desc,cost:`Owned`})),e.append(n)}this.body.append(e)}}buildParanoia(){let e=this.game,t=e.state,n=Q(`span`),r=Q(`div`,{class:`big`}),i=Q(`p`),a=Q(`p`),o=Q(`div`,{class:`prestige-card`},Q(`div`,{class:`section-title`,style:{margin:`0 0 6px`}},Q(`span`,{text:`Paranoia`})),r,i);this.body.append(o),this.refreshers.push(()=>{jg(r,`${R(t.paranoia)} 🫣`),jg(i,`Each unspent point adds +${oe*100}% to all gasps, tapering after 250 (now +${R(se(t.paranoia)*100)}%). Spending points buys permanent fears below; you can only get them back when you collapse.`)});let c=Q(`div`,{class:`collapse-actions`}),l=e.canCollapse();if(l)this.confirmCollapse?c.append(Q(`button`,{class:`key pink`,onclick:()=>{this.confirmCollapse=!1,this.cb.collapse(this.respec)}},`Yes, collapse it`),Q(`button`,{class:`key`,onclick:()=>{this.confirmCollapse=!1,this.cb.sound(`close`),this.update()}},`Keep playing`)):c.append(Q(`button`,{class:`key pink`,onclick:()=>{this.confirmCollapse=!0,this.cb.sound(`open`),this.update()}},`Collapse timeline…`));else{let e=t.era<3&&!t.victory?`Reach Era IV (${s[3].name}) to collapse a timeline.`:`Earn more gasps to gain at least 1 Paranoia.`;c.append(Q(`p`,{text:e}))}let u=Q(`input`,{type:`checkbox`,id:`respec`});u.checked=this.respec,u.addEventListener(`change`,()=>{this.respec=u.checked});let d=Q(`div`,{class:`prestige-card`,style:{marginTop:`10px`}},Q(`div`,{class:`section-title`,style:{margin:`0 0 6px`}},Q(`span`,{text:`Collapse the timeline`}),n),Q(`p`,{text:`Reset this timeline (gasps, minions, weapons, upgrades, era) for Paranoia. Feats, stats and Paranoia fears are kept.`}),a,c,l?Q(`label`,{class:`check`},u,`Refund all fears on collapse (respec)`):null);this.body.append(d),this.refreshers.push(()=>{let e=L(t);jg(n,e>0?`+${R(e)} 🫣`:``),jg(a,`Next point at ${R(Oe(t))} lifetime gasps (now ${R(t.lifetimeGasps)}).`)}),this.body.append(Q(`div`,{class:`section-title`},Q(`span`,{text:`Fears (permanent)`})));let f=(n,r=``)=>{let i=Q(`button`,{class:`key node ${r}`,"aria-label":`${n.name}: ${n.desc}`},Q(`span`,{class:`ni`,"aria-hidden":`true`,text:n.icon}),Q(`span`,{class:`nn`,text:n.name}),Q(`span`,{class:`nc`,text:t.nodes[n.id]?`Owned`:`${n.cost} 🫣`}));return this.tipHandlers(i,()=>({name:n.name,desc:n.desc,cost:t.nodes[n.id]?`Owned`:`${n.cost} Paranoia`,ok:t.paranoia>=n.cost}),()=>{e.buyNode(n.id)?this.update():this.cb.sound(`deny`)}),this.refreshers.push(()=>{let e=!!t.nodes[n.id],r=ke(t,n.id);Mg(i,`owned`,e),Mg(i,`available`,r),Mg(i,`affordable`,r&&t.paranoia>=n.cost),Mg(i,`locked`,!e&&!r)}),i};this.body.append(f(le.dejavu,`root`));let p=Q(`div`,{class:`tree`});for(let[e,t,n]of[[`twitchy`,`Twitchy`,`active play`],[`brooding`,`Brooding`,`idle play`],[`unhinged`,`Unhinged`,`luck & abilities`]]){let r=Q(`div`,{class:`tree-col`},Q(`h4`,{},t,Q(`span`,{text:n})));ce.filter(t=>t.branch===e).forEach(e=>r.append(f(e))),p.append(r)}this.body.append(p,f(le.cap_dread,`capstone`))}buildFeats(){let e=this.game.state,t=me.filter(t=>e.achievements[t.id]).length;this.body.append(Q(`div`,{class:`section-title`},Q(`span`,{text:`${t} of ${me.length} unlocked · +${Math.round(t*ue*100)}% gasps`})));let n=[...me].sort((t,n)=>Number(!!e.achievements[n.id])-Number(!!e.achievements[t.id]));for(let t of n){let n=!!e.achievements[t.id],r=t.secret&&!n;this.body.append(Q(`div`,{class:`feat ${n?``:`locked`}`},Q(`span`,{class:`fi`,"aria-hidden":`true`,text:r?`❔`:t.icon}),Q(`span`,{},Q(`div`,{class:`fn`,text:r?`Secret feat`:t.name}),Q(`div`,{class:`fd`,text:r?`Keep messing with the Freakmoji.`:t.desc}))))}}buildStats(){let e=this.game,t=e.state,n=Q(`dl`,{class:`stats`}),r=[[`Gasps this timeline`,()=>R(t.runGasps)],[`Gasps, all time`,()=>R(t.lifetimeGasps)],[`Production`,()=>`${gt(e.gpsBase)}/s`],[`Pokes`,()=>R(t.stats.clicks)],[`Critical pokes`,()=>R(t.stats.crits)],[`Weak spots hit`,()=>R(t.stats.weakHits)],[`Best combo`,()=>R(t.stats.bestCombo)],[`Biggest single hit`,()=>R(t.stats.biggestHit)],[`Freak Outs`,()=>R(t.stats.freakOuts)],[`Golden Freakmojis caught`,()=>R(t.stats.goldenCaught)],[`Bosses defeated`,()=>R(t.stats.bossesBeaten)],[`Abilities used`,()=>R(t.stats.abilitiesUsed)],[`Timelines collapsed`,()=>R(t.timelines)],[`This timeline`,()=>_t(t.time)],[`Total play time`,()=>_t(t.totalTime)]];for(let[e,t]of r){let r=Q(`dd`);n.append(Q(`dt`,{text:e}),r),this.refreshers.push(()=>jg(r,t()))}if(this.body.append(Q(`div`,{class:`section-title`},Q(`span`,{text:`Statistics`})),n),this.body.append(Q(`div`,{class:`section-title`},Q(`span`,{text:`Your best timelines`}))),!t.records.length)this.body.append(Q(`p`,{class:`hint`,text:`Collapse a timeline to record it here.`}));else{let e=Q(`table`,{class:`records`},Q(`tr`,{},Q(`th`,{text:`#`}),Q(`th`,{text:`Gasps`}),Q(`th`,{text:`Era`}),Q(`th`,{text:`Time`})));t.records.forEach(t=>e.append(Q(`tr`,{},Q(`td`,{text:String(t.timeline)}),Q(`td`,{text:R(t.gasps)}),Q(`td`,{text:t.victory?`🌌 Broken`:s[t.era].numeral}),Q(`td`,{text:_t(t.duration)})))),this.body.append(e)}if(t.legacyScores.length){this.body.append(Q(`div`,{class:`section-title`},Q(`span`,{text:`Classic Freakmoji Clicker scores`}))),this.body.append(Q(`p`,{class:`hint`,text:`High scores from the original version, saved in this browser only.`}));let e=Q(`table`,{class:`records`},Q(`tr`,{},Q(`th`,{text:`Name`}),Q(`th`,{text:`Score`}),Q(`th`,{text:`Clicks`})));t.legacyScores.forEach(t=>e.append(Q(`tr`,{},Q(`td`,{text:t.name}),Q(`td`,{text:R(t.score)}),Q(`td`,{text:R(t.clicks)})))),this.body.append(e)}this.body.append(Q(`p`,{class:`hint`,text:`Progress is saved in this browser. Use Settings to export a backup.`}))}};function Ug(e,t){let n=e.offline&&e.offline.gained>0?Q(`div`,{class:`away`},`While you were away, your minions kept poking:`,Q(`b`,{text:`+${R(e.offline.gained)} gasps`}),Q(`span`,{class:`fineprint`,text:`${_t(e.offline.elapsed)} away, ${_t(e.offline.credited)} counted at ${Math.round(e.offline.efficiency*100)}% efficiency.`})):null,r=e.warning?Q(`div`,{class:`away`,role:`alert`,text:e.warning}):null,i=Q(`button`,{class:`key yellow start`,autofocus:!0},e.returning?`Keep poking`:`Start poking`),a=Q(`div`,{class:`overlay title-screen`,role:`dialog`,"aria-modal":`true`,"aria-label":`Freakmoji Clicker`},Q(`div`,{class:`title-card`},Q(`h1`,{class:`logo`,text:`Freakmoji`}),Q(`div`,{class:`logo-sub`,text:`Clicker: Reality Breach`}),Q(`p`,{class:`tagline`,text:e.returning?`Welcome back. The Freakmoji is still in Era ${s[e.era].numeral}, still shocked.`:`One very startled emoji. Forty weapons. Seven eras. Poke it until reality breaks.`}),r,i,n,Q(`p`,{class:`fineprint`,text:`Click, tap or press Space to poke · 1–5 abilities · sound on for the full effect`})));return i.addEventListener(`click`,()=>{a.remove(),t()}),document.body.append(a),setTimeout(()=>i.focus(),50),a}var Wg=class{root=Q(`div`,{class:`toasts`,"aria-hidden":`true`});push(e,t=``,n=``,r=4200){let i=Q(`div`,{class:`toast ${n}`},Q(`strong`,{text:e}),t);for(this.root.prepend(i);this.root.children.length>3;)this.root.lastElementChild?.remove();setTimeout(()=>{i.classList.add(`out`),setTimeout(()=>i.remove(),320)},r)}},Gg=class{root=Q(`div`,{class:`sr-only`,"aria-live":`polite`,role:`status`});last=0;say(e,t=!1){let n=performance.now();!t&&n-this.last<1500||(this.last=n,this.root.textContent=e)}};function Kg(e,t,n){let r=s[t],i=Q(`div`,{class:`era-card ${n?`static`:``}`,"aria-hidden":`true`},Q(`div`,{class:`num`,text:`Era ${r.numeral}`}),Q(`div`,{class:`title`,text:r.name}),Q(`div`,{class:`tag`,text:r.tagline}));e.append(i),setTimeout(()=>i.remove(),n?2600:3700)}function qg(e,t){let n={...e},r=()=>t.change({...n}),i=(e,t)=>{let i=Q(`input`,{type:`range`,min:`0`,max:`1`,step:`0.05`,id:`set-${t}`,value:String(n[t])});return i.addEventListener(`input`,()=>{n[t]=Number(i.value),r()}),Q(`div`,{class:`field`},Q(`label`,{for:`set-${t}`,text:e}),i)},a=(e,i,a=!1)=>{let o=Q(`button`,{class:`key toggle`}),s=()=>{let e=a?!n[i]:n[i];o.setAttribute(`aria-pressed`,String(e)),o.textContent=e?`On`:`Off`};return o.addEventListener(`click`,()=>{n[i]=!n[i],s(),r(),t.sound(`toggle`)}),s(),Q(`div`,{class:`field`},Q(`label`,{text:e}),o)},o=Q(`select`,{id:`set-quality`},...[`auto`,`high`,`medium`,`low`].map(e=>Q(`option`,{value:e,text:e===`auto`?`Auto (adapts to your device)`:e[0].toUpperCase()+e.slice(1),selected:n.quality===e})));o.addEventListener(`change`,()=>{n.quality=o.value,r()});let s=Q(`select`,{id:`set-notation`},Q(`option`,{value:`suffix`,text:`1.23M, 4.5B`,selected:n.notation===`suffix`}),Q(`option`,{value:`scientific`,text:`1.23e6`,selected:n.notation===`scientific`}));s.addEventListener(`change`,()=>{n.notation=s.value===`scientific`?`scientific`:`suffix`,r()});let c=Q(`textarea`,{class:`save-box`,"aria-label":`Save data`,placeholder:`Paste a save here to import it, or press Export to copy yours.`}),l=Q(`p`,{class:`hint`,"aria-live":`polite`}),u=!1,d=Q(`button`,{class:`key danger`},`Reset everything…`);d.addEventListener(`click`,()=>{u?t.hardReset():(u=!0,d.textContent=`Click again to erase all progress`,l.textContent=`This deletes every timeline, feat and Paranoia point. It cannot be undone.`)});let f=()=>{m.remove(),document.removeEventListener(`keydown`,p),t.sound(`close`)},p=e=>{e.key===`Escape`&&f()},m=Q(`div`,{class:`overlay drawer`,role:`dialog`,"aria-modal":`true`,"aria-labelledby":`settings-title`},Q(`div`,{class:`sheet`},Q(`h2`,{id:`settings-title`},`Settings`,Q(`button`,{class:`key icon-key`,"aria-label":`Close settings`,onclick:f},`✕`)),Q(`div`,{class:`section-title`},Q(`span`,{text:`Sound`})),a(`Sound`,`muted`,!0),i(`Master volume`,`master`),i(`Effects`,`sfx`),i(`Music`,`music`),Q(`div`,{class:`section-title`},Q(`span`,{text:`Visuals & comfort`})),Q(`div`,{class:`field`},Q(`label`,{for:`set-quality`,text:`Graphics quality`}),o),a(`Reduced motion`,`reducedMotion`),a(`Screen flashes`,`flashes`),i(`Screen shake`,`shake`),a(`Floating numbers`,`floaters`),Q(`div`,{class:`field`},Q(`label`,{for:`set-notation`,text:`Big numbers`}),s),Q(`div`,{class:`section-title`},Q(`span`,{text:`Your save`})),Q(`p`,{class:`hint`,text:`The game saves automatically in this browser every few seconds.`}),c,Q(`div`,{class:`btn-row`},Q(`button`,{class:`key`,onclick:async()=>{c.value=t.exportSave(),c.select();try{await navigator.clipboard.writeText(c.value),l.textContent=`Save copied to your clipboard.`}catch{l.textContent=`Save exported below. Copy it somewhere safe.`}}},`Export save`),Q(`button`,{class:`key`,onclick:()=>{l.textContent=t.importSave(c.value)?`Save imported.`:`That doesn’t look like a Freakmoji save. Check you pasted all of it.`}},`Import save`),d),l,Q(`p`,{class:`fineprint`,text:`Freakmoji Clicker: Reality Breach · All sound and art is generated in your browser · MIT licensed`})));m.addEventListener(`click`,e=>{e.target===m&&f()}),document.addEventListener(`keydown`,p),document.body.append(m),t.sound(`open`),m.querySelector(`.sheet button`)?.focus()}var Jg=1/30,Yg=10,Xg=!1,Zg=!0,Qg={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,t)=>{try{localStorage.setItem(e,t)}catch{}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}}},$g=ut();mt($g.notation);var e_=et(Qg),$=new ze(e_.state),t_=null;e_.source!==`new`&&(t_=$.applyOffline(ot(e_.state.lastSeen)),$.drainEvents());var n_=Q(`canvas`,{id:`scene`,"aria-hidden":`true`}),r_=Q(`canvas`,{id:`overlay`,"aria-hidden":`true`}),i_=Q(`button`,{class:`poke-target`,"aria-label":`Poke the Freakmoji (Space)`}),a_=Q(`main`,{class:`stage`,"aria-label":`The arena`},n_,r_,i_),o_=Q(`div`,{id:`app`},a_);document.body.append(o_);var s_=new Wg,c_=new Gg,l_=new kg,u_;try{let e=document.createElement(`canvas`);if(!e.getContext(`webgl2`)&&!e.getContext(`webgl`))throw Error(`no webgl`);u_=new Lm(n_,r_,$.state.era)}catch(e){console.warn(`WebGL unavailable, using 2D fallback`,e),n_.remove(),u_=new zm(a_,r_),s_.push(`Running in simple mode`,`Your browser could not start 3D graphics, so the 2D version is shown.`,`warn`,7e3)}function d_(){mt($g.notation),document.documentElement.classList.toggle(`reduced-motion`,$g.reducedMotion),u_.setQuality($g.quality),u_.setPrefs({shake:$g.shake,reducedMotion:$g.reducedMotion,flashes:$g.flashes}),u_.floaters.enabled=$g.floaters,l_.setVolumes({master:$g.master,sfx:$g.sfx,music:$g.music,muted:$g.muted}),h_.setMuted($g.muted)}var f_=0;function p_(e){l_.unlock(),A_(),e===`haymaker`?$.startCharge()?f_=performance.now():$.abilityUnlocked(e)&&l_.ui(`deny`):!$.activate(e)&&$.abilityUnlocked(e)&&l_.ui(`deny`)}function m_(e){A_(),e===`haymaker`&&$.state.charge&&$.releaseCharge((performance.now()-f_)/1e3)}var h_=new Rg({abilityDown:p_,abilityUp:m_,challengeBoss:()=>{l_.unlock(),$.startBoss()},openSettings:()=>qg($g,{change:e=>{$g=e,dt($g),d_()},exportSave:()=>it($.state),importSave:e=>{let t=at(e);return t?(nt(Qg,t),location.reload(),!0):!1},hardReset:()=>{Xg=!0,rt(Qg),location.reload()},sound:e=>l_.ui(e)}),toggleMute:()=>{$g={...$g,muted:!$g.muted},dt($g),d_(),l_.ui(`toggle`)}}),g_=new Hg($,{sound:e=>l_.ui(e),collapse:e=>{$.collapse(e)>0&&S_()}});a_.append(h_.root,s_.root,c_.root),o_.append(g_.root),d_(),new ResizeObserver(()=>{let e=a_.getBoundingClientRect();u_.resize(e.width,e.height,0)}).observe(a_);var __=!1;function v_(e,t){if(!__)return;A_();let n=u_.pick(e,t);n&&(n.kind===`golden`?$.catchGolden():$.poke({dir:n.dir,region:n.region,source:`pointer`}))}a_.addEventListener(`pointerdown`,e=>{(e.target===n_||e.target===a_||e.target===r_)&&(e.button===0||e.pointerType!==`mouse`)&&e.isTrusted&&(l_.unlock(),v_(e.clientX,e.clientY))}),a_.addEventListener(`pointermove`,e=>u_.pointerMove(e.clientX,e.clientY),{passive:!0}),a_.addEventListener(`contextmenu`,e=>e.preventDefault()),i_.addEventListener(`click`,e=>{e.detail===0&&$.poke({source:`key`})});var y_=e=>e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement;document.addEventListener(`keydown`,e=>{if(!__||y_(e.target)||e.metaKey||e.ctrlKey||e.altKey||document.querySelector(`.overlay`))return;let t=e.target instanceof HTMLButtonElement&&e.target!==i_;if((e.key===` `||e.key===`Enter`)&&!t){e.preventDefault(),A_(),(!e.repeat||e.key===` `)&&$.poke({source:`key`});return}let n=k.find(t=>t.key===e.key);if(n&&!e.repeat){p_(n.id),h_.flashAbility(n.id);return}let r=e.key.toLowerCase();r===`g`&&$.catchGolden()||(r===`b`&&$.startBoss(),r===`m`&&($g={...$g,muted:!$g.muted},dt($g),d_()))}),document.addEventListener(`keyup`,e=>{let t=k.find(t=>t.key===e.key);t&&m_(t.id)});function b_(e){if(e.length){u_.handle(e,$),l_.handle(e,$);for(let t of e)switch(t.type){case`achievement`:{let e=he[t.id];s_.push(`${e.icon} Feat unlocked: ${e.name}`,`${e.desc} (+1% gasps)`,`gold`),c_.say(`Feat unlocked: ${e.name}`);break}case`eraChange`:setTimeout(()=>Kg(a_,t.to,$g.reducedMotion),900),c_.say(`Era ${s[t.to].numeral}: ${s[t.to].name}`,!0),S_();break;case`gateReady`:{let e=t.final?c:s[t.era].boss;s_.push(`⚠️ ${e.name} blocks the way`,`Press the challenge button (or B) when you are ready.`,`warn`),c_.say(`${e.name} is ready to fight. Press B to challenge.`,!0);break}case`bossWin`:t.final?(s_.push(`🌌 Reality: broken`,`You beat The Composed One. Collapse the timeline to push even further.`,`gold`,9e3),c_.say(`Reality broken!`,!0),S_()):c_.say(`Composure shattered!`,!0);break;case`bossFail`:s_.push(`Composure held`,`Build up your gasps per second and try again in 15 seconds.`,`warn`),c_.say(`The boss kept its composure. Try again soon.`,!0);break;case`goldenSpawn`:c_.say(`A golden Freakmoji appeared! Click it or press G.`,!0);break;case`freakOutStart`:c_.say(`Freak out! Pokes are tripled.`);break;case`collapse`:s_.push(`🫣 Timeline ${t.timeline} collapsed`,`+${R(t.gained)} Paranoia. The Freakmoji remembers nothing, except the fear.`,`gold`,7e3),c_.say(`Timeline collapsed. Gained ${t.gained} Paranoia.`,!0),g_.select(`arsenal`,!0);break;case`ability`:c_.say(`${A[t.id].name}!`)}}}var x_=Yg;function S_(){!Xg&&Zg&&nt(Qg,$.state)}addEventListener(`pagehide`,S_),addEventListener(`beforeunload`,S_);var C_=typeof BroadcastChannel==`function`?new BroadcastChannel(`freakmoji`):null,w_=Math.random().toString(36).slice(2);C_&&(C_.onmessage=e=>{e.data?.type===`claim`&&e.data.id!==w_&&Zg&&(S_(),Zg=!1,T_())},C_.postMessage({type:`claim`,id:w_}));function T_(){if(document.querySelector(`.tab-lock`))return;let e=Q(`div`,{class:`overlay tab-lock`,role:`alertdialog`,"aria-modal":`true`},Q(`div`,{class:`title-card`},Q(`h2`,{text:`Freakmoji is open in another tab`}),Q(`p`,{class:`tagline`,text:`Only one tab can play at a time so your progress doesn’t get counted twice.`}),Q(`button`,{class:`key yellow start`,onclick:()=>location.reload()},`Play here instead`)));document.body.append(e)}var E_=0,D_=performance.now(),O_=performance.now(),k_=0;function A_(){let e=performance.now(),t=Math.max(0,(e-O_)/1e3);O_=e,j_(t)}function j_(e){if(__&&Zg){if(e>1)$.update(e),E_=0;else{E_+=e;let t=0;for(;E_>=Jg&&t++<10;)$.update(Jg),E_-=Jg}}}function M_(e){let t=Math.min(Math.max(0,(e-D_)/1e3),1800);D_=e,A_(),b_($.drainEvents());let n=Math.min(t,.1);u_.frame(n,$),h_.update(n,$),l_.update(n,$),k_-=n,k_<=0&&(k_=.15,g_.update()),x_-=t,x_<=0&&(x_=Yg,S_()),requestAnimationFrame(M_)}requestAnimationFrame(M_),setInterval(()=>{document.visibilityState===`hidden`&&(A_(),$.drainEvents())},1e3),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`?(S_(),l_.suspend()):l_.resume()}),Ug({returning:e_.source!==`new`&&$.state.lifetimeGasps>0,offline:t_,warning:e_.warning,era:$.state.era},()=>{l_.unlock(),__=!0,D_=O_=performance.now(),t_&&t_.gained>0&&s_.push(`Welcome back`,`Your minions earned ${R(t_.gained)} gasps while you were away.`,`gold`),c_.say(`Poke the Freakmoji: click it, tap it, or press Space.`,!0),n_.focus?.()}),window.freakmoji={game:$,view:u_,persist:S_,get started(){return __},dev:{gasps(e){$.state.gasps+=e,$.state.runGasps+=e,$.state.lifetimeGasps+=e},era(e){$.state.era=Math.max(0,Math.min(s.length-1,e)),$.refresh(),u_ instanceof Lm&&u_.debugEra($.state.era)},minions(e){for(let t of Object.keys($.state.producers))$.state.producers[t]=e;$.refresh()},weapon(e){$.state.weapon=e,$.refresh()},skip(e){$.update(e)},noSave(){Xg=!0},reset(){Xg=!0,rt(Qg),location.reload()}}};