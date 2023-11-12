<div align="center">
    <a href="https://github.com/topstar210/Nervatrade-System.git">
        <img src="https://prnt.sc/Ook2kvfj_sEc" width="64" height="64" alt="Logo Icon">
    </a>
    <h1>
        <a href="https://github.com/topstar210/Nervatrade-System.git">
            Nervatrade
        </a>
    </h1>
</div>

## App Structure
```
.
├── README.md            # README file
├── next.config.js       # Next JS configuration
├── public               # Public folder
├── app
│   ├── (auth)           # Organize routes without affecting the URL path
|   |   ├── login
|   |   ├── register
|   |   ├── global.css
|   |   ├── layout.tsx
|   |   └── loading.tsx
│   ├── api              # API handler
│   ├── components       # Page's components
│   ├── models           # MongoDB schema
│   ├── utilities        # Utility folder
│   └── Provider.tsx     # NuxtAuth provider
├── tailwind.config.ts   # Tailwind CSS configuration
├── postcss.config.js    # Postcss configuration
├── eslintrc.json        # ESLint configuration
└── tsconfig.json        # TypeScript configuration
```