package com.arham.mockbseapi.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DelayUtil {

    @Value("${bse.delay}")
    private long delay;

    public void simulateDelay() {
        sleep(delay);
    }

    public void simulateHalfDelay() {
        sleep(delay / 2);
    }

    private void sleep(long milliseconds) {

        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

    }

}