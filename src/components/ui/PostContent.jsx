import { useEffect, useRef } from 'react';

export default function PostContent({ content }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current && content) {
      // Import Prism dynamically with error handling
      import('prismjs').then((Prism) => {
        // Import only the most common languages to avoid errors
        const languageImports = [
          'prismjs/components/prism-javascript',
          'prismjs/components/prism-typescript',
          'prismjs/components/prism-jsx',
          'prismjs/components/prism-tsx',
          'prismjs/components/prism-css',
          'prismjs/components/prism-json',
          'prismjs/components/prism-bash',
          'prismjs/components/prism-python',
          'prismjs/components/prism-java',
          'prismjs/components/prism-c',
          'prismjs/components/prism-cpp',
          'prismjs/components/prism-php',
          'prismjs/components/prism-ruby',
          'prismjs/components/prism-go',
          'prismjs/components/prism-rust',
          'prismjs/components/prism-sql',
          'prismjs/components/prism-markdown'
        ];

        // Import languages with error handling
        Promise.allSettled(
          languageImports.map(lang => import(/* @vite-ignore */ lang).catch(() => null))
        ).then(() => {
          // Highlight all code blocks in the content
          Prism.highlightAllUnder(contentRef.current);
          
          // Add copy buttons to all code blocks
          addCopyButtons();
        });
      }).catch((error) => {
        console.warn('Failed to load Prism.js:', error);
        // Still add copy buttons even if Prism fails
        addCopyButtons();
      });
    }
  }, [content]);

  const addCopyButtons = () => {
    if (!contentRef.current) return;

    const codeBlocks = contentRef.current.querySelectorAll('pre code');
    codeBlocks.forEach((codeElement) => {
      const preElement = codeElement.parentElement;
      
      // Skip if already has copy button
      if (preElement.querySelector('.copy-button')) return;
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-button absolute top-2 right-2 p-2 bg-base-200 hover:bg-base-100 rounded opacity-0 group-hover:opacity-100 transition-opacity text-xs';
      copyButton.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      `;
      
      // Add click handler
      copyButton.addEventListener('click', async () => {
        const text = codeElement.textContent;
        try {
          await navigator.clipboard.writeText(text);
          copyButton.innerHTML = `
            <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          `;
          setTimeout(() => {
            copyButton.innerHTML = `
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            `;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      });
      
      // Make pre element relative and add group class
      preElement.style.position = 'relative';
      preElement.classList.add('group');
      
      // Add copy button
      preElement.appendChild(copyButton);
    });
  };

  return (
    <div 
      ref={contentRef}
      className="prose prose-lg prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
}
