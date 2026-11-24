import type { Scholarship } from '@/types/scholarship';

// Indexable landing pages at /scholarships/<slug>/. Each one lists the matching scholarships from
// the database, under a hand-written introduction and FAQ.
//
// `match` returns a score: 0 = not listed, higher scores are listed first (then by deadline).

export interface LandingPage {
  slug: string;
  title: string; // <title>, the " | ScholarScanner" suffix is added automatically
  description: string; // meta description, 140–160 characters
  h1: string;
  intro: string[]; // paragraphs, 150–300 words in total
  faqs: { q: string; a: string }[];
  searchHref: string; // the same list in the interactive search, with more filters
  match: (s: Scholarship) => number;
}

const has = (items: { name: string }[] | undefined, name: string) => !!items?.some((i) => i.name === name);
const text = (s: Scholarship) => `${s.title} ${s.description}`;

// Scholarships open to students from a given country: ones that name the country first, then
// programmes open to every nationality (or to developing / Commonwealth countries). Scholarships
// hosted in the student's own country are left out, as those are almost always for foreigners.
const forNationality = (country: string, mention: RegExp, includeCommonwealth: boolean) => (s: Scholarship) => {
  if (s.country_name === country) return 0;
  const t = text(s);
  if (mention.test(t)) return 2;
  const open = /any nationality|all nationalities|any country|developing countr/i.test(t) ||
    (includeCommonwealth && /commonwealth/i.test(t));
  return open ? 1 : 0;
};

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: 'uk',
    title: 'Scholarships in UK for International Students',
    description:
      'Fully funded and partial scholarships to study in the UK as an international student: Chevening, Commonwealth, Gates Cambridge, GREAT and university awards.',
    h1: 'Scholarships in the UK for international students',
    intro: [
      'The UK is one of the most popular places to study abroad, and it has some of the best-known scholarships in the world. The government-funded Chevening and Commonwealth Scholarships cover tuition, a monthly living allowance, flights and visa costs. University awards such as Gates Cambridge, Clarendon at Oxford and the Rhodes Scholarship are just as generous but far more competitive.',
      'Most fully funded UK awards are for postgraduate study. A taught master’s usually lasts one year, so a single scholarship can pay for a whole degree. For undergraduates, help is mostly partial: tuition-fee discounts of a few thousand pounds a year, such as the GREAT Scholarships or a university’s own international awards.',
      'Deadlines come early. Chevening applications usually open in August and close in early November for study starting the following September, and many Commonwealth and university awards close between October and January. Some university scholarships require you to apply for your course first, so check each award’s timeline. Most applications ask for an IELTS score that meets the university’s requirement, a personal statement and two references.',
      'The list below shows every UK scholarship in our database, with open awards first and sorted by deadline.',
    ],
    faqs: [
      { q: 'Can international students get a fully funded scholarship in the UK?', a: 'Yes. Chevening, Commonwealth, Gates Cambridge, Clarendon and Rhodes are fully funded, as are many university PhD studentships. Most are for master’s or PhD study rather than undergraduate degrees.' },
      { q: 'When should I apply for UK scholarships?', a: 'Around 10–12 months before your course starts. Many major awards close between October and January for study beginning the following September.' },
      { q: 'Do UK scholarships require IELTS?', a: 'Most do, because the university and the student visa need proof of English. Some universities accept other tests or waive the requirement for graduates of English-taught degrees.' },
      { q: 'Are there UK scholarships for undergraduate students?', a: 'Yes, but they are mostly partial: tuition-fee reductions or one-off awards. Full undergraduate funding for international students is rare and very competitive.' },
      { q: 'Can I apply for more than one UK scholarship?', a: 'Usually yes. You can apply to several awards at once, though some, like Chevening, can’t be held together with other major scholarships.' },
    ],
    searchHref: '/scholarships/search/?country=United%20Kingdom',
    match: (s) => (s.country_name === 'United Kingdom' ? 1 : 0),
  },
  {
    slug: 'usa',
    title: 'Scholarships in USA for International Students',
    description:
      'Scholarships to study in the USA as an international student: need-based university aid, merit awards, Fulbright and funded PhD places, sorted by deadline.',
    h1: 'Scholarships in the USA for international students',
    intro: [
      'In the United States most scholarship money comes from the universities themselves rather than the government. That changes how you apply: for most awards you apply for admission and funding together, and the university decides on both.',
      'For undergraduates, a small group of colleges meet the full financial need of every admitted international student, and many others offer merit scholarships that cover part of tuition. Need-based aid usually requires the CSS Profile or the college’s own financial aid form, submitted with your admission application. Regular decision deadlines fall in early January, and early decision deadlines in November.',
      'At graduate level, PhD students in the US are usually funded through teaching or research assistantships, which waive tuition and pay a monthly stipend. Master’s funding is harder to find. The Fulbright Foreign Student Program is the main government scholarship; it is run by the US embassy or Fulbright commission in each country, with deadlines that vary by country.',
      'Almost every US university asks for TOEFL or IELTS, and many now accept the Duolingo English Test. The list below shows the US scholarships in our database, with open awards first.',
    ],
    faqs: [
      { q: 'Do US universities give full scholarships to international students?', a: 'Some do. A small number of colleges meet full demonstrated need for international students, and most funded PhD programmes cover tuition and pay a stipend. Full merit scholarships for undergraduates exist but are rare.' },
      { q: 'What is the CSS Profile?', a: 'A financial aid form used by many private US colleges to work out how much need-based aid you get. You submit it at the same time as your admission application.' },
      { q: 'Are PhD programmes in the USA free?', a: 'Most PhD programmes in science, engineering and many social sciences are funded: tuition is waived and you are paid a stipend for teaching or research work.' },
      { q: 'How do I apply for Fulbright?', a: 'Through the Fulbright commission or US embassy in your home country, not through the US university. Deadlines and eligibility differ from country to country.' },
    ],
    searchHref: '/scholarships/search/?country=United%20States',
    match: (s) => (s.country_name === 'United States' ? 1 : 0),
  },
  {
    slug: 'fully-funded',
    title: 'Fully Funded Scholarships for International Students',
    description:
      'Fully funded scholarships that cover tuition, living costs and often flights: government, university and foundation awards for bachelor’s, master’s and PhD study.',
    h1: 'Fully funded scholarships for international students',
    intro: [
      'A fully funded scholarship pays for your whole degree. That normally means tuition fees and a monthly living allowance, and often return flights, health insurance and visa costs as well. These are the most competitive awards, so it pays to start early and apply to several.',
      'The best-known fully funded programmes are run by governments: Chevening and Commonwealth in the UK, DAAD in Germany, MEXT in Japan, Global Korea (GKS) in South Korea, Türkiye Bursları in Turkey, Stipendium Hungaricum in Hungary and the Chinese Government Scholarship. The EU’s Erasmus Mundus programmes fund two-year joint master’s degrees taught in several European countries. Many universities also fully fund their PhD students, and a few fund outstanding undergraduates.',
      'Most fully funded scholarships close 8–12 months before the course starts, typically between October and March for study beginning in the autumn. Some are applied for through the university, others through an embassy or a national agency in your home country. Strong grades, a clear study plan and good references matter more than anything else.',
      'Below are all the fully funded scholarships in our database, with open ones first and sorted by deadline.',
    ],
    faqs: [
      { q: 'What does a fully funded scholarship cover?', a: 'Tuition fees and a living allowance at minimum. Many also cover flights, health insurance, visa fees and research costs. Each listing shows what that scholarship pays for.' },
      { q: 'Which countries offer the most fully funded scholarships?', a: 'The UK, Germany, Japan, South Korea, Turkey, Hungary and China all run large government programmes, and the EU funds Erasmus Mundus master’s degrees across Europe.' },
      { q: 'Can I get a fully funded scholarship without IELTS?', a: 'Some programmes accept other English tests or a medium-of-instruction letter, and programmes taught in other languages don’t need IELTS at all. See our list of scholarships without IELTS.' },
      { q: 'When do fully funded scholarships open?', a: 'Most open between August and November and close between October and March, for study starting the following September or October.' },
      { q: 'Do I need an admission offer first?', a: 'It depends. Some scholarships require an offer before you apply, others ask you to apply for admission and funding together, and government programmes often help place you at a university.' },
    ],
    searchHref: '/scholarships/search/?fund_type=Full%20Funding',
    match: (s) => (has(s.fund_type, 'Full Funding') ? 1 : 0),
  },
  {
    slug: 'masters',
    title: "Master's Scholarships for International Students",
    description:
      "Master's scholarships for international students: fully funded and partial awards in the UK, Europe, Australia, Asia and the USA, sorted by deadline.",
    h1: "Master's scholarships for international students",
    intro: [
      'Master’s degrees attract more scholarships for international students than any other level. Governments use them to build links with future leaders, and universities use them to attract strong graduates.',
      'Some of the biggest programmes are for master’s study only. Chevening funds one-year master’s degrees in the UK. Erasmus Mundus pays for two-year joint master’s degrees where you study in two or more European countries. DAAD supports development-related master’s courses in Germany, the Swedish Institute funds master’s students in Sweden, and Australia Awards fund study in Australia for students from partner countries. Many universities also offer partial awards, such as tuition reductions of 10–50%.',
      'Expect to need a good bachelor’s degree (often a first or upper second class, or the local equivalent), an English test, a statement of purpose and two references. Some programmes also ask for work experience: Chevening requires two years.',
      'Deadlines for September intakes mostly fall between October and February. Below are all the master’s scholarships in our database, with open awards first and sorted by deadline.',
    ],
    faqs: [
      { q: "Which master's scholarships are fully funded?", a: 'Chevening, Erasmus Mundus, DAAD, Commonwealth, the Swedish Institute and Australia Awards are among the best-known fully funded options.' },
      { q: "Do I need work experience for a master's scholarship?", a: 'Some require it. Chevening asks for two years, and several development-focused programmes prefer applicants with relevant experience. Many university awards don’t.' },
      { q: 'What GPA do I need?', a: 'Most competitive scholarships expect a first or upper second class degree, or roughly a 3.0–3.5 GPA on a 4-point scale. The exact requirement is shown on each scholarship’s official page.' },
      { q: "How long is a master's in Europe and the UK?", a: 'Usually one year in the UK and two years in most of Europe, including Erasmus Mundus programmes.' },
    ],
    searchHref: '/scholarships/search/?levels=Master',
    match: (s) => (has(s.levels, 'Master') ? 1 + (has(s.fund_type, 'Full Funding') ? 0.5 : 0) : 0),
  },
  {
    slug: 'phd',
    title: 'Fully Funded PhD Scholarships for International Students',
    description:
      'Fully funded PhD scholarships and studentships for international students in Europe, the UK, the USA, Asia and Australia, with stipends and tuition covered.',
    h1: 'Fully funded PhD scholarships',
    intro: [
      'Doing a PhD without funding is rarely a good idea, and in most countries you don’t have to. Doctoral funding is more common than master’s funding, because PhD students do research that universities and research councils want done.',
      'How the money is paid depends on the country. In the Netherlands, Scandinavia and much of Germany, PhD candidates are employed by the university and earn a salary. In the USA, funded programmes waive tuition and pay a stipend in return for teaching or research work. In the UK, studentships from universities or research councils cover fees and a tax-free stipend. Government programmes such as DAAD, MEXT, the Commonwealth PhD Scholarships and the Chinese Government Scholarship also fund doctorates, and EU-funded Marie Skłodowska-Curie doctoral networks recruit candidates from any country.',
      'PhD funding often comes attached to a specific project, so many places are advertised year-round rather than with one annual deadline. You will usually need a master’s degree, a research proposal or a strong statement of research interests, and a supervisor who wants to take you on.',
      'Below are the PhD scholarships in our database, fully funded ones first and then by deadline.',
    ],
    faqs: [
      { q: 'Are PhDs free for international students?', a: 'Many are. Funded places cover tuition and pay a salary or stipend. Self-funded PhDs exist too, but they are expensive and best avoided.' },
      { q: 'Do I need a master’s to get a PhD scholarship?', a: 'In Europe and the UK usually yes. In the USA and Canada you can often start a funded PhD straight after a bachelor’s degree.' },
      { q: 'Should I contact a supervisor before applying?', a: 'Yes, in most of Europe, the UK and Asia. A short, specific email about your research interests and how they fit their work helps a lot.' },
      { q: 'How much is a PhD stipend?', a: 'It varies widely: from a few hundred euros a month in some government programmes to a full salary of €2,500 or more per month in the Netherlands and Scandinavia.' },
    ],
    searchHref: '/scholarships/search/?levels=PhD',
    match: (s) => (has(s.levels, 'PhD') ? 1 + (has(s.fund_type, 'Full Funding') ? 0.5 : 0) : 0),
  },
  {
    slug: 'bachelors',
    title: 'Undergraduate Scholarships for International Students',
    description:
      "Undergraduate and bachelor's scholarships for international students: government programmes, need-based university aid and merit awards, sorted by deadline.",
    h1: 'Undergraduate scholarships for international students',
    intro: [
      'Full funding for a bachelor’s degree abroad is harder to find than for postgraduate study, but it does exist. The most generous sources are government programmes and a small number of wealthy universities.',
      'Government scholarships that fund undergraduates include Japan’s MEXT, Korea’s Global Korea Scholarship (GKS), Türkiye Bursları, Hungary’s Stipendium Hungaricum and the Chinese Government Scholarship. They usually cover tuition, a monthly allowance and accommodation, and some include a year of language study first. In the USA, a few universities meet the full financial need of every international student they admit. In the UK, Australia, Canada and much of Europe, undergraduate awards are mostly partial: tuition discounts or a fixed sum each year.',
      'You normally apply for an undergraduate scholarship together with your university application, often by the same deadline, and there is rarely a second chance after you’ve been admitted. Strong final school grades or predicted grades, an English test and, for US universities, essays and references are the usual requirements.',
      'Below are the undergraduate scholarships in our database, with open awards first and sorted by deadline.',
    ],
    faqs: [
      { q: 'Can international students get a full scholarship for a bachelor’s degree?', a: 'Yes, mainly through government programmes such as MEXT, GKS, Türkiye Bursları and Stipendium Hungaricum, or need-based aid at a small number of US universities.' },
      { q: 'When should I apply?', a: 'Usually 9–12 months before the course starts, at the same time as your university application. Many deadlines fall between November and February.' },
      { q: 'Do I need IELTS for an undergraduate scholarship?', a: 'For English-taught degrees usually yes, or TOEFL or Duolingo. Programmes taught in Japanese, Korean, Turkish or Chinese often include a language year instead.' },
      { q: 'Can I apply with predicted grades?', a: 'Often yes. Many universities make offers and award scholarships based on predicted grades, then confirm them when your final results arrive.' },
    ],
    searchHref: '/scholarships/search/?levels=Bachelor',
    match: (s) => (has(s.levels, 'Bachelor') ? 1 : 0),
  },
  {
    slug: 'engineering',
    title: 'Engineering Scholarships for International Students',
    description:
      'Engineering scholarships for international students: fully funded master’s and PhD awards, research assistantships and university scholarships worldwide.',
    h1: 'Engineering scholarships for international students',
    intro: [
      'Engineering is one of the best-funded subjects for international students. Universities and governments want more engineers, and engineering departments bring in research money that pays for graduate students.',
      'At master’s level, look at Erasmus Mundus joint degrees in fields such as robotics, renewable energy and materials science, DAAD scholarships for development-related engineering courses in Germany, and university awards in the UK, the Netherlands and Australia. Public universities in Germany charge little or no tuition in most states, which makes even a partial scholarship go a long way. At PhD level, engineering students in the USA, Canada and Europe are very often funded through research assistantships or salaried positions attached to a project.',
      'Engineering scholarships usually look closely at your grades in maths and core technical subjects, and research awards also value projects, internships and publications. For a funded PhD, contacting a professor whose research matches your interests is often the most important step.',
      'Below are the scholarships in our database that list engineering as a field of study, with open awards first and sorted by deadline.',
    ],
    faqs: [
      { q: 'Which countries are best for engineering scholarships?', a: 'Germany, the USA, the UK, the Netherlands, Sweden, Japan and South Korea all offer strong funding for engineering, especially for master’s and PhD study.' },
      { q: 'Are there fully funded engineering master’s programmes?', a: 'Yes. Erasmus Mundus, DAAD, MEXT and GKS all fund engineering master’s degrees, and some universities offer full awards to top applicants.' },
      { q: 'What is a research assistantship?', a: 'A funded position where you work on a professor’s research project. It usually covers tuition and pays a monthly stipend, and is the main way engineering PhDs are funded in the USA.' },
      { q: 'Do engineering scholarships require GRE?', a: 'Fewer than before. Many US programmes have made the GRE optional, and European and Asian scholarships rarely ask for it.' },
    ],
    searchHref: '/scholarships/search/?field_of_study=Engineering',
    match: (s) => (has(s.field_of_study, 'Engineering') ? 1 : 0),
  },
  {
    slug: 'no-ielts',
    title: 'Scholarships Without IELTS for International Students',
    description:
      'Scholarships that don’t list IELTS as a requirement: awards accepting TOEFL or Duolingo, and programmes taught in German, Japanese, Korean or Chinese.',
    h1: 'Scholarships without IELTS',
    intro: [
      'IELTS is expensive and not every scholarship needs it. This page lists the scholarships in our database that don’t name IELTS as a language requirement.',
      'They fall into a few groups. Most US universities ask for TOEFL, and many also accept the Duolingo English Test, which is cheaper and taken online. Programmes taught in another language, such as many courses in Germany, Japan, South Korea and China, ask for a test in that language instead, like TestDaF, JLPT or TOPIK, and government scholarships in those countries often include a preparatory language year. Some universities also waive English tests for students whose previous degree was taught in English, if you can show a medium-of-instruction letter from your university.',
      'A word of caution: “no IELTS” does not always mean “no English test”. A scholarship may not require IELTS while the university or the student visa still asks for proof of English. Always check the language requirements of both the scholarship and the course on the official websites before you apply.',
      'The scholarships below are sorted with open awards first, then by deadline.',
    ],
    faqs: [
      { q: 'Can I study abroad without IELTS?', a: 'Often yes. You can use another test such as TOEFL or Duolingo, choose a course taught in another language, or ask for a waiver if your previous degree was taught in English.' },
      { q: 'What is a medium-of-instruction (MOI) letter?', a: 'A letter from your university confirming that your degree was taught in English. Some universities accept it instead of an English test.' },
      { q: 'Does the Duolingo English Test count?', a: 'It is accepted by many US universities and a growing number elsewhere. Check each university’s list of accepted tests.' },
      { q: 'Do I still need English for the visa?', a: 'Sometimes. UK student visas, for example, have their own English requirement, though the university usually assesses it for you.' },
    ],
    searchHref: '/scholarships/search/',
    match: (s) => (s.language_requirement?.some((l) => l.name === 'IELTS') || /\bIELTS\b/i.test(s.description) ? 0 : 1),
  },
  {
    slug: 'for-bangladeshi-students',
    title: 'Scholarships for Bangladeshi Students to Study Abroad',
    description:
      'Scholarships open to students from Bangladesh: Commonwealth, Chevening, MEXT, Fulbright, Erasmus Mundus and other fully funded awards, sorted by deadline.',
    h1: 'Scholarships for Bangladeshi students',
    intro: [
      'Students from Bangladesh are eligible for many of the world’s best-known scholarships. As a Commonwealth country, Bangladesh is included in the Commonwealth Master’s and PhD Scholarships for study in the UK, and Chevening is open to Bangladeshi applicants. Japan’s MEXT scholarship can be applied for through the Japanese Embassy in Dhaka, and Fulbright places for study in the USA are offered through the US embassy.',
      'Beyond these, many programmes are open to all nationalities, including Erasmus Mundus master’s degrees in Europe, DAAD scholarships in Germany, Global Korea Scholarships, Türkiye Bursları and the Chinese Government Scholarship, along with thousands of university awards.',
      'Start preparing early. Most applications need an IELTS or other English test score, certified and translated academic documents, and references from your teachers or employer. Government scholarships through embassies often have earlier deadlines than university awards, sometimes a full year before the course starts.',
      'The list below starts with scholarships that mention Bangladesh by name, then programmes open to every nationality or to students from developing and Commonwealth countries. It leaves out scholarships hosted in Bangladesh itself. Always confirm on the official page that your country is eligible for the current round.',
    ],
    faqs: [
      { q: 'Which scholarships are best for Bangladeshi students?', a: 'Commonwealth, Chevening, MEXT, Fulbright, Erasmus Mundus and GKS are among the most popular fully funded options for students from Bangladesh.' },
      { q: 'Is Bangladesh eligible for Commonwealth Scholarships?', a: 'Yes. Bangladesh is a Commonwealth country and is usually included in the Commonwealth Master’s and PhD Scholarships. Applications go through the nominating body in Bangladesh.' },
      { q: 'Can Bangladeshi students get scholarships without IELTS?', a: 'Some. Certain universities accept a medium-of-instruction letter, and programmes taught in other languages don’t need IELTS. See our list of scholarships without IELTS.' },
      { q: 'How do I apply for MEXT from Bangladesh?', a: 'Through the Embassy of Japan in Bangladesh, which usually announces the embassy-recommended round in spring, or through a Japanese university that offers university-recommended places.' },
    ],
    searchHref: '/scholarships/search/',
    match: forNationality('Bangladesh', /\bBangladesh/i, true),
  },
  {
    slug: 'for-indian-students',
    title: 'Scholarships for Indian Students to Study Abroad',
    description:
      'Scholarships open to students from India: Commonwealth, Chevening, Fulbright-Nehru, Erasmus Mundus, DAAD and other awards for study abroad, sorted by deadline.',
    h1: 'Scholarships for Indian students',
    intro: [
      'India sends more students abroad than almost any other country, and there is a wide range of scholarships to help pay for it. Indian students can apply for Chevening and the Commonwealth Scholarships in the UK, and the Fulbright-Nehru fellowships for the USA, run by the United States-India Educational Foundation.',
      'Many large programmes are also open to every nationality: Erasmus Mundus joint master’s degrees, DAAD scholarships in Germany, MEXT in Japan, Global Korea Scholarships and Australia’s university awards, among others. Some foundations and universities also run awards just for Indian students, such as the JN Tata Endowment loan scholarship and the Inlaks Shivdasani scholarships.',
      'Because so many Indian students apply, competition is strong. A clear statement of purpose that explains why you chose the course and how you’ll use it, good references and early preparation for IELTS, TOEFL or the GRE all make a difference. Many deadlines fall between October and February for study starting the following autumn.',
      'The list starts with scholarships that mention India by name, then programmes open to every nationality or to students from developing and Commonwealth countries. Scholarships hosted in India are left out. Always confirm eligibility for the current round on the official page.',
    ],
    faqs: [
      { q: 'Which scholarships are best for Indian students?', a: 'Chevening, Commonwealth, Fulbright-Nehru, Erasmus Mundus, DAAD, Inlaks and JN Tata are among the best known. University awards in the UK, USA, Canada and Australia add many more.' },
      { q: 'Are Indian students eligible for Commonwealth Scholarships?', a: 'Yes. India is a Commonwealth country and is usually included. Nominations go through the Ministry of Education in India.' },
      { q: 'Do Indian students need the GRE?', a: 'Only for some programmes, mainly in the USA, and many have made it optional. UK, European and Asian scholarships rarely ask for it.' },
      { q: 'When should Indian students start applying?', a: 'About a year before the course starts. Many major scholarships close between October and February.' },
    ],
    searchHref: '/scholarships/search/',
    match: forNationality('India', /\bIndia(n|ns)?\b/i, true),
  },
  {
    slug: 'for-pakistani-students',
    title: 'Scholarships for Pakistani Students to Study Abroad',
    description:
      'Scholarships open to students from Pakistan: Fulbright, Commonwealth, Chevening, Erasmus Mundus, Chinese Government and other awards, sorted by deadline.',
    h1: 'Scholarships for Pakistani students',
    intro: [
      'Students from Pakistan have access to some of the largest scholarship programmes in the world. The Fulbright programme in Pakistan, run by the United States Educational Foundation in Pakistan (USEFP), is one of the biggest Fulbright programmes anywhere. As a Commonwealth country, Pakistan is included in the Commonwealth Master’s and PhD Scholarships, and Chevening is open to Pakistani applicants.',
      'Many other programmes are open to all nationalities, including Erasmus Mundus, DAAD, Türkiye Bursları, Stipendium Hungaricum, Global Korea Scholarships and the Chinese Government Scholarship, along with university awards worldwide. The Higher Education Commission (HEC) of Pakistan also announces overseas scholarships and shortlists candidates for several foreign government programmes.',
      'Most applications need an English test, attested academic documents and strong references. Some programmes, including Fulbright, ask for a test such as the GRE. Keep an eye on HEC and embassy announcements, because some national rounds open and close quickly.',
      'The list starts with scholarships that mention Pakistan by name, then programmes open to every nationality or to students from developing and Commonwealth countries. Scholarships hosted in Pakistan are left out. Always confirm eligibility for the current round on the official page.',
    ],
    faqs: [
      { q: 'Which scholarships are best for Pakistani students?', a: 'Fulbright, Commonwealth, Chevening, Erasmus Mundus, Türkiye Bursları, Stipendium Hungaricum and the Chinese Government Scholarship are among the most popular.' },
      { q: 'Is Pakistan eligible for Commonwealth Scholarships?', a: 'Yes. Pakistan is a Commonwealth country, and nominations are usually made through the Higher Education Commission.' },
      { q: 'How do I apply for Fulbright from Pakistan?', a: 'Through USEFP, which runs the Fulbright programme in Pakistan and announces deadlines and test requirements each year.' },
      { q: 'What does HEC do for overseas scholarships?', a: 'HEC runs its own overseas scholarship schemes and handles applications for several foreign government programmes, so its website is worth checking regularly.' },
    ],
    searchHref: '/scholarships/search/',
    match: forNationality('Pakistan', /\bPakistan/i, true),
  },
  {
    slug: 'for-malaysian-students',
    title: 'Scholarships for Malaysian Students to Study Abroad',
    description:
      'Scholarships open to students from Malaysia: Chevening, Fulbright, MEXT, Erasmus Mundus, DAAD and university awards for study abroad, sorted by deadline.',
    h1: 'Scholarships for Malaysian students',
    intro: [
      'Malaysian students can apply for a wide range of international scholarships. Chevening is open to Malaysians, and in some years it has been co-funded with Malaysian partners such as the CIMB Foundation. Fulbright awards for the USA are offered through the Malaysian-American Commission on Educational Exchange (MACEE), and Japan’s MEXT scholarship is available through the Japanese Embassy in Kuala Lumpur.',
      'Many large programmes are open to every nationality, including Erasmus Mundus, DAAD, Global Korea Scholarships and thousands of university awards in the UK, Australia, Europe and East Asia. Some Southeast Asian scholarships, such as awards for ASEAN students at universities in Singapore and Hong Kong, are also open to Malaysians.',
      'Inside Malaysia, sponsors such as government agencies, government-linked companies and foundations also fund study abroad, usually with a bond to work for the sponsor afterwards. Those aren’t listed here, but they are worth comparing with the international awards below.',
      'The list starts with scholarships that mention Malaysia by name, then programmes open to every nationality or to students from developing countries. Scholarships hosted in Malaysia are left out. Always confirm eligibility for the current round on the official page.',
    ],
    faqs: [
      { q: 'Which scholarships are best for Malaysian students?', a: 'Chevening, Fulbright, MEXT, Erasmus Mundus, DAAD and GKS are popular fully funded choices, along with ASEAN scholarships in Singapore and Hong Kong.' },
      { q: 'Is Chevening open to Malaysians?', a: 'Yes. Malaysia is a Chevening country, and some places have been co-funded with Malaysian partners.' },
      { q: 'How do Malaysians apply for Fulbright?', a: 'Through MACEE, the Malaysian-American Commission on Educational Exchange, which announces the annual Fulbright rounds.' },
      { q: 'Are there scholarships for ASEAN students?', a: 'Yes. Several universities in Singapore, Hong Kong and elsewhere in Asia run scholarships only for students from ASEAN countries, including Malaysia.' },
    ],
    searchHref: '/scholarships/search/',
    match: forNationality('Malaysia', /\bMalaysia/i, false),
  },
];

export const getLandingPage = (slug: string) => LANDING_PAGES.find((p) => p.slug === slug);
