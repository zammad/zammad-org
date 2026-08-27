---
order: 1
---

# Contribute

We are happy to see you contribute to Zammad! You can do this in several ways. Contributions are mainly done by cloning
one of our repos on GitHub and creating a pull request with your changes (except for translations, see below). 🚀

You can contribute to:

- [Source-code](contribute#zammad-source-code)
- [Documentation](contribute#documentation)
- [Translation](contribute#translation)

Please have a look at our the sections below about how to contribute. All repos can be found on
[GitHub](https://github.com/zammad){target=_blank}.

## Zammad source code

The Zammad source code can be found on GitHub in the
[Zammad repository](https://github.com/zammad/zammad){target=_blank}. Have a look at the
[developer manual](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank}
to get started.

### Supported branches / versions

Zammad's GitHub repository has several branches:

#### `develop`

- This is the current (unreleased) development state of next major release (this will become the new `stable` branch).
- Don't use it for production!
- This branch is actively supported and receives regular bug fixes and security updates (see
  [Security Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank} for more details).

#### `stable`

- This is the current stable release, e.g. Zammad 5.2.
- Use this branch for production installations.
- This branch is actively supported and receives regular bug fixes and security updates (see
  [Security Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank} for more details).

#### `stable-x.y`

- These are the branches of old versions of Zammad like `stable-5.1` for Zammad 5.1.
- Don't use it for production!
- Bug fixes and security updates are not applied to these branches.

## Documentation

The documentation you are reading is available on zammad.org and next.zammad.org and is built with VitePress. The
source files are written in Markdown. Make sure to change the English source files only which are placed under
`/src/en/`. The translation is done via Weblate and will overwrite any changes in the language specific folders
(except `/src/en/`).

Open a new GitHub pull request at <https://github.com/zammad/zammad-org> (targeting the `develop` branch) with your
changes and make sure to follow the [style and content guide](style-guide) and read the
[repo's README.md](https://github.com/zammad/zammad-org?tab=readme-ov-file#zammad-hub){target=_blank}.

## Translation

If you want to help us with translation and improve the multi-language support of Zammad or the documentation, you
are welcome to contribute as well! The translation of Zammad and the documentation is done via Weblate, which is a
service for the collaborative translation of projects. Just head over to Zammad's
[Weblate instance](https://translations.zammad.org/){target=_blank}.
You can either create an account (if you don't have one already) or even sign in with your GitHub account!

We will cover some basic steps in the following sections to get you started with translating. However, if you want to
use some additional features of Weblate and want to dive deeper into it, their
[translation documentation](https://docs.weblate.org/en/latest/user/translating.html){target=_blank}
is a good starting point.

### Basics

The translation of **Zammad** and the translation of the **documentation** are split into different projects in Weblate.
When you click in the top menu under _Projects > Browse all projects_, you can find the overview of the projects:

![Screenshot showing translation projects in Weblate and menu](/screenshots/contribute/weblate-overview-docs.png)

Structure of translation projects in Weblate:

- Documentation
  - New Documentation at next.zammad.org
  - New Documentation at zammad.org
- Zammad
  - Zammad (`develop`, development version)
  - Zammad (`stable` version)
  - Some more which aren't relevant here

Select a project (documentation or Zammad) and switch to the **Components** tab. Select the one you want to translate.
After that, you can see the status of translation for the different languages, as you can see in the following
screenshot:

![Screenshot showing translation status of different languages for the user documentation](/screenshots/contribute/weblate-project-overview.png)

::: tip
It should be no big difference which component/branch you choose to translate. When Weblate detects the same strings in
different components, they will be used for all branches and only have to be translated once. If in doubt, choose
`develop`.
:::

### Translating

Now check the "Unfinished" column of your language and click on the number there. This opens the first untranslated
string and, in theory, you can start translating. But let's first have a brief look at the user interface of Weblate:

![Screenshot of Weblate translation user interface](/screenshots/contribute/weblate-ui.png)

1. **Breadcrumbs with path** to the current project, component and language
2. **Translation area** itself. You can find the source string at the top and the field for your translation below.
3. **Glossary**: when a string or parts of it is detected as being present in the glossary, you can find additional
   information there. It is also highlighted in the source strings.
4. **Some useful tabs**:
    - **Nearby strings**: shows you the context of the word or string
    - **Automatic suggestions**: here you can find automatic suggestions from DeepL and suggestions from similar
      strings, which are already translated. Use the `Clone to translation` button to insert it in the translation
      field to apply changes. Use the `Accept` button to accept the suggested translation and automatically switch
      to the next string.
    - **Other languages**: here you see an list if and how the string is translated into other languages (could be
      useful for languages, which are similar).

### Markup in strings

Find some examples for special source strings below with a badge indicating where such a string can be found. Try to
keep the (adjusted) markup and make sure to keep the variables. The **Source string location** section in Weblate
(on the right side) gives you a hint where to search for the context. Also have a look at the
[style guide of the documentation](style-guide) where you can find more information about the syntax and the usage of
Markdown/VitePress features.

`%s created ticket |%s|` <Badge type="tip" text="Zammad" />
: The string contains variables (`%s`) and markup (`||`). Make sure that the variable and markup is included in the
  translation. The position may vary depending on the translation.

`` `example-string` `` <Badge type="tip" text="Documentation" />
: This is rendered as inline code (`example-string`). Depending on the context, it can be translated or not. In any
  case, use a backtick (`` ` ``) before and after the string in your translation as well.

`[example](/en/path/to/document-or-website)` <Badge type="tip" text="Documentation" />
: This is a link to another page, including the language code. The above "example" is the text, which is shown as
  link text. This part can be translated. For the path, only the `en` may be replaced by the language code you are
  translating in. Make sure that your language is already present on zammad.org (check it by using the language
  switcher). Otherwise contact us if you want to have your language activated.

`**example string**` <Badge type="tip" text="Documentation" />
: Markup for text (e.g. bold, italics). Alternative: `_example string_`. Try to keep the markup in general but adjust
  it to keep the meaning.
