Unexpected Application Error!
useSidebar must be used within a SidebarProvider.
Error: useSidebar must be used within a SidebarProvider.
    at useSidebar (http://localhost:5173/src/components/ui/sidebar.tsx:52:11)
    at ConfigDrawer (http://localhost:5173/src/modules/lending/lending-components/config-drawer.tsx:48:23)
    at Object.react_stack_bottom_frame (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=3c4820d5:17424:20)
    at renderWithHooks (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=3c4820d5:4206:24)
    at updateFunctionComponent (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=3c4820d5:6619:21)
    at beginWork (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=3c4820d5:7654:20)
    at runWithFiberInDEV (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=3c4820d5:1485:72)
    at performUnitOfWork (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=3c4820d5:10868:98)
    at workLoopSync (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=3c4820d5:10728:43)
    at renderRootSync (http://localhost:5173/node_modules/.vite/deps/react-dom_client.js?v=3c4820d5:10711:13)
💿 Hey developer 👋

You can provide a way better UX than this when your app throws errors by providing your own ErrorBoundary or errorElement prop on your route.  