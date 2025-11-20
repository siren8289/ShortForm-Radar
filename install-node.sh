#!/bin/bash

echo "Node.js 설치를 시작합니다..."

# nvm이 이미 설치되어 있는지 확인
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    echo "nvm이 이미 설치되어 있습니다."
    source "$HOME/.nvm/nvm.sh"
else
    echo "nvm을 설치합니다..."
    export NVM_DIR="$HOME/.nvm"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    
    # nvm 로드
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Node.js LTS 버전 설치
echo "Node.js LTS 버전을 설치합니다..."
nvm install --lts
nvm use --lts
nvm alias default node

# 설치 확인
echo ""
echo "설치 완료!"
echo "Node.js 버전: $(node --version)"
echo "npm 버전: $(npm --version)"
echo ""
echo "이제 다음 명령어를 실행하세요:"
echo "  cd frontend"
echo "  npm install"
echo "  npm run dev"










