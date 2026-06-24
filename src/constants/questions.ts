/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuestionTemplate {
  text: string;
  tag: string;
  options: string[];
}

export const QUESTION_TEMPLATES: QuestionTemplate[] = [
  {
    text: "What is my absolute dream vacation? 🌴",
    tag: "Vibes Check",
    options: [
      "Cozy cabin in snowy mountains",
      "Raving in Ibiza till 6 AM",
      "Eating pasta in a small Italian village",
      "Staycation. Do not perceive me."
    ]
  },
  {
    text: "What is my go-to coffee order? ☕",
    tag: "Survival Skills",
    options: [
      "Iced Latte with Oat Milk",
      "Black. Like my soul.",
      "Frappuccino with extra whip",
      "I don't drink coffee, I thrive on anxiety."
    ]
  },
  {
    text: "What is my absolute biggest pet peeve? 😤",
    tag: "Drama Radar",
    options: [
      "People chewing loudly",
      "Late replies to texts with no reason",
      "Slower walking inside public spaces",
      "'We need to talk' text with zero context"
    ]
  },
  {
    text: "In a zombie apocalypse, what is my fate? 🧟",
    tag: "Apocalypse Plan",
    options: [
      "Sacrificing myself within the first 5 mins",
      "Thriving and building a rebel fortress",
      "Accidentally joining the zombie horde",
      "Beating zombies with a kitchen pan"
    ]
  },
  {
    text: "If I won the lottery today, what is the very first purchase? 💰",
    tag: "Wealth Management",
    options: [
      "A gorgeous house in the countryside",
      "Full high-fashion designer wardrobe revamp",
      "Booking continuous direct travel flights",
      "Upgrading my gaming & workspace setup"
    ]
  },
  {
    text: "What is my secret everyday superpower? ✨",
    tag: "Hidden Talents",
    options: [
      "Remembering random trivia from years ago",
      "Sleeping through literally any alarm clock",
      "Finding the absolute best reaction memes",
      "Overthinking a casual text for 3 hours"
    ]
  }
];
