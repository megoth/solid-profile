declare module '*.mdx' {
    import type React from 'react'
    const ReactComponent: React.VFC
    export default ReactComponent
}

declare module '*.module.css' {
    const content: Record<string, string>;
    export default content;
}