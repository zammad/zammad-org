---
order: 1
---

# Contribute

We are happy to see you contribute to Zammad! You can do this in several ways. Contributions are mainly done by forking
one of our repos on GitHub and creating a pull request with your changes (except for translations, see below). 🚀

You can contribute to:

- [Source-code](contribute#zammad-source-code)
- [Documentation](contribute#documentation)
- [Translation](contribute#translation)

Please have a look at our the sections below about how to contribute. All repos can be found on
[Github](https://github.com/zammad){target=_blank}.

## Zammad Source Code

The Zammad source code can be found on GitHub in the
[Zammad repository](https://github.com/zammad/zammad){target=_blank}.

Have a look at the
[developer manual](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank}
to get started.

### Supported Branches / Versions

The main [Zammad repository](https://github.com/zammad/zammad){target=_blank} at Github has several branches.

#### `develop`

- This is the current (unreleased) development state of next major release (this will become the new `stable` branch).
- Don't use it for production!
- This branch is actively supported and receives regular bug fixes as well as security updates (see
  [Security Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank} for more details).

#### `stable`

- This is the current stable release, e.g. Zammad 5.2.
- Use this branch for production installations.
- This branch is actively supported and receives regular bug fixes as well as security updates (see
  [Security Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank} for more details).

#### `stable-x.y`

- These are the branches of old versions of Zammad like `stable-5.1` for Zammad 5.1.
- Don't use it for production!
- Bug fixes and security updates are not applied to these branches.

## Documentation

Do you want to contribute to the Zammad documentation?

Open a new GitHub pull request at <https://github.com/zammad/zammad-org> (targeting the `develop` branch) with your
changes and make sure to follow the [style and content guide](style-guide). Consider to have a look at the
[repo's README.md](https://github.com/zammad/zammad-org?tab=readme-ov-file#zammad-hub){target=_blank} too.

The documentation you are reading is available on zammad.org and next.zammad.org and is built with Vitepress. The
source files are written in Markdown. Make sure to change the English source files only which are placed under
`/src/en/`. The translation is done via Weblate and will overwrite any changes in the language specific folders
(except `/src/en/`).

## Translation

If you want to help us with translation and improve the multi-language support of Zammad and/or the documentation, you
are welcome to contribute as well! The translation of Zammad itself and the documentation is done by using Weblate,
which is a service for the collaborative translation of projects.

You just have to head over to Zammad's [Weblate instance](https://translations.zammad.org/){target=_blank}.
You can either create an account (if you don't have one already) or even sign in with your Github account!

We will cover some basic steps in the following sections to get you started with translating. However, if you want to
use some additional features of Weblate and want to dive deeper into it, their
[translation documentation](https://docs.weblate.org/en/latest/user/translating.htm){target=_blank}
is a good starting point.

### Basics

The translation of **Zammad** and the translation of the **documentation** are split into different projects in Weblate.
When you click in the top menu under "_Projects > Browse all projects_", you can find the overview of the projects:

![Screenshot showing translation projects in Weblate and menu](/screenshots/weblate-overview-docs.png)

Structure of translation projects in Weblate:

- Documentation
  - New Documentation at next.zammad.org
  - New Documentation at zammad.org
- Zammad
  - Zammad (`develop`, development version)
  - Zammad (`stable` version)
  - _Some more which aren't relevant here_

::: tip

It should be no big difference which branch you choose to translate. When Weblate detects the same strings in different
branches, they will be used for all branches and only have to be translated once. If in doubt, choose the `develop`
version.
:::

After selecting a project (Documentation or Zammad), you will see different sub-projects and their translation status
summarized for all languages. These overviews may show a quite low translation rate, which is due to the amount of
active languages.

Here you can select one of the "components", which is more or less the same as different versions. After selecting one
of them, you can see the status of translation for the different languages, as you can see in the following screenshot
with an example from _Documentation > User Documentation (latest)_:

![Screenshot showing translation status of different languages for the user documentation](/screenshots/weblate-translations-user-docs.png)

### Translating

After selecting your language you want to translate to, a good starting point is to select "_Untranslated strings_"
(or the same meaning in your language, depending on what you have set in your profile).

After that, you will finally see the first untranslated string in the upper field and, in theory, you can start to
translate. First a brief overview of the user interface of Weblate:

![Screenshot of Weblate translation user interface](/screenshots/weblate-ui.png)

1. **Breadcrumbs with path** to the current project and language
2. **Translation area** itself. You can find the source string (_"English (United States)"_) at the top and the field
   for your translation (_"French"_ in this example).
3. **Glossary**: here you can find common translations in Zammad context. The terms from the glossary are highlighted
   in the source strings, as well.
4. **Some useful tabs**:
    - **Nearby strings**: shows you the context of the word or string
    - **Automatic suggestions**: here you can find automatic suggestions from DeepL and suggestions from similar
      strings, which are already translated. Use the "_Clone to translation_" button to insert it in the translation
      field to apply changes. Use the "_Accept_" button to accept the suggested translation and automatically switch
      to the next string.
    - **Other languages**: here you can get an overview, which languages are translated and you can also see the
      translated strings (could be useful for languages, which are similar).

### Troubleshooting

And finally some examples for "special" source strings, you might see in the documentation projects. You should also
have a look at the [style guide](style-guide) where you can find more information about the syntax and the usage of
Markdown/Vitepress features.

**\`example-string\`**
: This is rendered as `example-string`. Depending on the context, it can be translated or not. In any case, use the
  \` before and after the string in your translation.

**\[example\](/en/path/to/document-or-website\)**
: This is a link to another page, including the language code. The above "example" is the text, which is shown as
  link text. This part can be translated. For the path, only the `en` may be replaced by the language code you are
  translating in. Make sure that your language is already present on zammad.org (check it by using the language
  switcher). Otherwise contact us if you want to have your language activated.

**\*\*example string\*\***
: Markup for text (e.g. bold, italics). Alternative: \_example string\_. These strings can be translated, but the
  markup (e.g. `**` or `_`) should be adopted true to meaning.
