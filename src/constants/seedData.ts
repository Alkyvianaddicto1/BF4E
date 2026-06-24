/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Quiz } from '../types';

export const AVATARS = {
  alex: "https://lh3.googleusercontent.com/aida-public/AB6AXuD36Q9lYRmLh62jUGu_R0jmUdf7Er_Pt202pzRPe6zB7XdWW3dLAHm3YmNui7oIWehsa-19iRQ6iOg-2tW0u9_FJZVGPMcoVklj7N6bkF1ugwGf820F1OSxirewzlp2_xsdAcBGsvYZ85GnF-XAHXhF3aSz1HOBNoAEAcliII1jeLQZNMQ5G15BNBKYpxIdKT1D3XqA4DBkA0YKEe4knaxlwzgujFs6s7tmcbjmMapakAKUywReo3kc5Utfrz4mo7JXBOzIJkzUI69t",
  sarah: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjGVBLM_0SDEWhjHTrjMENSGdtjQc2443YnFdGjkXguz5HBrmZIsh2IDoZLKcevvfATN81Wm0u6jSY88lyJTJVnPLf2jnOogMkvQarJPosHYiedhi-57wpqFuxbbVtFMTPPz4Bp0z6mdqhJ0MqwkbkMW1qSmcHXv24t6cwNcG7-JRpu1aH7ohsDGaancswPsW0nbdKh1r3FXDHm2VACxRgk4GNoMDKCImUERb7BojjHDvyBkosvUcjAd8qixmBnOXeVooVleMZ3YyY",
  chloe: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRTXF-WAeIA8b4BwdnXo_XrX8nmTOjGEG_JG5wXHMtfMopnCZYRfMmf0bm-Xg5uZ3JQsST0hU6Lt4B7ab4c6Ikx1Fl0j7-wsqFgWAFO1btmP4JT7Ceexkvd31zY1LVsW6qC2QIiQAUScqe49KmGCV0vIj1JiU4hhay2X4mwRU7kbAHwhHoHIGPLTPonWTA-2dx70Qzqn6_WY3pHhVr_iFban0T0uEl3Wh31QyH2zF2CwuALptKY136uO5Rg1-4Ct4lwSXwNx1IY1yi",
  jordan: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJiRrC4gKPFxosNuHFim-l7k3Ujxo-P7YfPowpGB48UiubOSiP0l7mOK8HY2fl7sXgOolWybMr5ppOo7FS6KhfE9LHbo3oyZTLPYJW_2pLSK_0yxe8VTgSX386lonBMeK6wsUjuPGUtMpbfIWL9lPQ-HqkH77h5HuZUAS8uLgIgzwijbR1tMpdDhL3UG_kFLacl_s8L6KjSVbRZrOXJ0QbL7G65xGl10SHMlNFWlzP5w0tRa4y6PtO-KrrmGcaJdOm2S4Rax6lUURX",
  mia: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLwGHe7HAPhV3_dpfMchGKvy3m2ybPFKuFGgrsZXxWDF-6iF1oFsuOL4QVzdx6JGptpO1pI1jVG1ny8366non1lUJ1lXwQmgBsPuZMB2hrcHUamxJ6Sz_wwCfSteqar8Ld_UhwYF_GX0-mGkb2VmwTeUJOuBKxl5zXApx6ImwQmj3aa7UyPe2Btounl3vAfnUqSLzLwLQ-k4KNwXYgTiTygVa84D0zzdDXqYD_cquUjfPgAxqudSvxglPyNY9NlNLweNBj1y_lq1_f",
  sam: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkQc1JpbN47fFQR4vNhUpapB3D2VRMBQIG89wz26-I_i5v5b7uV12vPoDHHV8scMGEZO0jQ9Tb8jWSXpXSIBbBZOmeWwj9IY0iyLGA-Zmn7Zkq_Ia6OtZTs4VHXV2gB9Z0emUD49yO9KEZ-zutpcpiHb-AK8aBowmJxa9T2CQMa0H5ZF0jISiwYWcyZJeD38HpqzdVjItgBoT0auoTdRnzgcFaNMdQJWyOteTVQey_kQLxaejBjgOeJRcJOgUIusJZEkSc0m_vfkuz",
  casey: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8bvG9IL8EKI8lAia2yuJtt-KZyHzoREKRRgoMHJM4N3k-TVmYceTbel6TdG-NcD_ee52YHJsuIYbG8iEPUh2qETisecrekwzO5wRsZKdUCgVe3QNtN-t8Yz2qS1Etm6M_WvzqyrXM6UncmzGH7ay_LGrmNGxx97R_BoWlanFFSJtfzPBKcOlTmEwlOTAygANT9hEj5GJ5fBWDstlWNomr5jkOAmhTNL8PQea78axykAK47kdDndSpI5tjCa49aShrJv40eJ_fOaiQ",
  taylor: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2s6lgNwfS41rHGRU8CsXrXk5ViY5ZVYpykBcE9D_z4ElkoCsigIXTen5DY_IqBLkzXtTik8RavnpKd78NK6MPe4pbl__xedC7_Xnd-SSLriIP8UrZo3teIq6a6dStekA4QNKP_x8dgJImMH_-RA5gFo8bx9sfeXXikL1Qrj-5I0A2fUrziLuEK0JOo0-0zJCpTMyLXGrSv9zMNMevGm2GpEleD2LpUu02WYsa0lif9r2AUra1NPvZW0llMsQP4hxp7HJ4OA51Q5jY"
};

export const MOCK_SOCIAL_PROOFS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA5eXKn5SmhGDSSupmy3CgxfMDuRpq8Qh0EbIVgJtuzOPB-vkCt0ypiWy1-XbbbkX8MA7Ih3R2L1MwhhhqhXdJEULHm7D6yko-HOIWRtY_uJNI4x7kZfdGQCPnhmmy62Koi17SutmTcHxB9ZFpL_NH2UViRz7dop_LV20_d86xY-2zDwQ0TOKpeWVTGTItbR7IkwA9_8DCR9JYfLaK5B8smjfUUJwwxUufxJZqw4Aac6oFa50_EXGF8Wp7gB6JdsV0yS5Qs_2VScin4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBCGZA__xYPONaIO1TDcNzSF0n8dJ5I2nRDrXSbWjNwdcbLIc5cMizi3yM5u-1J-_dCNgK8Tcdidnc4Mhsd1DUkwdLZyWWC0hqpBxdZlEMKv3oFt9TE4-9FXMPdTtDGoE-jaRCj_f4KAtNzGfAI-yAteRauo-Y2BKvPBFl96Bs_S7V_fKdrCRdEAoVcyboPgI7sPk-nICOmIh_jGuZqytv7u60mmrQFtLfc9apTa-vEb-LN3T69SEk1oh4CZiEMMucyk89qmYRmAtw5",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCjQenzNoKviZ_PoBGyAdbHhsw-5PR6Wn63ADC8vAWCGdRondLc0sj1LTr-gFEOWSdHoPAeGXFTqext8UM3V3rvo2jdMNTGYmQILYpFznnHNZI1NFr1PzCJSEMZRzlpOp-QIWmPykk0Bqq5WMPa8CNDnQgzaClZ3gvKTarm4MR5kwiH7XvN8r2hEUFEfsqHj9kkrNR3brQdDAR2FGu5Vf-oh3YarC7JESM6WrQpK3_FFqAfZBbeZDtsXh92Jq5ywYFf9LA0Q3V659gr"
];

export const IMAGES = {
  flatLayPhones: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfJ_jmelmq-uekv7Sv3jFW_OC5r_Kl1GJ3g4LbdjZUa0QpQA1QidVzxHhINx6GjWg5sRRnb7QvtfM296wUYClFFdKPAlfgavxRruO-65E8Nux-pGRA9wDtdc6okoI0O_gMfDsyGnwWaFkGZSIFlWdKZfp6EnEEdASEWi1CnDVz7oWteun9Pmyb27vWSMJ9OaeBFs2t_aHUy8jS95fGI9mmZRCpU-4cwQzrUIcOXu9orP7Dlr0PkCbHH9YnJ4A7_LQA6z4XkrnypP_l",
  shapes3D: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnZ-GaZz3wsbO5yyZatK1uZAFpOMdBSpHiJbEzijwDcOTgrn52tdQ8a9v18v9QNIqUTQQ79JWcibM1W51w5PU3JxVVs5U18jCrl4XD29mHDX2aDE2n-d4v660JIs_UmTBfMFJJwud0osaaRNb4FmcRECoD7GvrEke_kez9VjJFPmGlCZCVOMbIMW2mikFUUGWTp4qACksAWi0PKI8TBQznFIHHRtBNyyzaZE1aYLQ3bCu1l6PeqmEEAxJTqsl4nROO9_KH7pLJ0szQ"
};

export const SEED_QUIZZES: Quiz[] = [
  {
    id: "vibes-check-892",
    creatorName: "Spicy Queen 👑",
    title: "The Ultimate Bestie Test 2024",
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: "vacation",
        text: "What is my absolute dream vacation? 🌴",
        tag: "Vibes Check",
        options: [
          "Cozy cabin in snowy mountains",
          "Raving in Ibiza till 6 AM",
          "Eating pasta in a small Italian village",
          "Staycation. Do not perceive me."
        ],
        correctAnswerIndex: 2 // Eating pasta inside Italian village
      },
      {
        id: "coffee",
        text: "What is my go-to coffee order? ☕",
        tag: "Survival Skills",
        options: [
          "Iced Latte with Oat Milk",
          "Black. Like my soul.",
          "Frappuccino with extra whip",
          "I don't drink coffee, I thrive on anxiety."
        ],
        correctAnswerIndex: 0 // Iced Latte with Oat Milk
      },
      {
        id: "pet_peeve",
        text: "What is my absolute biggest pet peeve? 😤",
        tag: "Drama Radar",
        options: [
          "People chewing loudly",
          "Late replies to texts with no reason",
          "Slower walking inside public spaces",
          "'We need to talk' text with zero context"
        ],
        correctAnswerIndex: 3 // 'We need to talk' text
      }
    ],
    responses: [
      {
        id: "resp_alex",
        responderName: "Alex",
        avatarUrl: AVATARS.alex,
        answers: [2, 0, 3], // Got all 3 correct
        score: 1200,
        relationshipTitle: "Soulmate Level",
        answeredAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: "resp_sarah",
        responderName: "Sarah",
        avatarUrl: AVATARS.sarah,
        answers: [2, 0, 1], // Got 2 correct
        score: 850,
        relationshipTitle: "Bestie Material",
        answeredAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: "resp_chloe",
        responderName: "Chloe",
        avatarUrl: AVATARS.chloe,
        answers: [0, 0, 3], // Got 2 correct but slower
        score: 720,
        relationshipTitle: "Bestie Material",
        answeredAt: new Date(Date.now() - 10800000).toISOString()
      },
      {
        id: "resp_jordan",
        responderName: "Jordan",
        avatarUrl: AVATARS.jordan,
        answers: [2, 1, 1], // Got 1 correct
        score: 650,
        relationshipTitle: "Just a friend",
        answeredAt: new Date(Date.now() - 14400000).toISOString()
      },
      {
        id: "resp_mia",
        responderName: "Mia",
        avatarUrl: AVATARS.mia,
        answers: [1, 2, 3], // Got 1 correct
        score: 420,
        relationshipTitle: "Acquaintance level",
        answeredAt: new Date(Date.now() - 18000000).toISOString()
      },
      {
        id: "resp_sam",
        responderName: "Sam",
        avatarUrl: AVATARS.sam,
        answers: [3, 1, 0], // Got 0 correct
        score: 150,
        relationshipTitle: "Needs to study you",
        answeredAt: new Date(Date.now() - 21600000).toISOString()
      }
    ]
  }
];
