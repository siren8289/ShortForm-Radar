package com.shortformradar.controller;

import com.shortformradar.dto.ApiResponse;
import com.shortformradar.entity.Trend;
import com.shortformradar.service.TrendService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 트렌드 조회 전용 REST 컨트롤러.
 * 서비스 계층에서 실제 비즈니스 로직을 수행하고, 이 클래스는 HTTP 요청/응답 변환만 담당한다.
 */
@RestController
@RequestMapping("/api/trends")
@RequiredArgsConstructor
@Tag(name = "Trend APIs", description = "Trend related APIs")
public class TrendController {

    private final TrendService trendService;

    @Operation(summary = "Top Growing 트렌드 조회", description = "growthRate 기준 Top 20 조회")
    @GetMapping("/top")
    public ResponseEntity<ApiResponse<List<Trend>>> getTopTrends(
            @RequestParam(defaultValue = "10") int limit
    ) {
        return ResponseEntity.ok(ApiResponse.success(trendService.getTopTrends(limit)));
    }

    @Operation(summary = "트렌드 상세 조회")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Trend>> getTrendById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(trendService.getTrendById(id)));
    }

    @Operation(summary = "플랫폼별 트렌드 조회", description = "TIKTOK, REELS, SHORTS 중 하나로 필터링해서 랭킹순 반환")
    @GetMapping("/platform/{platform}")
    public ResponseEntity<ApiResponse<List<Trend>>> getTrendsByPlatform(@PathVariable String platform) {
        return ResponseEntity.ok(ApiResponse.success(trendService.getTrendsByPlatform(platform)));
    }

    @Operation(summary = "트렌드 검색", description = "제목에 keyword가 포함된 트렌드 검색")
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Trend>>> searchTrends(@RequestParam String keyword) {
        return ResponseEntity.ok(ApiResponse.success(trendService.searchTrends(keyword)));
    }
}

