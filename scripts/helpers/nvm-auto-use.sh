# Add this to your shell .rc file (e.g. ~/.zshrc, ~/.bashrc) to automatically use .nvmrc version on shell spawn

if [ -f .nvmrc ]; then
    nvm use
fi
