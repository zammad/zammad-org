#!/bin/bash
#
# Generates the content of a single locale from its PO file and prepares
# everything that locale's app needs to be built.
#
# Usage: LOCALE=de .gitlab/i18n_locale.sh
#
set -e

LOCALE=${LOCALE:?Usage: LOCALE=de .gitlab/i18n_locale.sh}

echo "Generating content for locale '$LOCALE'…"

# Keep the file list in .po4a.conf in sync with the English sources.
.gitlab/update_po4a_conf.sh

# po4a processes all languages listed in [po4a_langs]. Restrict it to the
# requested locale, so that a single app can be built without touching the
# other languages (and without generating their content).
sed -E "s/^\[po4a_langs\].*/[po4a_langs] $LOCALE/" .po4a.conf > ".po4a.$LOCALE.conf"

po4a ".po4a.$LOCALE.conf"

# Same normalization as in the `i18n` script: the catalog's creation date
# changes on every run and would produce needless diffs.
perl -pi -e 's/^"POT-Creation-Date: .*/"POT-Creation-Date: \\n"/' i18n/zammad-org.pot

pnpm run build-language-config-json-files
pnpm run reset-po-changes

echo "Content for locale '$LOCALE' is up to date."
