#!/bin/bash

# set path to this script
cd "$(dirname "$0")"
echo -e "🧼 Cleaning code"

./pretty-code.sh &&
    ./lint-stylesheets.sh &&
    ./lint-src.sh

if [ $? -ne 0 ]; then
    exit 1
fi

echo -e "✅ All checks passed! 🎉"
