package com.shortformradar.repository;

import com.shortformradar.entity.Trend;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrendRepository extends JpaRepository<Trend, Long> {

    Page<Trend> findAllByOrderByGrowthRateDesc(Pageable pageable);

    List<Trend> findByPlatformIgnoreCaseOrderByGrowthRateDesc(String platform);

    @Query("SELECT t FROM Trend t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Trend> searchByKeyword(@Param("keyword") String keyword);
}

