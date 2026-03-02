# Custom BottomSheet

A lightweight, custom bottom sheet built with `react-native-reanimated` and `react-native-gesture-handler`.

## Why not @gorhom/bottom-sheet?

`@gorhom/bottom-sheet` has known bugs on Android when the keyboard opens — the sheet jumps, mispositions, or leaves gaps between itself and the keyboard. These issues are especially noticeable on Android devices with edge-to-edge mode or varying `softwareKeyboardLayoutMode` settings. This custom implementation gives full control over keyboard handling across both platforms.

## How it works

- The sheet is absolutely positioned at `bottom: 0` and slides up/down using a `translateY` shared value animated with `react-native-reanimated`.
- A pan gesture (via `react-native-gesture-handler`) lets users swipe down to dismiss.
- Tapping the backdrop also closes the sheet.
- Controlled imperatively via a ref (`open()` / `close()`).

## Keyboard handling

When a `TextInput` inside the sheet is focused:

- **iOS:** The keyboard overlays the screen without resizing. The sheet listens to `keyboardWillShow` and translates itself up by the keyboard height.
- **Android (`adjustResize`):** The window shrinks automatically when the keyboard appears. The sheet detects this using `useWindowDimensions` — if the window height shrunk significantly (>50px less than the screen height), the system already handled it and no manual offset is applied. If the window did **not** shrink (device doesn't support `adjustResize`), the sheet falls back to a manual `translateY` offset, same as iOS.

## Build Preview
<img src="https://github.com/user-attachments/assets/aa4f224f-1fab-4d2b-a363-85fa6504b8a2" width="400">
