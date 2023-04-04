#!/bin/bash
GREEN='\033[0;32m'
PURPLE='\033[0;35m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${PURPLE} Applying formatting to code...${NC}"
pnpm run format
if [ $? -ne 0 ]; then
    echo -e "${RED}🔴 Whoops, looks like we couldn't format the code!${NC}"
    exit 1
fi
echo -e "${GREEN}🟢 Pretty${NC}"
