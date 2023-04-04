export default {
  hello: 'Hello World',
  ctas: {
    learnMore: 'Learn More',
    readMore: 'Read More',
    viewAll: 'View All',
    loadMore: 'Load More',
    visitSite: 'Visit Site',
    share: 'Share',
    applyNow: 'Apply Now',
    backToOverview: 'Back to Overview',
    reload: 'Reload',
    joinNow: 'Join Now',
    allNews: 'All News',
  },
  form: {
    name: 'Firstname',
    fullName: 'Fullname',
    email: 'E-Mail',
    contactOptionsLabel: 'I am',
    selectLabel: 'Please select',
    chooseCategory: 'Choose Category',
    otherSelectLabel: 'How can we help you?',
    portfolioUrl: 'Portfolio URL (if applicable)',
    fileNotes: 'A .pdf or .doc resume is required - Max File Upload Size is 5MB.',
    location: 'Location',
    phone: 'Phone',
    error: 'Please input valid E-Mail adress.',
    join: 'Join',
    cancel: 'Cancel',
    send: 'Send',
    resume: 'Resume',
    message: 'Message',
    interest: 'What are you interested in?',
    contactCategories: [
      {
        label: 'I want to build on Casper',
        value: 'build-on-casper',
      },
      {
        label: 'I want to give feedback',
        value: 'give-feedback',
      },
      {
        label: 'I want to apply for a grant',
        value: 'apply-for-grant',
      },
      {
        label: 'I want to introduce my project',
        value: 'introduce-project',
      },
    ],
    newsletter: {
      confirm: 'I agree to receive communications from Casper Association.',
      legal: 'Casper Association is committed to protecting and respecting your privacy. You can unsubscribe from these communications at any time.<br/> For more information on how to unsubscribe, our privacy practices, and how we are committed to protecting and respecting your privacy, please review our <a href="/en-us/privacy-policy">Privacy Policy</a>.<br/> By clicking submit below, you consent to allow Casper Association to store and process the personal information submitted above to provide you the content requested.',
      success: 'Thanks for signing up for our newsletter!<br/>To ensure we have your correct email address and to comply with GDPR regulations,<br/> please confirm your subscription by clicking the link in the email we just sent you.',
    },
    legal: {
      contact: '<a href="/en-us/privacy-policy">Privacy Policy</a>',
    },
  },
  formErrors: {
    required: 'This field is required.',
  },
  formSuccess: 'Thank you. You will receive an email confirmation shortly.',
  formFailure: 'Something went wrong. Please try again.',
  titles: {
    relatedApplications: 'Related <span>Applications</span>',
    relatedNews: 'Related <span>News</span>',
    relatedCasestudies: 'Related <span>Case Studies</span>',
    resultsFound: 'Results found: ',
  },

  general: {
    by: 'BY',
    overview: 'Overview',
  },
  locales: {
    en: 'English',
    de: 'German',
  },
  social: {
    discord: 'https://discord.com/invite/Q38s3Vh',
    twitter: 'https://twitter.com/Casper_Network',
    linkedin: 'https://www.linkedin.com/company/casper-association/',
    youtube: 'https://www.youtube.com/c/CasperNetwork',
    telegram: 'https://t.me/casperblockchain',
    github: 'https://github.com/casper-network',
  },
  navigation: [
    {
      title: 'Community',
      url: 'community',
      type: 'int',
    },
    {
      title: 'Case Studies',
      url: 'case-studies',
      type: 'int',
    },
    {
      title: 'Ecosystem',
      url: 'ecosystem',
      type: 'int',
      children: [
        {
          title: 'Grant Program',
          url: 'lp/accelerate-grant-program',
          type: 'int',
        },
      ],
    },
    {
      title: 'Build',
      url: 'documentation',
      type: 'int',
      children: [
        {
          title: 'Developer Portal',
          url: 'https://developer.casper.network/',
          type: 'ext',
        },
        {
          title: 'Documentation',
          url: 'https://docs.casper.network/',
          type: 'ext',
        },
      ],
    },
    {
      title: 'News',
      url: 'news',
      type: 'int',
    },
    {
      title: 'About us',
      url: '',
      type: '',
      children: [
        {
          title: 'Casper',
          url: 'casper',
          type: 'int',
        },
        {
          title: 'Vision',
          url: 'vision',
          type: 'int',
        },
        {
          title: 'Team',
          url: 'team',
          type: 'int',
        },
        {
          title: 'Career',
          url: 'career',
          type: 'int',
        },
      ],
    },
    {
      title: 'Get started',
      url: 'get-started',
      class: 'special',
      type: 'int',
    },
  ],
  footer: {
    socialTitle: 'Join our<br/><span>Community</span>',
    nav1Title: 'Get in touch',
    nav2Title: 'What\'s possible',
    nav3Title: 'Developers',
    nav1Content: [
      {
        title: 'Community',
        url: 'community',
        type: 'int',
      },
      {
        title: 'Newsletter subscription',
        url: 'newsletter',
        type: 'int',
      },
      {
        title: 'Contact',
        url: 'contact',
        type: 'int',
      },
      {
        title: 'Press & Media',
        url: 'press-and-media',
        type: 'int',
      },
    ],
    nav2Content: [
      {
        title: 'Ecosystem',
        url: 'ecosystem',
        type: 'int',
      },
      {
        title: 'Grant Program',
        url: 'lp/accelerate-grant-program',
        type: 'int',
      },
      {
        title: 'Case Studies',
        url: 'case-studies',
        type: 'int',
      },
    ],
    nav3Content: [
      {
        title: 'Get Started',
        url: 'get-started',
        type: 'int',
      },
      {
        title: 'Documentation',
        url: 'documentation',
        type: 'int',
      },
      /*
      {
        title: 'Membership Portal',
        url: 'https://members.casper.network/',
        type: 'ext',
      },
      */
      {
        title: 'Whitepaper',
        url: 'https://arxiv.org/pdf/2101.02159.pdf',
        type: 'ext',
      },
    ],
    nav4Content: [
      { title: 'Terms of Use', url: 'terms-of-use' },
      { title: 'Privacy Policy', url: 'privacy-policy' },
    ],
  },
};
