const gamesDatabase = [
  // PC (Steam)
  {
    id: 1,
    title: "Elden Ring",
    platform: "PC",
    oldPrice: 59.99,
    newPrice: 35.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg",
  },
  {
    id: 2,
    title: "Cyberpunk 2077",
    platform: "PC",
    oldPrice: 59.99,
    newPrice: 22.45,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg",
  },
  {
    id: 3,
    title: "Baldur's Gate 3",
    platform: "PC",
    oldPrice: 59.99,
    newPrice: 48.1,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg",
  },
  {
    id: 4,
    title: "Lethal Company",
    platform: "PC",
    oldPrice: 9.75,
    newPrice: 6.2,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1966720/header.jpg",
  },
  {
    id: 5,
    title: "Palworld",
    platform: "PC",
    oldPrice: 28.99,
    newPrice: 20.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1623730/header.jpg",
  },
  {
    id: 6,
    title: "Counter-Strike 2 Prime",
    platform: "PC",
    oldPrice: 14.99,
    newPrice: 14.2,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg",
  },
  {
    id: 7,
    title: "Terraria",
    platform: "PC",
    oldPrice: 9.99,
    newPrice: 4.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg",
  },
  {
    id: 8,
    title: "Half-Life 2",
    platform: "PC",
    oldPrice: 9.99,
    newPrice: 0.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/220/header.jpg",
  },
  {
    id: 9,
    title: "Portal 2",
    platform: "PC",
    oldPrice: 9.99,
    newPrice: 1.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/header.jpg",
  },
  {
    id: 10,
    title: "Left 4 Dead 2",
    platform: "PC",
    oldPrice: 9.99,
    newPrice: 1.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/550/header.jpg",
  },
  {
    id: 11,
    title: "Rust",
    platform: "PC",
    oldPrice: 39.99,
    newPrice: 20.0,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/252490/header.jpg",
  },
  {
    id: 12,
    title: "DOOM Eternal",
    platform: "PC",
    oldPrice: 39.99,
    newPrice: 9.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/782330/header.jpg",
  },
  {
    id: 13,
    title: "Red Dead Redemption 2",
    platform: "PC",
    oldPrice: 59.99,
    newPrice: 19.79,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg",
  },
  {
    id: 14,
    title: "Garry's Mod",
    platform: "PC",
    oldPrice: 9.99,
    newPrice: 4.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4000/header.jpg",
  },
  {
    id: 15,
    title: "DayZ",
    platform: "PC",
    oldPrice: 44.99,
    newPrice: 22.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/221100/header.jpg",
  },
  {
    id: 16,
    title: "Phasmophobia",
    platform: "PC",
    oldPrice: 13.99,
    newPrice: 9.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/739630/header.jpg",
  },
  {
    id: 17,
    title: "Among Us",
    platform: "PC",
    oldPrice: 3.99,
    newPrice: 1.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/945360/header.jpg",
  },
  {
    id: 18,
    title: "Fall Guys",
    platform: "PC",
    oldPrice: 19.99,
    newPrice: 5.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1097150/header.jpg",
  },
  {
    id: 19,
    title: "Rocket League",
    platform: "PC",
    oldPrice: 19.99,
    newPrice: 5.0,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/252950/header.jpg",
  },
  {
    id: 20,
    title: "Skyrim Special Edition",
    platform: "PC",
    oldPrice: 39.99,
    newPrice: 9.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/header.jpg",
  },
  {
    id: 21,
    title: "Fallout 4",
    platform: "PC",
    oldPrice: 19.99,
    newPrice: 4.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/377160/header.jpg",
  },
  {
    id: 22,
    title: "Mass Effect Legendary",
    platform: "PC",
    oldPrice: 59.99,
    newPrice: 15.0,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1328670/header.jpg",
  },
  {
    id: 23,
    title: "Dead Space Remake",
    platform: "PC",
    oldPrice: 59.99,
    newPrice: 25.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1693980/header.jpg",
  },
  {
    id: 24,
    title: "Resident Evil Village",
    platform: "PC",
    oldPrice: 39.99,
    newPrice: 15.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1196590/header.jpg",
  },
  {
    id: 25,
    title: "Stardew Valley",
    platform: "PC",
    oldPrice: 13.99,
    newPrice: 8.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg",
  },

  // PlayStation (Usamos Steam para los ports, y YouTube para exclusivos puros)
  {
    id: 26,
    title: "Bloodborne",
    platform: "PlayStation",
    oldPrice: 19.99,
    newPrice: 9.99,
    img: "https://img.youtube.com/vi/G203e1HhixY/maxresdefault.jpg",
  }, // YT
  {
    id: 27,
    title: "Uncharted 4",
    platform: "PlayStation",
    oldPrice: 19.99,
    newPrice: 9.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1659420/header.jpg",
  }, // Steam
  {
    id: 28,
    title: "The Last of Us Part II",
    platform: "PlayStation",
    oldPrice: 39.99,
    newPrice: 19.99,
    img: "https://img.youtube.com/vi/qPNiIeKMHrc/maxresdefault.jpg",
  }, // YT
  {
    id: 29,
    title: "Demon's Souls Remake",
    platform: "PlayStation",
    oldPrice: 69.99,
    newPrice: 39.99,
    img: "https://img.youtube.com/vi/jGttlMAQxF0/maxresdefault.jpg",
  }, // YT
  {
    id: 30,
    title: "Ratchet & Clank: Rift Apart",
    platform: "PlayStation",
    oldPrice: 69.99,
    newPrice: 35.0,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1895880/header.jpg",
  }, // Steam
  {
    id: 31,
    title: "Returnal",
    platform: "PlayStation",
    oldPrice: 69.99,
    newPrice: 34.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1649240/header.jpg",
  }, // Steam
  {
    id: 32,
    title: "Final Fantasy VII Remake",
    platform: "PlayStation",
    oldPrice: 59.99,
    newPrice: 20.0,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1462040/header.jpg",
  }, // Steam
  {
    id: 33,
    title: "Persona 5 Royal",
    platform: "PlayStation",
    oldPrice: 59.99,
    newPrice: 29.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1687950/header.jpg",
  }, // Steam
  {
    id: 34,
    title: "Gran Turismo 7",
    platform: "PlayStation",
    oldPrice: 69.99,
    newPrice: 45.0,
    img: "https://img.youtube.com/vi/1tBUsXIkG1A/maxresdefault.jpg",
  }, // YT
  {
    id: 35,
    title: "Horizon Forbidden West",
    platform: "PlayStation",
    oldPrice: 69.99,
    newPrice: 39.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2420110/header.jpg",
  }, // Steam
  {
    id: 36,
    title: "God of War Ragnarök",
    platform: "PlayStation",
    oldPrice: 69.99,
    newPrice: 45.0,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg",
  }, // Steam
  {
    id: 37,
    title: "Spider-Man Remastered",
    platform: "PlayStation",
    oldPrice: 59.99,
    newPrice: 29.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1817070/header.jpg",
  }, // Steam
  {
    id: 38,
    title: "Ghost of Tsushima",
    platform: "PlayStation",
    oldPrice: 59.99,
    newPrice: 39.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg",
  }, // Steam
  {
    id: 39,
    title: "The Last of Us Part I",
    platform: "PlayStation",
    oldPrice: 69.99,
    newPrice: 41.9,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1888930/header.jpg",
  }, // Steam
  {
    id: 40,
    title: "Helldivers 2",
    platform: "PlayStation",
    oldPrice: 39.99,
    newPrice: 31.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2054970/header.jpg",
  }, // Steam
  {
    id: 41,
    title: "Horizon Zero Dawn",
    platform: "PlayStation",
    oldPrice: 49.99,
    newPrice: 15.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1151640/header.jpg",
  }, // Steam
  {
    id: 42,
    title: "Days Gone",
    platform: "PlayStation",
    oldPrice: 39.99,
    newPrice: 15.0,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1259420/header.jpg",
  }, // Steam
  {
    id: 43,
    title: "Detroit: Become Human",
    platform: "PlayStation",
    oldPrice: 29.99,
    newPrice: 14.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222140/header.jpg",
  }, // Steam
  {
    id: 44,
    title: "Shadow of the Colossus",
    platform: "PlayStation",
    oldPrice: 19.99,
    newPrice: 9.99,
    img: "https://img.youtube.com/vi/pdZQ98mWeto/maxresdefault.jpg",
  }, // YT
  {
    id: 45,
    title: "Death Stranding",
    platform: "PlayStation",
    oldPrice: 39.99,
    newPrice: 19.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1850570/header.jpg",
  }, // Steam
  {
    id: 46,
    title: "Uncharted: Lost Legacy",
    platform: "PlayStation",
    oldPrice: 19.99,
    newPrice: 9.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1659420/header.jpg",
  }, // Steam
  {
    id: 47,
    title: "The Last Guardian",
    platform: "PlayStation",
    oldPrice: 19.99,
    newPrice: 9.99,
    img: "https://img.youtube.com/vi/4cNJQwYTgRU/maxresdefault.jpg",
  }, // YT
  {
    id: 48,
    title: "Nioh 2",
    platform: "PlayStation",
    oldPrice: 39.99,
    newPrice: 15.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1325200/header.jpg",
  }, // Steam
  {
    id: 49,
    title: "Until Dawn",
    platform: "PlayStation",
    oldPrice: 19.99,
    newPrice: 9.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2172010/header.jpg",
  }, // Steam
  {
    id: 50,
    title: "Infamous Second Son",
    platform: "PlayStation",
    oldPrice: 19.99,
    newPrice: 9.99,
    img: "https://img.youtube.com/vi/MlNfqPDjcJU/maxresdefault.jpg",
  }, // YT

  // Xbox (Steam)
  {
    id: 51,
    title: "Halo MCC",
    platform: "Xbox",
    oldPrice: 39.99,
    newPrice: 19.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/976730/header.jpg",
  },
  {
    id: 52,
    title: "Forza Motorsport",
    platform: "Xbox",
    oldPrice: 69.99,
    newPrice: 49.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2440510/header.jpg",
  },
  {
    id: 53,
    title: "State of Decay 2",
    platform: "Xbox",
    oldPrice: 29.99,
    newPrice: 14.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086470/header.jpg",
  },
  {
    id: 54,
    title: "Ori and the Blind Forest",
    platform: "Xbox",
    oldPrice: 19.99,
    newPrice: 4.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/261570/header.jpg",
  },
  {
    id: 55,
    title: "Sunset Overdrive",
    platform: "Xbox",
    oldPrice: 19.99,
    newPrice: 4.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/847370/header.jpg",
  },
  {
    id: 56,
    title: "Quantum Break",
    platform: "Xbox",
    oldPrice: 39.99,
    newPrice: 9.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/474960/header.jpg",
  },
  {
    id: 57,
    title: "Microsoft Flight Simulator",
    platform: "Xbox",
    oldPrice: 59.99,
    newPrice: 39.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1250410/header.jpg",
  },
  {
    id: 58,
    title: "Pentiment",
    platform: "Xbox",
    oldPrice: 19.99,
    newPrice: 12.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1205520/header.jpg",
  },
  {
    id: 59,
    title: "Hi-Fi Rush",
    platform: "Xbox",
    oldPrice: 29.99,
    newPrice: 19.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1817230/header.jpg",
  },
  {
    id: 60,
    title: "Grounded",
    platform: "Xbox",
    oldPrice: 39.99,
    newPrice: 25.0,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/962130/header.jpg",
  },
  {
    id: 61,
    title: "Sea of Thieves",
    platform: "Xbox",
    oldPrice: 39.99,
    newPrice: 19.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172620/header.jpg",
  },
  {
    id: 62,
    title: "Fable Anniversary",
    platform: "Xbox",
    oldPrice: 19.99,
    newPrice: 9.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/288470/header.jpg",
  },
  {
    id: 63,
    title: "Gears 5",
    platform: "Xbox",
    oldPrice: 39.99,
    newPrice: 9.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1097840/header.jpg",
  },
  {
    id: 64,
    title: "Bleeding Edge",
    platform: "Xbox",
    oldPrice: 29.99,
    newPrice: 5.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1189840/header.jpg",
  },
  {
    id: 65,
    title: "Ryse: Son of Rome",
    platform: "Xbox",
    oldPrice: 19.99,
    newPrice: 4.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/302510/header.jpg",
  },
  {
    id: 66,
    title: "Killer Instinct",
    platform: "Xbox",
    oldPrice: 39.99,
    newPrice: 15.0,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/577940/header.jpg",
  },
  {
    id: 67,
    title: "Dead Rising 3",
    platform: "Xbox",
    oldPrice: 29.99,
    newPrice: 7.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/265550/header.jpg",
  },
  {
    id: 68,
    title: "ReCore",
    platform: "Xbox",
    oldPrice: 19.99,
    newPrice: 4.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/537450/header.jpg",
  },
  {
    id: 69,
    title: "Forza Horizon 5",
    platform: "Xbox",
    oldPrice: 59.99,
    newPrice: 28.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1551360/header.jpg",
  },
  {
    id: 70,
    title: "Halo Infinite",
    platform: "Xbox",
    oldPrice: 59.99,
    newPrice: 19.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1240440/header.jpg",
  },
  {
    id: 71,
    title: "Starfield",
    platform: "Xbox",
    oldPrice: 69.99,
    newPrice: 35.0,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1716740/header.jpg",
  },
  {
    id: 72,
    title: "Grand Theft Auto V",
    platform: "Xbox",
    oldPrice: 29.99,
    newPrice: 8.95,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg",
  },
  {
    id: 73,
    title: "Ori and the Will of the Wisps",
    platform: "Xbox",
    oldPrice: 29.99,
    newPrice: 9.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1057090/header.jpg",
  },
  {
    id: 74,
    title: "Psychonauts 2",
    platform: "Xbox",
    oldPrice: 59.99,
    newPrice: 15.0,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/607080/header.jpg",
  },
  {
    id: 75,
    title: "Age of Empires IV",
    platform: "Xbox",
    oldPrice: 39.99,
    newPrice: 19.99,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1466860/header.jpg",
  },

  // Nintendo (Todo con YouTube Thumbnails - 100% Antifallos)
  {
    id: 76,
    title: "Zelda: Tears Kingdom",
    platform: "Nintendo",
    oldPrice: 69.99,
    newPrice: 55.0,
    img: "https://img.youtube.com/vi/uHGShqcAHlQ/maxresdefault.jpg",
  },
  {
    id: 77,
    title: "Breath of the Wild",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 39.99,
    img: "https://img.youtube.com/vi/zw47_q9wbBE/maxresdefault.jpg",
  },
  {
    id: 78,
    title: "Super Mario Odyssey",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 35.0,
    img: "https://img.youtube.com/vi/wGQHQc_3ycE/maxresdefault.jpg",
  },
  {
    id: 79,
    title: "Mario Kart 8 Deluxe",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 45.99,
    img: "https://img.youtube.com/vi/tKlRN2YpxRE/maxresdefault.jpg",
  },
  {
    id: 80,
    title: "Animal Crossing: NH",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 39.9,
    img: "https://img.youtube.com/vi/_3YNL0OWio0/maxresdefault.jpg",
  },
  {
    id: 81,
    title: "Splatoon 3",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 45.0,
    img: "https://img.youtube.com/vi/bE8tGf-YfGA/maxresdefault.jpg",
  },
  {
    id: 82,
    title: "Super Smash Bros Ult",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 48.5,
    img: "https://img.youtube.com/vi/WShCN-AYHqA/maxresdefault.jpg",
  },
  {
    id: 83,
    title: "Luigi's Mansion 3",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 39.9,
    img: "https://img.youtube.com/vi/RSGgCfbYrg0/maxresdefault.jpg",
  },
  {
    id: 84,
    title: "Pokémon Scarlet",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 49.99,
    img: "https://img.youtube.com/vi/bedkV-JqYvQ/maxresdefault.jpg",
  },
  {
    id: 85,
    title: "Metroid Dread",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 39.99,
    img: "https://img.youtube.com/vi/8NjEIhehrP4/maxresdefault.jpg",
  },
  {
    id: 86,
    title: "Kirby Forgotten Land",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 45.0,
    img: "https://img.youtube.com/vi/H3LA_VkKEAA/maxresdefault.jpg",
  },
  {
    id: 87,
    title: "Bayonetta 3",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 42.0,
    img: "https://img.youtube.com/vi/xH2TjW5rY_8/maxresdefault.jpg",
  },
  {
    id: 88,
    title: "Fire Emblem Three Houses",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 45.5,
    img: "https://img.youtube.com/vi/rkux5h0PeXo/maxresdefault.jpg",
  },
  {
    id: 89,
    title: "Xenoblade Chronicles 3",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 49.9,
    img: "https://img.youtube.com/vi/t-iSqnc5Tz4/maxresdefault.jpg",
  },
  {
    id: 90,
    title: "Pikmin 4",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 49.99,
    img: "https://img.youtube.com/vi/1_M0UaAmsWc/maxresdefault.jpg",
  },
  {
    id: 91,
    title: "Donkey Kong: TF",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 39.99,
    img: "https://img.youtube.com/vi/mIEnL_Kx6kI/maxresdefault.jpg",
  },
  {
    id: 92,
    title: "Super Mario Maker 2",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 39.9,
    img: "https://img.youtube.com/vi/j5JAdB26u3s/maxresdefault.jpg",
  },
  {
    id: 93,
    title: "Hollow Knight",
    platform: "Nintendo",
    oldPrice: 14.99,
    newPrice: 7.5,
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg",
  },
  {
    id: 94,
    title: "Mario + Rabbids Sparks",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 29.99,
    img: "https://img.youtube.com/vi/w9kXv1l0hAM/maxresdefault.jpg",
  },
  {
    id: 95,
    title: "Astral Chain",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 45.0,
    img: "https://img.youtube.com/vi/vC_p-Kq3Hn8/maxresdefault.jpg",
  },
  {
    id: 96,
    title: "Hyrule Warriors: AoC",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 39.99,
    img: "https://img.youtube.com/vi/2_N1v77H05U/maxresdefault.jpg",
  },
  {
    id: 97,
    title: "Mario Strikers Battle",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 39.9,
    img: "https://img.youtube.com/vi/Y5E4B2lFq3w/maxresdefault.jpg",
  },
  {
    id: 98,
    title: "Yoshi's Crafted World",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 35.0,
    img: "https://img.youtube.com/vi/1x4wQItX6b0/maxresdefault.jpg",
  },
  {
    id: 99,
    title: "Paper Mario: Origami King",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 35.0,
    img: "https://img.youtube.com/vi/n-x4V0D5vrs/maxresdefault.jpg",
  },
  {
    id: 100,
    title: "Advance Wars 1+2 Re-Boot",
    platform: "Nintendo",
    oldPrice: 59.99,
    newPrice: 45.0,
    img: "https://img.youtube.com/vi/uXpS-T2Y5mI/maxresdefault.jpg",
  },
];

// --- SISTEMA DE TOAST NOTIFICATIONS ---
function showToast(message, type = "error") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon =
    type === "error"
      ? '<i class="fas fa-exclamation-triangle" style="color: #ff0044; font-size: 20px;"></i>'
      : '<i class="fas fa-check-circle" style="color: var(--price-green); font-size: 20px;"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- SISTEMA DE SESIONES ---
function getCurrentUser() {
  return localStorage.getItem("memeneba_currentUser");
}

function requireLogin(shouldRedirect = false) {
  if (!getCurrentUser()) {
    showToast("¡Eh, quieto ahí! Tienes que iniciar sesión.", "error");
    if (shouldRedirect) {
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    }
    return false;
  }
  return true;
}

// --- LÓGICA DE DATOS LOCALES ---
function getCart() {
  const user = getCurrentUser();
  return user
    ? JSON.parse(localStorage.getItem(`memeneba_cart_${user}`)) || []
    : [];
}
function setCart(cart) {
  const user = getCurrentUser();
  if (user) {
    localStorage.setItem(`memeneba_cart_${user}`, JSON.stringify(cart));
    updateCartBadge();
  }
}

function getFavorites() {
  const user = getCurrentUser();
  return user
    ? JSON.parse(localStorage.getItem(`memeneba_favs_${user}`)) || []
    : [];
}
function setFavorites(favs) {
  const user = getCurrentUser();
  if (user) localStorage.setItem(`memeneba_favs_${user}`, JSON.stringify(favs));
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = totalItems;
    cartCountEl.classList.add("bump");
    setTimeout(() => cartCountEl.classList.remove("bump"), 300);
  }
}

// --- GLOBALES MODAL ---
let gameToAddToCart = null;
const qtyModal = document.getElementById("qty-modal");
const qtyInput = document.getElementById("qty-input");

// --- DIBUJAR TARJETAS CON PORTADAS REALES Y SEGURO ANTIFALLOS ---
function renderGameCards(gamesToRender, containerElement) {
  containerElement.innerHTML = "";
  const favs = getFavorites();

  if (gamesToRender.length === 0) {
    containerElement.innerHTML =
      '<h3 style="grid-column: 1/-1; text-align: center; padding: 40px; font-size: 24px;">No hay juegos aquí 😢</h3>';
    return;
  }

  gamesToRender.forEach((game) => {
    const discount = Math.round(
      ((game.oldPrice - game.newPrice) / game.oldPrice) * 100,
    );
    let tagClass =
      game.platform === "PC"
        ? "tag-pc"
        : game.platform === "PlayStation"
          ? "tag-playstation"
          : game.platform === "Xbox"
            ? "tag-xbox"
            : "tag-nintendo";
    const heartClass = favs.includes(game.id) ? "liked" : "";
    const bgSize = game.platform === "Nintendo" ? "contain" : "cover";

    const cardHTML = `
            <div class="card scroll-anim visible">
                <div class="card-img" style="position: relative; overflow: hidden; background-color: #1a0b2e; padding: 10px; display: flex; justify-content: space-between; align-items: flex-start; height: 160px;">
                    
                    <img src="${game.img}" 
                         alt="${game.title}"
                         onerror="this.onerror=null; this.src='https://picsum.photos/seed/${game.id}fall/460/215';" 
                         style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: ${bgSize}; opacity: 0.6; z-index: 0; background-color: #222;">
                    
                    <div style="position: relative; z-index: 1; display: flex; justify-content: space-between; width: 100%;">
                        <span class="platform-tag ${tagClass}">${game.platform}</span>
                        <span class="discount-badge">-${discount}%</span>
                    </div>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${game.title}</h3>
                    <div class="card-footer">
                        <div class="card-actions">
                            <button class="action-btn cart-btn" data-id="${game.id}" title="Añadir al carrito"><i class="fas fa-cart-plus"></i></button>
                            <button class="action-btn like-btn ${heartClass}" data-id="${game.id}" title="Me gusta"><i class="fas fa-heart"></i></button>
                        </div>
                        <div class="price-box">
                            <span class="old-price">${game.oldPrice.toFixed(2)}€</span>
                            <span class="new-price">${game.newPrice.toFixed(2)}€</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    containerElement.insertAdjacentHTML("beforeend", cardHTML);
  });
}

// --- EVENTOS DE CLICK EN TARJETAS ---
document.addEventListener("click", (e) => {
  const cartBtn = e.target.closest(".cart-btn");
  const likeBtn = e.target.closest(".like-btn");

  if (cartBtn) {
    if (!requireLogin(false)) return;
    gameToAddToCart = parseInt(cartBtn.dataset.id);
    const gameObj = gamesDatabase.find((g) => g.id === gameToAddToCart);
    document.getElementById("modal-game-title").textContent = gameObj.title;
    qtyInput.value = 1;
    qtyModal.classList.remove("hidden");
  }

  if (likeBtn) {
    if (!requireLogin(false)) return;
    const gameId = parseInt(likeBtn.dataset.id);
    let favs = getFavorites();

    if (favs.includes(gameId)) {
      favs = favs.filter((id) => id !== gameId);
      likeBtn.classList.remove("liked");
      const favGrid = document.getElementById("favorites-grid");
      if (favGrid) setTimeout(() => loadFavoritesPage(), 200);
    } else {
      favs.push(gameId);
      likeBtn.classList.add("liked");
      likeBtn.style.transform = "scale(1.3)";
      setTimeout(() => (likeBtn.style.transform = ""), 200);
    }
    setFavorites(favs);
  }
});

// --- LÓGICA MODAL CARRITO ---
if (qtyModal) {
  document
    .getElementById("qty-plus")
    .addEventListener(
      "click",
      () => (qtyInput.value = parseInt(qtyInput.value) + 1),
    );
  document.getElementById("qty-minus").addEventListener("click", () => {
    if (qtyInput.value > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
  });

  document
    .getElementById("modal-cancel")
    .addEventListener("click", () => qtyModal.classList.add("hidden"));

  document.getElementById("modal-confirm").addEventListener("click", () => {
    const qty = parseInt(qtyInput.value);
    let cart = getCart();
    const existingItemIndex = cart.findIndex(
      (item) => item.id === gameToAddToCart,
    );
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += qty;
    } else {
      cart.push({ id: gameToAddToCart, quantity: qty });
    }
    setCart(cart);
    qtyModal.classList.add("hidden");
    showToast("¡Añadido al carrito con éxito!", "success");
  });
}

// --- FILTROS GLOBALES ---
window.applyFiltersGlobal = function () {
  const searchBar = document.getElementById("search-bar");
  const search = searchBar ? searchBar.value.toLowerCase() : "";

  const homeGrid = document.getElementById("game-grid");
  if (homeGrid) {
    const checkboxes = document.querySelectorAll(".filter-platform");
    const selectedPlatforms = Array.from(checkboxes)
      .filter((c) => c.checked)
      .map((c) => c.value);
    const priceFilter = document.getElementById("price-filter");
    const maxPrice = priceFilter ? parseFloat(priceFilter.value) : 80;

    const filtered = gamesDatabase.filter(
      (g) =>
        selectedPlatforms.includes(g.platform) &&
        g.newPrice <= maxPrice &&
        g.title.toLowerCase().includes(search),
    );
    renderGameCards(filtered, homeGrid);
  }

  const lootGrid = document.getElementById("loot-grid");
  if (lootGrid) {
    const lootGames = gamesDatabase.filter((game) => {
      const discount = Math.round(
        ((game.oldPrice - game.newPrice) / game.oldPrice) * 100,
      );
      return discount >= 40 && game.title.toLowerCase().includes(search);
    });
    renderGameCards(lootGames, lootGrid);
  }
};

// --- INICIALIZACIÓN PRINCIPAL ---
document.addEventListener("DOMContentLoaded", () => {
  // 1. CARGAR HEADER (Sin sombras raras, limpio y puro)
  fetch("components/header.html")
    .then((response) => response.text())
    .then((data) => {
      const headerPlaceholder = document.getElementById("header-placeholder");
      if (headerPlaceholder) headerPlaceholder.innerHTML = data;

      const user = getCurrentUser();
      const accountBtn = document.getElementById("account-btn");

      if (user && accountBtn) {
        accountBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i><span>SALIR</span>`;
        accountBtn.href = "#";
        accountBtn.title = `Sesión iniciada como: ${user}`;
        accountBtn.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("memeneba_currentUser");
          window.location.reload();
        });
      }

      updateCartBadge();
      const searchBar = document.getElementById("search-bar");
      if (searchBar) {
        searchBar.addEventListener("keyup", applyFiltersGlobal);
      }

      document.body.classList.add("page-loaded");
      enableSmoothNavigation();
    });

  // 2. CARGAR FOOTER Y MODAL CHISTES
  fetch("components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footerPlaceholder = document.getElementById("footer-placeholder");
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = data;

        const linkTerms = document.getElementById("link-terms");
        const linkPrivacy = document.getElementById("link-privacy");
        const jokeModal = document.getElementById("joke-modal");
        const jokeTitle = document.getElementById("joke-title");
        const jokeText = document.getElementById("joke-text");
        const jokeClose = document.getElementById("joke-close");

        if (linkTerms && linkPrivacy && jokeModal) {
          linkTerms.addEventListener("click", (e) => {
            e.preventDefault();
            jokeTitle.innerHTML =
              '<i class="fas fa-file-contract"></i> Términos de Risa';
            jokeText.innerHTML =
              "Al usar Memeneba, aceptas <b>cedernos tu alma</b>, tu historial de búsqueda (sí, sabemos lo que miras a las 3 AM) y prometes no jugar Yasuo en el LoL nunca más. <br><br>Ah, y no hacemos devoluciones ni aunque el juego sea un .txt vacío. ¡Gracias por tu dinero!";
            jokeModal.classList.remove("hidden");
          });

          linkPrivacy.addEventListener("click", (e) => {
            e.preventDefault();
            jokeTitle.innerHTML =
              '<i class="fas fa-user-secret"></i> Política de Espionaje';
            jokeText.innerHTML =
              "Tus datos están 100% seguros... de ser <b>vendidos al mejor postor</b>. Compartimos tu info con megacorporaciones, tu vecina la cotilla y con alienígenas.<br><br>Usamos cookies, pero de las que llevan pepitas de chocolate y engordan. Al seguir aquí, nos das permiso para espiarte.";
            jokeModal.classList.remove("hidden");
          });

          jokeClose.addEventListener("click", () => {
            jokeModal.classList.add("hidden");
          });
        }
      }
    });

  // 3. LÓGICA DE PÁGINAS
  const homeGrid = document.getElementById("game-grid");
  if (homeGrid) {
    renderGameCards(gamesDatabase, homeGrid);
    document
      .querySelectorAll(".filter-platform")
      .forEach((cb) => cb.addEventListener("change", applyFiltersGlobal));
    const priceFilter = document.getElementById("price-filter");
    if (priceFilter) {
      priceFilter.addEventListener("input", (e) => {
        document.getElementById("price-display").textContent =
          e.target.value + "€";
        applyFiltersGlobal();
      });
    }
  }

  const favGrid = document.getElementById("favorites-grid");
  if (favGrid) loadFavoritesPage();

  const cartContainer = document.getElementById("cart-items-container");
  if (cartContainer) loadCartPage();

  const lootGrid = document.getElementById("loot-grid");
  if (lootGrid) applyFiltersGlobal();

  // 4. FORMULARIOS DE LOGIN / REGISTRO
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("reg-user").value.trim();
      const pass = document.getElementById("reg-pass").value;
      const users = JSON.parse(localStorage.getItem("memeneba_users")) || [];

      if (users.find((u) => u.username === user)) {
        showToast("Ese nombre ya está pillado. Sé más original.", "error");
        return;
      }
      users.push({ username: user, password: pass });
      localStorage.setItem("memeneba_users", JSON.stringify(users));

      showToast("¡Cuenta creada! Prepárate para iniciar sesión...", "success");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("login-user").value.trim();
      const pass = document.getElementById("login-pass").value;
      const users = JSON.parse(localStorage.getItem("memeneba_users")) || [];
      const foundUser = users.find(
        (u) => u.username === user && u.password === pass,
      );

      if (foundUser) {
        localStorage.setItem("memeneba_currentUser", foundUser.username);
        window.location.href = "index.html";
      } else {
        showToast(
          "Datos incorrectos. ¿Te has olvidado o me estás hackeando?",
          "error",
        );
      }
    });
  }
});

function loadFavoritesPage() {
  if (!requireLogin(true)) {
    document.getElementById("favorites-grid").innerHTML =
      '<h3 style="text-align:center; padding: 40px; width: 100%;">Redirigiendo al login...</h3>';
    return;
  }
  const favs = getFavorites();
  const favoriteGames = gamesDatabase.filter((game) => favs.includes(game.id));
  const favGrid = document.getElementById("favorites-grid");
  if (favGrid) renderGameCards(favoriteGames, favGrid);
}

function loadCartPage() {
  if (!requireLogin(true)) {
    document.getElementById("cart-items-container").innerHTML =
      '<h3 style="text-align:center; padding: 40px;">Redirigiendo al login...</h3>';
    const summary = document.querySelector(".cart-summary");
    if (summary) summary.style.display = "none";
    return;
  }

  const cart = getCart();
  const cartContainer = document.getElementById("cart-items-container");
  const totalPriceEl = document.getElementById("cart-total-price");

  if (!cartContainer || !totalPriceEl) return;
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML =
      '<h3 style="text-align: center;">Tu carrito está más vacío que mi cartera 🥲</h3>';
    totalPriceEl.textContent = "0.00€";
    return;
  }

  cart.forEach((cartItem) => {
    const game = gamesDatabase.find((g) => g.id === cartItem.id);
    if (!game) return;
    const subtotal = game.newPrice * cartItem.quantity;
    total += subtotal;

    const itemHTML = `
            <div class="cart-item">
                <img src="${game.img}" alt="${game.title}" style="object-fit: contain; background: #222;">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${game.title}</h4>
                    <span class="platform-tag" style="background:#000; display:inline-block; margin-top:5px;">${game.platform}</span>
                    <p style="margin: 5px 0;">Cantidad: <strong>${cartItem.quantity}</strong></p>
                </div>
                <div style="text-align: right;">
                    <div class="cart-item-price">${subtotal.toFixed(2)}€</div>
                    <button class="remove-btn" onclick="removeFromCart(${game.id})"><i class="fas fa-trash"></i> Eliminar</button>
                </div>
            </div>
        `;
    cartContainer.insertAdjacentHTML("beforeend", itemHTML);
  });
  totalPriceEl.textContent = total.toFixed(2) + "€";
}

window.removeFromCart = function (id) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== id);
  setCart(cart);
  loadCartPage();
};

function enableSmoothNavigation() {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.getAttribute("href");
      if (targetUrl && targetUrl !== "#" && !targetUrl.startsWith("http")) {
        e.preventDefault();
        document.body.classList.remove("page-loaded");
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 300);
      }
    });
  });
}
