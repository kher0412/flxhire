import { isPrerendering } from 'services/prerender'

const defaultIsOpen = isPrerendering()
const faqContent = [
  {
    id: 1,
    category: 'FAQ for Companies',
    questions: [
      {
        id: 1,
        question: 'Why should I use Flexhire for my technology staffing needs?',
        answer: 'Technology is an incredibly fast moving market, and hiring is expensive and complex. Flexhire removes the complexity by pre-qualifying the right talent for your job from a large pool of candidates from all over the world. We simplify the contracting, billing, time-sheet management and other operational details so that you can focus on getting your technology team spun up as fast as possible with the minimum amount of hassle. Our software engineers are all personally reviewed by our internal tech team of postgraduate computer scientists and digital marketing experts. You get the best because we only admit the best. The candidates we send you are ready to work on your project now; no waiting months to help your project move forward. If you’re budget conscious, we have a wide network of freelancers that work remotely, which is a very cost effective option. Over the long term, if you develop a great working relationship with your Flexhire freelancer, we have a great model that allows you to transition them to a permanent position on your team.',
        defaultOpen: defaultIsOpen,
      },
      {
        id: 2,
        question: 'How much does the Flexhire service cost?',
        answer: 'Our service is totally free, from creating and posting profiles and jobs, to assessing and contacting freelancers. We only begin to make money when you make a successful hire. Our margin is built into the hourly rates that you are quoted during your candidate search, so there are no hidden fees or extra costs whatsoever.',
        defaultOpen: defaultIsOpen,
      },
      {
        id: 3,
        question: 'What kind of freelancers will I find on Flexhire?',
        answer: 'Flexhire freelancers have a very wide range of technology skills, covering Android and iOS development. On the backend we cover many stacks such as Ruby, PHP, Scala, Python, Node, Erlang, Java, Go, Ruby on Rails, Symphony, Sinatra, Laravel, Meteor, Django, Express and more. On the frontend, we cover HTML/CSS, JavaScript, Backbone, Angular, React, Ember and more. Finally, we also include designers that cover UI and UX Design and overall Visual Design',
        defaultOpen: defaultIsOpen,
      },
    ],
  },
  {
    id: 2,
    category: 'FAQ for Freelancers',
    questions: [
      {
        id: 4,
        question: 'Types of Freelancers on Flexhire',
        answer: 'We offer a very wide range of modern technology and design capabilities, so we accept engineers with knowledge of both back-end and front-end development languages and frameworks, as well as designers with UX/UI skills. Candidates that have previous experience in technology companies or start-ups will generally have the greatest success.',
        defaultOpen: defaultIsOpen,
      },
      {
        id: 5,
        question: 'Do I need to have previous industry experience?',
        answer: 'Not necessarily, but experience will certainly increase the likelihood of matching you with a great employer. Our network includes engineers with experience in large technology companies as well as smaller start-ups, and it really depends on your specific skillset and capabilities. Aside from specific industry experience, it also helps you stand out if you have been a contributor to open source projects, or have a strong educational background.',
        defaultOpen: defaultIsOpen,
      },
      {
        id: 6,
        question: 'How much time does it take to become approved as a Flexhire freelancer?',
        answer: 'Once you complete our sign up process, your profile is submitted for review by our team of experts. This process can take up to a week, but we will keep you informed at each step along the way.',
        defaultOpen: defaultIsOpen,
      },
      {
        id: 7,
        question: 'How quickly will my profile show up in job searches?',
        answer: 'Once you are approved in our system, your first task will be to set your rate and availability. As soon as you have done that you will start instantly appearing in job search results for our clients. You may also choose to remove your account from showing up in search results at any time, and reactivate it again at your discretion.',
        defaultOpen: defaultIsOpen,
      },
      {
        id: 8,
        question: 'Can I accept multiple jobs at once?',
        answer: 'Absolutely. Your profile will continue to show up in job searches until you decide otherwise. You decide when your capacity is fully booked, and whether or not you want to accept jobs from multiple clients at once.',
        defaultOpen: defaultIsOpen,
      },
      {
        id: 9,
        question: 'Should I expect to be interviewed as part of the hiring process?',
        answer: 'Yes you should. The interview process is built into our overall candidate hiring process. While we provide you the ability to give our clients a preview of your skills and experience through our short video interview, we fully expect that our clients will formally interview you covering specific technology skills, communication skills and cultural fit as you would expect for any job.',
        defaultOpen: defaultIsOpen,
      },
      {
        id: 10,
        question: 'How do I get paid?',
        answer: 'All payment is automated through our platform. You submit work reports to your clients at the end of every week you work, and you get paid through our automated payment platform no matter where you are based in the world.',
        defaultOpen: defaultIsOpen,
      },
      {
        id: 11,
        question: 'What is the payment date?',
        answer: 'Most of the time, Work reports are paid to Freelancers as soon as the relevant Invoice has been paid by the Client, which happens within 10 days. The exact timeframe can vary and is displayed to the Member at the interview or offer stage when negotiating a contract, and in the work report management page for active contracts.',
        defaultOpen: defaultIsOpen,
      },
    ],
  },
]

export default faqContent
