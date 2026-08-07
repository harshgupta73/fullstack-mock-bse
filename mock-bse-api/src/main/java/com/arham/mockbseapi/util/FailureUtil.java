package com.arham.mockbseapi.util;

import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.arham.mockbseapi.exception.BseApiException;

@Component
public class FailureUtil {

    private final Random random = new Random();

    @Value("${bse.failure-percentage}")
    private int failurePercentage;

    public void randomFailure() {

        if (random.nextInt(100) < failurePercentage) {
            throw new BseApiException("BSE API failed. Please retry.");
        }

    }
      

}