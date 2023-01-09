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
              muxPlaybackId: 'vl58GhD7800KFaj5h3HbaU01WHfpKmPrjPEcl5101028XSY',
            },
          },
        },
        whyWeChoseThis:
          'An animation vignette made for the 2019 Annecy film festival. We ' +
          'love its sound design and its celebration of Japanese food ' +
          'culture! "As dinner time approaches, kitchens throughout Japan ' +
          'come alive to prepare an iconic dish: ramen."',
      },
    ],
  };
}
