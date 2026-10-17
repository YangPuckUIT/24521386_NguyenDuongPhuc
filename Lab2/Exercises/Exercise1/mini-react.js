
/**
 * Mini React Engine
 * Exercise 1: VNode Factory
 */

export function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: String(text),
      children: []
    }
  };
}

export function createElement(type, props, ...children) {
  const normalizedChildren = children.map(child => {
    if (
      typeof child === 'string' ||
      typeof child === 'number' ||
      typeof child === 'boolean' ||
      child == null
    ) {
      return createTextElement(child ?? '');
    }

    return child;
  });

  return {
    type,
    props: {
      ...(props ?? {}),
      children: normalizedChildren
    }
  };
}

// Commit 2: Implement renderToDOM()
