import type { Playbill } from '@prisma/client';

export function createCurrentPlaybill(startDate: Date): Omit<Playbill, 'id'> {
  return {
    startDate,
    acts: [
      {
        type: 'Content',
        media: {
          title: 'Ramen',
          credits: [
            {
              role: null,
              creator: {
                name: 'Gobelins',
                outlinks: [],
              },
            },
            {
              role: 'Animator',
              creator: {
                name: 'Eduardo Adsuara',
                outlinks: [],
              },
            },
            {
              role: 'Animator',
              creator: {
                name: 'Gabriel Gérard',
                outlinks: [],
              },
            },
            {
              role: 'Animator',
              creator: {
                name: 'Gwendoline Legendre',
                outlinks: [],
              },
            },
            {
              role: 'Animator',
              creator: {
                name: 'Marie-Liesse Coumau',
                outlinks: [],
              },
            },
            {
              role: 'Animator',
              creator: {
                name: 'Mikai Geronimo',
                outlinks: [],
              },
            },
            {
              role: 'Sound Engineer',
              creator: {
                name: 'Joris Derradj',
                outlinks: [],
              },
            },
            {
              role: 'Music',
              creator: {
                name: 'Thomas Pironneau',
                outlinks: [],
              },
            },
          ],
          outlinks: [
            {
              uri: 'https://vimeo.com/338887109',
            },
          ],
          playback: {
            audio: null,
            video: {
              muxAssetId: 'MZAd7aOmuWpbn1HuoSdMVOZGPADfVqqAI4ljKYUDbZ00',
            },
          },
        },
        whyWeChoseThis:
          'An animation vignette made for the 2019 Annecy film festival. We ' +
          'love its sound design and its celebration of Japanese food ' +
          'culture! "As dinner time approaches, kitchens throughout Japan ' +
          'come alive to prepare an iconic dish: ramen."',
      },
      {
        type: 'Content',
        media: {
          title: "There's a Man In The Woods",
          credits: [
            {
              role: null,
              creator: {
                name: 'Jacob Streilein',
                outlinks: [],
              },
            },
            {
              role: 'Composer',
              creator: {
                name: 'Michael Paul Kennedy',
                outlinks: [],
              },
            },
            {
              role: 'Voice Actor',
              creator: {
                name: 'Michael Ho',
                outlinks: [],
              },
            },
          ],
          outlinks: [
            {
              uri: 'https://vimeo.com/93052696',
            },
          ],
          playback: {
            audio: null,
            video: {
              muxAssetId: 'dJYYwDeR7DuscdAq00I1xY02Z01sLqrQqws6Lg7je502N4w',
            },
          },
        },
        whyWeChoseThis:
          "We chose this for its great story that's presented thru stanza. " +
          'We wanted a hard hitting piece to open our Alpha segment.',
      },
      {
        type: 'Bump',
        media: {
          title: 'Vibrancy',
          credits: [
            {
              role: null,
              creator: {
                name: 'kudasai',
                outlinks: [],
              },
            },
          ],
          outlinks: [
            {
              uri: 'https://soundcloud.com/kudasaibeats/vibrancy',
            },
          ],
          playback: {
            video: null,
            audio: {
              muxAssetId: 'SyAhqdkftb01aesoSguolNUr02nBgF11NhN9muUvCSXZE',
            },
          },
        },
        whyWeChoseThis: null,
      },
      {
        type: 'Content',
        media: {
          title: 'beautiful brain',
          credits: [
            {
              role: null,
              creator: {
                name: 'Mabel Ye',
                outlinks: [],
              },
            },
          ],
          outlinks: [
            {
              uri: 'https://vimeo.com/265995376',
            },
          ],
          playback: {
            audio: null,
            video: {
              muxAssetId: 'iTwIsL00XxOGjuSbbysu1NGAve5NppvFbjvVuVWmQ3BU',
            },
          },
        },
        whyWeChoseThis:
          'An honest, relatable, and fun little love story. This creator did ' +
          'both the music and animation herself.',
      },
      {
        type: 'Content',
        media: {
          title: 'MEMO',
          credits: [
            {
              role: null,
              creator: {
                name: 'Gobelins',
                outlinks: [],
              },
            },
            {
              role: 'Director',
              creator: {
                name: 'Julien Becquer',
                outlinks: [],
              },
            },
            {
              role: 'Director',
              creator: {
                name: 'Elena Dupressoir',
                outlinks: [],
              },
            },
            {
              role: 'Director',
              creator: {
                name: 'Jules Durand',
                outlinks: [],
              },
            },
            {
              role: 'Director',
              creator: {
                name: 'Viviane Guimaraes',
                outlinks: [],
              },
            },
            {
              role: 'Director',
              creator: {
                name: 'Ines Scheiber',
                outlinks: [],
              },
            },
          ],
          outlinks: [
            {
              uri: 'https://vimeo.com/224651200',
            },
          ],
          playback: {
            audio: null,
            video: {
              muxAssetId: 'FXzz7dp4aV6xfQF0159KIaCLXuMCv1C29FzmYb01W01bsM',
            },
          },
        },
        whyWeChoseThis:
          'We resonate with the impact that mental illness and dementia can ' +
          'have on individuals and loved ones. This is a great example of ' +
          'how art can help illustrate how the world looks to a damaged ' +
          'mind~ We also chose this piece to see how good subtitles look in ' +
          'our experience.',
      },
      {
        type: 'Bump',
        media: {
          title: 'State of Mind',
          credits: [
            {
              role: null,
              creator: {
                name: 'Lion Sphere',
                outlinks: [],
              },
            },
          ],
          outlinks: [
            {
              uri: 'https://lionsphere.bandcamp.com/track/state-of-mind',
            },
          ],
          playback: {
            video: null,
            audio: {
              muxAssetId: 'BpQBpoZ9RdVZlO1WlYBan5uBsaS00TrD2W6Kq3R2GIno',
            },
          },
        },
        whyWeChoseThis: null,
      },
      {
        type: 'Content',
        media: {
          title: 'Being Pretty',
          credits: [
            {
              role: null,
              creator: {
                name: 'David James Armsby',
                outlinks: [],
              },
            },
          ],
          outlinks: [
            {
              uri: 'https://www.youtube.com/watch?v=44Vh_w_Qb1A',
            },
          ],
          playback: {
            audio: null,
            video: {
              muxAssetId: 'Pbiwa4cCZEfsTVbXXcfJYyLDbIZL3TLLWmsqWQ1voyc',
            },
          },
        },
        whyWeChoseThis:
          'David James Armsby, aka Dead Sound, is an up-and-coming ' +
          'independent animator. This is the first installment of his series ' +
          'on "Autodale", which we hope to showcase over the coarse of ' +
          "Sadboi's lifetime.",
      },
      {
        type: 'Content',
        media: {
          title: 'Diamond Jack',
          credits: [
            {
              role: null,
              creator: {
                name: 'Rachel Kim',
                outlinks: [],
              },
            },
            {
              role: 'Composition, Lyrics',
              creator: {
                name: 'Connor Spiotto',
                outlinks: [],
              },
            },
            {
              role: 'Vocalist',
              creator: {
                name: 'Molly Pease',
                outlinks: [],
              },
            },
          ],
          outlinks: [
            {
              uri: 'https://vimeo.com/215921777',
            },
          ],
          playback: {
            audio: null,
            video: {
              muxAssetId: '2ge54ZA9ZMd00rrmq01dkMXFmy019YKqZ3epkSkosmQmQE',
            },
          },
        },
        whyWeChoseThis:
          "We love the energy of this piece. It's hard to believe this was " +
          'done by a 3rd year CalArts student!',
      },
      {
        type: 'Content',
        media: {
          title: 'In Orbit',
          credits: [
            {
              role: null,
              creator: {
                name: 'Gobelins',
                outlinks: [],
              },
            },
            {
              role: 'Director',
              creator: {
                name: 'Soham Chakraborty',
                outlinks: [],
              },
            },
            {
              role: 'Director',
              creator: {
                name: 'Hanxu Chen',
                outlinks: [],
              },
            },
            {
              role: 'Director',
              creator: {
                name: 'Meton Joffily',
                outlinks: [],
              },
            },
            {
              role: 'Director',
              creator: {
                name: 'Justin Polley',
                outlinks: [],
              },
            },
            {
              role: 'Director',
              creator: {
                name: 'Julia Trouvé',
                outlinks: [],
              },
            },
            {
              role: 'Sound Designer',
              creator: {
                name: 'Nadège Feyrit',
                outlinks: [],
              },
            },
            {
              role: 'Mixer',
              creator: {
                name: 'Cédric DENOOZ',
                outlinks: [],
              },
            },
            {
              role: 'Music',
              creator: {
                name: 'Arthur Dairaine',
                outlinks: [],
              },
            },
          ],
          outlinks: [
            {
              uri: 'https://vimeo.com/343197742',
            },
          ],
          playback: {
            audio: null,
            video: {
              muxAssetId: 'g02g3C1iWRS00KQ9zYV7KxBpMjeZYudgaICj6tLQQBlgk',
            },
          },
        },
        whyWeChoseThis:
          'We adore Gobelins as an animation school. In this Alpha segment ' +
          'alone, we\'ve shown three of their student films! "In Orbit" is ' +
          'one of our favorite pieces, and is a no-brainer anchor to our ' +
          'Alpha show.',
      },
      {
        type: 'Bump',
        media: {
          title: 'Some Feeling',
          credits: [
            {
              role: null,
              creator: {
                name: 'Mild Orange',
                outlinks: [],
              },
            },
          ],
          outlinks: [
            {
              uri: 'https://soundcloud.com/mildorange/some-feeling-2',
            },
          ],
          playback: {
            video: null,
            audio: {
              muxAssetId: '006fZI801yaTzaLPdWcQDBXhfOEP6eQX4zmZ8EAVcRfkg',
            },
          },
        },
        whyWeChoseThis: null,
      },
    ],
  };
}
