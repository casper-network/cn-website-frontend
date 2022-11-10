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
    newsletterOptions: ['Web3 Developer', 'Web2 Developer', 'Validator', 'Blockchain Newbie', 'Blockchain Expert', 'Crypto Enthusiast', 'NFT Enthusiast'],
    otherOptions: [''],
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
    legal: {
      newsletter: 'You can withdraw your consent at any time by sending an e-mail to <a href="mailto:withdraw@casper.network">withdraw@casper.network</a>.<br/> For further information see the <a href="/en-us/privacy-policy">Data Privacy Policy</a>.',
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
    },
    {
      title: 'Documentation',
      url: 'documentation',
      type: 'int',
      children: [
        {
          title: 'How to',
          url: 'https://docs.casperlabs.io/workflow/',
          type: 'ext',
        },
        {
          title: 'Develop',
          url: 'https://docs.casperlabs.io/dapp-dev-guide/',
          type: 'ext',
        },
        {
          title: 'Operator',
          url: 'https://docs.casperlabs.io/operators/',
          type: 'ext',
        },
        {
          title: 'Design',
          url: 'https://docs.casperlabs.io/design/',
          type: 'ext',
        },
        {
          title: 'Economics',
          url: 'https://docs.casperlabs.io/economics/',
          type: 'ext',
        },
        {
          title: 'Staking',
          url: 'https://docs.casperlabs.io/staking/',
          type: 'ext',
        },
        {
          title: 'Glossary',
          url: 'https://docs.casperlabs.io/glossary/',
          type: 'ext',
        },
        {
          title: 'FAQ',
          url: 'https://docs.casperlabs.io/faq/',
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
  countries: [
    {
      code: 'Afghanistan',
      label: 'Afghanistan',
    },
    {
      code: 'Albania',
      label: 'Albania',
    },
    {
      code: 'Algeria',
      label: 'Algeria',
    },
    {
      code: 'Andorra',
      label: 'Andorra',
    },
    {
      code: 'Angola',
      label: 'Angola',
    },
    {
      code: 'Antigua and Barbuda',
      label: 'Antigua and Barbuda',
    },
    {
      code: 'Argentina',
      label: 'Argentina',
    },
    {
      code: 'Armenia',
      label: 'Armenia',
    },
    {
      code: 'Australia',
      label: 'Australia',
    },
    {
      code: 'Austria',
      label: 'Austria',
    },
    {
      code: 'Azerbaijan',
      label: 'Azerbaijan',
    },
    {
      code: 'Bahamas',
      label: 'Bahamas',
    },
    {
      code: 'Bahrain',
      label: 'Bahrain',
    },
    {
      code: 'Bangladesh',
      label: 'Bangladesh',
    },
    {
      code: 'Barbados',
      label: 'Barbados',
    },
    {
      code: 'Belarus',
      label: 'Belarus',
    },
    {
      code: 'Belgium',
      label: 'Belgium',
    },
    {
      code: 'Belize',
      label: 'Belize',
    },
    {
      code: 'Benin',
      label: 'Benin',
    },
    {
      code: 'Bhutan',
      label: 'Bhutan',
    },
    {
      code: 'Bolivia',
      label: 'Bolivia',
    },
    {
      code: 'Bosnia and Herzegovina',
      label: 'Bosnia and Herzegovina',
    },
    {
      code: 'Botswana',
      label: 'Botswana',
    },
    {
      code: 'Brazil',
      label: 'Brazil',
    },
    {
      code: 'Brunei Darussalam',
      label: 'Brunei Darussalam',
    },
    {
      code: 'Bulgaria',
      label: 'Bulgaria',
    },
    {
      code: 'Burkina Faso',
      label: 'Burkina Faso',
    },
    {
      code: 'Burundi',
      label: 'Burundi',
    },
    {
      code: 'Cabo Verde',
      label: 'Cabo Verde',
    },
    {
      code: 'Cambodia',
      label: 'Cambodia',
    },
    {
      code: 'Cameroon',
      label: 'Cameroon',
    },
    {
      code: 'Canada',
      label: 'Canada',
    },
    {
      code: 'Central African Republic',
      label: 'Central African Republic',
    },
    {
      code: 'Chad',
      label: 'Chad',
    },
    {
      code: 'Chile',
      label: 'Chile',
    },
    {
      code: 'China',
      label: 'China',
    },
    {
      code: 'Colombia',
      label: 'Colombia',
    },
    {
      code: 'Comoros',
      label: 'Comoros',
    },
    {
      code: 'Congo',
      label: 'Congo',
    },
    {
      code: 'Costa Rica',
      label: 'Costa Rica',
    },
    {
      code: 'Côte d\'Ivoire',
      label: 'Côte d\'Ivoire',
    },
    {
      code: 'Croatia',
      label: 'Croatia',
    },
    {
      code: 'Cuba',
      label: 'Cuba',
    },
    {
      code: 'Cyprus',
      label: 'Cyprus',
    },
    {
      code: 'Czechia',
      label: 'Czechia',
    },
    {
      code: 'Democratic People\'s Republic of Korea',
      label: 'Democratic People\'s Republic of Korea',
    },
    {
      code: 'Democratic Republic of the Congo',
      label: 'Democratic Republic of the Congo',
    },
    {
      code: 'Denmark',
      label: 'Denmark',
    },
    {
      code: 'Djibouti',
      label: 'Djibouti',
    },
    {
      code: 'Dominica',
      label: 'Dominica',
    },
    {
      code: 'Dominican Republic',
      label: 'Dominican Republic',
    },
    {
      code: 'Ecuador',
      label: 'Ecuador',
    },
    {
      code: 'Egypt',
      label: 'Egypt',
    },
    {
      code: 'El Salvador',
      label: 'El Salvador',
    },
    {
      code: 'Equatorial Guinea',
      label: 'Equatorial Guinea',
    },
    {
      code: 'Eritrea',
      label: 'Eritrea',
    },
    {
      code: 'Estonia',
      label: 'Estonia',
    },
    {
      code: 'Eswatini',
      label: 'Eswatini',
    },
    {
      code: 'Ethiopia',
      label: 'Ethiopia',
    },
    {
      code: 'Fiji',
      label: 'Fiji',
    },
    {
      code: 'Finland',
      label: 'Finland',
    },
    {
      code: 'France',
      label: 'France',
    },
    {
      code: 'Gabon',
      label: 'Gabon',
    },
    {
      code: 'Gambia',
      label: 'Gambia',
    },
    {
      code: 'Georgia',
      label: 'Georgia',
    },
    {
      code: 'Germany',
      label: 'Germany',
    },
    {
      code: 'Ghana',
      label: 'Ghana',
    },
    {
      code: 'Greece',
      label: 'Greece',
    },
    {
      code: 'Grenada',
      label: 'Grenada',
    },
    {
      code: 'Guatemala',
      label: 'Guatemala',
    },
    {
      code: 'Guinea',
      label: 'Guinea',
    },
    {
      code: 'Guinea-Bissau',
      label: 'Guinea-Bissau',
    },
    {
      code: 'Guyana',
      label: 'Guyana',
    },
    {
      code: 'Haiti',
      label: 'Haiti',
    },
    {
      code: 'Honduras',
      label: 'Honduras',
    },
    {
      code: 'Hungary',
      label: 'Hungary',
    },
    {
      code: 'Iceland',
      label: 'Iceland',
    },
    {
      code: 'India',
      label: 'India',
    },
    {
      code: 'Indonesia',
      label: 'Indonesia',
    },
    {
      code: 'Iran',
      label: 'Iran',
    },
    {
      code: 'Iraq',
      label: 'Iraq',
    },
    {
      code: 'Ireland',
      label: 'Ireland',
    },
    {
      code: 'Israel',
      label: 'Israel',
    },
    {
      code: 'Italy',
      label: 'Italy',
    },
    {
      code: 'Jamaica',
      label: 'Jamaica',
    },
    {
      code: 'Japan',
      label: 'Japan',
    },
    {
      code: 'Jordan',
      label: 'Jordan',
    },
    {
      code: 'Kazakhstan',
      label: 'Kazakhstan',
    },
    {
      code: 'Kenya',
      label: 'Kenya',
    },
    {
      code: 'Kiribati',
      label: 'Kiribati',
    },
    {
      code: 'Kuwait',
      label: 'Kuwait',
    },
    {
      code: 'Kyrgyzstan',
      label: 'Kyrgyzstan',
    },
    {
      code: 'Lao People\'s Democratic Republic',
      label: 'Lao People\'s Democratic Republic',
    },
    {
      code: 'Latvia',
      label: 'Latvia',
    },
    {
      code: 'Lebanon',
      label: 'Lebanon',
    },
    {
      code: 'Lesotho',
      label: 'Lesotho',
    },
    {
      code: 'Liberia',
      label: 'Liberia',
    },
    {
      code: 'Libya',
      label: 'Libya',
    },
    {
      code: 'Liechtenstein',
      label: 'Liechtenstein',
    },
    {
      code: 'Lithuania',
      label: 'Lithuania',
    },
    {
      code: 'Luxembourg',
      label: 'Luxembourg',
    },
    {
      code: 'Madagascar',
      label: 'Madagascar',
    },
    {
      code: 'Malawi',
      label: 'Malawi',
    },
    {
      code: 'Malaysia',
      label: 'Malaysia',
    },
    {
      code: 'Maldives',
      label: 'Maldives',
    },
    {
      code: 'Mali',
      label: 'Mali',
    },
    {
      code: 'Malta',
      label: 'Malta',
    },
    {
      code: 'Marshall Islands',
      label: 'Marshall Islands',
    },
    {
      code: 'Mauritania',
      label: 'Mauritania',
    },
    {
      code: 'Mauritius',
      label: 'Mauritius',
    },
    {
      code: 'Mexico',
      label: 'Mexico',
    },
    {
      code: 'Micronesia',
      label: 'Micronesia',
    },
    {
      code: 'Monaco',
      label: 'Monaco',
    },
    {
      code: 'Mongolia',
      label: 'Mongolia',
    },
    {
      code: 'Montenegro',
      label: 'Montenegro',
    },
    {
      code: 'Morocco',
      label: 'Morocco',
    },
    {
      code: 'Mozambique',
      label: 'Mozambique',
    },
    {
      code: 'Myanmar',
      label: 'Myanmar',
    },
    {
      code: 'Namibia',
      label: 'Namibia',
    },
    {
      code: 'Nauru',
      label: 'Nauru',
    },
    {
      code: 'Nepal',
      label: 'Nepal',
    },
    {
      code: 'Netherlands',
      label: 'Netherlands',
    },
    {
      code: 'New Zealand',
      label: 'New Zealand',
    },
    {
      code: 'Nicaragua',
      label: 'Nicaragua',
    },
    {
      code: 'Niger',
      label: 'Niger',
    },
    {
      code: 'Nigeria',
      label: 'Nigeria',
    },
    {
      code: 'North Macedonia',
      label: 'North Macedonia',
    },
    {
      code: 'Norway',
      label: 'Norway',
    },
    {
      code: 'Oman',
      label: 'Oman',
    },
    {
      code: 'Pakistan',
      label: 'Pakistan',
    },
    {
      code: 'Palau',
      label: 'Palau',
    },
    {
      code: 'Panama',
      label: 'Panama',
    },
    {
      code: 'Papua New Guinea',
      label: 'Papua New Guinea',
    },
    {
      code: 'Paraguay',
      label: 'Paraguay',
    },
    {
      code: 'Peru',
      label: 'Peru',
    },
    {
      code: 'Philippines',
      label: 'Philippines',
    },
    {
      code: 'Poland',
      label: 'Poland',
    },
    {
      code: 'Portugal',
      label: 'Portugal',
    },
    {
      code: 'Qatar',
      label: 'Qatar',
    },
    {
      code: 'Republic of Korea',
      label: 'Republic of Korea',
    },
    {
      code: 'Republic of Moldova',
      label: 'Republic of Moldova',
    },
    {
      code: 'Romania',
      label: 'Romania',
    },
    {
      code: 'Russian Federation',
      label: 'Russian Federation',
    },
    {
      code: 'Rwanda',
      label: 'Rwanda',
    },
    {
      code: 'Saint Kitts and Nevis',
      label: 'Saint Kitts and Nevis',
    },
    {
      code: 'Saint Lucia',
      label: 'Saint Lucia',
    },
    {
      code: 'Saint Vincent and the Grenadines',
      label: 'Saint Vincent and the Grenadines',
    },
    {
      code: 'Samoa',
      label: 'Samoa',
    },
    {
      code: 'San Marino',
      label: 'San Marino',
    },
    {
      code: 'Sao Tome and Principe',
      label: 'Sao Tome and Principe',
    },
    {
      code: 'Saudi Arabia',
      label: 'Saudi Arabia',
    },
    {
      code: 'Senegal',
      label: 'Senegal',
    },
    {
      code: 'Serbia',
      label: 'Serbia',
    },
    {
      code: 'Seychelles',
      label: 'Seychelles',
    },
    {
      code: 'Sierra Leone',
      label: 'Sierra Leone',
    },
    {
      code: 'Singapore',
      label: 'Singapore',
    },
    {
      code: 'Slovakia',
      label: 'Slovakia',
    },
    {
      code: 'Slovenia',
      label: 'Slovenia',
    },
    {
      code: 'Solomon Islands',
      label: 'Solomon Islands',
    },
    {
      code: 'Somalia',
      label: 'Somalia',
    },
    {
      code: 'South Africa',
      label: 'South Africa',
    },
    {
      code: 'South Sudan',
      label: 'South Sudan',
    },
    {
      code: 'Spain',
      label: 'Spain',
    },
    {
      code: 'Sri Lanka',
      label: 'Sri Lanka',
    },
    {
      code: 'Sudan',
      label: 'Sudan',
    },
    {
      code: 'Suriname',
      label: 'Suriname',
    },
    {
      code: 'Sweden',
      label: 'Sweden',
    },
    {
      code: 'Switzerland',
      label: 'Switzerland',
    },
    {
      code: 'Syrian Arab Republic',
      label: 'Syrian Arab Republic',
    },
    {
      code: 'Tajikistan',
      label: 'Tajikistan',
    },
    {
      code: 'Thailand',
      label: 'Thailand',
    },
    {
      code: 'Timor-Leste',
      label: 'Timor-Leste',
    },
    {
      code: 'Togo',
      label: 'Togo',
    },
    {
      code: 'Tonga',
      label: 'Tonga',
    },
    {
      code: 'Trinidad and Tobago',
      label: 'Trinidad and Tobago',
    },
    {
      code: 'Tunisia',
      label: 'Tunisia',
    },
    {
      code: 'Turkey',
      label: 'Turkey',
    },
    {
      code: 'Turkmenistan',
      label: 'Turkmenistan',
    },
    {
      code: 'Tuvalu',
      label: 'Tuvalu',
    },
    {
      code: 'Uganda',
      label: 'Uganda',
    },
    {
      code: 'Ukraine',
      label: 'Ukraine',
    },
    {
      code: 'United Arab Emirates',
      label: 'United Arab Emirates',
    },
    {
      code: 'United Kingdom of Great Britain and Northern Ireland',
      label: 'United Kingdom of Great Britain and Northern Ireland',
    },
    {
      code: 'United Republic of Tanzania',
      label: 'United Republic of Tanzania',
    },
    {
      code: 'United States of America',
      label: 'United States of America',
    },
    {
      code: 'Uruguay',
      label: 'Uruguay',
    },
    {
      code: 'Uzbekistan',
      label: 'Uzbekistan',
    },
    {
      code: 'Vanuatu',
      label: 'Vanuatu',
    },
    {
      code: 'Venezuela',
      label: 'Venezuela',
    },
    {
      code: 'Viet Nam',
      label: 'Viet Nam',
    },
    {
      code: 'Yemen',
      label: 'Yemen',
    },
    {
      code: 'Zambia',
      label: 'Zambia',
    },
    {
      code: 'Zimbabwe',
      label: 'Zimbabwe',
    },
  ],
};
