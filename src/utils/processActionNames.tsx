import { AllActionStrings } from '@fullstackcraftllc/codevideo-types';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { ActionBadge } from '@fullstackcraftllc/codevideo-react-components';
import { Theme } from '@radix-ui/themes';

/**
 * Utility to process DOM elements and replace ANY occurrence of action names with
 * ActionBadge components, including those in code blocks and inline code.
 */
export const processActionNames = (
  container: HTMLElement,
  options = {
    size: 'sm' as 'sm' | 'md' | 'lg',
    variant: 'soft' as 'soft' | 'outline' | 'solid',
  }
): () => void => {
  if (!container) return () => { };

  // Sort actions by length (longest first) to avoid partial matches shorter names that are within longer action names
  const sortedActions = [...AllActionStrings, 'composite-file-explorer-create-file-with-mouse', 'composite-file-explorer-create-file-with-terminal'].sort((a, b) => b.length - a.length);
  const actionPattern = new RegExp(`(${sortedActions.join('|')})`, 'g');

  // Get all text nodes
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null
  );

  let node;
  while (node = walker.nextNode()) {
    // Skip text nodes in scripts and style tags only
    // We're including code blocks as per your requirement
    const parent = node.parentElement;
    if (
      parent?.tagName === 'SCRIPT' ||
      parent?.tagName === 'STYLE'
    ) {
      continue;
    }

    textNodes.push(node as Text);
  }

  // Store roots for cleanup
  const roots: Array<ReturnType<typeof createRoot>> = [];

  // Process each text node to replace action names with badges
  textNodes.forEach(textNode => {
    if (!textNode.textContent || !actionPattern.test(textNode.textContent)) {
      return;
    }

    // Reset pattern for fresh search
    actionPattern.lastIndex = 0;

    const fragment = document.createDocumentFragment();
    const text = textNode.textContent;

    let lastIndex = 0;
    let match;

    // Check if this text node is inside a code element
    const isInCode = Boolean(
      textNode.parentElement?.tagName === 'CODE' ||
      textNode.parentElement?.closest('code') ||
      textNode.parentElement?.closest('pre')
    );

    // Find and replace all action names
    while ((match = actionPattern.exec(text)) !== null) {
      const actionName = match[0];
      const index = match.index;

      // Add text before the action name
      if (index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex, index)));
      }

      // Create container for the React component
      const badgeContainer = document.createElement('span');
      badgeContainer.className = isInCode
        ? 'action-badge-container code-badge'
        : 'action-badge-container';
      fragment.appendChild(badgeContainer);

      // Render the badge with appropriate styling for code context
      try {
        const root = createRoot(badgeContainer);
        roots.push(root);

        root.render(
          <ActionBadge
            actionName={actionName as any}
            size={options.size}
          />
        );
      } catch (error) {
        console.error('Error rendering action badge:', error);
        // Fallback to plain text
        badgeContainer.textContent = actionName;
      }

      lastIndex = index + actionName.length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    // Replace the original text node with our processed fragment
    if (fragment.childNodes.length > 0) {
      textNode.parentNode?.replaceChild(fragment, textNode);
    }
  });

  // Return cleanup function
  return () => {
    roots.forEach(root => {
      try {
        root.unmount();
      } catch (e) {
        // Ignore unmount errors
      }
    });
  };
};