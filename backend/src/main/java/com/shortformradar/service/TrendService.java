package com.shortformradar.service;

import com.shortformradar.entity.Trend;
import com.shortformradar.exception.TrendNotFoundException;
import com.shortformradar.repository.TrendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrendService {

    private final TrendRepository trendRepository;

    public List<Trend> getTopTrends(int limit) {
        if (limit <= 0) {
            throw new IllegalArgumentException("limit must be greater than zero");
        }

        return trendRepository
                .findAllByOrderByGrowthRateDesc(PageRequest.of(0, limit))
                .getContent();
    }

    public Trend getTrendById(Long id) {
        return trendRepository
                .findById(id)
                .orElseThrow(() -> new TrendNotFoundException(id));
    }

    public List<Trend> getTrendsByPlatform(String platform) {
        if (!StringUtils.hasText(platform)) {
            throw new IllegalArgumentException("platform must not be empty");
        }

        List<Trend> trends = trendRepository.findByPlatformIgnoreCaseOrderByGrowthRateDesc(platform);
        if (trends.isEmpty()) {
            throw new TrendNotFoundException("Trend not found for platform: " + platform);
        }
        return trends;
    }

    public List<Trend> searchTrends(String keyword) {
        if (!StringUtils.hasText(keyword)) {
            throw new IllegalArgumentException("keyword must not be empty");
        }
        return trendRepository.searchByKeyword(keyword);
    }
}

