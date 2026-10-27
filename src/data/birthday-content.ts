// Central Content Configuration for Amitesh Mallick's Birthday Website
// All photos and videos map directly to user-provided assets with visually-inspected custom roasts.

export interface PhotoItem {
  id: string;
  src: string;
  fallbackSrc: string;
  caption?: string;
  tag?: string;
}

export interface MemoryItem {
  id: string;
  type: 'photo' | 'video';
  src: string;
  fallbackSrc?: string;
  title: string;
  caption: string;
  punchline?: string;
}

export interface CollegeYear {
  yearId: 'first-year' | 'second-year' | 'third-year' | 'final-year';
  yearNumber: string;
  title: string;
  subtitle: string;
  caption: string;
  memoryText?: string;
  photos: PhotoItem[];
  video?: {
    src: string;
    caption: string;
  };
}

export interface BirthdayContentConfig {
  person: {
    fullName: string;
    nickname: string;
  };
  audio: {
    bgSongSrc: string;
    title: string;
  };
  // Legacy stubs to preserve old components safely
  welcome: {
    title: string;
    subtitle: string;
    supportingText: string;
    buttonText: string;
    image: PhotoItem;
  };
  roast: {
    heading: string;
    subheading: string;
    nextButtonText: string;
    items: PhotoItem[];
    transitionNotice: string;
  };
  comedyReveal: {
    heading: string;
    caption: string;
    image: PhotoItem;
    buttonText: string;
    video?: {
      src: string;
      title: string;
      buttonText: string;
    };
  };
  collegeJourney: {
    sectionTitle: string;
    openingQuote: string;
    years: CollegeYear[];
    emotionalQuote: string;
    nextButtonText: string;
  };
  emptyGiftTwist: {
    stage1: string;
    stage2: string;
    punchline: string;
    supportingText: string;
    nextButtonText: string;
  };
  // SCREEN 1: Scratch Card
  scratch: {
    heading: string;
    supportingText: string;
    helperText: string;
    fallbackButtonText: string;
    image: PhotoItem;
  };
  // SCREEN 2: Special Birthday Cake (Direct post-scratch screen)
  cake: {
    heading: string;
    supportingText: string;
    buttonText: string;
    celebrationTitle: string;
    transitionText: string;
    nextButtonText: string;
  };
  // SCREEN 3: Secret Video (Immediately after Cake)
  secretVideo: {
    heading: string;
    subheading: string;
    src: string;
    buttonText: string;
  };
  // SCREEN 4: One-by-One Memory Experience (No year-wise grouping)
  memories: {
    sectionTitle: string;
    items: MemoryItem[];
    closingHeading: string;
    closingSubtitle: string;
    nextButtonText: string;
  };
  // SCREEN 5: Empty Gift Box Prank
  gift: {
    openingLine: string;
    supportingText: string;
    buttonText: string;
    statusMessages: string[];
    emptyReveal: {
      stage1: string;
      stage2: string;
      punchline: string;
      supportingText: string;
      nextButtonText: string;
    };
  };
  // SCREEN 6: Final Birthday Screen
  finalWish: {
    heading: string;
    message: string;
    collagePhotos: PhotoItem[];
    replayButtonText: string;
  };
}

export const BIRTHDAY_CONTENT: BirthdayContentConfig = {
  person: {
    fullName: "Amitesh Mallick",
    nickname: "Mallick",
  },
  audio: {
    bgSongSrc: "/audio/Khilji Gang Anthem.mp4",
    title: "Khilji Gang Anthem",
  },
  // Legacy stubs
  welcome: {
    title: "WELCOME, MR. MALLICK",
    subtitle: "Your college history has been recovered.",
    supportingText: "Proceed carefully. Some memories may be embarrassing.",
    buttonText: "ENTER AT YOUR OWN RISK",
    image: {
      id: "welcome-hero",
      src: "/images/college/first-year/first-year-01.webp",
      fallbackSrc: "/image1.jpeg",
      caption: "The Man. The Legend. Amitesh Mallick.",
    },
  },
  roast: {
    heading: "THE MALLICK FILES",
    subheading: "Classified archives from 4 years of college mischief",
    nextButtonText: "SHOW ME MORE EVIDENCE",
    transitionNotice: "Wait… something is hidden here.",
    items: [
      {
        id: "roast-1",
        src: "/images/college/first-year/first-year-02.webp",
        fallbackSrc: "/5.jpeg",
        caption: "Innocence level: Suspicious.",
        tag: "FILE #01 • DAY 1 IN CAMPUS",
      },
    ],
  },
  comedyReveal: {
    heading: "LE BHAI, TERE LIYE SPECIAL CAKE AAYA HAI! 🎂",
    caption: "Sharma mat, cake cut kar!",
    buttonText: "CHAL, AAGE DEKHTE HAIN →",
    image: {
      id: "comedy-photo",
      src: "/images/comedy/reveal.webp",
      fallbackSrc: "/scratch.jpeg",
      caption: "Mallick's Special Moment",
    },
  },
  collegeJourney: {
    sectionTitle: "COLLEGE JOURNEY",
    openingQuote: "EVERY LEGEND HAS A BEGINNING…",
    emotionalQuote: "College ke ye din, ye dost aur ye yaadein hamesha special rahengi. ❤️",
    nextButtonText: "CHAL AB, TERE BIRTHDAY SURPRISE KI BAARI! 🎁",
    years: [
      {
        yearId: "first-year",
        yearNumber: "YEAR 01",
        title: "FIRST YEAR",
        subtitle: "Freshers Days",
        caption: "Yahin se shuru hui apni college wali kahani…",
        photos: [
          {
            id: "y1-p1",
            src: "/images/college/first-year/first-year-01.webp",
            fallbackSrc: "/image1.jpeg",
            caption: "Freshers Entry",
          },
        ],
      },
    ],
  },
  emptyGiftTwist: {
    stage1: "AREY YAAR! 😂",
    stage2: "GIFT BOX TOH KHALI NIKLA!",
    punchline: "MANAS BHAI, GIFT ABHI RAASTE MEIN HAI KYA? 😂",
    supportingText: "AMITESH, LAGTA HAI SURPRISE KA EK AUR SURPRISE BAAKI HAI! 🎁",
    nextButtonText: "CHAL AB, BIRTHDAY WISH DEKH! ❤️",
  },
  // SCREEN 1: Scratch Card
  scratch: {
    heading: "OYE LUNDCHAT! TERE LIYE KUCH SPECIAL HAI 🥹",
    supportingText: "Ungli chala bhai, free ka surprise hai! 😂",
    helperText: "Itni mehnat life mein bhi kar leta toh aaj alag scene hota 💀",
    fallbackButtonText: "CHAL, AB ASLI KAND DEKH 😂",
    image: {
      id: "scratch-mystery",
      src: "/images/scratch/scratch-reveal.webp",
      fallbackSrc: "/scratch.jpeg",
      caption: "The Mystery Surprise",
    },
  },
  // SCREEN 2: Special Birthday Cake (Direct post-scratch screen)
  cake: {
    heading: "LE BHAI, TERE LIYE SPECIAL CAKE AAYA HAI! 🎂",
    supportingText: "Aaj tera birthday hai, sharma mat cake cut kar!",
    buttonText: "CHAL, CAKE CUT KARTE HAIN! 🎂",
    celebrationTitle: "HAPPY BIRTHDAY, AMITESH! ❤️",
    transitionText: "Ruk ruk ruk, ab ek khas secret clip dekh 😂🎬",
    nextButtonText: "CHAL, SECRET CLIP DEKH! 🎬",
  },
  // SCREEN 3: Secret Video
  secretVideo: {
    heading: "YE LE TERA SECRET CLIP! 😂🎬",
    subheading: "Ye dekh ke sabki hansi chhoot gayi thi!",
    src: "/videos/scratch-reveal-video.mp4",
    buttonText: "AAGE BADH BHAI, PICTURE ABHI BAAKI HAI 👀",
  },
  // SCREEN 4: All Remaining Photos and Videos One-by-One with visually inspected Hinglish roasts
  memories: {
    sectionTitle: "MEMORIES",
    items: [
      {
        id: "mem-01",
        type: "photo",
        src: "/images/college/first-year/first-year-01.webp",
        fallbackSrc: "/image1.jpeg",
        title: "Salon Glow-Up Mission 😂",
        caption: "Bhai facial karwa raha hai ya deewar pe Birla White putti chadhwa raha hai? 😭💀",
        punchline: "Dulhan jaisa glow laane ki poori koshish chal rahi hai!",
      },
      {
        id: "mem-02",
        type: "photo",
        src: "/images/college/first-year/first-year-02.webp",
        fallbackSrc: "/5.jpeg",
        title: "Kumbhakaran Mode On 😴",
        caption: "Resort ghoomne gaya tha, par wahan lakdi ke bench pe aate hi VIP neend maar li 😂",
        punchline: "Itni gehri neend toh bistar pe bhi kisi ko nahi aati 💀",
      },
      {
        id: "mem-03",
        type: "photo",
        src: "/images/college/first-year/first-year-03.webp",
        fallbackSrc: "/6.jpeg",
        title: "Gali Ke Don & Bouncers 🕶️",
        caption: "Gali ke gunde lag rahe hain! Ek bhai takla hoke pandit bana hai, baaki recovery agent 💀😂",
        punchline: "Camera dekhte hi sabka gangster pose bahar aa gaya!",
      },
      {
        id: "mem-04",
        type: "photo",
        src: "/images/college/first-year/first-year-04.webp",
        fallbackSrc: "/7.jpeg",
        title: "Dulha Kidnap Ceremony 🚚",
        caption: "Haldi function kam aur dulhe ko hawa mein utha ke kidnap karne ka plan zyada lag raha hai 😭😂",
        punchline: "Bhai ko seedha swarg dispatch karne ki poori taiyaari thi!",
      },
      {
        id: "mem-05",
        type: "photo",
        src: "/images/college/second-year/second-year-01.webp",
        fallbackSrc: "/image2.jpeg",
        title: "Bhai-Bhai Brewery 🍺",
        caption: "Do botal beer hath mein pakad ke aisi smile di hai jaise factory inhi ke naam pe registered ho 😂🍺",
        punchline: "Sasti daaru, par attitude 7-star hotel jaisa!",
      },
      {
        id: "mem-06",
        type: "photo",
        src: "/images/college/second-year/second-year-02.webp",
        fallbackSrc: "/8.jpeg",
        title: "Avatar 3 Ki Casting 🎨",
        caption: "Holi ke naam pe seedha alien invasion ho gaya! Activa pe poori bhoot-pishach committee baithi hai 🤡💀",
        punchline: "Ghar walo ne gate kholne se pehle police ko phone mila diya tha!",
      },
      {
        id: "mem-07",
        type: "photo",
        src: "/images/college/second-year/second-year-03.webp",
        fallbackSrc: "/9.jpeg",
        title: "The Yellow Mafia & The Boss 😎",
        caption: "Teen ladke haldi ke kurtas mein, aur beech mein ek bhai 'BOSS' banke mafia bana baitha hai 💀🕶️",
        punchline: "Dhoop nahi, inka swagger chubh raha hai sabko!",
      },
      {
        id: "mem-08",
        type: "photo",
        src: "/images/college/second-year/second-year-04.webp",
        fallbackSrc: "/10.jpeg",
        title: "Being Human, Harkatein Zero 😈",
        caption: "Center wale bhai ne 'Being Human' pehna hai, par harkatein 1% bhi human wali nahi hain 😂",
        punchline: "Trio of certified late-night backchodi!",
      },
      {
        id: "mem-09",
        type: "video",
        src: "/videos/college-middle-video.mp4",
        title: "Uncensored Kand Recording 🎬",
        caption: "Ye video clip dekho! Yahan bina kisi script ke natural pagalpan record hua tha 😂🔥",
        punchline: "Agar ye footage leak ho gayi toh sabke rishte toot jayenge!",
      },
      {
        id: "mem-10",
        type: "photo",
        src: "/images/college/third-year/third-year-01.webp",
        fallbackSrc: "/image3.jpeg",
        title: "High Voltage Jungle Twerk ⚡",
        caption: "Piche talwar leke banda khada hai aur tu jungle mein twerk karne ki practice kar raha hai?! 😭💀",
        punchline: "High-tension taar ke neeche alag hi current lag gaya lagta hai!",
      },
      {
        id: "mem-11",
        type: "photo",
        src: "/images/college/third-year/third-year-02.webp",
        fallbackSrc: "/11.jpeg",
        title: "Jalpari Gang On Duty 🌊",
        caption: "Nadi kinare pair dalke aise baithe hain jaise Ganga aarti ka VIP pass inhi ke paas ho 😂",
        punchline: "Bhai log sochre the paanv dho ke 4 saal ke paap dhul jayenge!",
      },
      {
        id: "mem-12",
        type: "photo",
        src: "/images/college/third-year/third-year-03.webp",
        fallbackSrc: "/12.jpeg",
        title: "Stage Capture Squad 💐",
        caption: "Dulha-dulhan gayab hain, aur ye namoone poore stage pe kabza karke hansi uda rahe hain 😂",
        punchline: "Shadi mein khana khane kam, stage hijack karne zyada gaye the!",
      },
      {
        id: "mem-13",
        type: "photo",
        src: "/images/college/third-year/third-year-04.webp",
        fallbackSrc: "/13.jpeg",
        title: "Lap Sitting Strategy 🛋️",
        caption: "Ek hi sofe pe itna romance?! Dost ki godi mein baith ke konsi country ki GDP solve kar raha hai? 😭💀",
        punchline: "Sofa kam pad gaya toh bhai-chara overload ho gaya!",
      },
      {
        id: "mem-14",
        type: "photo",
        src: "/images/college/final-year/final-year-01.webp",
        fallbackSrc: "/image 4.jpeg",
        title: "Road Trip Ya Kidnap? 🚗",
        caption: "Car trip pe nikle hain, par expressions dekh ke lag raha hai driver ne AC band karke lock kar diya hai 😂",
        punchline: "Google Maps galat raste le gaya tab ka chehra!",
      },
      {
        id: "mem-15",
        type: "photo",
        src: "/images/college/final-year/final-year-02.webp",
        fallbackSrc: "/14.jpeg",
        title: "Sando Banyan Summit 🎽",
        caption: "Kala sando pehen ke aisi serious meeting le raha hai jaise Desh ka agla Budget yahi pass karega 😂",
        punchline: "Meesho ka Salman Khan in deep gyaan session!",
      },
      {
        id: "mem-16",
        type: "photo",
        src: "/images/college/final-year/final-year-03.webp",
        fallbackSrc: "/15.jpeg",
        title: "St. Mary's Secret Research 🏫",
        caption: "School ke gate pe khade hoke phone mein aisi kya secret scheme chala raha tha bhai? 😂",
        punchline: "School se pass out ho gaye, par chori-chhupe phone chalana nahi chhuta!",
      },
      {
        id: "mem-17",
        type: "photo",
        src: "/images/college/final-year/final-year-04.webp",
        fallbackSrc: "/16.jpeg",
        title: "Engineers At Work (Allegedly) 💻",
        caption: "Bed pe do-do laptop khol ke baithe hain, par kaam ke naam pe sirf meme aur reels scroll ho rahi hai 💀",
        punchline: "Assignment deadline se 10 minute pehle ki solid team unity!",
      },
    ],
    closingHeading: "BHAI, YAADEN TOH KHATAM HI NAHI HOTI 😂❤️",
    closingSubtitle: "Achha chal, ab tera asli birthday gift kholte hain!",
    nextButtonText: "CHAL BHAI, AB GIFT KHOLTE HAIN! 🎁",
  },
  // SCREEN 5: Empty Gift Box Prank
  gift: {
    openingLine: "CHAL BHAI, AB GIFT KHOLTE HAIN! 🎁",
    supportingText: "Bhai ne badi mehnat se pack kiya hai, dekh andar kya hai!",
    buttonText: "TAP TAP TAP! 🎁",
    statusMessages: [
      "Gift ki taiyaari ho rahi hai… 🎁",
      "Packing ekdum ready hai! 😎",
      "Surprise bas aane hi wala hai… 👀",
      "Ek minute, Manas se bhi pooch lete hain 😂",
      "Manas se update ka intezaar hai… 📱",
      "Chal bhai, ab khol hi dete hain! 😂",
    ],
    emptyReveal: {
      stage1: "AREY YAAR! 😂",
      stage2: "GIFT BOX TOH KHALI NIKLA!",
      punchline: "MANAS BHAI, GIFT ABHI RAASTE MEIN HAI KYA? 😂",
      supportingText: "AMITESH, LAGTA HAI SURPRISE KA EK AUR SURPRISE BAAKI HAI! 🎁",
      nextButtonText: "CHAL AB, BIRTHDAY WISH DEKH! ❤️",
    },
  },
  // SCREEN 6: Final Birthday Screen
  finalWish: {
    heading: "HAPPY BIRTHDAY, AMITESH MALLICK! ❤️🎂",
    message: "College ki yaadein, doston ki masti aur saath bitaye hue pal — ye sab hamesha special rahenge. Khush reh, maze kar aur aise hi hasta reh! 🎂",
    collagePhotos: [
      { id: "c1", src: "/images/college/first-year/first-year-01.webp", fallbackSrc: "/image1.jpeg" },
      { id: "c2", src: "/images/college/second-year/second-year-01.webp", fallbackSrc: "/image2.jpeg" },
      { id: "c3", src: "/images/college/third-year/third-year-01.webp", fallbackSrc: "/image3.jpeg" },
      { id: "c4", src: "/images/college/final-year/final-year-01.webp", fallbackSrc: "/image 4.jpeg" },
    ],
    replayButtonText: "EK BAAR AUR BEIZZATI DEKHNI HAI? 🔁",
  },
};
