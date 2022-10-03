import vt_logo from './work_images/vt_dining_services.png'
import capital_one_logo from './work_images/capital_one.png'
import colonial_parking_logo from './work_images/colonial_parking.png'
import discord_freelance_logo from './work_images/discord_freelance.png'
import lost_skies_image from './project_images/lost_skies.png'
import switch_streaming_image from './project_images/switch_stream.png'
import map_maker_image from './project_images/map_maker.png'
import dbd_hub_image from './project_images/dbd_hub.ico'
import calendar_tasks_image from './project_images/calendar_tasks.png'
import personal_site_image from './project_images/personal_site.jpg'
import georgia_tech_logo from './work_images/georgia_tech.png'
import traffic_sim_image from './project_images/traffic_sim.png'
import music_data_to_spreadsheet_image from './project_images/music_data_to_spreadsheet.png'
import unraid_image from './project_images/unraid.png'
import AccountTree from "@mui/icons-material/AccountTree"
import Storage from "@mui/icons-material/Storage"
import Cloud from "@mui/icons-material/Cloud"
import Lock from "@mui/icons-material/Lock"
import Code from "@mui/icons-material/Code"
import LanguageIcon from '@mui/icons-material/Language';
import DeveloperBoard from '@mui/icons-material/DeveloperBoard';
import HomeRepairService from '@mui/icons-material/HomeRepairService';

class EmploymentType {
    static full_time = new EmploymentType("Full-time")
    static part_time = new EmploymentType("Part-time")
    static freelance = new EmploymentType("Freelance")

    constructor(string) {
        this.string = string
    }
}

const jobs = [
    {
        title: 'Associate Software Engineer',
        department: 'Card Tech',
        company: 'Capital One',
        card_image: capital_one_logo,
        employment_type: EmploymentType.full_time.string,
        start_date: '08/26/2021',
        end_date: null,
        currently_working: true,
        one_liner: 'Working on the automated product decisioning and orchestration for C1\'s credit offering system, hosted in the cloud.',
        info: [
            'Back-end developer for Capital One\'s Product Decisioning Team which develops and maintains a multi-tiered orchestration framework that provides a simple, modular design process for product decisions and credit offerings.',
            'I am responsible for feature development, vulnerability remediation, staying up to date with the latest security offerings, and consistent / CI-dependent releases to Amazon Web Services.',
            'We support dozens of client teams in house both through on-call support and team knowledge transfers as our tool is widely used throughout the Capital One space.',
        ],
        tools_used: [
            {
                primary: "CI/CD",
                secondary: '',
                icon: <AccountTree />,
                list: [
                    "Github Approvals",
                    "Enterprise Jenkins",
                    "In-House Solutions",
                ],
            },
            {
                primary: "Data",
                secondary: '',
                icon: <Storage />,
                list: [
                    "Splunk",
                    "Confluence",
                    "New Relic",
                    "In-House Solutions"
                ],
            },
            {
                primary: "Cloud",
                secondary: '',
                icon: <Cloud />,
                list: [
                    "AWS EC2",
                    "AWS ECS",
                    "AWS Lambda",
                    "AWS RDS",
                    "AWS IAM",
                    "AWS CloudWatch",
                    "AWS CloudTrail",
                ],
            },
            {
                primary: "Security",
                secondary: '',
                icon: <Lock />,
                list: [
                    "CloudSentry",
                    "WhiteSource",
                    "Checkmarx",
                ],
            },
            {
                primary: "Development",
                secondary: '',
                icon: <Code />,
                list: [
                    "Apache Maven",
                    "Docker",
                    "Git",
                    "IntelliJ IDEA",
                    "DBeaver"
                ]
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "Java",
                    "PostgreSQL",
                    "ZShell",
                ]
            },
        ]
    },
    {
        title: 'Teaching Assistant',
        department: 'Computer Science',
        company: 'Virginia Tech',
        card_image: vt_logo,
        employment_type: EmploymentType.part_time.string,
        start_date: '01/12/2021',
        end_date: '05/26/2021',
        currently_working: false,
        one_liner: 'Assisted teaching an Introduction to Web Development and GUI course at Virginia Tech.',
        info: [
            'Met weekly with students to help them get stronger understanding in front-end design concepts',
            'Held regular office hours for students to come and ask questions about the course content',
            'Grade classwork and evaluate student performance',
        ],
        tools_used: [
            {
                primary: "Development",
                secondary: '',
                icon: <Code />,
                list: [
                    "Unity 3D",
                    "Git",
                    "IntelliJ IDEA",
                ]
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "C#",
                    "HTML / CSS",
                    "JavaScript",
                ]
            },
        ]
    },
    {
        title: 'Software Engineer Intern',
        department: 'Enterprise Platform & Product',
        company: 'Capital One',
        card_image: capital_one_logo,
        employment_type: EmploymentType.full_time.string,
        start_date: '05/26/2021',
        end_date: '08/26/2021',
        currently_working: false,
        one_liner: 'Created a diagnosis assistant that was so successful our efforts were replicated in other lines of business.',
        info: [
            'Rebuilt an existing tool to be multi-threaded and quickly debug large, complex Maven projects based on in-house solutions. Reduced support time to find issues in the projects from 1hr+ to <5 minutes',
            'Improved an existing Slack bot using AWS Lambda to track common sources of support requests, common keywords to determine where customers need the most assistance, and a system to track issues and mark them as resolved',
            'Integrated the multi-threaded debugging tool into the Slack bot using Enterprise Jenkins and S3, which allowed customers to take advantage of it directly and get user-friendly, stylized output via static HTML on S3; significantly reduced support required from the development team',
            'Worked in an agile development environment using Jira to track sprints and stories',
        ],
        tools_used: [
            {
                primary: "CI/CD",
                secondary: '',
                icon: <AccountTree />,
                list: [
                    "Github Approvals",
                    "Enterprise Jenkins",
                    "In-House Solutions",
                ],
            },
            {
                primary: "Data",
                secondary: '',
                icon: <Storage />,
                list: [
                    "Splunk",
                    "Confluence",
                    "DataDog",
                    "In-House Solutions"
                ],
            },
            {
                primary: "Cloud",
                secondary: '',
                icon: <Cloud />,
                list: [
                    "AWS Lambda",
                    "AWS IAM",
                    "AWS CloudWatch",
                    "AWS CloudTrail",
                ],
            },
            {
                primary: "Security",
                secondary: '',
                icon: <Lock />,
                list: [
                    "CloudSentry",
                    "WhiteSource",
                    "Checkmarx",
                ],
            },
            {
                primary: "Development",
                secondary: '',
                icon: <Code />,
                list: [
                    "NPM",
                    "Git",
                    "IntelliJ IDEA"
                ]
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "Node.js",
                    "TypeScript",
                    "ZShell",
                ]
            },
        ]
    },
    {
        title: 'System Administration / IT Intern',
        department: 'Information Tech',
        company: 'Colonial Parking',
        card_image: colonial_parking_logo,
        employment_type: EmploymentType.full_time.string,
        start_date: '06/01/2019',
        end_date: '03/22/2020',
        currently_working: false,
        one_liner: 'Provided computer and network support for parking locations throughout D.C.',
        info: [
            'Rebuilt an existing tool to be multi-threaded and quickly debug large, complex Maven projects based on in-house solutions. Reduced support time to find issues in the projects from 1hr+ to <5 minutes',
            'Improved an existing Slack bot using AWS Lambda to track common sources of support requests, common keywords to determine where customers need the most assistance, and a system to track issues and mark them as resolved',
            'Integrated the multi-threaded debugging tool into the Slack bot using Enterprise Jenkins and S3, which allowed customers to take advantage of it directly and get user-friendly, stylized output via static HTML on S3; significantly reduced support required from the development team',
            'Worked in an agile development environment using Jira to track sprints and stories',
        ],
        tools_used: [
            {
                primary: "Data",
                secondary: '',
                icon: <Storage />,
                list: [
                    "HelpDesk",
                    "LDAP",
                    "IT Glue",
                ],
            },
            {
                primary: "Security",
                secondary: '',
                icon: <Lock />,
                list: [
                    "Microsoft Active Directory",
                    "Office 365",
                    "Checkmarx",
                ],
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "Bash",
                ]
            },
        ]
    },
    {
        title: 'Bot Designer',
        department: 'Marketing',
        company: 'Blue Cascade Co.',
        card_image: discord_freelance_logo,
        employment_type: EmploymentType.freelance.string,
        start_date: '11/18/2018',
        end_date: '01/22/2019',
        currently_working: false,
        one_liner: 'Rapidly stood up Discord bots integrated various social media platforms for the company\'s public server on demand.',
        info: [
            'Wrote Javascript bots for the company\'s public Discord Server to automate several processes',
            'Utilized the Reddit PRAW API to program Python scripts to advertise the server',
            'Coordinated with a marketing team to optimize postings',
        ],
        tools_used: [
            {
                primary: "Data",
                secondary: '',
                icon: <Storage />,
                list: [
                    "Reddit PRAW",
                ],
            },
            {
                primary: "Cloud",
                secondary: '',
                icon: <Cloud />,
                list: [
                    "Heroku",
                    "AWS EC2",
                ],
            },
            {
                primary: "Development",
                secondary: '',
                icon: <Code />,
                list: [
                    "NPM",
                    "Git",
                    "IntelliJ IDEA"
                ]
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "Node.js",
                    "Python",
                    "Bash",
                ]
            },
        ]
    },
]

const projects = [
    {
        title: 'unRAID Server',
        title_link: '',
        card_image: unraid_image,
        project_type: 'DevOps / Architecture Development',
        start_date: '04/21/2022',
        last_updated: '10/03/2022',
        currently_maintaining: false,
        one_liner: 'A server used to maintain media, Docker applications, and virtual machines.',
        info: [
            'Modified a front-end presentation container (DashMachine) to display Docker container statistics',
            'Created a secure Docker stack to isolate private applications from the Internet while still making them indirectly accessible through NGINX',
            'Plex Server with Radarr and Sonarr to host, play, and track media',
            'Configured Ubuntu virtual machine with PCIe Passthrough to run repeatable tasks and host the Nintendo Switch Streaming project',
        ],
        tools_used: [
            {
                primary: 'Development',
                secondary: '',
                icon: <Code />,
                list: [
                    'uNRAID',
                    'Docker',
                    'Ubuntu',
                    'NGINX Reverse Proxy',
                    'noVNC',
                ]
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "Shell",
                    "Golang",
                    "Node.js",
                    "Python",
                ]
            },
        ],
    },
    {
        title: 'Lost Skies',
        title_link: 'https://charles.zawackis.com/lost_skies/InspireJam.html',
        card_image: lost_skies_image,
        project_type: 'Game Design / Full Stack Development',
        start_date: '02/19/2022',
        last_updated: '03/01/2022',
        currently_maintaining: false,
        one_liner: 'An action-strategy game developed in about a week for InspireJam 2022; 24th place / ~80 submissions.',
        info: [
            'Developed game using Godot Engine 3.5',
            'Designed game using Event-Component-System Architectural Pattern',
            'Playtested and balanced game with different groups',
            'Designed maps and developed player behavior',
        ],
        tools_used: [
            {
                primary: 'Development',
                secondary: '',
                icon: <Code />,
                list: [
                    'Git',
                    'Godot Engine 3.5',
                    'Tiled',
                    'VS Code',
                    'Godot Editor'
                ]
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "Godot (Python variant)",
                ]
            },
        ],
    },
    {
        title: 'My Portfolio Site',
        title_link: 'https://charles.zawackis.com',
        card_image: personal_site_image,
        project_type: 'Website Development',
        start_date: '08/27/2020',
        last_updated: '10/03/2022',
        currently_maintaining: false,
        one_liner: 'A portfolio site dedicated to presenting my skills, real world experience, higher education, and side projects.',
        info: [
            'Learned to work with new stack for modern web development',
            'Design website modularly to allow easily-built pages',
            'Made people want to hire me',
        ],
        tools_used: [
            {
                primary: 'CI/CD',
                secondary: '',
                icon: <AccountTree />,
                list: [
                    'DeepScan',
                    'Imgbot',
                    'CodeFactor',
                    'GitHub Actions',
                ]
            },
            {
                primary: 'Security',
                secondary: '',
                icon: <Lock />,
                list: [
                    'Nightfall DLP: Github Secrets Scanner',
                    'SonaType DepShield',
                ]
            },
            {
                primary: 'Development',
                secondary: '',
                icon: <Code />,
                list: [
                    'React',
                    'Tailwind CSS',
                    'Material UI',
                    'Git',
                    'Chrome Console',
                    'VS Code',
                ]
            }
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "React.js",
                    "Node.js",
                    "JavaScript",
                    "HTML",
                    "CSS",
                ]
            },
        ],
    },
    {
        title: 'Nintendo Switch Streaming',
        title_link: 'https://github.com/cazwacki/Switch-Streaming',
        card_image: switch_streaming_image,
        project_type: 'Video Streaming / Full Stack Development',
        start_date: '06/11/2021',
        last_updated: '07/06/2022',
        currently_maintaining: true,
        one_liner: 'A working proof-of-concept allowing a remote user to play on your Nintendo Switch with sub-second latency using WebRTC.',
        info: [
            'Use Arduinos with HackerLoop\'s Arduino Joycon library to send controller inputs read from a web client to a server that forwards the inputs to Arduinos that translate and sends the inputs to the Nintendo Switch',
            'Use pion/webrtc and GStreamer to stream Nintendo Switch audio and video to a web client with sub-second latency',
            'Credentials system that utilizes the features of TURN servers to authenticate users into the remote server',
        ],
        tools_used: [
            {
                primary: 'Data',
                secondary: '',
                icon: <Storage />,
                list: [
                    'Session Traversal of UDP Through NATs (STUN)',
                    'Traversal Using Relay NAT (TURN)',
                    'WebSocket',
                    'Mozilla Gamepad API',
                ]
            },
            {
                primary: 'Security',
                secondary: '',
                icon: <Lock />,
                list: [
                    'Coturn Long Term Credentials',
                ],
            },
            {
                primary: 'Development',
                secondary: '',
                icon: <Code />,
                list: [
                    'WebRTC',
                    'JoyControl',
                    'BootStrap',
                    'PuTTY',
                    'Git',
                    'Arduino IDE',
                    'VS Code',
                ]
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "Golang",
                    "C",
                    "JavaScript",
                    "HTML",
                    "CSS",
                ]
            },
        ],
    },
    {
        title: 'Dead By Daylight Hub and Build Tools',
        title_link: '/dbd',
        card_image: dbd_hub_image,
        project_type: 'Website Development',
        start_date: '07/29/2021',
        last_updated: '09/08/2022',
        currently_maintaining: true,
        one_liner: 'A fan site / hub for Dead by Daylight information that presents perks and other data in a pleasing, game-thematic manner.',
        info: [
            'Web scraping to pull some perk data',
            'SEO to optimize appearance in Google searches',
            'Utilize Steam API for playerbase information',
            'Individually evaluated over 300 in-game elements',
            'Use JS and Bootstrap for styling and animation',
        ],
        tools_used: [
            {
                primary: "Data",
                secondary: '',
                icon: <Storage />,
                list: [
                    'JSON',
                    'ParseHub',
                    'CORS Anywhere',
                ],
            },
            {
                primary: "Development",
                secondary: '',
                icon: <Code />,
                list: [
                    'Git',
                    'BootStrap',
                    'jQuery',
                    'tmux',
                    'VS Code',
                ]
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "JavaScript",
                    "CSS",
                    "HTML",
                    "Node.js",
                ]
            },
        ],
    },
    {
        title: 'All-in-One Discord Bot',
        title_link: 'https://github.com/cazwacki/AiO-Discord-Bot',
        card_image: discord_freelance_logo,
        project_type: 'Bot / Back-end Development',
        start_date: '08/03/2020',
        last_updated: '10/03/2022',
        currently_maintaining: true,
        one_liner: 'A fully-featured Discord bot with many commands that covered administrative and utility needs for multiple servers.',
        info: [
            'MariaDB backend for minimal tracking of user activity',
            'Consume REST API in Golang',
            'Provided a wide array of standard management commands for the Discord server the bot is in',
            'Utilized web scraping to pull perks for a video game and get Google Search results',
            'Utilized a Twitter stream and Google Custom Search Engine to pull relevant information',
            'Set up a basic CI/CD process to streamline the process of pushing new bot changes to production',
            'Spawn threads for small tasks as needed',
        ],
        tools_used: [
            {
                primary: 'CI/CD',
                secondary: '',
                icon: <AccountTree />,
                list: [
                    'Travis CI (no longer in use)',
                    'Docker Hub',
                    'Heroku (no longer in use)',
                ],
            },
            {
                primary: 'Security',
                secondary: '',
                icon: <Lock />,
                list: [
                    'Parameterized MySQL',
                    'Discord Permissions',
                ]
            },
            {
                primary: 'Data',
                secondary: '',
                icon: <Storage />,
                list: [
                    'Twitter API v2.0',
                    'MariaDB',
                    'MySQL',
                    'goQuery',
                    'Google Transport',
                    'Google Custom Search',
                ],
            },
            {
                primary: 'Development',
                secondary: '',
                icon: <Code />,
                list: [
                    'DiscordGo',
                    'Git',
                    'MariaDB',
                    'VS Code',
                    'tmux',
                ],
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "Golang",
                    "YAML",
                    "MySQL"
                ]
            },
        ],
    },
    {
        title: 'Calendar Tasks',
        title_link: 'https://play.google.com/store/apps/details?id=com.charles.cazwa.calendartasks',
        card_image: calendar_tasks_image,
        project_type: 'Mobile App Development',
        start_date: '01/05/2019',
        last_updated: '03/18/2019',
        currently_maintaining: false,
        one_liner: 'An outdated app that integrated Google Tasks and Google Calendar before they were officially integrated together.',
        info: [
            'Use Google Auth and APIs',
            'Support single or recurring tasks on the Calendar and adapts to user theme settings',
            'Use Android Studio to make HCI design choices',
        ],
        tools_used: [
            {
                primary: "CI/CD",
                secondary: '',
                icon: <AccountTree />,
                list: [
                    "Rolling Deployments",
                    "Closed Testing",
                ],
            },
            {
                primary: "Data",
                secondary: '',
                icon: <Storage />,
                list: [
                    "SQLite",
                ],
            },
            {
                primary: "Security",
                secondary: '',
                icon: <Lock />,
                list: [
                    "OAuth 2.0",
                    "Android Settings",
                ],
            },
            {
                primary: "Development",
                secondary: '',
                icon: <Code />,
                list: [
                    "Git",
                    "Gradle",
                    "Android Studio",
                    "Google Play Console",
                ]
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "Java",
                    "XML",
                    "SQLite"
                ]
            },
        ],
    },
    {
        title: 'Traffic Simulator',
        title_link: 'https://github.com/cazwacki/Music-Data-to-Spreadsheet',
        card_image: traffic_sim_image,
        project_type: 'Java Desktop Development',
        start_date: '04/08/2016',
        last_updated: '05/09/2016',
        currently_maintaining: false,
        one_liner: 'A customizable intersection visual simulation based on data aggregated from a local intersection for study and analysis; received the Research with Social Impact Award in 2016',
        info: [
            'Uses Java Swing GUI',
            'Received Research with Social Impact Award in 2016',
            'Customize traffic light times for testing and analysis on optimal timings for maximum traffic flow',
        ],
        tools_used: [
            {
                primary: "Development",
                secondary: '',
                icon: <Code />,
                list: [
                    "Eclipse IDE",
                ]
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "Java",
                ]
            },
        ],
    },
    {
        title: 'Music Library to Spreadsheet',
        title_link: 'https://github.com/cazwacki/Music-Data-to-Spreadsheet',
        card_image: music_data_to_spreadsheet_image,
        project_type: 'Java Desktop Development',
        start_date: '11/16/2017',
        last_updated: '12/16/2017',
        currently_maintaining: false,
        one_liner: 'A simple Java Swing GUI that allows you to select any set of music, scrape the metadata, then arrange it in a spreadsheet of your liking.',
        info: [
            'Uses Java Swing GUI',
            'Organize and select the metadata to save to a basic spreadsheet',
        ],
        tools_used: [
            {
                primary: "Development",
                secondary: '',
                icon: <Code />,
                list: [
                    "Eclipse IDE",
                ]
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "Java",
                ]
            },
        ],
    },
    {
        title: '2D Tile Map Designer',
        title_link: 'https://github.com/cazwacki/Map-Maker',
        card_image: map_maker_image,
        project_type: 'Java Desktop Development',
        start_date: '11/18/2016',
        last_updated: '12/18/2016',
        currently_maintaining: false,
        one_liner: 'A simple map-making Java UI that allowed you to create, save/load, and import/export 2D sprite sheets and maps.',
        info: [
            'Uses Java Swing GUI',
            'Save / load all essential data in a file, allowing users to share and collaborate on designs',
        ],
        tools_used: [
            {
                primary: "Development",
                secondary: '',
                icon: <Code />,
                list: [
                    "Eclipse IDE",
                ]
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "Java",
                ]
            },
        ],
    },
]

const education = [
    {
        title: 'Master of Science in CS (In Progress)',
        department: 'Computing Systems',
        company: 'Georgia Tech',
        card_image: georgia_tech_logo,
        employment_type: "Part-time Student",
        start_date: '09/26/2021',
        end_date: '05/20/2024',
        currently_working: true,
        one_liner: 'Expected Graduation May 2024 (GPA 4.00)\nDistributed Computing Concentration',
        info: [
            'Part-time student concentrating on Computing Systems',
            'I am focusing on learning about computer networks and security, high performance computing and computer architecture, and distributed computing.',
            'Built a rudimentary distributed filesystem using a weakly-consistent multi-threaded strategy to make gRPC calls',
            'Analyzed different pieces of malware in virtualized environments to determine their effects',
            'Built a cache server that uses shared memory to communicate with a proxy server and save recently requested files from a remote server',
            'Performed computer architecture analysis using SuperESCalar Simulator'
        ],
        tools_used: [
            {
                primary: "General",
                secondary: '',
                icon: <HomeRepairService />,
                list: [
                    "Oracle VM Virtualbox",
                    "Vagrant by Hashicorp",
                    "RPC"
                ],
            },
            {
                primary: "Security",
                secondary: '',
                icon: <Lock />,
                list: [
                    "Kali Linux",
                    "Cuckoo Sandbox",
                    "Wireshark",
                ],
            },
            {
                primary: "High Performance Computing",
                secondary: '',
                icon: <DeveloperBoard />,
                list: [
                    "SESC SuperESCalar Simulator",
                    "C++",
                    "Assembly",
                    "RPC",
                    "Shared Memory"
                ],
            },
            {
                primary: "Development",
                secondary: '',
                icon: <Code />,
                list: [
                    "Apache Maven",
                    "Docker",
                    "Git",
                    "VS Code"
                ]
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "C",
                    "C++",
                    "Python",
                    "SQL",
                    "Shell"
                ]
            },
        ]
    },
    {
        title: 'Bachelor of Science in CS',
        department: 'Software Engineering',
        company: 'Virginia Tech',
        card_image: vt_logo,
        employment_type: 'Full-time Student',
        start_date: '08/26/2017',
        end_date: '05/20/2021',
        currently_working: false,
        one_liner: 'Graduated May 2021 (GPA 3.39)\nSoftware Engineering Concentration',
        info: [
            'Was a full-time student concentrating on Software Engineering',
            'I focused on learning about high performance computing, software engineering, and core CS concepts.',
            'Developed Game of Life applications that both had a 20x speedup over the original code using OpenMP and OpenACC multi-threading approaches',
            'Worked with a team of software engineers to architect and partially develop an architecture to support a VT student support registry',
            'Learned core CS concepts, such as Computer Systems, Data Structures and Algorithms, Comparative Languages, and Computer Organization',
        ],
        tools_used: [
            {
                primary: "CI/CD",
                secondary: '',
                icon: <AccountTree />,
                list: [
                    "Vagrant",
                    "Virtualbox VMs",
                    "In-House Solutions",
                ],
            },
            {
                primary: "High Performance Computing",
                secondary: '',
                icon: <DeveloperBoard />,
                list: [
                    "OpenMP",
                    "OpenACC"
                ],
            },
            {
                primary: "Development",
                secondary: '',
                icon: <Code />,
                list: [
                    "Make",
                    "Docker",
                    "Git",
                    "IntelliJ IDEA",
                ]
            },
        ],
        languages_used: [
            {
                primary: "Languages",
                secondary: '',
                icon: <LanguageIcon />,
                list: [
                    "Java",
                    "C",
                    "MIPS Assembly",
                    "HTML",
                    "SQL"
                ]
            },
        ]
    },
]

const games = [
    {
        title: 'Trackmania United Forever',
        title_link: 'https://store.steampowered.com/app/7200/Trackmania_United_Forever/',
        card_image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/7200/header.jpg',
        one_liner: 'Improve steadily thanks to innovative gameplay features, regionalized rankings and medals to collect, so you can race your way to the top.',
    },
    {
        title: 'Dead by Daylight',
        title_link: 'https://store.steampowered.com/app/381210/Dead_by_Daylight/',
        card_image: 'https://cdn.akamai.steamstatic.com/steam/apps/381210/capsule_616x353.jpg',
        one_liner: 'Death is not an escape',
    },
    {
        title: 'Monster Hunter Rise',
        title_link: 'https://store.steampowered.com/app/1446780/MONSTER_HUNTER_RISE/',
        card_image: 'https://cdn.akamai.steamstatic.com/steam/apps/1446780/capsule_616x353.jpg',
        one_liner: 'Rise to the challenge and join the hunt!',
    },
]

const commands = [
    {
        command: '~greeter help',
        type: 'Fun',
        description: 'Explains how to use greeter subcommands in detail.',
        example: '~greeter help',
    },
    {
        command: '~greeter status',
        type: 'Fun',
        description: 'Displays the current welcome and goodbye messages for the server.',
        example: '~greeter status',
    },
    {
        command: '~greeter set (join / leave) (#channel) (message: max 1000 characters) (-img (url: max 1000 characters): optional)',
        type: 'Fun',
        description: 'Displays the current welcome and goodbye messages for the server.',
        example: '~greeter set join #welcome Welcome to the server, <<ping>>! You are member #<<memc>>! -img https://i.imgur.com/DCAqBne.gif'
    },
    {
        command: '~greeter reset (join / leave)',
        type: 'Fun',
        description: 'Removes the join / leave message, depending on the selected option. It will no longer send a message for that action until you set a new message.',
        example: '~greeter reset join',
    },
    {
        command: '~leaderboard',
        type: 'Fun',
        description: 'Display the top 10 active users, and also display the invoking user\'s position on the leaderboard.',
        example: '~leaderboard',
    },
    {
        command: '~activity rescan',
        type: 'Server Management',
        description: 'Checks for any users in the server that may not be in the database, then add them to it.',
        example: '~activity rescan',
    },
    {
        command: '~activity whitelist (@user) (true / false)',
        type: 'Server Management',
        description: 'Indicates whether the pinged user should or should not be immune to auto-kick.',
        example: '~activity whitelist @czawacki true',
    },
    {
        command: '~activity autokick (number)',
        type: 'Server Management',
        description: 'Set the bot to automatically kick users after (number) days of inactivity. Set the number to 0 or less to disable auto-kick.',
        example: '~activity autokick 14',
    },
    {
        command: '~activity user (@user)',
        type: 'Server Management',
        description: 'Returns the user\'s last sign of activity on the server recorded by the bot. Includes whether the user is protected from the auto-kick.',
        example: '~activity user @czawacki',
    },
    {
        command: '~activity list (number)',
        type: 'Server Management',
        description: 'Returns a list of users who have been inactive for (number) days or more. Includes whether the user is protected from the auto-kick. Use 0 to get information on all the users in the server.',
        example: '~activity list 7',
    },
    {
        command: '~modlog set (#channel)',
        type: 'Server Management',
        description: 'Logs kicks, bans, and unbans in the listed channel.',
        example: '~modlog set #moderation-logs',
    },
    {
        command: '~modlog reset',
        type: 'Server Management',
        description: 'Stops logging kicks, bans, and unbans.',
        example: '~modlog reset',
    },
    {
        command: '~emoji create (name) (URL)',
        type: 'Server Management',
        description: 'Creates a new emote for the server with the given name using the given URL.',
        example: '~emoji create mugshot https://charles.zawackis.com/profile.jpg',
    },
    {
        command: '~emoji rename (emoji) (new name)',
        type: 'Server Management',
        description: 'Renames an existing server emote to the new name provided.',
        example: '~emoji rename :mugshot: portrait',
    },
    {
        command: '~emoji delete (emoji)',
        type: 'Server Management',
        description: 'Deletes an existing server emote.',
        example: '~emoji delete :portrait:',
    },
    {
        command: '~nick (@user) (new nickname)',
        type: 'Administration',
        description: 'Nickname the specified user on the server.',
        example: '~nick @cazwacki Bot Developer',
    },
    {
        command: '~kick (@user) (reason: optional)',
        type: 'Administration',
        description: 'Kicks the user from the server and DMs them, including the reason if provided.',
        example: '~kick @cazwacki Violated rule 3',
    },
    {
        command: '~ban (@user) (reason: optional)',
        type: 'Administration',
        description: 'Bans the user from the server and DMs them, including the reason if provided.',
        example: '~ban @cazwacki Repeatedly broke rule 3',
    },
    {
        command: '~purge (number)',
        type: 'Administration',
        description: 'Removes the (number) most recent messages from the channel the command was invoked in.',
        example: '~purge 15',
    },
    {
        command: '~mv (number) (#channel)',
        type: 'Administration',
        description: 'Removes the (number) most recent messages from the channel the command was invoked in and pastes them into the channel called in the command.',
        example: '~mv 25 #gaming',
    },
    {
        command: '~cp (number) (#channel)',
        type: 'Administration',
        description: 'Copies the (number) most recent messages from the channel the command was invoked in and pastes them into the channel called in the command.',
        example: '~cp 25 #gaming',
    },
    {
        command: '~vcmute (@user)',
        type: 'Administration',
        description: 'Toggles the \'muted\' state of a user when they join voice channels.',
        example: '~vcmute @cazwacki',
    },
    {
        command: '~vcdeaf (@user)',
        type: 'Administration',
        description: 'Toggles the \'deafened\' state of a user when they join voice channels.',
        example: '~vcdeaf @cazwacki',
    },
    {
        command: '~vcmove (@user) (#!channel)',
        type: 'Administration',
        description: 'Moves the specified user to the voice channel passed into the command.',
        example: '~vcmove @cazwacki #!General',
    },
    {
        command: '~vckick (@user)',
        type: 'Administration',
        description: 'Removes the user from the voice channel they are currently in.',
        example: '~vckick @cazwacki',
    },
    {
        command: '~define (word / phrase)',
        type: 'Lookup',
        description: 'Returns the definition of the word or phrase passed in.',
        example: '~define discord',
    },
    {
        command: '~wiki (word / phrase)',
        type: 'Lookup',
        description: 'Returns the Wikipedia entry for the word or phrase passed in.',
        example: '~wiki discord (software)',
    },
    {
        command: '~urban (word / phrase)',
        type: 'Lookup',
        description: 'Returns the first 5 Urban Dictionary entries for the word or phrase passed in.',
        example: '~urban discord',
    },
    {
        command: '~google (word / phrase)',
        type: 'Lookup',
        description: 'Returns the first 5 Google results for the word or phrase passed in.',
        example: '~google starlink coverage map',
    },
    {
        command: '~convert (time) (IANA timezone)',
        type: 'Lookup',
        description: 'Converts the time passed in to UTC and uses the timestamp of embeds to show all users the local time that corresponds with the time passed in. Works with many ways of formatting the time.',
        example: '~convert 3:45:30PM America/New_York',
    },
    {
        command: '~image (word / phrase)',
        type: 'Lookup',
        description: 'Returns the first 10 images from Google for the word or phrase passed in. They can be navigated by using the left, right, and stop reactions that pop up.',
        example: '~image color wheel',
    },
    {
        command: '~help',
        type: 'Lookup',
        description: 'Returns a URL to this page.',
        example: '~help',
    },
    {
        command: '~about (@user)',
        type: 'Fun',
        description: 'Returns the server join date, nickname (if applicable), and roles associated with the tagged user.',
        example: '~about @czawacki',
    },
    {
        command: '~profile (@user)',
        type: 'Fun',
        description: 'Returns a 512x512 version of the tagged user\'s profile picture.',
        example: '~profile @czawacki',
    },
    {
        command: '~perk (perk name)',
        type: 'Dead by Daylight',
        description: 'Returns the entry of the perk from the Dead by Daylight Wiki.',
        example: '~perk We\'ll Make It',
    },
    {
        command: '~addon (addon name)',
        type: 'Dead by Daylight',
        description: 'Returns the entry of the addon from the Dead by Daylight Wiki.',
        example: '~addon Fuming Mix Tape',
    },
    {
        command: '~survivor (survivor name)',
        type: 'Dead by Daylight',
        description: 'Returns the basic info of the survivor from the Dead by Daylight Wiki.',
        example: '~survivor Feng Min',
    },
    {
        command: '~killer (killer name)',
        type: 'Dead by Daylight',
        description: 'Returns the basic info of the killer from the Dead by Daylight Wiki.',
        example: '~killer Trapper',
    },
    {
        command: '~shrine',
        type: 'Dead by Daylight',
        description: 'Returns the current shrine of 4 perks that can be purchased with shards.',
        example: '~shrine',
    },
    {
        command: '~autoshrine set (#channel)',
        type: 'Dead by Daylight',
        description: 'Logs shrine update tweets from @DeadByBHVR to the specified channel.',
        example: '~autoshrine set #gaming',
    },
    {
        command: '~perk (perk name)',
        type: 'Dead by Daylight',
        description: 'Stops logging shrine update tweets from @DeadByBHVR to the server.',
        example: '~autoshrine reset',
    },
]

const data = { jobs, projects, education, games, commands }

export default data