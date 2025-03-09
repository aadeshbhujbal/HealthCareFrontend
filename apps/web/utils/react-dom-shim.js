// Shim for unmountComponentAtNode which is not exported in React 18
export default function unmountComponentAtNode(container) {
  if (container._reactRootContainer) {
    const root = container._reactRootContainer;
    if (typeof root.unmount === 'function') {
      root.unmount();
      return true;
    }
  }
  return false;
}
