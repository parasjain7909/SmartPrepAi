export const RESOURCE_CATEGORIES = [
    {
        id: "web",
        label: "Web Development",
        skills: [
            {
                skill: "JavaScript",
                items: [
                    { type: "video", title: "JavaScript Full Course", source: "freeCodeCamp", url: "https://www.youtube.com/watch?v=PkZNo7MFNFg", level: "beginner", description: "Covers core syntax, functions, arrays, objects, and DOM basics." },
                    { type: "video", title: "Namaste JavaScript", source: "Akshay Saini", url: "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP", level: "intermediate", description: "Deep dive into closures, execution context, and how JS actually works." },
                    { type: "notes", title: "JavaScript.info", source: "javascript.info", url: "https://javascript.info/", level: "beginner", description: "Comprehensive reference from fundamentals to advanced topics." },
                ]
            },
            {
                skill: "React.js",
                items: [
                    { type: "video", title: "React Course for Beginners", source: "freeCodeCamp", url: "https://www.youtube.com/watch?v=bMknfKXIFA8", level: "beginner", description: "Components, props, state, and hooks from scratch." },
                    { type: "notes", title: "React Official Docs", source: "react.dev", url: "https://react.dev/learn", level: "beginner", description: "The most up-to-date and accurate source for React concepts." },
                ]
            },
            {
                skill: "Node.js",
                items: [
                    { type: "video", title: "Node.js Full Course", source: "freeCodeCamp", url: "https://www.youtube.com/watch?v=Oe421EPjeBE", level: "beginner", description: "Runtime basics, modules, file system, and building a server." },
                    { type: "notes", title: "Node.js Official Docs", source: "nodejs.org", url: "https://nodejs.org/en/docs", level: "intermediate", description: "Official API reference for every core Node module." },
                ]
            },
            {
                skill: "Express.js",
                items: [
                    { type: "video", title: "Express.js Crash Course", source: "Traversy Media", url: "https://www.youtube.com/watch?v=SccSCuHhOw0", level: "beginner", description: "Routing, middleware, and building REST APIs quickly." },
                    { type: "notes", title: "Express Official Guide", source: "expressjs.com", url: "https://expressjs.com/en/guide/routing.html", level: "intermediate", description: "Official routing and middleware documentation." },
                ]
            },
            {
                skill: "MongoDB",
                items: [
                    { type: "video", title: "MongoDB Crash Course", source: "Traversy Media", url: "https://www.youtube.com/watch?v=-56x56UppqQ", level: "beginner", description: "CRUD operations, collections, and schema design basics." },
                    { type: "notes", title: "MongoDB Manual", source: "mongodb.com", url: "https://www.mongodb.com/docs/manual/", level: "intermediate", description: "Official reference covering queries, indexing, and aggregation." },
                ]
            },
            {
                skill: "TypeScript",
                items: [
                    { type: "video", title: "TypeScript Course for Beginners", source: "freeCodeCamp", url: "https://www.youtube.com/watch?v=BwuLxPH8IDs", level: "beginner", description: "Types, interfaces, generics, and migrating from JS." },
                    { type: "notes", title: "TypeScript Handbook", source: "typescriptlang.org", url: "https://www.typescriptlang.org/docs/handbook/intro.html", level: "intermediate", description: "The official, definitive guide to the type system." },
                ]
            },
            {
                skill: "Full Stack Development",
                items: [
                    { type: "video", title: "Full Stack Open (MERN)", source: "freeCodeCamp", url: "https://www.youtube.com/watch?v=I4pQbAlgZOs", level: "intermediate", description: "End-to-end MERN app build, from UI to deployed API." },
                    { type: "video", title: "MERN Stack Full Course", source: "freeCodeCamp", url: "https://www.youtube.com/watch?v=4Wa5DivljOM", level: "intermediate", description: "Build and deploy a complete MERN application." },
                    { type: "video", title: "Next.js Full Course", source: "freeCodeCamp", url: "https://www.youtube.com/watch?v=843nec-IvW0", level: "intermediate", description: "Server-side rendering, routing, and full-stack Next.js apps." },
                    { type: "notes", title: "Full Stack Open Course Notes", source: "fullstackopen.com", url: "https://fullstackopen.com/en/", level: "advanced", description: "University-grade curriculum covering the entire modern stack." },
                    { type: "notes", title: "The Odin Project", source: "theodinproject.com", url: "https://www.theodinproject.com/", level: "beginner", description: "Free, structured full-stack curriculum with projects." },
                ]
            },
            {
                skill: "SQL",
                items: [
                    { type: "video", title: "SQL Full Course", source: "freeCodeCamp", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY", level: "beginner", description: "Queries, joins, and relational database fundamentals." },
                    { type: "notes", title: "SQL Tutorial", source: "w3schools.com", url: "https://www.w3schools.com/sql/", level: "beginner", description: "Interactive reference with runnable examples." },
                ]
            },
        ]
    },
    {
        id: "cs",
        label: "CS Fundamentals",
        skills: [
            {
                skill: "Data Structures & Algorithms",
                items: [
                    { type: "video", title: "DSA Full Course", source: "freeCodeCamp", url: "https://www.youtube.com/watch?v=8hly31xKli0", level: "beginner", description: "Arrays, trees, graphs, sorting, and problem-solving patterns." },
                    { type: "notes", title: "NeetCode Roadmap", source: "neetcode.io", url: "https://neetcode.io/roadmap", level: "intermediate", description: "Structured problem list organized by pattern and difficulty." },
                ]
            },
            {
                skill: "System Design",
                items: [
                    { type: "video", title: "System Design Interview Basics", source: "Gaurav Sen", url: "https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX", level: "intermediate", description: "Scalability, caching, load balancing, and common interview patterns." },
                    { type: "notes", title: "System Design Primer", source: "GitHub", url: "https://github.com/donnemartin/system-design-primer", level: "advanced", description: "The most-referenced open-source system design study guide." },
                ]
            },
            {
                skill: "Git & GitHub",
                items: [
                    { type: "video", title: "Git and GitHub for Beginners", source: "freeCodeCamp", url: "https://www.youtube.com/watch?v=RGOj5yH7evk", level: "beginner", description: "Version control basics, branching, and collaborating on GitHub." },
                    { type: "notes", title: "Git Documentation", source: "git-scm.com", url: "https://git-scm.com/doc", level: "intermediate", description: "Official reference for every Git command and workflow." },
                ]
            },
        ]
    },
    {
        id: "aiml",
        label: "AI & Machine Learning",
        skills: [
            {
                skill: "Python",
                items: [
                    { type: "video", title: "Python Full Course", source: "freeCodeCamp", url: "https://www.youtube.com/watch?v=rfscVS0vtbw", level: "beginner", description: "Syntax, data structures, and functions — the base for ML work." },
                    { type: "notes", title: "Python Official Docs", source: "docs.python.org", url: "https://docs.python.org/3/tutorial/", level: "beginner", description: "The definitive language reference and tutorial." },
                ]
            },
            {
                skill: "Machine Learning",
                items: [
                    { type: "video", title: "Machine Learning Course for Beginners", source: "freeCodeCamp", url: "https://www.youtube.com/watch?v=NWONeJKn6kc", level: "beginner", description: "Core ML concepts: regression, classification, and evaluation." },
                    { type: "video", title: "Machine Learning Specialization", source: "Andrew Ng / DeepLearning.AI", url: "https://www.youtube.com/playlist?list=PLkDaE6sCZn6Ec-XTbcX1uRg2_u4xOEky0", level: "intermediate", description: "The industry-standard intro to ML theory and practice." },
                    { type: "notes", title: "scikit-learn User Guide", source: "scikit-learn.org", url: "https://scikit-learn.org/stable/user_guide.html", level: "intermediate", description: "Practical guide to the most-used Python ML library." },
                ]
            },
            {
                skill: "Deep Learning",
                items: [
                    { type: "video", title: "Neural Networks Series", source: "3Blue1Brown", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", level: "beginner", description: "Visual, intuitive explanation of how neural networks work." },
                    { type: "video", title: "Deep Learning Specialization", source: "Andrew Ng / DeepLearning.AI", url: "https://www.youtube.com/playlist?list=PLkDaE6sCZn6Hn0vK8co82zjQtt3T2Nkqc", level: "advanced", description: "In-depth coverage of CNNs, RNNs, and deep architectures." },
                    { type: "notes", title: "PyTorch Official Tutorials", source: "pytorch.org", url: "https://pytorch.org/tutorials/", level: "intermediate", description: "Hands-on tutorials for building models in PyTorch." },
                ]
            },
            {
                skill: "Natural Language Processing",
                items: [
                    { type: "video", title: "NLP with Deep Learning (CS224N)", source: "Stanford", url: "https://www.youtube.com/playlist?list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVRd4", level: "advanced", description: "Stanford's graduate-level NLP and deep learning course." },
                    { type: "notes", title: "Hugging Face NLP Course", source: "huggingface.co", url: "https://huggingface.co/learn/nlp-course", level: "intermediate", description: "Practical, code-first introduction to transformers and NLP." },
                ]
            },
            {
                skill: "LLMs & Generative AI",
                items: [
                    { type: "video", title: "Intro to Large Language Models", source: "Andrej Karpathy", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g", level: "intermediate", description: "High-level, clear explanation of how LLMs work under the hood." },
                    { type: "video", title: "Let's Build GPT from Scratch", source: "Andrej Karpathy", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", level: "advanced", description: "Line-by-line implementation of a GPT-style transformer." },
                    { type: "notes", title: "Prompt Engineering Guide", source: "promptingguide.ai", url: "https://www.promptingguide.ai/", level: "beginner", description: "Practical techniques for getting reliable output from LLMs." },
                ]
            },
        ]
    },
    {
        id: "tools",
        label: "Tools & DevOps",
        skills: [
            {
                skill: "Docker",
                items: [
                    { type: "video", title: "Docker Tutorial for Beginners", source: "TechWorld with Nana", url: "https://www.youtube.com/watch?v=3c-iBn73dDE", level: "beginner", description: "Containers, images, and Docker Compose fundamentals." },
                    { type: "notes", title: "Docker Get Started Guide", source: "docs.docker.com", url: "https://docs.docker.com/get-started/", level: "beginner", description: "Official step-by-step onboarding guide." },
                ]
            },
            {
                skill: "AWS",
                items: [
                    { type: "video", title: "AWS Basics for Beginners", source: "freeCodeCamp", url: "https://www.youtube.com/watch?v=ulprqHHWlng", level: "beginner", description: "Core services: EC2, S3, IAM, and how they fit together." },
                    { type: "notes", title: "AWS Documentation", source: "docs.aws.amazon.com", url: "https://docs.aws.amazon.com/", level: "intermediate", description: "Official reference for every AWS service." },
                ]
            },
        ]
    },
]