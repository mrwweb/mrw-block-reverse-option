# MRW Block Reverse Option

v0.2.0

Mark Root-Wiley, [MRW Web Design](https://mrwweb.com)

Reverses the order of columns or blocks inside a Row or Stack block where accessibility and responsive layouts dictate.

## Changelog

### v0.2.0 (5 March 2026)

- Add support for reversing Row and Stack blocks
- **Breaking change:** Change rowReverse attribute/classname to blockReverse
  - Recommended migration: run `wp search-replace has-row-reverse has-block-reverse`
- Make sure order markers in editor use WordPress UI font stack
- Prevent order markers from appearing above toolbar

### v0.1.0 (21 May 2025)

- Initial Release
