package com.greengrub.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.*;

public class CreateDonationTest {

    private WebDriver driver;

    @BeforeClass
    public void setup() {
        WebDriverManager.chromedriver().setup();

        // Configure Chrome options for headless Jenkins environment
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");                // run without GUI
        options.addArguments("--no-sandbox");              // required on Linux servers
        options.addArguments("--disable-dev-shm-usage");   // solves memory issues
        options.addArguments("--disable-gpu");             // optional
        options.addArguments("--window-size=1920,1080");   // ensures layout works

        // Initialize driver with options
        driver = new ChromeDriver(options);
    }

    @Test
    public void createDonationWithFoods() throws InterruptedException {

        driver.get("http://localhost:4200/createDonation");

        // ---- Title ----
        driver.findElement(By.id("title")).sendKeys("Evening Community Donation");

        // ---- Pickup Address ----
        driver.findElement(By.id("pickupAddress"))
                .sendKeys("Sector 5, Salt Lake City, Kolkata");

        // ---- Note ----
        driver.findElement(By.id("note"))
                .sendKeys("Pickup available between 5 PM to 7 PM.");

        // ---- Add existing food ----
        driver.findElement(By.id("browseFoodsBtn")).click();
        Thread.sleep(800);

        driver.findElement(By.cssSelector(".food-row:first-child .add-food-donation-btn")).click();
        driver.findElement(By.id("food-row-close-btn")).click();
        Thread.sleep(500);

        // ---- Create new food ----
        driver.findElement(By.id("createFoodBtn")).click();
        Thread.sleep(800);

        driver.findElement(By.id("foodName")).sendKeys("Fresh Veg Biryani");
        driver.findElement(By.id("foodDesc")).sendKeys("2 kg freshly made veg biryani");
        driver.findElement(By.id("foodQuantity")).sendKeys("2");
        driver.findElement(By.id("foodUnit")).sendKeys("kg");
        driver.findElement(By.id("foodType")).sendKeys("veg");

        driver.findElement(By.id("saveFoodBtn")).click();

        Thread.sleep(1200);

        // ---- Submit Donation ----
        driver.findElement(By.id("submitDonationBtn")).click();

        Thread.sleep(1500);
    }

    @AfterClass
    public void teardown() {
        driver.quit();
    }
}

