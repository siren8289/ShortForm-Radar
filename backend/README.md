# ShortForm Radar Backend

Spring Boot 기반 백엔드 애플리케이션입니다.

## 기술 스택

- Spring Boot 3.2.0
- Java 17
- Gradle 8.5
- Spring Data JPA
- PostgreSQL

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

### 프로파일 설정 및 환경 변수

애플리케이션은 기본적으로 PostgreSQL을 사용합니다. 아래 환경 변수를 설정하여 연결 정보를 지정할 수 있습니다.

| 변수 | 기본값 | 설명 |
| --- | --- | --- |
| `DATABASE_URL` | `jdbc:postgresql://localhost:5432/shortformradar` | JDBC URL |
| `DATABASE_USERNAME` | `postgres` | 데이터베이스 사용자 |
| `DATABASE_PASSWORD` | `password` | 데이터베이스 비밀번호 |

```
# 예: 개발 환경에서 실행
DATABASE_URL=jdbc:postgresql://localhost:5432/shortformradar_dev \
DATABASE_USERNAME=postgres \
DATABASE_PASSWORD=postgres \
./gradlew bootRun --args='--spring.profiles.active=dev'
```

```bash
# 프로덕션 환경
./gradlew bootRun --args='--spring.profiles.active=prod'
```

## API 엔드포인트

- Health Check: `GET /api/health`

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










