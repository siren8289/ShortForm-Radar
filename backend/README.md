# ShortForm Radar Backend

Spring Boot 기반 백엔드 애플리케이션입니다.

## 기술 스택

- Spring Boot 3.2.0
- Java 17
- Gradle 8.5
- Spring Data JPA
- H2 Database (개발용)
- PostgreSQL (프로덕션용)

## 실행 방법

### Gradle Wrapper 사용

```bash
# 애플리케이션 실행
./gradlew bootRun

# 빌드
./gradlew build

# 테스트 실행
./gradlew test
```

### 프로파일 설정

```bash
# 개발 환경
./gradlew bootRun --args='--spring.profiles.active=dev'

# 프로덕션 환경
./gradlew bootRun --args='--spring.profiles.active=prod'
```

## API 엔드포인트

- Health Check: `GET /api/health`
- H2 Console: `http://localhost:8080/api/h2-console`

## 프로젝트 구조

```
src/main/java/com/shortformradar/
├── config/          # 설정 클래스
├── controller/      # REST 컨트롤러
├── service/         # 비즈니스 로직
├── repository/      # 데이터 접근 계층
├── dto/            # 데이터 전송 객체
├── entity/         # 엔티티 클래스
└── exception/      # 예외 처리










