export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'What is TEDx?',
    answer:
      'TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. At a TEDx event, live speakers and recorded TED Talks combine to spark deep discussion and connection in a small group. These local, self-organized events are branded TEDx, where x = independently organized TED event.',
  },
  {
    question: 'Who can apply?',
    answer:
      'Anyone with an idea worth spreading. Students, faculty, staff, alumni, and members of the surrounding community are all welcome to apply as a speaker, volunteer, or attendee.',
  },
  {
    question: 'Do I need speaking experience?',
    answer:
      "No. We're looking for compelling ideas, not polished résumés. If your talk is selected, our team will work with you through speaker coaching to help you shape and deliver it with confidence.",
  },
  {
    question: 'Can faculty apply?',
    answer:
      'Yes. Faculty and staff are encouraged to apply as speakers, and we welcome faculty involvement as mentors, volunteers, and attendees as well.',
  },
  {
    question: 'Can community members participate?',
    answer:
      'Absolutely. TEDxGramblingStateUniversity is built for the entire Grambling community, on and off campus. Community members can apply to speak, volunteer, or register for the audience.',
  },
  {
    question: 'How will speakers be selected?',
    answer:
      'Our organizing team reviews every application for clarity, originality, and impact. Selected speakers are announced on September 20 and paired with a coach ahead of the event.',
  },
];
