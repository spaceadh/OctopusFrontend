✗ Build failed in 1.44s
error during build:
[vite:css] [postcss] Cannot find module 'daisyui/src/theming/themes'
Require stack:
- D:\KillProjects\OctopusFrontend\tailwind.config.js
file: D:/KillProjects/OctopusFrontend/src/index.css:undefined:NaN
    at Function._resolveFilename (node:internal/modules/cjs/loader:1249:15)
    at Function.resolve (node:internal/modules/helpers:148:19)
    at _resolve (D:\KillProjects\OctopusFrontend\node_modules\jiti\dist\jiti.js:1:246378)
    at jiti (D:\KillProjects\OctopusFrontend\node_modules\jiti\dist\jiti.js:1:249092)
    at D:\KillProjects\OctopusFrontend\tailwind.config.js:92:14
    at evalModule (D:\KillProjects\OctopusFrontend\node_modules\jiti\dist\jiti.js:1:251913)
    at jiti (D:\KillProjects\OctopusFrontend\node_modules\jiti\dist\jiti.js:1:249841)
    at D:\KillProjects\OctopusFrontend\node_modules\tailwindcss\lib\lib\load-config.js:52:26
    at loadConfig (D:\KillProjects\OctopusFrontend\node_modules\tailwindcss\lib\lib\load-config.js:62:6)
    at getTailwindConfig (D:\KillProjects\OctopusFrontend\node_modules\tailwindcss\lib\lib\setupTrackingContext.js:71:116)
(base) PS D:\KillProjects\OctopusFrontend> 