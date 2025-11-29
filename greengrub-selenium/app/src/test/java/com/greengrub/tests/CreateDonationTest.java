package com.greengrub.tests;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.safari.SafariOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.*;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

public class CreateDonationTest {

    private WebDriver driver;
    private String browser;

    @Parameters("browser")
    @BeforeClass
    public void setup(@Optional("chrome") String browser) throws MalformedURLException {
        this.browser = browser;
        
        String gridHubUrl = "http://localhost:4444";

        if (browser.equalsIgnoreCase("chrome")) {
            ChromeOptions options = new ChromeOptions();
            //options.addArguments("--headless=new");
            options.addArguments("--disable-gpu");
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
            
            driver = new RemoteWebDriver(new URL(gridHubUrl), options);
            
        } else if (browser.equalsIgnoreCase("safari")) {
            SafariOptions options = new SafariOptions();
            options.setAutomaticInspection(false);
            
            driver = new RemoteWebDriver(new URL(gridHubUrl), options);
        }

        // set the window size of brwoser screen
        driver.manage().window().setSize(new Dimension(960, 800));
        
        System.out.println("Started test on " + browser + " browser");
    }

    @Test
    public void createDonationWithFoods() throws InterruptedException {
        try {
            driver.get("http://localhost:4200/createDonation");
            waitForAngularLoad(driver);

            System.out.println("[" + browser + "] URL Loaded: " + driver.getCurrentUrl());


            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("title"))).sendKeys("Evening Community Donation");


            wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("pickupAddress")))
                    .sendKeys("Sector 5, Salt Lake City, Kolkata");

            driver.findElement(By.id("note"))
                    .sendKeys("Pickup available between 5 PM to 7 PM.");

            WebElement browseFoodsBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("browseFoodsBtn")));
            browseFoodsBtn.click();
            Thread.sleep(800);

            WebElement addFoodBtn = wait.until(ExpectedConditions.elementToBeClickable(
                    By.cssSelector(".food-row:first-child .add-food-donation-btn")));
            addFoodBtn.click();
            
            WebElement closeBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("food-row-close-btn")));
            closeBtn.click();
            Thread.sleep(500);

            WebElement createFoodBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("createFoodBtn")));
            createFoodBtn.click();
            Thread.sleep(800);

            wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("foodName"))).sendKeys("Fresh Veg Biryani");
            driver.findElement(By.id("foodDesc")).sendKeys("2 kg freshly made veg biryani");
            driver.findElement(By.id("foodQuantity")).sendKeys("2");
            driver.findElement(By.id("foodUnit")).sendKeys("kg");
            driver.findElement(By.id("foodType")).sendKeys("veg");

            WebElement saveFoodBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("saveFoodBtn")));
            saveFoodBtn.click();

            Thread.sleep(1200);

            WebElement submitBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("submitDonationBtn")));
            submitBtn.click();

            Thread.sleep(1500);
            
            System.out.println("[" + browser + "] Test completed successfully!");
            
        } catch (Exception e) {
            System.err.println("[" + browser + "] Test failed with error: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @AfterClass
    public void teardown() {
        if (driver != null) {
            System.out.println("[" + browser + "] Closing browser");
            driver.quit();
        }
    }

    public void waitForAngularLoad(WebDriver driver) {
        new WebDriverWait(driver, Duration.ofSeconds(15)).until(
                webDriver -> ((JavascriptExecutor) webDriver)
                        .executeScript("return document.readyState")
                        .equals("complete")
        );
    }

}

