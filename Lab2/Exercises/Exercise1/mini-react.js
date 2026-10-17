
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

export function renderToDOM(vnode) {

if (
  !vnode ||
  typeof vnode !== 'object' ||
  typeof vnode.type !== 'string' ||
  !vnode.props ||
  typeof vnode.props !== 'object' ||
  !Array.isArray(vnode.props.children)
) {
  throw new TypeError('Invalid VNode');
}
    
  // Handle text nodes safely.
  if (vnode.type === 'TEXT_ELEMENT') {
    return document.createTextNode(vnode.props.nodeValue);
  }

  // Create a semantic HTML element.
  const dom = document.createElement(vnode.type);

  // Apply props and event handlers.
  Object.entries(vnode.props).forEach(([name, value]) => {
    if (name === 'children' || value == null) {
      return;
    }

    if (name.startsWith('on') && typeof value === 'function') {
      const eventType = name.slice(2).toLowerCase();
      dom.addEventListener(eventType, value);
      return;
    }

    if (name === 'className') {
      dom.setAttribute('class', value);
      return;
    }

    if (name === 'style' && typeof value === 'object') {
      Object.assign(dom.style, value);
      return;
    }

    if (name in dom && !name.startsWith('aria-') && !name.startsWith('data-')) {
      try {
        dom[name] = value;
      } catch {
        dom.setAttribute(name, value);
      }
      return;
    }

    dom.setAttribute(name, value);
  });

  // Recursively render child VNodes.
  vnode.props.children.forEach(child => {
    dom.appendChild(renderToDOM(child));
  });

  // Keep the VNode available for DevTools auditing.
  dom.__vnode = vnode;

  return dom;
}
