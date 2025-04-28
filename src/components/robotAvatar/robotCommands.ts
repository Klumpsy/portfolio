
export interface RobotAction {
    id: string;
    name: string;
    icon: string;
    message: string;
    animation: string;
  }
  
  export interface RobotColor {
    id: string;
    name: string;
    hexValue: number;
    className: string;
    message: string;
  }
  
  export interface RobotFAQ {
    id: string;
    question: string;
    answer: string;
  }
  
  export interface RobotAccessory {
    id: string;
    name: string;
    icon: string;
    activeClass: string;
    inactiveClass: string;
    equippedMessage: string;
    unequippedMessage: string;
  }
  
  export interface RobotInteraction {
    selector: string;
    message: string;
    action?: string;
  }
  
  // Robot actions
  export const ROBOT_ACTIONS: RobotAction[] = [
    {
      id: 'dance',
      name: 'Dance',
      icon: '💃',
      message: "Look at my sweet dance moves! 💃",
      animation: 'dance'
    },
    {
      id: 'spin',
      name: 'Spin',
      icon: '🌀',
      message: "Wheeeeee! I'm spinning! 🌀",
      animation: 'spin'
    },
    {
      id: 'jump',
      name: 'Jump',
      icon: '🦘',
      message: "Boing! Boing! Watch me jump! 🦘",
      animation: 'jump'
    },
    {
      id: 'dizzy',
      name: 'Dizzy',
      icon: '😵‍💫',
      message: "Whoa... I'm feeling dizzy... 😵‍💫",
      animation: 'dizzy'
    }
  ];
  
  // Robot colors
  export const ROBOT_COLORS: RobotColor[] = [
    {
      id: 'blue',
      name: 'Blue',
      hexValue: 0x3b82f6,
      className: 'bg-blue-500',
      message: "Blue is my favorite color! Just like TypeScript's logo!"
    },
    {
      id: 'green',
      name: 'Green',
      hexValue: 0x10b981,
      className: 'bg-green-500',
      message: "Green means go! Let's explore Bart's projects!"
    },
    {
      id: 'red',
      name: 'Red',
      hexValue: 0xef4444,
      className: 'bg-red-500',
      message: "Red hot and ready to guide you through this portfolio!"
    },
    {
      id: 'purple',
      name: 'Purple',
      hexValue: 0xa855f7,
      className: 'bg-purple-500',
      message: "Purple is the color of creativity, let's create something amazing together!"
    }
  ];
  
  export const ROBOT_ACCESSORIES: RobotAccessory[] = [
    {
      id: 'mustache',
      name: 'Mustache',
      icon: '👨',
      activeClass: 'bg-indigo-500 text-white',
      inactiveClass: 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200',
      equippedMessage: "How do you like my mustache? Very distinguished, no?",
      unequippedMessage: "Removing my fancy mustache!"
    },
    {
      id: 'sunglasses',
      name: 'Sunglasses',
      icon: '😎',
      activeClass: 'bg-teal-500 text-white',
      inactiveClass: 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200',
      equippedMessage: "These sunglasses make me look like a movie star, right?",
      unequippedMessage: "Taking off my cool shades!"
    }
  ];
  
  export const ROBOT_FAQ: RobotFAQ[] = [
    {
      id: 'proud',
      question: "What is Bart most proud of?",
      answer: "Bart is most proud of Hondenkunde website! He runs it with his girlfriend and it's the perfect side project for them."
    },
    {
      id: 'language',
      question: "What is Bart's favorite programming language?",
      answer: "JavaScript is Bart's favorite, but with the addition of TypeScript to make it even better!"
    },
    {
      id: 'hobbies',
      question: "What are Bart's hobbies?",
      answer: "Besides programming, Bart enjoys practicing judo and taking care of animals and plants!"
    }
  ];
  
  export const ROBOT_INTERACTIONS: RobotInteraction[] = [
    {
      selector: '#robo-profile-image',
      message: "Yeah, that's me! Looking good, don't you think? 😎",
    },
    {
      selector: '#robo-github-link',
      message: "Check out my GitHub repositories! Lots of cool code there!",
    },
    {
      selector: '#robo-tech-skills',
      message: "Check out Bart's tech skills, that's quite a list, but it doesnt mean he's a master at all of them ofcourse! Always eager to learn new technologies, and get better at the ones he already knows!",
    },
    {
      selector: '#robo-linkedin-link',
      message: "Connect with me on LinkedIn! Always happy to network!",
    },
    {
      selector: '#robo-email-link',
      message: "Feel free to send me an email if you want to work together!",
      action: 'jump'
    },
    {
      selector: '#robo-featured-projects',
      message: "These are some of my favorite projects. Take a look!",
      action: 'dance'
    }
  ];
  
  // Welcome messages
  export const WELCOME_MESSAGES = [
    "Hello! I'm Bart's robot assistant! 👋",
    "Welcome to Bart's portfolio! Need help navigating?",
    "Hi there! I'm here to show you around Bart's work!",
    "Greetings, visitor! Let me tell you about Bart's projects!"
  ];
  
  export const getRandomWelcomeMessage = (): string => {
    const randomIndex = Math.floor(Math.random() * WELCOME_MESSAGES.length);
    return WELCOME_MESSAGES[randomIndex];
  };
  
  export const getTimeBasedGreeting = (): string => {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      return "Good morning! Starting the day with some code? ☕";
    } else if (hour < 18) {
      return "Good afternoon! Perfect time to check out my projects! 🌞";
    } else {
      return "Good evening! Thanks for visiting my portfolio tonight! 🌙";
    }
  };