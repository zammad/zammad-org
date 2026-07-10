/**
 * Custom markdownlint rules for the Zammad documentation.
 *
 * Picked up automatically by markdownlint-cli2 via the
 * `customRules:` setting in `.markdownlint-cli2.yaml`.
 *
 * Each export is a single rule object as documented at:
 *   https://github.com/DavidAnson/markdownlint/blob/main/doc/CustomRules.md
 *
 * Rule IDs use the MD9xx range reserved for project-local custom rules.
 */

/**
 * MD901 — Keyboard key markup should start with a lowercase letter.
 *
 * The Zammad style guide uses [[ctrl]], [[shift]], [[enter]] etc. for
 * keyboard keys. Capitalized variants such as [[Ctrl]] are inconsistent
 * with that convention.
 *
 * Exception: `[[TOC]]` is a VitePress table-of-contents marker, not a
 * key, and is therefore allow-listed below.
 */
const kbdLowercase = {
  names: ["MD901"],
  description: "Keyboard key markup ([[key]]) should start with a lowercase letter",
  tags: ["style"],
  parser: "none",
  function: function (params, onError) {
    // Match [[X...]] where X is an uppercase ASCII letter. Excludes
    // single-character keys that aren't alphabetic ([[?]], [[@]], [[:]],
    // [[.]]) by requiring at least two characters total.
    //
    // `TOC` is a VitePress table-of-contents marker, not a keyboard key,
    // so it is allow-listed.
    const allowList = new Set(["TOC"]);
    const re = /\[\[([A-Z][A-Za-z]*)\]\]/g;
    const lines = params.lines;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let match;
      re.lastIndex = 0;
      while ((match = re.exec(line)) !== null) {
        if (allowList.has(match[1])) continue;
        onError({
          lineNumber: i + 1,
          detail: "Use [[" + match[1].toLowerCase() + "]] instead",
          context: line,
          range: [match.index + 1, match[0].length],
        });
      }
    }
  },
};

/**
 * MD902 — VitePress custom containers require a space after `:::`.
 *
 * VitePress renders both `:::warning` and `::: warning` identically.
 * The spaced form is preferred for readability and grep-ability when
 * scanning a file. Nested containers use additional colons (:::: tabs)
 * and are also matched.
 */
const customContainerSpacing = {
  names: ["MD902"],
  description: "Custom containers (:::warning) require a space after the colons",
  tags: ["style"],
  parser: "none",
  function: function (params, onError) {
    // Match 3 or more colons followed directly by a letter (no space).
    // 3 colons is the standard VitePress container open (::: warning);
    // 4+ colons are nested containers (:::: details) which must follow
    // the same spacing rule.
    const re = /^( {0,3})(:::+)([A-Za-z][A-Za-z0-9-]*)/gm;
    const lines = params.lines;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let match;
      re.lastIndex = 0;
      while ((match = re.exec(line)) !== null) {
        onError({
          lineNumber: i + 1,
          detail: "Insert a space between the colons and the container type",
          context: line,
          range: [
            match.index + match[1].length + match[2].length,
            1,
          ],
          fixInfo: {
            lineNumber: i + 1,
            editColumn: match.index + match[1].length + match[2].length,
            insertText: " ",
          },
        });
      }
    }
  },
};

/**
 * MD903 — Inline code spans should use a single backtick, not double.
 *
 * Per the Zammad style guide, single-token inline code uses `` `foo` ``
 * not ``` ``foo`` ```. The double-backtick form was inherited from the
 * legacy Sphinx docs and should be replaced.
 *
 * Scope: only flags double-backtick spans whose content contains no
 * backticks (i.e. true single-token cases). Multi-token spans like
 * ``a`b`` legitimately need the double form.
 */
const singleBacktickInlineCode = {
  names: ["MD903"],
  description: "Inline code spans should use a single backtick, not double",
  tags: ["style"],
  parser: "none",
  function: function (params, onError) {
    // Match ``...`` where ... contains no backticks and is at least two
    // characters long. The 2-char minimum excludes ` `` `` ` `` (which is
    // a single backtick example, not single-token inline code).
    const re = /``([^`]{2,})``/g;
    const lines = params.lines;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let match;
      re.lastIndex = 0;
      while ((match = re.exec(line)) !== null) {
        onError({
          lineNumber: i + 1,
          detail: "Replace `` with ` for single-token inline code",
          context: line,
          range: [match.index + 1, match[0].length],
          fixInfo: {
            lineNumber: i + 1,
            editColumn: match.index + 1,
            deleteCount: 2,
            insertText: "`",
          },
        });
      }
    }
  },
};

/**
 * MD904 — External links must include the {target=_blank} attribute.
 *
 * VitePress treats any link starting with `http://` or `https://` as
 * external (it adds an external-link icon automatically via the
 * `externalLinkIcon` config) but it does not open them in a new tab.
 * Authors signal "open in new tab" with the `{target=_blank}` attribute
 * on the inline link. The Zammad style guide requires this for every
 * external link, including zammad.com and its subdomains, because
 * navigating away mid-task disrupts the reader's flow.
 *
 * Internal links (`/...`, `./...`, `../...`, `#...`) are not affected.
 *
 * The rule also skips links that appear inside inline code spans
 * (between backticks), which is detected by counting the backticks
 * preceding the `[` on the same line.
 */
const externalLinkTargetBlank = {
  names: ["MD904"],
  description: "External links should include {target=_blank}",
  tags: ["style"],
  parser: "none",
  function: function (params, onError) {
    // Match `](https?://...)` followed optionally by a `{...}` block.
    const re = /\]\((https?:\/\/[^)]+)\)(\{[^}]*\})?/g;
    const lines = params.lines;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let match;
      re.lastIndex = 0;
      while ((match = re.exec(line)) !== null) {
        const attrs = match[2] || "";
        if (/target\s*=\s*_blank/.test(attrs)) continue;

        // Skip links inside inline code spans.
        const prefix = line.slice(0, match.index);
        let inCodeSpan = false;
        for (let j = 0; j < prefix.length; j++) {
          if (prefix[j] === "`") inCodeSpan = !inCodeSpan;
        }
        if (inCodeSpan) continue;

        // When an attribute block is present, point to it. Otherwise
        // point to the closing `)` so the user knows where to type the
        // attribute. Both column and length are 1-based per the
        // markdownlint range contract.
        let range;
        if (attrs) {
          range = [
            match.index + match[0].length - attrs.length + 1,
            attrs.length,
          ];
        } else {
          range = [match.index + match[0].length, 1];
        }

        onError({
          lineNumber: i + 1,
          detail: "Append {target=_blank} to this external link",
          context: line,
          range: range,
          fixInfo: {
            lineNumber: i + 1,
            editColumn: match.index + match[0].length + 1,
            insertText: "{target=_blank}",
          },
        });
      }
    }
  },
};

module.exports = [
  kbdLowercase,
  customContainerSpacing,
  singleBacktickInlineCode,
  externalLinkTargetBlank,
];