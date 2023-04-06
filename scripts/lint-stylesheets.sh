#!/bin/bash
GREEN='\033[0;32m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${PURPLE} Checking Stylesheets for issues...${NC}"
pnpm run lint:css
if [ $? -ne 0 ]; then
    echo -e "${RED}🔴 Yikes, we found some issues with styling!${NC}"
    exit 1
fi
echo -e "${GREEN}🟢 Suits up💅${NC}"
