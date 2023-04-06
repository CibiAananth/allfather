#!/bin/bash
GREEN='\033[0;32m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${PURPLE} Analyzing code for issues...${NC}"
pnpm run lint
if [ $? -ne 0 ]; then
    echo -e "${RED}🔴 Houston, we have a problem with the code!${NC}"
    exit 1
fi
echo -e "${GREEN}🟢 Sweet!${NC}"
