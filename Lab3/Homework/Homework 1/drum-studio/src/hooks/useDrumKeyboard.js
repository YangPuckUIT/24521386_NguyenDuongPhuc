
import { useEffect } from "react";

export function useDrumKeyboard(
  padMap,
  onTriggerPad,
  onReleasePad,
  isEnabled = true
) {
  useEffect(() => {
    if (!isEnabled) return undefined;

    const isTyping = (target) => {
      if (!(target instanceof Element)) return false;

      return Boolean(
        target.closest(
          'input, textarea, select, [contenteditable=""], [contenteditable="true"]'
        )
      );
    };

    const onKeyDown = (event) => {
      if (event.repeat || event.isComposing) return;
      if (isTyping(event.target)) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      const pad = padMap.get(event.code);

      if (!pad) return;

      event.preventDefault();
      onTriggerPad(pad.id);
    };

    const onKeyUp = (event) => {
      if (isTyping(event.target)) return;

      const pad = padMap.get(event.code);

      if (!pad) return;

      onReleasePad(pad.id);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [padMap, onTriggerPad, onReleasePad, isEnabled]);
}
