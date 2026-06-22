#!/usr/bin/env sh

export LC_ALL=C.UTF-8
export LANG=C.UTF-8
export LANGUAGE=C.UTF-8

# Build po4a from source to get the latest version.
git clone https://github.com/mquinson/po4a.git
(
  cd po4a
  perl Build.PL
  ./Build || true # ignore errors, as the build may fail when trying to fetch an external, non-critical stylesheet
  ./Build install
)
rm -rf po4a
which po4a
